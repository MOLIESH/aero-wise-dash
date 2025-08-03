import { useState } from "react";
import { 
  Map, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Crosshair, 
  Download,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface LayerToggle {
  id: string;
  name: string;
  color: string;
  visible: boolean;
}

export function MapPanel() {
  const [mapLayers, setMapLayers] = useState<LayerToggle[]>([
    { id: "aqi", name: "Air Quality", color: "bg-airQuality-moderate", visible: true },
    { id: "ndvi", name: "Vegetation", color: "bg-vegetation-high", visible: true },
    { id: "zones", name: "Zoning", color: "bg-zone-residential", visible: false },
    { id: "population", name: "Population", color: "bg-accent", visible: false },
  ]);

  const toggleLayer = (layerId: string) => {
    setMapLayers(layers => 
      layers.map(layer => 
        layer.id === layerId 
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  };

  return (
    <Card className="h-full flex flex-col">
      {/* Map Controls Header */}
      <div className="p-4 border-b bg-gradient-data">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Map className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Interactive Map</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Crosshair className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Data Layers</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {mapLayers.map((layer) => (
              <Badge
                key={layer.id}
                variant={layer.visible ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => toggleLayer(layer.id)}
              >
                <div className={`w-2 h-2 rounded-full ${layer.color} mr-2`}></div>
                {layer.name}
                {layer.visible ? (
                  <Eye className="h-3 w-3 ml-1" />
                ) : (
                  <EyeOff className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Map Display Area */}
      <CardContent className="flex-1 p-0 relative overflow-hidden">
        {/* Simulated Map Interface */}
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative">
          {/* Map Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Sample Data Overlays */}
          {mapLayers.find(l => l.id === "aqi" && l.visible) && (
            <>
              {/* AQI Data Points */}
              <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-airQuality-good rounded-full opacity-70 shadow-lg animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-airQuality-moderate rounded-full opacity-70 shadow-lg animate-pulse"></div>
              <div className="absolute top-2/3 left-2/3 w-6 h-6 bg-airQuality-poor rounded-full opacity-70 shadow-lg animate-pulse"></div>
            </>
          )}
          
          {mapLayers.find(l => l.id === "ndvi" && l.visible) && (
            <>
              {/* NDVI Vegetation Areas */}
              <div className="absolute top-1/6 left-1/4 w-16 h-12 bg-vegetation-high rounded-lg opacity-50"></div>
              <div className="absolute top-3/4 left-1/6 w-20 h-16 bg-vegetation-medium rounded-lg opacity-50"></div>
              <div className="absolute top-1/3 right-1/4 w-14 h-10 bg-vegetation-low rounded-lg opacity-50"></div>
            </>
          )}
          
          {mapLayers.find(l => l.id === "zones" && l.visible) && (
            <>
              {/* Zoning Areas */}
              <div className="absolute top-1/5 left-1/5 w-24 h-20 border-2 border-zone-residential rounded opacity-60"></div>
              <div className="absolute top-2/5 right-1/4 w-20 h-16 border-2 border-zone-commercial rounded opacity-60"></div>
            </>
          )}

          {/* Map Navigation Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur-sm">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur-sm">
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Coordinates Display */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-xs font-mono">
            40.7128° N, 74.0060° W
          </div>

          {/* Scale Bar */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-black"></div>
                <span>1 km</span>
              </div>
            </div>
          </div>
          
          {/* Sample Plot Markers */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                Sample Plot
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}