import React, { Component } from "react";
import { View, Image, Animated } from "react-native";
import Images from "../assets/Images";
import Constants from "../helpers/Constants";

export default class Treasure extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    let colors = ["#e38c64", "#db794b", "#d9642e", "#db794b"];

    return (
      <Image
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: 32,
          height: 32,
          zIndex: -10,
          tintColor: colors[this.props.colorPick],
        }}
        resizeMode="contain"
        source={Images.food}
      ></Image>
    );
  }
}
