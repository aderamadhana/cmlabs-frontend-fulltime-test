<template>
  <article class="ingredient-card h-100">
    <div class="ingredient-media">
      <img :src="image" :alt="name" class="ingredient-image" />
    </div>

    <div class="ingredient-body">
      <p class="ingredient-label">
        <i class="bi bi-basket2 me-2"></i>
        Ingredient
      </p>

      <h3 class="ingredient-title">{{ name }}</h3>

      <p v-if="shortDescription" class="ingredient-desc">
        {{ shortDescription }}
      </p>

      <div class="ingredient-footer">
        <router-link :to="`/ingredients/${name}`" class="ingredient-link">
          Explore ingredient
          <i class="bi bi-arrow-up-right ms-2"></i>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "IngredientCard",
  props: {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  computed: {
    shortDescription() {
      if (!this.description) return "";

      const cleanText = this.description.replace(/\s+/g, " ").trim();
      if (cleanText.length <= 90) return cleanText;

      return `${cleanText.slice(0, 90)}...`;
    },
  },
};
</script>

<style scoped>
.ingredient-card {
  background: #fffdf9;
  border: 1px solid #eadfd3;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(35, 25, 18, 0.03);
  transition: 0.22s ease;
}

.ingredient-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 34px rgba(35, 25, 18, 0.06);
}

.ingredient-card:hover .ingredient-image {
  transform: scale(1.04);
}

.ingredient-media {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f5ede4;
}

.ingredient-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 18px;
  transition: 0.3s ease;
}

.ingredient-body {
  padding: 16px;
}

.ingredient-label {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: #b06a3c;
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
}

.ingredient-title {
  font-size: 1.05rem;
  line-height: 1.5;
  font-weight: 600;
  color: #201d1a;
  margin-bottom: 10px;
}

.ingredient-desc {
  color: #6c655f;
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 16px;
  min-height: 48px;
}

.ingredient-footer {
  padding-top: 14px;
  border-top: 1px solid #f0e6dc;
}

.ingredient-link {
  color: #4f4740;
  font-size: 0.92rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.ingredient-link i {
  color: #b06a3c;
}

.ingredient-link:hover {
  text-decoration: underline;
}
</style>
