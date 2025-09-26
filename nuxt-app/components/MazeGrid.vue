<template>
  <div class="grid">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
      <div v-for="(cell, colIndex) in row" :key="colIndex" class="square-wrapper">
        <MazeSquare
            :active="cell"
            :center="isCenter(rowIndex, colIndex)"
            :enabled="isEnabled(rowIndex, colIndex)"
            :value="roomValues[rowIndex]?.[colIndex]"
            @toggle="handleToggle(rowIndex, colIndex)"
        />
        <div
            v-if="colIndex < size - 1"
            :class="['connector horizontal', { 'open-connector': hConnections[rowIndex]?.[colIndex] }]"
        ></div>
        <div
            v-if="rowIndex < size - 1"
            :class="['connector vertical', { 'open-connector': vConnections[rowIndex]?.[colIndex] }]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MazeSquare from './MazeSquare.vue';
import {useMaze} from '../composables/useMaze';

const props = defineProps<{ locked?: boolean }>();

const emit = defineEmits(['select-room']);
const {grid, hConnections, vConnections, roomValues, isCenter, isEnabled, toggle, size} = useMaze(7);

async function handleToggle(row: number, col: number) {
  if (props.locked) return;
  const enemy = await toggle(row, col);
  emit('select-room', {
    row,
    col,
    value: roomValues.value[row]?.[col],
    enemy
  });
}
</script>

<style scoped>
/* MazeGrid.vue or global */
.grid {
  display: grid;
  grid-template-rows: repeat(7, 40px);
  gap: 8px;
  width: max-content;
  margin: 25vh auto;
}

.row {
  display: grid;
  grid-template-columns: repeat(7, 40px);
  gap: 8px;
}

.square-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
}

.connector {
  position: absolute;
  background: #eee;
  z-index: 0;
  transition: background 0.2s;
}

.horizontal {
  top: 50%;
  right: -8px;
  width: 8px;
  height: 6px;
  transform: translateY(-50%);
}

.vertical {
  left: 50%;
  bottom: -8px;
  width: 6px;
  height: 8px;
  transform: translateX(-50%);
}

.open-connector {
  background: #4caf50;
}
</style>