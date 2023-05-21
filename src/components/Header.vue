<template>
    <div class="Header">
        <div class="logo-header">
            <img src="../assets/logo.png" alt="logo">
        </div>
        <div class="web-title">
            <p>广东省航空邮件处理中心</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Header',
    data () {
        return {

        }
    }
}
</script>
<style scoped>
.logo-header >  img {
    width: 188px;
    height: 60px;
}

.web-title > p {
    text-align: center;
    font-weight: bold;
    font-size: 22px;
}

</style>