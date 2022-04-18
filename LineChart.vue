<template>
  <div class="ani1">
    <svg width="100%" height="100%" viewBox="0 0 800 330" ref="svg"
         preserveAspectRatio="xMidYMid meet">
      <g class='lineChart' v-bind:transform="translate">
        <axis class='yA' v-bind:scales="getScales().yAxis" v-bind:chartDefaults='chartDefaults' v-bind:data='data'
              v-bind:trns='trnsY'/>
        <axis class='xA' v-bind:scales="getScales().xAxis" v-bind:chartDefaults='chartDefaults' v-bind:data='data'
              v-bind:trns='trnsX()'/>
        <axis class='grid' v-bind:scales="getScales().yGrid" v-bind:chartDefaults='chartDefaults' v-bind:data='data'
              v-bind:trns='trnsY' v-bind:style="{opacity: chartDefaults.gridOpacity}"/>
        <path class='line' :d="line"/>
      </g>

    </svg>

    <p class='text'> {{ chartDefaults.title }}</p>
  </div>
</template>

<script>
import * as d3 from "d3";
import Axis from "./Axis";

export default {
  name: "LineChart",
  components: {
    axis: Axis // Using reusable component to draw x,y axis and Grid.
  },
  props:{
    raw: {
      type: Array,
      default: null
    },
  },
  data() {
    return {
      data:[],
      chartDefaults: {
        width: 800,
        height: 300,
        chartId: "linechart-vue",
        title: "",
        margin: {
          top: 5,
          right: 5,
          bottom: 15,
          left: 50
        },
        gridOpacity: 1,
        data: []
      },
      zoom: {
        x: 40,	// Translate를 위한 X좌표 초기값
        y: 0,		// Translate를 위한 Y좌표 초기값
        k: 1 		// Scale 초기값
      },
      line: "",
      //Translate co-ords for chart, x axis and yaxis. This is injected into template
      translate: "translate(50,5)",
      // translate: "translate(" + 50 + "," + 5 + ")",
      trnsY: "translate(0,0)",
      trnsX: this.getTrnsx,
      toggleClass: true
    };
  },
  mounted() {
    var scale = {};
    //Kick off drawing chart once component is mounted
    this.calculatePath();
    this.setZoom()


  },
  beforeMount() {
    this.raw.forEach(item =>{
      this.data.push({
        data:item.data,
        timer:item.timer
      })

    })
  },
  methods: {
    setZoom () {
      // zoom의 scale 범위, zoom 이벤트가 실행할 callback 등의 옵션을 정의한다.
      const zoom = d3.zoom().scaleExtent([1, 10]).on('zoom', this.onZoom)
      // selection을 $refs로 생성한다.
      const selection = d3.select(this.$refs.svg)

      selection.call(zoom)
    },
    onZoom () {
      // 1을 통해 d3.event에 할당되는 값을 확인한다.
      this.zoom.x = d3.event.transform.x
      this.zoom.y = d3.event.transform.y
      this.zoom.k = d3.event.transform.k

      this.translate = `translate(${this.zoom.x},${this.zoom.y})scale(${this.zoom.k})`
    },
    getScales() {
      // All the maths to work chart co ordinates and woring out Axis
      const x =d3.scaleLinear().domain([this.raw[0].timer, this.raw[this.raw.length-1].timer])
          .range([this.raw[0].timer, this.chartDefaults.width]);
      const y = d3
          .scaleLinear()
          .domain([
            d3.min(this.data, function (d) {
              return d.data - 0.5;
            }),
            d3.max(this.data, function (d) {
              return d.data + 0.5;
            })
          ])
          .range([this.chartDefaults.height, 100]);
          // .range([this.chartDefaults.height, -1]);
      d3.axisBottom().scale(x);
      d3.axisLeft().scale(y);

      var xAxis = d3
          .axisBottom()
          .scale(x)
          .ticks(10); //숫자클수록 x축 눈금 촘촘해짐

      var yAxis = d3
          .axisLeft()
          .scale(y)
          .ticks(4);//숫자클수록 y축 눈금 촘촘해짐
      var yGrid = d3
          .axisLeft()
          .scale(y)
          .tickSize(-(this.chartDefaults.width ), 0, 0)
          .tickFormat("");
      // Return the key calculations and functions to draw the chart
      return {
        x,
        y,
        xAxis,
        yAxis,
        yGrid
      };
    },
    getTrnsx(chartDefaults) {
      //works out translate value in realtive to dynamic height
      const t = "translate(0," + this.chartDefaults.height + ")";
      return t;
    },
    calculatePath() {
      //Get key calculation funtions to draw chart , Ie scale, axis mapping and plotting
      const scale = this.getScales();
      // Define calcultion to draw chart
      const path = d3
          .line()
          .x(d => {
            return scale.x(d.timer);
          })
          .y(d => {
            return scale.y(d.data);
          })
          .curve(d3.curveCardinal);

      // draw line then this.line is injected into the template
      this.line = path(this.data);
    },

  }
};
</script>
<style>

path.line {
  fill: none;
  stroke: #ecbc3a;
  stroke-width: 3px;
}

.grid line {
  opacity: 0.05;
}

.xA line {
  opacity: 0.5;
}

/*Some fancy animation to draw chart*/
svg .lineChart > path {
  stroke: #ecbc3a;
  stroke-width: 3;
  stroke-dasharray: 4813.713;
  stroke-dashoffset: 4813.713;
  -webkit-animation-name: draw2;
  animation-name: draw2;
  /*-webkit-animation-duration: 0s;*/
  /*animation-duration: 0s;*/
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

.ani2 svg .lineChart > path {
  stroke: #ecbc3a;
  -webkit-animation-name: draw-2;
  animation-name: draw-2;
}

.ani1 svg .lineChart > path {
  stroke: #ecbc3a;
  /*-webkit-animation-name: draw;*/
  animation-name: draw;
}

#Layer_1 {
  width: 100%;
}

@-webkit-keyframes draw {
  85% {
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes draw {
  85% {
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@-webkit-keyframes draw-2 {
  85% {
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes draw-2 {
  85% {
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.text {
  display: inline-block;
  font-size: 3vw;
  margin: 0.5vw 0 1.5vw;
}

</style>
