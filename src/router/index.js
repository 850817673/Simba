import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import categoryList from '../views/categoryList.vue'
import product from '../views/product.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'categoty',
    component: Category
  },
  {
    path: "/categoryList/:id",
    name: 'categoryList',
    component: categoryList,
    props: true
  },
  {
    path: '/product/:id',
    name: 'product',
    component: product,
    props: true
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router