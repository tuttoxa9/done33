import { useState, lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { Toaster, TooltipProvider } from "@/lib/ui-components";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

// Ленивая загрузка страниц
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Компонент загрузки - минималистичный и легкий
function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-3xl font-medium text-primary">Загрузка...</div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
