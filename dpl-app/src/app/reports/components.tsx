import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Coordinate = {
  lat: number;
  lng: number;
};

interface MapProps {
  coordinates: Coordinate[];
}

export const Map: React.FC<MapProps> = ({ coordinates }) => {
  if (!coordinates || coordinates.length < 4) {
    return <div>Loading map...</div>; 
  }

  const [northWest, northEast, southEast, southWest] = coordinates;

  if (!northWest || !northEast || !southEast || !southWest) {
    return <div>Error: Invalid coordinates provided</div>;
  }

  const polygonPoints: [number, number][] = [
    [northWest.lat, northWest.lng], 
    [northEast.lat, northEast.lng], 
    [southEast.lat, southEast.lng], 
    [southWest.lat, southWest.lng], 
  ];

  const bounds: [number, number][] = [
    [northWest.lat, northWest.lng], 
    [southEast.lat, southEast.lng], 
  ];

  return (
    <MapContainer bounds={bounds} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJvdG9neSIsImEiOiJjbTFjZnh4NXUyMjcwMmlzajhiaWYwMnNiIn0.VQuy6KiKnCYjpLgLMkLjUA`}
        attribution={`&copy; <a href="https://www.mapbox.com/">Mapbox</a>`} 
      />
      <Polygon
        positions={polygonPoints}
        pathOptions={{ color: '#E1EBEE' }} 
      />
    </MapContainer>
  );
};


export function GridComponent() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4">
      {/* First Row */}
      <div className="w-48 h-32 bg-blue-500 text-white p-4 overflow-hidden">
        <p>This is a grid item with fixed width and height. Content can overflow but will be hidden.</p>
      </div>
      <div className="w-48 h-32 bg-green-500 text-white p-4 text-ellipsis overflow-hidden whitespace-nowrap">
        <p>This content is long enough to trigger truncation. It will be truncated with an ellipsis.</p>
      </div>
      <div className="w-48 h-32 bg-red-500 text-white p-4">
        <p>This is another fixed-size grid item.</p>
      </div>

      {/* Second Row */}
      <div className="w-48 h-32 bg-yellow-500 text-white p-4 overflow-hidden">
        <p>This grid item hides overflow content.</p>
      </div>
      <div className="w-48 h-32 bg-purple-500 text-white p-4">
        <p>Another grid item with fixed size.</p>
      </div>
      <div className="w-48 h-32 bg-pink-500 text-white p-4 text-ellipsis overflow-hidden whitespace-nowrap">
        <p>More content that should be truncated...</p>
      </div>
    </div>
  );
}
