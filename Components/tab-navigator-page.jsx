import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { ActivityIndicator, View } from "react-native";

import InitialPageLayout from "./initial-page-layout";

const ACTIONS = {
  CALL_API: "call-api",
  SUCCESS: "success",
  ERROR: "error",
};

const initialState = { loading: false, results: null, error: null };

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_API:
      return { loading: true };
    case ACTIONS.SUCCESS:
      return {
        loading: false,
        results: action.data,
      };
    case ACTIONS.ERROR:
      return {
        loading: false,
        error: action.error,
      };
  }
}

const TabNavigatorPage = ({ url }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { results, loading, error } = state;

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_API });
    const getResults = async () => {
      let response = await axios.get(url);
      if (response.status == 200) {
        dispatch({ type: ACTIONS.SUCCESS, data: response.data.items });
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

  return (
    <View>
      <InitialPageLayout data={results} />
    </View>
  );
};

export default TabNavigatorPage;
