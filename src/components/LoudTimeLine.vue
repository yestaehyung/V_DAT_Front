<template>
  <div id="container0">
    <div id="example0"></div>
  </div>
</template>

<script>
import { loadGoogleCharts, GChart } from "vue-google-charts";

export default {
  components: {
    GChart,
  },
  data: function() {
    return {};
  },
  computed: {
    voice() {
      return this.$store.getters.getVoice;
    },
  },
  methods: {
    drawGraph() {
      loadGoogleCharts("current", { packages: ["timeline"] }).then((google) => {
        var container = document.getElementById("container0");
        var example = document.getElementById("example0");
        var chart = new google.visualization.Timeline(example);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: "string", id: "Term" });
        dataTable.addColumn({ type: "string", id: "Category" });
        dataTable.addColumn({ type: "date", id: "Start" });
        dataTable.addColumn({ type: "date", id: "End" });

        // console.log(l);
        // for (let i = 0; i < this.voice.user.length; i++) {
        //   var tableList = [];
        //   tableList.push("1", String(this.voice.class[i]), new Date(this.voice.user[i][0]), new Date(this.voice.user[i][1]));
        //   // console.log(tableList);
        //   dataTable.addRows([tableList]);
        // }

        // chart.draw(dataTable, chartOption);
      });
    },
  },
  watch: {},
  mounted() {
    this.drawGraph();
  },
};
</script>

<style scoped>
#container0 {
  position: relative;
  height: 35px;
  /* left: 3%; */
  margin-top: 50px;
  /* padding: 1rem; */
  z-index: 1;
}

#example0 {
  /* margin: 100px 0; */
}
</style>
