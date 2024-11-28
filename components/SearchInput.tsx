import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  handeChangeText,
  otherStyles,
  keyboardType,
  ...props
}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handeChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        {...props}
      />

      <TouchableOpacity>
        <Image
          source={icons.search}
          resizeMode="contain"
          className="w-6 h-6"
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
