import { Car, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Go<span className="text-gradient">Cab</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => navigate("/rides")}>My Rides</Button>
              <Button size="sm" className="font-semibold" onClick={() => navigate("/book")}>Book a Ride</Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleSignOut}><LogOut className="w-4 h-4" /></Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => navigate("/auth")}>Log in</Button>
              <Button size="sm" className="font-semibold" onClick={() => navigate("/book")}>Book a Ride</Button>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 flex flex-col gap-3">
          <a href="#services" className="text-sm text-muted-foreground py-2">Services</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground py-2">How It Works</a>
          <a href="#pricing" className="text-sm text-muted-foreground py-2">Pricing</a>
          <a href="#contact" className="text-sm text-muted-foreground py-2">Contact</a>
          {user ? (
            <>
              <Button size="sm" variant="ghost" className="w-full" onClick={() => navigate("/rides")}>My Rides</Button>
              <Button size="sm" className="font-semibold w-full" onClick={() => navigate("/book")}>Book a Ride</Button>
              <Button size="sm" variant="ghost" className="w-full text-muted-foreground" onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" className="w-full" onClick={() => navigate("/auth")}>Log in</Button>
              <Button size="sm" className="font-semibold w-full" onClick={() => navigate("/book")}>Book a Ride</Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
