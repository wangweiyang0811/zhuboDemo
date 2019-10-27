<template>
    <transition name="fade">
        <div class="message" :class="type" v-show="show">
        <i class="icon"></i>
        <span class="text">{{text}}</span>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'message',
        props: {
            type: {
                type: String,
                default: 'info',
                validator: val => ['info', 'success', 'warning', 'error'].includes(val)
        //['info', 'success', 'warning', 'error'] 表示type只接收这四个字符串作为参数传入message组件
            },
            text: {
                type: String,
                default: ''
            },
            show: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .8s
    }   
    .fade-enter,
    .fade-leave-to{
        opacity: 0
    }  
    .message{
        position:fixed;
        top:50%;
        text-align:center;
        left :50%;
        transform :translateX(-50%) translateY(0px);
        min-width :100px;
        //width: 100%;
        padding :10px 20px;
        color: #fff;
        background: #f5f5f5;
        font-size: 18px;
        line-height: 1.4;
        border-radius: 4px;
        z-index: 1000;
        box-shadow: 0 0 15px rgba(0, 0, 0, .3);
        letter-spacing: 2px;
        animation: toBottom .8s forwards;
        &.info{
            background: rgba(21, 125, 185,0.8);
            box-shadow: 0 0 15px rgb(21, 125, 185);
        } 
        &.success{
            background: rgba(27, 185, 21,0.8);
            box-shadow: 0 0 15px rgb(27, 185, 21);
        } 
        &.error{
            background: rgba(185, 40, 21,0.8);
            box-shadow: 0 0 15px rgb(185, 40, 21);
        }
        &.warning{
            background:rgba(247, 185, 16,0.8);
            box-shadow: 0 0 25px rgb(247, 185, 16);
        }
    }
    @keyframes toBottom{
        0%{transform :translateX(-50%) translateY(0px);}
        100%{transform :translateX(-50%) translateY(10px);}
    }
   
</style>