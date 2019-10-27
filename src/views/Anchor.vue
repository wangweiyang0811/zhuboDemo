<template>
    <div class="zbPage">
        <!-- <Title back='true' msg='主播信息'></Title> -->
        <div class="zhInfo">
            <div class="headPortrait">
                <img :src="room.avatar" alt="">
                <div class="zbid">{{room.room_id}}</div>
            </div>
            <div class="info">
                <div class="zbGrade">等级：{{room.level}}</div>
                <div class="roomClub">工会：{{room.club}}</div>
                <div class="zba">名称：{{room.nickname}}</div>
                <div class="roomName">房名：{{room.room_name}}</div>
            </div>
        </div>
         <div class="data">
            <div class="gift_price item">
                <span>热度</span><div>{{room.hot}}</div>
            </div>
            <div class="active_days item">
                <span>粉丝数</span><div>{{room.fans}}</div>
            </div>
            <div class="danmu_count item">
                <span>关注量</span><div>{{room.subscribers}}</div>
            </div>
        </div>
        <div class="zbhm">
            <div class="m-title">直播画面</div>
            <div class="jt">
                <img :src="room.room_src" alt="">
            </div>
        </div>
        
    </div>
</template>
<script>
import Title from "@/components/Title.vue"
export default {
    data(){
        return {
            room:{}
        }
    },
    created() {
        this.getRouterData()
    },components:{
        Title
    },
    methods:{
        getRouterData(){
            this.room=this.$route.params;
        }
    }
}
</script>
<style lang="scss" scoped>
.zbPage{
    min-height: 100vh;
    background: #f2f2f2;
}
.zhInfo{
    height: 123px;
    padding: 0px 5px;
    padding-top: 10px;
    background: url('../../public/images/zbHerderBg.jpg');
    background-size: 100% 100%;
    .headPortrait{
        float: left;
        width: 100px;
        height: 100%;
        overflow: hidden;
        img{
            border-radius: 50%;
            width: 80px;
            height: 80px; 
            display:block;
            margin:0 auto;
        }
        .zbid{
            line-height: 30px;
            text-align: center;
            font-size: 14px;
        }
    };
    .info{
        margin-left:100px; 
        height: 100px;
        padding-left: 10px;
        div{
            width: 50%;
            min-height:30px;
            padding-left:5px; 
            line-height: 30px;
            float: left;
        }
        .zbGrade{
            width: 90px;
        }
        .roomClub{
            min-width: 50%;
        }
        .zba{
            width: 100%;
        }
        .roomName{
            width: 100%;
            line-height: 25px;
        }
    }
}
.data{
    height: 80px;
    background: #fff;
    font-size: 16px;
    line-height: 40px;
    margin:10px 0; 
    .item{
        width: 33vw;
        height: 80px;
        float: left;
        text-align: center;
        padding-left:10px; 
        color: #888;
        div{
            font-size: 18px;
            height: 30px;
            line-height: 25px;
            font-weight: 700;
            color: #ea4242;
        }
    }
}
.zbhm{
    border-radius: 8px 8px 0 0 ;
    background: #fff;
    .zbjt{
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        letter-spacing: 2px;
        font-family: 'Times New Roman', Times, serif;
    }
    .jt{
        // height: 80vw;
        img{
            width: 100%;
            // height: 100%;
        }
    }
}

</style>