<template>
  <nav>
    <v-app-bar text app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon><v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Sistema</span>
        <span>Encuestas</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
        <!-- show login when not authenticated -->
        <v-btn v-if="!$auth.isAuthenticated" @click="login" outlined rounded>
          <span>Entrar</span>
          <v-icon right>mdi-account-arrow-left-outline</v-icon>
        </v-btn>
        <!-- show logout when authenticated -->
        <v-btn v-if="$auth.isAuthenticated" @click="logout" outlined rounded>
          <span>Salir</span>
          <v-icon right>mdi-account-arrow-right-outline</v-icon>
        </v-btn>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app class="indigo">
      <v-list>
        <v-list-item v-if="$auth.isAuthenticated" class="my-3 justify-center">
          <v-list-item-avatar size="60">
            <v-img
              :src="$auth.user.picture"              
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item v-if="$auth.isAuthenticated">
          <v-list-item-content>
            <v-list-item-title class="text-h6 white--text">
              {{$auth.user.name}}
            </v-list-item-title>
            <v-list-item-subtitle class="white--text">{{$auth.user.email}}</v-list-item-subtitle>
          </v-list-item-content>
        
        </v-list-item>
      </v-list>
      <v-divider color="white"></v-divider>
    <v-list
        nav
        dense
      > 
      <v-list-item-group>
        <v-list-item router_link to='/'>
            <v-list-item-icon >
              <v-icon class="white--text" >mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="$auth.isAuthenticated" router_link to='/profile'>
            <v-list-item-icon >
              <v-icon class="white--text" >mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Perfil</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="$auth.isAuthenticated" router_link to='/encuestas'>
            <v-list-item-icon >
              <v-icon class="white--text">mdi-clipboard-text-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Encuestas</v-list-item-title>
            <div v-html="redireccionEncuestas()"></div>
          </v-list-item>

          <v-list-group v-if="$auth.isAuthenticated && checkAdmin()" color="white" :value="false" no-action >
          <template v-slot:activator color="white">
            <v-list-item-icon>
            <v-icon class="white--text">mdi-shield-account</v-icon>
          </v-list-item-icon>
            <v-list-item-title class="white--text"
              >Administración
          </v-list-item-title>
            </template>
            <v-list-item router_link to="/adminusuarios">
                <v-list-item-content>
                  <v-list-item-title class="white--text" 
                    >Administrar Usuarios</v-list-item-title
                  >
                </v-list-item-content>
            </v-list-item>

            <v-list-item router_link to="/adminencuestas">
                <v-list-item-content >
                  <v-list-item-title class="white--text"
                    >Administrar Encuestas</v-list-item-title
                  >
                </v-list-item-content>
            </v-list-item>

            <v-list-item router_link to="/adminlugares">
                <v-list-item-content>
                  <v-list-item-title class="white--text" 
                    >Administrar Lugares</v-list-item-title
                  >
                </v-list-item-content>
            </v-list-item>
          </v-list-group>

        </v-list-item-group>
      </v-list>
  </v-navigation-drawer>

  </nav>  
</template>

<script>
import axios from "axios";

export default {
  name: 'Navbar',

  data: () => ({
      drawer: false,
      usuarios: [],
  }),
  created() {
    axios
      .get("https://tpftestbackend.herokuapp.com/usuarios")
      .then((response) => {
        this.usuarios = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    redireccionEncuestas() {
      if (this.$auth.isAuthenticated) { this.$router.push('encuestas'); }
    },
    // Chequea si el usuario logueado tiene permisos de administrador, si es así
    // muestra la opción de Administración en la barra de navegación
    checkAdmin() {
      const usuario = this.$auth.user.email;
      this.$router.push('encuestas');
      for (var admin in this.usuarios) {
        if (
          usuario == this.usuarios[admin].email &&
          this.usuarios[admin].admin
        ) {
          return true;
        }
      }
      return false;
    },
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  }
};
</script>
