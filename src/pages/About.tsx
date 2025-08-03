import { Leaf, Users, Target, Award, Mail, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const features = [
    {
      icon: Leaf,
      title: "Environmental Intelligence",
      description: "AI-powered analysis of air quality, vegetation, and environmental factors"
    },
    {
      icon: Target,
      title: "Smart Recommendations", 
      description: "Personalized plot suggestions based on environmental criteria and preferences"
    },
    {
      icon: Users,
      title: "Multi-User Platform",
      description: "Built for urban planners, real estate investors, and environmentally conscious citizens"
    },
    {
      icon: Award,
      title: "Proven Accuracy",
      description: "87%+ prediction accuracy using machine learning and satellite data"
    }
  ];

  const team = [
    { name: "Dr. Sarah Chen", role: "Environmental Data Scientist", expertise: "AI/ML, Climate Science" },
    { name: "Marcus Rodriguez", role: "Software Engineer", expertise: "Full-stack Development, GIS" },
    { name: "Dr. Priya Patel", role: "Urban Planning Expert", expertise: "Sustainable Development, Policy" },
    { name: "James Wilson", role: "Product Manager", expertise: "Environmental Tech, UX Design" }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-environmental rounded-full flex items-center justify-center">
            <Leaf className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">About AeroWise</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Empowering smarter urban development decisions through environmental intelligence and data-driven insights.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="shadow-environmental">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            AeroWise combines cutting-edge environmental data with artificial intelligence to help urban planners, 
            real estate investors, and citizens make informed decisions about land use and development. We believe 
            that environmental health should be at the center of every planning decision.
          </p>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-card-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <Card className="shadow-card-soft">
        <CardHeader>
          <CardTitle>Technology & Data Sources</CardTitle>
          <CardDescription>The technologies and data that power AeroWise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Machine Learning</h4>
              <div className="space-y-2">
                <Badge variant="outline">LSTM Neural Networks</Badge>
                <Badge variant="outline">Prophet Forecasting</Badge>
                <Badge variant="outline">Random Forest</Badge>
                <Badge variant="outline">Gradient Boosting</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Data Sources</h4>
              <div className="space-y-2">
                <Badge variant="outline">OpenAQ</Badge>
                <Badge variant="outline">Google Earth Engine</Badge>
                <Badge variant="outline">NASA MODIS</Badge>
                <Badge variant="outline">EPA AirNow</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Platform</h4>
              <div className="space-y-2">
                <Badge variant="outline">React + TypeScript</Badge>
                <Badge variant="outline">Python + FastAPI</Badge>
                <Badge variant="outline">PostgreSQL + PostGIS</Badge>
                <Badge variant="outline">Docker + Kubernetes</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member) => (
            <Card key={member.name} className="shadow-card-soft text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.expertise}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact & Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">General Inquiries</p>
              <p className="font-medium">hello@aerowise.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Technical Support</p>
              <p className="font-medium">support@aerowise.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Partnerships</p>
              <p className="font-medium">partners@aerowise.com</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              API Documentation
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Research Papers
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Data Methodology
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t">
        <p className="text-muted-foreground">
          © 2024 AeroWise. Making cities greener, one decision at a time.
        </p>
      </div>
    </div>
  );
}