import React from "react";
import "./app.css";
import { routers } from "./routers";
import MainLayout from "./Components/Layouts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routers.map((route) => {
            const Layouts = MainLayout;
            const path = route.path;
            const Components = route.components;
            return (
              <Route
                path={path}
                element={
                  <Layouts>
                    <Components />
                  </Layouts>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
