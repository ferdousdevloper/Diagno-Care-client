import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import FirebaseAuthProvider from "./FirebaseAuthProvider/FirebaseAuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FirebaseAuthProvider>
        <RouterProvider router={router} />
      </FirebaseAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
