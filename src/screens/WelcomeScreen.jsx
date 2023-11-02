import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // make font and width / height responseive in all divice
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import Splash from "../../assets/images/welcome.png";

export default function WelcomeScreen() {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;

    setTimeout(() => {
      ring1Padding.value = withSpring(ring1Padding.value + hp(5.5));
    }, 100);

    setTimeout(() => {
      ring2Padding.value = withSpring(ring1Padding.value + hp(5.5));
    }, 300);

    setTimeout(() => {
      navigation.navigate("Home");
    }, 2500);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-amber-500 space-y-10">
      <StatusBar style="light" />

      {/* image splash  */}
      <Animated.View
        className="bg-white/20 rounded-full "
        style={{ padding: ring1Padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full p-8"
          style={{ padding: ring2Padding }}
        >
          <Image source={Splash} style={{ height: hp(20), width: hp(20) }} />
        </Animated.View>
      </Animated.View>

      {/* title  */}
      <View className="space-y-2 flex items-center">
        <Text
          className="font-bold text-white/80 tracking-widest"
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-medium text-white/80 tracking-widest"
          style={{ fontSize: hp(2) }}
        >
          Food is always right!
        </Text>
      </View>
    </View>
  );
}
