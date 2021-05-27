<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-card
          class="elevation-12"
          width="350"
          id="dg-main"
          style="width: 350px; left: 1165px; top: 412px;"
        >
          <v-toolbar
            dark
            color="primary darken-1"
            id="dg-area"
            oncontextmenu="return false"
          >
            <v-toolbar-title>Консультант</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="show_element()">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container v-show="show" id="main_chat">
            <!-- Начало основного блока -->
            <div class="main_view" v-if="auth_state">
              <div class="msg_history">
                <div v-for="(item, index) in messages" :key="index">
                  <div class="incoming_msg" v-if="item['Консультант']">
                    <div class="received_msg">
                      <p class="msg_name">Консультант</p>
                      <div class="received_withd_msg">
                        <p>{{ item["Консультант"] }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="outgoing_msg" v-else>
                    <p class="msg_name_out">Вы</p>
                    <div class="sent_msg">
                      <p>{{ item["Вы"] }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <v-flex xs12>
                <v-text-field
                  v-model="message"
                  append-icon="mdi-send"
                  autofocus
                  single-line
                  type="text"
                  label="Сообщение"
                  @click:append="sendMessage()"
                  @keyup.enter="sendMessage()"
                />
              </v-flex>
            </div>

            <v-form v-model="valid" v-else>
              <v-container class="d-flex justify-center flex-wrap">
                <v-alert v-if="alert != ''" type="error" style="width: 100%">
                  {{ alert }}
                </v-alert>
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  label="Имя"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-btn color="primary" elevation="4" class="mt-4" @click="auth"
                  >Продолжить</v-btn
                >
              </v-container>
            </v-form>

            <!-- Конец основного блока -->
          </v-container>
        </v-card>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style scoped>
#wrapper {
  height: 100px;
}
#logs {
  height: 100px;
  overflow: auto;
}
#dv {
  height: 20px;
  width: 10px;
}
.no-shadow {
  box-shadow: none;
}

#main_chat {
  height: 345px;
}

.v-application--wrap {
  flex: none;
  min-height: unset;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
#dv1 {
  height: 20px;
  width: 5px;
}
.container {
  max-width: 1170px;
  margin: auto;
}
img {
  max-width: 100%;
}

.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}

.msg_name {
  margin-bottom: 3px !important;
  font-size: 0.8em;
}
.msg_name_out {
  margin-bottom: 3px !important;
  font-size: 0.8em;
  text-align: right;
}
.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}
.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg {
  width: 80%;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

.sent_msg p {
  background: #005eb6 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 15px 0 15px;
}
.sent_msg {
  float: right;
  width: 70%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.msg_send_btn {
  background: none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  padding-right: 5px;
  height: 270px;
  overflow-y: auto;
}
</style>

<script>
export default {
  data: () => ({
    show: false,
    auth_state: false,
    message: "",
    valid: false,
    site: "",
    alert: "",

    firstname: "",
    email: "",

    messages: [],
    last: "",
    nameRules: [
      v => !!v || "Введите имя",
      v => /^[А-Я]+$/im.test(v) || "Имя введено неверно"
    ],
    emailRules: [
      v => !!v || "Введите e-mail",
      v =>
        /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/im.test(v) ||
        "E-mail введён неверно"
    ]
  }),
  layout: "empty",
  methods: {
    show_element() {
      if (!this.show) {
        this.show = !this.show;

        setTimeout(function() {
          document.querySelector("#dg-main").style.top = "239px";
      }, 5);
        } else {
          this.show = !this.show;
          setTimeout(function() {
          document.querySelector("#dg-main").style.top = "412px";
      }, 5);
        }
    },
    update_messages() {
      if (this.auth_state) {
        let config = {
          method: "get",
          url:
            "http://localhost/api/u/messages?secret=" +
            localStorage.getItem(this.site),
          headers: {}
        };

        this.$axios(config).then(response => {
          this.messages = response.data;

          if (JSON.stringify(this.last) != JSON.stringify(this.messages)) {
            console.log([this.last, this.messages]);
            setTimeout(function() {
              $(".msg_history").scrollTop($(".msg_history")[0].scrollHeight);
            }, 1);

            this.last = this.messages;
          }
        });
      }
    },
    auth() {
      if (
        /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/im.test(this.email) &&
        /^[А-Я]+$/im.test(this.firstname)
      ) {
        let config = {
          method: "get",
          url:
            "http://localhost/api/hash?site=" +
            this.site +
            "&name=" +
            this.firstname +
            "&email=" +
            this.email,
          headers: {}
        };

        this.$axios(config).then(response => {
          localStorage.setItem(this.site, response.data.secret);
          this.auth_state = true;
          setTimeout(function() {
            $(".msg_history").scrollTop($(".msg_history")[0].scrollHeight);
          }, 1);
        });
      }
    },
    scroll() {
      setTimeout(function() {
        $(".msg_history").scrollTop($(".msg_history")[0].scrollHeight);
      }, 1);
    },
    sendMessage() {
      let config = {
        method: "post",
        url:
          "http://localhost/api/u/sender?secret=" +
          localStorage.getItem(this.site) +
          "&message=" +
          this.message,
        headers: {}
      };
      this.message = "";

      this.$axios(config).then(response => {
        this.update_messages();
      });
    }
  },
  mounted() {
    this.site = this.$route.params.site;
    $("#dg-main").draggable({ handle: "#dg-area", containment: "document" });
    if (localStorage.getItem(this.site)) {
      this.auth_state = true;
    }
    this.intervalID = setInterval(
      (function(self) {
        //Self-executing func which takes 'this' as self
        return function() {
          //Return a function in the context of 'self'
          self.update_messages(); //Thing you wanted to run as non-window 'this'
        };
      })(this),
      2000 //normal interval, 'this' scope not impacted here.
    );
  }
};
</script>
