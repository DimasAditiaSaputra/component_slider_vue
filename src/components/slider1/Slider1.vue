<script setup>
import { ref, onMounted } from "vue";

// Using placeholder images since your paths may not be accessible
const images = ref([
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/800/400?random=2",
  "https://picsum.photos/800/400?random=3",
]);

const slidesContainer = ref(null);
const currentIndex = ref(0);

const updateSlide = () => {
  if (slidesContainer.value) {
    slidesContainer.value.style.transform = `translateX(-${
      currentIndex.value * 100
    }%)`;
  }
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
  updateSlide();
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
  updateSlide();
};

// Auto-advance slides every 5 seconds
let slideInterval;
const startSlideInterval = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopSlideInterval = () => {
  clearInterval(slideInterval);
};

onMounted(() => {
  updateSlide();
  startSlideInterval();
});
</script>

<template>
  <div class="body">
    <div class="slider">
      <div
        class="slides-container"
        ref="slidesContainer"
        @mouseenter="stopSlideInterval"
        @mouseleave="startSlideInterval"
      >
        <div v-for="(src, index) in images" :key="index" class="slide">
          <img :src="src" alt="Landscape image" />
        </div>
      </div>

      <div class="buttons">
        <button @click="prevSlide">&#10094;</button>
        <button @click="nextSlide">&#10095;</button>
      </div>

      <div class="indicators">
        <span
          v-for="(_, index) in images"
          :key="index"
          :class="['indicator', { active: currentIndex === index }]"
          @click="
            currentIndex = index;
            updateSlide();
          "
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #222;
}

.slider {
  position: relative;
  width: 500px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.slides-container {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.slide {
  min-width: 100%;
}

img {
  width: 100%;
  display: block;
}

/* Keeping the original button styling */
.buttons {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

button {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background: rgba(0, 0, 0, 0.8);
}

/* Added indicators */
.indicators {
  position: absolute;
  bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.indicator.active {
  background: white;
}
</style>
