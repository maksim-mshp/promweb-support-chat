<template>
  <div id="app">
    <div id="wrapper">
      <v-alert color="red" outlined text type="error" v-if="wrong">{{
        wrong
      }}</v-alert>
      <div>
        <h1>Регистрация</h1>
        <router-link to="/login" class="reg_link">Вход</router-link>
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
          <v-text-field
            label="Ссылка на сайт"
            placeholder="Ссылка на сайт"
            color="primary"
            v-model="link"
          ></v-text-field>
          <div class="btn_wrap" align="center">
            <v-btn
              color="primary"
              class="white--text"
              style="width: 200px; margin-top: 25px"
              @click="regist"
              >Зарегистрироваться</v-btn
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
      link: "",
      wrong: "",
      show_pass: false
    };
  },
  mounted() {
    if (localStorage.getItem("lk-token")) {
      this.$router.push("/lk");
    }
  },
  methods: {
    regist() {
      if (this.username == "") {
        this.wrong = "Введите имя пользователя";
      } else if (this.password == "") {
        this.wrong = "Введите пароль";
      } else if (this.password.length < 5) {
        this.wrong = "Пароль слишком короткий";
      } else if (this.username.length < 5) {
        this.wrong = "Имя пользователя слишком короткое";
      }else if (this.link == "") {
        this.wrong = "Введите ссылку на сайт";
      } else {
        let config = {
          method: "post",
          url:
            "http://localhost/api/register?username=" +
            this.username +
            "&password=" +
            this.password +
            "&link=" +
            this.link,
          headers: {}
        };

        this.$axios(config)
          .then(response => {
            if (response.data.aid) {
              localStorage.setItem("lk-token", response.data.aid);
              this.$router.push("/lk");
            } else {
              this.wrong = "Что-то пошло не так";
            }
          })
      }
    }
  }
};
</script>
