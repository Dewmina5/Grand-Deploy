import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import FormScreen from "./pages/FormScreen";
import Navigation from "./components/Navigation/navbar";
import Footer from "./components/Footer/footer";
import styles from "./App.module.css";
import LoginScreen from "./pages/LoginScreen";
import AdminHomeScreen from "./pages/AdminHomeScreen";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import Contactus from "./components/Contactus/Contactus";
import Guideline from "./components/GuideLine/Guideline";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import AdminMainLayout from "./pages/AdminMainLayout";
import AdminRegistrationMain from "./pages/AdminRegistrationMain";
import AdminTable from "./components/Table/AdminTable";
import AdminUserTablePage from "./pages/AdminUserTablePage";
import AdminProfileScreen from "./pages/AdminProfileScreen";
import UserFormViewScreen from "./pages/UserFormViewScreen";
import AdminPrivateRoutes from "./components/PrivateRoutes/AdminPrivateRoutes";
import UserPrivateRoutes from "./components/PrivateRoutes/UserPrivateRoute";
import AprooveComityScreen from "./pages/AprooveComityScreen";
import AprooveCominityHome from "./pages/AprooveCominityHome";
import ApprovPanelPrivateRoute from "./components/PrivateRoutes/ApprovPanelPrivateRoute";
import AprooveCominityGrantList from "./pages/AprooveCominityGrantList";
import ApproveProgres from "./components/AproveProgress/ApproveProgres";
import AproveSheet from "./pages/AproveSheet";
import AdminSignleApplicationView from "./pages/AdminSignleApplicationView";

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{ duration: 3000 }}
        ></Toaster>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public routes */}

          <Route path="/fotter" element={<Footer />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/pop" element={<Guideline />} />
          <Route path="/table" element={<AdminTable />} />
          <Route path="/aprove-progress" element={<ApproveProgres />} />

          <Route path="/header-bar" element={<AdminHeader />} />

          {/*Admin private routes */}
          <Route path="" element={<AdminPrivateRoutes />}>
            <Route path="/admin-nav" element={<AdminMainLayout />}>
              <Route index={true} path="" element={<AdminHomeScreen />} />
            </Route>
            <Route
              path="/admin-nav/registration"
              element={<AdminRegistrationMain />}
            />
            <Route
              path="/admin-nav/user-table"
              element={<AdminUserTablePage />}
            />
            
          </Route>
          <Route path="/admin-nav/profile" element={<AdminProfileScreen />} />

          {/* Approve members */}

          <Route path="" element={<ApprovPanelPrivateRoute />}>
            <Route path="/aprove-home" element={<AprooveComityScreen />}>
              <Route index={true} path="" element={<AprooveCominityHome />} />
            </Route>
            <Route
              path="/aprove-home/Aplicant-list"
              element={<AprooveCominityGrantList />}
            />
            <Route
              path="/aprove-home/Aprrove-sheet/:id"
              element={<AproveSheet />}
            />
            <Route
              path="/aprove-home/viewapplication/:id"
              element={<AdminSignleApplicationView />}
            />
          </Route>

          {/*Admin private routes */}
          <Route path="" element={<UserPrivateRoutes />}>
            <Route path="/viewForm" element={<UserFormViewScreen />} />
          </Route>

          <Route path="/" element={<Navigation />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/form" element={<FormScreen />} />
            <Route path="contact-us" element={<Contactus />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
