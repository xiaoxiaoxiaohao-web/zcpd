<template>
    <div class="Statistics">
        <!-- <van-nav-bar title="统计" left-text="返回" left-arrow @click-left="onReturn"/> -->
        <van-nav-bar title="统计" style="border-bottom: 1px solid black" />
        <div class="main">
            <van-tabs v-model="active" animated sticky @click="onTabsClick">
                <van-tab title="使用班组">
                    <div class="table">
                        <table border="1">
                            <tr>
                                <th v-for="(index) in thTitle" :key="index">{{index}}</th>
                            </tr>
                            <tr>
                                <td>January</td>
                                <td>$100</td>
                            </tr>
                        </table>
                    </div>
                    <div class="charts" ref="sybzCharts"></div>
                </van-tab>
                <van-tab title="实际位置">
                    <div class="charts" ref="sjwzCharts"></div>
                </van-tab>
                <van-tab title="标签 3">内容 3</van-tab>
                <van-tab title="标签 4">内容 4</van-tab>
            </van-tabs>
        </div>
        <Tabbar :TabbarActive="2"></Tabbar>
    </div>
</template>
<script>
import Tabbar from './Tabbar.vue'
export default {
    name: 'Statistics',
    data() {
        return {
            sybzCharts: '',
            sjwzCharts: '',
            active: 0,
            thTitle: ['ID', '资产编号', '资产盘点', '实际位置', '使用班组', '启动日期']
        }
    },
    components: {
        Tabbar
    },
    mounted() {
        this.getGroupBySybzData()
        this.getTableData()
    },
    watch: {
        
    },
    methods: {
        onReturn(){
            this.$router.go(-1)
        },
        onTabsClick(index, title) {
            console.log(index, title);
            if(index == 1){
                this.getGroupBySjwzData()
            }
        },
        //获取表格数据
        getTableData() {
            this.getData('list', "").then(res => {
                console.log(res);
                let data = res.data.data
            }).catch(err => {
                console.log(err);
            })
        },
        //获取使用班组数据
        getGroupBySybzData() {
            let chartData = []
            // 获取数据
            this.getData('groupBySybz', "").then(res => {
                let data = res.data.data
                //对数据进行整理适应
                data.forEach((e) => {
                    if(e.SYBZ == null) {
                        e.SYBZ = "空"
                    }
                    let newMap = {
                        name: e.SYBZ,
                        value: e.NUM
                    }
                    chartData.push(newMap)
                });
                this.createBarCharts(chartData, "使用班组")
            }).catch(err => {
                console.log(err);
            })
           
        },
        //构建饼形图
        createBarCharts(chartData, name) {
            this.sybzCharts = this.$echarts.init(this.$refs.sybzCharts)
            let option = {
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: name,
                        type: 'pie',
                        radius: [10, 100],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: chartData.length
                        },
                        data: chartData
                    }
                ]
            };

            option && this.sybzCharts.setOption(option);
        },
        //获取实际位置数据
        getGroupBySjwzData() {
            let xAxisData = []
            let yAxisData = []
            this.getData('groupBySjwz', "").then(res => {
                let data = res.data.data
                console.log(data);
                //对数据进行整理适应
                data.forEach((e) => {
                    if(e.SJWZ == null) {
                        e.SJWZ = "空"
                    }
                    xAxisData.push(e.SJWZ)
                    yAxisData.push(e.NUM)
                });
                this.createPolarBarCharts(xAxisData, yAxisData)
            }).catch(err => {
                console.log(err);
            })
        },
        //构建极坐标柱状图
        createPolarBarCharts(xAxisData, yAxisData) {
            this.sjwzCharts = this.$echarts.init(this.$refs.sjwzCharts)
            let option = {
                xAxis: {
                    type: 'category',
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: yAxisData,
                    type: 'line'
                    }
                ]
            };
            option && this.sjwzCharts.setOption(option)
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
/* .Statistics {
    width: 100%;
} */
.main {
    /* width: calc(100% - 2rem); */
    margin-top: 1rem;
}
.charts {
    height: 30rem;
    width: 100%;
}
.van-sidebar-item--select::before {
    background-color: #1eb467;
}
.van-nav-bar .van-icon {
    color: #1eb467 !important;
}
.van-nav-bar .van-nav-bar__text {
    color: #1eb467;
    z-index: 10000;
}
</style>