<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1200">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Nueva encuesta tercer trimestre
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="text-center text-h5 font-weight-regular blue-grey--text"
        >
          Nueva encuesta tercer trimestre
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text>
          <v-card ref="form" width="5000px">
            <v-card-title
              class="text-h5 font-weight-regular blue-grey white--text"
              >Bloque 0. Datos de los encuestadores y
              participantes</v-card-title
            >
            <v-divider></v-divider>
            <v-card-subtitle
              ><h3 color="black">Datos encuestador</h3></v-card-subtitle
            >
            <v-divider class="mx-3"></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.nombreApellidoEncuestador1"
                    label="Nombre y apellido Encuestador 1"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.telefonoEncuestador1"
                    label="Teléfono"
                    type="number"
                    min="0"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.emailEncuestador1"
                    :rules="rules.email"
                    label="E-mail"
                    hint="email@example.com"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.nombreApellidoEncuestador2"
                    label="Nombre y apellido Encuestador 2"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.telefonoEncuestador2"
                    label="Teléfono"
                    type="number"
                    min="0"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.emailEncuestador2"
                    :rules = "rules.email"
                    label="E-mail"
                    hint="email@example.com"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
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
                        v-model="encuesta.fechaRelevamiento"
                        label="Fecha de relevamiento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="encuesta.fechaRelevamiento"
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                  v-model="encuesta.lugarRelevamiento"
                  :items="lugares"
                  item-value="nombre"
                  item-text="nombre"
                  label="Lugar de relevamiento"
                ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-card-subtitle
              ><h3>Embarazadas 3er trimestre</h3></v-card-subtitle
            >
            <v-divider class="mx-3"></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.nombreApellido"
                    label="Nombre y apellido"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.dni"
                    label="DNI"
                    type="number"
                    min="0"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
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
                        v-model="encuesta.fechaNacimiento"
                        label="Fecha de nacimiento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="encuesta.fechaNacimiento"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="encuesta.domicilioBarrio"
                    label="Domicilio/barrio"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.telefono"
                    label="Teléfono"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="encuesta.fechaUltimaMenstruacion"
                        label="Fecha de nacimiento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="encuesta.fechaUltimaMenstruacion"
                      @input="menu3 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.semanasGestacion"
                    label="Semanas de gestación"
                    type="number"
                    min="0"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="encuesta.observacionesBloque0"
                    label="Observaciones"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-title
              class="text-h5 font-weight-regular blue-grey white--text"
              >Bloque 3. Antropometría embarazada</v-card-title
            >
            <v-divider></v-divider>
            <v-card-subtitle
              ><h3>
                Ahora vamos a hacer algunas mediciones para conocer su peso, su
                altura y otros datos de su composición corporal.
              </h3></v-card-subtitle
            >
            <v-divider class="mx-3"></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pesoKG"
                    label="3.1 Peso"
                    suffix="Kg"
                    type="number"
                    min="0"
                    :rules="rules.number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.ropaAlPesar"
                    label="Ropa"
                    hint="Especificar la ropa que tiene puesta al momento de tomar
                      el peso"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.talla"
                    label="3.2 Talla"
                    suffix="cm"
                    type="number"
                    min="0"
                    :rules="rules.number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.tallaSentada"
                    label="3.3 Talla sentada"
                    suffix="cm"
                    type="number"
                    min="0"
                    :rules="rules.number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.perimetroBraquial"
                    label="3.4 Perímetro braquial"
                    suffix="cm"
                    type="number"
                    min="0"
                    hint="Las mediciones entre 3.4 y 3.8 tomarlas del lado derecho
                      del cuerpo."
                    persistent-hint
                    :rules="rules.number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueTricipital"
                    label="3.5 Pliegue tricipital"
                    suffix="cm"
                    type="number"
                    min="0"
                    :rules="rules.number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueBicipital"
                    label="3.6 Pliegue bicipital"
                    suffix="cm"
                    type="number"
                    min="0"
                    :rules="rules.number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueSubescapular"
                    label="3.7 Pliegue subescapular"
                    suffix="cm"
                    type="number"
                    min="0"
                    :rules="rules.number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueSuprailiaco"
                    label="3.8 Pliegue suprailíaco"
                    suffix="cm"
                    type="number"
                    min="0"
                    :rules="rules.number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="encuesta.observacionesBloque3"
                    label="Observaciones"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-title
              class="text-h5 font-weight-regular blue-grey white--text"
              >Bloque 4. Inseguridad alimentaria y datos nutricionales
              (continuación)</v-card-title
            >
            <v-divider></v-divider>
            <v-card-subtitle
              ><h3 class="font-weight-regular">4.9 Recordatorio 24 horas</h3></v-card-subtitle
            >
            <v-container>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Hora del día</th>
                      <th class="text-left">Tipo de alimento</th>
                      <th class="text-left">Cantidad</th>
                      <th class="text-left">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <v-menu
                          ref="menu"
                          v-model="menu4"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="recordatorio.horaDia"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="recordatorio.horaDia"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menu4"
                            v-model="recordatorio.horaDia"
                            full-width
                            @click:minute="
                              $refs.menu.save(recordatorio.horaDia)
                            "
                          ></v-time-picker>
                        </v-menu>
                      </td>
                      <td>
                        <v-text-field
                          v-model="recordatorio.tipoAlimento"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="recordatorio.cantidad"
                          type="number"
                          min="0"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="indigo"
                          @click="agregarRecordatorio"
                        >
                          <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    <tr
                      v-for="recordatorio in recordatorios"
                      :key="recordatorio._id"
                    >
                      <td>{{ recordatorio.horaDia }}</td>
                      <td>{{ recordatorio.tipoAlimento }}</td>
                      <td>{{ recordatorio.cantidad }}</td>
                      <td>
                        <v-icon
                          small
                          class="mr-2"
                          @click="editarRecordatorio(recordatorio)"
                        >
                          mdi-pencil
                        </v-icon>
                        <v-icon
                          small
                          @click="eliminarRecordatorio(recordatorio)"
                        >
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="encuesta.observacionesBloque4"
                    label="Observaciones"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <v-divider class="mt-3"></v-divider>
            <v-card-actions class="mx-4">
              <v-btn
                color="primary"
                text
                @click="agregarEncuesta"
                :loading="loading"
              >
                Agregar encuesta
              </v-btn>

              <v-btn class="mr-4" text @click="limpiarEncuesta">
                Limpiar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false"> Cerrar </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
class Recordatorio24hs {
  constructor(horaDia, tipoAlimento, cantidad) {
    this.horaDia = horaDia;
    this.tipoAlimento = tipoAlimento;
    this.cantidad = cantidad;
  }
}

class Encuesta {
  constructor(
    nombreApellidoEncuestador1,
    telefonoEncuestador1,
    emailEncuestador1,
    nombreApellidoEncuestador2,
    telefonoEncuestador2,
    emailEncuestador2,
    fechaRelevamiento,
    lugarRelevamiento,
    nombreApellido,
    dni,
    fechaNacimiento,
    domicilioBarrio,
    telefono,
    fechaUltimaMenstruacion,
    semanasGestacion,
    observacionesBloque0,
    pesoKG,
    ropaAlPesar,
    talla,
    tallaSentada,
    perimetroBraquial,
    pliegueTricipital,
    pliegueBicipital,
    pliegueSubescapular,
    pliegueSuprailiaco,
    observacionesBloque3,
    recordatorio24Horas,
    observacionesBloque4
  ) {
    this.nombreApellidoEncuestador1 = nombreApellidoEncuestador1;
    this.telefonoEncuestador1 = telefonoEncuestador1;
    this.emailEncuestador1 = emailEncuestador1;
    this.nombreApellidoEncuestador2 = nombreApellidoEncuestador2;
    this.telefonoEncuestador2 = telefonoEncuestador2;
    this.emailEncuestador2 = emailEncuestador2;
    this.fechaRelevamiento = fechaRelevamiento;
    this.lugarRelevamiento = lugarRelevamiento;
    this.nombreApellido = nombreApellido;
    this.dni = dni;
    this.fechaNacimiento = fechaNacimiento;
    this.domicilioBarrio = domicilioBarrio;
    this.telefono = telefono;
    this.fechaUltimaMenstruacion = fechaUltimaMenstruacion;
    this.semanasGestacion = semanasGestacion;
    this.observacionesBloque0 = observacionesBloque0;
    this.pesoKG = pesoKG;
    this.ropaAlPesar = ropaAlPesar;
    this.talla = talla;
    this.tallaSentada = tallaSentada;
    this.perimetroBraquial = perimetroBraquial;
    this.pliegueTricipital = pliegueTricipital;
    this.pliegueBicipital = pliegueBicipital;
    this.pliegueSubescapular = pliegueSubescapular;
    this.pliegueSuprailiaco = pliegueSuprailiaco;
    this.observacionesBloque3 = observacionesBloque3;
    this.recordatorio24Horas = recordatorio24Horas;
    this.observacionesBloque4 = observacionesBloque4;
    this.tipoEncuesta = "Tercer trimestre";
  }
}
export default {
  data() {
    return {
      dialog: false,
      encuesta: new Encuesta(),
      encuestas: [],
      recordatorios: [],
      recordatorio: new Recordatorio24hs(),
      baseUrl: "https://tpftestbackend.herokuapp.com",
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      loading: false,
      dialog: false,
      rules: {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        number: [(val) => /^[0-9]\d*(\.\d+)?$/.test(val) || "Usar punto"],
        obligatorio: [o=> !!o || 'Este campo es obligatorio'],
      },
      lugares: [],
    };
  },
  created() {
    this.getLugares();
  },
  methods: {
    async agregarEncuesta() {
      this.loading = true;
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      this.encuesta.recordatorio24Horas = this.recordatorios;
      this.axios
        .post(
          `${this.baseUrl}/encuestas1y2Trimestre`,
          JSON.stringify(this.encuesta),
          { headers }
        )
        .then((result) => {
          this.loading = false;
          this.encuesta = new Encuesta();
          this.recordatorios = [];
          this.dialog = false;
          this.$emit("encuestaAgregada");
        });
    },
    limpiarEncuesta() {
      this.encuesta = new Encuesta();
    },
    async getLugares() {
      const res = await this.axios.get(`${this.baseUrl}/lugares`);
      this.lugares = res.data;
    },
    agregarRecordatorio() {
      this.recordatorios.push(this.recordatorio);
      this.recordatorio = new Recordatorio24hs();
    },
    eliminarRecordatorio(recordatorio) {
      this.recordatorios.splice(this.recordatorios.indexOf(recordatorio), 1);
    },
    editarRecordatorio(recordatorio) {
      this.recordatorio.horaDia = this.recordatorios[this.recordatorios.indexOf(recordatorio)].horaDia;
      this.recordatorio.tipoAlimento = this.recordatorios[this.recordatorios.indexOf(recordatorio)].tipoAlimento;
      this.recordatorio.cantidad = this.recordatorios[this.recordatorios.indexOf(recordatorio)].cantidad;
      this.recordatorios.splice(this.recordatorios.indexOf(recordatorio), 1);
    },
  },
};
</script>
