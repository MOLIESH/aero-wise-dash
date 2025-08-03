import { Database, CheckCircle, AlertCircle, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DataSource {
  name: string;
  description: string;
  status: "online" | "delayed" | "offline";
  lastUpdate: string;
  coverage: string;
  url: string;
  dataTypes: string[];
}

export default function DataSources() {
  const dataSources: DataSource[] = [
    {
      name: "OpenAQ",
      description: "Global air quality data from government monitoring stations",
      status: "online",
      lastUpdate: "15 minutes ago",
      coverage: "Global",
      url: "https://openaq.org",
      dataTypes: ["PM2.5", "PM10", "NO2", "SO2", "O3", "CO"]
    },
    {
      name: "Google Earth Engine",
      description: "Satellite imagery and environmental datasets",
      status: "online", 
      lastUpdate: "2 hours ago",
      coverage: "Global",
      url: "https://earthengine.google.com",
      dataTypes: ["NDVI", "Land Cover", "Surface Temperature", "Precipitation"]
    },
    {
      name: "NASA MODIS",
      description: "Moderate Resolution Imaging Spectroradiometer data",
      status: "delayed",
      lastUpdate: "6 hours ago",
      coverage: "Global",
      url: "https://modis.gsfc.nasa.gov",
      dataTypes: ["Vegetation Index", "Surface Reflectance", "Land Cover Change"]
    },
    {
      name: "Weather API",
      description: "Real-time weather and atmospheric conditions",
      status: "online",
      lastUpdate: "5 minutes ago", 
      coverage: "Global",
      url: "https://openweathermap.org",
      dataTypes: ["Temperature", "Humidity", "Wind Speed", "Pressure"]
    },
    {
      name: "US EPA AirNow",
      description: "Official US air quality monitoring network",
      status: "online",
      lastUpdate: "30 minutes ago",
      coverage: "United States",
      url: "https://airnow.gov",
      dataTypes: ["AQI", "PM2.5", "Ozone", "Health Recommendations"]
    },
    {
      name: "European Environment Agency",
      description: "European air quality and environmental data",
      status: "offline",
      lastUpdate: "2 days ago",
      coverage: "Europe",
      url: "https://eea.europa.eu",
      dataTypes: ["Air Quality", "Noise Pollution", "Water Quality"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return { 
          icon: CheckCircle, 
          color: "bg-vegetation-high/10 text-vegetation-high border-vegetation-high/20",
          label: "Online"
        };
      case "delayed":
        return {
          icon: Clock,
          color: "bg-airQuality-moderate/10 text-airQuality-moderate border-airQuality-moderate/20", 
          label: "Delayed"
        };
      case "offline":
        return {
          icon: AlertCircle,
          color: "bg-destructive/10 text-destructive border-destructive/20",
          label: "Offline"
        };
      default:
        return { 
          icon: Clock, 
          color: "bg-muted/10 text-muted-foreground border-muted/20",
          label: "Unknown"
        };
    }
  };

  const onlineCount = dataSources.filter(ds => ds.status === "online").length;
  const totalCount = dataSources.length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Sources</h1>
        <p className="text-muted-foreground">
          Environmental data providers and their current status
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sources</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online</p>
                <p className="text-2xl font-bold text-vegetation-high">{onlineCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-vegetation-high" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold text-airQuality-moderate">
                  {dataSources.filter(ds => ds.status === "delayed").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-airQuality-moderate" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold text-destructive">
                  {dataSources.filter(ds => ds.status === "offline").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources List */}
      <div className="grid gap-4">
        {dataSources.map((source) => {
          const statusInfo = getStatusBadge(source.status);
          const StatusIcon = statusInfo.icon;

          return (
            <Card key={source.name} className="shadow-card-soft">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      {source.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {source.description}
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={statusInfo.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Coverage</h4>
                    <p className="text-sm">{source.coverage}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Last Update</h4>
                    <p className="text-sm">{source.lastUpdate}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Data Types</h4>
                    <div className="flex flex-wrap gap-1">
                      {source.dataTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Methodology */}
      <Card className="shadow-card-soft">
        <CardHeader>
          <CardTitle>Data Integration Methodology</CardTitle>
          <CardDescription>How we process and combine environmental data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Data Collection</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Automated API polling every 15 minutes</li>
                <li>• Satellite data refreshed daily</li>
                <li>• Quality control and validation checks</li>
                <li>• Historical data archiving</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Processing</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Spatial interpolation for missing data</li>
                <li>• Temporal smoothing and trend analysis</li>
                <li>• Cross-validation between sources</li>
                <li>• Machine learning anomaly detection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}