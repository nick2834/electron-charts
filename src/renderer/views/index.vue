<template>
  <div :style="{height:'calc(100vh - 60px)',width:'100%'}" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import "echarts-gl";
import { baseJson } from "@/api/base";
import resize from "./mixins/resize";
function getAirportCoord(idx) {
  return [baseJson.airports[idx][3], baseJson.airports[idx][4]];
}
var routes = baseJson.routes.map(function(airline) {
  return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
});
export default {
  mixins: [resize],
  data() {
    return {
      chart: null,
      world_front: require("@/assets/images/world_front.jpg"),
      world_back: require("@/assets/images/world_back.jpg"),
      loadingOption: {
        text: "获取数据中",
        color: "#c23531",
        textColor: "#fff",
        maskColor: "rgba(0, 0, 0, 0.8)",
        zlevel: 0
      }
    };
  },
  methods: {
    setOptions() {
      this.chart.setOption({
        backgroundColor: "#000",
        globe: {
          baseTexture: this.world_front,
          heightTexture: this.world_back,
          shading: "lambert",
          light: {
            ambient: {
              intensity: 0.4
            },
            main: {
              intensity: 0.4
            }
          },
          viewControl: {
            autoRotate: false
          }
        },
        series: {
          type: "lines3D",
          coordinateSystem: "globe",
          blendMode: "lighter",
          lineStyle: {
            width: 1,
            color: "rgb(50, 50, 150)",
            opacity: 0.1
          },
          data: routes
        }
      });
      this.chart.on('rendered',() =>{
        this.chart.hideLoading();
      })
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(this.$el);
      this.chart.showLoading(this.loadingOption);
      this.setOptions();
    });
  }
};
</script>
