import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-bold text-6xl">Aora!</Text>
      <Link href="/profile" className="text-blue-700">
        Go to profile
      </Link>
    </View>
  );
}
