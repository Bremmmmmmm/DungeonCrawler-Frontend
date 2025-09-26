<template>
  <div class="room-view-box">
    <div v-if="showMp4" class="gif-overlay">
      <video
          :src="grassMp4"
          autoplay
          class="encounter-video"
          playsinline
          @ended="showMp4 = false"
      />
    </div>
    <div v-if="room?.enemy" class="enemy-container">
      <img :alt="room.enemy.name" :src="room.enemy.sprite" class="enemy-image"/>
      <div>{{ room.enemy.name }} (ID: {{ room.enemy.id }})</div>
    </div>

    <div v-else>
      <!-- Other content -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import grassMp4 from '~~/assets/Grass_Animation.mp4';

const props = defineProps<{ room: { row: number, col: number, value: string | null, enemy?: any } | null }>();
const showMp4 = ref(false);

const emit = defineEmits(['lock-maze']);

watch(() => props.room?.enemy, (enemy) => {
  if (enemy) {
    showMp4.value = true;
    emit('lock-maze');
  }
});
</script>

<style scoped>
.room-view-box {
  position: relative;
  width: 100%; /* or set a fixed width like 1920px */
  aspect-ratio: 16 / 9;
  border: 1px solid #ddd;
  background: #fafa;
  background-image: url('~~/assets/Background_Field.jpg');
  background-size: cover;
  background-position: center;
}

.gif-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.enemy-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.enemy-image {
  width: 25%;
  margin-top: 60px;
}

.encounter-video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
</style>
