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
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <Routes>
        <Route path="/zaloguj" element={<></>} />
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Header>
  );

  const main = (
    <>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/zaloguj" exact element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
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
