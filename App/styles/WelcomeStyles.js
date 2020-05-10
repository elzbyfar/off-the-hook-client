import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  welcomeView: {
    flex: 1,
    backgroundColor: "#22a1e6",
    justifyContent: "center",
  },
  logo: {
    width: 380,
    height: 380,
    marginBottom: -30,
  },
  bubbles: {
    position: "absolute",
    width: 1000,
    zIndex: -1,
  },
  safeArea: {
    alignItems: "center",
  },
  formContainer: {
    marginBottom: 5,
    marginTop: -30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgba(250, 253, 255, 0.4)",
    borderColor: "rgba(250, 253, 255, 0.4)",
    paddingVertical: 10,
    width: 200,
    marginBottom: 5,
    borderRadius: 35,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgb(42, 72, 107)",
  },
});

export default styles;
