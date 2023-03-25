import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import Layout from "./Layout/Layout";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import MainPage from "./Pages/MainPage/MainPage";
import Login from "./Pages/Login/Login";
import MainContext from "./context/MainContext";
import Navigation from "./Layout/UI/Navigation/Navigation";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Register from "./Pages/Register/Register";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPasswordPage/ForgotPasswordPage";
import ConfirmCreateAccount from "./Pages/ConfirmCreateAccount/ConfirmCreateAccount";
import AllProducts from "./Pages/Products/AllProducts/AllProducts";
import OtherProducts from "./Pages/Products/OtherProducts/OtherProducts";
import ProductsDetails from "./Pages/Products/ProductsDetails/ProductsDetails";
import ShoppingCard from "./Pages/ShoppingCard/ShoppingCard";
import OrderSetting from "./Pages/Order/OrderSetting/OrderSetting";
import UserPanel from "./Pages/UserPanel/UserPanel";
import ChangeUserDataPanel from "./Pages/UserPanel/ChangeUserDataPanel/ChangeUserDataPanel";
import UserAuction from "./Pages/UserPanel/UserAuction/UserAuction";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";
import AuthenticatedAdminRoute from "./hoc/AuthenticatedAdminRoute";
import AddRabatCode from "./Pages/AdminPanel/AddEditRabatCode/AddRabatCode";
import EditUsersData from "./Pages/AdminPanel/EditUsersData/EditUsersData";
import AddAuctionType from "./Pages/AdminPanel/AddAuctionType/AddAuctionType";
import AddAuction from "./Pages/UserPanel/AddAuction/AddAuction";

export const api_url = `http://localhost:3002/api`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <Routes>
        <Route path="/zaloguj" exact element={<></>} />
        <Route path="/rejestracja" exact element={<></>} />
        <Route path="/zmiana/:username" exact element={<></>} />
        <Route path="/potwierdzenie/:username" exact element={<></>} />
        <Route path="/koszyk" exact element={<></>} />
        <Route path="/szczegolydostawy" exact element={<></>} />
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Header>
  );

  const main = (
    <>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/zaloguj" exact element={<Login />} />
        <Route path="/rejestracja" exact element={<Register />} />
        <Route
          path="/zmiana/:username"
          exact
          element={<ForgotPasswordPage />}
        />
        <Route
          path="/potwierdzenie/:username"
          exact
          element={<ConfirmCreateAccount />}
        />
        <Route path="/produkty/wszystkie" exact element={<AllProducts />} />
        <Route path="/produkty/:type" exact element={<OtherProducts />} />
        <Route path="/produkt/:id" exact element={<ProductsDetails />} />
        <Route path="/koszyk" exact element={<ShoppingCard />} />
        <Route path="/szczegolydostawy" exact element={<OrderSetting />} />
        <Route
          path="/paneluzytkownika"
          exact
          element={
            <AuthenticatedRoute>
              <UserPanel />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/paneluzytkownika/zmiendane"
          exact
          element={
            <AuthenticatedRoute>
              <ChangeUserDataPanel />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/paneluzytkownika/dodajaukcje"
          exact
          element={
            <AuthenticatedRoute>
              <AddAuction />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/paneluzytkownika/twojeaukcje"
          exact
          element={
            <AuthenticatedRoute>
              <UserAuction />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/paneladmina/edytujuzytkownikow"
          exact
          element={
            <AuthenticatedAdminRoute>
              <EditUsersData />
            </AuthenticatedAdminRoute>
          }
        />
        <Route
          path="/paneladmina/dodajkodrabatowy"
          exact
          element={
            <AuthenticatedAdminRoute>
              <AddRabatCode />
            </AuthenticatedAdminRoute>
          }
        />
        <Route
          path="/paneladmina/typyaukcji"
          exact
          element={
            <AuthenticatedAdminRoute>
              <AddAuctionType />
            </AuthenticatedAdminRoute>
          }
        />
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
