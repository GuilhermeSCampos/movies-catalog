import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },

  header: {
    paddingTop: 30,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40
  },

  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginLeft: "25%"
  },
  card: {
    flex:1,
    flexDirection: "row",
    marginBottom: 8
  },
  cardText: {
    color: "#fff"
  },
  descriptionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  descriptionText: {
    marginRight: 10,
    color: "#92929D",
  },
  descriptionText1: {
    marginRight: 10,
    color: "#FF8700",
  },
  description: {
    marginLeft: 14,
    flex: 1,
    gap: 4
  }
});
