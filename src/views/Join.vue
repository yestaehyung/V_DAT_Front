<template>
  <div style="display: flex;justify-content: center;align-items: center;height: 100vh">
    <div style="height: 100%;align-items: center;display: flex">
      <b-card
          title="회원가입"
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
                v-model="userInfo.email"
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
                v-model="userInfo.pw"
                type="password"
                placeholder="password"
                required
            ></b-form-input>
          </b-form-group>


          <div style="display: flex;justify-content: space-between">
            <b-button @click="joinRequest" variant="warning">회원가입</b-button>
          </div>
        </b-form>

      </b-card>
      <b-modal id="success-modal" hide-footer v-b-modal.modal-prevent-closing>
        <div class="d-block text-center">
          <h3>회원가입 완료</h3>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('success-modal')">로그인하기</b-button>
      </b-modal>
      <b-modal id="failure-modal" hide-footer v-b-modal.modal-prevent-closing>
        <div class="d-block text-center">
          <h3>잠시 후 다시 시도해주세요.</h3>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('failure-modal')">닫기</b-button>
      </b-modal>
      <b-modal id="duplicated-modal" hide-footer v-b-modal.modal-prevent-closing>
        <div class="d-block text-center">
          <h3>이미 존재하는 아이디입니다.</h3>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('duplicated-modal')">닫기</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "Join",
  data() {
    return {
      userInfo: {
        email: '',
        pw: ''
      }
    }
  },
  methods: {
    joinRequest() {

      this.$http.post('/users/join', {
        userInfo: this.userInfo
      })
          .then(res => {
            if (res.data === 1) {
              this.$bvModal.show('success-modal')
            } else if(res.data ===-1) {
              this.$bvModal.show('duplicated-modal')

            }else {
              this.$bvModal.show('failure-modal')

            }
          })
    }
  },
  mounted() {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      if (modalId === 'success-modal') {
        this.$router.push({
          name:'login',
          params:{userInfo:this.userInfo}
        })
      }
    })
  }
}
</script>

<style scoped>

</style>
