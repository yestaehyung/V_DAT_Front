<template>
  <div>
    <header>
      <NavBar />
    </header>
    <div class="content-wrapper">
      <div class="player-part">
        <Player
          ref="videoPlayer"
          v-if="fetched"
          :controlledTime="timeChanged"
          @timeSync="timeSync"
          :videoUrl="videoUrl"
          @gotTotalTime="gotTotalTime"
        />
      </div>
      <div class="verticalLine"></div>

      <div class="contents-part">
        <!-- <div class="button-parts">
            <b-button variant="dark" v-on:click="changeComponent(index)" v-for="(value, index) in menu" v-bind:key="index">{{
              value.title
            }}</b-button>
          </div> -->
        <div class="checkbox-parts">
          <div class="box">
            <b-form-checkbox v-model="selectAll" @change="select" size="sm" switch>Select All</b-form-checkbox>
          </div>

          <div class="box" v-for="(value, index) in menu.slice(0, 3)" v-bind:key="index">
            <b-form-checkbox size="sm" v-model="value.checked" switch>{{ value.title }}</b-form-checkbox>
          </div>
        </div>
        <div class="checkbox-parts">
          <div style="">긴장: <br /></div>
          <div class="box" v-for="(value, index) in menu.slice(3, 9)" v-bind:key="index">
            <b-form-checkbox size="sm" @click="showData" v-model="value.checked">{{ value.title }}</b-form-checkbox>
          </div>
        </div>
        <div>
          <div class="chart" v-if="menu[0].checked">
            <component @moveToAnomaly="timeChange" :is="'Anomaly'" :maxTime="maxTime"> </component>
            <b-form-input class="input-range" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" />
          </div>
          <div class="chart" v-if="menu[1].checked">
            <component :is="'Volume'"> </component>
            <!-- <b-form-input class="input-range" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" /> -->
          </div>
          <div class="chart" v-if="menu[2].checked">
            <component :is="'Conflict'"></component>
            <!-- <b-form-input class="input-range" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" /> -->
          </div>
          <div class="chart" v-if="menu[3].checked">
            <component :is="'BVP'"></component>
            <b-form-input class="input-range2" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" />
          </div>
          <div class="chart" v-if="menu[4].checked">
            <component :is="'TMP'"></component>
            <b-form-input class="input-range2" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" />
          </div>
          <div class="chart" v-if="menu[5].checked">
            <component :is="'HR'"></component>
            <b-form-input class="input-range2" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" />
          </div>
          <div class="chart" v-if="menu[6].checked">
            <component :is="'IBI'"></component>
            <b-form-input class="input-range2" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" />
          </div>
          <div class="chart" v-if="menu[7].checked">
            <component :is="'EDA'"></component>
            <b-form-input class="input-range2" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" />
          </div>
          <!-- <div class="chart" v-if="menu[8].checked">
            <component :is="'Loud'"></component>
            <b-form-input class="input-range2" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" />
          </div> -->
          <div class="chart" v-if="menu[8].checked">
            <component :is="'Conflict'"></component>
            <!-- <b-form-input class="input-range" @mousedown="pause" @mouseup="mouseUp" v-model="controlledTime" type="range" min="0" :max="maxTime" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Player from "@/components/Player.vue";
import { eventBus } from "../main.js";

export default {
  name: "Main",
  components: {
    NavBar,
    Player,
    Anomaly: () => import("../components/Anomaly.vue"),
    Volume: () => import("../components/Volume.vue"),
    HR: () => import("../components/HR.vue"),
    IBI: () => import("../components/IBI.vue"),
    Eye: () => import("../components/EyeTracker.vue"),
    EDA: () => import("../components/EdaTimeLine.vue"),
    BVP: () => import("../components/BVP.vue"),
    TMP: () => import("../components/TMP.vue"),
    Loud: () => import("../components/LoudTimeLine.vue"),
    Conflict: () => import("../components/ConflictTimeLine.vue"),
  },
  data() {
    return {
      componentKeys: null,
      videoUrl:
        "https://dt1amnyxy57si.cloudfront.net/videos/PilotStudy - C_1_1 - PC, Mac & Linux Standalone - Unity 2020.3.4f1 Personal _DX11_ 2022-04-01 19-39-57.mp4",
      fetched: true,
      controlledTime: 0,
      maxTime: null,
      changedTime: null,
      timeline: null,
      selectAll: false,
      anomalyPoint: null,
      checkBox: [
        { title: "BVP", checked: false },
        { title: "TMP", checked: false },
      ],
      menu: [
        {
          title: "놀란 포인트 보기",
        },
        {
          icon: "https://dt1amnyxy57si.cloudfront.net/assets/headset.png",
          title: "Voice",
          checked: false,
        },
        {
          icon: "https://dt1amnyxy57si.cloudfront.net/assets/observation.png",
          title: "Eye Tracker",
          checked: false,
        },
        {
          title: "BVP",
          checked: false,
        },
        {
          title: "TMP",
          checked: false,
        },
        {
          icon: "https://dt1amnyxy57si.cloudfront.net/assets/dialog.png",
          title: "HR",
          checked: false,
        },
        {
          icon: "https://dt1amnyxy57si.cloudfront.net/assets/dialog.png",
          title: "IBI",
          checked: false,
        },
        {
          icon: "https://dt1amnyxy57si.cloudfront.net/assets/emotion.png",
          title: "EDA",
          checked: false,
        },
        {
          icon: "https://dt1amnyxy57si.cloudfront.net/assets/voice-command.png",
          title: "목소리 크기",
          checked: false,
        },
      ],
    };
  },
  computed: {
    timeChanged() {
      return this.changedTime;
    },
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
    showData() {
      this.menu[3].checked = true;
      this.menu[4].checked = true;
    },
    select() {
      if (this.selectAll == true) {
        for (let i of this.menu) {
          i.checked = true;
        }
      } else {
        for (let i of this.menu) {
          i.checked = false;
        }
      }
    },
    timeChange(time) {
      this.changedTime = time;
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
    downloadData() {
      this.$http
        .post("/main/getData", {
          headers: { responseType: "blob" },
          state: "hello",
        })
        .then((result) => {
          const url = window.URL.createObjectURL(new Blob([result.data]));
          const link = document.createElement("a");
          const contentDisposition = result.headers["content-disposition"]; // 파일 이름
          let fileName = "unknown";
          if (contentDisposition) {
            const [fileNameMatch] = contentDisposition.split(";").filter((str) => str.includes("filename"));
            if (fileNameMatch) [, fileName] = fileNameMatch.split("=");
          }
          link.href = url;
          link.setAttribute("download", `${fileName}`);
          link.style.cssText = "display:none";
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    },
  },
  beforeMount() {},
};
</script>

<style scoped>
.verticalLine {
  border-left: 1px solid darkgrey;
}

.content-wrapper {
  height: 250vh;
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-around;
}

.player-part {
  display: flex;
  margin-top: 450px;
  width: 50%;
  padding: 0px 3rem;
}

.contents-part {
  width: 50%;
  margin-top: 100px;
  padding: 0px 3rem;
}

.checkbox-parts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border: solid;
  margin-bottom: 10px;
  border-radius: 10px;
}

.box {
  /* border: groove; */
  display: flex;
  padding: 5px;
  margin: 0px 3px;
}

.chart {
  margin-top: 20px;
  border: solid white;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  background-color: white;
  padding: 0 !important;
  /* border-bottom: 1px solid black; */
}

.card-body {
  padding: 5px;
}

.cards-body {
  padding: 5px;
  margin-bottom: 10px;
}

.input-range {
  position: relative;
  /* left: 30px; */
  /* margin-bottom: 10px; */
  /* width: 561px; */
  /* left: 24px; */
  z-index: 2;
}
.input-range2 {
  position: relative;
  width: 565px;
  left: 27px;
  margin-bottom: 10px;
  z-index: 2;
}
/* input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #ffffff;
  cursor: pointer;
  border-top: 600px solid;
  height: 36px;
  width: 16px;
  margin-top: -14px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border-radius: 3px;
} */

.header-left {
  display: flex;
  height: 100%;
  align-items: center;
}
.icon {
  height: 70%;
  width: auto;
  margin-right: 1rem;
}

.header-title {
  font-size: 25px;
  font-weight: 600;
}

.header-right {
  display: flex;
  height: 100%;
  align-items: center;
}

.header-hairline {
  height: 100%;
  float: right;
  margin-right: 1rem;
}

.verticalLine {
  border-left: 1px solid rgba(0, 0, 0, 0.125);
}

.horizontalLine {
  border-bottom: 1px solid black;
}
</style>
