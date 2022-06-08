<template>
  <div id="container1">
    <div id="example1"></div>
  </div>
</template>

<script>
import { loadGoogleCharts } from "vue-google-charts";
import { eventBus } from "../main.js";

export default {
  components: {},
  data: function() {
    return {
      intervalId: null,
      maxTime: null,
    };
  },
  computed: {
    voice() {
      return this.$store.getters.getVoice;
    },
    anomaly() {
      return this.$store.getters.getAnomaly;
    },
  },
  methods: {
    deleteOverlap(test) {
      test.parentNode.removeChild(test);
    },
    drawGraph() {
      loadGoogleCharts("current", { packages: ["timeline"] }).then((google) => {
        var container = document.getElementById("container1");
        var example = document.getElementById("example1");
        var chart = new google.visualization.Timeline(example);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: "string", id: "Position" });
        dataTable.addColumn({ type: "date", id: "Start" });
        dataTable.addColumn({ type: "date", id: "End" });

        let x = new Array();
        let coworker = this.anomaly["vr"][0];
        let guest = this.anomaly["vr"][1];
        let none = this.anomaly["vr"][2];

        let eyeCoworker = this.anomaly["eye"][0];
        let eyeGuest = this.anomaly["eye"][1];
        let eyeNone = this.anomaly["eye"][2];

        for (let i of coworker) {
          x.push(["봐야해요", "동료", new Date(i[0] * 1000), new Date(i[i.length - 1] * 1000)]);
        }

        for (let i of guest) {
          x.push(["봐야해요", "손님", new Date(i[0] * 1000), new Date(i[i.length - 1] * 1000)]);
        }

        // for (let i of none) {
        //   x.push(["봐야해요", "안봄", new Date(i[0] * 1000), new Date(i[i.length - 1] * 1000)]);
        // }

        for (let i of eyeCoworker) {
          x.push(["봤어요", "동료", new Date(i[0] * 1000), new Date(i[i.length - 1] * 1000)]);
        }
        for (let i of eyeGuest) {
          x.push(["봤어요", "손님", new Date(i[0] * 1000), new Date(i[i.length - 1] * 1000)]);
        }
        // for (let i of eyeNone) {
        //   x.push(["봤어요", "안봄", new Date(i[0] * 1000), new Date(i[i.length - 1] * 1000)]);
        // }

        var data = google.visualization.arrayToDataTable(x);

        // google.visualization.events.addListener(chart, "ready", function() {
        //   var incrementBy;
        //   var valueCurrent;
        //   var valueLast;
        //   var labelIndex = 0;
        //   var labels = container.getElementsByTagName("text");

        //   Array.prototype.forEach.call(labels, function(label) {
        //     // find x-axis labels by fill attribute
        //     // make sure rect is a background row
        //     var rects = container.getElementsByTagName("rect");
        //     Array.prototype.forEach.call(rects, function(rect) {
        //       // // remove border
        //       // if (rect.getAttribute("stroke") === "#9a9a9a") {
        //       //   rect.setAttribute("stroke-width", "0");
        //       // }
        //       // make sure rect is a background row
        //       if (rect.getAttribute("x") === "0" && rect.getAttribute("stroke") === "none") {
        //         // determine existing color
        //         if (rect.getAttribute("fill") === "#ffffff") {
        //           rect.setAttribute("fill", "white");
        //         } else {
        //           rect.setAttribute("fill", "white");
        //         }
        //       }
        //     });
        //     var paths = container.getElementsByTagName("path");
        //     // remove border
        //     Array.prototype.forEach.call(paths, function(path) {
        //       if (path.getAttribute("stroke") === "#ffffff" || path.getAttribute("stroke") === "#e6e6e6") {
        //         path.setAttribute("stroke", "#F0F0F0");
        //       }
        //     });

        //     if (label.getAttribute("fill") === "#000000") {
        //       label.setAttribute("fill", "#ffffff");
        //       valueCurrent = parseInt(label.textContent);
        //       if (labelIndex === 1) {
        //         incrementBy = valueCurrent - valueLast;
        //       }

        //       if (labelIndex > 0) {
        //         if (valueCurrent < valueLast) {
        //           valueCurrent = valueLast + incrementBy;
        //           label.textContent = valueCurrent;
        //         }
        //       }

        //       valueLast = valueCurrent;
        //       labelIndex++;
        //     }
        //   });
        // });
        var chartOption = {
          timeline: {
            // groupByRowLabel: true,
            // showRowLabels: false,
            // showBarLabels: false,
          },
          height: 150,
          alternatingRowStyle: false,

          width: "100%",
          hAxis: {
            minValue: 0,
            // maxValue: 260000,
          },
        };

        chart.draw(data, chartOption);

        // var container = document.getElementById("container1");
        // var rects = document.querySelectorAll("rect");

        // let blue = new Array();
        // let red = new Array();

        // for (var value of rects) {
        //   if (value.getAttribute("fill") == "#4285f4") {
        //     blue.push(value);
        //   } else if (value.getAttribute("fill") == "#db4437") {
        //     red.push(value);
        //   }
        // }
        // for (let down of red) {
        //   // console.log(down);
        //   let downStart = parseFloat(down.getAttribute("x"), 10);
        //   let downWidth = parseFloat(down.getAttribute("width"), 10);
        //   let test = document.createElement("div");

        //   for (let up of blue) {
        //     let upStart = parseFloat(up.getAttribute("x"), 10);
        //     let upWidth = parseFloat(up.getAttribute("width"), 10);
        //     if (downStart < upStart + upWidth && downStart > upStart) {
        //       let width = upWidth + upStart - downStart;
        //       test.style.width = `${width}px`;
        //       test.style.height = "60px";
        //       test.style.backgroundColor = "#fbcc02";
        //       test.style.position = "absolute";
        //       test.style.opacity = "0.8";
        //       test.style.borderRadius = "3px";
        //       test.style.top = "10px";
        //       test.style.transform = `translateX(${downStart}px)`;
        //       // console.log(test);
        //     }
        //     container.appendChild(test);
        //   }
        // }
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

<style>
#container1 {
  position: relative;
  /* left: 3%; */
  /* display: flex; */
  width: 100%;
  /* flex-direction: column; */
  /* align-content: center; */

  /* height: 69px; */
  /* margin-top: 50px; */
}
#example1 {
  /* margin: 5% 0; */
  width: 100%;
  /* height: 135px; */
}
</style>
