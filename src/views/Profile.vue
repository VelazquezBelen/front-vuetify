<template>
<div class="home">
    <div>
      <h1>
        <span>PERFIL</span>
      </h1>
      <hr />
    </div>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="8"
    >
      <v-card>
        <v-card-title class="indigo">
          <span class="text-h5 white--text">Informacion Personal</span>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Telefono</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Email</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Direccion</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-img
          src="https://www.nicepng.com/png/detail/147-1473494_circulo-instagram-profile-picture-circle-template.png"
          height="200px"
        ></v-img>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>

  export default {
    name: 'Profile',
  }
</script>
