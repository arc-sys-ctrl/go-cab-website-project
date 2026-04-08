import { MapPin, Car, CreditCard } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    step: "01",
    title: "Set Your Pickup",
    description: "Enter your location and destination. We'll find the nearest available cab for you.",
  },
  {
    icon: Car,
    step: "02",
    title: "Get Matched",
    description: "A verified driver accepts your request and heads to your location in minutes.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Ride & Pay",
    description: "Enjoy your ride and pay seamlessly with cash or card. It's that simple.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Three steps to your <span className="text-gradient">ride</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, i) => (
            <div key={item.step} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary tracking-widest">STEP {item.step}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
