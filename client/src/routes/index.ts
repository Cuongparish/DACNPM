import * as Authentication from "../pages/Authentication";
import * as User from "../pages/User";
import * as Admin from "../pages/Admin";
import * as HR from "../pages/HR";
import * as Error from "../pages/Error";

import {
  UserLayout,
  AdminLayout,
  HRLayout,
  EmptyLayout,
} from "../layouts";
import { ReactElement } from "react";

interface LayoutProp {
  children: React.ReactNode | React.ReactElement<any>;
}

interface RouteItem {
  path: string;
  component: () => ReactElement;
  layout: ({ }:LayoutProp) => ReactElement;
}

const routes: RouteItem[] = [
  // AUTHENTICATION PAGES - Tiến
  {
    path: "admin-login",
    component: Authentication.AdminLogIn,
    layout: AdminLayout,
  },
  {
    path: "user-login",
    component: Authentication.UserLogIn,
    layout: AdminLayout,
  },
  // khuc nay tien them vo nha

  // USER PAGES - Nguyên , Khoa, Hùng
  { path: "/", component: User.Home, layout: UserLayout },
  {
    path: "/results",
    component: User.SearchResult,
    layout: UserLayout,
  },
  {
    path: "/your-application",
    component: User.YourApplications,
    layout: UserLayout,
  },
  { path: "/apply", component: User.ApplyCV, layout: UserLayout },
  {
    path: "/create-cv",
    component: User.CreateCV,
    layout: UserLayout,
  },
  { path: "/edit-cv", component: User.EditCV, layout: UserLayout },

  // ADMIN PAGES - Thức
  { path: "/admin", component: Admin.Overview, layout: AdminLayout },
  {
    path: "/admin/compaign",
    component: Admin.Compaign,
    layout: AdminLayout,
  },

  // HR PAGES - Yến, Thịnh, Thức
  { path: "/hr/post-job", component: HR.PostJob, layout: HRLayout },
  { path: "/hr/approve", component: HR.ReceiveCV, layout: HRLayout },
  { path:"/hr/compaign", component: HR.Compaign, layout: HRLayout},
  { path:"/hr/compaign-edit/:id", component: HR.CompaignEdit, layout: HRLayout},
  { path:"/hr/recruitment", component: HR.Recruitment, layout: HRLayout},

  // ERROR PAGES
  {
    path: "error-path",
    component: Error.ErrorPath,
    layout: EmptyLayout,
  },
];

export default routes;
