import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "@rneui/base";

const googleUrl = process.env.EXPO_PUBLIC_API_GOOGLE;

const NavigateCard = () => {
  const dispatch = useDispatch(setDestination);
  const navigation = useNavigation();

  return (
    <View className="bg-white flex-1 ">
      <Text className="text-center py-5 text-xl">Good Morning, DevF3lOh</Text>
      <View className="border-t border-gray-200 flex-shrink">
        <View>
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0,
                paddingTop: 20,
              },
              textInput: {
                fontSize: 18,
                borderRadius: 0,
                backgroundColor: "#DDDDDF",
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              navigation.navigate("RideOptionsCard");
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
            placeholder="Where To?"
          />
        </View>

        <NavFavourites />
      </View>
      <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          className="flex flex-row justify-between  bg-black w-24 px-4 py-3 rounded-full"
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text className="text-white text-center">Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row justify-between w-24 px-4 py-3 rounded-full">
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text className="text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigateCard;
