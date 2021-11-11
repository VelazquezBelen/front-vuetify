<template>
<div class="profile">
    <h2 class="grey--text">
      <span>Mi Perfil</span>
    </h2>
    <hr />
    <div class="pa-2">
    </div>
  <v-row justify="center" class="mx-20 my-14">
    <v-col
      cols="12"
      sm="8"
    >
      <v-card>
        <v-card-title class="indigo">
          <span class="text-h5 white--text">Informacion Personal</span>
        </v-card-title>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-details</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ $auth.user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

        <v-img
          :src="$auth.user.picture"
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
