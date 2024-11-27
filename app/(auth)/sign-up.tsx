import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/Appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const signUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill all the fields");
      return; // Return here to avoid continuing with an incomplete form
    }
    setIsSubmitting(true);
    try {
      console.log("Creating user...");
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      console.log("User created successfully:", result);
      console.log("Redirecting to /home...");
      router.replace("/home");
    } catch (error) {
      console.error("Error during sign-up:", error);
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
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handeChangeText={(e: any) => {
              setForm({ ...form, username: e });
            }}
            otherStyles="mt-10"
          />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center pt-5  gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an already account?
            </Text>
            <Link
              className="text-lg text-secondary font-psemibold"
              href="/sign-in"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUp;
