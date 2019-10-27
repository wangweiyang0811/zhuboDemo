<template>
    <div class="title">
        <div class="back" v-show="backshow" @click="backh"><</div>
        <div class="msg">{{title}}</div>
    </div>
</template>
<script>
export default {
    props:['back','msg'],
    data(){
        return{
            backshow:this.back,
            title:this.msg
        }
    },
    methods:{
        backh(){
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
.title{
    width: 100vw;
    position: fixed;
    height: 50px;
    top: 0px;
    left: 0px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    background-image: linear-gradient(to right,#30c1ff,#fad3ff);
    letter-spacing: 2px;
    line-height: 50px;
    box-shadow: 0 2px 5px 0 #fff;
    z-index: 999;;
    .back{
        height: 50px;
        color:#fff;
        font-size:25px;
        width: 50px;
        text-align: center;
        position: absolute;
        left: 10px; 
    }
    .msg{
        width: 100%;
        height: 50px;
        color: #fff;
        font-size:25px; 
    }
}


</style>