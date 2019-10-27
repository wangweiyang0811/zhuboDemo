<template>
    <div class="hot">
        <div class="hot-item">
            <div class="hot-title m-title">热门推荐</div>
            <img :src="hot" alt="">
        </div>
        <div class="hot-item">
            <div class="hot-title m-title">热门文章</div>
            <ul>
                <li v-for="item in Articles" :key='item.index'>{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            hot:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570985589858&di=f7e3ed0c81ef78454d9c997bc173bfa2&imgtype=0&src=http%3A%2F%2Fpic22.nipic.com%2F20120725%2F9676681_001949824394_2.jpg",
            Articles:['暂无文章']
        }
    }
}
</script>
<style lang="scss" scoped>
.hot{
  height: 400px;
  img{
    width: 100%;
    height: 160px;
  }
  .hot-item{
      height: 200px;
      background: #fff;
    ul{
        background: #fff;
        padding:5px 10px; 
        font-size: 13px;
        li{
            border: 1px solid #eee;
            border-left:0; 
            border-right:0; 
            text-indent: 10px;
            height: 30px;
            line-height: 30px;
        }
    }
  }
}
</style>