import React from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Pantry from "./components/Pantry";
import Delivery from "./components/Delivery";
import PageNotFound from "./components/PageNotFound";
import ManagerLayout from "./layouts/ManagerLayout";
import RootLayout from "./layouts/RootLayout";
import PatientDetails from "./components/PatientDetails";
import FoodChart from "./components/FoodChart";
import InnerPantry from "./components/InnerPantry";
import PatientInfo from "./components/PatientInfo";
import PantryDetails from "./components/PantryDetails";
import TrackTasks from "./components/TrackTasks";
import PantryLayout from "./layouts/PantryLayout";
import DeliverStaffDetails from "./components/DeliverStaffDetails";
import TAsksAssigned from "./components/TAsksAssigned";
import AssigneDelivery from "./components/AssigneDelivery";
import AllDeliverStatus from './components/AllDeliverStatus';
import DeliveryDetals from './components/DeliveryDetals'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route index path="login" element={<Login />} />
        <Route path="home" element={<Home />} />

        <Route path="manager" element={<ManagerLayout />}>
          <Route index element={<TrackTasks />} />
          <Route path="patient-details" element={<PatientDetails />} />
          <Route path="patient-info" element={<PatientInfo />} />
          <Route path="food-chart" element={<FoodChart />} />
          <Route path="inner-pantry" element={<InnerPantry />} />
          <Route path="pantry-details" element={<PantryDetails />} />
          <Route path="track-tasks" element={<TrackTasks />} />
        </Route>

        <Route path="pantry" element={<PantryLayout />}>
          <Route index element={< TAsksAssigned/>} />
          <Route path="tasks-assigned" element={< TAsksAssigned/>} />
          <Route path="delivery-staff-details" element={< DeliverStaffDetails/>} />
          <Route path="assigne-delivery" element={< AssigneDelivery/>} />
          <Route path="delivery-status" element={< AllDeliverStatus/>} />
          <Route path="delivery-details" element={< DeliveryDetals/>} />

        </Route>
        <Route path="delivery" element={<Delivery />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
