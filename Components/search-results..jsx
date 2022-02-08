import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { Tab, TabView } from "../apis/popular-movies.json";
import TabViewComponent from "react-native-elements/dist/tab/TabView";
import { urlSearch } from "../constants";
import InitialPageLayout from "./initial-page-layout";
import SearchComponent from "./search-bar";

const SearchResults = ({ route }) => {
  const { itemSearch } = route.params;
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(urlSearch + itemSearch)
      .then((response) => {
        const descriptor = Object.getOwnPropertyDescriptor(response, "data");
        setResults(descriptor.value.results);
      })
      .catch((error) => {
        setError(error);

        console.log("Axios failed " + error);
      });
  }, []);

  // useEffect(() => {
  //   const data = require("../apis/search-api.json");
  //   setResults(data.results);
  // }, []);

  return (
    <View>
      <InitialPageLayout data={results} />
    </View>
  );
};

export default SearchResults;
