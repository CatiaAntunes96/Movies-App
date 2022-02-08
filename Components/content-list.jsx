import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

const ContentList = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("Details", { itemId: item.id });
            }}
            style={{
              flex: 1,
              marginHorizontal: 20,
            }}
          >
            <View style={styles.listItem}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.coverImage}
                onPress={() => {
                  navigation.navigate("Details", { itemId: item.id });
                }}
              />
              <Text
                style={styles.listItemText}
                onPress={() => {
                  navigation.navigate("Details", { itemId: item.id });
                }}
              >
                {item.title} {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  listItemText: {
    margin: 2,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
});

export default ContentList;
