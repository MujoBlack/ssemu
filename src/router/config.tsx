import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Services from "../pages/services/page";
import About from "../pages/about/page";
import Team from "../pages/team/page";
import TeamMember from "../pages/team/member";
import Blog from "../pages/blog/page";
import BlogPost from "../pages/blog/post";
import Contact from "../pages/contact/page";
import Layout from "../components/feature/Layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "about", element: <About /> },
      { path: "team", element: <Team /> },
      { path: "team/:slug", element: <TeamMember /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;