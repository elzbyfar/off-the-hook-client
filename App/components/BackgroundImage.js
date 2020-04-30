import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from "../assets/Images";
import Constants from "../helpers/Constants";

export default class BackgroundImage extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const imageIterations = Math.ceil(width / 0.657 / height);

    return (
      <View
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: Constants.backgroundImageWidth,
          height: Constants.backgroundImageHeight,
          zIndex: -300,
          overflow: "hidden",
          flexDirection: "row",
        }}
      >
        {Array.apply(null, Array(imageIterations)).map((element, index) => {
          return (
            <Image
              style={{
                width: Constants.backgroundImageWidth,
                height: Constants.backgroundImageHeight,
                opacity: 0.85,
              }}
              key={index}
              resizeMode="cover"
              source={Images.backgroundImage}
            />
          );
        })}
      </View>
    );
  }
}
