<template>
  <div class="test-transition">
    <div class="title">
      <svg-icon name="icon-touzi" @click="shuffleCard"></svg-icon>
      <el-input size="small" class="search-input" v-model="searchVal" placeholder="输入筛选"></el-input>
      <el-badge :value="shopCount" :hidden="shopCount === 0" class="shopcar fr">
        <svg-icon class="fr" ref="svgIcon" name="icon-ziyuan"></svg-icon>
      </el-badge> 
    </div>
    <transition-group class="card-list clearfix" name="scale" tag="ul">
      <li class="card-item" v-for="item in filterCardList" :key="item.id">
        <div class="img-wrap">
          <img width="100%" height="100%" :src="item.img" :alt="item.name" @click="delCard(item)">
        </div>
        <div class="opera">
          <div class="name">{{item.name}}</div>
          <div class="btn-group">
            <transition name="rolltoleft">
              <svg-icon class="btn" v-show="item.count > 0" name="icon-jianqu" @click="delShop(item)"></svg-icon>
            </transition>
            <div class="btn number">{{item.count}}</div>
            <svg-icon class="btn" name="icon-icon-jia5" @click="addShop(item)"></svg-icon>
            <transition
              @before-enter="onBeforeEnter" 
              @enter="onEnter"
              @after-enter="onAfterEnter"
            >
              <div class="ball" :data-id="item.id" v-if="item.isBallShow"><div class="inner"></div></div>
            </transition>
          </div>
        </div>
      </li>
      <li v-show="!searchVal" key="card-item-add" class="card-item card-item-add" @click="addCard">
        <i class="el-icon-plus"></i>
      </li>
    </transition-group>
  </div>
</template>

<script>
  import _shuffle from 'lodash/shuffle';
  import img_card from '@/assets/img/card.jpg';
  
  export default {
    data() {
      return {
        searchVal: '',
        isBallShow: false,
        cardList: [
          {id: 1, count: 0, img: img_card, name: '测试1', isBallShow: false},
          {id: 2, count: 0, img: img_card, name: '测试2', isBallShow: false},
          {id: 3, count: 0, img: img_card, name: '测试3', isBallShow: false},
          {id: 4, count: 0, img: img_card, name: '测试4', isBallShow: false},
          {id: 5, count: 0, img: img_card, name: '测试5', isBallShow: false},
          {id: 6, count: 0, img: img_card, name: '测试6', isBallShow: false},
          {id: 7, count: 0, img: img_card, name: '测试7', isBallShow: false},
          {id: 8, count: 0, img: img_card, name: '测试8', isBallShow: false},
        ],
        nextId: 9,
        shopCount: 0
      }
    },
    computed: {
      filterCardList() {
        return this.cardList.filter(item => {
          return !this.searchVal || item.name.indexOf(this.searchVal) > -1;
        });
      }
    },
    methods: {
      addShop(item) {
        item.isBallShow = true;
        item.count ++;
        this.shopCount ++;
      },
      delShop(item) {
        if (item.count > 0) {
          item.count --;
          this.shopCount --;
        }
      },
      addCard() {
        let spliceIndex = Math.floor(Math.random() * (this.cardList.length - 1));  
        this.cardList.splice(spliceIndex, 0, {id: this.nextId ++, count: 0, img: img_card, name: `测试${this.nextId}`, isBallShow: false});
      },
      delCard(item) {
        let index = this.cardList.findIndex(_item => _item.id === item.id);
        this.cardList.splice(index, 1);
        this.shopCount -= item.count;
      },
      shuffleCard() {
        this.cardList = _shuffle(this.cardList);
      },
      onBeforeEnter(el) {
        el.style.opacity = 1;
      },
      onEnter(el, done) {
        let shopRect = this.$refs.svgIcon.getBoundingClientRect();
        let ballRect = el.getBoundingClientRect();
        let inner = el.querySelector('.inner');
        el.style.transform = `translateX(${shopRect.left - ballRect.left + 18}px)`;
        inner.style.transform = `translateY(${shopRect.top - ballRect.top - 5}px)`;

        let handle = Symbol('handle');
        el[handle] = () => {
          done();
          el.removeEventListener('transitionend', el[handle]);
        }
        el.addEventListener('transitionend', el[handle]);
      },
      onAfterEnter(el) {
        el.style.opacity = 0;
        let id = Number(el.getAttribute('data-id'));
        let current = this.cardList.find(item => item.id === id);
        current.isBallShow = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
.test-transition {
  padding: 10px 0;
  .title {
    padding-right: 10px;
    margin-bottom: 20px;
    color: $color-warn;
    .svg-icon {
      width: 24px;
      height: 24px;
      user-select: none;
      cursor: pointer;
    }
  }
  .search-input {
    width: 280px;
    margin-left: 15px;
  }
  .card-list {
    list-style: none;
    margin: 0 0 0 -20px;
    padding: 0;
  }
  .card-item {
    display: inline-block;
    width: 150px;
    margin-left: 20px;
    user-select: none;
    &.card-item-add {
      text-align: center;
      font-size: 30px;
      line-height: 89px;
      color: $color-main;
      cursor: pointer;
      vertical-align: top;
    }
    .img-wrap {
      position: relative;
      width: 150px;
      height: 89px;
      border-radius: 4px;
      overflow: hidden;
      transition: all .4s ease-out;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
      }
    }
    .opera {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 35px;
      font-size: 14px;
      background-color: #fff;
    }
    .svg-icon {
      cursor: pointer;
    }
  }
  .btn-group {
    position: relative;
    .btn {
      position: relative;
      display: inline-block;
      vertical-align: middle;
    }
    .number {
      min-width: 24px;
      text-align: center;
      z-index: 2;
      overflow: hidden;
    }
    .ball {
      position: absolute;
      top: 4px;
      right: 3px;
      z-index: 2;
      transition: transform .7s ease-in-out;
      .inner {
        width: 12px;
        height: 12px;
        background-color: $color-red;
        border-radius: 6px;
        transition: transform .7s ease-in;
      }
    }
  }
}
</style>