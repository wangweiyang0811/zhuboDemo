<template>
  <div class="slider-box">
    <swiper :options="swiperOption">
    　　<swiper-slide v-for="items in bannerphoto" :key="items">
    　　　　<img :src="items" alt="">
    　　</swiper-slide>
    　　<div class="swiper-pagination" slot="pagination"></div> 
    </swiper>
  </div>
</template>

<script>
// 轮播图图片需要修改 bannerphoto数组里的图片路径
import Swiper from 'swiper'
export default {
  name: 'HelloWorld',
  props: {
    
  },
  data(){
    return{
      swiperOption: {
      　　pagination: '.swiper-pagination',
      　　paginationClickable: true,
      　　autoplay: {
            delay:3000,
            disableOnInteraction:false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable:true
          },
          loop:true
      },
      bannerphoto:[
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570985519515&di=fb1a752d73073db3dc6096f11d25b5a1&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140307%2F13928177_195158772185_2.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570985541498&di=4a7558e65cd60a0d81136e604bde7669&imgtype=0&src=http%3A%2F%2Fpic16.nipic.com%2F20111006%2F6239936_092702973000_2.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570985589858&di=f7e3ed0c81ef78454d9c997bc173bfa2&imgtype=0&src=http%3A%2F%2Fpic22.nipic.com%2F20120725%2F9676681_001949824394_2.jpg"
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.swiper-container{
  widows: 100%;
  height: 100%;
  img{
    width: 100%;
    height:100%
  }
}
.slider-box{
  width: 100vw;
  height: 55vw;
  box-shadow: 0 2px 5px 0 #888; 
}
</style>
