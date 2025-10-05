import { Button } from "@/components/ui/button";
import { HandCoins } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="bg-muted rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
              <HandCoins className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Pssst!</h3>
              <p className="text-muted-foreground">
                Want exclusive insights and best offers? Join GreenPulse today!
              </p>
            </div>
          </div>
          
          <Button className="bg-primary hover:bg-primary/90 text-white px-8">
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
