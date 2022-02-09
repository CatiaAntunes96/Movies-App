import axios from "axios";
import React, { useEffect, useReducer } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

import { urlTitle } from "../constants";

const ACTIONS = {
  FETCH_API: "call-api",
  SUCCESS: "success",
  ERROR: "error",
};

const initialState = {
  loading: false,
  results: null,
  genreResults: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_API:
      return { loading: true };
    case ACTIONS.SUCCESS:
      return {
        loading: false,
        results: action.data,
        genreResults: action.genres,
      };
    case ACTIONS.ERROR:
      return {
        loading: false,
        error: action.error,
      };
  }
}

const ContentPage = ({ route }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { results, genreResults, loading, error } = state;
  const { itemId } = route.params;

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_API });
    const getResults = async () => {
      let response = await axios.get(urlTitle + itemId);
      if (response.status == 200) {
        dispatch({
          type: ACTIONS.SUCCESS,
          data: response.data,
          genres: response.data.genreList,
        });

        return;
      }
      dispatch({ type: ACTIONS.ERROR, error: response.error });
    };

    getResults();
  }, []);

  if (loading) {
    return (
      <View style={{ justifyContent: "center", marginVertical: 200 }}>
        <ActivityIndicator size="large" color="#F7A072" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          marginVertical: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

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
              textAlign: "center",
            }}
          >
            {results.fullTitle}
          </Text>

          <Image
            source={{
              uri: results.image,
            }}
            style={styles.coverImage}
          />
          <View style={styles.container}>
            <Text>{results.type}</Text>
            <Entypo name="dot-single" size={15} color="black" />
            <Text>{results.year}</Text>
            <Entypo name="dot-single" size={15} color="black" />
            <Text>{results.runtimeStr}</Text>
            <Entypo name="dot-single" size={15} color="black" />
            <Text>{results.contentRating}</Text>
          </View>

          <View style={styles.containerGenres}>
            {genreResults?.map((item, i) => {
              return (
                <Text style={styles.genreText} key={i}>
                  {item.value}
                </Text>
              );
            })}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            textAlign: "justify",
            marginVertical: 5,
            marginHorizontal: 15,
            flexShrink: 1,
          }}
        >
          <Text style={styles.labelText}>Original Title: </Text>
          <Text style={(styles.descriptorText, { flexShrink: 1 })}>
            {results.originalTitle}
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.labelText}>Imdb rating:</Text>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text style={styles.descriptorText}> {results.imDbRating}</Text>
            <Entypo name="star" size={15} color="#FFC75F" />
          </View>
        </View>

        <View style={{ marginHorizontal: 10, marginVertical: 3 }}>
          <Text style={styles.labelText}>Plot:</Text>
          <Text style={styles.baseText}>{results.plot}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.labelText}>Actors list:</Text>
        </View>
      </View>
    );
  };

  const EmptyList = () => {
    return <View></View>;
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {results != null ? (
        <FlatList
          data={results.actorList}
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
      ) : (
        <EmptyList />
      )}
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
    marginVertical: 5,
    marginHorizontal: 15,
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
    height: 130,
    borderRadius: 8,
  },
});

export default ContentPage;
