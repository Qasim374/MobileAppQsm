import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }: any) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        style={{ width: 270, height: 270 }}
      />
      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl font-psemibold text-gray-100 mt-2">
        {subtitle}
      </Text>
      <CustomButton
        title="create video"
        handlePress={() => router.push("/create")}
        containerStyles="my-5 w-full"
      />
    </View>
  );
};

export default EmptyState;
