import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    borderRadius: 10,
  },
  bgImage: {
    borderRadius: 10,
  },
});

export const nbStyles = {
  container: {
    flex: 1,
    px: 6,
    pt: 20,
  },
  headingText: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
    mb: 6,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryContainer: {
    borderRadius: 10,
    backgroundColor: "transparent",
    marginVertical: 5,
    borderWidth: 4,
  },
};