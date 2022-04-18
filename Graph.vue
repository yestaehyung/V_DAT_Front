<script>
import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    raw: {
      type: Array,
      default: null
    },
  },
  data: function () {
    return {
      chartdata: {
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: []
          }
        ]
      },
      options: {
        line: {
          fill: false
        },
        animation: {
          duration: 0 // general animation time
        },
        hover: {
          animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize

        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        plugins: {
          zoom: {
            // Container for pan options
            pan: {
              // Boolean to enable panning
              enabled: false,

              // Panning directions. Remove the appropriate direction to disable
              // Eg. 'y' would only allow panning in the y direction
              mode: 'x',
            },

            // Container for zoom options
            zoom: {
              // Boolean to enable zooming
              enabled: true,

              // Zooming directions. Remove the appropriate direction to disable
              // Eg. 'y' would only allow zooming in the y direction
              mode: 'x',
              // drag: true,
              speed: 100,
              sensitivity: -1,


            }
          }
        }
      }
    }
  },
  beforeMount() {
    console.log(this.raw)
    this.chartdata.datasets[0].data = []

    this.raw.forEach(item => {
      this.chartdata.datasets[0].data.push(item.data)
      this.chartdata.labels.push(item.timer)

    })
    console.log(this.chartdata.datasets[0].data.length)
  },
  mounted() {
    this.renderChart(this.chartdata, this.options)
    console.log(this.chartdata)
  }
}
</script>

<style>
</style>
