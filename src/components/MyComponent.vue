<!-- MyComponent/MyComponent.vue -->
<template>
  <div class="my-component-test">My Componentttgg Test</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'my-component',
  setup () {
    console.log(`import.meta.env:`,import.meta.env);
    return {}
  }
})
</script>
<style scoped>
.my-component-test {
  color: red;
}
</style>
