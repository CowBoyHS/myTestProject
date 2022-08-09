<template>
    <div>
        <router-view/>
    </div>
</template>

<style>

</style>
<script>
    import Header from "@/components/Header";
    import Aside from "@/components/Aside";
    import Layout from "@/layout/Layout";
    export default {
        components: {Layout, Aside, Header}
    }
</script>