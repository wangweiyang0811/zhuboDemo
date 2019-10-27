<template>
    <div class="userInfo">
        <!-- <Title back='true' msg='用户信息'></Title> -->
        <div class="user">
            <div class="Info">
                <div class="headPortrait">
                    <img :src="user.avatar" alt="">
                </div>
            </div>
            <div class="userName">{{user.nickname}}</div>
        </div>
        <div class="danmu_title m-title">
            用户信息
            <div class="sel_title">查询周期:
                <select class="sel" name="" @change="selyh" v-model="yhTime"  id="">
                    <option value="0">今天</option>
                    <option value="1">昨天</option>
                    <option value="7">七天</option>
                    <option value="30">一个月</option>
                </select>
            </div>
        </div>
        <div class="data">
            <div class="gift_price item">
                <span>送礼金额(元)</span><div>{{user.gift_price}}</div>
            </div>
            <div class="active_days item">
                <span>活跃天数(天)</span><div>{{user.active_days}}</div>
            </div>
            <div class="danmu_count item">
                <span>弹幕数量</span><div>{{user.danmu_count}}</div>
            </div>
        </div>
        <div class="danmu_title m-title">
            弹幕信息
            <div class="sel_title">查询周期:
                <select class="sel" name="" @change="selDanmu" v-model="dmTime"  id="">
                    <option value="days_1">一天</option>
                    <option value="days_7">七天</option>
                    <option value="days_30">一个月</option>
                    <option value="days_all">全部</option>
                </select>
            </div>
        </div>
        <div class="tab">
            <v-table
            :width='630'
            :columns="title"
            :table-data="danmu"
            :show-vertical-border="true"
            ></v-table>
        </div>
        
    </div>
</template>
<script>
import Title from "@/components/Title.vue"
export default {
    data(){
        return{
            user:{
                
            },
            danmu:[],
            title:[
                {field: 'index', title:'序号', width: '50', titleAlign: 'center',columnAlign:'center'},
                {field: 'time', title:'发送时间', width: '150', titleAlign: 'center',columnAlign:'center'},
                {field: 'room_id', title: '直播间ID', width: '80', titleAlign: 'center',columnAlign:'center'},
                {field: 'room_nickname', title: '主播昵称', width: '120', titleAlign: 'center',columnAlign:'center'},
                {field: 'content', title: '弹幕内容', width: '230',titleAlign: 'center',columnAlign:'center'}
            ],
            yhTime:0,
            dmTime:'day-1'
        }
    },
    components:{
        Title
    },
    created(){
        this.getRouterParams()
    },
    mounted(){
        this.getDanmu(moment(new Date()).add('-'+this.dmTime,'days').format('YYYY-MM-DD'));
        
    },
    methods:{
        selDanmu(){
            this.getDanmu(moment(new Date()).add('-'+this.dmTime,'days').format('YYYY-MM-DD'));
        },
        selyh(){
            let a=getLocal('detail'+this.user.nickname+'day'+this.yhTime);
            if(a){
                this.user=a;
            }else{
                this.$axios.post('/openapi/user/detail?access_token='+this.$store.state.token,
                    {
                        nickname:this.user.nickname,
                        days: this.yhTime
                    }
                ).then((res)=>{
                    if(res.data.status=="success"){
                        setLocal('detail'+this.user.nickname+'day'+this.yhTime,res.data.user);
                        this.user=res.data.user;
                    }else{
                        this.$message.info('请求错误!') 
                    }
                })
            }
        },
        getRouterParams(){
            this.user=this.$route.params;
        },
        getDanmu(date){
            let a=getLocal('danmu'+this.user.nickname+'date'+this.dmTime);
            if(a){
                let danmu=a;
                danmu.forEach((el,ind) => {
                    el.index=ind+1;
                });
                this.danmu=danmu;
            }else{
                this.$axios.post('/openapi/user/danmu?access_token='+this.$store.state.token,
                    {
                        user_nickname: this.user.nickname,
                        date:this.dmTime
                        // date:date
                    }
                ).then((res)=>{
                    if(res.data.status=="success"){
                        setLocal('danmu'+this.user.nickname+'date'+date,res.data.danmu);
                        let danmu=res.data.danmu;
                        danmu.forEach((el,ind) => {
                            el.index=ind+1;
                        });
                        this.danmu=danmu; 
                    }else{
                        this.$message.info('请求错误!') 
                    }
                })
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>

.user{
    height: 180px;
    padding: 10px 5px;
    background: url('../../public/images/zbHerderBg.jpg');
    background-size: 100% 100%;
    margin-bottom: 10px;
    .headPortrait{
        margin: 5px auto;
        width: 118px;
        height: 118px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 5px 0 rgb(23, 190, 219);
        img{
            width: 100%;
            height: 100%
        }
    };
    .userName{
        text-align: center;
        font-size: 20px;
        margin-top: 9px;
        color: #f9f9f9de;
        font-weight: 600;
        text-shadow: 3px 0px 3px #2f0909
    }

}
.sel_title{
    float: right;
    margin-right: 5px;
    font-size: 15px;
    line-height: 40px;
    color: #999;
}
.data{
    height: 80px;
    background: #fff;
    font-size: 16px;
    line-height: 40px;
    margin:10px 0; 
    margin-top: 0;
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
 .tab{
     width: 100%;
     overflow: auto;
     font-size: 14px;
     background: #f2f2f2;
    //  max-height:400px;
 }   
 .sel{
     width: 85px;
     height: 30px;
     float: right;
     margin-top: 5px;
     border: 1px solid #eee;
     margin-right: 5px;
     outline: none;
     -webkit-appearance: 0;
     box-sizing:border-box;
     margin-left: 5px;
 }
</style> 