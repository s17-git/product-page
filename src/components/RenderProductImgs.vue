<template>
  <div>

    <img class="product-img__product" ref="prodSrc" :src="useLoadProduct(product.img.src)" alt="Product">
    <div class="product-thumbnails">
      <img v-for="(img, index) in product.img.thumbnails" :key="index" :src="useLoadProduct(img.src)" :alt="img.alt">
    </div>

    <div v-if="showThumbnailLightbox" class="navbtn-wrapper">
      <span class="product-img__previous" @click="prevImg">
        <img src="../assets/imgs/icon-previous.svg" alt="Previous icons">
      </span>
      <span class="product-img__next" @click="nextImg">
        <img src="../assets/imgs/icon-next.svg" alt="Next icons">
      </span>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { useLoadProduct } from '../composables/loadImage.js';

const props = defineProps({
  product: {
    type: Object,
    require: true,
  },
  showThumbnailLightbox: Boolean,
});

const prodSrc = ref(null);
const currentIndex = ref(0);
let src =  null;
const thumbnails = props.product.img.thumbnails;
let imgPath = null;

const indexExists = (index) => thumbnails[index];

const displayImgToDom = () => {
  src = thumbnails[currentIndex.value].src
  
  imgPath = useLoadProduct(src.split('-').slice(0, 3).join('-'));
  prodSrc.value.src = imgPath;
};

const nextImg = () => {
  currentIndex.value++;
  if( !indexExists(currentIndex.value) ) currentIndex.value = 0;
  displayImgToDom();
};

const prevImg = () => {
  currentIndex.value--;
  if( !indexExists(currentIndex.value)) currentIndex.value = thumbnails.length - 1;
  displayImgToDom();
};

</script>

<style lang="scss" scoped>
div {
  position: relative;
}

.product-img {
  height: inherit;

  .navbtn-wrapper {
    position: absolute;
    top: 35%;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__next,
  &__previous {
    
    display: flex;
    justify-content: center;
    align-items: center;
    width: pixelToRem(20);
    height: pixelToRem(20);
    cursor: pointer;
    background: map-get($colors, "white");
    border-radius: 50%;
    padding: pixelToRem(20);
  }

  &__product {
    width: 100%;
    object-fit: cover;
  }
    
  .product-thumbnails {
    display: none;
  }

  @include desktop {
    display: block;
    max-width: 50%;

    &__product {
      width: 100%;
      object-fit: cover;
      max-height: pixelToRem(400);
      border-radius: pixelToRem(15);
    }
    .product-thumbnails {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      img {
        max-width: 20%;
        max-height: pixelToRem(90);
        object-fit: cover;
        border-radius: pixelToRem(10);
        cursor: pointer;

        &:hover {
          @include thumbnail-active;
        }
      }

      img:first-of-type {
        @include thumbnail-active;
      }
    }
  }
  }
</style>