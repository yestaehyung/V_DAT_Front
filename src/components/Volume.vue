<template>
  <div id="container4">
    <div id="example4"></div>
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
        var container = document.getElementById("container4");
        var example4 = document.getElementById("example4");
        var chart = new google.visualization.LineChart(example4);
        var dataTable = new google.visualization.DataTable();

        let point = "point { size: 5; shape-type: star; fill-color: blue; }";
        let point2 = "point { size: 5; shape-type: star; fill-color: red; }";

        let x = new Array();
        x.push(["Day", "low", "high", "Db", { type: "string", role: "style" }]);

        for (let i = 0; i < this.anomaly["volume"]["timestamp"].length; i++) {
          let value = parseFloat(this.anomaly["volume"]["value"][i]);
          let nextValue = parseFloat(this.anomaly["volume"]["value"][i + 1]);

          let p = null;
          if ((value >= -15) & (nextValue < -15)) p = point;
          if ((value < -35) & (value > -50)) p = point2;

          if (value < -50) value = -50;
          x.push([i, -35, -15, value, p]);
        }

        var data = google.visualization.arrayToDataTable(x);

        var options = {
          width: "100%",
          hAxis: {
            // title: "Time",
            // textPosition: "none",
          },
          vAxis: {
            // ticks: [5, 10, 15, 20, 25, 30, 35, 40, 45],
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
          // colors: ["#222767", "#00B850", "#93E675", "#C000F5"],
          pointSize: 0.01,
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

  /* height: 200px; */
  z-index: 0;
}
#example4 {
  position: relative;
  /* margin: 5% 0; */
  /* width: 100%; */
  /* height: 135px; */
}
</style>
