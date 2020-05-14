import React, { Component } from "react";
import { Animated } from "react-native";
import Images from "../assets/Images";

export default class Fish extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(this.props.body.velocity.y);
  }
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    //ROTATION
    this.animatedValue.setValue(this.props.body.velocity.y);
    let rotation = this.animatedValue.interpolate({
      inputRange: [-10, 0, 5, 10],
      outputRange: ["-45deg", "0deg", "25deg", "50deg"],
      extrapolate: "clamp",
    });

    let image =
      Images[
        this.props.name.split(" ").join("_").toLowerCase() + this.props.pose
      ];

    return (
      <Animated.Image
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: width,
          height: height,
          zIndex: 100,
          opacity: 0.85,
          transform: [{ rotate: rotation }],
        }}
        resizeMode="contain"
        source={image}
      ></Animated.Image>
    );
  }
}
