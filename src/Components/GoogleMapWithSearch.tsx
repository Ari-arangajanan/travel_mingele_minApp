import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Libraries,
} from "@react-google-maps/api";
import { Box, TextField } from "@mui/material";

interface MapWithSearchProps {
  onLocationChange: (lat: number, lng: number) => void;
  defaultLat?: number;
  defaultLng?: number;
}

const libraries = ["places"] as Libraries;

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  marginTop: "10px",
};
const GoogleMapWithSearch: React.FC<MapWithSearchProps> = ({
  onLocationChange,
  defaultLat,
  defaultLng,
}) => {
  const [center, setCenter] = useState({
    lat: defaultLat || 7.0,
    lng: defaultLng || 81.0,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: defaultLat || 7.0,
    lng: defaultLng || 81.0,
  });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null); // Ref for Autocomplete instance

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        searchInputRef.current!
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current!.getPlace();
        if (place.geometry && place.geometry.location) {
          const location = place.geometry.location;
          setCenter({ lat: location.lat(), lng: location.lng() });
          setMarkerPosition({ lat: location.lat(), lng: location.lng() });
          onLocationChange(location.lat(), location.lng());
        }
      });
    }
    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          autocompleteRef.current
        );
      }
    };
  }, [isLoaded, onLocationChange]);

  // Function to update location on map click
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      setCenter({ lat: newLat, lng: newLng });
      setMarkerPosition({ lat: newLat, lng: newLng });
      onLocationChange(newLat, newLng);
    }
  };

  if (loadError) return <div>Error loading maps!</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <Box>
      <TextField
        fullWidth
        inputRef={searchInputRef}
        type="text"
        placeholder="Search places..."
        margin="normal"
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </Box>
  );
};

export default GoogleMapWithSearch;
