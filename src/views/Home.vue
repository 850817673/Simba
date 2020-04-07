<template>
  <div id="home" class="home">
    <!-- 搜索框 -->
    <div>
      <van-search v-model="searchData" input-align="center" placeholder="请输入商品关键词" />
    </div>
    <!-- 轮播图 -->
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="bannerImg" v-lazy="image.image_url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- Grid 宫格 -->
    <div>
      <van-grid column-num="5">
        <van-grid-item
          v-for="(item1,index1) in channel"
          :key="index1"
          :icon="item1.icon_url"
          :text="item1.name"
        />
      </van-grid>
    </div>
    <!-- 品牌制造商直供 -->
    <div class="vanpanel">
      <van-panel class="panelTitle" title="品牌制造商直供"></van-panel>
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="(item2,index2) in brandList" :key="index2">
          <van-image lazy-load :src="item2.new_pic_url" />
          <h4 class="title">{{item2.name}}</h4>
          <p class="price">{{item2.floor_price}}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 周一新发 -->
    <div class="vanpanel">
      <van-panel class="panelTitle" title="周一周四-新品首发"></van-panel>
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="(item3,index3) in newGoodsList" :key="index3">
          <van-image lazy-load :src="item3.list_pic_url" />
          <h4 class="title1">{{item3.name}}</h4>
          <p class="price1">￥{{item3.retail_price}}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="hotList">
      <van-panel class="hotTitle" title="人气推荐"></van-panel>
      <van-card
        v-for="(item4,index4) in hotGoodsList"
        :key="index4"
        :price="item4.retail_price"
        :desc="item4.goods_brief"
        :title="item4.name"
        :thumb="item4.list_pic_url"
      />
      <div style="height:50px;"></div>
      <tab-btn></tab-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import api from "../assets/config/api";
import Vue from "vue";
import { Lazyload } from "vant";
import tabBtn from "../components/tabBtn";

Vue.use(Lazyload);

export default {
  data() {
    return {
      searchData: "",
      data: {}
    };
  },
  computed: {
    images() {
      //判断是否是一个对象
      if (typeof this.data.banner == "object") {
        return this.data.banner;
      } else {
        return [];
      }
    },
    channel() {
      if (typeof this.data.channel == "object") {
        return this.data.channel;
      } else {
        return [];
      }
    },
    brandList() {
      if (typeof this.data.brandList == "object") {
        return this.data.brandList;
      } else {
        return [];
      }
    },
    newGoodsList() {
      if (typeof this.data.newGoodsList == "object") {
        return this.data.newGoodsList;
      } else {
        return [];
      }
    },
    hotGoodsList() {
      if (typeof this.data.hotGoodsList == "object") {
        return this.data.hotGoodsList;
      } else {
        return [];
      }
    }
  },
  components: {
    tabBtn
  },
  async mounted() {
    // console.log(api);
    let res = await axios.get(api.IndexUrl); //请求数据
    // console.log(res.data.data);
    this.data = res.data.data;
  },
  methods: {}
};
</script>
<style lang="less">
#home {
  .van-grid-item {
    overflow: hidden;
  }
  .bannerImg {
    width: 100vw;
    height: 200px;
  }
  .vanpanel {
    .panelTitle {
      text-align: center;
    }
    .van-grid-item__content {
      padding: 0;
    }
    .van-image {
      border: 1px #ffffff solid;
    }
    .title {
      position: absolute;
      left: 5px;
      top: 10px;
      font-size: 13px;
    }
    .price {
      position: absolute;
      left: 10px;
      top: 30px;
      font-size: 11px;
      color: #999;
    }
    .title1 {
      width: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price1 {
      font-size: 12px;
      color: #999;
    }
  }
  .hotList {
    .hotTitle {
      text-align: center;
    }
    .van-card__title {
      font-weight: 900;
      font-size: 14px;
    }
    .van-card__desc {
      font-size: 11px;
    }
    .van-card__price {
      color: red;
    }
    .van-card__content {
      text-align: left;
      justify-content: center;
    }
  }
}
</style>
