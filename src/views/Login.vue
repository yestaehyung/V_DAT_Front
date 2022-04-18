<template>
  <div style="display: flex;justify-content: center;align-items: center;height: 100vh">
    <div style="height: 100%;align-items: center;display: flex">
      <b-card
          title="Login Account"
          tag="article"
          style="max-width: 25rem;min-width: 20rem"
          class="mb-2"
      >
        <b-form class="mb-2">
          <b-form-group
              label="Email"
              label-for="input-1"
              style="text-align: left;margin-top: 4rem"
              class="mb-5"
          >
            <b-form-input
                v-model="email"
                type="email"
                placeholder="Email"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-1"
              label="Password"
              label-for="input-1"
              style="text-align: left"
              class="mb-5"

          >
            <b-form-input
                id="input-1"
                v-model="pw"
                type="password"
                placeholder="password"
                required
            ></b-form-input>
          </b-form-group>


          <div style="display: flex;justify-content: space-between">
            <b-button @click="loginRequest" variant="primary">Login</b-button>
            <b-button @click="$router.push('/join')" variant="warning">Join</b-button>
          </div>
        </b-form>

      </b-card>

      <b-modal id="failure-modal" hide-footer v-b-modal.modal-prevent-closing>
        <div class="d-block text-center">
          <h3>아이디와 비밀번호를 확인 해 주세요.</h3>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('failure-modal')">닫기</b-button>
      </b-modal>
    </div>
  </div>

</template>

<script>
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      pw: null
    }
  },
  methods: {
    ...mapMutations(['insertToken']),
    loginRequest() {

      this.$http.post('/users/login', {
        user_ID: this.email,
        pw: this.pw
      })
          .then((result) => {
            if (result.data.success) {
              console.log(result.data)
              this.insertToken(result.data.token);
              this.$http.defaults.headers.common['x-access-token'] = result.data.token;
              this.$cookie.set('x-access-token', result.data.token, '30d'); // 쿠키에 토큰 저장
              this.$router.push('/main')//로그인 성공시 메인으로
            } else {
              console.log('login error')
              this.$bvModal.show('failure-modal')

            }
          });


    },
  },
  beforeMount() {
    if (this.$route.params.userInfo !== undefined) {
      let userInfo = this.$route.params.userInfo
      this.email = userInfo.email
      this.pw = userInfo.pw
    }
  }
}
</script>

<style scoped>

</style>
