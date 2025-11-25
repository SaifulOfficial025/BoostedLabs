import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <div className="font-sans">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
