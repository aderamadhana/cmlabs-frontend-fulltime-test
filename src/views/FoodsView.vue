<template>
  <section class="foods-view py-4 py-lg-5">
    <div class="container">
      <header class="page-head mb-4 mb-lg-5">
        <p class="page-kicker">
          <i class="bi bi-cup-hot me-2"></i>
          FOOD COLLECTION
        </p>

        <h1 class="page-title">
          Find meals faster and browse more comfortably.
        </h1>

        <p class="page-subtitle">
          Search by meal name or filter by first letter, then explore categories
          after you finish browsing the results.
        </p>
      </header>

      <div class="row g-4 align-items-start">
        <aside class="col-lg-4 col-xl-3">
          <div class="filter-card">
            <div class="filter-head">
              <p class="section-kicker mb-2">
                <i class="bi bi-sliders me-2"></i>
                FILTERS
              </p>
              <h2 class="filter-title">Search meals</h2>
              <p class="filter-subtitle">
                Use name, first letter, or category to narrow the results.
              </p>
            </div>

            <div class="filter-block">
              <label class="search-label">Search by meal name</label>

              <div class="meal-search-wrap">
                <i class="bi bi-search"></i>
                <input
                  v-model="mealName"
                  type="text"
                  class="meal-search-input"
                  placeholder="Example: Arrabiata"
                  @input="handleMealNameSearch"
                />
              </div>

              <p class="search-note mb-0">
                Search meals by full or partial name.
              </p>
            </div>

            <div class="filter-divider"></div>

            <div class="filter-block">
              <label class="search-label">Browse by alphabet</label>

              <div class="alphabet-wrap">
                <button
                  v-for="char in alphabets"
                  :key="char"
                  type="button"
                  class="alphabet-btn"
                  :class="{
                    active:
                      searchMode === 'letter' &&
                      activeLetter === char.toLowerCase(),
                  }"
                  @click="selectLetter(char)"
                >
                  {{ char }}
                </button>
              </div>
            </div>

            <div class="filter-divider"></div>

            <div class="filter-block">
              <label class="search-label">Browse by category</label>

              <div class="category-sidebar-wrap">
                <button
                  v-for="cat in categories"
                  :key="cat.strCategory"
                  type="button"
                  class="category-sidebar-btn"
                  @click="goToCategory(cat.strCategory)"
                >
                  <span>{{ cat.strCategory }}</span>
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div class="col-lg-8 col-xl-9">
          <div class="results-card">
            <div class="results-toolbar">
              <div>
                <p class="section-kicker">
                  <i class="bi bi-stars me-2"></i>
                  MEALS
                </p>

                <h2 class="section-title">{{ mealsHeading }}</h2>

                <p class="results-subtitle">
                  {{
                    searchMode === "name" && trimmedMealName
                      ? "Showing meals that match your keyword."
                      : "Showing meals based on the selected first letter."
                  }}
                </p>
              </div>

              <div class="result-badge">
                <i class="bi bi-grid me-2"></i>
                {{ foods.length }} items
              </div>
            </div>

            <div v-if="paginatedFoods.length" class="row g-4">
              <div
                v-for="item in paginatedFoods"
                :key="item.idMeal"
                class="col-sm-6 col-xl-4"
              >
                <FoodCard
                  :id="item.idMeal"
                  :name="item.strMeal"
                  :image="item.strMealThumb"
                />
              </div>
            </div>

            <div v-else class="empty-state">
              <i class="bi bi-search"></i>
              <h3>No meals found</h3>
              <p>{{ emptyStateText }}</p>
            </div>

            <nav
              v-if="totalPages > 1"
              class="pagination-wrap"
              aria-label="Meals pagination"
            >
              <ul class="pagination custom-pagination mb-0">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" @click="goToPage(currentPage - 1)">
                    <i class="bi bi-chevron-left"></i>
                  </button>
                </li>

                <li
                  v-for="page in visiblePages"
                  :key="page"
                  class="page-item"
                  :class="{ active: currentPage === page }"
                >
                  <button class="page-link" @click="goToPage(page)">
                    {{ page }}
                  </button>
                </li>

                <li
                  class="page-item"
                  :class="{ disabled: currentPage === totalPages }"
                >
                  <button class="page-link" @click="goToPage(currentPage + 1)">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FoodCard from "../components/FoodCard.vue";
import FoodCategoryCard from "../components/FoodCategoryCard.vue";
import {
  searchFoodsByFirstLetter,
  searchFoodsByMealName,
  getFoodCategories,
} from "../services/mealApi";

export default {
  name: "FoodView",
  components: {
    FoodCard,
    FoodCategoryCard,
  },
  data() {
    return {
      activeLetter: "a",
      mealName: "",
      searchMode: "letter",
      foods: [],
      categories: [],
      currentPage: 1,
      itemsPerPage: 9,
      alphabets: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    };
  },
  computed: {
    trimmedMealName() {
      return this.mealName.trim();
    },
    mealsHeading() {
      if (this.searchMode === "name" && this.trimmedMealName) {
        return `Search results for "${this.trimmedMealName}"`;
      }

      return `Meals starting with "${this.activeLetter.toUpperCase()}"`;
    },
    emptyStateText() {
      if (this.searchMode === "name" && this.trimmedMealName) {
        return "Try another meal name keyword.";
      }

      return "Try another letter to see available meals from TheMealDB.";
    },
    totalPages() {
      return Math.ceil(this.foods.length / this.itemsPerPage);
    },
    paginatedFoods() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.foods.slice(start, end);
    },
    visiblePages() {
      const total = this.totalPages;
      const current = this.currentPage;

      if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }

      if (current <= 3) {
        return [1, 2, 3, 4, 5];
      }

      if (current >= total - 2) {
        return [total - 4, total - 3, total - 2, total - 1, total];
      }

      return [current - 2, current - 1, current, current + 1, current + 2];
    },
  },
  async mounted() {
    await this.loadInitialData();
  },
  methods: {
    async loadInitialData() {
      try {
        const [foods, categories] = await Promise.all([
          searchFoodsByFirstLetter(this.activeLetter),
          getFoodCategories(),
        ]);

        this.foods = foods || [];
        this.categories = categories || [];
        this.currentPage = 1;
        this.searchMode = "letter";
      } catch (error) {
        console.error("Failed to load foods view data:", error);
      }
    },

    async selectLetter(char) {
      const value = char.toLowerCase();

      if (this.searchMode === "letter" && this.activeLetter === value) return;

      this.activeLetter = value;
      this.mealName = "";
      this.searchMode = "letter";
      this.currentPage = 1;

      try {
        this.foods = await searchFoodsByFirstLetter(value);
      } catch (error) {
        console.error("Failed to search foods by first letter:", error);
        this.foods = [];
      }
    },

    async handleMealNameSearch() {
      this.currentPage = 1;

      try {
        if (!this.trimmedMealName) {
          this.searchMode = "letter";
          this.foods = await searchFoodsByFirstLetter(this.activeLetter);
          return;
        }

        this.searchMode = "name";
        this.foods = await searchFoodsByMealName(this.trimmedMealName);
      } catch (error) {
        console.error("Failed to search foods by meal name:", error);
        this.foods = [];
      }
    },

    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    goToCategory(name) {
      this.$router.push(`/foods/category/${name}`);
    },
  },
};
</script>

<style scoped>
.foods-view {
  background: #fcf8f2;
  min-height: calc(100vh - 74px);
  color: #22201d;
}

.page-head {
  max-width: 760px;
}

.page-kicker,
.section-kicker {
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: #b06a3c;
  margin-bottom: 12px;
  display: inline-flex;
  align-items: center;
}

.page-title {
  font-size: clamp(2rem, 3.5vw, 3.2rem);
  line-height: 1.08;
  font-weight: 700;
  color: #201d1a;
  margin-bottom: 14px;
}

.page-subtitle,
.results-subtitle,
.category-subtitle,
.filter-subtitle {
  color: #6d655e;
  line-height: 1.7;
  margin-bottom: 0;
}

.filter-card,
.results-card,
.content-section {
  background: #fffdf9;
  border: 1px solid #eadfd3;
  border-radius: 18px;
  box-shadow: 0 10px 24px rgba(35, 25, 18, 0.04);
}

.filter-card {
  padding: 22px;
  position: sticky;
  top: 90px;
}

.filter-head {
  margin-bottom: 20px;
}

.filter-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #201d1a;
  margin-bottom: 8px;
}

.filter-block + .filter-block {
  margin-top: 18px;
}

.filter-divider {
  border-top: 1px solid #eee2d6;
  margin: 20px 0;
}

.search-label {
  display: block;
  font-size: 0.92rem;
  font-weight: 600;
  color: #2b2723;
  margin-bottom: 10px;
}

.meal-search-wrap {
  position: relative;
}

.meal-search-wrap i {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: #b06a3c;
  font-size: 0.95rem;
}

.meal-search-input {
  width: 100%;
  height: 48px;
  border: 1px solid #dccfc2;
  background: #fff;
  border-radius: 12px;
  padding: 0 14px 0 42px;
  color: #22201d;
  outline: none;
  transition: 0.2s ease;
}

.meal-search-input:focus {
  border-color: #c99a77;
  box-shadow: 0 0 0 4px rgba(201, 106, 43, 0.08);
}

.search-note {
  font-size: 0.88rem;
  color: #7a726b;
  margin-top: 10px;
}

.alphabet-wrap {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
}

.alphabet-btn {
  width: 100%;
  min-width: 0;
  height: 42px;
  padding: 0;
  border: 1px solid #dccfc2;
  background: #fff;
  border-radius: 10px;
  color: #4f4740;
  font-weight: 600;
  font-size: 0.9rem;
  transition: 0.2s ease;
}

.alphabet-btn:hover {
  border-color: #c99a77;
  background: #f7eee4;
  color: #b06a3c;
}

.alphabet-btn.active {
  background: #c96a2b;
  border-color: #c96a2b;
  color: #fff;
}

.results-card {
  padding: 24px;
}

.results-toolbar,
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.8rem;
  margin: 0 0 8px;
  color: #201d1a;
}

.result-badge {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e3d7ca;
  background: #fff;
  color: #5e5852;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 0.92rem;
  white-space: nowrap;
}

.result-badge i {
  color: #b06a3c;
}

.empty-state {
  background: #fff;
  border: 1px dashed #decfbe;
  border-radius: 14px;
  padding: 48px 20px;
  text-align: center;
}

.empty-state i {
  font-size: 1.4rem;
  color: #c96a2b;
  margin-bottom: 12px;
  display: inline-block;
}

.empty-state h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #201d1a;
}

.empty-state p {
  color: #6c655f;
  margin-bottom: 0;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.custom-pagination .page-item {
  margin: 0 4px;
}

.custom-pagination .page-link {
  min-width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #e3d7ca;
  background: #fffdf9;
  color: #4f4740;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
}

.custom-pagination .page-link:hover {
  background: #f7eee4;
  color: #b06a3c;
  border-color: #d6c2b3;
}

.custom-pagination .page-item.active .page-link {
  background: #c96a2b;
  border-color: #c96a2b;
  color: #fff;
}

.custom-pagination .page-item.disabled .page-link {
  opacity: 0.5;
  pointer-events: none;
  background: #f8f3ed;
}

.content-section {
  padding: 24px;
}

.category-section {
  margin-top: 40px;
}

@media (max-width: 991.98px) {
  .filter-card {
    position: static;
  }

  .results-toolbar,
  .section-head {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 767.98px) {
  .alphabet-wrap {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .results-card,
  .content-section,
  .filter-card {
    padding: 18px;
  }
}

@media (max-width: 575.98px) {
  .alphabet-wrap {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .page-title {
    font-size: 1.9rem;
  }

  .section-title {
    font-size: 1.45rem;
  }
}

.category-sidebar-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 4px;
}

.category-sidebar-btn {
  width: 100%;
  border: 1px solid #dccfc2;
  background: #fff;
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #3d3834;
  font-weight: 600;
  transition: 0.2s ease;
  text-align: left;
}

.category-sidebar-btn:hover {
  border-color: #c99a77;
  background: #f7eee4;
  color: #b06a3c;
}

.category-sidebar-btn i {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
