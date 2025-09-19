<template>
  <button
      :class="[
      'square',
      { active, center },
      { 'enemy-room': active && value === 'enemy' },
      { 'item-room': active && value === 'item' }
    ]"
      :disabled="!enabled"
      @click="$emit('toggle')"
  ></button>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
  center: boolean;
  value: string | null;
  enabled: boolean;
}>();
defineEmits(['toggle']);
</script>

<style scoped>
/* MazeSquare.vue */
.square {
  position: relative;
  width: 40px;
  height: 40px;
  background: #ccc;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 1;
}
.square.active {
  background: #888;
}
.square.center {
  background: #aaffaa !important;
  cursor: not-allowed;
}
.square.enemy-room {
  background: #e53935 !important;
}
.square.item-room {
  background: #2196f3 !important;
}
</style>
