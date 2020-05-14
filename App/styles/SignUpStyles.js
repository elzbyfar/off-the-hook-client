import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  SignUpView: {
    flex: 1,
    backgroundColor: "#22a1e6",
    justifyContent: "center",
  },
  bubbles: {
    position: "absolute",
    width: 1000,
    zIndex: -1,
  },
  safeArea: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: -180,
    marginBottom: 10,
    zIndex: -10,
  },
  formContainer: {
    marginBottom: 5,
    marginTop: -30,
  },
  formInput: {
    width: 250,
    paddingVertical: 12,
    backgroundColor: "#22a1e6",
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 35,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  errors: {
    alignSelf: "center",
    color: "#a31717",
    marginTop: 2,
  },
  submitButtonContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  submitButtonText: {
    textAlign: "center",
    color: "rgb(42, 72, 107)",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "rgba(250, 253, 255, 0.4)",
    borderColor: "rgba(250, 253, 255, 0.4)",
    borderWidth: 2,
    borderRadius: 35,
    width: 150,
    marginBottom: 5,
    paddingVertical: 10,
  },
});

export default styles;
