<template>
    <div class="Login">
        <Header />
        <div class="systemName">
            <h2>资产盘点系统</h2>
        </div>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名/用户卡号"
                    :rules="[{ required: true, message: '请输入用户名' }]"/>
                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请输入密码' }]"/>
                <!-- <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名/用户卡号"  />
                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"/> -->
            </van-cell-group>
            <div style="margin: 1rem;">
                <van-button round block type="primary" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import Header from './Header.vue'
export default {
    name: 'Login',
    data() {
        return{
            username: '',
            password: ''
        }
    },
    components: {
        Header
    },
    methods: {
        //登录
        onSubmit(values) {
            let username = this.username
            let password = this.password
            let params = {
                yhkh: username,
                yhmm: password
            }
            //验证账号密码
            this.$axios({
                method: 'post',
                url: 'http://10.194.69.22:8520/api/zcpd/login',
                data: params
            }).then(res => {
                console.log(res);
                if(res.data.data.length > 0) {  //成功
                    this.$router.push('/index')
                    this.$toast({
                        message: '登录成功',
                        position: 'top'
                    })
                    let data = res.data.data[0]
                    //设置cookies
                    this.$cookies.config('30s')
                    this.$cookies.set('yhkh', data.yhkh)
                
                    this.$store.commit('login', [data.YGXM, data.YGID, data.YHKH])
                }else {
                    this.$notify({ type: 'danger', message: '登录失败，用户名或密码错误' });
                }
            }).catch(err => {
                console.log(err);
            })
            

        }
    }
}
</script>

<style scoped>
.systemName > h2 {
    color: #1eb467;
    font-weight: bold;
}
.Login {
    margin: 0 1.5rem;
    margin-top: 50%;
    text-align: center;
}
</style>