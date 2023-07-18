import React, { useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Animated,
  useWindowDimensions,
  ImageBackground,
} from "react-native";

import { gql, useQuery } from "@apollo/client";
import MovieCard from "./Shared/MovieCard";

const kebabCase = (string = "") =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

const imageSource = (title = "") => {
  switch (kebabCase(title)) {
    case "a-new-hope":
      return require("../assets/Images/a-new-hope.jpg");
    case "the-empire-strikes-back":
      return require("../assets/Images/empire-strike-back.jpg");
    case "return-of-the-jedi":
      return require("../assets/Images/return-of-jedi.jpg");
    case "the-phantom-menace":
      return require("../assets/Images/the-phantom-menace.jpg");
    case "revenge-of-the-sith":
      return require("../assets/Images/revenge-of-the-slith.jpg");
    case "attack-of-the-clones":
      return require("../assets/Images/attack-of-the-clones.jpg");
    default:
      return require("../assets/Images/star-wars.jpg");
  }
};

const CHAPTERS_QUERY = gql`
  query AllFilms($cursor: String) {
    allFilms(first: 3, after: $cursor) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          releaseDate
          title
        }
        cursor
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const App = (props) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { data, loading, error, fetchMore } = useQuery(CHAPTERS_QUERY);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    <View style={styles.container}>
      <Text>Something went wrong</Text>
    </View>;
  }

  const movies = data?.allFilms?.edges ?? [];
  const pageInfo = data?.allFilms?.pageInfo;

  return (
    <ImageBackground
      source={require("../assets/Images/star-wars.jpg")}
      style={styles.container}
    >
      <Animated.FlatList
        scrollEnabled={scrollEnabled}
        onEndReached={() => {
          fetchMore({
            variables: {
              cursor: pageInfo.endCursor,
            },
          });
        }}
        onEndReachedThreshold={0.5}
        horizontal={true}
        data={movies}
        extraData={scrollX}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (width / 2),
            index * (width / 2),
            (index + 1) * (width / 2),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          });

          return (
            <>
              {!Boolean(index) && <View style={{ width: width / 4 }} />}
              <Animated.View
                style={{
                  width: width / 2,
                  transform: [{ scale }],
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MovieCard
                  releaseDate={item.node.releaseDate}
                  title={item.node.title}
                  imageSource={imageSource(item.node.title)}
                  onZoomOperationEnd={() => {
                    setScrollEnabled(true);
                  }}
                  onZoomOperationStart={() => {
                    setScrollEnabled(false);
                  }}
                />
              </Animated.View>
              {Boolean(index === movies.length - 1) && (
                <View style={{ width: width / 4, height: 400 }} />
              )}
            </>
          );
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{
          alignItems: "center",
        }}
      />
    </ImageBackground>
  );
};

export default App;
