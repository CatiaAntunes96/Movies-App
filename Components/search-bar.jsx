import axios from "axios";
import React, { useRef, useState } from "react";
import { urlSearch } from "../constants";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const SearchComponent = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const [error, setError] = useState(null);

  const fetchInformation = () => {
    navigation.navigate("Results", { itemSearch: search });
    setSearch("");
  };

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search here..."
        onChangeText={updateSearch}
        style={{ fontSize: 18 }}
        value={search}
        onSubmitEditing={fetchInformation}
        platform={"android"}
        round="true"
        containerStyle={{
          borderRadius: 10,
          padding: 10,
          height: 45,
          marginHorizontal: 15,
        }}
        inputContainerStyle={{
          borderRadius: 8,
          backgroundColor: "#EBEBEB",
          height: 30,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default SearchComponent;
