<template>
  <div class="container py-5">
    <div class="d-flex align-items-center gap-3 mb-4 flex-wrap">
      <button type="button" class="back-btn" @click="goBack">
        <i class="bi bi-arrow-left me-2"></i>
        Kembali
      </button>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb custom-breadcrumb mb-0">
          <li class="breadcrumb-item">
            <router-link to="/" class="breadcrumb-link">
              <i class="bi bi-house-door me-1"></i>
              Home
            </router-link>
          </li>

          <li class="breadcrumb-item">
            <router-link to="/foods" class="breadcrumb-link">
              Foods
            </router-link>
          </li>

          <li class="breadcrumb-item active" aria-current="page">
            {{ category }}
          </li>
        </ol>
      </nav>
    </div>

    <div class="page-intro mb-4">
      <p class="page-kicker">
        <i class="bi bi-tags me-2"></i>
        CATEGORY
      </p>
      <h1 class="page-title">{{ category }}</h1>
      <p class="page-subtitle">Browse meals from this category.</p>
    </div>

    <div class="row g-4">
      <div
        v-for="item in foods"
        :key="item.idMeal"
        class="col-sm-6 col-lg-4 col-xl-3"
      >
        <FoodCard
          :id="item.idMeal"
          :name="item.strMeal"
          :image="item.strMealThumb"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FoodCard from "../components/FoodCard.vue";
import { getFoodsByCategory } from "../services/mealApi";

export default {
  name: "FoodCategoryView",
  components: { FoodCard },
  data() {
    return {
      foods: [],
    };
  },
  computed: {
    category() {
      return this.$route.params.name;
    },
  },
  async mounted() {
    await this.loadFoods();
  },
  watch: {
    category() {
      this.loadFoods();
    },
  },
  methods: {
    async loadFoods() {
      try {
        this.foods = await getFoodsByCategory(this.category);
      } catch (error) {
        console.error("Failed to load foods by category:", error);
        this.foods = [];
      }
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.back();
      } else {
        this.$router.push("/foods");
      }
    },
  },
};
</script>

<style scoped>
.back-btn {
  border: 1px solid #dccfc2;
  background: #fffdf9;
  color: #2b2723;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: 0.2s ease;
}

.back-btn:hover {
  background: #f7eee4;
  border-color: #cdb9a8;
  color: #b06a3c;
}

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

.page-kicker {
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: #b06a3c;
  margin-bottom: 12px;
  display: inline-flex;
  align-items: center;
}

.page-title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.15;
  font-weight: 700;
  color: #201d1a;
  margin-bottom: 10px;
}

.page-subtitle {
  color: #68615b;
  line-height: 1.7;
  margin-bottom: 0;
}
</style>
