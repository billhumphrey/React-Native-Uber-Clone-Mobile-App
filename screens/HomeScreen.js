import { Text, SafeAreaView, View, Image } from "react-native";
import React from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const googleUrl = process.env.EXPO_PUBLIC_API_GOOGLE;

const HomeScreen = () => {
    const dispatch = useDispatch();
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="bg-white h-full">
        <View className="p-5">
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
            source={{ uri: "https://links.papareact.com/gzs" }}
          />
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={(data, details = null) => {
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description
                }))

                dispatch(setDestination(null));
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: googleUrl,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            placeholder="Where From?"
          />
          <NavOptions />
          <NavFavourites />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
