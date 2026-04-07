<template>
  <section class="home-view">
    <div class="container">
      <div class="hero-section">
        <div class="row align-items-center g-4">
          <div class="col-lg-6">
            <div class="hero-copy">
              <p class="hero-kicker">
                <i class="bi bi-stars me-2"></i>
                MEALDB API WEBSITE
              </p>

              <h1 class="hero-title">
                Explore meals, ingredients, and categories with a warmer look.
              </h1>

              <p class="hero-subtitle">
                Discover food inspirations, browse ingredients, and explore meal
                categories in a cleaner interface built around content.
              </p>

              <div class="hero-actions">
                <router-link
                  to="/foods"
                  class="btn btn-dark-clean"
                >
                  <i class="bi bi-search me-2"></i>
                  Explore Foods
                </router-link>

                <router-link
                  to="/ingredients"
                  class="btn btn-light-clean"
                >
                  <i class="bi bi-basket2 me-2"></i>
                  Browse Ingredients
                </router-link>
              </div>

              <div class="hero-stats">
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="bi bi-egg-fried"></i>
                  </div>
                  <strong>Meals</strong>
                  <span>Browse dishes from different categories</span>
                </div>

                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="bi bi-basket"></i>
                  </div>
                  <strong>Ingredients</strong>
                  <span>Explore what goes into each recipe</span>
                </div>

                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="bi bi-grid-1x2"></i>
                  </div>
                  <strong>Categories</strong>
                  <span>Find meals faster by topic</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="hero-panel">
              <div class="panel-main">
                <div class="panel-label">
                  <i class="bi bi-fire me-2"></i>
                  Featured Experience
                </div>
                <h3>Food discovery that stays simple and visual</h3>
                <p>
                  A landing page should immediately show what users can do. So
                  instead of empty space, this layout gives structured previews.
                </p>
              </div>

              <div class="panel-grid">
                <div class="mini-card">
                  <i class="bi bi-egg-fried"></i>
                  <h4>Meals</h4>
                  <p>Find dishes worth trying.</p>
                </div>

                <div class="mini-card">
                  <i class="bi bi-basket2-fill"></i>
                  <h4>Ingredients</h4>
                  <p>Browse essential items.</p>
                </div>

                <div class="mini-card">
                  <i class="bi bi-grid-1x2-fill"></i>
                  <h4>Categories</h4>
                  <p>Organized food discovery.</p>
                </div>

                <div class="mini-card accent-card">
                  <i class="bi bi-bookmark-heart"></i>
                  <h4>Daily Picks</h4>
                  <p>Highlight interesting meals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <div class="section-heading">
          <div>
            <p class="section-kicker">
              <i class="bi bi-compass me-2"></i>
              EXPLORE
            </p>
            <h2>What you can browse</h2>
          </div>

          <router-link
            to="/foods"
            class="section-link"
          >
            View all foods
            <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="preview-card">
              <div class="preview-icon">
                <i class="bi bi-cup-hot"></i>
              </div>
              <h3>Food Collection</h3>
              <p>
                Browse meal data in a more readable layout with stronger content
                focus and better structure.
              </p>
              <router-link
                to="/foods"
                class="preview-link"
              >
                Explore foods
                <i class="bi bi-arrow-up-right ms-2"></i>
              </router-link>
            </div>
          </div>

          <div class="col-md-4">
            <div class="preview-card">
              <div class="preview-icon">
                <i class="bi bi-flower1"></i>
              </div>
              <h3>Ingredients</h3>
              <p>
                See ingredients in a cleaner browsing experience without noisy
                UI elements getting in the way.
              </p>
              <router-link
                to="/ingredients"
                class="preview-link"
              >
                Browse ingredients
                <i class="bi bi-arrow-up-right ms-2"></i>
              </router-link>
            </div>
          </div>

          <div class="col-md-4">
            <div class="preview-card">
              <div class="preview-icon">
                <i class="bi bi-bookmark-heart"></i>
              </div>
              <h3>Categories</h3>
              <p>
                Group meals into clearer sections so users know where to start
                instead of facing an empty landing area.
              </p>
              <router-link
                to="/foods"
                class="preview-link"
              >
                See categories
                <i class="bi bi-arrow-up-right ms-2"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="category-strip">
        <div class="section-heading compact">
          <div>
            <p class="section-kicker">
              <i class="bi bi-tags me-2"></i>
              FOOD CATEGORIES
            </p>
            <h2>Browse by category</h2>
          </div>
        </div>

        <div class="category-list">
          <button
            v-for="category in categories"
            :key="category.strCategory"
            type="button"
            class="category-chip"
            @click="goToCategory(category.strCategory)"
          >
            <i :class="['bi', categoryIcon(category.strCategory), 'me-2']"></i>
            {{ category.strCategory }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getFoodCategories } from "@/services/mealApi";
export default {
  name: "HomeView",
  data() {
    return {
      categories: [],
    };
  },
  async mounted() {
    try {
      this.categories = await getFoodCategories();
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },
  methods: {
    categoryIcon(name) {
      const iconMap = {
        Beef: "bi-fire",
        Breakfast: "bi-sunrise",
        Chicken: "bi-egg",
        Dessert: "bi-cake2",
        Goat: "bi-flower1",
        Lamb: "bi-flower2",
        Miscellaneous: "bi-grid-1x2",
        Pasta: "bi-circle-square",
        Pork: "bi-dot",
        Seafood: "bi-water",
        Side: "bi-three-dots",
        Starter: "bi-stars",
        Vegan: "bi-leaf",
        Vegetarian: "bi-tree",
      };

      return iconMap[name] || "bi-bookmark";
    },
    goToCategory(name) {
      this.$router.push(`/foods/category/${name}`);
    },
  },
};
</script>

<style scoped>
.home-view {
  background: #fcf8f2;
  padding: 52px 0 72px;
  color: #22201d;
}

.hero-section {
  margin-bottom: 72px;
}

.hero-copy {
  max-width: 580px;
}

.hero-kicker,
.section-kicker {
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: #b06a3c;
  margin-bottom: 14px;
  display: inline-flex;
  align-items: center;
}

.hero-title {
  font-size: clamp(2.3rem, 4vw, 4.2rem);
  line-height: 1.08;
  font-weight: 700;
  margin-bottom: 18px;
  color: #201d1a;
}

.hero-subtitle {
  font-size: 1rem;
  line-height: 1.8;
  color: #66615b;
  max-width: 540px;
  margin-bottom: 28px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.btn-dark-clean {
  background: #22201d;
  color: white;
  border: 1px solid #22201d;
  border-radius: 8px;
  padding: 11px 18px;
  font-weight: 600;
}

.btn-dark-clean:hover {
  background: #111;
  border-color: #111;
  color: white;
}

.btn-light-clean {
  background: transparent;
  color: #22201d;
  border: 1px solid #d9ccbf;
  border-radius: 8px;
  padding: 11px 18px;
  font-weight: 600;
}

.btn-light-clean:hover {
  background: white;
  color: #22201d;
  border-color: #bda893;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.stat-item {
  background: #fffdf9;
  border: 1px solid #eadfd3;
  border-radius: 10px;
  padding: 16px;
}

.stat-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: #f7eee4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.stat-icon i {
  color: #c96a2b;
  font-size: 1rem;
}

.stat-item strong {
  display: block;
  font-size: 0.98rem;
  margin-bottom: 6px;
}

.stat-item span {
  display: block;
  color: #6c655f;
  font-size: 0.9rem;
  line-height: 1.6;
}

.hero-panel {
  background: #fffdf9;
  border: 1px solid #eadfd3;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 10px 30px rgba(35, 25, 18, 0.04);
}

.panel-main {
  padding-bottom: 18px;
  border-bottom: 1px solid #efe5da;
  margin-bottom: 18px;
}

.panel-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #b06a3c;
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
}

.panel-main h3 {
  font-size: 1.5rem;
  line-height: 1.35;
  margin-bottom: 12px;
}

.panel-main p {
  color: #68615b;
  line-height: 1.75;
  margin-bottom: 0;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.mini-card {
  background: #fcf7f1;
  border: 1px solid #eadfd3;
  border-radius: 10px;
  padding: 18px;
  min-height: 150px;
}

.mini-card i {
  font-size: 1.35rem;
  color: #c96a2b;
  margin-bottom: 14px;
  display: inline-block;
}

.mini-card h4 {
  font-size: 1rem;
  margin-bottom: 8px;
}

.mini-card p {
  font-size: 0.92rem;
  color: #6a635d;
  line-height: 1.65;
  margin-bottom: 0;
}

.accent-card {
  background: #f6ede3;
}

.preview-section {
  margin-bottom: 72px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 24px;
}

.section-heading h2 {
  font-size: 2rem;
  margin: 0;
  color: #201d1a;
}

.section-heading.compact h2 {
  font-size: 1.6rem;
}

.section-link {
  color: #b06a3c;
  font-weight: 600;
  text-decoration: none;
}

.section-link:hover {
  color: #8f542e;
}

.preview-card {
  height: 100%;
  background: #fffdf9;
  border: 1px solid #eadfd3;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 10px 24px rgba(35, 25, 18, 0.03);
}

.preview-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #f7eee4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.preview-icon i {
  color: #c96a2b;
  font-size: 1.2rem;
}

.preview-card h3 {
  font-size: 1.2rem;
  margin-bottom: 12px;
}

.preview-card p {
  color: #68615b;
  line-height: 1.8;
  margin-bottom: 18px;
}

.preview-link {
  text-decoration: none;
  color: #22201d;
  font-weight: 600;
}

.preview-link:hover {
  color: #b06a3c;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.category-chip {
  border: 1px solid #e3d7ca;
  background: #fcf7f1;
  color: #5e5852;
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 0.94rem;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.category-chip:hover {
  background: #f7eee4;
  border-color: #d5c4b6;
  color: #b06a3c;
}

.category-chip i {
  color: #b06a3c;
}

@media (max-width: 991.98px) {
  .hero-stats {
    grid-template-columns: 1fr;
  }

  .section-heading {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 767.98px) {
  .home-view {
    padding: 40px 0 56px;
  }

  .hero-section,
  .preview-section {
    margin-bottom: 56px;
  }

  .panel-grid {
    grid-template-columns: 1fr;
  }
}
</style>
