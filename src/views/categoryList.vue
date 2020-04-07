<template>
  <div id="categoryList">
    <van-tabs v-model="tabActive">
      <van-tab class="tabtitle" v-for="(item,index) in clist" :key="index" :title="item.name">
        <h3>{{item.name}}</h3>
        <p>{{item.front_name}}</p>
        <div v-if="item.plist">
          <van-grid :border="true" :column-num="2">
            <van-grid-item
              v-for="(item1,index1) in item.plist.data"
              :key="index1"
              :to="'/product/'+item1.id"
            >
              <van-image width="100" height="100" :src="item1.list_pic_url" />
              <h4 class="van-ellipsis">{{item1.name}}</h4>
              <p class="price">￥{{item1.retail_price}}</p>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from "axios";
import api from "../assets/config/api";

export default {
  props: ["id"],
  data() {
    return {
      tabActive: 0,
      clist: []
    };
  },
  async created() {
    let res = await axios.get(api.GoodsCategory, { params: { id: this.id } });
    this.clist = res.data.data.brotherCategory;
    let id = this.clist[0].id;
    this.clist.forEach(async (item, index) => {
      item.plist = await this.getlist(item.id, 1);
      console.log(item.plist);
      this.$forceUpdate(); //强制更新一下页面，然后再调用 v-if
    });
  },
  methods: {
    async getlist(cid, page) {
      let res = await axios.get(api.GoodsList, {
        params: { categoryId: cid, page, size: 20 }
      });
      return res.data.data;
    }
  }
};
</script>



<style lang="less">
#categoryList {
  .tabtitle {
    text-align: center;
    h3 {
      font-weight: 900;
    }
  }
  .van-ellipsis {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
  }
  .van-grid-item {
    overflow: hidden;
  }
  .price {
    color: red;
  }
}
</style>