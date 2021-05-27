<template>
  <v-container id="app">
    <h1>
      {{ chats[$route.params.chat].name }} /
      <a :href="'mailto:' + chats[$route.params.chat].email">{{
        chats[$route.params.chat].email
      }}</a>
    </h1>
    <!-- Начало основного блока -->
    <div class="main_view">
      <div class="msg_history">
        <div
          v-for="(item, index) in chats[$route.params.chat].messages"
          :key="index"
        >
          <div class="outgoing_msg" v-if="item['Консультант']">
            <p class="msg_name_out">Вы</p>
            <div class="sent_msg">
              <p>{{ item["Консультант"] }}</p>
            </div>
          </div>

          <div class="incoming_msg" v-else>
            <div class="received_msg">
              <p class="msg_name">{{ chats[$route.params.chat].name }}</p>
              <div class="received_withd_msg">
                <p>{{ item["Вы"] }}</p>
              </div>
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
  </v-container>
</template>

<script>
export default {
  layout: "lk",
  data() {
    return {
      chats: {},
      message: "",
      needscroll: true
    };
  },
  methods: {
    sendMessage() {
      let config = {
        method: "post",
        url:
          "http://localhost/api/a/sender?secret=" +
          this.$route.params.chat +
          "&message=" +
          this.message,
        headers: {}
      };
      this.message = "";

      this.$axios(config);
    },
    update() {
      this.chats = JSON.parse(localStorage.getItem("lk-chats"));
      if (this.needscroll) {
        setTimeout(function() {
          $(".msg_history").scrollTop($(".msg_history")[0].scrollHeight);
        }, 1);
      }
    }
  },
  mounted() {
    this.update();
    this.chats = JSON.parse(localStorage.getItem("lk-chats"));
    if (!localStorage.getItem("lk-token")) {
      this.$router.push("/login?alert=1");
    } else if (!this.$route.params.chat) {this.$router.push("/lk")}else {
      this.intervalID = setInterval(
        (function(self) {
          //Self-executing func which takes 'this' as self
          return function() {
            //Return a function in the context of 'self'
            self.update(); //Thing you wanted to run as non-window 'this'
          };
        })(this),
        1000 //normal interval, 'this' scope not impacted here.
      );
    }
  },
  created() {
    this.chats[this.$route.params.chat] = {
      messages: [],
      email: "",
      name: "",
      secret: this.$route.params.chat
    };
  }
};
</script>

<style scoped>
.main_view {
  height: 100%;
}
.container {
  height: calc(100% - 66px);
}
.msg_history {
  height: 500px;
}
</style>
