<template>
  <div class="usuarios">
    <h2 class="grey--text">
      <span>Administrar Usuarios</span>
    </h2>
    <hr />
    <div class="text-center ma2">
      <v-snackbar v-model="snackbarElimino" :timeout="2000" top color="error">
        <span>¡Usuario Eliminado! &nbsp;</span>
        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text color="white" @click="snackbarElimino = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>
      <v-snackbar v-model="snackbarEditoPermiso" :timeout="2000" top color="indigo">
        <span>¡Los permisos del usuario se actualizaron! &nbsp;</span>
        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text color="white" @click="snackbarEditoPermiso = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>
    </div>
    <v-dialog v-model="dialogQuitarAdmin" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >¿Estás seguro de quitarle permisos de administrador a {{ editUsuario.email }}?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogQuitarAdmin = false"
            >Cancelar</v-btn
          >
          <v-btn
            color="blue darken-1"
            :loading="loading"
            text
            @click="quitarPermisoConfirm"
            >Ok</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAgregarAdmin" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >¿Estás seguro de darle permisos de administrador a {{ editUsuario.email }}?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogAgregarAdmin = false"
            >Cancelar</v-btn
          >
          <v-btn
            color="blue darken-1"
            :loading="loading"
            text
            @click="darPermisoConfirm"
            >Ok</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >¿Estás seguro de borrar el usuario {{ editUsuario.email }}?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancelar</v-btn
          >
          <v-btn
            color="blue darken-1"
            :loading="loading"
            text
            @click="eliminarUsuarioConfirm"
            >Ok</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-col cols="12" sm="10" class="mx-10 my-14">
        <template>
          <v-card>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Usuario</th>
                    <th class="text-left">Perfil</th>
                    <th class="text-left">Editar Permisos</th>
                    <th class="text-left">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="usuario in usuarios" :key="usuario._id">
                    <td>{{ usuario.email }}</td>
                    <td v-if="usuario.admin === true">Admin</td>
                    <td v-else>Encuestador</td>
                    <td>
                      <v-icon
                        v-if="usuario.admin === false"
                        small
                        @click="darPermisoUsuario(usuario)"
                      >
                        mdi-account-plus
                      </v-icon>
                      <v-icon
                        v-else
                        small
                        @click="quitarPermisoUsuario(usuario)"
                      >
                        mdi-account-minus
                      </v-icon>
                    </td>
                    <td>
                      <v-icon small @click="eliminarUsuario(usuario)">
                        mdi-delete
                      </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
class Usuario {
  constructor(email, admin) {
    this.email = email;
    this.admin = admin;
  }
}
export default {
  name: "AdminUsuarios",
  data() {
    return {
      usuarios: [],
      usuario: new Usuario(),
      dialogDelete: false,
      dialogQuitarAdmin: false,
      dialogAgregarAdmin: false,
      loading: false,
      search: "",
      snackbarElimino: false,
      snackbarEditoPermiso: false,
      editUsuario: new Usuario(),
      baseUrl: "https://tpftestbackend.herokuapp.com",
      headers: [
        {
          text: "Usuario",
          align: "start",
          value: "email",
        },
        { text: "Perfil", value: "admin", filterable: false },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          filterable: false,
        },
      ],
    };
  },
  created() {
    this.getUsuarios();
  },
  methods: {
    async getUsuarios() {
      const res = await this.axios.get(`${this.baseUrl}/usuarios`);
      this.usuarios = res.data;
    },
    eliminarUsuario(usuario) {
      this.editUsuario = usuario;
      this.dialogDelete = true
    },
    async eliminarUsuarioConfirm() {
      this.loading = true;
      this.axios.delete(`${this.baseUrl}/usuarios/` + this.editUsuario._id)
      .then((result) => {
        this.loading = false;
        this.dialogDelete = false;
        this.editUsuario = new Usuario();
        this.snackbarElimino = true;
        this.getUsuarios();
      });
    },
    darPermisoUsuario(usuario) {
      this.editUsuario = usuario;
      this.dialogAgregarAdmin = true
    },
    async darPermisoConfirm() {
      this.loading=true;
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      this.axios.put(
        `${this.baseUrl}/usuarios/` + this.editUsuario._id,
        JSON.stringify({ admin: true }),
        { headers }
      )
      .then((result) => {
        this.loading = false;
        this.dialogAgregarAdmin = false;
        this.editUsuario = new Usuario();
        this.snackbarEditoPermiso = true;
        this.getUsuarios();
      });
    },
    quitarPermisoUsuario(usuario) {
      this.editUsuario = usuario;
      this.dialogQuitarAdmin = true
    },
    async quitarPermisoConfirm() {
      this.loading=true;
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      await this.axios.put(
        `${this.baseUrl}/usuarios/` + this.editUsuario._id,
        JSON.stringify({ admin: false }),
        { headers }
      )
      .then((result) => {
        this.loading = false;
        this.dialogQuitarAdmin = false;
        this.editUsuario = new Usuario();
        this.snackbarEditoPermiso = true;
        this.getUsuarios();
      });
    },
  },
};
</script>