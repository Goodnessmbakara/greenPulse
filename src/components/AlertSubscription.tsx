import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, MessageSquare, CheckCircle2 } from "lucide-react";

const AlertSubscription = () => {
  const { toast } = useToast();
  const [subscribed, setSubscribed] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    smsAlerts: true,
    emailAlerts: true,
    peakBloom: true,
    temperatureAlerts: true,
    pestRisks: false,
  });

  const handleSubscribe = () => {
    // Validation
    if (!formData.phone && !formData.email) {
      toast({
        title: "Contact Required",
        description: "Please provide either a phone number or email address.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.smsAlerts && !formData.emailAlerts) {
      toast({
        title: "Alert Method Required",
        description: "Please select at least one alert method (SMS or Email).",
        variant: "destructive",
      });
      return;
    }

    // Success
    setSubscribed(true);
    toast({
      title: "Successfully Subscribed!",
      description: "You'll receive bloom predictions and alerts via your selected methods.",
    });
  };

  if (subscribed) {
    return (
      <Card className="border-2 border-green-500">
        <CardContent className="p-6 sm:p-8">
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">You're All Set!</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              You'll receive bloom predictions and alerts via:
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {formData.smsAlerts && formData.phone && (
                <Badge className="bg-green-500">📱 SMS: {formData.phone}</Badge>
              )}
              {formData.emailAlerts && formData.email && (
                <Badge className="bg-blue-500">✉️ Email: {formData.email}</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Powered by NASA MODIS satellite data • Updated every 8 days
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl">Subscribe to Bloom Alerts</CardTitle>
            <CardDescription className="mt-2">
              Get notified when bloom events occur in your region
            </CardDescription>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">Coming Soon</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4" />
              Phone Number (For SMS Alerts)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+2347041203832"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="text-sm sm:text-base"
            />
            <p className="text-xs text-muted-foreground mt-1">
              SMS alerts work without internet - perfect for rural farmers
            </p>
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Alert Methods */}
        <div className="border-t pt-4">
          <Label className="text-sm font-semibold mb-3 block">Alert Methods</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="sms" 
                checked={formData.smsAlerts}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, smsAlerts: checked as boolean }))}
              />
              <Label htmlFor="sms" className="cursor-pointer text-sm">
                SMS Notifications (for rural areas without internet)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="email-alerts" 
                checked={formData.emailAlerts}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emailAlerts: checked as boolean }))}
              />
              <Label htmlFor="email-alerts" className="cursor-pointer text-sm">
                Email Notifications
              </Label>
            </div>
          </div>
        </div>

        {/* Alert Types */}
        <div className="border-t pt-4">
          <Label className="text-sm font-semibold mb-3 block">What to Alert Me About</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="peak-bloom" 
                checked={formData.peakBloom}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, peakBloom: checked as boolean }))}
              />
              <Label htmlFor="peak-bloom" className="cursor-pointer text-sm">
                Peak Bloom Events (optimal harvest timing)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="temp-alerts" 
                checked={formData.temperatureAlerts}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, temperatureAlerts: checked as boolean }))}
              />
              <Label htmlFor="temp-alerts" className="cursor-pointer text-sm">
                Temperature Anomalies (frost risks, heat waves)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pest-risks" 
                checked={formData.pestRisks}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, pestRisks: checked as boolean }))}
              />
              <Label htmlFor="pest-risks" className="cursor-pointer text-sm">
                Pest Risk Predictions (pre/post-bloom)
              </Label>
            </div>
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="pt-4">
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleSubscribe}
          >
            <Bell className="mr-2 w-4 h-4" />
            Subscribe to Alerts
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-3">
            Free during beta • Multi-language support coming soon
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs sm:text-sm text-blue-800">
            <strong>🛰️ NASA Data-Driven:</strong> Alerts are based on real-time MODIS satellite observations, 
            updated every 8 days. Perfect for climate-resilient farming.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertSubscription;
