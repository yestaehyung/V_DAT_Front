<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/search">
      <img src="../assets/logo-4.png" alt="" width="200px`" />
    </b-navbar-brand>
    <!-- <b-navbar-nav>
      <b-nav-item href="/main">Main</b-nav-item>
    </b-navbar-nav> -->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-input size="sm" class="input" placeholder="동영상 이름을 넣어주세요"></b-input>
          <b-button size="sm" class="button" type="submit">보기</b-button>
        </b-nav-form>
        <b-button @click="sendData()">데이터 받기</b-button> -->
        <!-- <b-nav-item-dropdown right>
          Using 'button-content' slot
          <template #button-content>
            <em>
              <b-icon icon="box-seam"></b-icon>
            </em>
          </template>
          <b-dropdown-item href="#">menu1</b-dropdown-item>
          <b-dropdown-item href="#">menu1</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      // video: "",
    };
  },
  methods: {
    sendData() {
      // const frm = new FormData();
      // frm.append("name", "이름");
      // frm.append("key", "값");
      // axios.get("http://127.0.0.1:5000/hello", frm).then((res) => {
      //   console.log(res.data["This is"]);
      //   alert(res.data);
      // });
    },
  },
  computed: {
    video() {
      return this.$store.getters.getVideo;
    },
  },
};
</script>

<style scoped>
.logo {
  width: 100;
  height: 100;
}
.input {
  margin-right: 10px;
}
.button {
  margin-right: 10px;
}
</style>
