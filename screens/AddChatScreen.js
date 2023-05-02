import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import React, { useLayoutEffect, useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { Feather } from "react-native-vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add New Chat",
    });
  }, []);

  const createChat = async () => {
    await addDoc(collection(db, "chats"), { chatName: input })
      .then(() => navigation.goBack())
      .catch((err) => alert(err.message));
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Input
        placeholder="Enter chat"
        onChangeText={(txt) => setInput(txt)}
        value={input}
        onSubmitEditing={createChat}
        leftIcon={<Feather name="message-circle" size={24} color="black" />}
      />
      <Button title="Create New Chat" onPress={createChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
