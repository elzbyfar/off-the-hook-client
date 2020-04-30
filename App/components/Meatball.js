import React, { Component } from "react";
import { View, Image, Animated } from "react-native";
import Images from "../assets/Images";

export default class Meatball extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(this.props.body.position.x);
  }
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    //ROTATION
    // this.animatedValue.setValue(this.props.body.position.x);
    // let rotation = this.animatedValue.interpolate({
    //   inputRange: [-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3],
    //   outputRange: [
    //     "-20deg",
    //     "-10deg",
    //     "-0deg",
    //     "10deg",
    //     "20deg",
    //     "10deg",
    //     "0deg",
    //     "-10deg",
    //   ],
    //   extrapolate: "clamp",
    // });

    // let image = Images["tenacious0" + this.props.pose];

    let image = Images["newMeat" + this.props.meatballPose];

    return (
      <Animated.Image
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: width,
          height: height,
          // opacity: 0.8,
          // tintColor: "brown",
          // transform: [{ rotate: rotation }],
        }}
        resizeMode="cover"
        source={image}
      ></Animated.Image>
    );
  }
}
