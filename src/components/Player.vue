<template>
  <div style="width: 100%;">
    <video-player
      class=" vjs-fill"
      style="width: 100%"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied"
    >
    </video-player>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
// import './custom-video.css'
import { videoPlayer } from "vue-video-player";
import { eventBus } from "../main.js";

export default {
  name: "Player",
  components: {
    videoPlayer,
  },
  props: {
    videoUrl: {
      type: String,
      default: null,
    },
    controlledTime: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      intervalId: null,
      playerOptions: {
        // videojs options
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          },
        ],
        poster: "",
        fluid: true,
      },
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  methods: {
    // listen event
    onPlayerPlay(player) {},
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },

    // or listen state event
    playerStateChanged(playerCurrentState) {},

    playerReadied(player) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
    },
    setTime(time) {
      this.player.currentTime(time);
    },
  },
  created() {},
  mounted() {
    // console.log('this is current player instance object', this.player)
    this.playerOptions.sources[0].src = this.videoUrl;
    console.log(this.playerOptions.sources[0].src);
    setTimeout(() => {
      this.$emit("gotTotalTime", this.player.duration());
      this.intervalId = setInterval(() => {
        if (this.player == null) clearInterval(this.intervalId);

        if (!this.player.paused()) {
          this.$emit("timeSync", this.player.currentTime());
        }
      }, 1000);
    }, 1000);
  },
  watch: {
    controlledTime(time) {
      this.setTime(time);
    },
  },
};
</script>

<style scoped></style>
