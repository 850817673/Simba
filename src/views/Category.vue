<template>
  <div id="category">
    <!-- 搜索框 -->
    <van-search v-model="searchData" input-align="center" placeholder="请输入商品关键词" />
    <!-- 侧边栏 -->
    <van-tree-select
      height="calc(100vh-104px)"
      @click-nav="changeRight"
      :items="items"
      :main-active-index.sync="activeIndex"
    >
      <template #content>
        <div class="imgBanner">
          <img width="100%" :src="bannerImg" />
        </div>
        <van-grid clickable :column-num="3">
          <van-grid-item
            :icon="item.wap_banner_url"
            v-for="(item,index) in subCategoryList"
            :key="index"
            :text="item.name"
            :to="'/categoryList/'+item.id"
          />
        </van-grid>
      </template>
    </van-tree-select>
    <tab-btn></tab-btn>
  </div>
</template>
<script>
import tabBtn from "../components/tabBtn";
import axios from "axios";
import api from "../assets/config/api";

export default {
  data() {
    return {
      searchData: "",
      data: {},
      activeIndex: 0,
      subCategoryList: [],
      bannerImg: []
    };
  },
  methods: {
    changeRight(index) {
      this.activeIndex = index;
    }
  },

  components: { tabBtn },
  async created() {
    let res = await axios.get(api.CatalogList);
    let data = res.data;
    this.data = data.data;
    this.subCategoryList = this.data.currentCategory.subCategoryList;
    this.bannerImg = this.data.currentCategory.img_url;
    console.log(this.subCategoryList);
  },
  computed: {
    items() {
      if (this.data.categoryList == undefined) {
        return [];
      } else {
        let arr = [];
        this.data.categoryList.forEach((item, index) => {
          item.text = item.name;
          arr.push(item);
        });
        return arr;
      }
    }
  },
  watch: {
    activeIndex: async function() {
      if (this.items.length !== 0) {
        let id = this.items[this.activeIndex].id;
        let res = await axios.get(api.CatalogCurrent, { params: { id } });
        this.subCategoryList = res.data.data.currentCategory.subCategoryList;
        this.bannerImg = this.items[this.activeIndex].img_url;
      } else {
        this.subCategoryList = [];
      }
    }
  }
};
</script>
<style lang="less">
#category {
  .imgBanner {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>