import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, ListItem } from "react-native-elements";
import { auth, db } from "../firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, `chats/${id}/messages`),
        orderBy("timestamp"),
        limit(1)
      ),
      (snapshot) => {
        setChatMessages(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );
      }
    );
    return unsubscribe;
  }, []);

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoUrl ||
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
