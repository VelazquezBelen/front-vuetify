<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1200">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="primary" v-bind="attrs" v-on="on" class="caption" @click="completarDatosMadre(); autocompletar(); resetearValidacion()">
          Nueva encuesta neonato
        </v-btn>
      </template>
      <v-form ref="obligatorio">
        <v-card>
          <v-card-title
            class="text-center text-h5 font-weight-regular blue-grey--text"
          >
            Nueva encuesta neonato
          </v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-card-text>
            <v-card ref="form" width="5000px" >
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
                      :rules="rules.obligatorio"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="encuesta.telefonoEncuestador1"
                      label="Teléfono"
                      type="number"
                      min="0"
                      :rules="rules.obligatorio"
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
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="encuesta.nombreApellidoEncuestador2"
                      label="Nombre y apellido Encuestador 2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="encuesta.telefonoEncuestador2"
                      label="Teléfono"
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="encuesta.emailEncuestador2"
                      label="E-mail"
                      hint="email@example.com"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
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
                      item-text="nivel"
                      label="Lugar de relevamiento"
                      return-object
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-subtitle><h3>Madre y recien nacido</h3></v-card-subtitle>
              <v-divider class="mx-3"></v-divider>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="encuesta.nombreApellido"
                      label="Nombre y apellido (madre)"
                      :rules="rules.obligatorio"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="encuesta.dni"
                      label="DNI (madre)"
                      type="number"
                      min="0"
                      :rules="rules.obligatorio"
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
                          label="Fecha de nacimiento (madre)"
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
                      :rules="rules.obligatorio"
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
                          v-model="encuesta.fechaNacimientoBebe"
                          label="Fecha de nacimiento (niño/a)"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="encuesta.fechaNacimientoBebe"
                        @input="menu3 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-radio-group
                      label="Via de nacimiento"
                      v-model="encuesta.viaNacimiento"
                      encuesta.viaNacimiento
                    >
                      <v-radio
                        label="Parto vaginal"
                        value="0"
                      ></v-radio>
                      <v-radio label="Cesárea" 
                      value="1">
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="encuesta.lugarNacimiento"
                      label="Lugar de nacimiento"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="encuesta.nombreBebe"
                      label="Nombre niño/a"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="encuesta.edadGestacional"
                      label="Edad Gestacional"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

              <v-card-title
                class="text-h5 font-weight-regular blue-grey white--text"
                >Bloque 5. Antropometría neonato</v-card-title
              >
              <v-divider></v-divider>
              <v-card-subtitle
                ><h3 color="black">
                  Ahora vamos a hacer algunas mediciones para conocer el peso,
                  largo y otros datos de la composición corporal del bebé.
                </h3></v-card-subtitle
              >
              <v-divider class="mx-3"></v-divider>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="encuesta.pesoKG"
                      label="5.1 Peso"
                      suffix="Kg"
                      type="number"
                      min="0"
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
                      label="5.2 Longitud (talla)"
                      suffix="cm"
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="encuesta.perimetroCefalico"
                      label="5.3 Perímetro cefálico"
                      suffix="cm"
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="encuesta.circunsferenciaBrazo"
                      label="5.4 Cincunsferencia del brazo"
                      suffix="cm"
                      type="number"
                      min="0"
                      hint="La medida 5.4 tomar del lado derecho del cuerpo."
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-subtitle><h3>Datos de la madre</h3></v-card-subtitle>
              <v-divider class="mx-3"></v-divider>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="encuesta.nombreApellido"
                      label="Nombre y apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="encuesta.dni"
                      label="DNI"
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="encuesta.observacionesBloque5"
                      label="Observaciones"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-divider class="mt-3"></v-divider>
              <v-card-actions class="mx-4">              
                <v-btn color="red" text @click="close"> Cerrar </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="mr-4" text @click="limpiarEncuesta">
                  Limpiar
                </v-btn> 
                <v-btn
                  color="primary"
                  text
                  @click="agregarEncuesta"
                  :loading="loading"
                >
                  Agregar encuesta
                </v-btn>                           
              </v-card-actions>
            </v-card>
          </v-card-text>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
class ParNivelValor {
  constructor(nivel, valor) {
    this.nivel = nivel;
    this.valor = valor;
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
    fechaNacimientoBebe,
    viaNacimiento,
    lugarNacimiento,
    nombreBebe,
    edadGestacional,
    pesoKG,
    ropaAlPesar,
    talla,
    perimetroCefalico,
    circunsferenciaBrazo,
    observacionesBloque5
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
    this.fechaNacimientoBebe = fechaNacimientoBebe;
    this.viaNacimiento = viaNacimiento;
    this.lugarNacimiento = lugarNacimiento;
    this.nombreBebe = nombreBebe;
    this.edadGestacional = edadGestacional;
    this.pesoKG = pesoKG;
    this.ropaAlPesar = ropaAlPesar;
    this.talla = talla;
    this.perimetroCefalico = perimetroCefalico;
    this.circunsferenciaBrazo = circunsferenciaBrazo;
    this.observacionesBloque5 = observacionesBloque5;
    this.tipoEncuesta = "Neonato";
  }
}
export default {
  props: ['dniMadre'],
  data() {
    return {
      dialog: false,
      encuesta: new Encuesta(),
      encuestas: [],
      baseUrl: "https://tpftestbackend.herokuapp.com",
      menu1: false,
      menu2: false,
      menu3: false,
      loading: false,
      dialog: false,
      rules: {
        email: [
          (v) => !!v || 'Este campo es obligatorio',
          (v) => /.+@.+/.test(v) || 'El E-mail debe ser valido',
        ],
        number: [
          (val) =>
            /^[0-9]\d*(\.\d+)?$/.test(val) || 'Usar punto en lugar de coma',
        ],
        obligatorio: [(o) => !!o || 'Este campo es obligatorio'],
      },
      lugares: [],
      controlValidacion: false,
    };
  },
  created() {
    this.getLugares();
    this.autocompletar();
  },
  methods: {
    async agregarEncuesta() {
      if (this.$refs.obligatorio.validate()) {
        this.loading = true;
        this.completarValoresDefault();
        const headers = {
          Accept: "application/json",
          "Content-type": "application/json",
        };
        this.axios
          .post(
            `${this.baseUrl}/encuestasNeonato`,
            JSON.stringify(this.encuesta),
            { headers }
          )
          .then((result) => {
            this.loading = false;
            this.encuesta = new Encuesta();
            this.dialog = false;
            this.$emit("encuestaAgregada");
            this.$emit("getEncuestas");
            this.$emit("cerarDialogNuevaEncuesta");
          });
        this.controlValidacion = true;
      }
      else {
        this.$emit("camposObligatorios");
      }
    },
    resetearValidacion() {
      if (this.controlValidacion) {
        this.$refs.obligatorio.reset();
      }
    },
    async completarDatosMadre() {
      if (this.dniMadre != "") {
        this.axios.get(`${this.baseUrl}/encuestas1y2Trimestre/madre/` + this.dniMadre)
        .then((res) => {
          if (res.data.length == 1) {
            this.encuesta.nombreApellido = res.data[0].nombreApellido;
            this.encuesta.dni = res.data[0].dni;
            this.encuesta.domicilioBarrio = res.data[0].domicilioBarrio;
            this.encuesta.fechaNacimiento = res.data[0].fechaNacimiento;
            this.encuesta.telefono = res.data[0].telefono;
          }
        });
      }
    },
    limpiarEncuesta() {
      this.encuesta = new Encuesta();
    },
    async getLugares() {
      const res = await this.axios.get(`${this.baseUrl}/lugares`);
      this.lugares = res.data;
    },
    autocompletar() {
      this.axios.get(`${this.baseUrl}/usuarios/email/` + this.$auth.user.email)
      .then((res) => {
        if (res.data.length == 1) {
          this.encuesta.nombreApellidoEncuestador1 = res.data[0].nombre;
          this.encuesta.telefonoEncuestador1 = res.data[0].telefono;
          this.encuesta.emailEncuestador1 = this.$auth.user.email;
        }
      });
    },
    close(){
      this.$emit("cerarDialogNuevaEncuesta");
    },
    completarValoresDefault() {
      if (this.encuesta.nombreApellidoEncuestador1 === null || this.encuesta.nombreApellidoEncuestador1 === undefined)
        this.encuesta.nombreApellidoEncuestador1 = "NA";
      if (this.encuesta.telefonoEncuestador1 === null || this.encuesta.telefonoEncuestador1 === undefined)
        this.encuesta.telefonoEncuestador1 = "NA";
      if (this.encuesta.emailEncuestador1 === null || this.encuesta.emailEncuestador1 === undefined)
        this.encuesta.emailEncuestador1 = "NA";
      if (this.encuesta.nombreApellidoEncuestador2 === null || this.encuesta.nombreApellidoEncuestador2 === undefined)
        this.encuesta.nombreApellidoEncuestador2 = "NA";
      if (this.encuesta.telefonoEncuestador2 === null || this.encuesta.telefonoEncuestador2 === undefined)
        this.encuesta.telefonoEncuestador2 = "NA";
      if (this.encuesta.emailEncuestador2 === null || this.encuesta.emailEncuestador2 === undefined)
        this.encuesta.emailEncuestador2 = "NA";
      if (this.encuesta.fechaRelevamiento === null || this.encuesta.fechaRelevamiento === undefined)
        this.encuesta.fechaRelevamiento = "";
      if (this.encuesta.lugarRelevamiento === null || this.encuesta.lugarRelevamiento === undefined)
        this.encuesta.lugarRelevamiento = new ParNivelValor("NA", "NA");
      if (this.encuesta.fechaNacimiento === null || this.encuesta.fechaNacimiento === undefined)
        this.encuesta.fechaNacimiento = "";
      if (this.encuesta.domicilioBarrio === null || this.encuesta.domicilioBarrio === undefined)
        this.encuesta.domicilioBarrio = "NA";
      if (this.encuesta.telefono === null || this.encuesta.telefono === undefined)
        this.encuesta.telefono = "NA";
      if (this.encuesta.fechaNacimientoBebe === null || this.encuesta.fechaNacimientoBebe === undefined)
        this.encuesta.fechaNacimientoBebe = "";
      if (this.encuesta.viaNacimiento === null || this.encuesta.viaNacimiento === undefined) 
        this.encuesta.viaNacimiento = "NA";
      if (this.encuesta.lugarNacimiento === null || this.encuesta.lugarNacimiento === undefined)
        this.encuesta.lugarNacimiento = "NA";
      if (this.encuesta.nombreBebe === null || this.encuesta.nombreBebe === undefined)
        this.encuesta.nombreBebe = "NA";
      if (this.encuesta.edadGestacional === null || this.encuesta.edadGestacional === undefined)
        this.encuesta.edadGestacional = "NA";
      if (this.encuesta.pesoKG === null || this.encuesta.pesoKG === undefined)
        this.encuesta.pesoKG = "NA";
      if (this.encuesta.ropaAlPesar === null || this.encuesta.ropaAlPesar === undefined)
        this.encuesta.ropaAlPesar = "NA";
      if (this.encuesta.talla === null || this.encuesta.talla === undefined)
        this.encuesta.talla = "NA";
      if (this.encuesta.perimetroCefalico === null || this.encuesta.perimetroCefalico === undefined)
        this.encuesta.perimetroCefalico = "NA";
      if (this.encuesta.circunsferenciaBrazo === null || this.encuesta.circunsferenciaBrazo === undefined)  
        this.encuesta.circunsferenciaBrazo = "NA";
      if (this.encuesta.observacionesBloque5 === null || this.encuesta.observacionesBloque5 === undefined)
        this.encuesta.observacionesBloque5 = "NA";
    },
  },
};
</script>
