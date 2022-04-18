<template>
  <div id="container3">
    <div id="example3"></div>
  </div>
</template>

<script>
import { loadGoogleCharts } from "vue-google-charts";

export default {
  data: function() {
    return {
      mustSee: [
        {
          objectName: "동료 얼굴",
          start: 0,
          end: 15000,
        },
        {
          objectName: "손님 얼굴",
          start: 17000,
          end: 35000,
        },
        {
          objectName: "메뉴판",
          start: 38000,
          end: 47000,
        },
        {
          objectName: "손님 얼굴",
          start: 50000,
          end: 65000,
        },
      ],
      see: [
        {
          objectName: "동료 얼굴",
          start: 10000,
          end: 20000,
        },
        {
          objectName: "손님 얼굴",
          start: 25000,
          end: 30000,
        },
        {
          objectName: "메뉴판",
          start: 43000,
          end: 47000,
        },
        {
          objectName: "손님 얼굴",
          start: 60000,
          end: 65000,
        },
      ],
    };
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
        var container = document.getElementById("container3");
        let example3 = document.getElementById("example3");
        // var chart = new google.charts.Line(example3);
        var chart = new google.visualization.SteppedAreaChart(example3);
        var dataTable = new google.visualization.DataTable();

        let x = new Array();
        x.push(["see", "사용자가 본 것", "봐야하는 것"]);

        for (let i = 0; i < this.anomaly["eye"].length; i++) {
          let p = null;
          if (this.anomaly["eye"][i] == 1) {
            p = "Guest";
          } else {
            p = "";
          }
          console.log(this.anomaly["eye"][i]);
          x.push([p, this.anomaly["eye"][i], this.anomaly["vr"][i]]);
        }

        var data = google.visualization.arrayToDataTable(x);

        var option1 = {
          width: "100%",
          hAxis: {
            // title: "Time",
            // textPosition: "none",
          },
          vAxis: {
            // title: "X",
            // ticks: [-1, 0, 1],
          },
          legend: {
            position: "top",
          },
          explorer: {
            actions: ["dragToZoom", "rightClickToReset"],
          },
          chartArea: {
            left: 30,
            right: 30,
            // bottom: 30,
          },
          colors: ["red", "blue"],
        };

        chart.draw(data, option1);
      });
      // loadGoogleCharts("current", { packages: ["timeline"] }).then((google) => {
      //   var container = document.getElementById("container3");
      //   var example = document.getElementById("example3");
      //   var chart = new google.visualization.Timeline(example);
      //   var dataTable = new google.visualization.DataTable();
      //   dataTable.addColumn({ type: "string", id: "Position" });
      //   dataTable.addColumn({ type: "string", id: "Name" });
      //   dataTable.addColumn({ type: "date", id: "Start" });
      //   dataTable.addColumn({ type: "date", id: "End" });
      //   for (let j = 0; j < this.mustSee.length; j++) {
      //     var mList = [];
      //     mList.push("봐야 해요", this.mustSee[j].objectName, new Date(this.mustSee[j].start), new Date(this.mustSee[j].end));
      //     dataTable.addRows([mList]);
      //   }
      //   console.log(this.anomaly);
      //   for (let j = 0; j < this.see.length; j++) {
      //     var mList = [];
      //     mList.push("봤어요", this.see[j].objectName, new Date(this.see[j].start), new Date(this.see[j].end));
      //     dataTable.addRows([mList]);
      //   }
      //   var chartOption = {
      //     timeline: {
      //       groupByRowLabel: true,
      //       // showRowLabels: false,
      //       // showBarLabels: false,
      //     },
      //     height: 150,
      //     width: "100%",
      //     hAxis: {
      //       minValue: 0,
      //       // maxValue: 260000,
      //     },
      //   };
      //   chart.draw(dataTable, chartOption);
      // });
    },
  },
  mounted() {
    this.drawGraph();
  },
};
</script>

<style scoped>
#container3 {
  position: relative;
  width: 100%;
  /* height: 200px; */
  z-index: 0;
}
#example3 {
  /* margin: 5% 0; */
  /* width: 100%; */
  /* height: 135px; */
}
</style>
