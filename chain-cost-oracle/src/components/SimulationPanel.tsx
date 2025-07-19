import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, ArrowRight, DollarSign } from "lucide-react";
import { useGasStore } from "@/store/gas-store";

export function SimulationPanel() {
  const { 
    simulation, 
    setSimulationValue, 
    calculateSimulation, 
    chains,
    ethUsdPrice 
  } = useGasStore();

  const handleCalculate = () => {
    calculateSimulation();
  };

  const getCheapestChain = () => {
    const costs = Object.entries(simulation.costs);
    if (costs.length === 0) return null;
    
    return costs.reduce((cheapest, [chainName, cost]) => {
      if (!cheapest || cost.gasCostUSD < cheapest[1].gasCostUSD) {
        return [chainName, cost];
      }
      return cheapest;
    }, null as [string, typeof simulation.costs[string]] | null);
  };

  const cheapestChain = getCheapestChain();

  return (
    <Card className="bg-white text-black border border-gray-200 shadow-md transition-all duration-300 group">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Transaction Cost Simulator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare gas costs across chains for your transaction
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="transaction-value">Transaction Value (ETH)</Label>
          <div className="flex gap-2">
            <Input
              id="transaction-value"
              type="number"
              step="0.01"
              min="0"
              value={simulation.transactionValue}
              onChange={(e) => setSimulationValue(e.target.value)}
              placeholder="0.1"
              className="bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              onClick={handleCalculate}
              className="bg-gradient-primary hover:shadow-glow"
            >
              Calculate
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            ETH/USD: ${ethUsdPrice.toLocaleString()}
          </p>
        </div>

        {Object.keys(simulation.costs).length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Cost Comparison</h3>
              {cheapestChain && (
                <Badge
                  variant="outline"
                  className="text-success border-success"
                >
                  {chains[cheapestChain[0]]?.name} is cheapest
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              {Object.entries(simulation.costs).map(([chainName, cost]) => {
                const isLowestCost =
                  cheapestChain && chainName === cheapestChain[0];
                return (
                  <div
                    key={chainName}
                    className={`p-4 rounded-lg border ${
                      isLowestCost
                        ? "border-success bg-success/5"
                        : "border-gray bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        {chains[chainName]?.name}
                      </span>
                      {isLowestCost && (
                        <Badge className="bg-success text-white">
                          Best Value
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Gas Cost:</span>
                        <div className="font-mono">
                          {cost.gasCostETH.toFixed(6)} ETH
                        </div>
                        <div className="font-mono text-muted-foreground">
                          ${cost.gasCostUSD.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Total Cost:
                        </span>
                        <div className="font-mono">
                          {cost.totalCostETH.toFixed(6)} ETH
                        </div>
                        <div className="font-mono text-muted-foreground">
                          ${cost.totalCostUSD.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {cheapestChain && (
              <div className="p-4 bg-success/10 border border-success rounded-lg">
                <div className="flex items-center gap-2 text-success">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">
                    Save $
                    {(
                      Math.max(
                        ...Object.values(simulation.costs).map(
                          (c) => c.gasCostUSD
                        )
                      ) - cheapestChain[1].gasCostUSD
                    ).toFixed(2)}{" "}
                    by using {chains[cheapestChain[0]]?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}