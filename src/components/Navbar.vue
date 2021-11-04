<template>
  <nav>
    <v-app-bar text app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Todo</span>
        <span>Ninja</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    <v-btn text >
      <span>Salir</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app class="indigo">
    <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="white--text text--accent-4"
        >
          <v-list-item router_link to='/encuestas'>
            <v-list-item-icon >
              <v-icon class="white--text">mdi-clipboard-text-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Encuestas</v-list-item-title>
          </v-list-item>

          <v-list-item router_link to='/profile'>
            <v-list-item-icon >
              <v-icon class="white--text" >mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Perfil</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
  </v-navigation-drawer>

  </nav>  
</template>

<script>

export default {
  name: 'Navbar',

  data: () => ({
      drawer: false,
    }),
  }
</script>