import { Routes } from "@angular/router";

export const routes: Routes = [
  //lazy load the main component
  {
    path: "",
    loadComponent: () =>
      import("./components/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: "expansion",
    loadComponent: () =>
      import("./components/expansion/expansion.component").then(
        (m) => m.ExpansionComponent
      ),
  },
];
