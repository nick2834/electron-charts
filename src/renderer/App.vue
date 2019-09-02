<template>
  <div id="app">
    <el-container>
      <el-header style="-webkit-app-region: drag">
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SidebarItem />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SidebarItem from "@/components/SidebarItem";
export default {
  name: "qiniu",
  components: {
    SidebarItem,
    Header
  }
};
</script>

<style>
@import "./assets/css/reset.css";
</style>