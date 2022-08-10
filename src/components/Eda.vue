<template>
  <div id="container2">
    <div id="example2"></div>
    <!-- <div id="heart"></div> -->
  </div>
</template>

<script>
import { loadGoogleCharts } from "vue-google-charts";
import { eventBus } from "../main.js";

export default {
  components: {},
  computed: {
    anomaly() {
      return this.$store.getters.getAnomaly;
    },
  },
  data: function() {
    return {};
  },
  methods: {
    drawGraph() {
      loadGoogleCharts("current", { packages: ["corechart"] }).then((google) => {
        var example = document.getElementById("example2");
        var chart = new google.visualization.LineChart(example);
        var dataTable = new google.visualization.DataTable();

        let point = "point { size: 10; shape-type: star; fill-color: #FF00CC; }";
        let x = new Array();
        x.push(["Day", "피부 전기 활동", { type: "string", role: "style" }]);

        for (let i = 0; i < this.anomaly["timestamp"].length; i++) {
          let p = null;
          if (this.anomaly["eda"]["point"][i] == true) {
            p = point;
          }
          x.push([i, parseFloat(this.anomaly["eda"]["value"][i]), p]);
        }

        var data = google.visualization.arrayToDataTable(x);

        var chartOption = {
          timeline: {
            groupByRowLabel: true,
            showRowLabels: false,
          },
          width: "100%",
          colors: ["#a50f15"],
          hAxis: {
            minValue: 0,
            maxValue: 260000,
          },
        };
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
          dataOpacity: 0.7,
        };

        chart.draw(data, option1);
      });
    },
  },
  watch: {},
  mounted() {
    this.drawGraph();
  },
  beforeDestroy() {},
};
</script>

<style scoped>
/* #container2 {
  position: relative;
  width: 100%;
} */

#example2 {
  /* margin: 2% 0; */
}
/* .verticalLine {
  border-left: 10px solid #000000;
} */
#heart {
}
</style>
