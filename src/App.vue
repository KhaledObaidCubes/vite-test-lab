<template>
  <h1>TREE CONTROLLER</h1>
  <p><strong>YOU ARE ON:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink class="link" to="/">Tree Manager</RouterLink>

    <hr />
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<style lang="css" scoped>
.link {
  margin-left: 20px;
  color: aliceblue;
  text-decoration: none;
}
.link:hover {
  color: crimson;
}
</style>
