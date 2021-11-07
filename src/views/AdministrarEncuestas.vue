<template>
  <div class="encuestas">
    <h2 class="grey--text">
      <span>Administrar Encuestas</span>
    </h2>
    <hr />
    <v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      class="mx-10 my-14"
    > 
    <template>        
        <v-card>
          <v-data-table
            :headers="headers"
            :items="encuestas"
            :search="search"
            sort-by="dni"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <!-- <v-toolbar-title>My CRUD</v-toolbar-title> -->
                <v-col cols="3">
                <v-text-field
                  class="xs-3"
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar por email"
                  hide-details
                ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-btn text outlined @click="downloadEncuestas" :loading="loading" class="mx-2 caption"
                  dark
                  color="success" >Exportar a csv
                  <v-icon dark right>
                    mdi-file-excel
                  </v-icon>
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-row>
                <template v-if="item.tipoEncuesta === 'Tercer trimestre'"> <VerTercerTrimestre :id="item._id"></VerTercerTrimestre></template>
                <template v-if="item.tipoEncuesta === 'Neonato'"> <VerNeonato :id="item._id"></VerNeonato></template>
                <template v-if="item.tipoEncuesta === 'Primer y segundo trimestre'"> <VerPrimerySegundoTrimestre :id="item._id"></VerPrimerySegundoTrimestre></template>
            </v-row>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </v-col>
     </v-row>
  </div>
</template>

<script>
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
  components: { VerTercerTrimestre, VerPrimerySegundoTrimestre,
  VerNeonato },
  data() {
    return {
      loading: false,
      search: '',
      encuestas: [],
      encuesta: new Encuesta(),
      editedEncuesta: new Encuesta(),
      baseUrl: "https://tpftestbackend.herokuapp.com",
      headers: [
        {
          text: "Email del encuestador 1",
          align: "start",
          value: "emailEncuestador1"
        },
        { text: "Email del encuestador 2", value: "emailEncuestador2"},
        { text: "DNI embarazada", value: "dni", filterable: false},
        { text: "Tipo encuesta", value: "tipoEncuesta" },
        { text: "Ver", value: "actions", sortable: false, filterable: false},
      ],
    };
  },
  created() {
    this.getEncuestas();
  },
  methods: {
    async getEncuestas() {
      const res1 = await this.axios.get(
        `${this.baseUrl}/encuestas3Trimestre/encuestas`
      );
      this.encuestas = res1.data;
      const res2 = await this.axios.get(
        `${this.baseUrl}/encuestas1y2Trimestre/encuestas`
      );
      this.encuestas = this.encuestas.concat(res2.data);
      const res3 = await this.axios.get(
        `${this.baseUrl}/encuestasNeonato/encuestas`
      );
      this.encuestas = this.encuestas.concat(res3.data);
    },
    getRecordatorios(recordatorio24Horas) {
      var salida = "";
      for (var i = 0; i < recordatorio24Horas.length; i++) {
        salida +=
          "{Hora del día: " +
          recordatorio24Horas[i].horaDia +
          ", Tipo de alimento: " +
          recordatorio24Horas[i].tipoAlimento +
          ", Cantidad: " +
          recordatorio24Horas[i].cantidad +
          "}";
      }
      return salida;
    },
    async downloadEncuestas() {
      // Genera un archivo .csv separando los datos con ;
      this.loading = true;
      var FileSaver = require("file-saver");
      var texto1y2Trimestre =
        "Encuestas Primer y Segundo Trimestre \n nombreApellidoEncuestador1; telefonoEncuestador1; emailEncuestador1; nombreApellidoEncuestador2; telefonoEncuestador2; emailEncuestador2; fechaRelevamiento; lugarRelevamiento; nombreApellido; dni; fechaNacimiento; domicilioBarrio; telefono; fechaUltimaMenstruacion; semanasGestacion; observacionesBloque0; diabetes; enfermedadRenal; hipertension; colesterolTrigliceridosAltos; asmaEPOC; covid19; anemia; enfermedadCronica; cualEnfermedadCronica; consumeMedicamento; cualConsumeMedicamento; consumeComplejoVitaminicoSuplemento; cualConsumeComplejoVitaminicoSuplemento; fumaActual; fumaAntes; alcoholActual; embarazoAntes; cuantosEmbarazoAntes; hijos; cuantosHijos; observacionesBloque1; pais; provincia; personasVivienda; habitacionesVivienda; desagueCloaca; aguaPotable; redElectrica; gasNatural; nivelEducativo; empleo; asistenciaEstado; cualAsistenciaEstado; recibioBolson; recibioTickets; recibioTarjeta; recibioLeche; recibioOtra; cualUltimoMesRecibio; ingresoIndividual; ingresoTotal; recibioIFE; observacionesBloque2; pesoKG; ropaAlPesar; talla; tallaSentada; perimetroBraquial; pliegueTricipital; pliegueBicipital; pliegueSubescapular; pliegueSuprailiaco; observacionesBloque3; preocupadoSuficienteAlimentos; podidoAlimentos; comidoPocaVariedad; dejarDesayunoAlmuerzoCena; comidoMenos; sinAlimentos; sentidoHambre; dejadoComer; observacionesBloque4Parte1; recordatorio24Horas; observacionesBloque4Parte2; desayuno; almuerzo; merienda; cena; frecuenciaConsumo; golosinas; panBlanco; pan; copetin; frutas; lacteos; bebidas; otros; nsnc; observacionesBloque4Parte3; consumioLeche; consumioFrutasFrescas; consumioVerduras; consumioPapa; consumioCereales; consumioEmbutidos; observacionesBloque4Parte4; consumioCarne; consumioPescado; consumioAceites; consumioFrutasSecas; consumioProductosCopetin; consumioGolosinas; observacionesBloque4Parte5 \n";
      var texto3Trimestre =
        "Encuestas Tercer Trimestre \n nombreApellidoEncuestador1; telefonoEncuestador1; emailEncuestador1; nombreApellidoEncuestador2; telefonoEncuestador2; emailEncuestador2; fechaRelevamiento; lugarRelevamiento; nombreApellido; dni; fechaNacimiento; domicilioBarrio; telefono; fechaUltimaMenstruacion; semanasGestacion; observacionesBloque0; pesoKG; ropaAlPesar; talla; tallaSentada; perimetroBraquial; pliegueTricipital; pliegueBicipital; pliegueSubescapular; pliegueSuprailiaco; observacionesBloque3; recordatorio24Horas; observacionesBloque4 \n";
      var textoNeonato =
        "Encuestas Neonato \n nombreApellidoEncuestador1; telefonoEncuestador1; emailEncuestador1; nombreApellidoEncuestador2; telefonoEncuestador2; emailEncuestador2; fechaRelevamiento; lugarRelevamiento; nombreApellido; dni; fechaNacimiento; domicilioBarrio; telefono; fechaNacimientoBebe; viaNacimiento; lugarNacimiento; nombreBebe; observacionesBloque0; pesoKG; ropaAlPesar; talla; perimetroCefalico; circunsferenciaBrazo; NombreApellidoMadre; dniMadre; observacionesBloque5 \n";

      for (var index in this.encuestas) {
        if (
          this.encuestas[index].tipoEncuesta == "Primer y segundo trimestre"
        ) {
          const res = await this.axios.get(
            `${this.baseUrl}/encuestas1y2Trimestre/` + this.encuestas[index]._id
          );
          texto1y2Trimestre +=
            res.data.nombreApellidoEncuestador1 +
            "; " +
            res.data.telefonoEncuestador1 +
            "; " +
            res.data.emailEncuestador1 +
            "; " +
            res.data.nombreApellidoEncuestador2 +
            "; " +
            res.data.telefonoEncuestador2 +
            "; " +
            res.data.emailEncuestador2 +
            "; " +
            res.data.fechaRelevamiento +
            "; " +
            res.data.lugarRelevamiento +
            "; " +
            res.data.nombreApellido +
            ";" +
            res.data.dni +
            ";" +
            res.data.fechaNacimiento +
            ";" +
            res.data.domicilioBarrio +
            ";" +
            res.data.telefono +
            "; " +
            res.data.fechaUltimaMenstruacion +
            ";" +
            res.data.semanasGestacion +
            ";" +
            res.data.observacionesBloque0 +
            ";" +
            res.data.diabetes +
            ";" +
            res.data.enfermedadRenal +
            ";" +
            res.data.hipertension +
            ";" +
            res.data.colesterolTrigliceridosAltos +
            ";" +
            res.data.asmaEPOC +
            ";" +
            res.data.covid19 +
            ";" +
            res.data.anemia +
            ";" +
            res.data.enfermedadCronica +
            ";" +
            res.data.cualEnfermedadCronica +
            ";" +
            res.data.consumeMedicamento +
            ";" +
            res.data.cualConsumeMedicamento +
            ";" +
            res.data.consumeComplejoVitaminicoSuplemento +
            ";" +
            res.data.cualConsumeComplejoVitaminicoSuplemento +
            ";" +
            res.data.fumaActual +
            ";" +
            res.data.fumaAntes +
            ";" +
            res.data.alcoholActual +
            ";" +
            res.data.embarazoAntes +
            ";" +
            res.data.cuantosEmbarazoAntes +
            ";" +
            res.data.hijos +
            ";" +
            res.data.cuantosHijos +
            ";" +
            res.data.observacionesBloque1 +
            ";" +
            res.data.pais +
            ";" +
            res.data.provincia +
            ";" +
            res.data.personasVivienda +
            ";" +
            res.data.habitacionesVivienda +
            ";" +
            res.data.desagueCloaca +
            ";" +
            res.data.aguaPotable +
            ";" +
            res.data.redElectrica +
            ";" +
            res.data.gasNatural +
            ";" +
            res.data.nivelEducativo +
            ";" +
            res.data.empleo +
            ";" +
            res.data.asistenciaEstado +
            ";" +
            res.data.cualAsistenciaEstado +
            ";" +
            res.data.recibioBolson +
            ";" +
            res.data.recibioTickets +
            ";" +
            res.data.recibioTarjeta +
            ";" +
            res.data.recibioLeche +
            ";" +
            res.data.recibioOtra +
            ";" +
            res.data.cualUltimoMesRecibio +
            ";" +
            res.data.ingresoIndividual +
            ";" +
            res.data.ingresoTotal +
            ";" +
            res.data.recibioIFE +
            ";" +
            res.data.observacionesBloque2 +
            ";" +
            res.data.pesoKG +
            ";" +
            res.data.ropaAlPesar +
            "; " +
            res.data.talla +
            "; " +
            res.data.tallaSentada +
            ";" +
            res.data.perimetroBraquial +
            ";" +
            res.data.pliegueTricipital +
            ";" +
            res.data.pliegueBicipital +
            ";" +
            res.data.pliegueSubescapular +
            ";" +
            res.data.pliegueSuprailiaco +
            ";" +
            res.data.observacionesBloque3 +
            ";" +
            res.data.preocupadoSuficienteAlimentos +
            ";" +
            res.data.podidoAlimentos +
            ";" +
            res.data.comidoPocaVariedad +
            ";" +
            res.data.dejarDesayunoAlmuerzoCena +
            ";" +
            res.data.comidoMenos +
            ";" +
            res.data.sinAlimentos +
            ";" +
            res.data.sentidoHambre +
            ";" +
            res.data.dejadoComer +
            ";" +
            res.data.observacionesBloque4Parte1 +
            ";" +
            this.getRecordatorios(res.data.recordatorio24Horas) +
            ";" +
            res.data.observacionesBloque4Parte2 +
            ";" +
            res.data.desayuno +
            ";" +
            res.data.almuerzo +
            ";" +
            res.data.merienda +
            ";" +
            res.data.cena +
            ";" +
            res.data.frecuenciaConsumo +
            ";" +
            res.data.golosinas +
            ";" +
            res.data.panBlanco +
            ";" +
            res.data.pan +
            ";" +
            res.data.copetin +
            ";" +
            res.data.frutas +
            ";" +
            res.data.lacteos +
            ";" +
            res.data.bebidas +
            ";" +
            res.data.otros +
            ";" +
            res.data.nsnc +
            ";" +
            res.data.observacionesBloque4Parte3 +
            ";" +
            res.data.consumioLeche +
            ";" +
            res.data.consumioFrutasFrescas +
            ";" +
            res.data.consumioVerduras +
            ";" +
            res.data.consumioPapa +
            ";" +
            res.data.consumioCereales +
            ";" +
            res.data.consumioEmbutidos +
            ";" +
            res.data.observacionesBloque4Parte4 +
            ";" +
            res.data.consumioCarne +
            ";" +
            res.data.consumioPescado +
            ";" +
            res.data.consumioAceites +
            ";" +
            res.data.consumioFrutasFrescas +
            ";" +
            res.data.consumioProductosCopetin +
            ";" +
            res.data.consumioGolosinas +
            ";" +
            res.data.observacionesBloque4Parte5 +
            "\n";
        }
        if (this.encuestas[index].tipoEncuesta == "Tercer trimestre") {
          const res = await this.axios.get(
            `${this.baseUrl}/encuestas3Trimestre/` + this.encuestas[index]._id
          );

          texto3Trimestre +=
            res.data.nombreApellidoEncuestador1 +
            "; " +
            res.data.telefonoEncuestador1 +
            "; " +
            res.data.emailEncuestador1 +
            "; " +
            res.data.nombreApellidoEncuestador2 +
            "; " +
            res.data.telefonoEncuestador2 +
            "; " +
            res.data.emailEncuestador2 +
            "; " +
            res.data.fechaRelevamiento +
            "; " +
            res.data.lugarRelevamiento +
            "; " +
            res.data.nombreApellido +
            ";" +
            res.data.dni +
            ";" +
            res.data.fechaNacimiento +
            ";" +
            res.data.domicilioBarrio +
            ";" +
            res.data.telefono +
            "; " +
            res.data.fechaUltimaMenstruacion +
            ";" +
            res.data.semanasGestacion +
            ";" +
            res.data.observacionesBloque0 +
            ";" +
            res.data.pesoKG +
            ";" +
            res.data.ropaAlPesar +
            "; " +
            res.data.talla +
            "; " +
            res.data.tallaSentada +
            ";" +
            res.data.perimetroBraquial +
            ";" +
            res.data.pliegueTricipital +
            ";" +
            res.data.pliegueBicipital +
            ";" +
            res.data.pliegueSubescapular +
            ";" +
            res.data.pliegueSuprailiaco +
            ";" +
            res.data.observacionesBloque3 +
            ";" +
            this.getRecordatorios(res.data.recordatorio24Horas) +
            ";" +
            res.data.observacionesBloque4 +
            "\n";
        }
        if (this.encuestas[index].tipoEncuesta == "Neonato") {
          const res = await this.axios.get(
            `${this.baseUrl}/encuestasNeonato/` + this.encuestas[index]._id
          );
          textoNeonato +=
            res.data.nombreApellidoEncuestador1 +
            ";" +
            res.data.telefonoEncuestador1 +
            ";" +
            res.data.emailEncuestador1 +
            ";" +
            res.data.nombreApellidoEncuestador2 +
            ";" +
            res.data.telefonoEncuestador2 +
            ";" +
            res.data.emailEncuestador2 +
            ";" +
            res.data.fechaRelevamiento +
            ";" +
            res.data.lugarRelevamiento +
            ";" +
            res.data.nombreApellido +
            ";" +
            res.data.dni +
            ";" +
            res.data.fechaNacimiento +
            ";" +
            res.data.domicilioBarrio +
            ";" +
            res.data.telefono +
            ";" +
            res.data.fechaNacimientoBebe +
            ";" +
            res.data.viaNacimiento +
            ";" +
            res.data.lugarNacimiento +
            ";" +
            res.data.nombreBebe +
            ";" +
            res.data.observacionesBloque0 +
            ";" +
            res.data.pesoKG +
            ";" +
            res.data.ropaAlPesar +
            ";" +
            res.data.talla +
            ";" +
            res.data.perimetroCefalico +
            ";" +
            res.data.circunsferenciaBrazo +
            ";" +
            res.data.NombreApellidoMadre +
            ";" +
            res.data.dniMadre +
            ";" +
            res.data.observacionesBloque5 +
            "\n";
        }
      }
      var texto =
        texto1y2Trimestre + "\n" + texto3Trimestre + "\n" + textoNeonato;
      var blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
      this.loading = false;
      FileSaver.saveAs(blob, "Encuestas.csv");
    },
  },
};
</script>
