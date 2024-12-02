import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import * as animatable from "react-native-animatable";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

const ZoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const ZoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);
  return (
    <animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? ZoomIn : ZoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[30px] my-5 overflow-hidden shadow-lg shadow-black/10 mt-3  "
          resizeMode={ResizeMode.CONTAIN}
          style={{
            width: 208, // w-52 (52 * 4)
            height: 288, // h-72 (72 * 4)
            borderRadius: 30, // rounded-[30px]
            marginVertical: 20, // my-5 (5 * 4)
            overflow: "hidden", // overflow-hidden
            shadowColor: "#000", // shadow-black
            shadowOffset: { width: 0, height: 2 }, // Default shadow offset for Tailwind shadows
            shadowOpacity: 0.1, // shadow-black/10
            shadowRadius: 4, // Adjusted for shadow spread
            elevation: 5, // Equivalent for Android shadow
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
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-52 h-72 rounded-[30px] my-5 overflow-hidden shadow-lg shadow-black/50 "
            // style={{ width: 208, height: 288 }}
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute  "
            resizeMode="contain"
            style={{ width: 48, height: 48 }}
          />
        </TouchableOpacity>
      )}
    </animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }).current;
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      ListFooterComponent={<View style={{ width: 10 }} />}
      horizontal
    />
  );
};

export default Trending;
