import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  welcomeView: {
    flex: 1,
    backgroundColor: "#22a1e6",
    justifyContent: "center",
    alignItems: "center",
  },
  SignUpView: {
    flex: 1,
    backgroundColor: "#22a1e6",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbles: {
    position: "absolute",
    width: 1000,
    zIndex: -1,
  },
  annoyedFish: {
    width: 240,
    marginTop: -150,
    position: "absolute",
  },
  safeArea: {
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    marginBottom: 5,
    marginTop: -30,
  },
  formInput: {
    backgroundColor: "#22a1e6",
    borderWidth: 1,
    borderRadius: 35,
    fontSize: 16,
    fontWeight: "500",
    width: 250,
    alignItems: "center",
    textAlign: "center",
    borderColor: "#555",
    paddingVertical: 12,
  },
  buttonView: {
    alignItems: "center",
    backgroundColor: "rgba(250, 253, 255, 0.4)",
    borderColor: "rgba(250, 253, 255, 0.4)",
    paddingVertical: 10,
    width: 200,
    marginBottom: 5,
    borderRadius: 35,
    opacity: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgb(42, 72, 107)",
  },
  submitButtonContainer: {
    marginTop: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 240,
  },
  submitButtonText: {
    textAlign: "center",
    color: "rgb(42, 72, 107)",
    // color: "#ddd",
    // color: "#c0dded",
  },
  submitButton: {
    // borderColor: "#ddd",
    // backgroundColor: "#104e70",
    backgroundColor: "rgba(250, 253, 255, 0.4)",
    borderColor: "rgba(250, 253, 255, 0.4)",
    borderWidth: 2,
    borderRadius: 35,
    width: 70,
    paddingVertical: 10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
