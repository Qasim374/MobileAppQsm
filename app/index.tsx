import { Redirect, router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[85vh] items-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[130px]"
            resizeMode="contain"
            style={{ width: 130, height: 130 }}
          />

          <Image
            source={images.cards}
            className="w-[130px] h-[130px]"
            resizeMode="contain"
            style={{ width: 380, height: 300 }}
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possiblites with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              style={{ width: 136, height: 15 }}
              className="absolute w-[136px] h-[15px] -bottom-2 right-3"
            />
          </View>

          <Text className=" text-center text-gray-200 mt-7 text-sm font-pregular">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor="#161622" // For Android
        style="light" // For iOS and Android
        translucent={false} // Makes the StatusBar opaque
      />
    </SafeAreaView>
  );
}
