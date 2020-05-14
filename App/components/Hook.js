import React, { Component } from "react";
import { Animated } from "react-native";
import Images from "../assets/Images";

export default class Hook extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Animated.Image
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: 90,
          height: 350,
          opacity: 0.6,
          zIndex: 50,
        }}
        resizeMode="stretch"
        source={Images.hook}
      ></Animated.Image>
    );
  }
}
