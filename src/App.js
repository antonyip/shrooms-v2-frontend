import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Container from "react-bootstrap/Container";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Views/Root";
import Login from "./Views/Login";
import Admin from "./Views/Admin";
import Query from "./Views/Query";

const router = createBrowserRouter([
  { path: "/", element: <Root /> },
  { path: "/login", element: <Login /> },
  { path: "/admin", element: <Admin /> },
  { path: "/query", element: <Query /> },
]);

function App() {
  return (
    <Container>
      <RouterProvider router={router}>
      </RouterProvider>
    </Container>
  );
}

export default App;
