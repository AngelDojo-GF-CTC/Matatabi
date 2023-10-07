import { useNavigation } from "@react-navigation/native";
import { Box, Button, Image, Modal, ScrollView, Text, View } from "native-base";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { SliderBox } from "react-native-image-slider-box";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Layout } from "../templates/Layout";

export const PhotoGallery = ({ route }) => {
  const navigation = useNavigation();
  // console.log("イメージズ！", images);
  const { images } = route.params;
  console.log("イメージズ！", images);
  const [showSlyder, setShowSlyder] = useState(false);
  const [index, setIndex] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  // 2. 一行あたりの画像数を設定
  const imagesPerRow = 5;
  const modalWidth = screenWidth;

  // 3. 一行あたりの画像の幅を計算
  const imageWidth = modalWidth / imagesPerRow;
  const imageMarginWidth = modalWidth;

  return (
    <>
      {showSlyder ? (
        <SliderBox
          images={images}
          dotColor="red"
          inactiveDotColor="gray"
          firstItem={index}
          sliderBoxHeight={"100%"}
          onCurrentImagePressed={() => {
            setShowSlyder(false);
          }}
        />
      ) : (
        <Layout>
          <ScrollView>
            {images.map((image, index) => {
              if (index % imagesPerRow === 0) {
                return (
                  <View style={{ flexDirection: "row" }} key={index}>
                    {[...Array(imagesPerRow).keys()].map(
                      (i) =>
                        images[index] && (
                          <TouchableOpacity
                            key={index + i}
                            onPress={() => {
                              setIndex(index + i);
                              setShowSlyder(true);
                            }}
                          >
                            <Image
                              style={{
                                width: imageWidth,
                                height: imageWidth,
                              }}
                              key={index + i}
                              alt={"image"}
                              source={{ uri: images[index + i] }}
                            />
                          </TouchableOpacity>
                        )
                    )}
                  </View>
                );
              }
            })}
          </ScrollView>
        </Layout>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
});

// export const PhotoGallery = ({ route }) => {
//   const { images } = route.params;
//   // <SliderBox images={images} />
//   return (
//     <View>
//       <SliderBox images={images} dotColor="red" inactiveDotColor="gray" />
//     </View>
//   );
// };
