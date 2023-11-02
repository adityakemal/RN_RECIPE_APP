import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

import { useCategory } from "../store/category";

export default function Categories() {
  const { activeCategory, handleChangeCategory, categories } = useCategory(
    (state) => state
  );

  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      //   exiting={FadeOut}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-x-4"
      >
        {categories?.map((cat, i) => (
          <TouchableOpacity
            key={i}
            className="flex items-center space-y-1"
            onPress={() => handleChangeCategory(cat?.strCategory)}
          >
            <View
              className={`${
                activeCategory === cat?.strCategory
                  ? "bg-amber-400"
                  : "bg-black/50"
              } rounded-full p-[6px]`}
            >
              <Image
                source={cat?.strCategoryThumb}
                style={{ height: hp(6), width: hp(6) }}
                className="rounded-full"
              />
            </View>

            <Text className="text-neutral-600" style={{ fontSize: hp(1.7) }}>
              {cat?.strCategory}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
