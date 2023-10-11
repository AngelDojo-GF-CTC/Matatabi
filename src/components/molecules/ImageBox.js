import {
  HStack,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  Center,
  Modal,
} from "native-base";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Auth from "@aws-amplify/auth";
import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import Constants from "expo-constants";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import cameraIcon from "../../../assets/camera.png";

export const ImageBox = () => {
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const setLoading = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated); // due to s3 put function scoped
  };
  const screenWidth = Dimensions.get("window").width;

  // 2. 一行あたりの画像数を設定
  const imagesPerRow = 5;
  const modalWidth = screenWidth * 0.95;

  // 3. 一行あたりの画像の幅を計算
  const imageWidth = (modalWidth * 0.95) / imagesPerRow;
  const imageMarginWidth = modalWidth * 0.015;

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
    })();
  }, []);

  handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert("Upload cancelled");
        return;
      } else {
        const img = await fetchImageFromUri(pickerResult.uri);
        const uploadUrl = await uploadImage("demo.jpg", img);
        downloadImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed");
    }
  };

  uploadImage = (filename, img) => {
    Auth.currentCredentials();
    return Storage.put(filename, img, {
      level: "public",
      contentType: "image/jpeg",
      progressCallback(progress) {
        setLoading(progress);
      },
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const updatePercentage = (number) => {
    setPercentage(number);
  };

  downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => setImages((prev) => [...prev, result]))
      .catch((err) => console.log(err));
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    const uris = result.assets.map((asset) => asset.uri);

    if (!result.canceled) {
      setImages((prev) => [...prev, ...uris]);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <HStack style={{}}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              alt={"stream"}
              source={cameraIcon}
              style={{
                marginLeft: 0,
                marginRight: 3,
                marginTop: 10,
                width: 48,
                height: 48,
              }}
            />
          </TouchableOpacity>
          {!!images.length &&
            images.map((image, index) => {
              console.log(images);
              if (index < 3)
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PhotoGallery", { images: images });
                        // setShowModal(true);
                      }}
                    >
                      <Image
                        alt={"stream"}
                        source={{ uri: image }}
                        style={{ width: 80, height: 80 }}
                        // onPressで写真一覧ページに遷移できるようにしたい
                        onPress={() => navigation.navigate("PhotoGallery")}
                      />
                    </TouchableOpacity>
                  </View>
                );
            })}
        </HStack>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: "#F5FCFF",
  // },
  // title: {
  //   fontSize: 20,
  //   marginBottom: 20,
  //   textAlign: "center",
  //   marginHorizontal: 15,
  // },
  // percentage: {
  //   marginBottom: 10,
  // },
  // result: {
  //   paddingTop: 5,
  // },
  // info: {
  //   textAlign: "center",
  //   marginBottom: 20,
  // },
});
