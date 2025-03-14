import { useRoutes, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from "../components/loader/PageLoader";

const LoginPage = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));
const CoursesPage = lazy(() => import("../pages/course"));
const StudentPage = lazy(() => import("../pages/student"));
const EnrollmentPage = lazy(() => import("../pages/home"));
const DashboardLayout = lazy(() => import("../layouts/dashboard"));

function Router() {
  const router = useRoutes([
    {
      path: "/",
      element: (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ),
      children: [
        { element: <Home />, index: true },
        { path: "course", element: <CoursesPage /> },
        { path: "student", element: <StudentPage /> },
        { path: "enrollment", element: <EnrollmentPage /> },
      ],
    },
    { path: "/login", element: <LoginPage /> },
  ]);

  return <Suspense fallback={<PageLoader />}>{router}</Suspense>;
}

export default Router;
