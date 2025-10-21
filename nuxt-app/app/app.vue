<template>
  <div class="main-layout">
    <div class="left-box">
      <MazeGrid :locked="mazeLocked" :maze="maze" @select-room="selectedRoom = $event" @all-visited="showModal = true"/>
    </div>
    <div class="right-box">
      <RoomViewBox :room="selectedRoom" @lock-maze="handleLockMaze"/>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Congratulations!</h2>
        <p>You have visited all 48 spaces.</p>
        <button @click="handleNewDungeon">Load New Dungeon</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MazeGrid from '~~/components/MazeGrid.vue';
import RoomViewBox from "~~/components/RoomViewBox.vue";
import { useMaze } from '~~/composables/useMaze';


const selectedRoom = ref(null);
const mazeLocked = ref(false);
const showModal = ref(false);

const maze = useMaze(7);

function handleLockMaze() {
  mazeLocked.value = true;
  setTimeout(() => mazeLocked.value = false, 2000);
}

async function handleNewDungeon() {
  showModal.value = false;
  maze.visited.value.clear();
  await maze.fetchMaze();
  selectedRoom.value = null;
}
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 95vh;
  width: 95vw;
}

.left-box, .right-box {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: #fff;
  padding: 2.5em 2em 2em 2em;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  text-align: center;
  min-width: 320px;
  animation: popIn 0.3s;
}

@keyframes popIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-content h2 {
  margin-bottom: 0.5em;
  color: #4caf50;
  font-size: 2em;
  font-weight: bold;
}

.modal-content p {
  margin-bottom: 1.5em;
  color: #333;
  font-size: 1.1em;
}

.modal-content button {
  background: linear-gradient(90deg, #4caf50 60%, #2196f3 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7em 2em;
  font-size: 1em;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(76,175,80,0.15);
  transition: background 0.2s, transform 0.1s;
}

.modal-content button:hover {
  background: linear-gradient(90deg, #43a047 60%, #1976d2 100%);
  transform: scale(1.05);
}
</style>
