import { useState } from "react";
import { MapPin, Star, Filter, ArrowUpDown, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface PlotRecommendation {
  id: string;
  address: string;
  greenScore: number;
  aqi: number;
  ndvi: number;
  zoneType: string;
  price: number;
  distance: number;
  highlights: string[];
}

export default function Recommender() {
  const [budget, setBudget] = useState([500000]);
  const [minGreenScore, setMinGreenScore] = useState([7.0]);
  const [sortBy, setSortBy] = useState("greenScore");
  const [zoneFilter, setZoneFilter] = useState("all");

  const recommendations: PlotRecommendation[] = [
    {
      id: "1",
      address: "Central Park West, Manhattan",
      greenScore: 9.2,
      aqi: 65,
      ndvi: 0.82,
      zoneType: "Residential",
      price: 850000,
      distance: 0.3,
      highlights: ["High vegetation", "Low pollution", "Near parks"]
    },
    {
      id: "2", 
      address: "Brooklyn Heights, Brooklyn",
      greenScore: 8.7,
      aqi: 58,
      ndvi: 0.75,
      zoneType: "Residential",
      price: 720000,
      distance: 2.1,
      highlights: ["River access", "Good air quality", "Historic district"]
    },
    {
      id: "3",
      address: "Long Island City, Queens",
      greenScore: 8.1,
      aqi: 72,
      ndvi: 0.68,
      zoneType: "Mixed-use",
      price: 650000,
      distance: 4.2,
      highlights: ["Developing area", "Transportation hub", "Investment potential"]
    },
    {
      id: "4",
      address: "Williamsburg, Brooklyn", 
      greenScore: 7.9,
      aqi: 70,
      ndvi: 0.65,
      zoneType: "Commercial",
      price: 780000,
      distance: 1.8,
      highlights: ["Trendy neighborhood", "Waterfront", "Cultural district"]
    },
    {
      id: "5",
      address: "Astoria, Queens",
      greenScore: 7.6,
      aqi: 75,
      ndvi: 0.61,
      zoneType: "Residential",
      price: 580000,
      distance: 5.5,
      highlights: ["Affordable", "Diverse community", "Growing area"]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-vegetation-high";
    if (score >= 8) return "text-primary";
    if (score >= 7) return "text-airQuality-moderate";
    return "text-muted-foreground";
  };

  const getAQIBadge = (aqi: number) => {
    if (aqi <= 50) return { color: "bg-airQuality-good/10 text-airQuality-good border-airQuality-good/20", label: "Good" };
    if (aqi <= 100) return { color: "bg-airQuality-moderate/10 text-airQuality-moderate border-airQuality-moderate/20", label: "Moderate" };
    return { color: "bg-airQuality-poor/10 text-airQuality-poor border-airQuality-poor/20", label: "Poor" };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Plot Recommender</h1>
          <p className="text-muted-foreground">AI-powered recommendations based on environmental criteria</p>
        </div>
        
        <Button variant="outline" className="gap-2">
          <Eye className="h-4 w-4" />
          View on Map
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="shadow-card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Budget Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Budget Range</label>
                <div className="px-2">
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    max={2000000}
                    min={200000}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$200K</span>
                    <span>${(budget[0] / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>

              {/* Green Score Threshold */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Minimum Green Score</label>
                <div className="px-2">
                  <Slider
                    value={minGreenScore}
                    onValueChange={setMinGreenScore}
                    max={10}
                    min={5}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5.0</span>
                    <span>{minGreenScore[0].toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Zone Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Zone Type</label>
                <Select value={zoneFilter} onValueChange={setZoneFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="mixed-use">Mixed-use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greenScore">Green Score</SelectItem>
                    <SelectItem value="aqi">Air Quality</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Recommended Plots</h2>
              <Badge variant="secondary">{recommendations.length} results</Badge>
            </div>
            
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
          </div>

          {/* Recommendations Grid */}
          <div className="grid gap-4">
            {recommendations.map((plot, index) => (
              <Card key={plot.id} className="shadow-card-soft hover:shadow-environmental transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {plot.address}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {plot.zoneType} • {plot.distance} km from center • ${(plot.price / 1000).toFixed(0)}K
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        #{index + 1}
                      </Badge>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className={`text-lg font-bold ${getScoreColor(plot.greenScore)}`}>
                            {plot.greenScore}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">Green Score</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Environmental Metrics */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">Environmental Data</h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Air Quality</span>
                          <Badge variant="secondary" className={getAQIBadge(plot.aqi).color}>
                            {plot.aqi} {getAQIBadge(plot.aqi).label}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Vegetation Index</span>
                          <div className="flex items-center gap-2">
                            <Progress value={plot.ndvi * 100} className="w-16 h-1" />
                            <span className="text-sm font-medium">{plot.ndvi.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">Key Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {plot.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">Actions</h4>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          Compare
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}