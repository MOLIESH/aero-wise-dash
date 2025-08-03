import { useState } from "react";
import { Calendar, MapPin, Sliders, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const [aqiRange, setAqiRange] = useState([0, 300]);
  const [ndviRange, setNdviRange] = useState([0, 1]);

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-16 bottom-0 w-80 bg-background border-l shadow-lg z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sliders className="h-5 w-5" />
            Filters & Controls
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Location Search */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Search city, address, or coordinates..." />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Date Range */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Time Period
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">From</Label>
                  <Input type="date" className="text-xs" />
                </div>
                <div>
                  <Label className="text-xs">To</Label>
                  <Input type="date" className="text-xs" />
                </div>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Quick select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Air Quality Index */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Air Quality Index (AQI)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="px-2">
                <Slider
                  value={aqiRange}
                  onValueChange={setAqiRange}
                  max={300}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{aqiRange[0]}</span>
                  <span>{aqiRange[1]}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-airQuality-good"></div>
                  <span>Good (0-50)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-airQuality-moderate"></div>
                  <span>Moderate (51-100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-airQuality-poor"></div>
                  <span>Poor (101-200)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-airQuality-unhealthy"></div>
                  <span>Unhealthy (201+)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vegetation Index */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Vegetation Index (NDVI)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="px-2">
                <Slider
                  value={ndviRange}
                  onValueChange={setNdviRange}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{ndviRange[0].toFixed(1)}</span>
                  <span>{ndviRange[1].toFixed(1)}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-vegetation-low"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-vegetation-medium"></div>
                  <span>Med</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-vegetation-high"></div>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zone Type */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Zone Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All zones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="recreational">Recreational</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1" size="sm">
              Apply Filters
            </Button>
            <Button variant="outline" size="sm">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}