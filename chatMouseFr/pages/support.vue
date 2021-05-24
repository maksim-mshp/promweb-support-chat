<template>
<v-app>
    <v-container>
      <v-layout>
          <v-card class="elevation-12" width="350">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>Тех-поддержка
              </v-toolbar-title>
               <v-spacer></v-spacer>
              <v-btn  icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-toolbar>
            <!-- Сообщения -->
          <v-card id = "area" class= #F5F5DC v-show="show"> 
            <!-- Сообщение админа -->
              <v-card color = #fff class="elevation-10" id = "admin_mes">
                  <v-form>
                    <v-card-actions>  
                      <v-list-item-avatar color="grey darken-3">
                      <v-img
                      class="elevation-10"
                     alt=""
                    src="https://cropas.by/wp-content/uploads/2015/05/admin.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title id="adminName">Константин</v-list-item-title>
                    </v-list-item-content>
                </v-card-actions>  
                 <v-card-text>
              Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.
              </v-card-text> 
                </v-form> 
              </v-card>
              <div id="dv" v-show="show"></div>
               <!-- //////////////////
            ////////////////////// -->
            <!-- Сообщение пользователя -->
            <v-card color = #fff class="elevation-10" id = "user_mes">
                  <v-form>
                 <v-card-text>
               gotcha edge cases are type invalid as well.
              </v-card-text> 
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-card-actions>
                     <v-list-item-avatar color="grey darken-3">
                      <v-img
                      class="elevation-10"
                     alt=""
                    src="https://img2.freepng.ru/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title id="userName">Александр</v-list-item-title>
                    </v-list-item-content>
                </v-card-actions>
                </v-card-actions>
                </v-form> 
              </v-card>
              <div id="dv" v-show="show"></div>
              <!-- //////////////////
            ////////////////////// -->
          </v-card>
          
             <!-- //////////////////
            ////////////////////// -->
         <!-- Заполнение пользователя -->
            <v-card color= #F5F5DC v-show="show"> 
                
                <v-form>
                <v-text-field id = "name" counter="10" label="ФИО" required clearable></v-text-field>
                    <v-text-field id = "e-mail" label="E-mail" required clearable></v-text-field> 
                    <div id="dv"></div>
                    <v-textarea id = "message" height="50" label="Сообщение"  required clearable></v-textarea> 
                    </v-form>
                <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn  id = "send" dark small color="primary">
                <v-icon dark small>Отправить</v-icon>
                </v-btn>
                </v-card-actions>   
            </v-card>
            <!-- //////////////////
            ////////////////////// -->
         
        </v-card>
      </v-layout>
    </v-container>
</v-app>
</template>


<style>
#logs {
  height: 100px;
  overflow: auto;
}
#dv{
    height: 20px;
    width: 10px;
}
</style>


<script>
  export default {
    data: () => ({
      show: false,
    }),
  }
</script>


