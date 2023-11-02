import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useRecipe } from "../store/recipe";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // make font and width / height responseive in all divice
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import Animated from "react-native-reanimated";

export default function RecipeDetailScreen(props) {
  const { strMeal, strMealThumb, idMeal } = props.route.params;

  const navigation = useNavigation();

  const [isFav, setIsFav] = useState(false);

  const { getDetailRecipe, detailRecipe } = useRecipe((state) => state);

  useEffect(() => {
    getDetailRecipe(idMeal);
  }, [idMeal]);

  const BRadius = Platform.OS === "ios" ? 49 : 0;
  const platWidth = Platform.OS === "ios" ? wp(97) : wp(100);
  const platMTop = Platform.OS === "ios" ? 6 : 0;
  return (
    <View className="flex-1 bg-white ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className=""
      >
        <StatusBar style="light" />
        <View className="flex-row justify-center ">
          <Image
            source={strMealThumb}
            // sharedTransitionTag={strMeal} ///animasi keren //only work in native image
            style={{
              width: platWidth,
              height: hp(50),
              borderRadius: BRadius,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              marginTop: platMTop,
            }}
          />
        </View>
        {/* bell and avatar */}
        <View className=" px-4 flex-row items-center justify-between absolute w-full pt-14">
          <TouchableOpacity
            className="rounded-full bg-white p-2 flex-row justify-center"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={hp(4)} strokeWidth={4.5} color="#FFBF00" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full bg-white p-2 flex-row justify-center"
            onPress={() => setIsFav((f) => !f)}
          >
            <HeartIconSolid
              size={hp(4)}
              strokeWidth={4.5}
              color={isFav ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>

        <Text>RecipeDetail</Text>
        <Text className="mt-5">{JSON.stringify(strMeal, 0, 2)}</Text>
      </ScrollView>
    </View>
  );
}
