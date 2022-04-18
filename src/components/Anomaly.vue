<template>
  <div>
    <div class="cardbox-wrapper">
      <h4>같이 확인해 볼까요</h4>
      <b-card-text>아래 표시된 시간을 눌러 확인해 봅시다</b-card-text>
      <b-card-group>
        <b-card header-tag="header" img-src="" img-alt="Card image" img-top>
          <template #header>
            <h6 class="mb-0">이 시간에 긴장 했어요</h6>
          </template>
          <div>
            <h5>체험하는 동안 {{ sensor[0]["anomalyList"].length }}번 긴장했어요</h5>
            <h6>긴장한 시점:</h6>
          </div>
          <div class="timestamp-wrapper">
            <div class="timestamp" v-for="(value, index) in sensor[0]['anomalyList']" v-bind:key="index">
              <b-link class="link" @click.native="moveToAnomaly(10, value)">{{ value - 10 }} ~ {{ value }}</b-link
              >초
            </div>
          </div>
        </b-card>
      </b-card-group>
      <b-card header-tag="header" img-src="" img-alt="Card image" img-top>
        <template #header>
          <h6 class="mb-0">목소리는 이랬어요</h6>
        </template>
        <div>
          <h5 style="margin-top: 10px">목소리가 {{ voice["high"].length }}번 컸어요</h5>
          <div class="timestamp-wrapper">
            <div class="timestamp" v-for="(value, index) in voice['high']" v-bind:key="index">
              <b-link class="link" @click.native="moveToAnomaly(3, value)">{{ value - 3 }} ~ {{ value }}</b-link>
            </div>
          </div>
          <h5 style="margin-top: 10px">목소리가 {{ voice["low"].length }}번 작았어요</h5>
          <div class="timestamp-wrapper">
            <div class="timestamp" v-for="(value, index) in voice['low']" v-bind:key="index">
              <b-link class="link" @click.native="moveToAnomaly(3, value)">{{ value - 3 }} ~ {{ value }}</b-link>
            </div>
          </div>
          <h5 style="margin-top: 10px">이 때는 목소리가 적절했어요</h5>
          <div class="timestamp-wrapper">
            <div class="timestamp" v-for="(value, index) in voice['good']" v-bind:key="index">
              <b-link class="link" @click.native="moveToAnomaly(3, value)">{{ value - 3 }} ~ {{ value }}</b-link>
            </div>
          </div>
        </div>

        <Voice></Voice>
      </b-card>
      <b-card header-tag="header" img-src="" img-alt="Card image" img-top>
        <template #header>
          <h6 class="mb-0">어딜 봤나요</h6>
        </template>

        <h5>손님을 잘 봤어요</h5>
        <div class="timestamp-wrapper">
          <div class="timestamp" v-for="(value, index) in eye[1]" v-bind:key="index">
            <b-link class="link" @click.native="moveToAnomaly(0, value[0])">{{ value[0] }} ~ {{ value[1] }}</b-link>
          </div>
        </div>
        <h5 style="margin-top: 10px">동료를 잘 봤어요</h5>
        <div class="timstamp-wrapper">
          <div class="timestamp" v-for="(value, index) in eye[0]" v-bind:key="index">
            <b-link class="link" @click.native="moveToAnomaly(0, value[0])">{{ value[0] }} ~ {{ value[1] }}</b-link>
          </div>
        </div>

        <Eye></Eye>
      </b-card>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import Voice from "./Volume.vue";
import Eye from "./ConflictTimeLine.vue";

export default {
  components: { Voice, Eye },
  props: {
    maxTime: null,
  },
  data() {
    return {
      eye: null,
      voice: {
        high: [],
        low: [],
        good: [],
      },
      sensor: [
        {
          name: "anomaly",
          anomalyList: null,
        },
      ],
    };
  },
  computed: {
    anomaly() {
      return this.$store.getters.getAnomaly;
    },
  },

  methods: {
    moveToAnomaly(thr, value) {
      value = parseInt(value) - thr;
      if (value != NaN) {
        this.$emit("moveToAnomaly", value);
      }
    },
    gotTotalTime(time) {
      this.maxTime = time;
    },
    timeSync(time) {
      this.controlledTime = time;
    },
    mouseUp(e) {
      this.changedTime = parseInt(e.target.value);
      this.$refs.videoPlayer.player.play();
    },
    pause() {
      this.$refs.videoPlayer.player.pause();
    },
    makeChunk(thr, data) {
      for (let i = 0; i < data.length; i++) {
        let value = data[i];
        data[i] = value + thr;

        if (i > 0) {
          if (data[i - 1] >= value) {
            data[i] = data[i - 1];
          }
        }
      }
      return [...new Set(data)];
    },
  },
  beforeMount() {
    let a = this.anomaly["anomaly"].slice();
    this.eye = this.anomaly["eye"].slice();

    for (let i = 0; i < this.anomaly["volume"]["value"].length; i++) {
      let value = this.anomaly["volume"]["value"][i];
      let nextValue = this.anomaly["volume"]["value"][i + 1];
      if (value < -50) continue;
      else if ((value >= -15) & (nextValue < -15)) this.voice["high"].push(parseInt(i / 10));
      else if ((value > -35) & (value < -15)) this.voice["good"].push(parseInt(i / 10));
      else if (value < -35) this.voice["low"].push(parseInt(i / 10));
    }
    this.voice["low"] = [...new Set(this.voice["low"])];
    for (let i = 0; i < this.voice["low"].length - 3; i += 3) {
      let value = this.voice["low"][i];
      let a = new Array();
      a.push(this.anomaly["volume"]["value"][value], this.anomaly["volume"]["value"][value + 1], this.anomaly["volume"]["value"][value + 2]);
      console.log(a);
      let small = a.every(function(v) {
        if (v < -30) return false;
        return true;
      });

      if (small === true) delete this.voice[i];
    }
    this.voice["low"] = this.makeChunk(3, this.voice["low"]);
    this.voice["high"] = this.makeChunk(3, this.voice["high"]);
    this.voice["good"] = this.makeChunk(3, this.voice["good"]);

    this.sensor[0]["anomalyList"] = this.makeChunk(5, a);
  },
};
</script>

<style scoped>
/* h4 {
  font: 2em sans-serif;
} */

.cardbox-wrapper {
  /* border: solid; */
}

.card {
  /* border: solid; */
  /* height: 150px; */
  margin-bottom: 15px;
}
.card-body {
  display: inline-flex;
  /* border: solid; */
  flex-direction: column;
  /* flex-flow: row wrap; */
  padding: 10px;
}

.show {
  width: 100%;
}
.timestamp-wrapper {
  display: flex;
  flex-wrap: wrap;
  /* border: solid; */
}

.timestamp {
  /* border: solid; */
  margin: 5px 10px;
}

.link {
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 1px 2px;
  /* margin: 1px 2px; */
}
</style>
