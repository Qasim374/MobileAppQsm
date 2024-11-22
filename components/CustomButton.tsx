import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: any) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-100 min-h-[62px] justify-center items-center rounded-xl ${containerStyles} ${
        isLoading ? "opactiy-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`font-psemibold text-primary text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
