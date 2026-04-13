import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft, MapPin, Navigation, Clock } from "lucide-react";

interface Ride {
  id: string;
  pickup_address: string;
  dropoff_address: string;
  distance_km: number | null;
  fare_estimate: number | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  requested: "bg-yellow-500/20 text-yellow-400",
  accepted: "bg-blue-500/20 text-blue-400",
  in_progress: "bg-primary/20 text-primary",
  completed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const Rides = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchRides = async () => {
      const { data } = await supabase
        .from("rides")
        .select("id, pickup_address, dropoff_address, distance_km, fare_estimate, status, created_at")
        .order("created_at", { ascending: false });
      setRides(data || []);
      setLoading(false);
    };
    fetchRides();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Car className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold">My Rides</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>
        ) : rides.length === 0 ? (
          <div className="text-center py-16">
            <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No rides yet</h2>
            <p className="text-muted-foreground mb-6">Book your first ride to get started!</p>
            <Button onClick={() => navigate("/book")}>Book a Ride</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <div key={ride.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[ride.status] || "bg-muted text-muted-foreground"}`}>
                    {ride.status.replace("_", " ")}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(ride.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Navigation className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="truncate">{ride.pickup_address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="truncate">{ride.dropoff_address}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
                  {ride.distance_km && <span>{ride.distance_km} km</span>}
                  {ride.fare_estimate && <span className="text-primary font-bold">${ride.fare_estimate.toFixed(2)}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rides;
