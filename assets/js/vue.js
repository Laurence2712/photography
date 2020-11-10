// data
const products = [
  { id: 1, description: "Portrait enfant", price: 12, img: 'assets/img/IMG_6406.JPG'},
  { id: 2, description: 'Portrait d\'enfants', price: 20, img: 'assets/img/IMG_6424.JPG'},
  { id: 3, description: 'Portrait enfant', price: 15, img: 'assets/img/IMG_6425.JPG'},
  { id: 4, description: 'Portrait enfant', price: 15, img: 'assets/img/IMG_6426.JPG'},
  { id: 5, description: 'Portrait enfant', price: 15, img: 'assets/img/IMG_6428.JPG'},
  { id: 6, description: 'Padthaï', price: 25, img: 'assets/img/IMG_Padthaï.JPG'},
  { id: 7, description: 'Panés', price: 35, img: 'assets/img/IMG_panes.JPG'},
  { id: 8, description: 'Poulet', price: 10, img: 'assets/img/IMG_poulet.JPG'},
  { id: 9, description: 'Riz', price: 5, img: 'assets/img/IMG_riz.JPG'},
  { id: 10, description: 'Scampis', price: 15, img: 'assets/img/IMG_scampis.JPG'},
];

const Home = {
  template: '#home',
  name: 'Home',
  data: () => {
    return {
      products,
      searchKey: '',
      liked: [],
      cart: []
    }
  },
  computed: {
    filteredList(){
      return this.products.filter((product) => {
        return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
      })
    },
    getLikeCookie(){
      let cookieValue = JSON.parse($cookies.get('like'));
      cookieValue == null ? this.liked = [] : this.liked = cookieValue
    },
    cartTotalAmount(){
      let total = 0;
      for (let item in this.cart){
        total = total + (this.cart[item].quantity * this.cart[item].price)
      }
      return total;
    },
    itemTotalAmount(){
      let itemTotal = 0;
      for (let item in this.cart){
        itemTotal = itemTotal + (this.cart[item].quantity);
      }
      return itemTotal;
    }
  },
  methods: {
    setLikeCookie(){
      document.addEventListener('input', () => {
        setTimeout(() => {
          $cookies.set('like', JSON.stringify(this.liked));
        }, 300);
      })
    },
    addToCart(product){
      // check if already in array
      for (let i = 0; i < this.cart.length; i++){
        if (this.cart[i].id === product.id) {
          return this.cart[i].quantity++
        }
      }
      this.cart.push({
        id: product.id,
        img: product.img,
        description: product.description,
        price: product.price,
        quantity: 1
      })
    },
    cartPlusOne(product){
      product.quantity = product.quantity + 1;
    },
    cartMinusOne(product, id){
      if (product.quantity == 1) {
        this.cartRemoveItem(id);
      } else {
        product.quantity = product.quantity -1;
      }
    },
    cartRemoveItem(id){
      this.$delete(this.cart, id)
    }
  },
  mounted: () => {
    this.getLikeCookie;
  }
}
const UserSettings = {
  template: '<h1>Mon compte</h1>',
  name: 'UserSettings'
}
const WishList = {
  template: '<h1>Mes coups de coeur</h1>',
  name: 'WishList'
}
const ShoppingCart = {
  template: '<h1>Mon panier</h1>',
  name: 'ShoppingCart'
}

// router
const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/user-settings', component: UserSettings, name : 'UserSettings' },
    { path: '/wish-list', component: WishList, name: 'WishList' },
    { path: '/shopping-cart', component: ShoppingCart, name: 'ShoppingCart' },
  ]
})

const vue = new Vue({
  router
}).$mount('#app');
