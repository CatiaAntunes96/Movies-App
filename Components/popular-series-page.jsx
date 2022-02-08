import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { urlTopMovies, urlTopSeries } from "../constants";
import InitialPageLayout from "./initial-page-layout";
import SearchComponent from "./search-bar";

const PopularSeriesPage = () => {
  const [movieData, setMovieData] = useState([]);

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
    const data = require("../apis/popular-series.json");
    setMovieData(data.items);
  }, []);

  return (
    <View>
      <InitialPageLayout data={movieData} />
    </View>
  );
};

export default PopularSeriesPage;
