<template>
  <el-menu
    :default-active="$route.path"
    router
  >
    <el-menu-item
      :index="item.path"
      v-for="(item,index) in menuRouter"
      :key="index"
      @click="switchBucket(item)"
    >
      <i class="icon"></i>
      <span slot="title">{{item.meta.title}}</span>
      <!-- <i class="el-icon-delete delete" @click.stop.prevent="beforeDelete(item)"></i> -->
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuRouter: []
    };
  },
  methods: {
    deepCopy(obj) {
      if (typeof obj !== "object") return;
      var newObj = obj instanceof Array ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] =
            typeof obj[key] === "object" ? this.deepCopy(obj[key]) : obj[key];
        }
      }
      return newObj;
    },
    switchBucket(data) {
      // console.log(data);
    }
  },
  mounted() {
    const baseRoute = this.$router.options.routes;
    var cloneRoute = this.deepCopy(baseRoute);
    this.menuRouter = cloneRoute.filter(item => !item.hidden);
  }
};
</script>

<style lang="scss" scoped>
.delete {
  position: absolute;
  right: 0;
  top: 12px;
  color: #f36d6e;
}
span {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  display: inline-block;
  width: 130px;
}
.icon {
  background: url("../assets/data.png") no-repeat;
  width: 18px;
  height: 18px;
  background-size: contain;
  display: inline-block;
  margin-right: 5px;
}
</style>
