import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft, MapPin, Navigation, X, Clock, DollarSign, Route } from "lucide-react";
import { toast } from "sonner";
import BookingMap from "@/components/BookingMap";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const FARE_PER_KM = 1.5;
const BASE_FARE = 3.0;

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const Book = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [selectingType, setSelectingType] = useState<"pickup" | "dropoff">("pickup");
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const distance = pickup && dropoff ? haversineDistance(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng) : 0;
  const fare = distance > 0 ? BASE_FARE + distance * FARE_PER_KM : 0;
  const eta = Math.max(2, Math.round(distance * 2.5));

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    // Reverse geocode using Nominatim
    let address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data.display_name) {
        address = data.display_name.split(",").slice(0, 3).join(",");
      }
    } catch {}

    const loc: Location = { lat, lng, address };
    if (selectingType === "pickup") {
      setPickup(loc);
      setSelectingType("dropoff");
    } else {
      setDropoff(loc);
    }
  }, [selectingType]);

  const handleBook = async () => {
    if (!pickup || !dropoff || !user) return;
    setBooking(true);
    try {
      const { error } = await supabase.from("rides").insert({
        user_id: user.id,
        pickup_address: pickup.address,
        pickup_lat: pickup.lat,
        pickup_lng: pickup.lng,
        dropoff_address: dropoff.address,
        dropoff_lat: dropoff.lat,
        dropoff_lng: dropoff.lng,
        distance_km: Math.round(distance * 100) / 100,
        fare_estimate: Math.round(fare * 100) / 100,
        status: "requested",
      });
      if (error) throw error;
      setBooked(true);
      toast.success("Ride booked! A driver will be assigned shortly.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBooking(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  }

  if (booked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Car className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Ride Booked!</h1>
          <p className="text-muted-foreground mb-2">Your ride from</p>
          <p className="text-sm text-foreground font-medium mb-1">{pickup?.address}</p>
          <p className="text-muted-foreground mb-1">to</p>
          <p className="text-sm text-foreground font-medium mb-4">{dropoff?.address}</p>
          <div className="flex justify-center gap-6 mb-8 text-sm">
            <div><span className="text-primary font-bold">${fare.toFixed(2)}</span><br/><span className="text-muted-foreground">Fare</span></div>
            <div><span className="text-primary font-bold">{distance.toFixed(1)} km</span><br/><span className="text-muted-foreground">Distance</span></div>
            <div><span className="text-primary font-bold">~{eta} min</span><br/><span className="text-muted-foreground">ETA</span></div>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => { setPickup(null); setDropoff(null); setBooked(false); setSelectingType("pickup"); }}>
              Book Another Ride
            </Button>
            <Button variant="outline" onClick={() => navigate("/rides")}>
              View My Rides
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Car className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold">Book a Ride</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Map */}
        <div className="flex-1 relative">
          <BookingMap pickup={pickup} dropoff={dropoff} onMapClick={handleMapClick} />
          <div className="absolute top-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl border border-border p-3 text-sm">
            <p className="text-primary font-medium">
              {selectingType === "pickup" ? "📍 Tap map to set pickup location" : "📍 Tap map to set drop-off location"}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-card border-t lg:border-t-0 lg:border-l border-border p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Ride Details</h2>

          {/* Pickup */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Navigation className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Pickup</p>
              {pickup ? (
                <div className="flex items-center gap-2">
                  <p className="text-sm truncate">{pickup.address}</p>
                  <button onClick={() => { setPickup(null); setSelectingType("pickup"); }} className="text-muted-foreground hover:text-foreground shrink-0"><X className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <button onClick={() => setSelectingType("pickup")} className={`text-sm ${selectingType === "pickup" ? "text-primary" : "text-muted-foreground"}`}>
                  Select on map
                </button>
              )}
            </div>
          </div>

          {/* Dropoff */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Drop-off</p>
              {dropoff ? (
                <div className="flex items-center gap-2">
                  <p className="text-sm truncate">{dropoff.address}</p>
                  <button onClick={() => { setDropoff(null); setSelectingType("dropoff"); }} className="text-muted-foreground hover:text-foreground shrink-0"><X className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <button onClick={() => setSelectingType("dropoff")} className={`text-sm ${selectingType === "dropoff" ? "text-primary" : "text-muted-foreground"}`}>
                  Select on map
                </button>
              )}
            </div>
          </div>

          {/* Fare estimate */}
          {pickup && dropoff && (
            <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Route className="w-4 h-4" /> Distance</span>
                <span className="font-medium">{distance.toFixed(1)} km</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Clock className="w-4 h-4" /> Est. Time</span>
                <span className="font-medium">~{eta} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><DollarSign className="w-4 h-4" /> Fare</span>
                <span className="text-xl font-bold text-primary">${fare.toFixed(2)}</span>
              </div>
            </div>
          )}

          <Button
            size="lg"
            className="w-full font-bold mt-auto"
            disabled={!pickup || !dropoff || booking}
            onClick={handleBook}
          >
            {booking ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Book;
