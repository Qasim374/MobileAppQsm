import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signInL } from "@/lib/Appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const signIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
      return; // Return here to avoid continuing with an incomplete form
    }
    setIsSubmitting(true);
    try {
      console.log("signIn user...");
      await signInL(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      console.log("User sign in:", result);
      console.log("Redirecting to /home...");
      router.replace("/home");
    } catch (error) {
      console.error("Error during sign-in:", error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[82vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            // className="w-[115px] h-[15px]"
            style={{ width: 115, height: 35 }}
          />
          <Text className="font-semibold text-2xl text-white mt-7 font-psemibold">
            Login to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handeChangeText={(e: any) => {
              setForm({ ...form, email: e });
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handeChangeText={(e: any) => {
              setForm({ ...form, password: e });
            }}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center pt-5  gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              className="text-lg text-secondary font-psemibold"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;
