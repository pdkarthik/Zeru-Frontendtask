import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp } from "lucide-react";
import { useGasStore } from "@/store/gas-store";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function GasChart() {
  const { chains } = useGasStore();

  // Generate mock historical data for demonstration
  const generateMockData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 15 * 60 * 1000); // 15-minute intervals
      data.push({
        time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: timestamp.getTime(),
        ethereum: Math.random() * 50 + 20,
        polygon: Math.random() * 20 + 5,
        arbitrum: Math.random() * 15 + 8,
      });
    }
    
    return data;
  };

  const chartData = generateMockData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-black border border-gray-200 rounded-lg p-3 shadow-sm">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)} gwei
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white text-black border border-gray-200 shadow-md transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Gas Price Trends
          </CardTitle>
          <Badge variant="outline" className="text-muted-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            24H
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          15-minute interval gas price history across all chains
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Gas Price (gwei)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="ethereum"
                stroke="hsl(var(--ethereum))"
                strokeWidth={2}
                dot={false}
                name="Ethereum"
                activeDot={{
                  r: 4,
                  stroke: "hsl(var(--ethereum))",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="polygon"
                stroke="hsl(var(--polygon))"
                strokeWidth={2}
                dot={false}
                name="Polygon"
                activeDot={{
                  r: 4,
                  stroke: "hsl(var(--polygon))",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="arbitrum"
                stroke="hsl(var(--arbitrum))"
                strokeWidth={2}
                dot={false}
                name="Arbitrum"
                activeDot={{
                  r: 4,
                  stroke: "hsl(var(--arbitrum))",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Ethereum</div>
            <div className="text-lg font-mono font-bold text-ethereum">
              {chains.ethereum?.current?.gasPrice.toFixed(1) || "--"} gwei
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Polygon</div>
            <div className="text-lg font-mono font-bold text-polygon">
              {chains.polygon?.current?.gasPrice.toFixed(1) || "--"} gwei
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Arbitrum</div>
            <div className="text-lg font-mono font-bold text-arbitrum">
              {chains.arbitrum?.current?.gasPrice.toFixed(1) || "--"} gwei
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}