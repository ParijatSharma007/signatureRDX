import BranchInfo from "pages/branch-info";
import OrdersPrescriptions from "pages/ordersPrescriptions/OrdersPrescriptions";
import CommissionReport from "pages/commission-report";
import PharmacyAndBranch from "pages/home/PharmacyAndBranch";
import PayoutReport from "pages/payout-report";
import PharmacyInfo from "pages/pharmacy-info";
import { RouteObject } from "react-router";
import _AdminProtector from "routes/protectors/AdminProtector";

const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      // <AdminProtector>
      <PharmacyAndBranch />
      // </AdminProtector>
    ),
  },
  {
    path: "/pharmacy/:pharmacyId",
    element: (
      // <AdminProtector>
      <PharmacyInfo />
      // </AdminProtector>
    ),
  },
  {
    path: "/pharmacy-info",
    element: (
      // <AdminProtector>
      <PharmacyInfo />
      // </AdminProtector>
    ),
  },
  {
    path: "/branch-info",
    element: (
      // <AdminProtector>
      <BranchInfo />
      // </AdminProtector>
    ),
  },
  {
    path: "/commission-report",
    element: <CommissionReport />,
  },
  {
    path: "/payout-report",
    element: <PayoutReport />,
  },
  {
    path: "/orders-prescriptions",
    element: <OrdersPrescriptions />
  }
];

export default adminRoutes;
