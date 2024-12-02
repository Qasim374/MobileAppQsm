import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { ResizeMode, Video } from "expo-av";

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
        <Video
          source={{ uri: video }}
          className="w-full h-72 rounded-[30px] my-5 overflow-hidden shadow-lg shadow-black/10 mt-3  "
          resizeMode={ResizeMode.CONTAIN}
          style={{
            width: "100%", // w-52 (52 * 4)
            height: 288, // h-72 (72 * 4)
            borderRadius: 30, // rounded-[30px]
            marginTop: 12,
            justifyContent: "center",
          }}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className=" w-full rounded-xl h-60 mt-3  justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full rounded-xl h-60 mt-3 "
            resizeMode="cover"
            style={{ width: 370, height: 240 }}
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute  "
            resizeMode="contain"
            style={{ width: 48, height: 48 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
