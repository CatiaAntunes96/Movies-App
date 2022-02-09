import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { urlPopularMovies } from "../constants";
import InitialPageLayout from "./initial-page-layout";
import TabNavigatorPage from "./tab-navigator-page";

const PopularMoviesPage = () => {
  return (
    <View>
      <TabNavigatorPage url={urlPopularMovies} />
    </View>
  );
};

export default PopularMoviesPage;
