<template>
    <div class="My">
        <van-nav-bar title="我的" />
        <div class="main">
            <div class="simple-info">
                <div class="photo">
                    <van-image width="5rem" height="5rem" round src="https://img01.yzcdn.cn/vant/cat.jpeg" style="border: 2px solid #fff"/>
                </div>
                <div class="name">
                    <h2>xiaoxiao</h2>
                    <p>维护部门</p>
                </div>
            </div>
            <van-cell-group>
                <van-cell title="详细信息" icon="orders-o" size="large"  is-link @click="onInventoryClick()" />
                <van-cell title="更新密码" icon="shield-o" size="large"  is-link @click="onInventoryClick()" />
                <van-cell title="版本" icon="info-o" size="large" is-link @click="onVersionClick()" />
                <van-cell title="退出" icon="revoke" size="large" is-link @click="onExitClick()" />
            </van-cell-group>
        </div>
        <Tabbar :TabbarActive="3"></Tabbar>
    </div>
</template>

<script>
import Tabbar from './Tabbar.vue'
export default {
    name: 'My',
    data () {
        return {

        }
    },
     components: {
        Tabbar
    },
    methods: {
        onVersionClick() {
            this.$toast({
                message: '当前版本为1.0.0',
                time: 10,
            })
        },
        //获取用户信息
        getUserInfo() {
            this.$axios({
                methods: 'post',
                url: '',
                params: ''
            }).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        },
        //退出
        onExitClick() {
            
        }
    }
}
</script>

<style scoped>
.simple-info {
    display: flex; 
    background-color: #1eb467;
    padding: 2rem 1rem 0.8rem 1rem;
    /* vertical-align: middle; */
}
.simple-info .photo {
    width: 5rem;
    padding: 0.2rem;
}
.simple-info .name {
    width: 100%;
    margin-left: 3rem;
}
</style>