<template>
    <div class="Tabbar">
        <van-tabbar v-model="active" @change="onTabbarChange" active-color="#1eb467" inactive-color="#000">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="plus">增加</van-tabbar-item>
            <van-tabbar-item icon="chart-trending-o">统计</van-tabbar-item>
            <van-tabbar-item icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'Tabbar',
    data() {
        return{
            active: 0
        }
    },
    props: ['TabbarActive'],
    mounted() {
        this.active = this.TabbarActive
    },
    methods: {
         onTabbarChange(index) {
            if(index == 0) {
                this.$router.push({path: '/index'})
            }else if(index == 1) {
                this.$router.push({path: '/add'})
            }else if(index == 2) {
                this.$router.push({path: '/statistics'})
            }else if(index == 3) {
                this.$router.push({path: '/my'})
            }
            //点击别的板块，清空加载提示
            this.$toast.clear()
        },
    }
}
</script>

<style scoped>

</style>