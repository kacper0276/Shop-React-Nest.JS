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
      window.localStorage.setItem("userstatus", action.userType);
      return {
        ...state,
        userLoggin: newLoginStatus,
        userStatus: action.userType,
      };

    default:
      throw new Error(`Nie ma takiej akcji ${action.type}`);
  }
};

export const initialState = {
  theme: `${styles.dark_theme}`,
  userLoggin: Boolean(window.localStorage.getItem("username")),
  userStatus: window.localStorage.getItem("userstatus"),
};
