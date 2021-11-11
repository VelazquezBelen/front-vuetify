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
              <v-text-field
                    v-model="nombre"
                    label="Nombre y apellido"
                  ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field
                    v-model="telefono"
                    label="Telefono"
                  ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-text-field
                    v-model="email"
                    label="E-mail"
                    readonly
                  ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-btn
                color="primary"
                text
                @click="actualizarUsuario"
              >
                Guardar
              </v-btn>
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
  data() {
    return {
      baseUrl: "https://tpftestbackend.herokuapp.com",
      nombre: null,
      telefono:null,
      email: this.$auth.user.email,
      idUsuario: null,
    };
  },
  created() {
    this.getUsuario();
  },
  methods: {
    async getUsuario() {
      this.axios.get(`${this.baseUrl}/usuarios/email/` + this.$auth.user.email)
      .then((res) => {
        if (res.data.length == 1) {
          this.nombre = res.data[0].nombre;
          this.telefono = res.data[0].telefono;
          this.idUsuario = res.data[0]._id;
        }
      });
    },
    async actualizarUsuario() {
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      var usuario = {nombre: this.nombre, telefono: this.telefono};
      this.axios.put(`${this.baseUrl}/usuarios/` + this.idUsuario,     
        JSON.stringify(usuario),
        { headers }).then((result) => {
          this.getUsuario();
        }) 
    },
  },
}
</script>
