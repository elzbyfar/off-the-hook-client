import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  CharacterSelectView: {
    flex: 1,
    backgroundColor: "#22a1e6",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "500",
    color: "#eee",
    marginBottom: 8,
    letterSpacing: 1,
  },
  boxes: {
    width: 300,
    height: 600,
    marginTop: 1,
    borderColor: "#444",
    borderWidth: 2,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1f89c2",
  },
  characterBox: {
    width: 137,
    height: 139,
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#22a1e6",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: 100,
    height: 100,
  },
  characterName: {
    color: "#333",
    fontSize: 13,
  },
  lockedCharacter: {
    tintColor: "gray",
    opacity: 0.7,
  },
  lock: {
    position: "absolute",
    height: 75,
  },
  keyInfoContainer: {
    marginTop: 10,
    backgroundColor: "#1f89c2",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-around",
    width: 300,
    borderColor: "#333",
    position: "relative",
    height: 100,
  },
  keyBox: {
    borderColor: "#ddd",
    borderWidth: 1,
    height: 88,
    flexDirection: "row",
    backgroundColor: "#22a1e6",
    justifyContent: "center",
    width: 288,
  },
  key: {
    position: "relative",
    marginTop: 20,
    paddingVertical: 21,
    // marginLeft: 25,
    width: 65,
    height: 29,
  },
  useKeyButton: {
    width: 100,
    paddingVertical: 10,
    marginVertical: 22,
    marginRight: 23,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#444",
    borderWidth: 3,
    borderRadius: 25,
    backgroundColor: "#dea437",
  },
  useKeyText: {
    color: "#222",
  },
  keyContainer: {
    flexDirection: "row",
  },
  keyText: {
    color: "#222",
    paddingVertical: 23,
    marginLeft: 5,
    fontSize: 25,
  },
});

export default styles;
