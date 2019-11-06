<template>
    <div class="list">
        <div class="title m-title">{{content}}</div>
        <div class="list-wrap" >
            <div class="list-box" :style="{width:rank.length*33+'vw'}">
                <div class="list-li"  v-for="item in rank" :key="item.index">
                    <img :src="item.avatar" alt="">
                    <div>{{item.nickname}}</div>
                    <div>{{item.room_id}}</div>
                    <div v-show='!sr'>平均热度:{{Math.ceil(item.avg_online)}}</div>
                    <div v-show='sr'>平均收入:{{Math.ceil(item.income/7)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        rank:{
            type:Array,
            default:[]
        },
    content:{
            type:String,
            default:''
        },
        sr:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{

        }
    },
    created(){
        
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
.list{
    width: 100vw;
    .list-wrap{
        min-height: 35vw;
        background: #fff;
        overflow-x: auto;
        overflow-y: hidden;
    }
    .list-box{
        min-height: 35vw;
        background: #fff;
        .list-li{
            padding-top:15px;
            padding-bottom: 5px;
            width: 33vw;
            min-height: 100%;
            text-align: center;
            float: left;
            font-size: 12px;
            white-space: nowrap;
            img{
                display: block;
                width: 18vw;
                height: 18vw;
                border-radius: 50%;
                margin:0 auto;
                margin-bottom: 7px;
            }
        }
    }
}

</style>