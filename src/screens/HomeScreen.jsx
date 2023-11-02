import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { Suspense, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // make font and width / height responseive in all divice
import { useCategory } from "../store/category";
import { useRecipe } from "../store/recipe";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import Avatar from "../../assets/images/avatar.png";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";
import Loading from "../components/Loading";

export default function HomeScreen() {
  const { loading, getCategories, activeCategory, categories } = useCategory(
    (state) => state
  );

  const { getRecipes, loadingRecipes } = useRecipe((state) => state);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getRecipes(activeCategory);
  }, [activeCategory]);

  return (
    <View className="flex-1 bg-white ">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14 "
      >
        {/* bell and avatar */}
        <View className=" mx-4 flex-row items-center justify-between mb-2">
          <Image source={Avatar} style={{ width: hp(5.5), height: hp(5) }} />
          <View>
            <BellIcon size={hp(4)} color={"gray"} />
          </View>
        </View>
        {/* <View>
          <Text>{JSON.stringify(obj)}</Text>
        </View> */}

        {/* title section  */}
        <View className=" mx-4 space-y-2">
          <Text className="text-neutral-600 " style={{ fontSize: hp(2) }}>
            Hello, Kemal
          </Text>
          <Text
            className="text-neutral-600 font-bold"
            style={{ fontSize: hp(3.5) }}
          >
            Make your own food,
          </Text>
          <Text
            className="text-neutral-600 font-bold"
            style={{ fontSize: hp(3.5) }}
          >
            Stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>

        {/* search bar  */}
        <View className="p-[6px] bg-black/5 rounded-full flex-row justify-between items-center mx-4">
          <TextInput
            className="px-3 flex-1"
            placeholder="Search any recipe..."
            style={{ fontSize: hp(1.7) }}
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              className=""
              size={hp(2.5)}
              color={"gray"}
              strokeWidth={3}
            />
          </View>
        </View>

        {/* categories  */}
        <View>{loading ? <Loading /> : <Categories />}</View>

        {/* recipes  */}
        <View>
          <Recipes />
        </View>
      </ScrollView>
    </View>
  );
}
