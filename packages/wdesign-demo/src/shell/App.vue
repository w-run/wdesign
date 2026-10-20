<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
</script>

<template>
  <div class="demo-shell">
    <Sidebar />
    <main class="demo-main">
      <RouterView />
    </main>
  </div>
</template>
