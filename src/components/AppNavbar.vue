<template>
  <nav class="navbar navbar-expand-lg app-navbar">
    <div class="container">
      <router-link to="/" class="navbar-brand brand">
        <i class="bi bi-egg-fried me-2"></i>
        mealapp
      </router-link>

      <button
        class="navbar-toggler border-0 shadow-none px-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list fs-2"></i>
      </button>

      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav ms-auto align-items-lg-center mt-3 mt-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link nav-clean">
              <i class="bi bi-house-door me-2"></i>Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/foods" class="nav-link nav-clean">
              <i class="bi bi-grid me-2"></i>Foods
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ingredients" class="nav-link nav-clean">
              <i class="bi bi-basket2 me-2"></i>Ingredients
            </router-link>
          </li>
          <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
            <router-link to="/foods" class="btn btn-explore">
              <i class="bi bi-search me-2"></i>
              Explore
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
};
</script>

<style scoped>
.app-navbar {
  background: #fffdf9;
  border-bottom: 1px solid #eadfd3;
  padding: 16px 0;
}

.brand {
  font-size: 1.15rem;
  font-weight: 700;
  color: #2d2a26;
  text-decoration: none;
  letter-spacing: 0.2px;
}

.brand i {
  color: #c96a2b;
}

.nav-clean {
  position: relative;
  color: #5f5a54;
  font-weight: 500;
  padding: 8px 14px !important;
  transition: 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.nav-clean:hover {
  color: #2d2a26;
}

.nav-clean.router-link-exact-active,
.nav-clean.router-link-active {
  color: #2d2a26;
}

.nav-clean.router-link-exact-active::after,
.nav-clean.router-link-active::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 2px;
  height: 2px;
  background: #c96a2b;
}

.btn-explore {
  background: #c96a2b;
  color: white;
  border: 1px solid #c96a2b;
  border-radius: 8px;
  padding: 9px 16px;
  font-weight: 600;
}

.btn-explore:hover {
  background: #b85e22;
  border-color: #b85e22;
  color: white;
}

.navbar-toggler i {
  color: #2d2a26;
}
</style>
