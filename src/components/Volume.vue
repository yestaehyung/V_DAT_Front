<template>
  <!-- <div id="container4"> -->
  <div id="example4"></div>
  <!-- </div> -->
</template>

<script>
import { loadGoogleCharts } from "vue-google-charts";

export default {
  data: function() {
    return {};
  },
  computed: {
    voice() {
      return this.$store.getters.getVoice;
    },
    sensor() {
      return this.$store.getters.getSensor;
    },
    anomaly() {
      return this.$store.getters.getAnomaly;
    },
  },
  methods: {
    drawGraph() {
      loadGoogleCharts("current", { packages: ["corechart", "line"] }).then((google) => {
        // var container = document.getElementById("container4");
        var example4 = document.getElementById("example4");
        var chart = new google.visualization.LineChart(example4);
        var dataTable = new google.visualization.DataTable();

        let x = new Array();
        x.push(["Time", "low", "high", "volume", { type: "string", role: "style" }]);

        let goodPoint = "point { size: 3; shape-type: circle; fill-color: #603913; }";
        let highPoint = "point { size: 8; shape-type: star; fill-color: #603913; }";
        let lowPoint = "point { size: 8; shape-type: star; fill-color: #603913; }";

        for (let i = 0; i < this.anomaly["volume"]["volumes"].length; i++) {
          let t = parseInt(this.anomaly["volume"]["talk"][i][0] / 1000);
          let v = parseFloat(this.anomaly["volume"]["volumes"][i]);
          let p = null;
          if (v >= -15) {
            p = highPoint;
          } else if (v <= -35) {
            p = lowPoint;
          } else {
            p = goodPoint;
          }
          x.push([String(t), -35, -15, v, p]);
        }

        var data = google.visualization.arrayToDataTable(x);
        var options = {
          // width: "120%",
          height: 350,
          legend: {
            position: "top",
          },
          chartArea: {
            width: 500,
          },
          series: {
            0: {
              lineWidth: 1,
              lineDashStyle: [10, 2],
              color: "red",
            },
            1: {
              lineWidth: 1,
              lineDashStyle: [10, 2],
              color: "blue",
            },
            2: {
              lineWidth: 4,
              color: "#f1ca3a",
            },
          },
          // colors: ["blue"],
          pointSize: 0.5,
          dataOpacity: 7,
          crosshair: {
            trigger: "both",
            orientation: "vertical",
          },
        };

        chart.draw(data, options);
      });
    },
  },
  mounted() {
    this.drawGraph();
  },
};
</script>

<style scoped>
#container4 {
  /* position: absolute; */
  width: 100%;

  height: 250px;
  z-index: 0;
}
#example4 {
  /* position: relative; */
  /* margin: 5% 0; */
  /* width: 100%; */
  /* height: 300px; */
}
</style>
