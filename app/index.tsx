import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-pblack text-2xl">Aora!</Text>
      <Link href="/home" className="text-blue-700">
        Go to profile
      </Link>
    </View>
  );
}
