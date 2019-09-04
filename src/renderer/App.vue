<template>
  <div id="app">
    <el-container>
      <el-header style="-webkit-app-region: drag">
        <Header @change-collapse='onChangeCollapse'/>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <Sidebar />
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
export default {
  data(){
    return{
      collapse:true
    }
  },
  components: {
    Sidebar,
    Header
  },
  methods:{
    onChangeCollapse(){
      
    }
  }
};
</script>

<style>
@import "./assets/css/reset.css";
@import './assets/fonts/iconfont.css';
</style>