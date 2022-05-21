import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    marginVertical: 16,
  },

  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 34,
  },

  titleText: {
    fontSize: 20,
    color: theme.colors.text_primary,
    fontFamily: theme.fonts.medium,
  },

  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  input: {
    height: 112,
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    color: theme.colors.text_primary,
    fontFamily: theme.fonts.regular,
  },

  footer: {
    flexDirection: "row",
    marginBottom: 16,
  },

  buttonTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_on_brand_color,
  },
});
