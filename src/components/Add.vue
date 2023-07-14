<template>
    <div class="Add">
        <van-nav-bar title="新增" />
        <div class="main">
            <van-form v-show="showInfo">
                <van-field v-model="params.zcbh" label="资产编号" placeholder="资产编号"/>
                <van-field v-model="params.zcmc" label="资产名称" placeholder="资产名称"/>
                <van-field name="datetimePicker" v-model="params.qyrq" label="启用日期" placeholder="启用日期" clickable readonly @click="showCalendar = true"/>
                    <van-calendar v-model="showCalendar" @confirm="onConfirm" title="启用日期" color="#1eb467" row-height="32" />
                <van-field v-model="params.xhge" label="型号规格" placeholder="型号规格"/>
                <van-field v-model="params.sybz" label="使用班组" placeholder="选择班组" 
                    readonly clickable @click="showDeptPicker = true" is-link/>
                    <van-popup v-model="showDeptPicker" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="deptColumns"
                            @confirm="onDeptConfirm"
                            @cancel="showDeptPicker = false"
                        />
                    </van-popup>
                <van-field v-model="params.sjwz" label="实际位置" placeholder="实际位置"/>
                <van-field v-model="params.bz" label="备注" placeholder="备注"/>
                <div style="margin: 16px;">
                    <van-button round block type="primary" @click="onAddClick">新增</van-button>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="primary" @click="onTempAddClick">临时新增</van-button>
                </div>
            </van-form>
        </div>
        <Tabbar :TabbarActive="1"></Tabbar>
    </div>
</template>
<script>
import Tabbar from './Tabbar.vue'
import lrz from 'lrz'
export default {
    name: 'Add',
    components: {
        Tabbar
    },
    data() {
        return{
            showCalendar: false,
            showDeptPicker: false,
            showInfo: true,
            params:{
                zcbh:'',
                zcmc:'',
                xhge:'',
                sybz:'',
                sjwz:'',
                bz:'',
                ds:'',
                yt:'',
                syzt:'',
                qyrq:'',
                pdsl:'',
                zclb:'',
                img:''
            },
            fileList: [],
            deptColumns: []
        }
    },
    created() {
        this.getDeptList()
        //生成资产编号
        this.params.zcbh = 'L44' + this.getRandom()
    },
    methods: {
        //返回
        onReturn() {
            this.$router.go(-1)
        },
        //日历选择 
        onConfirm(date) {
            let y = `${date.getYear() + 1900}`
            let m = `${date.getMonth() + 1}`.padStart(2, '0')
            let d = `${date.getDate()}`.padStart(2, '0')
            this.params.qyrq = y + "-" + m + "-" + d
            this.showCalendar = false
        },
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
            this.params.sybz = value
            this.showDeptPicker = false
        },
        //增加
        onAddClick() {
            this.$axios.post('add', this.params).then(res => {
                if(res.status == 200){
                    this.$toast({
                        message: '增加成功',
                        position: 'top',
                        icon: 'success'
                    })
                    //清空界面数据
                    Object.keys(this.params).forEach(key => {this.params[key] = ''})
                    this.fileList = []
                    //增加临时编号
                    this.params.zcbh = 'L44' + this.getRandom()
                }else {
                    this.$toast({
                        message: '增加失败',
                        position: 'top',
                        icon: 'fail'
                    })
                }
            }).catch(err => {
                console.log(err);
                this.$toast({
                    message: '出现错误' + err,
                    position: 'top',
                    icon: 'fail'
                })
            })
        },
        //临时增加
        onTempAddClick(){
            this.$axios.post('tempadd', this.params).then(res => {
                if(res.status == 200){
                    this.$toast({
                        message: '临时增加成功',
                        position: 'top',
                        icon: 'success'
                    })
                    //清空界面数据
                    Object.keys(this.params).forEach(key => {this.params[key] = ''})
                    this.fileList = []
                    //增加临时编号
                    this.params.zcbh = 'L44' + this.getRandom()
                }else {
                    this.$toast({
                        message: '临时增加失败',
                        position: 'top',
                        icon: 'fail'
                    })
                }
            }).catch(err => {
                console.log(err);
                this.$toast({
                    message: '出现错误' + err,
                    position: 'top',
                    icon: 'fail'
                })
            })
        },
        //选择日期
        onQyrqChange(date, dateString) {
            console.log(date,dateString);
            this.params.qyrq = dateString
        },
        //随机生成数字作为编号
        getRandom(){
            let number = Math.floor(Math.random() * 10000000000) 
            return number;
        },
    }
}
</script>
<style scoped>
.van-nav-bar {
    width: 100%;
    position: fixed;
}
.main{
    padding-top: 46px;
    overflow: auto;
    padding-bottom: 50px;
}
.van-cell:first-child {
    background-color: #07c160;
}
</style>