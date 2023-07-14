<template>
    <div class="ChangePsw">
        <div class="header">
            <van-nav-bar
                title="修改密码"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="main">
            <van-form @submit="onUpdatePswSubmit">
                <van-field v-model="user.yhkh" name="yhkh" label="用户卡号" disabled />
                <van-field v-model="user.yhmm" name="yhmm" label="原密码" placeholder="原密码" type="password" required/>
                <van-field v-model="user.newpsw" name="newpsw" label="新密码" placeholder="新密码" type="password" required/>
                <van-field v-model="user.repeatpsw" name="repeatpsw" label="重复新密码" placeholder="重复新密码" type="password" required/>
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">修改</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangePsw',
    data() {
        return {
            user: {
                yhkh: '',
                yhmm: '',
                newpsw: '',
                repeatpsw: ''
            }
        }
    },
    created() {
        this.user.yhkh = this.$route.query.yhkh
    }, 
    methods: {
        onClickLeft() {
            this.$router.push('my')
        },
        //修改密码
        async onUpdatePswSubmit() {
            if(!this.judgePsw(this.user.newpsw, this.user.repeatpsw)) {
                this.$toast({
                    message: '重复密码不一致',
                    position: 'top',
                    icon: 'fail'
                })
            }else if(!await this.judgeCurrentPsw()) {
                this.$notify({
                    message: '原密码错误',
                    type: 'danger',
                })
            }else {
                let that = this
                this.$axios.post('updatepsw', this.user).then(res=> {
                    console.log(res);
                    if(res.data.success == true) {
                        console.log("12312");
                        that.$toast({
                            message: '修改成功',
                            position: 'top',
                            icon: 'success'
                        }) 
                        that.$router.push('my')
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        //判断两次新密码是否一致
        judgePsw(newpsw, repeatpsw) {
            if(newpsw == repeatpsw) {
                return true
            }
            return false
        },
        //判断原密码是否正确
        async judgeCurrentPsw() {
            let result = false
            await this.$axios.post('login', this.user).then(res=> {
                let data = res.data.data
                if(data.length > 0) {
                    result =  true
                }
            }).catch(err => {
                console.log(err);
            })
            return result
        }
    }
}
</script>

<style scoped>
.main {
    margin-top: 1rem;
}
</style>