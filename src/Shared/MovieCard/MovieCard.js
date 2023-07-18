import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ZoomableImage from "../ZoomableImage";


const styles = StyleSheet.create({
  movieCard: {
    height: 400,
    width: 250,
    display: 'flex',
    justifyContent: 'flex-end',
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 4,
    overflow: 'hidden',
    position: 'relative'
  },
  textStyles: {
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    textTransform: 'capitalize',
  },
})

const MovieCard = ({ releaseDate, title, imageSource }) => {
  return (
    <View style={styles.movieCard}>
      <ZoomableImage imageSource={imageSource}/>
      <Text style={styles.textStyles}>
        {releaseDate}
      </Text>
      <Text style={styles.textStyles}>
        {title}
      </Text>
    </View>
  );
};



export default MovieCard;
