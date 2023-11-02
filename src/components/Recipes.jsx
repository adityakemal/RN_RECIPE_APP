import MasonryList from "@react-native-seoul/masonry-list";
import { View, Text, Pressable } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
// morspeed and have cache
import { Image } from "expo-image"; //https://docs.expo.dev/versions/latest/sdk/image/

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRecipe } from "../store/recipe";
import { useCategory } from "../store/category";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";

export default function Recipes() {
  const { recipes, loadingRecipes } = useRecipe((state) => state);
  const { loading } = useCategory((state) => state);
  const navigation = useNavigation("RecipeDetail");

  return (
    <View className=" mx-4 space-y-4">
      <Text
        className="text-neutral-600 font-bold"
        style={{ fontSize: hp(3.5) }}
      >
        Recipes
      </Text>

      {/* UNTUK MASONRY HARUS TER RENDER TERAKHIR /PASTIKAN TIDAK ADA PROCESS RENDER  */}
      {loading || loadingRecipes ? (
        <Loading />
      ) : (
        <MasonryList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          //   showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <CardItem data={item} index={i} navigation={navigation} />
          )}
          //   refreshing={isLoadingNext}
          //   onRefresh={() => refetch({first: ITEM_CNT})}
          onEndReachedThreshold={0.1}
          //   onEndReached={() => loadNext(ITEM_CNT)}
        />
      )}
    </View>
  );
}

const CardItem = ({ data, index, navigation }) => {
  //   const blurhash =
  //     "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const { strMeal, strMealThumb } = data;
  const isEven = index % 2 === 0;
  const paddingMansory = isEven ? { paddingRight: 8 } : { paddingLeft: 8 };
  return (
    <Animated.View
      entering={FadeInDown.delay(110 * index)
        .duration(500)
        .springify()
        .damping(12)}
    >
      <Pressable
        className="mb-4 flex justify-center space-y-1"
        style={{ width: "100%", ...paddingMansory }}
        onPress={() => navigation.push("RecipeDetail", data)}
      >
        <Image
          source={strMealThumb}
          sharedTransitionTag={strMeal}
          style={{
            width: "100%",
            height: index % 3 === 1 ? hp(35) : hp(25),
            borderRadius: 35,
          }}
          className="bg-black/5"
          //   placeholder={blurhash}
          //   contentFit="cover"
          //   transition={1000}
        />
        <Text className="text-neutral-600 ml-2 " style={{ fontSize: hp(1.7) }}>
          {data.strMeal.length > 20
            ? strMeal.substring(0, 20) + "..."
            : data.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
