import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import MainPage from "./Pages/MainPage/MainPage";
import Login from "./Pages/Login/Login";
import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import MainContext from "./context/MainContext";
import Navigation from "./Layout/UI/Navigation/Navigation";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <Navigation />
    </Header>
  );

  const main = (
    <>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/zaloguj" exact element={<Login />} />
      </Routes>
    </>
  );

  const footer = <Footer />;

  return (
    <Router>
      <MainContext.Provider
        value={{
          state: state,
          dispatch: dispatch,
        }}
      >
        <Layout header={header} main={main} footer={footer} />
      </MainContext.Provider>
    </Router>
  );
}

export default App;
