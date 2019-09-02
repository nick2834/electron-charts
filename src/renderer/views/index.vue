<template>
  <div :style="{height:'100vh',width:'100%'}" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import "echarts-gl";
import { baseJson } from "@/api/base";
import resize from './mixins/resize'
function getAirportCoord(idx) {
  return [baseJson.airports[idx][3], baseJson.airports[idx][4]];
}
var routes = baseJson.routes.map(function(airline) {
  return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
});
export default {
  mixins:[resize],
  data() {
    return {
      chart: null,
      worldTopo: require("@/assets/images/world.topo.bathy.200401.jpg"),
      bathymetry_bw_composite_4k: require("@/assets/images/bathymetry_bw_composite_4k.jpg")
    };
  },
  methods: {
    setOptions() {
      this.chart.setOption({
        backgroundColor: "#000",
        globe: {
          baseTexture: this.worldTopo,
          heightTexture: this.bathymetry_bw_composite_4k,
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
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
    this.$nextTick(() => {
      this.setOptions();
    });
  }
};
</script>
