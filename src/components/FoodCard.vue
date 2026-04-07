<template>
  <article class="food-card h-100">
    <div class="food-media">
      <img :src="image" :alt="name" class="food-image" />
    </div>

    <div class="food-body">
      <p class="food-label">
        <i class="bi bi-egg-fried me-2"></i>
        Meal
      </p>

      <h3 class="food-title">{{ name }}</h3>

      <div class="food-footer">
        <router-link :to="`/foods/detail/${id}`" class="food-link">
          View meal
          <i class="bi bi-arrow-up-right ms-2"></i>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "FoodCard",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.food-card {
  background: #fffdf9;
  border: 1px solid #eadfd3;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(35, 25, 18, 0.03);
  transition: 0.22s ease;
}

.food-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 34px rgba(35, 25, 18, 0.06);
}

.food-card:hover .food-image {
  transform: scale(1.04);
}

.food-media {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f5ede4;
}

.food-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s ease;
}

.food-body {
  padding: 16px;
}

.food-label {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: #b06a3c;
  margin-bottom: 10px;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
}

.food-title {
  font-size: 1.05rem;
  line-height: 1.5;
  font-weight: 600;
  color: #201d1a;
  margin-bottom: 16px;
  min-height: 50px;
}

.food-footer {
  padding-top: 14px;
  border-top: 1px solid #f0e6dc;
}

.food-link {
  color: #4f4740;
  font-size: 0.92rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.food-link i {
  color: #b06a3c;
}

.food-link:hover {
  text-decoration: underline;
}
</style>
