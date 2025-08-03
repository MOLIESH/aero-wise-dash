import { Shield, Leaf, Wind, Droplets, Sun, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function GreenScore() {
  const overallScore = 8.4;
  const metrics = [
    { name: "Air Quality", score: 7.8, weight: 30, icon: Wind, color: "text-airQuality-moderate" },
    { name: "Vegetation Cover", score: 9.2, weight: 25, icon: Leaf, color: "text-vegetation-high" },
    { name: "Water Quality", score: 8.1, weight: 20, icon: Droplets, color: "text-accent" },
    { name: "Noise Levels", score: 8.9, weight: 15, icon: Sun, color: "text-primary" },
    { name: "Urban Heat", score: 7.5, weight: 10, icon: Sun, color: "text-airQuality-moderate" }
  ];

  const getScoreLevel = (score: number) => {
    if (score >= 9) return { label: "Excellent", color: "bg-vegetation-high/10 text-vegetation-high border-vegetation-high/20" };
    if (score >= 8) return { label: "Very Good", color: "bg-primary/10 text-primary border-primary/20" };
    if (score >= 7) return { label: "Good", color: "bg-airQuality-moderate/10 text-airQuality-moderate border-airQuality-moderate/20" };
    if (score >= 6) return { label: "Fair", color: "bg-airQuality-poor/10 text-airQuality-poor border-airQuality-poor/20" };
    return { label: "Poor", color: "bg-destructive/10 text-destructive border-destructive/20" };
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Green Score Analysis</h1>
        <p className="text-muted-foreground">Comprehensive environmental health assessment</p>
      </div>

      {/* Overall Score */}
      <Card className="shadow-environmental">
        <CardHeader className="text-center">
          <div className="mx-auto w-32 h-32 rounded-full bg-gradient-environmental flex items-center justify-center mb-4">
            <div className="text-4xl font-bold text-white">{overallScore}</div>
          </div>
          <CardTitle className="text-2xl">Overall Green Score</CardTitle>
          <CardDescription>
            <Badge className={getScoreLevel(overallScore).color}>
              {getScoreLevel(overallScore).label}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            This location ranks in the top 15% of monitored areas for environmental quality.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Download Report</Button>
            <Button variant="outline">Compare Locations</Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.name} className="shadow-card-soft">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                {metric.name}
              </CardTitle>
              <CardDescription>Weight: {metric.weight}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.score}</span>
                  <Badge className={getScoreLevel(metric.score).color}>
                    {getScoreLevel(metric.score).label}
                  </Badge>
                </div>
                <Progress value={metric.score * 10} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  Contributes {(metric.score * metric.weight / 100).toFixed(1)} points to overall score
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card className="shadow-card-soft">
        <CardHeader>
          <CardTitle>Improvement Recommendations</CardTitle>
          <CardDescription>Actions that could enhance the environmental score</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-vegetation-high/5 border border-vegetation-high/20">
              <Leaf className="h-5 w-5 text-vegetation-high mt-0.5" />
              <div>
                <h4 className="font-medium">Increase Green Coverage</h4>
                <p className="text-sm text-muted-foreground">
                  Adding 20% more vegetation could improve the score by 0.3 points
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg bg-airQuality-moderate/5 border border-airQuality-moderate/20">
              <Wind className="h-5 w-5 text-airQuality-moderate mt-0.5" />
              <div>
                <h4 className="font-medium">Air Quality Improvement</h4>
                <p className="text-sm text-muted-foreground">
                  Reducing traffic emissions could boost air quality rating
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/20">
              <Droplets className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-medium">Water Management</h4>
                <p className="text-sm text-muted-foreground">
                  Enhanced stormwater systems could improve water quality metrics
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}