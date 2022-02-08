import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { Tab, TabView } from "../apis/popular-movies.json";
import TabViewComponent from "react-native-elements/dist/tab/TabView";
import { urlTopMovies, urlTopSeries } from "../constants";
import InitialPageLayout from "./initial-page-layout";
import SearchComponent from "./search-bar";

const PopularMoviesPage = () => {
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(urlTopMovies)
  //     .then((response) => {
  //       setMovieData(response.data.items);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setIsLoading(false);
  //       console.log("Axios failed " + error);
  //     });
  // }, []);

  useEffect(() => {
    const data = require("../apis/popular-movies.json");
    setMovieData(data.items);
  }, []);

  return (
    <View>
      <InitialPageLayout data={movieData} />
    </View>
  );
};

export default PopularMoviesPage;
