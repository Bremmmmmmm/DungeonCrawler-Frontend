<template>
  <div class="room-view-box">
    <div v-if="room?.enemy">
      <img :src="room.enemy.sprite" :alt="room.enemy.name" class="enemy-image" />
      <div>{{ room.enemy.name }} (ID: {{ room.enemy.id }})</div>
    </div>
    <div v-else>
      <!-- Other content -->
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ room: { row: number, col: number, value: string | null, enemy?: any } | null }>();
</script>

<style scoped>
.room-view-box {
  width: 300px;
  height: 300px;
  border: 1px solid #ddd;
  background: #fafafa;
}
.enemy-image {
  width: 100%;
  height: 100%;
}

</style>
