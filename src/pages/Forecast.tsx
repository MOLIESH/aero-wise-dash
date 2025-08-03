import { useState } from "react";
import { TrendingUp, Download, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Forecast() {
  const [selectedLocation, setSelectedLocation] = useState("manhattan");
  const [selectedPollutant, setSelectedPollutant] = useState("pm25");
  const [timeRange, setTimeRange] = useState("7d");

  // Simulated forecast data
  const forecastData = [
    { date: "Today", aqi: 87, trend: "stable", confidence: 95 },
    { date: "Tomorrow", aqi: 92, trend: "rising", confidence: 90 },
    { date: "Day 3", aqi: 78, trend: "falling", confidence: 85 },
    { date: "Day 4", aqi: 73, trend: "falling", confidence: 80 },
    { date: "Day 5", aqi: 85, trend: "rising", confidence: 75 },
    { date: "Day 6", aqi: 89, trend: "rising", confidence: 70 },
    { date: "Day 7", aqi: 91, trend: "stable", confidence: 65 },
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-airQuality-good";
    if (aqi <= 100) return "bg-airQuality-moderate";
    if (aqi <= 150) return "bg-airQuality-poor";
    return "bg-airQuality-unhealthy";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "rising") return "↗️";
    if (trend === "falling") return "↘️";
    return "➡️";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Environmental Forecast</h1>
          <p className="text-muted-foreground">AI-powered predictions for air quality and environmental conditions</p>
        </div>
        
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Control Panel */}
      <Card className="shadow-card-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Forecast Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manhattan">Manhattan, NY</SelectItem>
                  <SelectItem value="brooklyn">Brooklyn, NY</SelectItem>
                  <SelectItem value="queens">Queens, NY</SelectItem>
                  <SelectItem value="bronx">Bronx, NY</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Pollutant Type</label>
              <Select value={selectedPollutant} onValueChange={setSelectedPollutant}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pm25">PM2.5</SelectItem>
                  <SelectItem value="pm10">PM10</SelectItem>
                  <SelectItem value="o3">Ozone (O₃)</SelectItem>
                  <SelectItem value="no2">NO₂</SelectItem>
                  <SelectItem value="so2">SO₂</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="14d">14 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">Update Forecast</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Forecast Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast Chart */}
        <div className="lg:col-span-2">
          <Card className="shadow-card-soft">
            <CardHeader>
              <CardTitle>AQI Forecast Timeline</CardTitle>
              <CardDescription>
                Predicted air quality index for {selectedLocation.replace(/([A-Z])/g, ' $1').trim()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simulated Chart */}
              <div className="h-80 relative bg-gradient-data rounded-lg p-4">
                <div className="absolute inset-4">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                    <span>200</span>
                    <span>150</span>
                    <span>100</span>
                    <span>50</span>
                    <span>0</span>
                  </div>
                  
                  {/* Chart area */}
                  <div className="ml-8 h-full relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-rows-4 opacity-20">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="border-b border-muted-foreground"></div>
                      ))}
                    </div>
                    
                    {/* Data points and line */}
                    <div className="absolute inset-0 flex items-end justify-between">
                      {forecastData.map((point, index) => {
                        const height = (point.aqi / 200) * 100;
                        return (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className={`w-3 h-3 rounded-full ${getAQIColor(point.aqi)} mb-2`}
                              style={{ marginBottom: `${height}%` }}
                            ></div>
                            <div className="text-xs text-center">
                              <div className="font-medium">{point.aqi}</div>
                              <div className="text-muted-foreground">{point.date}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forecast Details */}
        <div className="space-y-6">
          {/* Current Conditions */}
          <Card className="shadow-card-soft">
            <CardHeader>
              <CardTitle className="text-lg">Current Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">87</div>
                <Badge className="bg-airQuality-moderate/10 text-airQuality-moderate border-airQuality-moderate/20">
                  Moderate AQI
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">PM2.5</div>
                  <div className="font-medium">23 μg/m³</div>
                </div>
                <div>
                  <div className="text-muted-foreground">PM10</div>
                  <div className="font-medium">45 μg/m³</div>
                </div>
                <div>
                  <div className="text-muted-foreground">O₃</div>
                  <div className="font-medium">76 μg/m³</div>
                </div>
                <div>
                  <div className="text-muted-foreground">NO₂</div>
                  <div className="font-medium">32 μg/m³</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Forecast Summary */}
          <Card className="shadow-card-soft">
            <CardHeader>
              <CardTitle className="text-lg">7-Day Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {forecastData.slice(1, 4).map((day, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getAQIColor(day.aqi)}`}></div>
                    <span className="text-sm font-medium">{day.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{day.aqi}</span>
                    <span className="text-xs">{getTrendIcon(day.trend)}</span>
                    <Badge variant="outline" className="text-xs">
                      {day.confidence}%
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Model Information */}
          <Card className="shadow-card-soft">
            <CardHeader>
              <CardTitle className="text-lg">Model Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Algorithm</span>
                <span className="font-medium">LSTM + Prophet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-medium">87.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Points</span>
                <span className="font-medium">2,847</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}