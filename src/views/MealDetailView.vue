<template>
  <section class="meal-detail container py-5">
    <div v-if="loading" class="text-center py-5">Loading meal detail...</div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else-if="!meal" class="text-center py-5">Meal not found.</div>

    <div v-else class="row g-4">
      <div class="col-md-5">
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="img-fluid rounded shadow-sm w-100"
        />
      </div>

      <div class="col-md-7">
        <p class="mb-2">
          <button type="button" class="back-link" @click="goBack">
            ← Back to previous page
          </button>
        </p>

        <h1 class="mb-3">{{ meal.strMeal }}</h1>

        <div class="mb-3 d-flex flex-wrap gap-2">
          <span class="badge text-bg-dark">{{ meal.strCategory }}</span>
          <span class="badge text-bg-warning">{{ meal.strArea }}</span>
        </div>

        <div v-if="youtubeEmbedUrl" class="video-wrap mb-4">
          <iframe
            :src="youtubeEmbedUrl"
            title="YouTube video player"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            "
            allowfullscreen
          ></iframe>
        </div>

        <h4 class="mb-3">Ingredients</h4>
        <ul class="list-group mb-4">
          <li
            v-for="(item, index) in ingredients"
            :key="index"
            class="list-group-item d-flex justify-content-between"
          >
            <span>{{ item.ingredient }}</span>
            <span class="text-muted">{{ item.measure }}</span>
          </li>
        </ul>

        <h4 class="mb-3">Instructions</h4>
        <p class="instructions">{{ meal.strInstructions }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { getMealDetail } from "../services/mealApi";

export default {
  name: "MealDetailView",
  data() {
    return {
      meal: null,
      loading: false,
      error: "",
    };
  },
  computed: {
    ingredients() {
      if (!this.meal) return [];

      const items = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = this.meal[`strIngredient${i}`]?.trim();
        const measure = this.meal[`strMeasure${i}`]?.trim();

        if (ingredient) {
          items.push({
            ingredient,
            measure: measure || "",
          });
        }
      }

      return items;
    },
    youtubeEmbedUrl() {
      const url = this.meal?.strYoutube;
      if (!url) return "";

      try {
        const parsedUrl = new URL(url);
        const videoId = parsedUrl.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }

        if (parsedUrl.hostname.includes("youtu.be")) {
          return `https://www.youtube.com/embed/${parsedUrl.pathname.replace("/", "")}`;
        }

        return "";
      } catch {
        return "";
      }
    },
  },
  methods: {
    async fetchMealDetail() {
      try {
        this.loading = true;
        this.error = "";

        const id = this.$route.params.id;
        const data = await getMealDetail(id);

        this.meal = data;
      } catch (err) {
        this.error = "Failed to load meal detail.";
        this.meal = null;
      } finally {
        this.loading = false;
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
  mounted() {
    this.fetchMealDetail();
  },
  watch: {
    "$route.params.id"() {
      this.fetchMealDetail();
    },
  },
};
</script>

<style scoped>
.meal-detail {
  max-width: 1100px;
}
.instructions {
  white-space: pre-line;
  line-height: 1.8;
  color: #3e372f;
}

.video-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
}

.video-wrap iframe {
  width: 100%;
  height: 100%;
  display: block;
}

.back-link {
  background: transparent;
  border: none;
  padding: 0;
  font: inherit;
  color: #6c655f;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.back-link:hover {
  color: #b06a3c;
  transform: translateX(-2px);
}

.back-link:focus {
  outline: none;
  box-shadow: none;
}

.back-link:focus-visible {
  outline: 2px solid rgba(176, 106, 60, 0.25);
  outline-offset: 4px;
  border-radius: 6px;
}

.back-link:active {
  transform: translateX(0);
}
</style>
