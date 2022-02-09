import React from "react";
import { View } from "react-native";

import { urlPopularSeries } from "../constants";

import TabNavigatorPage from "./tab-navigator-page";

const PopularSeriesPage = () => {
  return (
    <View>
      <TabNavigatorPage url={urlPopularSeries} />
    </View>
  );
};

export default PopularSeriesPage;
