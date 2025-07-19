import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";
import { useGasStore } from "@/store/gas-store";

interface GasCardProps {
  chainName: string;
}

export function GasCard({ chainName }: GasCardProps) {
  const { chains } = useGasStore();
  const chainData = chains[chainName];

  if (!chainData || !chainData.current) {
    return (
      <Card className="!bg-white text-black border border-gray-200 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {chainData?.name || chainName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { current } = chainData;
  const gasPrice = current.baseFee + current.priorityFee;

  // Determine gas price level and styling
  const getGasLevel = (price: number) => {
    if (price < 20)
      return { level: "Low", color: "success", icon: TrendingDown };
    if (price < 50)
      return { level: "Medium", color: "warning", icon: TrendingUp };
    return { level: "High", color: "error", icon: TrendingUp };
  };

  const gasLevel = getGasLevel(gasPrice);
  const GasIcon = gasLevel.icon;

  return (
    <Card className="bg-white text-black border border-gray-200 shadow-md transition-all duration-300 group">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap
              className={`h-5 w-5 text-${chainName} group-hover:text-${chainName}`}
            />
            {chainData.name}
          </div>
          <Badge
            variant="outline"
            className={`text-${gasLevel.color} border-${gasLevel.color}`}
          >
            <GasIcon className="h-3 w-3 mr-1" />
            {gasLevel.level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Gas Price</span>
            <span className="font-mono font-bold text-lg">
              {gasPrice.toFixed(1)} gwei
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Base Fee:</span>
              <div className="font-mono">{current.baseFee.toFixed(1)} gwei</div>
            </div>
            <div>
              <span className="text-muted-foreground">Priority Fee:</span>
              <div className="font-mono">
                {current.priorityFee.toFixed(1)} gwei
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Block #{current.blockNumber.toLocaleString()}</span>
            <span>{new Date(current.lastUpdate).toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
