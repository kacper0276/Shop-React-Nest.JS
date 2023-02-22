import styles from "./Layout/Layout.module.css";

export const reducer = (state, action) => {
  switch (action.type) {
    case "change-theme":
      const newTheme =
        state.theme === `${styles.dark_theme}`
          ? `${styles.light_theme}`
          : `${styles.dark_theme}`;
      return { ...state, theme: newTheme };

    case "change-login-status":
      const newLoginStatus = state.userLoggin === false ? true : false;
      return { ...state, userLoggin: newLoginStatus };

    default:
      throw new Error(`Nie ma takiej akcji ${action.type}`);
  }
};

export const initialState = {
  theme: `${styles.dark_theme}`,
  userLoggin: true,
};
