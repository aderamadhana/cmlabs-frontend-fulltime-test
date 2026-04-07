<template>
  <section class="ingredients-view py-5">
    <div class="container">
      <div class="page-head mb-5">
        <div class="row g-4 align-items-end">
          <div class="col-lg-7">
            <p class="page-kicker">
              <i class="bi bi-basket2 me-2"></i>
              INGREDIENT COLLECTION
            </p>

            <h1 class="page-title">
              Browse ingredients in a cleaner, more structured layout.
            </h1>

            <p class="page-subtitle">
              Search ingredients, adjust items per page, and explore the list in
              a layout that matches the rest of the website.
            </p>
          </div>

          <div class="col-lg-5">
            <div class="filter-panel">
              <div class="row g-3">
                <div class="col-12">
                  <label for="ingredient-search" class="filter-label">
                    Search ingredient
                  </label>

                  <div class="input-wrap">
                    <i class="bi bi-search"></i>
                    <input
                      id="ingredient-search"
                      v-model="search"
                      type="text"
                      class="custom-input"
                      placeholder="Search ingredient..."
                    />
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <label for="per-page" class="filter-label">
                    Items per page
                  </label>

                  <div class="select-wrap">
                    <i class="bi bi-grid"></i>
                    <select
                      id="per-page"
                      v-model.number="perPage"
                      class="custom-select"
                    >
                      <option :value="8">8 / page</option>
                      <option :value="12">12 / page</option>
                      <option :value="16">16 / page</option>
                      <option :value="20">20 / page</option>
                    </select>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <label class="filter-label">Total result</label>
                  <div class="total-box">
                    <i class="bi bi-stack me-2"></i>
                    {{ filteredIngredients.length }} items
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <div class="section-head mb-4">
          <div>
            <p class="section-kicker">
              <i class="bi bi-stars me-2"></i>
              INGREDIENTS
            </p>
            <h2 class="section-title">Available ingredients</h2>
          </div>
        </div>

        <div v-if="loading" class="state-box text-center">
          <div class="spinner-border custom-spinner mb-3" role="status"></div>
          <p class="state-text mb-0">Loading ingredients...</p>
        </div>

        <div v-else-if="error" class="state-box state-error text-center">
          <i class="bi bi-exclamation-circle mb-3"></i>
          <p class="mb-0">{{ error }}</p>
        </div>

        <div v-else>
          <div v-if="paginatedIngredients.length" class="row g-4">
            <div
              v-for="item in paginatedIngredients"
              :key="item.idIngredient"
              class="col-12 col-sm-6 col-lg-4 col-xl-3"
            >
              <IngredientCard
                :name="item.strIngredient"
                :image="item.strThumb"
                :description="item.strDescription"
              />
            </div>
          </div>

          <div v-else class="state-box text-center">
            <i class="bi bi-search mb-3"></i>
            <h3>No ingredients found</h3>
            <p class="mb-0">
              Try another keyword to find matching ingredients.
            </p>
          </div>

          <nav
            v-if="totalPages > 1"
            class="pagination-wrap"
            aria-label="Ingredients pagination"
          >
            <ul class="pagination custom-pagination mb-0">
              <li class="page-item" :class="{ disabled: page === 1 }">
                <button class="page-link" @click="changePage(page - 1)">
                  <i class="bi bi-chevron-left"></i>
                </button>
              </li>

              <li
                v-for="p in visiblePages"
                :key="p"
                class="page-item"
                :class="{ active: page === p }"
              >
                <button class="page-link" @click="changePage(p)">
                  {{ p }}
                </button>
              </li>

              <li class="page-item" :class="{ disabled: page === totalPages }">
                <button class="page-link" @click="changePage(page + 1)">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import IngredientCard from "../components/IngredientCard.vue";
import { getIngredients } from "../services/mealApi";

export default {
  name: "IngredientsView",
  components: { IngredientCard },
  data() {
    return {
      ingredients: [],
      loading: false,
      error: "",
      search: "",
      page: 1,
      perPage: 8,
    };
  },
  computed: {
    filteredIngredients() {
      const keyword = this.search.trim().toLowerCase();

      if (!keyword) return this.ingredients;

      return this.ingredients.filter((item) =>
        item.strIngredient.toLowerCase().includes(keyword),
      );
    },
    totalPages() {
      return Math.ceil(this.filteredIngredients.length / this.perPage) || 1;
    },
    paginatedIngredients() {
      const start = (this.page - 1) * this.perPage;
      return this.filteredIngredients.slice(start, start + this.perPage);
    },
    visiblePages() {
      const pages = [];
      const max = 5;

      let start = Math.max(1, this.page - 2);
      let end = Math.min(this.totalPages, start + max - 1);

      if (end - start < max - 1) {
        start = Math.max(1, end - max + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
  },
  watch: {
    search() {
      this.page = 1;
      this.updateQuery();
    },
    page() {
      this.updateQuery();
    },
    perPage() {
      this.page = 1;
      this.updateQuery();
    },
    totalPages(newTotal) {
      if (this.page > newTotal) {
        this.page = newTotal;
      }
    },
  },
  methods: {
    async fetchIngredients() {
      this.loading = true;
      this.error = "";

      try {
        this.ingredients = await getIngredients();
      } catch (err) {
        this.error = "Failed to load ingredients";
      } finally {
        this.loading = false;
      }
    },
    changePage(p) {
      if (p < 1 || p > this.totalPages) return;
      this.page = p;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    updateQuery() {
      this.$router.replace({
        query: {
          search: this.search || undefined,
          page: this.page !== 1 ? this.page : undefined,
          perPage: this.perPage !== 8 ? this.perPage : undefined,
        },
      });
    },
    initFromQuery() {
      const { search, page, perPage } = this.$route.query;

      if (search) this.search = search;

      if (page) {
        const parsedPage = parseInt(page, 10);
        if (!Number.isNaN(parsedPage) && parsedPage > 0) {
          this.page = parsedPage;
        }
      }

      if (perPage) {
        const parsedPerPage = parseInt(perPage, 10);
        if ([8, 12, 16, 20].includes(parsedPerPage)) {
          this.perPage = parsedPerPage;
        }
      }
    },
  },
  mounted() {
    this.initFromQuery();
    this.fetchIngredients();
  },
};
</script>

<style scoped>
.ingredients-view {
  background: #fcf8f2;
  min-height: calc(100vh - 74px);
  color: #22201d;
}

.page-head {
  padding-bottom: 8px;
  border-bottom: 1px solid #ece1d5;
}

.page-kicker,
.section-kicker {
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: #b06a3c;
  margin-bottom: 14px;
  display: inline-flex;
  align-items: center;
}

.page-title {
  font-size: clamp(2rem, 3.8vw, 3.4rem);
  line-height: 1.08;
  font-weight: 700;
  color: #201d1a;
  margin-bottom: 16px;
  max-width: 700px;
}

.page-subtitle {
  max-width: 580px;
  color: #68615b;
  line-height: 1.8;
  margin-bottom: 0;
}

.filter-panel {
  background: #fffdf9;
  border: 1px solid #eadfd3;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 24px rgba(35, 25, 18, 0.03);
}

.filter-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2b2723;
  margin-bottom: 10px;
}

.input-wrap,
.select-wrap {
  position: relative;
}

.input-wrap i,
.select-wrap i {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: #b06a3c;
  font-size: 0.95rem;
  pointer-events: none;
}

.custom-input,
.custom-select {
  width: 100%;
  height: 48px;
  border: 1px solid #dccfc2;
  background: #fff;
  border-radius: 10px;
  color: #22201d;
  outline: none;
  transition: 0.2s ease;
}

.custom-input {
  padding: 0 14px 0 42px;
}

.custom-select {
  padding: 0 14px 0 42px;
  appearance: none;
}

.custom-input:focus,
.custom-select:focus {
  border-color: #c99a77;
  box-shadow: 0 0 0 4px rgba(201, 106, 43, 0.08);
}

.total-box {
  height: 48px;
  border: 1px solid #e3d7ca;
  background: #fcf7f1;
  border-radius: 10px;
  color: #5e5852;
  display: flex;
  align-items: center;
  padding: 0 14px;
  font-weight: 600;
}

.total-box i {
  color: #b06a3c;
}

.section-title {
  font-size: 1.8rem;
  margin: 0;
  color: #201d1a;
}

.state-box {
  background: #fffdf9;
  border: 1px solid #eadfd3;
  border-radius: 12px;
  padding: 44px 20px;
}

.state-box i {
  font-size: 1.4rem;
  color: #c96a2b;
  display: inline-block;
}

.state-box h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #201d1a;
}

.state-text,
.state-box p {
  color: #6c655f;
}

.state-error {
  color: #842029;
  background: #fff7f7;
  border-color: #f1d2d2;
}

.custom-spinner {
  color: #c96a2b;
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

@media (max-width: 991.98px) {
  .page-title {
    max-width: 100%;
  }
}
</style>
