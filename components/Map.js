import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";

const googleUrl = process.env.EXPO_PUBLIC_API_GOOGLE;

export default function Map() {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=imperial&key=${googleUrl}`
        );
        dispatch(setTravelTimeInformation(res.data.rows[0].elements[0]));
      } catch (error) {
        console.error("Failed to fetch Distance Matrix", error);
      }
    };

    getTravelTime();
  }, [origin, destination, googleUrl]);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      //   mapType="mutedStandard"
      className="flex-1"
      region={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={googleUrl}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
}
