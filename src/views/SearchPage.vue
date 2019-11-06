<template>
    <div class="search-box">
        <!-- <Title back='true' msg='搜索页'></Title> -->
        <input type="search" v-model="id" v-focus='true' @input="getUnionName"  :placeholder="info.title">
        <button @click="search">查找</button>
        <ul v-show="unionList.length > 0">
            <li v-for="name in unionList" :key='name.index' @click='getUnion(name)'>{{name}}</li>
        </ul>
        <span v-show="unionList.length > 0">一共查询到：<b>{{unionList.length}}</b> 个结果</span>
    </div>
</template>
<script>
import Title from "@/components/Title.vue"
export default {
    data(){
        return{
            id:'',
            info:'',
            loading:false,
            unionList:[]
        }
    },
    components:{
        Title
    },
    directives: {
        focus: {
            inserted: function (el, {value}) {
                if (value) {
                    el.focus();
                }
            }
        }
    },
    created(){
        this.getRouterParams();
    },
    mounted(){
         
    },
    methods:{
        getRouterParams(){
            this.info=this.$route.params;
            if(JSON.stringify(this.$route.params)=='{}'){
                this.info=JSON.parse(getLocal('search'));
            }else{
                setLocal('search',JSON.stringify(this.$route.params))
            }
        },
        search(){
            if(!this.id){
                return ;
            }

            if(this.info.type=='Anchor'){
                this.getZb();
            }else if(this.info.type=='UserInfo'){
                this.getUserInfo();
            }else if(this.info.type=='Union'){
                this.getUnion();
            }
            
        },
        getZb(){
            let a=getLocal('room'+this.id);
            if(a){
                this.$router.push({name:`${this.info.type}`,
                    params:a
                })
            }else{
                this.$axios.get('/openapi/room',{
                    params:{
                        rid:this.id,
                        platform:'douyu',
                        access_token:this.$store.state.token
                    }
                }).then((res)=>{
                    if(res.data.status=="success"){
                        setLocal('room'+this.id,res.data.room);
                        this.$router.push({name:`${this.info.type}`,
                            params:res.data.room
                        })
                    }else{
                        this.$message.info('房间ID有误!') 
                    }
                })
            }
        },
        getUserInfo(){
            let a=getLocal('detail'+this.id+'day'+0);
            if(a){
                this.$router.push({name:`${this.info.type}`,
                    params:a
                })
            }else{
                this.$axios.post('/openapi/user/detail?access_token='+this.$store.state.token,
                    {
                        nickname:this.id,
                        days: 0
                    }
                ).then((res)=>{
                    if(res.data.status!="success"){
                        this.$message.info('昵称有误!') 
                    }else{
                        setLocal('detail'+this.id+'day'+0,res.data.user);
                        this.$router.push({name:`${this.info.type}`,
                            params:res.data.user
                        })
                    }
                })
            }
            
        },
        getUnion(name){
            if(name){
                this.id=name;
            }
            let a=getLocal('club'+this.id);
            if(a){
                this.$router.push({name:`${this.info.type}`,
                    params:{
                        club:a
                    }
                })
            }else{
                this.$axios.post('/openapi/club?access_token='+this.$store.state.token,
                    {
                        club:this.id ,
                    },
                ).then((res)=>{
                    if(res.data.status){
                        if(res.data.status=='success'){
                            setLocal('club'+this.id,res.data.club);
                            this.$router.push({name:`${this.info.type}`,
                                params:{
                                    club:res.data.club,
                                }
                            })
                        }else{
                            this.$message.info('公会名有误!') 
                        }
                    }else{
                        this.$message.info('查询失败!') 
                    }
                })
            }
            
        },
        getUnionName(){
            if(this.info.type!=='Union'){
                return ;
            }
            if(this.timeOut){
                clearTimeout(this.timeOut);
            }
            this.timeOut=setTimeout(()=>{
                let a=getLocal('clubName'+this.id);
                if(a){
                    this.unionList=a;
                }else{
                    this.$axios.post('/openapi/club_search?access_token='+this.$store.state.token,
                        {
                            q:this.id,
                        },
                    ).then((res)=>{
                        if(res.data.status){
                            if(res.data.status=='success'){
                                setLocal('clubName'+this.id,res.data.result);
                                this.unionList=res.data.result;
                            }else{
                                this.unionList=[];
                            }
                        }else{
                            this.unionList=[];
                        }
                    })
                }
            },500)
        }
    }
}
</script>
<style lang="scss" scoped>
.search-box{
    width:100%;
    padding-top:50px; 
    position: relative;
    input{
        width: 80%;
        height: 40px;
        outline: 0;
        box-sizing: border-box;
        padding-left:10px; 
        border-radius: 0 !important ;
        border: 1px solid #ddd;
        -webkit-appearance: none;
        font-size: 18px;
    }
    button{
        width: 20%;
        height: 40px;
        float: right;
        font-size: 18px;
        background: #fff;
        border: 1px solid #ddd;
        color: rgb(67, 182, 124);
    }
    input:focus{
        border: 1px solid rgb(65, 250, 157);
    }
    ul{
        max-height: 320px;
        overflow-y: scroll;
        border: 1px solid #ddd;
        border-top: 0;
        background: #fff;
        li{
            height: 40px;
            list-style: none;
            padding-left: 10px;
            line-height: 40px;
        }
    }
    span{
        padding-left: 10px;
        line-height: 30px;
        font-size: 14px;
        b{
            color: rgb(4, 111, 211)
        }
    }
}
</style> 