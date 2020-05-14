import React, { Component } from "react";
import { Animated } from "react-native";
import Images from "../assets/Images";

export default class PurpleShark extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(this.props.body.velocity.x);
  }
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    let image = Images.purpleShark[this.props.purpleSharkPose];

    return (
      <Animated.Image
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: 188,
          height: 152,
          zIndex: 10,
        }}
        resizeMode="stretch"
        source={image}
      ></Animated.Image>
    );
  }
}
