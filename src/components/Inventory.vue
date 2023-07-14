<template>
    <div class="Inventory">
        <div class="Search">
            <van-search v-model="searchInfo" shape="round" background="#1eb467" placeholder="请输入(扫描)资产编号" @search="findInfo"/>
        </div>
        <div class="main">
            <van-form @submit="onSubmit" v-show="showInfo">
                <van-field v-model="params.ZCBH" label="资产编号" placeholder="资产编号" readonly/>
                <van-field v-model="params.ZCMC" label="资产名称" placeholder="资产名称"/>
                <van-field v-model="params.QYRQ" label="启用日期" placeholder="启用日期" readonly />
                <van-field v-model="params.SYBZ" label="使用班组" placeholder="选择班组" 
                    readonly clickable @click="showDeptPicker = true" is-link/>
                    <van-popup v-model="showDeptPicker" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="deptColumns"
                            @confirm="onDeptConfirm"
                            @cancel="showDeptPicker = false"
                        />
                    </van-popup>
                <van-field v-model="params.SJWZ" label="实际位置" placeholder="实际位置"/>
                <van-field v-model="params.BZ" label="备注" placeholder="备注"/>
                <van-field name="switch" label="今年盘点">
                    <template #input>
                        <van-switch :value="params.JNPD == 1 ? true:false" size="20" />
                    </template>
                </van-field>
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
            showDeptPicker: false,
            deptColumns: [],
            showInfo: true,
            params: {},
            value: '',
            switchChecked: false,
        }
    },
    watch: {
        // 'params.JNPD': {
        //     handler(newVal, oldVal) {
        //         this.switchChecked = (newVal == 1? true:false)
        //     }
        // }
    },
    created() {
        this.getDeptList()
    },  
    methods: {
        //获取班组列表
        getDeptList() {
            this.$axios.post('deptlist').then(res=> {
                let data = res.data.data
                data.forEach(e => {
                    this.deptColumns.push(e.SIMPLE_NAME)
                })
            })
        },
        //班组确定
        onDeptConfirm(value) {
            this.params.SYBZ = value
            this.showDeptPicker = false
        },
        getJnpd() {
            if(this.params.JNPD == 'Y') {
                return true
            }else {
                return false
            }
        },
        //查询信息
        findInfo(value){
            this.zcData = []
            this.searchInfo = ''
            this.$axios.post('list', {zcbh: value}).then(res => {
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
            this.$axios.post('update', this.params).then(res=> {
                this.$toast({
                    message: '盘点成功',
                    position: 'top',
                    icon: 'success'
                })
                this.showInfo = true
                this.params = {}
            }).catch(err => {
                console.log(err);
            })
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
        }
    }
}
</script>
<style scoped>
.van-nav-bar .van-icon {
    color: #1eb467 !important;
}
</style>