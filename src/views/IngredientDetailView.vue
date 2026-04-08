<template>
  <section class="container py-4 py-lg-5">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb custom-breadcrumb mb-0">
        <li class="breadcrumb-item">
          <router-link to="/" class="breadcrumb-link">
            <i class="bi bi-house-door me-1"></i>
            Home
          </router-link>
        </li>

        <li class="breadcrumb-item">
          <router-link to="/ingredients" class="breadcrumb-link">
            <i class="bi bi-basket2 me-1"></i>
            Ingredients
          </router-link>
        </li>

        <li class="breadcrumb-item active" aria-current="page">
          {{ name }}
        </li>
      </ol>
    </nav>

    <div class="hero-panel mb-5">
      <div class="row g-4 align-items-start">
        <div class="col-12 col-xl-7">
          <p class="section-kicker mb-3">
            <i class="bi bi-grid-3x3-gap me-2"></i>
            MEAL COLLECTION
          </p>

          <h1 class="hero-title mb-3">
            Browse meals with {{ name }} in a cleaner, more structured layout.
          </h1>

          <p class="hero-subtitle mb-0">
            Search meals, adjust items per page, and explore the list in a
            layout that stays consistent with the rest of the website.
          </p>
        </div>

        <div class="col-12 col-xl-5">
          <div class="control-card">
            <div class="mb-4">
              <label class="control-label mb-2">Search meal</label>
              <div class="search-box">
                <i class="bi bi-search search-icon"></i>
                <input
                  v-model="mealName"
                  type="text"
                  class="form-control search-input"
                  placeholder="Search meal..."
                />
              </div>
            </div>

            <div class="row g-3">
              <div class="col-12 col-sm-6">
                <label class="control-label mb-2">Items per page</label>
                <div class="mini-stat mini-stat-select">
                  <i class="bi bi-grid me-2"></i>
                  <select
                    v-model.number="itemsPerPage"
                    class="form-select stat-select"
                  >
                    <option :value="8">8 / page</option>
                    <option :value="12">12 / page</option>
                    <option :value="16">16 / page</option>
                    <option :value="20">20 / page</option>
                  </select>
                </div>
              </div>

              <div class="col-12 col-sm-6">
                <label class="control-label mb-2">Total result</label>
                <div class="mini-stat">
                  <i class="bi bi-layers me-2"></i>
                  <span>{{ filteredMeals.length }} meals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="hero-divider" />
    </div>

    <div class="mb-4">
      <p class="section-kicker mb-2">
        <i class="bi bi-stars me-2"></i>
        MEALS
      </p>
      <h2 class="content-title mb-0">Available meals</h2>
    </div>

    <div v-if="loading" class="state-box text-center">
      <div class="spinner-border mb-3" role="status" aria-hidden="true"></div>
      <div>Loading meals...</div>
    </div>

    <div v-else-if="error" class="state-box error-box text-center">
      <i class="bi bi-exclamation-triangle fs-3 mb-2 d-block"></i>
      <div>{{ error }}</div>
    </div>

    <div v-else-if="filteredMeals.length === 0" class="state-box text-center">
      <i class="bi bi-search fs-2 mb-3 d-block"></i>
      <h5 class="mb-2">No meals found</h5>
      <p class="mb-0">
        No meal matched
        <strong>"{{ mealName }}"</strong>
        for ingredient
        <strong>{{ name }}</strong
        >.
      </p>
    </div>

    <div v-else class="row g-4">
      <div
        v-for="meal in paginatedMeals"
        :key="meal.idMeal"
        class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex"
      >
        <div class="w-100 meal-card-wrap">
          <FoodCard
            :id="meal.idMeal"
            :name="meal.strMeal"
            :image="meal.strMealThumb"
          />
        </div>
      </div>
    </div>

    <div
      v-if="!loading && !error && totalPages > 1"
      class="d-flex justify-content-center mt-5"
    >
      <nav aria-label="Meal pagination">
        <ul class="pagination custom-pagination mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">
              Prev
            </button>
          </li>

          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="changePage(page)">
              {{ page }}
            </button>
          </li>

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <button class="page-link" @click="changePage(currentPage + 1)">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import FoodCard from "../components/FoodCard.vue";
import { getFoodsByIngredients } from "../services/mealApi";

export default {
  name: "IngredientDetailView",
  components: { FoodCard },
  data() {
    return {
      allMeals: [],
      mealName: "",
      itemsPerPage: 8,
      currentPage: 1,
      loading: false,
      error: "",
    };
  },
  computed: {
    name() {
      return this.$route.params.name;
    },
    trimmedMealName() {
      return this.mealName.trim().toLowerCase();
    },
    filteredMeals() {
      if (!this.trimmedMealName) return this.allMeals;

      return this.allMeals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(this.trimmedMealName),
      );
    },
    paginatedMeals() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredMeals.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredMeals.length / this.itemsPerPage) || 1;
    },
  },
  watch: {
    name() {
      this.fetchMeals();
    },
    mealName() {
      this.currentPage = 1;
    },
    itemsPerPage() {
      this.currentPage = 1;
    },
  },
  methods: {
    async fetchMeals() {
      this.loading = true;
      this.error = "";
      this.currentPage = 1;

      try {
        this.allMeals = await getFoodsByIngredients(this.name);
      } catch (err) {
        this.error = "Failed to load meals";
        this.allMeals = [];
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    this.fetchMeals();
  },
};
</script>

<style scoped>
.custom-breadcrumb {
  font-size: 0.95rem;
}

.breadcrumb-link {
  color: #6c655f;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.breadcrumb-link:hover {
  color: #b06a3c;
}

.breadcrumb-item.active {
  color: #201d1a;
  font-weight: 600;
}

.breadcrumb-item + .breadcrumb-item::before {
  color: #b7ab9f;
}

.hero-panel {
  padding-top: 0.5rem;
}

.section-kicker {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c36d35;
}

.hero-title {
  font-size: clamp(2rem, 4.5vw, 4rem);
  line-height: 1.05;
  font-weight: 800;
  color: #201d1a;
  max-width: 720px;
}

.hero-subtitle {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #5f5751;
  max-width: 720px;
}

.control-card {
  border: 1px solid #e5d6cb;
  border-radius: 18px;
  padding: 20px;
  background: #fffdfa;
}

.control-label {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: #201d1a;
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #c36d35;
  font-size: 1rem;
}

.search-input {
  height: 50px;
  border-radius: 14px;
  padding-left: 42px;
  border: 1px solid #d9c9bc;
  box-shadow: none;
}

.search-input:focus,
.stat-select:focus {
  border-color: #c36d35;
  box-shadow: 0 0 0 0.2rem rgba(195, 109, 53, 0.12);
}

.mini-stat {
  height: 50px;
  border: 1px solid #d9c9bc;
  border-radius: 14px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  background: #fff;
  color: #3f3a35;
  font-weight: 600;
}

.mini-stat i {
  color: #c36d35;
}

.mini-stat-select {
  padding: 0 10px 0 14px;
}

.stat-select {
  border: 0;
  box-shadow: none !important;
  background: transparent;
  font-weight: 600;
  padding-left: 0;
}

.hero-divider {
  margin-top: 2.5rem;
  margin-bottom: 0;
  border-color: #e7d8cd;
}

.content-title {
  font-size: clamp(1.8rem, 2.5vw, 2.4rem);
  font-weight: 800;
  color: #0f172a;
}

.state-box {
  background: #fffdfa;
  border: 1px solid #eadfd6;
  border-radius: 18px;
  padding: 48px 20px;
  color: #5f5751;
}

.error-box {
  background: #fff8f8;
  border-color: #f0d0d0;
  color: #8b3d3d;
}

.meal-card-wrap {
  height: 100%;
}

.custom-pagination .page-link {
  color: #6c655f;
  border-color: #ddd0c5;
  min-width: 42px;
  text-align: center;
}

.custom-pagination .page-item.active .page-link {
  background: #c36d35;
  border-color: #c36d35;
  color: #fff;
}

.custom-pagination .page-link:focus {
  box-shadow: none;
}

@media (max-width: 991.98px) {
  .hero-title {
    max-width: 100%;
  }

  .hero-subtitle {
    max-width: 100%;
  }
}
</style>
