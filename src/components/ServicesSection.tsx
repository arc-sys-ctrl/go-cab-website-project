import { Car, Clock, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "City Rides",
    description: "Comfortable rides across the city with professional drivers at competitive prices.",
  },
  {
    icon: Zap,
    title: "Express Pickup",
    description: "Need a ride fast? Our express service gets you a cab in under 3 minutes.",
  },
  {
    icon: Clock,
    title: "Airport Transfers",
    description: "Reliable airport pickups and drop-offs. Never miss a flight again.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All rides are GPS-tracked with verified drivers and 24/7 support.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Why choose <span className="text-gradient">Go Cab</span>?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.title} className="glow-card rounded-2xl bg-card p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
