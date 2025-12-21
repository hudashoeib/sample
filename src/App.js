import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NotFound from "pages/NotFound";
import Home from "pages/Home";
import Root from "Root";
import Create from "pages/Create";
import About from "pages/About";
import SignIn from "pages/Sign/SignIn";
import SignUp from "pages/Sign/SignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />

      <Route path="create" element={<Create />} />
      <Route path="about" element={<About />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
