<template>
  <div class="horse-list-container">
    <div class="horse-list-header">
      <h3>Horse List (1-20)</h3>
    </div>
    <table class="horse-list-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in horses" :key="horse.name">
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
          <td :style="{ color: horse.color }">{{ horse.color }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import '@/assets/styles/horse-list.css'

export default defineComponent({
  name: 'HorseList',
  components: {},
  setup() {
    const store = useStore()

    const horses = computed<Horse[]>(() => store.getters.allHorses)

    return { horses }
  },
})
</script>

<style scoped></style>
