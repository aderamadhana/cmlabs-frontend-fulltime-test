<template>
    <section class="container py-5">
        <h1 class="mb-4">Ingredient: {{ name }}</h1>

        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>

        <div
            v-else
            class="row g-4"
        >
            <div
                v-for="meal in meals"
                :key="meal.idMeal"
                class="col-12 col-sm-6 col-lg-4 col-xl-3"
            >
                <FoodCard
                    :id="meal.idMeal"
                    :name="meal.strMeal"
                    :image="meal.strMealThumb"
                />
            </div>
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
            meals: [],
            loading: false,
            error: "",
        };
    },
    computed: {
        name() {
            return this.$route.params.name;
        },
    },
    methods: {
        async fetchMeals() {
            this.loading = true;
            this.error = "";

            try {
                // ⚠️ API filter pakai category, bukan ingredient
                this.meals = await getFoodsByIngredients(this.name);
            } catch (err) {
                this.error = "Failed to load meals";
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchMeals();
    },
};
</script>