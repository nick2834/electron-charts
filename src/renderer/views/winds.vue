<!-- Flow GL -->
<template>
  <div :style="{height:'calc(100vh - 60px)',width:'100%'}" ref="myEchart"></div>
</template>

<script>
import echarts from "echarts";
import http from "@/service/http";
const baseUrl =
  "https://echarts.apache.org/examples/data-gl/asset/data/winds.json";
import resize from "./mixins/resize";
import "echarts/map/js/world";
export default {
  mixins: [resize],
  data() {
    return {
      chart: null,
      windData: null,
      loadingOption: {
        text: "获取数据中",
        color: "#c23531",
        textColor: "#fff",
        maskColor: "rgba(0, 0, 0, 0.8)",
        zlevel: 0
      }
    };
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
      this.chart = echarts.init(this.$refs.myEchart);
      this.chart.showLoading(this.loadingOption);
      this.getData();
    });
  },
  methods: {
    getData() {
      http.get(baseUrl).then(({ data }) => {
        var windData = data;
        var p = 0;
        var maxMag = 0;
        var minMag = Infinity;
        var data = [];
        for (var j = 0; j < windData.ny; j++) {
          for (var i = 0; i < windData.nx; i++, p++) {
            var vx = windData.data[p][0];
            var vy = windData.data[p][1];
            var mag = Math.sqrt(vx * vx + vy * vy);
            // 数据是一个一维数组
            // [ [经度, 维度，向量经度方向的值，向量维度方向的值] ]
            data.push([
              (i / windData.nx) * 360 - 180,
              (j / windData.ny) * 180 - 90,
              vx,
              vy,
              mag
            ]);
            maxMag = Math.max(mag, maxMag);
            minMag = Math.min(mag, minMag);
          }
        }
        data.reverse();
        this.setOptions(maxMag, minMag, data);
      });
    },
    setOptions(maxMag, minMag, data) {
      this.chart.setOption({
        backgroundColor: "#333",
        visualMap: {
          left: "center",
          min: minMag,
          max: maxMag,
          dimension: 4,
          inRange: {
            // color: ['green', 'yellow', 'red']
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026"
            ]
          },
          calculable: true,
          textStyle: {
            color: "#fff"
          },
          orient: "horizontal"
        },
        geo: {
          map: "world",
          left: 0,
          right: 0,
          top: 0,
          zoom: 1,
          silent: true,
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#111"
            }
          }
        },
        series: {
          type: "custom",
          coordinateSystem: "geo",
          data: data,
          // silent: true,
          encode: {
            x: 0,
            y: 0
          },
          renderItem: function(params, api) {
            var x = api.value(0),
              y = api.value(1),
              dx = api.value(2),
              dy = api.value(3);
            var start = api.coord([
              Math.max(x - dx / 5, -180),
              Math.max(y - dy / 5, -90)
            ]);
            var end = api.coord([
              Math.min(x + dx / 5, 180),
              Math.min(y + dy / 5, 90)
            ]);
            return {
              type: "line",
              shape: {
                x1: start[0],
                y1: start[1],
                x2: end[0],
                y2: end[1]
              },
              style: {
                lineWidth: 0.5,
                stroke: api.visual("color")
              }
            };
          },
          progressive: 2000
        }
      });
      this.chart.on("rendered", () => {
        this.chart.hideLoading();
      });
    }
  }
};
</script>
<style scoped>
</style>