import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Main } from "./components";

const Dashboard = lazy(() => import("./views/dashboard/Dashboard"));
const UserDashboard = lazy(() => import("./views/user/dashboard"));
const UserProfile = lazy(() => import("./views/user/profile"));
const UserApartment = lazy(() => import("./views/user/apartment"));
const UserEmployment = lazy(() => import("./views/user/employment"));
const UserSupport = lazy(() => import("./views/user/support"));
const Rent = lazy(() => import("./views/rent/Rent"));
const AddProperty = lazy(() => import("./views/property/AddProperty"));
const AddTenant = lazy(() => import("./views/tenants/AddTenant"));
const AddUnit = lazy(() => import("./views/unit/AddUnit"));
const AddLandlord = lazy(() => import("./views/landlord/AddLandlord"));
const Agents = lazy(() => import("./views/agents/Agents"));
const Reports = lazy(() => import("./views/reports/Reports"));
const Customer = lazy(() => import("./views/customer/Customer"));
const Business = lazy(() => import("./views/business/Business"));
const Landlords = lazy(() => import("./views/landlord/LandLords"));
const Properties = lazy(() => import("./views/property/Property"));
const Tenants = lazy(() => import("./views/tenants/Tenants"));
const SingleUnit = lazy(() => import("./views/user/dashboard/SingleUnit"));

const App = () => {
  return (
    <div>
      <Routes></Routes>
      <Main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/tenant/dashboard" element={<UserDashboard />} />
            <Route path="/tenant/unit/:id" element={<SingleUnit />} />
            <Route path="/tenant/profile" element={<UserProfile />} />
            <Route path="/tenant/apartments" element={<UserApartment />} />
            <Route path="/tenant/employment" element={<UserEmployment />} />
            <Route path="/tenant/support" element={<UserSupport />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/business" element={<Business />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/landlord" element={<Landlords />} />
            <Route path="/add/landlord" element={<AddLandlord />} />
            <Route path="/add/tenant" element={<AddTenant />} />
            <Route path="/add/property" element={<AddProperty />} />
            <Route path="/add/unit/:id" element={<AddUnit />} />
            <Route path="/add/unit" element={<AddUnit />} />
            <Route path="/add/property/:id" element={<AddProperty />} />
            <Route path="/property" element={<Properties />} />
            <Route path="/tenants" element={<Tenants />} />
          </Routes>
        </Suspense>
      </Main>
    </div>
  );
};

export default App;
