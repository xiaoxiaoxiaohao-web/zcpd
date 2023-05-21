<template>
    <div class="Add">
        <van-nav-bar title="新增" />
        <!-- <van-nav-bar title="新增" left-text="返回" left-arrow @click-left="onReturn"/> -->
        <div class="main">
            <van-form @submit="onSubmit" v-show="showInfo">
                <van-field v-model="params.zcbh" label="资产编号" placeholder="资产编号"/>
                <van-field v-model="params.zcmc" label="资产名称" placeholder="资产名称"/>
                <van-field name="datetimePicker" v-model="params.qyrq" label="启用日期" placeholder="启用日期" clickable readonly @click="showCalendar = true"/>
                    <van-calendar v-model="showCalendar" @confirm="onConfirm" title="启用日期" color="#1eb467" row-height="32" />
                <van-field v-model="params.xhge" label="型号规格" placeholder="型号规格"/>
                <van-field v-model="params.sybz" label="使用班组" placeholder="使用班组"/>
                <van-field v-model="params.sjwz" label="实际位置" placeholder="实际位置"/>
                <van-field v-model="params.bz" label="备注" placeholder="备注"/>
                <van-divider :style="{ color: '#1eb467', borderColor: '#1eb467', padding: '0 16px' }">图片</van-divider>
                <van-uploader v-model="fileList" multiple />
                <!-- <van-field v-model="params.JNPD" label="今年盘点" placeholder="今年盘点"/> -->
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">新增</van-button>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="primary" @click="onTempAdd">临时新增</van-button>
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
            showInfo: true,
            params:{
                zcbh: '',
                zcmc: '',
                xhge: '',
                sybz: '',
                sjwz: '',
                bz: '',
                ds: '',
                yt: '',
                syzt: '',
                qyrq: '',
                pdsl: '',
                zclb: '',
                img: ''
            },
            fileList: []
        }
    },
    created() {
        //临时增加生成资产编号
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
        //增加
        onSubmit() {
            let params = this.params
            this.add('insert', params)
        },
        //返回
        onBackClick() {
            this.$router.push('/index')
            this.getRandom()
        },
        //临时增加
        onTempAdd(){
            console.log(this.params);
            let params = this.params
            // this.add('tempInsert', params)
        },
        //选择日期
        onQyrqChange(date, dateString) {
            console.log(date,dateString);
            this.params.qyrq = dateString
        },
        getData(url, params) {
            return this.$axios({
                method: 'post',
                url: 'http://10.194.69.22:8520/api/zcpd/' + url,
                params: params
            })
        },
        //随机生成数字作为编号
        getRandom(){
            let number = Math.floor(Math.random() * 10000000000) 
            return number;
        },
        add(api, params) {
            let that = this
            this.getData(api, params).then(res => {
                if(res.status == 200){
                    this.$toast({
                        message: '增加成功',
                        position: 'top',
                        icon: 'success'
                    })
                    //清空界面数据
                    Object.keys(this.params).forEach(key => {this.params[key] = ''})
                    that.fileList = []
                    //增加临时编号
                    that.params.zcbh = 'L44' + this.getRandom()
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
        //图片二进制转换
        selfUpload({acion, file, onSuccess, onError, onProgress}) {
            console.log(file,'action, file');
            let fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                //二进制数据存储数据库
                let re = fileReader.result
                let that = this
                lrz(file, {with: 300, quality: 0.3}).then(res => {
                    console.log(res);
                    console.log(res.base64);
                    // Base64Decoder decoder = new Base64Decoder()
                }).catch(err => {

                }).always(function (){

                })
                // this.cavansDataUrl(re, {quality: 0.2}, function(res) {
                //     console.log(res);
                //     fileReader.readAsDataURL(res)
                //     fileReader.onload = () => {
                //         console.log(fileReader.result);
                //     }
                // })
                // // //界面显示
                // file.url = fileReader.result
                // this.fileList.push(file)
            }
        },
        // //图片压缩
        // cavansDataUrl(path, obj, callback){
        //     let img = new Image()
        //     img.src = path
        //     img.onload = function() {
        //         let that = this
        //         let w = that.width
        //         let h = that.height
        //         let scale = w/h
        //         w = obj.width || w
        //         h = obj.height || (w/scale)
        //         let quality = 0.3
        //         //生成cavans
        //         let canvas =  document.createElement('canvas')
        //         let ctx = canvas.getContext('2d')
        //         //创建属性节点
        //         let anw = document.createAttribute('width')
        //         anw.nodeValue = w
        //         let anh = document.createAttribute('height')
        //         anh.nodeValue = h
        //         canvas.setAttributeNode(anw)
        //         canvas.setAttributeNode(anh)
        //         ctx.drawImage(that, 0, 0, w, h)
        //         if(obj.quality && obj.quality <= 1 && obj.quality > 0){
        //             quality = obj.quality
        //         }
        //         //quality值越小，所绘制的图形越模糊,压缩后的base64
        //         let base64 = canvas.toDataURL('image/jpeg', quality)
        //         // callback(base64)

        //         //base64转file文件
        //         let arr = base64.split(',')
        //         let mime = arr[0].match(/:(.*?);/)[1]
        //         let bstr = atob(arr[1])
        //         let n = bstr.length
        //         let u8arr = new Uint8Array(n)
        //         while(n--) {
        //             u8arr[n] = bstr.charCodeAt(n)
        //         }
        //         //转成file
        //         let files = new window.File([new Blob([u8arr], {type: mime})], 'image/jpeg', {type: 'image/jpeg'})
        //         callback(files)
        //     }
        // }
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
</style>