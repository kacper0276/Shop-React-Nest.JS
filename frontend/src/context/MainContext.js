import React from "react";

const MainContext = React.createContext({
  state: [],
  dispatch: () => {},
});

export default MainContext;
