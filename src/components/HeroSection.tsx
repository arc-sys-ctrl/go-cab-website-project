import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="City at night" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Navigation className="w-3.5 h-3.5" />
            Available 24/7 in your city
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
            Your ride,
            <br />
            <span className="text-gradient">anywhere</span>
            <br />
            anytime.
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
            Fast, reliable, and affordable cab service at your fingertips. Get where you need to go with Go Cab.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 flex-1">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <input
                type="text"
                placeholder="Where to?"
                className="bg-transparent text-foreground placeholder:text-muted-foreground outline-none w-full text-sm"
              />
            </div>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl px-8 gap-2" onClick={() => navigate("/book")}>
              Book Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div>
              <span className="text-2xl font-bold text-foreground block">10K+</span>
              Daily rides
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="text-2xl font-bold text-foreground block">4.9★</span>
              User rating
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="text-2xl font-bold text-foreground block">3 min</span>
              Avg. pickup
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
