import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui";
import ErrorBoundary from "@/components/ErrorBoundaries";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
        <Toaster />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
