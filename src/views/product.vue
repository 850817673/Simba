<template>
  <div id="product">
    <!-- 顶部 -->
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img width="100%" v-lazy="image.img_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图下面 -->
    <div class="info">
      <span>30天无理由退货</span>
      <span>48小时急速退款</span>
      <span>满88元发货</span>
    </div>
    <!-- 商品描述+价格 -->
    <div class="infobrief">
      <h3 class="infoname">{{info.name}}</h3>
      <p class="brief">{{info.goods_brief}}</p>
      <h4 class="price">￥{{info.retail_price}}</h4>
    </div>
    <van-cell title="请选择规格数量" is-link />
    <!-- 商品参数 -->
    <div class="proParams">
      <h3>商品参数</h3>
      <div class="proItem" v-for="(item1,index1) in attribute" :key="index1">
        <span class="title">{{item1.name}}</span>
        <span class="value">{{item1.value}}</span>
      </div>
    </div>
    <div class="proDetail" v-html="info.goods_desc"></div>
    <!-- 底部加购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star-o" text="已收藏" />
      <van-goods-action-button @click="chooseShow" type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import api from "../assets/config/api";
import axios from "axios";

let sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [
    {
      k: "颜色", // skuKeyName：规格类目名称
      v: [
        {
          id: "30349", // skuValueId：规格值 id
          name: "红色" // skuValueName：规格值名称
        },
        {
          id: "1215",
          name: "蓝色"
        }
      ],
      k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
    }
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "1", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "3", // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 110 // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "2", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "4", // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 130 // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "1", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "5", // 规格类目 k_s 为 s2 的对应规格值 id
      stock_num: 120 // 当前 sku 组合对应的库存
    }
  ],
  price: "1.00", // 默认价格（单位元）
  stock_num: 227 // 商品总库存
};

export default {
  props: ["id"],
  data() {
    return {
      data: [],
      info: [],
      attribute: [],
      sku: sku,
      show: false,
      goods: {
        //  商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: ""
      }
    };
  },
  computed: {
    images() {
      if (this.data.gallery == undefined) {
        return [];
      } else {
        return this.data.gallery;
      }
    }
  },
  async created() {
    let res = await axios.get(api.GoodsDetail, {
      params: { id: this.id }
    });
    this.data = res.data.data;
    this.info = this.data.info;
    this.attribute = this.data.attribute;
    this.goods.picture = this.info.primary_pic_url;
    this.goods.title = this.info.name;
    this.sku.price = this.info.retail_price;
    this.sku.stock_num = this.info.goods_number;
    let tree = [];
    this.data.specificationList.forEach((item, index) => {
      let arr = [];
      item.valueList.forEach((product, i) => {
        arr.push({
          id: product.id,
          name: product.value
        });
      });
      tree.push({
        k: item.name,
        v: arr,
        k_s: "s-" + item.specification_id
      });
    });
    this.sku.tree = tree;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onAddCartClicked(skuData) {
      this.show = false;
      let chooseContent =
        skuData.selectedSkuComb["s-1"] + "_" + skuData.selectedSkuComb["s-2"];
      let resultPro = this.data.productList.filter((item, index) => {
        if (item.goods_specification_ids == chooseContent) {
          return true;
        } else {
          return false;
        }
      });
      console.log(resultPro);
      console.log(this.data.productList);
    },
    onBuyClicked() {},
    chooseShow() {
      this.show = true;
    }
  }
};
</script>
<style lang="less">
#product {
  .info {
    font-size: 12px;
    color: rgb(110, 110, 110);
    background: #999;
    height: 24px;
    line-height: 24px;
    display: flex;
    justify-content: space-around;
    span {
      position: relative;
    }
    span::before {
      position: absolute;
      content: "";
      display: block;
      left: -10px;
      top: 9px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      border: 1px solid red;
    }
  }
  .infobrief {
    text-align: center;
    .infoname {
      padding: 10px 0 10px;
      color: rgb(1, 29, 41);
      font-weight: 900;
    }
    .brief {
      padding: 0 0 5px;
    }
    .price {
      font-size: 20px;
      font-weight: 900;
      color: red;
    }
  }
  .proParams {
    margin-bottom: 10px;
    h3 {
      text-align: center;
      padding: 10px;
    }
    .proItem {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      height: 24px;
      color: #999;
      font-size: 15px;
      background-color: #efefef;
      line-height: 24px;
      .title {
        width: 45px;
        padding: 0 10px;
        border-right: 1px solid #ccc;
      }
      .value {
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .proDetail {
    p {
      display: flex;
    }
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>