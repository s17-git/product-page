<template>
  <div class="basket">
    <p class="basket__header"> Card</p>
    <div class="basket__content">
      <p v-if="!cart.length" class="empty-basket">
        Your cart is empty
      </p>

      <template v-else>
        <div class="products"  v-for="c in cart" :key="c.id">
          <img :src="useLoadProduct(c.img)" alt="Product Img">
          <div>
          <p>{{ c.title }}</p>
          <p>
              ${{ c.price }} x {{ productQte }} <strong> ${{ c.total }} </strong>
          </p>
          </div>
          <img :src="useLoadSvg('icon-delete')" @click="$emit('delete-product', c.id)" alt="Delete Icon">
        </div>
        <Button>
          <template #icon>Checkout</template>
        </Button>
      </template>
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue';
import { useLoadProduct, useLoadSvg } from '../composables/loadImage';

const props = defineProps({
  cart: Object,
  productQte: Number,
});


</script>

<style lang="scss" scoped>

  /* || Basket */
  .basket {
    position: absolute;
    width: pixelToRem(300);
    top:  pixelToRem(60);
    left: 50%;
    transform: translate(-50%, 0);
    background: map-get($colors, 'white');
    font-weight: map-get($sizes, 'bold');
    box-shadow: 0 0 pixelToRem(0.9) map-get($sizes, 'grayish blue');
    z-index: 5;
    box-shadow: 0 pixelToRem(8) pixelToRem(20) map-get($colors, 'grayish blue');
    border-radius: pixelToRem(7);

    .empty-basket {
      text-align: center;
      padding: pixelToRem(50);
    }

    &__header {
      padding: 1rem;
      font-weight: map-get($sizes, 'bold');
      border-bottom: pixelToRem(1) solid map-get($colors, 'grayish blue');
    }

    &__content {
      padding: pixelToRem(5) pixelToRem(10);
    }
    .products {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: map-get($colors, 'grayish blue');
      padding-bottom: pixelToRem(5);
      font-size: small;
      font-weight: normal;

      p {
        text-transform: capitalize;

      }

      strong {
        font-weight: map-get($sizes, 'bold');
        color: map-get($colors, 'very dark blue');
      }


      img:first-of-type {
        width: pixelToRem(40);
        height: pixelToRem(40);
        border-radius: pixelToRem(5);
      }

      img {
        width: pixelToRem(15);
        height: pixelToRem(20);
        cursor: pointer;
      }
    }

    @include desktop {
    transform: translate(100%, 5%);

    }
  }
</style>