import { Routes, Route } from "react-router-dom";
import AddBook from "./features/AddBook";
import Layout from "./components/Layout";
import Home from "./components/Home";
import UsersList from "./features/users/UsersList";
import BooksList from "./features/books/BooksList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="addbook" element={<AddBook />} />

        <Route path="users">
            <Route index element={<UsersList />} />
          </Route>

          <Route path="books">
            <Route index element={<BooksList />} />
          </Route>

      </Route>
    </Routes>
  );
}

export default App;