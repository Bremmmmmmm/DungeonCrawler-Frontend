<template>
  <div class="main-layout">
    <div class="left-box">
      <MazeGrid :locked="mazeLocked" @select-room="selectedRoom = $event"/>
    </div>
    <div class="right-box">
      <RoomViewBox :room="selectedRoom" @lock-maze="handleLockMaze"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MazeGrid from '~~/components/MazeGrid.vue';
import RoomViewBox from "~~/components/RoomViewBox.vue";

const selectedRoom = ref<{ row: number, col: number, value: string | null, enemy?: any } | null>(null);
const mazeLocked = ref(false);

function handleLockMaze() {
  mazeLocked.value = true;
  setTimeout(() => mazeLocked.value = false, 2000);
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

.left-box {

}

.right-box {

}
</style>
