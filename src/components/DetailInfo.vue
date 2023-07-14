<template>
    <div class="DetailInfo">
        <div class="header">
            <van-nav-bar
                title="详细信息"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="main">
            <van-form @submit="onUpdateUserSubmit">
                <van-field v-model="user.YGID" name="ID" label="用户ID" disabled />
                <van-field v-model="user.YHKH" name="yhkh" label="用户卡号" disabled />
                <van-field v-model="user.YGXM" name="ygxm" label="员工姓名" required/>
                <van-field
                    readonly
                    clickable
                    name="sex"
                    :value="user.SEX"
                    label="性别"
                    placeholder="点击选择性别"
                    @click="showSexPicker = true"
                    is-link
                    />
                    <van-popup v-model="showSexPicker" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="sexColumns"
                            @confirm="onSexConfirm"
                            @cancel="showSexPicker = false"
                        />
                    </van-popup>
                <van-field
                    v-model="user.GWMC"
                    name="gwmc"
                    label="岗位名称"
                    readonly
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">修改</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailInfo',
    data () {
        return {
            user: {},
            sexColumns: ['男', '女'],
            showSexPicker: false
        }
    },
    created() {
        this.getUserInfo(this.$route.query.ygid)
    },  
    methods: {
        onClickLeft() {
            this.$router.push('my')
        },
        //获取用户详细信息
        getUserInfo(ygid) {
            this.$axios.post('/user' , {ygid: ygid}).then(res=> {
                let data = res.data.data[0]
                this.user = data
            }).catch(err => {
                console.log(err);
            })
        },
        //更新用户信息
        onUpdateUserSubmit() {
            console.log(this.user);
        },
        //性别选择
        onSexConfirm(value) {
            this.user.SEX = value
            this.showSexPicker = false
        }
    }
}
</script>

<style scoped>
.main {
    margin-top: 1rem;
}
</style>