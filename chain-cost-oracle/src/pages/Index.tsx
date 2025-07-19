import { useEffect } from "react";
import { Header } from "@/components/Header";
import { GasCard } from "@/components/GasCard";
import { SimulationPanel } from "@/components/SimulationPanel";
import { GasChart } from "@/components/GasChart";
import { useGasStore } from "@/store/gas-store";

const Index = () => {
  const { connectProviders, mode } = useGasStore();

  useEffect(() => {
    // Auto-connect on load
    connectProviders();
  }, [connectProviders]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Real-Time Cross-Chain Gas Tracker
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Monitor live gas prices across Ethereum, Polygon, and Arbitrum.
              Simulate transaction costs and find the most cost-effective chain
              for your trades.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-ethereum"></div>
                <span>Ethereum Mainnet</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-polygon"></div>
                <span>Polygon PoS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-arbitrum"></div>
                <span>Arbitrum One</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gas Cards Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Current Gas Prices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GasCard chainName="ethereum" />
            <GasCard chainName="polygon" />
            <GasCard chainName="arbitrum" />
          </div>
        </section>

        {/* Charts and Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart takes up 2 columns */}
          <div className="lg:col-span-2">
            <GasChart />
          </div>

          {/* Simulation panel takes up 1 column */}
          <div className="lg:col-span-1">
            <SimulationPanel />
          </div>
        </div>

        {/* Footer Info */}
        <section className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-6 bg-white text-black border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">How It Works</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                • <strong>Live Mode:</strong> Real-time gas price monitoring via
                WebSocket connections to blockchain RPCs
              </p>
              <p>
                • <strong>Simulation Mode:</strong> Calculate and compare
                transaction costs across all chains
              </p>
              <p>
                • <strong>Smart Routing:</strong> Find the most cost-effective
                chain for your specific transaction
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
