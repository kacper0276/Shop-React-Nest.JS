import styles from "./Layout/Layout.module.css";

export const reducer = (state, action) => {
  switch (action.type) {
    case "change-theme":
      const newTheme =
        state.theme === `${styles.dark_theme}`
          ? `${styles.light_theme}`
          : `${styles.dark_theme}`;
      return { ...state, theme: newTheme };

    default:
      break;
  }
};

export const initialState = {
  theme: `${styles.dark_theme}`,
};
