import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Location = {
  lat: number;
  lng: number;
  name: string;
};

const MapComponent = ({ locations }: { locations: Location[] }) => (
  <MapContainer
    center={[35.6895, 139.6917]}
    zoom={10}
    style={{ height: "100vh", width: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {locations.map((loc, idx) => (
      <Marker key={idx} position={[loc.lat, loc.lng]}>
        <Popup>{loc.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default MapComponent;
