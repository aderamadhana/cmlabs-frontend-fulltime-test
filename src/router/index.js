import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import FoodsView from "../views/FoodsView.vue";
import CategoryView from "../views/CategoryView.vue";
import IngredientsView from "../views/IngredientsView.vue";
import MealDetailView from "../views/MealDetailView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/foods", name: "foods", component: FoodsView },
  { path: "/foods/category/:name", name: "category", component: CategoryView },
  {
    path: "/foods/detail/:id",
    name: "meal-detail",
    component: MealDetailView,
  },
  { path: "/ingredients", name: "ingredients", component: IngredientsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
