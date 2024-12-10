import React, { useEffect, useState } from "react";
import axios from "axios";
import MapComponent from "./components/MapComponent";

type Location = {
  lat: number;
  lng: number;
  name: string;
};

const App = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchData();
  }, []);

  return <MapComponent locations={locations} />;
};

export default App;
