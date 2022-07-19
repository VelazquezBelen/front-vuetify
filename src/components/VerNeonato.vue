<template>
        <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1200"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          pt-3
          class="mr-2"
          small
          v-bind="attrs"
          v-on="on"
          @click="getEncuesta"
        >
          mdi-eye-outline
        </v-icon>
      </template>
      <v-card>
        <v-card-title class="text-center text-h5 font-weight-regular blue-grey--text">
          Encuesta neonato
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text>
        <v-card ref="form" width="5000px" >
          <v-card-title
            class="text-h5 font-weight-regular blue-grey white--text"
            >Bloque 0. Datos de los encuestadores y participantes</v-card-title
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
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="encuesta.telefonoEncuestador1"
                  label="Teléfono"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="encuesta.emailEncuestador1"
                  label="E-mail"
                  readonly
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
                  readonly            
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="encuesta.telefonoEncuestador2"
                  label="Teléfono"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="encuesta.emailEncuestador2"
                  label="E-mail"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="encuesta.fechaRelevamiento"
                    label="Fecha de relevamiento"
                    prepend-icon="mdi-calendar"
                    readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="lugarRelevamiento"
                  label="Lugar del relevamiento"
                  readonly
                ></v-text-field>
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
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="encuesta.dni"
                  label="DNI (madre)"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.fechaNacimiento"
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="encuesta.domicilioBarrio"
                  label="Domicilio/barrio"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="encuesta.telefono"
                  label="Teléfono"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                    v-model="encuesta.fechaNacimientoBebe"
                    label="Fecha de nacimiento (niño/a)"
                    prepend-icon="mdi-calendar"
                    readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-radio-group
                  label="Via de nacimiento"
                  v-model="encuesta.viaNacimiento"
                  encuesta.viaNacimiento
                  readonly
                >
                  <v-radio
                    label="Parto vaginal"
                    value="0"
                  ></v-radio>
                  <v-radio label="Cesárea" value="1"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row >
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="encuesta.lugarNacimiento"
                  label="Lugar de nacimiento"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="encuesta.nombreBebe"
                  label="Nombre niño/a"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="encuesta.edadGestacional"
                  label="Edad Gestacional"
                  readonly
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
            ><h3 color="black">Ahora vamos a hacer algunas mediciones para conocer el peso, largo y otros datos de la composición corporal del bebé.
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
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="encuesta.ropaAlPesar"
                  label="Ropa"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="encuesta.talla"
                  label="5.2 Longitud (talla)"
                  suffix="cm"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="encuesta.perimetroCefalico"
                  label="5.3 Perímetro cefálico"
                  suffix="cm"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="encuesta.circunsferenciaBrazo"
                  label="5.4 Cincunsferencia del brazo"
                  suffix="cm"
                  readonly
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
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="encuesta.dni"
                  label="DNI"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="encuesta.observacionesBloque5"
                  label="Observaciones"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-divider class="mt-3 "></v-divider>
          <v-card-actions class = "mx-4">
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
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
    edadGestacional,
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
    this.edadGestacional = edadGestacional;
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
    name: "VerNeonato",
    props: ['id'],
    data() {
        return {
        dialog: false,
        encuesta: new Encuesta(),
        baseUrl: "https://tpftestbackend.herokuapp.com",
        lugarRelevamiento: String
      }
    },
    methods: {
      async getEncuesta() {
      const res = await this.axios.get(
        `${this.baseUrl}/encuestasNeonato/` + this.id
      );
      this.encuesta = res.data;
      if (res.data.lugarRelevamiento != null)
        this.lugarRelevamiento = res.data.lugarRelevamiento.nivel;
      else
        this.lugarRelevamiento = "";
      },
    }
}
</script>
