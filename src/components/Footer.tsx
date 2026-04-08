import { Car } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border py-12 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Car className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Go<span className="text-gradient">Cab</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your reliable ride, anytime, anywhere. Fast pickups and safe journeys guaranteed.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About Us</a>
              <a href="#" className="hover:text-foreground transition-colors">Careers</a>
              <a href="#" className="hover:text-foreground transition-colors">Blog</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
              <a href="#" className="hover:text-foreground transition-colors">Safety</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © 2026 GoCab. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
