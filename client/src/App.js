import { Routes, Route } from "react-router-dom";
import AddBook from "./features/AddBook";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Welcome from "./features/auth/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="addbook" element={<AddBook />} />
      </Route>
    </Routes>
  );
}

export default App;