import { HStack, ScrollView, View, Image } from "native-base";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
// import Auth from "@aws-amplify/auth";
// import Storage from "@aws-amplify/storage";
import Constants from "expo-constants";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import cameraIcon from "../../../assets/camera.png";

export const ImageBox = () => {
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  // const setLoading = (progress) => {
  //   const calculated = parseInt((progress.loaded / progress.total) * 100);
  //   updatePercentage(calculated); // due to s3 put function scoped
  // };

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

  // const handleImagePicked = async (pickerResult) => {
  //   try {
  //     if (pickerResult.cancelled) {
  //       alert("Upload cancelled");
  //       return;
  //     } else {
  //       const img = await fetchImageFromUri(pickerResult.uri);
  //       const uploadUrl = await uploadImage("demo.jpg", img);
  //       downloadImage(uploadUrl);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     alert("Upload failed");
  //   }
  // };

  // const uploadImage = (filename, img) => {
  //   // Auth.currentCredentials();
  //   return Storage.put(filename, img, {
  //     level: "public",
  //     contentType: "image/jpeg",
  //     progressCallback(progress) {
  //       setLoading(progress);
  //     },
  //   })
  //     .then((response) => {
  //       return response.key;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       return error.response;
  //     });
  // };

  // const updatePercentage = (number) => {
  //   setPercentage(number);
  // };

  // const downloadImage = (uri) => {
  //   Storage.get(uri)
  //     .then((result) => setImages((prev) => [...prev, result]))
  //     .catch((err) => console.log(err));
  // };

  // const fetchImageFromUri = async (uri) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  //   return blob;
  // };

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
      <ScrollView>
        <HStack>
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
                      }}
                    >
                      <Image
                        alt={"stream"}
                        source={{ uri: image }}
                        style={{ width: 80, height: 80 }}
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
