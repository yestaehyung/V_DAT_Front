<template>
  <div id="container5">
    <div id="example7"></div>
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
        var example7 = document.getElementById("example7");
        var chart = new google.visualization.LineChart(example7);
        var dataTable = new google.visualization.DataTable();

        // dataTable.addColumn("number", "Day");
        // dataTable.addColumn("number", "x");

        // let x = new Array();

        // for (let i = 0; i < this.anomaly["timestamp"].length; i++) {
        //   x.push([i, parseFloat(this.anomaly["value"][i])]);
        // }
        // dataTable.addRows(x);
        let point = "point { size: 10; shape-type: star; fill-color: #FF00CC; }";

        let x = new Array();

        x.push(["Day", "심장 박동", { type: "string", role: "style" }]);
        for (let i = 0; i < this.anomaly["timestamp"].length; i++) {
          let p = null;
          let value = parseInt(this.anomaly["hr"]["value"][i]);
          if (this.anomaly["hr"]["point"][i] == true) {
            p = point;
          }
          x.push([i, value, p]);
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
          series: {
            0: {
              lineWidth: 3,
              color: "#572a1a",
            },
          },
          pointSize: 1,
          dataOpacity: 1,
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
