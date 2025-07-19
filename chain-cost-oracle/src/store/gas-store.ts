import { create } from 'zustand';

export interface GasData {
  baseFee: number;
  priorityFee: number;
  gasPrice: number;
  lastUpdate: number;
  blockNumber: number;
}

export interface GasPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ChainData {
  name: string;
  symbol: string;
  rpcUrl: string;
  chainId: number;
  current: GasData | null;
  history: GasPoint[];
  provider: any | null;
}

export interface SimulationData {
  transactionValue: string;
  gasLimit: number;
  costs: {
    [chainName: string]: {
      gasCostETH: number;
      gasCostUSD: number;
      totalCostETH: number;
      totalCostUSD: number;
    };
  };
}

interface GasStore {
  mode: 'live' | 'simulation';
  ethUsdPrice: number;
  chains: {
    [key: string]: ChainData;
  };
  simulation: SimulationData;
  isConnected: boolean;
  
  // Actions
  setMode: (mode: 'live' | 'simulation') => void;
  updateGasData: (chainName: string, gasData: GasData) => void;
  updateEthPrice: (price: number) => void;
  setSimulationValue: (value: string) => void;
  calculateSimulation: () => void;
  connectProviders: () => Promise<void>;
  disconnectProviders: () => void;
  addHistoryPoint: (chainName: string, point: GasPoint) => void;
}

const CHAIN_CONFIGS = {
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'wss://eth-mainnet.g.alchemy.com/v2/demo',
    chainId: 1,
    current: null,
    history: [],
    provider: null,
  },
  polygon: {
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'wss://polygon-mainnet.g.alchemy.com/v2/demo',
    chainId: 137,
    current: null,
    history: [],
    provider: null,
  },
  arbitrum: {
    name: 'Arbitrum',
    symbol: 'ETH',
    rpcUrl: 'wss://arb-mainnet.g.alchemy.com/v2/demo',
    chainId: 42161,
    current: null,
    history: [],
    provider: null,
  },
};

export const useGasStore = create<GasStore>((set, get) => ({
  mode: 'live',
  ethUsdPrice: 2000, // Default fallback price
  chains: CHAIN_CONFIGS,
  simulation: {
    transactionValue: '0.1',
    gasLimit: 21000,
    costs: {},
  },
  isConnected: false,

  setMode: (mode) => set({ mode }),

  updateGasData: (chainName, gasData) =>
    set((state) => ({
      chains: {
        ...state.chains,
        [chainName]: {
          ...state.chains[chainName],
          current: gasData,
        },
      },
    })),

  updateEthPrice: (price) => set({ ethUsdPrice: price }),

  setSimulationValue: (value) =>
    set((state) => ({
      simulation: {
        ...state.simulation,
        transactionValue: value,
      },
    })),

  calculateSimulation: () => {
    const state = get();
    const { simulation, chains, ethUsdPrice } = state;
    const costs: SimulationData['costs'] = {};

    Object.entries(chains).forEach(([chainName, chainData]) => {
      if (chainData.current) {
        const { baseFee, priorityFee } = chainData.current;
        const totalGas = baseFee + priorityFee;
        const gasCostETH = (totalGas * simulation.gasLimit) / 1e9; // Convert from gwei to ETH
        const gasCostUSD = gasCostETH * ethUsdPrice;
        const transactionValueETH = parseFloat(simulation.transactionValue);
        const totalCostETH = gasCostETH + transactionValueETH;
        const totalCostUSD = totalCostETH * ethUsdPrice;

        costs[chainName] = {
          gasCostETH,
          gasCostUSD,
          totalCostETH,
          totalCostUSD,
        };
      }
    });

    set((state) => ({
      simulation: {
        ...state.simulation,
        costs,
      },
    }));
  },

  addHistoryPoint: (chainName, point) =>
    set((state) => ({
      chains: {
        ...state.chains,
        [chainName]: {
          ...state.chains[chainName],
          history: [...state.chains[chainName].history.slice(-99), point], // Keep last 100 points
        },
      },
    })),

  connectProviders: async () => {
    const state = get();
    console.log('Connecting to blockchain providers...');
    
    // For demo purposes, we'll simulate data instead of real connections
    // In production, you would use real WebSocket providers
    set({ isConnected: true });
    
    // Simulate initial data
    Object.keys(state.chains).forEach((chainName) => {
      const mockGasData: GasData = {
        baseFee: Math.random() * 50 + 10,
        priorityFee: Math.random() * 5 + 1,
        gasPrice: Math.random() * 50 + 20,
        lastUpdate: Date.now(),
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      };
      
      get().updateGasData(chainName, mockGasData);
    });

    // Simulate ETH price
    get().updateEthPrice(2000 + Math.random() * 200);
  },

  disconnectProviders: () => {
    set({ isConnected: false });
  },
}));