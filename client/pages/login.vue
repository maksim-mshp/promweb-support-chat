<template>
  <div id="app">
    <div id="wrapper">
      <v-alert color="blue" outlined text type="info" v-if="needAlert"
        >Для продолжения необходимо войти</v-alert
      >
      <v-alert color="red" outlined text type="error" v-if="wrong"
        >Неправильный логин или пароль</v-alert
      >
      <div>
        <h1>Вход</h1>
        <router-link to="/register" class="reg_link">Регистрация</router-link>
        <div class="login_form">
          <v-text-field
            label="Username"
            placeholder="Username"
            color="primary"
            v-model="username"
          ></v-text-field>
          <v-text-field
            :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_pass ? 'text' : 'password'"
            name="input-10-2"
            class="input-group--focused"
            @click:append="show_pass = !show_pass"
            label="Пароль"
            placeholder="Пароль"
            color="primary"
            v-model="password"
          ></v-text-field>
          <div class="btn_wrap" align="center">
            <v-btn
              color="primary"
              class="white--text"
              style="width: 125px; margin-top: 25px"
              @click="login"
              >Войти</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  text-align: center;
}
#app {
  width: 50%;
  margin: auto;
  max-width: 350px;
}
.btn_wrap {
  margin: auto;
}
.reg_link {
  display: block;
  margin: auto;
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      show_pass: false,
      wrong: false,
      needAlert: this.$route.query.alert == 1
    };
  },
  mounted() {
    if (localStorage.getItem("lk-token")) {
      this.$router.push("/lk");
    }
  },
  methods: {
    login() {
      let config = {
        method: "get",
        url:
          "http://localhost/api/login?username=" +
          this.username +
          "&password=" +
          this.password,
        headers: {}
      };

      this.$axios(config).then(response => {
        console.log(response.data.aid);
        if (response.data.aid) {
          localStorage.setItem("lk-token", response.data.aid);
          this.$router.push("/lk");
        } else {
          this.wrong = true;
        }
      });
    }
  }
};
</script>
