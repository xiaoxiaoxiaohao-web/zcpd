<template>
    <div class="Index">
        <van-nav-bar title="首页" />
        <div class="main">
            <Invenory></Invenory>
        </div>
        <Tabbar :TabbarActive="0"></Tabbar>
    </div>
</template>
<script>
import Tabbar from './Tabbar.vue'
import Invenory from './Inventory.vue'
export default {
    name: 'Index',
    components: {
        Tabbar,
        Invenory
    },
    data() {
        return {
        }
    },
    methods: {
        // onInventoryClick() {
        //     this.$router.push({path: '/inventory'})
        // },
        // onReturn() {
        //     this.$router.go(-1)
        // }
    }
}
</script>
<style scoped>
.van-nav-bar {
    width: 100%;
    position: fixed;
}
.main {
    padding-top: 46px;
    overflow: auto;
    padding-bottom: 50px;
   /* margin-top: 1rem; */
}
/* .Index > button {
    margin-left: 0;
}
.ant-btn-dashed {
    background-color: #f00;
    color: #fff;
}
.btn-group {
    text-align: center;
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.btn-group button {
    margin: 0 30px;
} */
</style>