<template>
  <header>
    <nav>
      <img @click="showMenu = true, displayOverlay = true"  class="mobile-menu" src="./assets/imgs/icon-menu.svg" alt="Mobile menu button" />
      <h1> {{ app.brand }} </h1>
      <ul v-if="showMenu" class="navbar" @click="useActiveMenu($event, 'active')">
        <li><img @click="showMenu = false, displayOverlay = false"  src="./assets/imgs/icon-close.svg" alt="Close icon"></li>
        <li v-for=" (menu, index) in app.menus" :key="index"> {{ menu }} </li>
      </ul>
    </nav>  

    <div class="right-part">
      <button :data-cart-length="cart.length" class="cart" @click="openBasket = !openBasket">
        <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#69707D" fill-rule="nonzero"/></svg>
      </button>
      <img class="avatar" :src="useLoadAvatar('image-avatar')" alt="user avatar" />
    </div>
    <Basket v-if="openBasket" :cart="cart" :product-qte="productQte" @delete-product="onDeleteProduct"/>

  </header>

  
  <div v-show="displayOverlay" ref="overlay" class="overlay"></div>

  <!-- thumbnail lightbox -->
  <div v-if="showThumbnailLightbox" class="lightbox">
    <div class="close-wrapper">
      <svg @click="showThumbnailLightbox = false, displayOverlay = false" width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/></svg>
    </div>
    <section class="product-img">
      <RenderProductImgs :show-thumbnail-lightbox="showThumbnailLightbox" :product="product" />
    </section>
   
  </div>

  <main>
    <section class="product-img">
      <RenderProductImgs  :product="product" />
    </section>

    <aside class="product-details">
      <p class="product-details__slug"> {{ app.slug }} </p>
      <h2>{{ product.title }}</h2>
      <p class="product-details__desc">{{product.desc}}</p>


      <div class="product-details__prices">
        <div class="new-prices">
          <p>${{product.price}}</p>
          <span class="discount">{{ product.discount }}%</span>
        </div>

        <p class="old-price">${{ product.oldPrice }}</p>
      </div>

      <div class="counter-wrapper">
        <div class="quantities-counter">
          <img src="./assets/imgs/icon-minus.svg" alt="Minus" @click="productQte--">
          <span class="counter-value">{{ productQte }}</span>
          <img src="./assets/imgs/icon-plus.svg" alt="Plus" @click="productQte++">
        </div>
  
        <Button @add-to-cart="onAddToCart">
          Add to cart
        </Button>
      </div>

      
    </aside>
  </main>
</template>
<script setup>
import {ref, onMounted} from 'vue';
import Basket from './components/Basket.vue';
import Button from './components/Button.vue';
import RenderProductImgs from './components/RenderProductImgs.vue';

import {useLoadAvatar } from './composables/loadImage.js';
import {useResizeHandler} from './composables/menuResizeHandler.js';
import {useActiveMenu} from './composables/activeMenu.js';
import {useEventHandler} from './composables/eventHandler.js';

  const showMenu = ref(false);
  const openBasket = ref(false);
  const productQte = ref(0);
  const overlay = ref(null);
  const cart = ref([]);
  const showThumbnailLightbox = ref(false);
  const displayOverlay = ref(false);

  const desktopBreakPoint = 768;

  useResizeHandler({showMenu, displayOverlay, desktopBreakPoint, showThumbnailLightbox});

  const app = {
    slug: "sneaker company",
    brand: "sneakers",
    menus: ["Collection", "Men", "Women", "About", "Contact"],
  };
  
  const product = {
    id: 1,
    price: "125.00",
    oldPrice: "225.00",
    discount: "50",
    title: "fall limited edition sneakers",
    desc: `
      These low-profile sneakers are your perfect casual wear campanion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.
    `,
    img: {
      src: "image-product-1",
      thumbnails: [
        {src: "image-product-1-thumbnail", alt: "Product thumbnail"},
        {src: "image-product-2-thumbnail", alt: "Product thumbnail"},
        {src: "image-product-3-thumbnail", alt: "Product thumbnail"},
        {src: "image-product-4-thumbnail", alt: "Product thumbnail"},
      ]
    }    
  };
 

  const onAddToCart = () => {

    if(!productQte.value) return;

    //Code to verify if the product already exist in the cart.
    const updateCartProd = (prod) => {
      prod.quantity = productQte.value; 
      prod.total = productQte.value * parseFloat(product.price)
    }

    if(cart.value.find( prod => prod.id == product.id ) ) {
      updateCartProd(cart.value.find( prod => prod.id == product.id ));
      return;
    }

    //End verification
 

    cart.value.push({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.img.src,
      quantity: productQte.value,
      total: productQte.value * parseFloat(product.price),
    });

  };

  const onDeleteProduct = (id) => {
    cart.value = cart.value.filter(product => product.id != id);
  };

  onMounted(() => {
      const el = document.querySelector('.product-thumbnails');
      useEventHandler(el, 'click', (e) => {
        displayOverlay.value = true;
        showThumbnailLightbox.value = true;
        overlay.value.style.zIndex = 5;
      });
    }
  );
  

 
</script>
<style lang="scss" scoped>
@import './assets/utils/classes';
@import './assets/pages/app.scss';
@import './assets/layouts/lightbox.scss';
</style>
