import React, { Component } from "react";
import { Image } from "react-native";
import Images from "../assets/Images";

export default class Key extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image
        style={{
          position: "absolute",
          top: y,
          left: x,
          width: 45,
          height: 45,
          zIndex: -10,
        }}
        resizeMode="contain"
        source={Images.key}
      ></Image>
    );
  }
}
