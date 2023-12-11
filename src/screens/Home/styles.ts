import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A32',
  },

  header: {
    padding: 25
  },

  headerText: {
    marginTop: 15,
    fontSize: 20,
    lineHeight: 45,
    color: '#fff',
    textAlign: "center"
  },
  headerTitle: {
    marginTop: 15,
    fontSize: 32,
    lineHeight: 45,
    color: '#fff',
    textAlign: "center",
    fontFamily: 'Poppins',
    fontWeight: "700"
  },

  containerInput: {
    backgroundColor: "#67686D",
    height: 42,
    padding: 10,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  input: {
    color: "#fff",
    width: "80%",
    paddingLeft: 15,
    fontSize: 16
  },

  noResult: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10
  },

  categoriesContainer: {
    flexDirection: "row",
    gap: 24,
    marginLeft: 10,
    padding: 15,
  },

  categoriesText: {
    color: "#fff",
    fontSize: 16
  }
});
