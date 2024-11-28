import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: any) => {
  const [play, setPlay] = useState(false);
  // console.log("Avatar URL:", avatar);
  return (
    <View className="flex-col  px-4 mb-10">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg  border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              resizeMode="contain"
              style={{ width: 46, height: 46, borderRadius: 10 }}
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-sm text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-white font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <Image
          source={icons.menu}
          resizeMode="contain"
          style={{ width: 24, height: 24 }}
        />
      </View>
      {play ? (
        <Text className="text-white">playing</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full rounded-xl h-60 mt-3 "
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full rounded-xl h-60 mt-3 "
            resizeMode="cover"
            style={{ width: 370, height: 240 }}
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute m-32 "
            resizeMode="contain"
            style={{ width: 48, height: 48 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
