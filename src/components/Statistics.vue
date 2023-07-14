<template>
    <div class="Statistics">
        <!-- <van-nav-bar title="统计" left-text="返回" left-arrow @click-left="onReturn"/> -->
        <van-nav-bar title="统计" />
        <div class="main">
            <van-tabs v-model="active" animated sticky @click="onTabsClick">
                <van-tab title="使用班组">
                    <div class="charts" ref="sybzCharts"></div>
                </van-tab>
                <van-tab title="实际位置">
                    <div class="charts" ref="sjwzCharts"></div>
                </van-tab>
                <van-tab title="盘点情况">
                    <div class="charts" ref="JnpdCharts"></div>
                </van-tab>
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
            if(index == 0){
                this.getGroupBySybzData()
            }else if (index == 1) {
                this.getGroupBySjwzData()
            }else{
                this.getGroupByJnpdData()
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
            this.loading()
            let chartData = []
            // 获取数据
            this.$axios.post('groupBySybz').then(res => {
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
                this.$toast.clear()
            }).catch(err => {
                console.log(err);
                //请求失败，使用默认数据
                chartData = [
                    {name: '数据1', value: 10},
                    {name: '数据2', value: 6},
                    {name: '数据3', value: 17},
                    {name: '数据4', value: 8},
                    {name: '数据5', value: 13},
                ]
                this.createBarCharts(chartData, "演示数据")
                this.$toast.clear()
            })
           
        },
        //构建饼形图
        createBarCharts(chartData, name) {
            this.sybzCharts = this.$echarts.init(this.$refs.sybzCharts)
            let option = {
                title: {
                    text: name,
                    left: 'center'
                },
                legend: {
                    left: 'left',
                    orient: 'vertical',
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
            this.loading()
            let xAxisData = []
            let yAxisData = []
            this.$axios.post('groupBySjwz').then(res => {
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
                this.createLineBarCharts(xAxisData, yAxisData, '实际位置数据', 'line', 'sjwzCharts')
                this.$toast.clear()
            }).catch(err => {
                console.log(err);
                //请求失败，使用默认数据
                xAxisData = ['数据1', '数据2', '数据3', '数据4', '数据5']
                yAxisData = ['11', '3', '6', '4', '16']
                this.createLineBarCharts(xAxisData, yAxisData, '演示数据', 'line', 'sjwzCharts')
                this.$toast.clear()
            })
        },
        //构建折线/柱状图
        createLineBarCharts(xAxisData, yAxisData, name, type, refs) {
            this.sjwzCharts = this.$echarts.init(this.$refs[refs])
            let option = {
                title: {
                    text: name,
                    left: 'center'
                },
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
                        type: type
                    }
                ]
            };
            option && this.sjwzCharts.setOption(option)
        },
        //获取今年盘点情况数据
        getGroupByJnpdData() {
            let xAxisData = ['已盘点', '未盘点']
            let yAxisData = []
            this.loading()
        
            this.$axios.post('groupByJnpd').then(res => {
                let data = res.data.data
                console.log(data);
                //对数据进行整理适应
                data.forEach((e) => {
                    
                    yAxisData.push(e.NUM)
                });
                this.createLineBarCharts(xAxisData, yAxisData, '今年盘点情况数据', 'bar', 'JnpdCharts')
                this.$toast.clear()
            }).catch(err => {
                console.log(err);
                //请求失败，使用默认数据
                yAxisData = ['11', '12']
                this.createLineBarCharts(xAxisData, yAxisData, '演示数据', 'bar', 'JnpdCharts')
                this.$toast.clear()
            })
        },
        //加载
        loading() {
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: false,  //是否禁止背景点击
                loadingType: 'spinner',  //	加载图标类型
                message: '加载中...',
            });
        }
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