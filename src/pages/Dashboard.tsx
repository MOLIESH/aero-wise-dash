import { useState } from "react";
import { Filter, BarChart3, Leaf, Wind, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPanel } from "@/components/MapPanel";
import { FilterSidebar } from "@/components/FilterSidebar";

export default function Dashboard() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Environmental Dashboard</h1>
            <p className="text-muted-foreground">Real-time environmental intelligence and insights</p>
          </div>
          
          <Button 
            onClick={() => setFilterOpen(true)}
            variant="outline"
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters & Controls
          </Button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card-soft hover:shadow-environmental transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Air Quality Index</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-airQuality-moderate/10 text-airQuality-moderate border-airQuality-moderate/20">
                  Moderate
                </Badge>
                <span className="text-xs text-muted-foreground">↓ 5 from yesterday</span>
              </div>
              <Progress value={87} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="shadow-card-soft hover:shadow-environmental transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vegetation Index</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.72</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-vegetation-high/10 text-vegetation-high border-vegetation-high/20">
                  High
                </Badge>
                <span className="text-xs text-muted-foreground">↑ 0.05 from last week</span>
              </div>
              <Progress value={72} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="shadow-card-soft hover:shadow-environmental transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Green Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.4</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Excellent
                </Badge>
                <span className="text-xs text-muted-foreground">Top 15%</span>
              </div>
              <Progress value={84} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="shadow-card-soft hover:shadow-environmental transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monitored Plots</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  Active
                </Badge>
                <span className="text-xs text-muted-foreground">+23 this month</span>
              </div>
              <Progress value={95} className="mt-3" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Panel - Takes 2 columns */}
          <div className="lg:col-span-2">
            <MapPanel />
          </div>

          {/* Right Side Panel */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <Card className="shadow-card-soft">
              <CardHeader>
                <CardTitle className="text-lg">Recent Alerts</CardTitle>
                <CardDescription>Environmental changes and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">High pollution detected</p>
                    <p className="text-xs text-muted-foreground">Manhattan, NY - AQI: 156</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-airQuality-moderate/5 border border-airQuality-moderate/20">
                  <div className="w-2 h-2 rounded-full bg-airQuality-moderate mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Air quality improvement</p>
                    <p className="text-xs text-muted-foreground">Brooklyn, NY - AQI: 78</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-vegetation-high/5 border border-vegetation-high/20">
                  <div className="w-2 h-2 rounded-full bg-vegetation-high mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Vegetation growth detected</p>
                    <p className="text-xs text-muted-foreground">Central Park - NDVI: 0.85</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card-soft">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Forecast Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Similar Plots
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export Data Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Data Sources Status */}
            <Card className="shadow-card-soft">
              <CardHeader>
                <CardTitle className="text-lg">Data Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">OpenAQ</span>
                  <Badge variant="secondary" className="bg-vegetation-high/10 text-vegetation-high">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Google Earth Engine</span>
                  <Badge variant="secondary" className="bg-vegetation-high/10 text-vegetation-high">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">NASA MODIS</span>
                  <Badge variant="secondary" className="bg-airQuality-moderate/10 text-airQuality-moderate">Delayed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weather API</span>
                  <Badge variant="secondary" className="bg-vegetation-high/10 text-vegetation-high">Online</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FilterSidebar isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}