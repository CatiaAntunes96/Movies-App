import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { urlTitle } from "../constants";

const ContentPage = ({ route }) => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const { itemId } = route.params;

  useEffect(() => {
    axios.get(urlTitle + itemId).then((response) => {
      setData(response.data);
      setGenres(response.data.genreList);
    });
  }, []);

  // useEffect(() => {
  //   const data = require("../apis/title-api.json");
  //   setData(data);
  //   setGenres(data.genreList);
  // }, []);

  const information = () => {
    return (
      <View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "column",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: 25,
              marginBottom: 20,
            }}
          >
            {data.fullTitle}
          </Text>

          <Image
            source={{
              uri: data.image,
            }}
            style={styles.coverImage}
          />
          <View style={styles.container}>
            <Text>{data.type}</Text>
            <Entypo name="dot-single" size={15} color="black" />
            <Text>{data.year}</Text>
            <Entypo name="dot-single" size={15} color="black" />
            <Text>{data.runtimeStr}</Text>
            <Entypo name="dot-single" size={15} color="black" />
            <Text>{data.contentRating}</Text>
          </View>

          <View style={styles.containerGenres}>
            {genres?.map((item, i) => {
              return (
                <Text style={styles.genreText} key={i}>
                  {item.value}
                </Text>
              );
            })}
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.labelText}>Original Title: </Text>
          <Text style={styles.descriptorText}>{data.originalTitle}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.labelText}>Imdb rating:</Text>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text style={styles.descriptorText}> {data.imDbRating}</Text>
            <Entypo name="star" size={15} color="#FFC75F" />
          </View>
        </View>

        <View style={{ marginHorizontal: 10, marginVertical: 3 }}>
          <Text style={styles.labelText}>Plot:</Text>
          <Text style={styles.baseText}>{data.plot}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.labelText}>Director: </Text>
          <Text style={styles.descriptorText}>{data.directors}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.labelText}>Actors list:</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <FlatList
        data={data.actorList}
        ListHeaderComponent={information}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
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
                style={styles.actorsImage}
              />
              <Text style={styles.listItemText}>
                {item.name} as {item.asCharacter}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 15,
  },
  container: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 3,
    marginHorizontal: 10,
  },
  containerGenres: {
    flexDirection: "row",
    marginLeft: 5,
    alignItems: "center",
  },
  descriptorText: {
    fontSize: 15,
    fontFamily: "sans-serif",
    marginRight: 3,
  },
  genreText: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 4,
    textAlign: "center",
    margin: 5,
    borderColor: "#474647",
    backgroundColor: "#474647",
    color: "white",
    fontWeight: "bold",
  },
  coverImage: {
    width: 200,
    height: 300,
    alignSelf: "center",
    marginBottom: 5,
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  actorsImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default ContentPage;
