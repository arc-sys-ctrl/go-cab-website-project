import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-card to-card border border-primary/10 p-12 md:p-16 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Ready to <span className="text-gradient">Go</span>?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
              Download the app or book online. Your next ride is just a tap away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl px-8 gap-2" onClick={() => navigate("/book")}>
                Book a Ride
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl px-8 border-border text-foreground hover:bg-secondary">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
