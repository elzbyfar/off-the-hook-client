import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from "../assets/Images";

export default class Floor extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const imageIterations = Math.ceil(width / 3.9 / height);

    return (
      <View
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: 512,
          height: 200,
          overflow: "hidden",
          flexDirection: "row",
          backgroundColor: "black",
        }}
      >
        {Array.apply(null, Array(imageIterations)).map((element, index) => {
          return (
            <Image
              style={{
                width: 512,
                height: 200,
                opacity: 0.35,
              }}
              key={index}
              resizeMode="stretch"
              source={Images.sandFloor}
            />
          );
        })}
      </View>
    );
  }
}
