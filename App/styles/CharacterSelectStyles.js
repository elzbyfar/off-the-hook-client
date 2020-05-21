import { StyleSheet } from "react-native";
import Values from "../helpers/Values";

const styles = StyleSheet.create({
  CharacterSelectView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22a1e6",
  },
  heading: {
    width: Values.maxW / 1.35,
    color: "#eee",
    fontSize: Values.maxH / 43,
    fontWeight: "400",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    letterSpacing: 1,
    marginBottom: Values.maxH / 100,
    textShadowColor: "#444",
    textShadowRadius: 3,
    textShadowOffset: { width: -2.5, height: 2 },
  },
  boxesContainer: {
    width: Values.maxW / 1.21,
    height: Values.maxH / 1.398,
    borderWidth: 2,
    borderColor: "#444",
    flexDirection: "row",
    backgroundColor: "#1f89c2",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "space-evenly",
    paddingVertical: Values.maxH / 300,
  },
  characterBoxContainer: {
    shadowColor: "#444",
    shadowRadius: 5,
    shadowOpacity: 0.6,
    shadowOffset: { width: -2, height: 3 },
  },
  characterBox: {
    width: Values.maxW / 2.68,
    height: Values.maxH / 6.1,
    borderColor: "#fff",
    borderWidth: 0.5,
    marginTop: Values.maxH / 160,
    marginBottom: Values.maxH / 160,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22a1e6",
  },
  character: {
    width: Values.maxW / 4.8,
    height: Values.maxH / 8.8,
  },
  characterName: {
    color: "#222",
    fontSize: 13,
    fontWeight: "400",
  },
  lockedCharacter: {
    tintColor: "#222",
    opacity: 0.5,
  },
  lock: {
    position: "absolute",
    width: Values.maxW / 6,
    height: Values.maxH / 12,
  },
  closedLock: {
    position: "absolute",
    height: 48,
    width: 39,
  },
  keyInfoContainer: {
    position: "relative",
    width: Values.maxW / 1.21,
    height: Values.maxH / 9.3,
    borderWidth: 2,
    borderColor: "#444",
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    backgroundColor: "#1f89c2",
  },
  keyBox: {
    width: Values.maxW / 1.298,
    height: Values.maxH / 12,
    borderWidth: 0.5,
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#444",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: { width: -2, height: 3 },
    backgroundColor: "#22a1e6",
  },
  keyContainer: {
    flexDirection: "row",
  },
  keyContainerText: {
    color: "#222",
    letterSpacing: 0.1,
    paddingVertical: Values.maxH / 50,
    marginLeft: Values.maxH / 130,
    fontSize: Values.maxH / 35,
  },
  key: {
    position: "relative",
    width: Values.maxW / 7.5,
    height: Values.maxH / 50,
    marginTop: Values.maxH / 50,
    paddingVertical: Values.maxH / 50,
  },
});

export default styles;
