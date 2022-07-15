<template>
  <div class="encuestas">
    <h2 class="grey--text">
      <span>Administrar Encuestas</span>
    </h2>
    <hr />
    <v-row justify="center">
      <v-col cols="12" sm="10" class="mx-10 my-14">
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
                  <v-dialog v-model="dialogExportar" max-width="800px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="success"
                        text
                        outlined
                        dark
                        class="mx-2 caption"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Exportar a csv
                        <v-icon dark right> mdi-file-excel </v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Exportar a CSV</span>
                      </v-card-title>
                      <v-card-text>                        
                        <v-container>
                          <v-card-subtitle class="text-subtitle-1">Exportar según rango de fechas y/o encuestador</v-card-subtitle>
                          <v-row>
                            <v-col cols="12" md="3">
                              <v-menu
                                v-model="menu1"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="fecha1"
                                    label="Fecha 1"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="fecha1"
                                  @input="menu1 = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="12" md="3" >
                              <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="fecha2"
                                    label="Fecha 2"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="fecha2"
                                  @input="menu2 = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="12" md="4" >
                            <v-select
                                v-model="emailUsuario"
                                :items="usuarios"
                                item-value="email"
                                item-text="email"
                                label="E-mail del encuestador"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" md="2">
                              <v-btn
                                  text
                                  outlined
                                  @click="exportarEncuestasPorRangoFechas"
                                  :loading="loading2"
                                  class="mt-3 caption"
                                  dark
                                  color="success"
                                  >Exportar                                 
                                </v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn class="mx-2 caption" color="blue darken-1" text @click="dialogExportar = false">
                          Cancelar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          outlined
                          @click="exportarEncuestas"
                          :loading="loading"
                          class="mx-2 caption"
                          dark
                          color="success"
                          >Exportar todas las encuestas                             
                        </v-btn>
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
    emailEncuestador1,
    emailEncuestador2,
    dni,
    fechaRelevamiento,
    tipoEncuesta,
  ) {
    this.emailEncuestador1 = emailEncuestador1;
    this.emailEncuestador2 = emailEncuestador2;
    this.dni = dni;
    this.fechaRelevamiento = fechaRelevamiento;
    this.tipoEncuesta = tipoEncuesta;
  }
}

export default {
  name: "Encuestas",
  components: { VerTercerTrimestre, VerPrimerySegundoTrimestre, VerNeonato },
  data() {
    return {
      menu1: false,
      menu2: false,
      loading: false,
      loading2: false,
      dialogExportar: false,
      fecha1: "",
      fecha2: "",
      search: "",
      encuestas: [],
      encuestasExportar: [],
      encuesta: new Encuesta(),
      editedEncuesta: new Encuesta(),
      baseUrl: "https://tpftestbackend.herokuapp.com",
      headers: [
        {
          text: "Email del encuestador 1",
          align: "start",
          value: "emailEncuestador1",
        },
        { text: "Email del encuestador 2", value: "emailEncuestador2" },
        { text: "DNI embarazada", value: "dni", filterable: false },
        { text: "Fecha de relevamiento", value: "fechaRelevamiento", filterable: false },
        { text: "Tipo encuesta", value: "tipoEncuesta", filterable: false},
        { text: "Ver", value: "actions", sortable: false, filterable: false },
      ],
      usuarios: [{email: ""}],
      emailUsuario: null,
    };
  },
  created() {
    this.getEncuestas();
    this.getUsuarios();
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
    async getUsuarios() {
      const res = await this.axios.get(
        `${this.baseUrl}/usuarios`
      );
      this.usuarios = this.usuarios.concat(res.data);
    },
    getRecordatorios(recordatorio24Horas) {
      var salida = "";
      for (var i = 0; i < recordatorio24Horas.length; i++) {
        salida +=
          "{  " +
          recordatorio24Horas[i].alimento +
          "  }  ";
      }
      return salida;
    },
    getLugarRelevamiento(lugarRelevamiento) {
      if (lugarRelevamiento == null) return "";
      else return lugarRelevamiento.codigo;
    },
    getValor(entrada) {
      if (entrada == null) return "";
      else return entrada.valor;
    },

    async exportarEncuestas() {
      // Genera un archivo .csv separando los datos con ;
      this.loading = true;
      var FileSaver = require("file-saver");
      var header1y2Trimestre =
        "Encuestas \n nombreApellidoEncuestador1; telefonoEncuestador1; emailEncuestador1; nombreApellidoEncuestador2; telefonoEncuestador2; emailEncuestador2; fechaRelevamiento; lugarRelevamiento; nombreApellido; dni; fechaNacimiento; domicilioBarrio; telefono; fechaUltimaMenstruacion; semanasGestacion; observacionesBloque0; diabetes; enfermedadRenal; hipertension; colesterolTrigliceridosAltos; asmaEPOC; covid19; anemia; enfermedadCronica; cualEnfermedadCronica; consumeMedicamento; cualConsumeMedicamento; consumeComplejoVitaminicoSuplemento; cualConsumeComplejoVitaminicoSuplemento; fumaActual; fumaAntes; alcoholActual; embarazoAntes; cuantosEmbarazoAntes; hijos; cuantosHijos; observacionesBloque1; pais; provincia; personasVivienda; habitacionesVivienda; desagueCloaca; aguaPotable; redElectrica; gasNatural; nivelEducativo; empleo; asistenciaEstado; cualAsistenciaEstado; recibioBolson; recibioTickets; recibioTarjeta; recibioLeche; recibioOtra; cualUltimoMesRecibio; ingresoIndividual; ingresoTotal; recibioIFE; observacionesBloque2; pesoKG; ropaAlPesar; talla; tallaSentada; perimetroBraquial; pliegueTricipital; pliegueBicipital; pliegueSubescapular; pliegueSuprailiaco; observacionesBloque3; recordatorio24Horas; observacionesBloque4Parte1; desayuno; almuerzo; merienda; cena; frecuenciaConsumo; golosinas; panBlanco; pan; copetin; frutas; lacteos; bebidas; otros; nsnc; observacionesBloque4Parte2; consumioLeche; consumioFrutasFrescas; consumioVerduras; consumioPapa; consumioCereales; consumioEmbutidos; consumioCarne; consumioPescado; consumioAceites; consumioFrutasSecas; consumioProductosCopetin; consumioGolosinas; observacionesBloque4Parte3; preocupadoSuficienteAlimentos; podidoAlimentos; comidoPocaVariedad; dejarDesayunoAlmuerzoCena; comidoMenos; sinAlimentos; sentidoHambre; dejadoComer; observacionesBloque5; ";
      var header3Trimestre =
        "2_nombreApellidoEncuestador1; 2_telefonoEncuestador1; 2_emailEncuestador1; 2_nombreApellidoEncuestador2; 2_telefonoEncuestador2; 2_emailEncuestador2; 2_fechaRelevamiento; 2_lugarRelevamiento; 2_pesoKG; 2_ropaAlPesar; 2_talla; 2_tallaSentada; 2_perimetroBraquial; 2_pliegueTricipital; 2_pliegueBicipital; 2_pliegueSubescapular; 2_pliegueSuprailiaco; 2_observacionesBloque3; 2_recordatorio24Horas; 2_observacionesBloque4; ";
      var headerNeonato =
        "3_nombreApellidoEncuestador1; 3_telefonoEncuestador1; 3_emailEncuestador1; 3_nombreApellidoEncuestador2; 3_telefonoEncuestador2; 3_emailEncuestador2; 3_fechaRelevamiento; 3_lugarRelevamiento; 3_fechaNacimientoBebe; 3_viaNacimiento; 3_lugarNacimiento; 3_nombreBebe; 3_edadGestacional; 3_pesoKG; 3_ropaAlPesar; 3_talla; 3_perimetroCefalico; 3_circunsferenciaBrazo; 3_observacionesBloque5";

      var header = header1y2Trimestre + header3Trimestre + headerNeonato;
      var body = "";

      let dnis = [];

      for (var index in this.encuestas) {
        if (!dnis.includes(this.encuestas[index].dni)) {
          const res1 = await this.axios.get(`${this.baseUrl}/encuestas1y2Trimestre/madre/` + this.encuestas[index].dni);
          if (res1 != null) {          
            body += this.getData1y2Trimestre(res1.data[0]);
          }
          const res2 = await this.axios.get(`${this.baseUrl}/encuestas3Trimestre/madre/` + this.encuestas[index].dni);
          if (res2.data[0] != null) {
            body += this.getData3Trimestre(res2.data[0]);
          }
          const res3 = await this.axios.get(`${this.baseUrl}/encuestasNeonato/madre/` + this.encuestas[index].dni);
          if (res3.data[0] != null) {
            body += this.getDataNeonato(res3.data[0]);
          }
          body += "\n";
        }
        dnis.push(this.encuestas[index].dni);        
      }
      var texto = header + "\n" + body;
      texto = texto.replace(/ /g, "")
      var blob = new Blob(["\uFEFF" + texto], {  type: "text/csv;charset=utf-8" });
      this.loading = false;
      this.dialogExportar = false;
      FileSaver.saveAs(blob, "Encuestas.csv");

    },
    async exportarEncuestasPorRangoFechas() {
      // Genera un archivo .csv separando los datos con ;
      this.loading2 = true;
      if (this.emailUsuario != "" && this.emailUsuario != null)
      {
        const res1 = await this.axios.get(
        `${this.baseUrl}/encuestas3Trimestre/user/` + this.emailUsuario
        );
        this.encuestasExportar = res1.data;
        const res2 = await this.axios.get(
          `${this.baseUrl}/encuestas1y2Trimestre/user/` + this.emailUsuario
        );
        this.encuestasExportar = this.encuestasExportar.concat(res2.data);
        const res3 = await this.axios.get(
          `${this.baseUrl}/encuestasNeonato/user/` + this.emailUsuario
        );
        this.encuestasExportar = this.encuestasExportar.concat(res3.data);
      } 
      else
        this.encuestasExportar = this.encuestas

      var FileSaver = require("file-saver");
      var header1y2Trimestre =
        "Encuestas \n nombreApellidoEncuestador1; telefonoEncuestador1; emailEncuestador1; nombreApellidoEncuestador2; telefonoEncuestador2; emailEncuestador2; fechaRelevamiento; lugarRelevamiento; nombreApellido; dni; fechaNacimiento; domicilioBarrio; telefono; fechaUltimaMenstruacion; semanasGestacion; observacionesBloque0; diabetes; enfermedadRenal; hipertension; colesterolTrigliceridosAltos; asmaEPOC; covid19; anemia; enfermedadCronica; cualEnfermedadCronica; consumeMedicamento; cualConsumeMedicamento; consumeComplejoVitaminicoSuplemento; cualConsumeComplejoVitaminicoSuplemento; fumaActual; fumaAntes; alcoholActual; embarazoAntes; cuantosEmbarazoAntes; hijos; cuantosHijos; observacionesBloque1; pais; provincia; personasVivienda; habitacionesVivienda; desagueCloaca; aguaPotable; redElectrica; gasNatural; nivelEducativo; empleo; asistenciaEstado; cualAsistenciaEstado; recibioBolson; recibioTickets; recibioTarjeta; recibioLeche; recibioOtra; cualUltimoMesRecibio; ingresoIndividual; ingresoTotal; recibioIFE; observacionesBloque2; pesoKG; ropaAlPesar; talla; tallaSentada; perimetroBraquial; pliegueTricipital; pliegueBicipital; pliegueSubescapular; pliegueSuprailiaco; observacionesBloque3; recordatorio24Horas; observacionesBloque4Parte1; desayuno; almuerzo; merienda; cena; frecuenciaConsumo; golosinas; panBlanco; pan; copetin; frutas; lacteos; bebidas; otros; nsnc; observacionesBloque4Parte2; consumioLeche; consumioFrutasFrescas; consumioVerduras; consumioPapa; consumioCereales; consumioEmbutidos; consumioCarne; consumioPescado; consumioAceites; consumioFrutasSecas; consumioProductosCopetin; consumioGolosinas; observacionesBloque4Parte3; preocupadoSuficienteAlimentos; podidoAlimentos; comidoPocaVariedad; dejarDesayunoAlmuerzoCena; comidoMenos; sinAlimentos; sentidoHambre; dejadoComer; observacionesBloque5; ";
      var header3Trimestre =
        "2_nombreApellidoEncuestador1; 2_telefonoEncuestador1; 2_emailEncuestador1; 2_nombreApellidoEncuestador2; 2_telefonoEncuestador2; 2_emailEncuestador2; 2_fechaRelevamiento; 2_lugarRelevamiento; 2_pesoKG; 2_ropaAlPesar; 2_talla; 2_tallaSentada; 2_perimetroBraquial; 2_pliegueTricipital; 2_pliegueBicipital; 2_pliegueSubescapular; 2_pliegueSuprailiaco; 2_observacionesBloque3; 2_recordatorio24Horas; 2_observacionesBloque4; ";
      var headerNeonato =
        "3_nombreApellidoEncuestador1; 3_telefonoEncuestador1; 3_emailEncuestador1; 3_nombreApellidoEncuestador2; 3_telefonoEncuestador2; 3_emailEncuestador2; 3_fechaRelevamiento; 3_lugarRelevamiento; 3_fechaNacimientoBebe; 3_viaNacimiento; 3_lugarNacimiento; 3_nombreBebe; 3_edadGestacional; 3_pesoKG; 3_ropaAlPesar; 3_talla; 3_perimetroCefalico; 3_circunsferenciaBrazo; 3_observacionesBloque5";

      var header = header1y2Trimestre + header3Trimestre + headerNeonato;
      var body = "";

      let dnis = []

      for (var index in this.encuestasExportar) {
        if ( !dnis.includes(this.encuestasExportar[index].dni) 
          && ((this.fecha1 != "" && this.encuestasExportar[index].fechaRelevamiento >= this.fecha1) || this.fecha1 == "") 
          && ((this.fecha2 != "" && this.encuestasExportar[index].fechaRelevamiento <= this.fecha2 ) || this.fecha2 == "")
        ) {          
          const res1 = await this.axios.get(`${this.baseUrl}/encuestas1y2Trimestre/madre/` + this.encuestasExportar[index].dni);
          if (res1 != null) {          
            body += this.getData1y2Trimestre(res1.data[0]);
          }
          const res2 = await this.axios.get(`${this.baseUrl}/encuestas3Trimestre/madre/` + this.encuestasExportar[index].dni);
          if (res2.data[0] != null) {
            body += this.getData3Trimestre(res2.data[0]);
          }
          const res3 = await this.axios.get(`${this.baseUrl}/encuestasNeonato/madre/` + this.encuestasExportar[index].dni);
          if (res3.data[0] != null) {
            body += this.getDataNeonato(res3.data[0]);
          }
          body += "\n";
          dnis.push(this.encuestasExportar[index].dni)
        }
      }    
      var texto = header + "\n" + body;
      texto = texto.replace(/ /g, "")
      var blob = new Blob(["\uFEFF" + texto], {  type: "text/csv;charset=utf-8" });
      this.loading2 = false;
      this.dialogExportar = false;
      FileSaver.saveAs(blob, "Encuestas.csv");
    },

    getData1y2Trimestre(data) {
      var salida = "";
      salida += data.nombreApellidoEncuestador1 +
        "; " +
        data.telefonoEncuestador1 +
        "; " +
        data.emailEncuestador1 +
        "; " +
        data.nombreApellidoEncuestador2 +
        "; " +
        data.telefonoEncuestador2 +
        "; " +
        data.emailEncuestador2 +
        "; " +
        data.fechaRelevamiento +
        "; " +
        this.getLugarRelevamiento(data.lugarRelevamiento) +
        "; " +
        data.nombreApellido +
        "; " +
        data.dni +
        ";" +
        data.fechaNacimiento +
        ";" +
        data.domicilioBarrio +
        ";" +
        data.telefono +
        "; " +
        data.fechaUltimaMenstruacion +
        ";" +
        data.semanasGestacion +
        ";" +
        data.observacionesBloque0 +
        ";" +
        data.diabetes +
        ";" +
        data.enfermedadRenal +
        ";" +
        data.hipertension +
        ";" +
        data.colesterolTrigliceridosAltos +
        ";" +
        data.asmaEPOC +
        ";" +
        data.covid19 +
        ";" +
        data.anemia +
        ";" +
        data.enfermedadCronica +
        ";" +
        data.cualEnfermedadCronica +
        ";" +
        data.consumeMedicamento +
        ";" +
        data.cualConsumeMedicamento +
        ";" +
        data.consumeComplejoVitaminicoSuplemento +
        ";" +
        data.cualConsumeComplejoVitaminicoSuplemento +
        ";" +
        data.fumaActual +
        ";" +
        data.fumaAntes +
        ";" +
        data.alcoholActual +
        ";" +
        data.embarazoAntes +
        ";" +
        data.cuantosEmbarazoAntes +
        ";" +
        data.hijos +
        ";" +
        data.cuantosHijos +
        ";" +
        data.observacionesBloque1 +
        ";" +
        data.pais +
        ";" +
        data.provincia +
        ";" +
        data.personasVivienda +
        ";" +
        data.habitacionesVivienda +
        ";" +
        data.desagueCloaca +
        ";" +
        data.aguaPotable +
        ";" +
        data.redElectrica +
        ";" +
        data.gasNatural +
        ";" +
        this.getValor(data.nivelEducativo) +
        ";" +
        this.getValor(data.empleo) +
        ";" +
        data.asistenciaEstado +
        ";" +
        this.getValor(data.cualAsistenciaEstado) +
        ";" +
        data.recibioBolson +
        ";" +
        data.recibioTickets +
        ";" +
        data.recibioTarjeta +
        ";" +
        data.recibioLeche +
        ";" +
        data.recibioOtra +
        ";" +
        data.cualUltimoMesRecibio +
        ";" +
        this.getValor(data.ingresoIndividual) +
        ";" +
        this.getValor(data.ingresoTotal) +
        ";" +
        data.recibioIFE +
        ";" +
        data.observacionesBloque2 +
        ";" +
        data.pesoKG +
        ";" +
        data.ropaAlPesar +
        "; " +
        data.talla +
        "; " +
        data.tallaSentada +
        ";" +
        data.perimetroBraquial +
        ";" +
        data.pliegueTricipital +
        ";" +
        data.pliegueBicipital +
        ";" +
        data.pliegueSubescapular +
        ";" +
        data.pliegueSuprailiaco +
        ";" +
        data.observacionesBloque3 +            
        ";" +
        this.getRecordatorios(data.recordatorio24Horas) +
        ";" +
        data.observacionesBloque4Parte1 +
        ";" +
        data.desayuno +
        ";" +
        data.almuerzo +
        ";" +
        data.merienda +
        ";" +
        data.cena +
        ";" +
        this.getValor(data.frecuenciaConsumo) +
        ";" +
        data.golosinas +
        ";" +
        data.panBlanco +
        ";" +
        data.pan +
        ";" +
        data.copetin +
        ";" +
        data.frutas +
        ";" +
        data.lacteos +
        ";" +
        data.bebidas +
        ";" +
        data.otros +
        ";" +
        data.nsnc +
        ";" +
        data.observacionesBloque4Parte2 +
        ";" +
        this.getValor(data.consumioLeche) +
        ";" +
        this.getValor(data.consumioFrutasFrescas) +
        ";" +
        this.getValor(data.consumioVerduras) +
        ";" +
        this.getValor(data.consumioPapa) +
        ";" +
        this.getValor(data.consumioCereales) +
        ";" +
        this.getValor(data.consumioEmbutidos) +
        ";" +
        this.getValor(data.consumioCarne) +
        ";" +
        this.getValor(data.consumioPescado) +
        ";" +
        this.getValor(data.consumioAceites) +
        ";" +
        this.getValor(data.consumioFrutasSecas) +
        ";" +
        this.getValor(data.consumioProductosCopetin) +
        ";" +
        this.getValor(data.consumioGolosinas) +
        ";" +
        data.observacionesBloque4Parte3 +
        ";" +
        data.preocupadoSuficienteAlimentos +
        ";" +
        data.podidoAlimentos +
        ";" +
        data.comidoPocaVariedad +
        ";" +
        data.dejarDesayunoAlmuerzoCena +
        ";" +
        data.comidoMenos +
        ";" +
        data.sinAlimentos +
        ";" +
        data.sentidoHambre +
        ";" +
        data.dejadoComer +
        ";" +
        data.observacionesBloque5 +
        ";";

        return salida;
    },

    getData3Trimestre(data) {
      var salida = "";
      salida += data.nombreApellidoEncuestador1 +
        "; " +
        data.telefonoEncuestador1 +
        "; " +
        data.emailEncuestador1 +
        "; " +
        data.nombreApellidoEncuestador2 +
        "; " +
        data.telefonoEncuestador2 +
        "; " +
        data.emailEncuestador2 +
        "; " +
        data.fechaRelevamiento +
        "; " +
        this.getLugarRelevamiento(data.lugarRelevamiento) + 
        ";" +
        data.pesoKG +
        ";" +
        data.ropaAlPesar +
        "; " +
        data.talla +
        "; " +
        data.tallaSentada +
        ";" +
        data.perimetroBraquial +
        ";" +
        data.pliegueTricipital +
        ";" +
        data.pliegueBicipital +
        ";" +
        data.pliegueSubescapular +
        ";" +
        data.pliegueSuprailiaco +
        ";" +
        data.observacionesBloque3 +
        ";" +
        this.getRecordatorios(data.recordatorio24Horas) +
        ";" +
        data.observacionesBloque4 +
        ";";
      
      return salida;
    },    
    getDataNeonato(data) {
      var salida = "";
      salida += data.nombreApellidoEncuestador1 +
        ";" +
        data.telefonoEncuestador1 +
        ";" +
        data.emailEncuestador1 +
        ";" +
        data.nombreApellidoEncuestador2 +
        ";" +
        data.telefonoEncuestador2 +
        ";" +
        data.emailEncuestador2 +
        ";" +
        data.fechaRelevamiento +
        ";" +
        this.getLugarRelevamiento(data.lugarRelevamiento) +
        ";" +
        data.fechaNacimientoBebe +
        ";" +
        data.viaNacimiento +
        ";" +
        data.lugarNacimiento +
        ";" +
        data.nombreBebe +
        ";" +
        data.observacionesBloque0 +
        ";" +
        data.pesoKG +
        ";" +
        data.ropaAlPesar +
        ";" +
        data.talla +
        ";" +
        data.perimetroCefalico +
        ";" +
        data.circunsferenciaBrazo +       
        ";" +
        data.observacionesBloque5;

        return salida;
    }
  },
};
</script>
