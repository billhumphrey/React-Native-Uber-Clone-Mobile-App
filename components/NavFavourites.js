import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Juja City Mall, Kalimoni, Kenya",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Fedha Plaza, Mpaka Road, Nairobi, Kenya",
  },
];

const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View className="mb-auto border-b border-gray-200" />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity className="flex-row items-center p-5">
          <Icon
            className="mr-4 rounded-full bg-gray-300 p-3"
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text className="font-semibold text-lg">{location}</Text>
            <Text className="text-gray-500">{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;
