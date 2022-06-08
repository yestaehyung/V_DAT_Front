<template>
  <div id="container6">
    <div id="example8"></div>
  </div>
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
      loadGoogleCharts("current", { packages: ["corechart"] }).then((google) => {
        var container = document.getElementById("container5");
        let example8 = document.getElementById("example8");
        var chart = new google.visualization.LineChart(example8);
        var dataTable = new google.visualization.DataTable();

        let point = "point { size: 10; shape-type: star; fill-color: blue; }";
        let x = new Array();
        x.push(["Day", "IBI", { type: "string", role: "style" }]);
        for (let i = 0; i < this.anomaly["timestamp"].length; i++) {
          let p = null;

          if (this.anomaly["ibi"]["point"][i] == true) {
            p = point;
          }
          x.push([i, parseFloat(this.anomaly["ibi"]["value"][i]), p]);
        }

        var data = google.visualization.arrayToDataTable(x);

        var option1 = {
          width: "100%",
          hAxis: {
            // title: "Time",
            textPosition: "none",
          },
          vAxis: {
            // title: "X",
            // ticks: [-1, 0, 1],
          },
          legend: {
            position: "top",
          },
          curveType: "function",
          explorer: {
            actions: ["dragToZoom", "rightClickToReset"],
          },
          axisTitlePosition: "none",
          chartArea: {
            left: 30,
            right: 30,
            // bottom: 30,
          },
          colors: ["red"],
          pointSize: 5,
        };

        chart.draw(data, option1);
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
  position: relative;
  width: 100%;

  /* height: 200px; */
  z-index: 0;
}
#example4 {
  /* margin: 5% 0; */
  /* width: 100%; */
  /* height: 135px; */
}
</style>
