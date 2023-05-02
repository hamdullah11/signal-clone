import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import React, { useLayoutEffect, useState } from "react";
import { Button, Image, Input, Text } from "react-native-elements";

// Firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");
  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: name,
          photoURL:
            imageURL ||
            "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text
        h4
        style={{
          marginVertical: 10,
        }}
      >
        Create a signal account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          onChangeText={(name) => setName(name)}
          value={name}
        />

        <Input
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />

        <Input
          placeholder="Password"
          onChangeText={(pass) => setPassword(pass)}
          value={password}
          secureTextEntry
        />
        <Input
          placeholder="Profile Picture URL (Optional)"
          onChangeText={(url) => setImageURL(url)}
          value={imageURL}
          secureTextEntry
        />
      </View>
      <Button
        title={"Register"}
        containerStyle={styles.button}
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
