<template>
  <button
    type="button"
    class="food-category-card"
    @click="$emit('select', name)"
  >
    <div class="category-icon">
      <i :class="['bi', categoryIcon]"></i>
    </div>

    <div class="category-content">
      <h3 class="food-category-name">{{ name }}</h3>
      <p class="food-category-desc">Browse meals in this category</p>
    </div>

    <div class="category-arrow">
      <i class="bi bi-arrow-right"></i>
    </div>
  </button>
</template>

<script>
export default {
  name: "FoodCategoryCard",
  emits: ["select"],
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  computed: {
    categoryIcon() {
      const iconMap = {
        Beef: "bi-fire",
        Breakfast: "bi-sunrise",
        Chicken: "bi-egg-fried",
        Dessert: "bi-cake2",
        Miscellaneous: "bi-grid-1x2",
        Pasta: "bi-circle-square",
        Seafood: "bi-water",
        Starter: "bi-stars",
        Vegan: "bi-leaf",
        Vegetarian: "bi-flower1",
      };

      return iconMap[this.name] || "bi-tag";
    },
  },
};
</script>

<style scoped>
.food-category-card {
  width: 100%;
  min-height: 96px;
  border: 1px solid #eadfd3;
  border-radius: 12px;
  background: #fffdf9;
  box-shadow: 0 10px 24px rgba(35, 25, 18, 0.03);
  transition: 0.22s ease;
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
}

.food-category-card:hover {
  transform: translateY(-3px);
  border-color: #d9c8ba;
  box-shadow: 0 16px 30px rgba(35, 25, 18, 0.06);
}

.category-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #f7eee4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon i {
  color: #c96a2b;
  font-size: 1rem;
}

.category-content {
  flex: 1;
  min-width: 0;
}

.food-category-name {
  font-size: 1rem;
  font-weight: 600;
  color: #201d1a;
  margin: 0 0 4px;
  line-height: 1.4;
}

.food-category-desc {
  font-size: 0.88rem;
  color: #6c655f;
  margin: 0;
  line-height: 1.5;
}

.category-arrow {
  color: #b06a3c;
  font-size: 1rem;
  flex-shrink: 0;
}

@media (max-width: 575.98px) {
  .food-category-card {
    min-height: 88px;
    padding: 14px;
  }

  .category-icon {
    width: 38px;
    height: 38px;
  }

  .food-category-name {
    font-size: 0.96rem;
  }

  .food-category-desc {
    font-size: 0.84rem;
  }
}
</style>
