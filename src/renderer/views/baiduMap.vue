<template>
  <baidu-map center="中国" :zoom="zoom" @ready="handler" class="map"></baidu-map>
</template>
<script>
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    }
  }
};
</script>
<style lang="scss" scope>
.map {
  width: 100%;
  height: 100vh;
}
</style>