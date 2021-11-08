<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1200">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="blue-grey" v-bind="attrs" v-on="on" class="caption">
          <v-icon left>mdi-file-plus-outline</v-icon>
          Nueva encuesta neonato
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="text-center text-h5 font-weight-regular blue-grey--text"
        >
          Nueva encuesta neonato
        </v-card-title>
        <v-card-text>
          <v-card ref="form" width="5000px" flat>
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
                    :counter="25"
                    label="Nombre y apellido Encuestador 1"
                    :rules="rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.telefonoEncuestador1"
                    :counter="10"
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
                    :rules="rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.telefonoEncuestador2"
                    label="Teléfono"
                    type="number"
                    min="0"
                    :rules="rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.emailEncuestador2"
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
            <v-card-subtitle><h3>Madre y recien nacido</h3></v-card-subtitle>
            <v-divider class="mx-3"></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.nombreApellidoBebe"
                    label="Nombre y apellido"
                    :rules="rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.dniBebe"
                    label="DNI"
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
                        label="Fecha de nacimiento"
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
                      value="Parto vaginal"
                    ></v-radio>
                    <v-radio label="Cesárea" value="Cesárea"></v-radio>
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
                    v-model="encuesta.observacionesBloque0"
                    label="Observaciones"
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
    nombreApellidoBebe,
    dniBebe,
    fechaNacimiento,
    domicilioBarrio,
    telefono,
    fechaNacimientoBebe,
    viaNacimiento,
    lugarNacimiento,
    nombreBebe,
    observacionesBloque0,
    pesoKG,
    ropaAlPesar,
    talla,
    perimetroCefalico,
    circunsferenciaBrazo,
    nombreApellido,
    dni,
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
    this.nombreApellidoBebe = nombreApellidoBebe;
    this.dniBebe = dniBebe;
    this.fechaNacimiento = fechaNacimiento;
    this.domicilioBarrio = domicilioBarrio;
    this.telefono = telefono;
    this.fechaNacimientoBebe = fechaNacimientoBebe;
    this.viaNacimiento = viaNacimiento;
    this.lugarNacimiento = lugarNacimiento;
    this.nombreBebe = nombreBebe;
    this.observacionesBloque0 = observacionesBloque0;
    this.pesoKG = pesoKG;
    this.ropaAlPesar = ropaAlPesar;
    this.talla = talla;
    this.perimetroCefalico = perimetroCefalico;
    this.circunsferenciaBrazo = circunsferenciaBrazo;
    this.nombreApellido = nombreApellido;
    this.dni = dni;
    this.observacionesBloque5 = observacionesBloque5;
    this.tipoEncuesta = "Neonato";
  }
}
export default {
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
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        number: [
          (val) =>
            /^[0-9]\d*(\.\d+)?$/.test(val) || "Usar punto en lugar de coma",
        ],
        obligatorio: [(o) => !!o || "Este campo es obligatorio"],
      },
      lugares: [],
    };
  },
  created() {
    this.getLugares();
    this.autocompletar();
  },
  methods: {
    async agregarEncuesta() {
      if (
        this.encuesta.nombreApellidoEncuestador1 &&
        this.encuesta.telefonoEncuestador1 &&
        this.encuesta.emailEncuestador1 &&
        this.encuesta.nombreApellidoEncuestador2 &&
        this.encuesta.telefonoEncuestador2 &&
        this.encuesta.emailEncuestador2 &&
        this.encuesta.nombreApellido &&
        this.encuesta.dni &&
        this.encuesta.domicilioBarrio
      ) {
        this.loading = true;
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
          });
      } else {
        this.$emit("camposObligatorios");
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
      this.encuesta.nombreApellidoEncuestador1 = this.$auth.user.name;
      this.encuesta.emailEncuestador1 = this.$auth.user.email;
    }
  },
};
</script>
