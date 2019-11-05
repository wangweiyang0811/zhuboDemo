<template>
    <div class="union">
        <!-- <Title back='true' msg='工会主页'></Title> -->
        <div class="nameAndNum">
            <div class="union_tx">
                <img src="../../public/images/union.jpg" alt="">
            </div>
            <div class="hyzbs">
                <div>活跃主播</div>
                <div class="hy">{{club.active_rooms || 'xxx'}}</div>
            </div>
            <div class="uname">
                <div class="name">{{club.club || 'xxx'}}</div>
                <button class="des orange" @click="open">工会介绍</button>
            </div>  
        </div>
        <RankingList content="近7日收入排名 Top3"  :rank='rank.slice(0,3)'/>
        <RankingList content="近7日热度排名 Top3" :sr='false'  :rank='rank.slice(0,3)'/>
        <div class="rank">
            <div class="m-title">近7日收入排名 Top10</div>
            <div class="rank-box">
                <div class="none" v-show="none">暂时没有数据!</div>
                <div class="rank_li" v-for="(item,index) in rank" :key="item.index">
                    <span class="num">{{index+1}}</span>
                    <div class="ib">
                        <img :src="item.avatar" alt="">
                        <div>{{item.nickname}}({{item.room_id}})</div>
                    </div>
                    <div class="rank_info">
                        <div class="wp">
                            <div>平台：斗鱼</div>
                            <div>分类：{{item.category}}</div>
                        </div>
                        <div>弹幕人数：{{item.danmu_users}}</div>
                        <div>付费人数：{{item.income_users}}</div>
                        <div>活跃人数：{{item.active_users}}</div>
                        <div>开播分钟数：{{item.live_minutes}}</div>
                        <div>总收入：{{item.income}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RankingList from '@/components/RankingList.vue'
import Title from "@/components/Title.vue"
export default {
    name:'abc',
    components:{
        RankingList,
        Title
    },
    data(){
        return{
            name:'',
            none:true,
            club:{},
            rank:[],
            llRank:[],
        }
    },
    created(){
         this.getparams();
         this.getRank();
    },
    mounted(){
        if(this.rank.length==0){
            this.none=true;
        }
    },
    methods:{
        getparams(){
            if(this.$route.params.club){
                this.club=this.$route.params.club;
            }
        },
        open(){
        this.$alert(this.club.description || '该工会还没有介绍!', {
            confirmButtonText: '确定',
            title:'工会介绍',
            showClose:false,
        });
        },
        getRank(){
            let a=getLocal('rank'+this.club.club);
            if(a){
                this.rank=a;
                if(this.rank.length!==0){
                    this.none=false;
                }
            }else{
                this.$axios.post('/openapi/rank?access_token='+this.$store.state.token,
                    {
                        club:this.club.club ,
                        sort: 'income',
                        limit: 10 
                    }
                ).then((res)=>{
                    if(res.data.status){
                        if(res.data.status=='success'){
                            setLocal('rank'+this.club.club,res.data.rank);
                            this.rank=res.data.rank;
                            if(this.rank.length!==0){
                                this.none=false;
                            }
                        }
                    }else{
                        this.$message({
                            message: '查询失败!',
                            type: 'error',
                            offset:'150',
                            duration:'2000'
                         })
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.union{
    padding-top: 5px;
    &>div{
        margin-bottom: 10px;
    }
    
}
.model{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(255,255,255,0.6);
    
}
.alert{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 80%;
    height: auto;
    font-size: 16px;
    text-align: left;
    padding: 40px 10px 20px 10px;
    background: #333;
    text-indent: 32px;
    color: #fff;
    min-height: 200px;
    border-radius: 10px;
    .gh-title{
        position: absolute;
        top: 0px;
        width: 100%;
        height: 30px;
        background: #5c5f5f;
        left: 0;
        border-radius: 10px 10px 0 0 ;
        line-height: 31px;
        font-weight: 600;
    }
    .close{
        position: absolute;
        right: 0px;
        top: 0px;
        color: #fff;
        font-size: 18px;
        width: 30px;
        height: 30px;
        text-align: center;
        text-indent: 0px;
        line-height: 30px;
        z-index: 1000;
        
    }
}
.nameAndNum{
    height: 100px;
    line-height: 40px;
    font-size: 18px;
    background: #ffffff;
    box-sizing: border-box;
    width: 100vw;
    text-align: center;
    .union_tx{
        width: 80px;
        height: 100px;
        padding-left: 10px;
        //overflow: hidden;
        float: left;
        img{
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin-top: 15px;
        }
    }
    .hyzbs{
        float: right;
        text-align: center;
        width: 80px;
        font-size: 15px;
        padding-top:35px;  
        .hy{
            font-weight: 600;
            height: 30px;
            line-height: 30px;
        }
        div{
            line-height: 20px;
        }  
    }
    .uname{
        padding-top: 24px;
        text-align: left;
        font-size: 18px;
        height: 100%;
        line-height: 30px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-left: 90px;
        padding-right: 85px;
        .name{
            font-weight: 600;
        }
        .des{
            padding: 2px 5px;
            font-size: 15px;
            color: #fff;
            border-radius: 5px;
        }
    }
    
    .l{
        float: left;
        margin-left: 10px;
        font-size: 18px;
    }
}
.unionIntor{
    width: 90vw;
    margin: 0 auto;
    height: 20vh;
    border: 1px solid #222;
    text-indent: 20px;
    padding: 3px 5px;
}
.rank{
    background: #fff;
    .rank-box{
        overflow: hidden; 
        background:#fff;
        .none{
            height: 30px;
            text-indent: 20px;
            line-height: 30px;
        }
        .rank_li{
            padding: 5px;
            border-radius: 8px;
            width: 100vw;
            border-bottom:1px solid rgb(207, 235, 246); 
            overflow: hidden;
            height: 115px;
            box-shadow: inset 0 0px 5px #fff;
            .num{
                float: left;
                width: 17px;
                height: 125px;
                line-height: 115px;
                font-size: 12px;
            }
            .ib{
                height: 100%;
                float: left;
                font-size: 12px;
                text-align: center;
                width: 85px;
                div{
                    padding: 0 2px;
                }
            }
            img{
                width: 65px;
                height: 65px;
                margin-top:0px; 
                border-radius: 50%;
            }
            .rank_info{
                overflow: hidden;
                margin-left:100px;
                padding: 5px; 
                .wp{
                    width: 100%;
                }
                div{
                    min-width: 50%;
                    float: left;
                    padding: 2px 0px;
                   // padding-left: 
                    font-size: 12px;
                }
            }
            
        }
    }
}
</style>