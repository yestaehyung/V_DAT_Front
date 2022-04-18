<template>
  <div>
    <header>
      <NavBar />
    </header>
    <body class="content-wrapper">
      <div class="card-wrapper">
        <b-card>
          <b-form>
            <!-- <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              content-cols-sm
              content-cols-lg="7"
              label="Enter VR video link"
              label-size="lg"
              label-for="input-horizontal"
            >
              <b-form-input placeholder="동영상 링크" size="lg" v-model="form.video"> </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              content-cols-sm
              content-cols-lg="7"
              label="Enter VR user audio link"
              label-size="lg"
              label-for="input-horizontal"
            >
              <b-form-input placeholder="오디오 링크" size="lg" v-model="form.audio"> </b-form-input>
            </b-form-group> -->
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              content-cols-sm
              content-cols-lg="7"
              label="Upload  CSV file"
              label-size="lg"
              label-for="input-horizontal"
            >
              <b-form-file ref="file" placeholder="csv 파일 업로드" size="lg" v-model="form.csvFile" :state="Boolean(form.csvFile)"></b-form-file>
              <!-- <b-button class="mt-2" @click="form.csvFile = null">Clear</b-button> -->
              <!-- <form action="http://127.0.0.1:5000/eda" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" />
                <input type="submit" />
              </form> -->
            </b-form-group>
            <div class="btn-wrapper">
              <b-button size="lg" @click="[$router.push('/main'), sendData()]">
                v-dat에 연결
              </b-button>
            </div>
          </b-form>
        </b-card>
      </div>
      <!-- {{ form.video }} -->
      <!-- {{ form.audio }} -->
    </body>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "axios";

export default {
  name: "Anal",
  components: { NavBar },
  computed: {
    sensor() {
      return this.$store.getters.getSensor;
    },
  },
  data() {
    return {
      form: {
        video: null,
        audio: null,
        csvFile: null,
      },
    };
  },
  methods: {
    sendData() {
      const fd = new FormData();
      // fd.append("video", this.form.video);
      // fd.append("audio", this.form.audio);
      // fd.append("file", this.form.csvFile);
      // const data = null;
      // axios
      //   .post("http://192.168.1.6:80/eda", fd, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then((result) => {
      //     this.$store.commit("addSensor", {
      //       sensor: result.data,
      //     });
      //   });
      // axios.get("http://192.168.1.6:80/voice", {}).then((res) => {
      //   this.$store.commit("addVoice", {
      //     voice: res.data,
      //   });
      // });
      axios.get("http://127.0.0.1:5000/sensor", {}).then((res) => {
        this.$store.commit("addAnomaly", {
          anomaly: res.data,
        });
      });
    },
  },
};
</script>

<style scoped>
.content-wrapper {
  height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-wrapper {
  /* border: solid; */
  height: 70%;
  width: 90%;
}

.btn-wrapper {
  /* border: solid; */
  display: flex;
  justify-content: center;
}

.horizontalLine {
  border-bottom: 1px solid black;
}
</style>
