# 🚀 Real-Time Cross-Chain Gas Price Tracker with Wallet Simulation

🌐 Live: 🔗 https://realtime-crosschain-gastracker.netlify.app


This project is a **real-time dashboard** built with **React**, **Zustand**, **Ethers.js**, and **Lightweight Charts** that:

- Fetches gas prices across **Ethereum**, **Polygon**, and **Arbitrum** using native **WebSocket RPC**.
- Simulates wallet transactions and estimates **USD cost** for gas + transaction.
- Computes **real-time ETH/USD price** using raw on-chain data from **Uniswap V3's ETH/USDC pool**.
- Visualizes gas volatility with **15-minute candlestick charts**.

---

## 🧠 Problem Overview

### ❓ Objective

Build a frontend-only DApp that:
- Shows live gas fees across chains.
- Accepts user input (amount in ETH/MATIC/etc.).
- Calculates cost of gas in **USD** using **Uniswap V3** on-chain data.
- Displays all data visually, with both a comparison table and candlestick chart.


🛠️ Features

🌐 Web3 Integration
- Uses ethers.providers.WebSocketProvider for real-time updates.
- Listens to new block events to fetch baseFeePerGas, priorityFee.

💵 USD Cost Calculation
- No third-party APIs like CoinGecko.
- Pulls ETH/USDC price directly from Uniswap V3 pool (0x88e6...).
- Calculates price using:
    price = (sqrtPriceX96 ** 2 * 10 ** 12) / (2 ** 192)

⚙️ Zustand Global State
Shared state between:
- Gas tracking widgets
- Candlestick chart
- Simulation cost table

⚙️ Supports toggling between:
- live mode (auto-updating data)
- simulation mode (manual transaction input)

📈 Charting
- lightweight-charts used to show gas volatility.
- Updates every 15 mins using historical aggregation from chain data.

🧪 Simulation Mode
- Accepts user input (e.g. 0.25 ETH, 2 MATIC, etc.).
- Shows gas + tx cost on each chain (in USD).
- Marks the cheapest chain with a badge: "Best Value".



⚙️ Tech Stack
|        Tech        |              Purpose                 |
| ------------------ | ------------------------------------ |
| React              | UI framework                         |
| Zustand            | Lightweight state management         |
| Ethers.js          | Blockchain interaction               |
| TailwindCSS        | Utility-first styling                |
| Lightweight Charts | Real-time candlestick rendering      |
| TypeScript         | Strong typing throughout the project |


📊 Sample Calculation
If user inputs 0.25 ETH: 
  GasCostUSD = (baseFee + priorityFee) * 21000 * ETHUSD
ETHUSD is calculated from Uniswap V3 sqrtPriceX96 values.

🧠 Challenges Addressed
- Real-time state sync across components.
- Candlestick charting from raw on-chain gas metrics.
- Handling RPC rate limits.
- No use of 3rd-party APIs for price feeds.

✅ Deliverables
 - Real-time gas tracking for Ethereum, Polygon, Arbitrum.
 - On-chain ETH/USD price from Uniswap V3.
 - Simulation mode for wallet tx fee comparison.
 - Responsive dashboard with chart + comparison view.
 - Zustand-managed mode switching.
 - Demo-ready with clean UI.




