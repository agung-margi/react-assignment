import React from "react";
import ShowPost from "./components/ShowPost";
import AddPost from "./components/AddPost";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditPost from "./components/EditPost";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<ShowPost />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
