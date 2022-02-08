import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import ContentList from "./content-list";
import SearchComponent from "./search-bar";

const InitialPageLayout = ({ data }) => {
  return (
    <View>
      <SearchComponent />
      <ContentList data={data} />
    </View>
  );
};

export default InitialPageLayout;
