<template>
  <div class="encuestas">
    <h2 class="grey--text">
      <span>Mis Encuestas</span>
    </h2>
    <hr />
    <div class="text-center ma2">
      <v-snackbar v-model="snackbar" :timeout="2000" top dense text color="success">
        <span>¡Encuesta Agregada! &nbsp;</span>
        <v-icon left color="success"> mdi-checkbox-marked-circle </v-icon>
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text color="success" @click="snackbar = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>
    </div>
    <div class="text-center ma2">
      <v-snackbar v-model="snackbarElimino" :timeout="2000" top dense text color="success">
        <span>¡Encuesta Eliminada! &nbsp;</span>
        <v-icon left color="success"> mdi-checkbox-marked-circle </v-icon>
        <template v-slot:action="{ attrs }">
          <v-btn
            v-bind="attrs"
            text
            color="success"
            @click="snackbarElimino = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>
    </div>
    <div class="text-center ma2">
      <v-snackbar
        v-model="snackbarActualizo"
        :timeout="2000"
        top dense text color="success"
      >
        <span>¡Encuesta Actualizada! &nbsp;</span>
        <v-icon left color="success"> mdi-checkbox-marked-circle </v-icon>
        <template v-slot:action="{ attrs }">
          <v-btn
            v-bind="attrs"
            text
            color="success"
            @click="snackbarActualizo = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>
    </div>
    <div class="text-center ma2">
      <v-snackbar
        v-model="snackbarObligatorio"
        :timeout="2000"
        top dense text
        color="error"        
      >
        <span>Debe completar los campos obligatorios del bloque 0 &nbsp;</span>
        <template v-slot:action="{ attrs }">
          <v-btn
            v-bind="attrs"
            text
            color="error"
            @click="snackbarObligatorio = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>
    </div>
    <v-row justify="center">
      <v-col cols="12" sm="10" class="mx-10 my-14">
        <template>
          <v-layout row class="mb-3">
            <PrimerYSegundoTrimestre
              @encuestaAgregada="snackbar = true"
              @camposObligatorios="snackbarObligatorio = true"
              @getEncuestas="getEncuestas"
            />
            <v-dialog v-model="dialogNuevaTercerTrimestre" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  color="blue-grey"
                  v-bind="attrs"
                  v-on="on"
                  class="caption"
                >
                  <v-icon left>mdi-file-plus-outline</v-icon>
                  Nueva encuesta tercer trimestre
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Ingrese DNI de la madre</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <!-- <v-card-subtitle class="text-subtitle-1">Exportar según rango de fechas</v-card-subtitle> -->
                    <v-row>
                      <v-col cols="12" sm="10">
                        <v-text-field
                          v-model="dniMadre"
                          label="DNI"
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    class="mx-2 caption"
                    color="blue darken-1"
                    text
                    @click="closeDialog"
                  >
                    Cancelar
                  </v-btn>
                  <v-spacer></v-spacer>
                    <TercerTrimestre :dniMadre="dniMadre" @cerarDialogNuevaEncuesta="closeDialog" @encuestaAgregada="snackbar = true" @camposObligatorios="snackbarObligatorio = true" @getEncuestas="getEncuestas"/>  
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogNuevaNeonato" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  color="blue-grey"
                  v-bind="attrs"
                  v-on="on"
                  class="caption"
                >
                  <v-icon left>mdi-file-plus-outline</v-icon>
                  Nueva encuesta neonato
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Ingrese DNI de la madre</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="10">
                        <v-text-field
                          v-model="dniMadre"
                          label="DNI"
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    class="mx-2 caption"
                    color="blue darken-1"
                    text
                    @click="closeDialog"
                  >
                    Cancelar
                  </v-btn>
                  <v-spacer></v-spacer>
                    <PopupNeonato :dniMadre="dniMadre" @cerarDialogNuevaEncuesta="closeDialog" @encuestaAgregada="snackbar = true" @camposObligatorios="snackbarObligatorio = true" @getEncuestas="getEncuestas"/>  
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="encuestas"
            :search="search"
            sort-by="dni"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-col sm="4">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar por DNI o tipo encuesta"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >¿Estás seguro de eliminar la encuesta?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogDelete = false"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        :loading="loading"
                        text
                        @click="eliminarEncuestaConfirmacion"
                        >Ok</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-row>
                <template v-if="item.tipoEncuesta === 'Tercer trimestre'">
                  <VerTercerTrimestre :id="item._id"></VerTercerTrimestre
                ></template>
                <template v-if="item.tipoEncuesta === 'Neonato'">
                  <VerNeonato :id="item._id"></VerNeonato
                ></template>
                <template
                  v-if="item.tipoEncuesta === 'Primer y segundo trimestre'"
                >
                  <VerPrimerySegundoTrimestre
                    :id="item._id"
                  ></VerPrimerySegundoTrimestre
                ></template>
                <template v-if="item.tipoEncuesta === 'Neonato'">
                  <EditarNeonato
                    :id="item._id"
                    @encuestaActualizada="snackbarActualizo = true"
                    @camposObligatorios="snackbarObligatorio = true"
                    @getEncuestas="getEncuestas"
                  ></EditarNeonato
                ></template>
                <template v-if="item.tipoEncuesta === 'Tercer trimestre'">
                  <EditarTercerTrimestre
                    :id="item._id"
                    @encuestaActualizada="snackbarActualizo = true"
                    @camposObligatorios="snackbarObligatorio = true"
                    @getEncuestas="getEncuestas"
                  ></EditarTercerTrimestre
                ></template>
                <template
                  v-if="item.tipoEncuesta === 'Primer y segundo trimestre'"
                >
                  <EditarPrimerySegundoTrimestre
                    :id="item._id"
                    @encuestaActualizada="snackbarActualizo = true"
                    @camposObligatorios="snackbarObligatorio = true"
                    @getEncuestas="getEncuestas"
                  ></EditarPrimerySegundoTrimestre
                ></template>
                <v-icon small @click="eliminarEncuesta(item)">
                  mdi-delete
                </v-icon>
              </v-row>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PopupNeonato from "../components/PopupNeonato.vue";
import PrimerYSegundoTrimestre from "../components/PopupPrimerYSegundoTrimestre.vue";
import TercerTrimestre from "../components/PopupTercerTrimestre.vue";
import EditarNeonato from "../components/EditarNeonato.vue";
import EditarTercerTrimestre from "../components/EditarTercerTrimestre.vue";
import EditarPrimerySegundoTrimestre from "../components/Editar1y2Trimestre.vue";
import VerTercerTrimestre from "../components/VerTercerTrimestre.vue";
import VerPrimerySegundoTrimestre from "../components/Ver1y2Trimestre.vue";
import VerNeonato from "../components/VerNeonato.vue";

class Encuesta {
  constructor(
    nombreApellido,
    dni,
    fechaRelevamiento,
    lugarRelevamiento,
    tipoEncuesta
  ) {
    this.nombreApellido = nombreApellido;
    this.dni = dni;
    this.fechaRelevamiento = fechaRelevamiento;
    this.lugarRelevamiento = lugarRelevamiento;
    this.tipoEncuesta = tipoEncuesta;
  }
}

export default {
  name: "Encuestas",
  components: {
    PopupNeonato,
    PrimerYSegundoTrimestre,
    TercerTrimestre,
    EditarNeonato,
    EditarTercerTrimestre,
    EditarPrimerySegundoTrimestre,
    VerTercerTrimestre,
    VerPrimerySegundoTrimestre,
    VerNeonato,
  },
  data() {
    return {
      dniMadre: "",
      dialogNuevaTercerTrimestre: false,
      dialogNuevaNeonato: false,
      snackbar: false,
      loading: false,
      snackbarElimino: false,
      snackbarActualizo: false,
      snackbarObligatorio: false,
      dialogDelete: false,
      search: "",
      encuestas: [],
      encuesta: new Encuesta(),
      editedEncuesta: new Encuesta(),
      //baseUrl: "https://tpftestbackend.herokuapp.com",
      baseUrl: "http://localhost:3000",
      headers: [
        {
          text: "Nombre y apellido",
          align: "start",
          value: "nombreApellido",
          filterable: false,
        },
        { text: "DNI embarazada", value: "dni" },
        {
          text: "Fecha de relevamiento",
          value: "fechaRelevamiento",
          filterable: false,
        },
        {
          text: "Lugar de relevamiento",
          value: "lugarRelevamiento.nombre",
          filterable: false,
        },
        { text: "Tipo encuesta", value: "tipoEncuesta" },
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
    this.getEncuestas();
  },
  methods: {
    async getEncuestas() {
      const res1 = await this.axios.get(
        `${this.baseUrl}/encuestas3Trimestre/panelencuestas/` +
          this.$auth.user.email
      );
      this.encuestas = res1.data;
      const res2 = await this.axios.get(
        `${this.baseUrl}/encuestas1y2Trimestre/panelencuestas/` +
          this.$auth.user.email
      );
      this.encuestas = this.encuestas.concat(res2.data);
      const res3 = await this.axios.get(
        `${this.baseUrl}/encuestasNeonato/panelencuestas/` +
          this.$auth.user.email
      );
      this.encuestas = this.encuestas.concat(res3.data);
    },
    eliminarEncuesta(encuesta) {
      this.editedEncuesta = encuesta;
      this.dialogDelete = true;
    },
    async eliminarEncuestaConfirmacion() {
      this.loading = true;
      if (this.editedEncuesta.tipoEncuesta == "Neonato") {
        this.axios
          .delete(`${this.baseUrl}/encuestasNeonato/` + this.editedEncuesta._id)
          .then((result) => {
            this.loading = false;
            this.dialogDelete = false;
            this.editedEncuesta = new Encuesta();
            this.getEncuestas();
            this.snackbarElimino = true;
          });
      } else if (this.editedEncuesta.tipoEncuesta == "Tercer trimestre") {
        this.axios
          .delete(
            `${this.baseUrl}/encuestas3Trimestre/` + this.editedEncuesta._id
          )
          .then((result) => {
            this.loading = false;
            this.dialogDelete = false;
            this.editedEncuesta = new Encuesta();
            this.getEncuestas();
            this.snackbarElimino = true;
          });
      } else if (
        this.editedEncuesta.tipoEncuesta == "Primer y segundo trimestre"
      ) {
        this.axios
          .delete(
            `${this.baseUrl}/encuestas1y2Trimestre/` + this.editedEncuesta._id
          )
          .then((result) => {
            this.loading = false;
            this.dialogDelete = false;
            this.editedEncuesta = new Encuesta();
            this.snackbarElimino = true;
            this.getEncuestas();
          });
      }
    },
    closeDialog(){
      this.dniMadre = "";
      this.dialogNuevaNeonato = false;
      this.dialogNuevaTercerTrimestre = false;
    }
  },
};
</script>
