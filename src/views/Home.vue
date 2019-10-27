<template>
	<div class="home">
		<Slider /><!-- 首页轮播图  在components/Slideshow里-->
		<div class="link-box">
			<div class="btn-box" @click="search(0)">
				<img src="../../public/images/zb.png" alt="">
				查询主播
			</div>
			<div class="btn-box" @click="search(1)">
				<img src="../../public/images/yh.png" alt="">
				查询用户
			</div>
			<div class="btn-box" @click="search(2)">
				<img src="../../public/images/gh.png" alt="">
				查询工会
			</div>
			<div class="btn-box" @click="openLink(0)">
				<img src="../../public/images/gh.png" alt="">
				主播等级
			</div>
			<div class="btn-box" @click="openLink(1)">
				<img src="../../public/images/gh.png" alt="">
				用户等级
			</div>
		</div>
		<div class="kfvx">客服微信：13112794766</div>
		<Hot />
	</div>
</template>

<script>
// @ is an alias to /src
import Slider from "@/components/Slideshow.vue";
import Hot from "@/components/Hot.vue";
import Title from "@/components/Title.vue"
export default {
	name: "home",
	components: {
		Slider,
		Hot,
		Title
	},
	data() {
		return {
			info:[
                {
                    title:'请输入房间ID',
					type:'Anchor'
				},
				{
                    title:'请输入用户昵称',
					type:'UserInfo'
				},
				{
                    title:'请输入工会名称',
					type:'Union'
                }
            ]
		};
	},
	methods: {
		search(type) {
			this.$router.push({ 
				name: "SearchPage" ,
				params:this.info[type]
			});
		},
		openLink(x){
			let arr=['zb','yh'];
			window.open(arr[x]+'.html','_self');
		}
	}
};
</script>
<style scoped lang="scss">
div{
	margin-bottom: 8px;
	box-shadow: 0 0 5px 0 rgba(97, 95, 95, 0.226);
}
.link-box {
	width: 100%;
	min-height: 5vh;
	box-sizing: border-box;
	text-align: left;
	background: #f8f8f8;
	padding: 0 10px;
	padding-bottom: 1vw;
	.btn-box{
		width: 19vw;
		height: 18vw;
		display: inline-block;
		box-shadow: none;
		font-size: 12px;
		margin: 2vw;
		color:#aaa;
		margin-bottom: 0px;
		text-align: center;
		img{
			width: 12vw;
			height: 12vw;
			display: block;
			margin: 0 auto;
		}
	}
	button{
		border-radius:6px; 
		margin: 5px 10px;
		font-size: 14px;
	}
}
.kfvx {
	height: 50px;
	background: #0899ec;
	line-height: 50px;
	color: #fff;
	font-size: 1.5rem;
	text-align: center
}

</style>
