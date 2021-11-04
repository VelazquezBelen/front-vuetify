<template>
  <div class="encuestas">
    <h1>
      <span>ENCUESTAS</span>
    </h1>
    <hr />
    <div class="text-center ma2">
      <v-snackbar v-model="snackbar" :timeout="2000" top color="success">
        <span>¡Encuesta Agregada! &nbsp;</span>
        <v-icon dark>
          mdi-checkbox-marked-circle
        </v-icon>
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text color="white" @click="snackbar = false">Cerrar</v-btn>
        </template>
      </v-snackbar>
    </div>
  <v-content class="mx-8 my-8" >
    <PopupNeonato @encuestaAgregada="snackbar = true"/>
    <PrimerYSegundoTrimestre @encuestaAgregada="snackbar = true"/>
    <TercerTrimestre @encuestaAgregada="snackbar = true"/>
  </v-content>
  </div>

</template>

<script>
import PopupNeonato from '../components/PopupNeonato.vue'
import PrimerYSegundoTrimestre from '../components/PopupPrimerYSegundoTrimestre.vue'
import TercerTrimestre from '../components/PopupTercerTrimestre.vue'

export default {
  name: "Neonato",
  components: {PopupNeonato, PrimerYSegundoTrimestre, TercerTrimestre},
  data() {
    return {
      snackbar: false,
    }
  },
};
</script>
