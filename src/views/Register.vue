<template>
  <div>
    <header>
      <NavBar />
    </header>
    <body class="content-wrapper">
      <div class="card-wrapper">
        <b-card>
          <b-form>
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              content-cols-sm
              content-cols-lg="7"
              label="Enter VR video link"
              label-size="lg"
              label-for="input-horizontal"
            >
              <b-form-input placeholder="동영상 이름" size="lg" v-model="form.video"> </b-form-input>
              {{ form.video }}
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
              <b-form-input placeholder="오디오 이름" size="lg" v-model="form.voice"> </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="3"
              content-cols-sm
              content-cols-lg="7"
              label="Upload  CSV file"
              label-size="lg"
              label-for="input-horizontal"
            >
              <b-form-file ref="file" placeholder="csv 파일 업로드" size="lg" v-model="file" :state="Boolean(file)"></b-form-file>
              <!-- <b-button class="mt-2" @click="form.csvFile = null">Clear</b-button> -->
              <!-- <form action="http://192.168.0.4:8080/sensor" method="get" enctype="multipart/form-data">
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
        <!-- <div>
          <v-file-input label="File input" @change="selectFile"></v-file-input>
          <v-btn @click="submit">서버에 전송하기</v-btn>
        </div> -->
      </div>
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
      image: "test image",
      form: {
        video: null,
        voice: null,
        file: null,
      },
      file: null,
    };
  },
  methods: {
    async submit() {
      const formdata = new FormData();
      formdata.append("file", this.image);

      try {
        const { data } = await axios.get("http://192.168.0.4:8080/sensor", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    sendData() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("voice", this.form.voice);
      try {
        axios
          .post("http://192.168.0.4:8080/sensor", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((result) => {
            alert("데이터가 도착했습니다.");
            this.$store.commit("addAnomaly", {
              anomaly: result.data,
            });
          });
      } catch (error) {
        console.log(error);
      }
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
