import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "124",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}
          className="pr-2 pl-6 pb-8 pt-4 bg-gray-200 rounded-md m-5 w-40 "
        >
          <View className={`flex items-center ${!origin && "opacity-50"}`}>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}
            />
            <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
            <View className="p-2 bg-black rounded-4 w-10 mt-4">
              <Icon name="arrowright" color="white" type="antdesign" />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
