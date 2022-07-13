<template>
    <div class="text-center">
    <v-dialog v-model="dialog" width="1200">
      <template v-slot:activator="{ on, attrs }">
        <v-icon class="mr-2"
          small v-bind="attrs" v-on="on" @click="getEncuesta">
          mdi-eye-outline
        </v-icon>
      </template>
      <v-card>
        <v-card-title
          class="text-center text-h5 font-weight-regular blue-grey--text"
        >
          Encuesta tercer trimestre
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
                    v-model= "encuesta.nombreApellidoEncuestador1"
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
                    hint="email@example.com"
                    persistent-hint
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
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
                    hint="email@example.com"
                    persistent-hint
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
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
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.dni"
                    label="DNI"
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
                        v-model="encuesta.fechaUltimaMenstruacion"
                        label="Fecha de última menstruación"
                        prepend-icon="mdi-calendar"
                        readonly
                    ></v-text-field>                
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.semanasGestacion"
                    label="Semanas de gestación"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="encuesta.observacionesBloque0"
                    label="Observaciones"
                    readonly
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
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.ropaAlPesar"
                    label="Ropa"
                    hint="Especificar la ropa que tiene puesta al momento de tomar
                      el peso"
                    persistent-hint
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.talla"
                    label="3.2 Talla"
                    suffix="cm"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.tallaSentada"
                    label="3.3 Talla sentada"
                    suffix="cm"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.perimetroBraquial"
                    label="3.4 Perímetro braquial"
                    suffix="cm"
                    hint="Las mediciones entre 3.4 y 3.8 tomarlas del lado derecho
                      del cuerpo."
                    persistent-hint
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueTricipital"
                    label="3.5 Pliegue tricipal"
                    suffix="cm"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueBicipital"
                    label="3.6 Pliegue bicipal"
                    suffix="cm"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueSubescapular"
                    label="3.7 Pliegue subescapular"
                    suffix="cm"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueSuprailiaco"
                    label="3.8 Pliegue suprailíaco"
                    suffix="cm"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="encuesta.observacionesBloque3"
                    label="Observaciones"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-title
              class="text-h5 font-weight-regular blue-grey white--text"
              >Bloque 4. Inseguridad alimentaria y datos nutricionales
              (continuación)
              </v-card-title
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
                      <th width="3200px" class="text-left">Ingrese el alimento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="recordatorio in recordatorios"
                      :key="recordatorio._id"
                    >
                      <td>{{ recordatorio.alimento }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="encuesta.observacionesBloque4"
                    label="Observaciones"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-divider class="mt-3"></v-divider>
            <v-card-actions class="mx-4">
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
    name: "VerTercerTrimestre",
    props: ['id'],
    data() {
        return {
        dialog: false,
        encuesta: new Encuesta(),
        recordatorios: [],
        recordatorio: new Recordatorio24hs(),
        baseUrl: "https://tpftestbackend.herokuapp.com",
        lugarRelevamiento: String
      }
    },
    methods: {
      async getEncuesta() {
      const res = await this.axios.get(
        `${this.baseUrl}/encuestas3Trimestre/` + this.id
      );
      this.encuesta = res.data;
      this.recordatorios = res.data.recordatorio24Horas;
      this.lugarRelevamiento = res.data.lugarRelevamiento.nombre;
      },
    }
}
</script>