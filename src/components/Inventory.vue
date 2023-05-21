<template>
    <div class="Inventory">
        <!-- <van-nav-bar title="盘点" left-text="返回" left-arrow @click-left="onReturn"/> -->
        <div class="Search">
            <van-search v-model="searchInfo" shape="round" background="#1eb467" placeholder="请输入(扫描)资产编号" @search="findInfo"/>
        </div>
        <div class="main">
            <van-form @submit="onSubmit" v-show="showInfo">
                <van-field v-model="params.ZCBH" label="资产编号" placeholder="资产编号"/>
                <van-field v-model="params.ZCMC" label="资产名称" placeholder="资产名称"/>
                <van-field name="datetimePicker" v-model="params.QYRQ" label="启用日期" placeholder="启用日期" clickable readonly @click="showCalendar = true"/>
                    <van-calendar v-model="showCalendar" @confirm="onConfirm" title="启用日期" :min-date="minDate" :max-date="maxDate" color="#1eb467" row-height="32" />
                <van-field v-model="params.SYBZ" label="使用班组" placeholder="使用班组"/>
                <van-field v-model="params.SJWZ" label="实际位置" placeholder="实际位置"/>
                <van-field v-model="params.BZ" label="备注" placeholder="备注"/>
                <van-field v-model="params.JNPD" label="今年盘点" placeholder="今年盘点"/>
                <van-field name="switch" label="今年盘点">
                    <template #input>
                        <van-switch v-model="switchChecked" size="20" />
                    </template>
                </van-field>
                <van-divider :style="{ color: '#1eb467', borderColor: '#1eb467', padding: '0 16px' }">图片</van-divider>
                <van-uploader v-model="fileList" multiple />
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">盘点</van-button>
                </div>
            </van-form>
        </div>
    </div>
    
</template>
<script>
export default {
    name: 'Inventory',
    data() {
        return {
            searchInfo: '',
            showCalendar: false,
            minDate: new Date(2020, 1, 1),
            maxDate: new Date(),
            showInfo: true,
            params: {},
            value: '',
            fileList: [
                { url: 'https://img01.yzcdn.cn/vant/leaf.jpg', isImage: true },
            ],
            switchChecked: false,
        }
    },
    watch: {
        params: {
            handler(newVal, oldVal) {
                console.log(newVal, oldVal);
                console.log(newVal.JNPD);
                this.switchChecked = newVal.JNPD
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        onReturn() {
            this.$router.go(-1)
        },
        onConfirm(date) {
            let y = `${date.getYear() + 1900}`
            let m = `${date.getMonth() + 1}`.padStart(2, '0')
            let d = `${date.getDate()}`.padStart(2, '0')
            this.params.QYRQ = y + "-" + m + "-" + d
            this.showCalendar = false
        },
        getJnpd() {
            if(this.params.JNPD == 'Y') {
                return true
            }else {
                return false
            }
        },
        findInfo(){
            this.zcData = []
            let params = {zcbh: this.searchInfo}
            this.getData('list_zcbh', params).then(res => {
                let data = res.data.data
                if(data.length == 0) {
                    this.$toast({
                        message: '资产编号不存在',
                        position: 'top',
                        icon: 'fail'
                    })
                    this.showInfo = true
                    this.params = {}
                }else {
                    this.showInfo = true
                    this.params = data[0]
                }
            }).catch(err => {
                console.log(err);
            })
        },
        //点确定
        onSubmit(){
            this.getData('update', this.params).then(res => {
                this.$toast({
                        message: '盘点成功',
                        position: 'top',
                        icon: 'success'
                    })
                this.showInfo = true
                this.params = {}
                this.searchInfo = ''
            }).catch(err => {
                console.log(err);
            })
        },
        //选择日期
        onQyrqChange(date, dateString) {
            this.params.QYRQ = dateString
        },
        //返回
        onBackClick() {
            this.$router.push('/index')
        },
        selfUpload({acion, file, onSuccess, onError, onProgress}) {
            console.log(file,'action, file');
            const base64 = new Promise(resolve => {
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                    resolve(fileReader.result)
                    this.params.IMG = fileReader.result
                }
            })
        },
        getData(url, params) {
            return this.$axios({
                method: 'post',
                url: 'http://10.194.69.22:8520/api/zcpd/' + url,
                params: params
            })
        }
    }
}
</script>
<style scoped>
.van-nav-bar .van-icon {
    color: #1eb467 !important;
}
/* .Search {
    width: 100%;
    position: fixed;
    top: 46px;
}
.main {
    padding-top: 54px;
} */
</style>