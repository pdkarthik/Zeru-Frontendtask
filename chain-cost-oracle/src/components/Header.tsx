import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Activity, Pause, Play } from "lucide-react";
import { useGasStore } from "@/store/gas-store";

export function Header() {
  const { mode, setMode, isConnected, connectProviders, disconnectProviders } = useGasStore();

  const handleModeToggle = () => {
    setMode(mode === 'live' ? 'simulation' : 'live');
  };

  const handleConnectionToggle = () => {
    if (isConnected) {
      disconnectProviders();
    } else {
      connectProviders();
    }
  };

  return (
    <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Chain Cost Oracle
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time cross-chain gas tracker
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge 
                variant={isConnected ? "default" : "secondary"}
                className={isConnected ? "bg-success text-success-foreground" : ""}
              >
                <Activity className="h-3 w-3 mr-1" />
                {isConnected ? "Live" : "Offline"}
              </Badge>
              
              <Badge 
                variant="outline" 
                className={mode === 'live' ? "border-primary text-primary" : "border-warning text-warning"}
              >
                {mode === 'live' ? 'Live Mode' : 'Simulation'}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleModeToggle}
                className="gap-2"
              >
                {mode === 'live' ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Simulate
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Go Live
                  </>
                )}
              </Button>

              <Button
                variant={isConnected ? "destructive" : "default"}
                size="sm"
                onClick={handleConnectionToggle}
                className={isConnected ? "" : "bg-gradient-primary hover:shadow-glow"}
              >
                {isConnected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}