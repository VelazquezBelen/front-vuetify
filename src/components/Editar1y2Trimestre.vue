<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1200">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          class="mr-2"
          small
          v-bind="attrs"
          v-on="on"
          @click="getEncuesta"
        >
          mdi-pencil
        </v-icon>
      </template>
      <v-form ref="obligatorio">
      <v-card>
        <v-card-title
          class="text-center text-h5 font-weight-regular blue-grey--text"
        >
          Editar encuesta primer y segundo trimestre
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
                    :counter="25"
                    label="Nombre y apellido Encuestador 1"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.telefonoEncuestador1"
                    :counter="10"
                    label="Teléfono"
                    type="number"
                  min="0"
                    :rules = "rules.obligatorio"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.emailEncuestador1"
                    label="E-mail"
                    hint="email@example.com"
                    persistent-hint
                    :rules = "rules.email"
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
                  item-text="nombre"
                  label="Lugar de relevamiento"
                  return-object
                ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-card-subtitle
              ><h3>Embarazadas 1er y 2do trimestre</h3></v-card-subtitle
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
                        label="Fecha de última menstruacion"
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
              >Bloque 1. Antecedentes de salud</v-card-title
            >
            <v-divider></v-divider>
            <v-card-subtitle
              ><h3 color="black">
                Ahora le voy a preguntar sobre algunos datos sobre su salud, las
                enfermedades que ha tenido o tiene y algunos hábitos.
              </h3></v-card-subtitle
            >
            <v-divider class="mx-3"></v-divider>
            <v-card-subtitle
              ><h3 class="font-weight-regular">
                1.1 ¿Ha sido diagnosticada con alguna de las siguientes
                enfermedades?
              </h3></v-card-subtitle
            >
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-radio-group v-model="encuesta.diabetes" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">Diabetes</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="4">
                  <v-radio-group v-model="encuesta.enfermedadRenal" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">Enfermedad renal</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="4">
                  <v-radio-group v-model="encuesta.hipertension" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">Hipertension</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-radio-group
                    v-model="encuesta.colesterolTrigliceridosAltos"
                    row
                  >
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">Colesterol - Trigliceridos altos</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="4">
                  <v-radio-group v-model="encuesta.asmaEPOC" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">Asma o EPOC</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="4">
                  <v-radio-group v-model="encuesta.covid19" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">COVID-19</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-radio-group v-model="encuesta.anemia" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">Anemia</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-radio-group v-model="encuesta.enfermedadCronica" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">¿Otra enfermedad crónica?</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="encuesta.cualEnfermedadCronica"
                    label="Si contesta afirmativamente: ¿Cúal?"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="6">
                  <v-radio-group v-model="encuesta.consumeMedicamento" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">1.2 ¿Consume algún medicamento?</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="encuesta.cualConsumeMedicamento"
                    label="Si contesta afirmativamente: ¿Cúal?"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="6">
                  <v-radio-group
                    v-model="encuesta.consumeComplejoVitaminicoSuplemento"
                    row
                  >
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          1.3 Antes o durante el embarazo, ¿consumió algún
                          complejo vitaminico o suplemento?
                        </h3>
                        <h5>
                          Aquí se puede ejemplificar preguntando por
                          suplementación de hierro, ácido folico, vitamina D.
                        </h5>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="encuesta.cualConsumeComplejoVitaminicoSuplemento"
                    label="Si contesta afirmativamente: ¿Cúal?"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="12">
                  <v-radio-group v-model="encuesta.fumaActual" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">1.4 ¿Actualmente fuma?</h3></div>
                    </template>
                    <v-radio label="No, nunca" value="0"></v-radio>
                    <v-radio
                      label="Algunas veces"
                      value="1"
                    ></v-radio>
                    <v-radio
                      label="Todos los dias"
                      value="2"
                    ></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="12">
                  <v-radio-group v-model="encuesta.fumaAntes" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">1.5 ¿Fumaba antes de estar embarazada?</h3></div>
                    </template>
                    <v-radio label="No, nunca" value="0"></v-radio>
                    <v-radio
                      label="Algunas veces"
                      value="1"
                    ></v-radio>
                    <v-radio
                      label="Todos los dias"
                      value="2"
                    ></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="12">
                  <v-radio-group v-model="encuesta.alcoholActual" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">1.6 ¿Actualmente consume bebidas alcoholicas?</h3>
                      </div>
                    </template>
                    <v-radio label="No, nunca" value="0"></v-radio>
                    <v-radio label="Algunas veces" value="1"></v-radio>
                    <v-radio
                      label="Todos los dias"
                      value="2"
                    ></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="6">
                  <v-radio-group v-model="encuesta.embarazoAntes" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">1.7 ¿Estuvo embarazada antes?</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="encuesta.cuantosEmbarazoAntes"
                    label="Si contesta afirmativamente: ¿Cuántas veces?"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="6">
                  <v-radio-group v-model="encuesta.hijos" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">1.8 ¿Tiene hijos?</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="encuesta.cuantosHijos"
                    label="Si contesta afirmativamente: ¿Cuántos?"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="encuesta.observacionesBloque1"
                    label="Observaciones"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-title
              class="text-h5 font-weight-regular blue-grey white--text"
              >Bloque 2. Datos socio-ambientales</v-card-title
            >
            <v-divider></v-divider>
            <v-card-subtitle
              ><h3>
                Ahora le voy a preguntar sobre algunos datos sobre el lugar
                donde vive, con quiénes vive y los ingresos que reciben
              </h3></v-card-subtitle
            >
            <v-divider class="mx-3"></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="encuesta.pais"
                    label="2.1 ¿En que pais nació?"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="encuesta.provincia"
                    label="2.2 ¿En que provincia nació?"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="encuesta.personasVivienda"
                    label="2.3 ¿Cuántas personas viven normalmente en su
                      vivienda?"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="encuesta.habitacionesVivienda"
                    label="2.4 ¿Cuántas habitaciones tiene su vivienda?"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.desagueCloaca" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          2.5 ¿El desague del inodoro tiene conexión a cloaca?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.aguaPotable" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          2.6 ¿Tiene conexión a la red de agua potable dentro de
                          su vivienda?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.redElectrica" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          2.7 ¿Tiene conexión a la red eléctrica en su vivienda?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.gasNatural" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">2.8 ¿Utiliza gas natural para cocinar?</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-select
                    v-model="encuesta.nivelEducativo"
                    :items="itemsNivelEducativo"
                    item-text="nivel"
                    return-object
                    label="2.9 ¿Cuál es el nivel educativo máximo que ha
                    alcanzado?"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-select
                    v-model="encuesta.empleo"
                    :items="itemsEmpleo"
                    item-text="nivel"
                    return-object
                    label="2.10 Respecto a su empleo, actualmente se encuentra:"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  <v-radio-group v-model="encuesta.asistenciaEstado" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          2.11 ¿Recibe alguna asistencia económica del estado?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="encuesta.cualAsistenciaEstado"
                    :items="itemsPlanSocial"
                    item-text="nivel"
                    return-object
                    label="Si contesta afirmativamente: ¿Cúal?"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-container>
            <v-card-subtitle color="black"
              ><h3 class="font-weight-regular">2.12 En el último mes recibio:</h3></v-card-subtitle
            >
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-radio-group v-model="encuesta.recibioBolson" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">¿Bolsón o caja de alimentos?</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="6">
                  <v-radio-group v-model="encuesta.recibioTickets" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">¿Tickets o bonos para la compra de alimentos?</h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-radio-group v-model="encuesta.recibioTarjeta" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">¿Tarjeta alimentar?</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="6">
                  <v-radio-group v-model="encuesta.recibioLeche" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">¿Leche fluida o en polvo?</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-radio-group v-model="encuesta.recibioOtra" row>
                    <template v-slot:label>
                      <div><h3 class="font-weight-regular">¿Otra forma de asistencia alimentaria?</h3></div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="encuesta.cualUltimoMesRecibio"
                    label="Si contesta afirmativamente: ¿Cúal?"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row>
                <v-col>
                  <v-select
                    v-model="encuesta.ingresoIndividual"
                    :items="itemsIngresoIndividual"
                    item-text="nivel"
                    return-object
                    label="2.13 ¿Podría indicar cuál de estos tramos se ubica su
                    ingreso individual en el hogar el último mes en
                    pesos?"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-container>
            <v-container>
              <v-row>
                <v-col>
                  <v-select
                    v-model="encuesta.ingresoTotal"
                    :items="itemsIngresoTotal"
                    item-text="nivel"
                    return-object
                    label="2.14 ¿Podría indicar en cuál de estos tramos se ubica el
                    ingreso total mensual del hogar en pesos?"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-container>
            <v-container>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.recibioIFE" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          2.15 Durante la pandemia, ¿el hogar recibió el IFE?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="encuesta.observacionesBloque2"
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
              ><h3 color="black">
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
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueTricipital"
                    label="3.5 Pliegue tricipital"
                    suffix="cm"
                    type="number"
                    min="0"
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
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueSubescapular"
                    label="3.7 Pliegue subescapular"
                    suffix="cm"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="encuesta.pliegueSuprailiaco"
                    label="3.8 Pliegue suprailíaco"
                    suffix="cm"
                    type="number"
                    min="0"
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
              >Bloque 4. Datos nutricionales
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
                      <th class="text-left">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <v-text-field
                          v-model="recordatorio.alimento"
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
                      <td>{{ recordatorio.alimento }}</td>
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
                    v-model="encuesta.observacionesBloque4Parte1"
                    label="Observaciones"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-title
              class="text-h5 font-weight-regular blue-grey white--text"
              >Bloque 4. Datos nutricionales
              (continuación)</v-card-title
            >
            <v-divider></v-divider>
            <v-card-subtitle
              ><h3 color="black">
                Ahora vamos a hacer algunas preguntas sobre las comidas y sus
                hábitos alimentarios.
              </h3></v-card-subtitle
            >
            <v-card-subtitle
              ><h2 color="black">
                Historia alimentaria (comidas semanales)
              </h2></v-card-subtitle
            >
            <v-divider class="mx-3"></v-divider>
            <v-card-subtitle
              ><h3 class="font-weight-regular">
                Durante los últimos 7 dias, cuántas veces realizó las siguientes
                comidas:
              </h3></v-card-subtitle
            >
            <v-container>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="encuesta.desayuno"
                    label="4.10 Desayuno"
                    suffix="veces"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="encuesta.almuerzo"
                    label="4.11 Almuerzo"
                    suffix="veces"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="encuesta.merienda"
                    label="4.12 Merienda"
                    suffix="veces"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="encuesta.cena"
                    label="4.13 Cena"
                    suffix="veces"
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    v-model="encuesta.frecuenciaConsumo"
                    :items="[
                      'Nunca',
                      'Algunas veces',
                      'Casi todos los dias',
                      'Siempre/todos los dias',
                      'NS/NC',
                    ]"
                    label="4.14 Durante los últimos 7 días, ¿con que frecuencia
                      consumió algún alimento o bebida en otros momentos del
                      día?"
                    hint="Solo en caso de responder afirmativamente la pregunta 4.14,
                    pasar a la 4.15."
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider class="my-3"></v-divider>
              <v-row>
                <v-card-subtitle
                  ><h3 class="font-weight-regular">
                    4.15 Durante los últimos 7 días ¿Qué alimentos/bebidas
                    consumió en esas ocasiones fuera de las comidas principales?
                  </h3></v-card-subtitle
                >
              </v-row>
              <v-row>
                <v-col>
                  <v-checkbox
                    v-model="encuesta.golosinas"
                    :label="`Golosinas, dulces, galletitas dulces, amasados de
                          pastelería, facturas, cereales con azúcar`"
                    true-value="1" 
                    false-value="0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="encuesta.panBlanco"
                    :label="`Pan blanco, galletitas saladas`"
                    true-value="1" 
                    false-value="0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="encuesta.pan"
                    :label="`Pan y otros cereales integrales, semillas`"
                    true-value="1" 
                    false-value="0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="encuesta.copetin"
                    :label="`Productos de copetín o snacks salados`"
                    true-value="1" 
                    false-value="0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="encuesta.frutas"
                    :label="`Frutas`"
                    true-value="1" 
                    false-value="0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="encuesta.lacteos"
                    :label="`Lácteos (leche, yogurt o quesos)`"
                    true-value="1" 
                    false-value="0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="encuesta.bebidas"
                    :label="`Bebidas azucaradas (jugos, gaseosas, infusiones con
                          azúcar, etc)`"
                    true-value="1" 
                    false-value="0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="encuesta.otros"
                    :label="`Otros`"
                    true-value="1" 
                    false-value="0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="encuesta.nsnc"
                    :label="`NS/NC`"
                    true-value="1" 
                    false-value="0"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="encuesta.observacionesBloque4Parte2"
                    label="Observaciones"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-title
              class="text-h5 font-weight-regular blue-grey white--text"
              >Bloque 4. Datos nutricionales
              (continuación)</v-card-title
            >
            <v-divider></v-divider>
            <v-card-subtitle
              ><h3 color="black">
                Ahora vamos a hacer algunas preguntas sobre las comidas y sus
                hábitos alimentarios.
              </h3></v-card-subtitle
            >
            <v-card-subtitle
              ><h2 color="black">
                Historia alimentaria (Alimentos últimos 3 meses)
              </h2></v-card-subtitle
            >
            <v-divider class="mx-3"></v-divider>
            <v-card-subtitle
              ><h3 class="font-weight-regular">
                En general, tomando como referencia los últimos tres meses,
                ¿cuántas veces al mes consumió...
              </h3></v-card-subtitle
            >
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioLeche"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.16. ... leche, yogur o quesos?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioFrutasFrescas"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.17. ... frutas frescas (solas o en preparaciones)?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioVerduras"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.18. ...verduras (solas o en preparaciones) sin contar
                    papa y batata?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioPapa"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.19. ... papa, batata, cereales refinados como arroz
                    blanco, pastas, tartas, empanadas o pan blanco?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioCereales"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.20. ...cereales integrales, legumbres (por ejemplo
                    lentejas, garbanzos, porotos) o pan integral o de
                    salvado?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioEmbutidos"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.21. ... embutidos y fiambres (jamón, salame, chorizo,
                    salchicha, etc)?"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioCarne"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.22. ... carne roja (por ejemplo de vaca), carne de ave o
                    huevos?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioPescado"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.23. ... pescado fresco o enlatado?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioAceites"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.24. ... aceites vegetales (como girasol, maíz, soja,
                    girasol alto oleico, oliva y canola)?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioFrutasSecas"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.25. ... frutas secas sin salar (como maní, nueces,
                    almendras, avellanas, castañas, etc.) o semillas sin salar
                    (chía, girasol, sésamo, lino, etc.)?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioProductosCopetin"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.26. ... productos de copetín (papas fritas, palitos de
                    maíz, etc.)?"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="encuesta.consumioGolosinas"
                    :items="[
                      'Nunca o menos de 1 vez al mes',
                      'Entre 1 y 3 veces al mes',
                      '1 vez por semana',
                      '2 a 4 veces por semana',
                      '5 a 6 veces por semana',
                      '1 vez al día',
                      'Entre 2 y 3 veces al día',
                      'Entre 4 y 5 veces al día',
                      '6 veces o más por día',
                    ]"
                    label="4.27. ... golosinas (caramelos, alfajores, chupetines,
                    chicles, barras de cereal, etc.)?"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="encuesta.observacionesBloque4Parte3"
                    label="Observaciones"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-title
              class="text-h5 font-weight-regular blue-grey white--text"
              >Bloque 5. Inseguridad alimentaria</v-card-title
            >
            <v-divider></v-divider>
            <v-card-subtitle
              ><h3 color="black">
                Ahora vamos a hacer algunas preguntas sobre las comidas y sus
                hábitos alimentarios.
              </h3></v-card-subtitle
            >
            <v-card-subtitle
              ><h2 color="black">
                Cuestionario Escala Inseguridad Alimentaria basada en la
                Experiencia
              </h2></v-card-subtitle
            >
            <v-divider class="mx-3"></v-divider>
            <v-card-subtitle
              ><h3 class="font-weight-regular">
                Durante los últimos doce meses, ha habido algún momento en que:
              </h3></v-card-subtitle
            >
            <v-container>
              <v-row>
                <v-col>
                  <v-radio-group
                    v-model="encuesta.preocupadoSuficienteAlimentos"
                    row
                  >
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          5.1 ¿Usted se haya preocupado por no tener suficientes
                          alimentos para comer por falta de dinero u otros
                          recursos?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.podidoAlimentos" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          5.2 ¿Hubo alguna vez en que usted no haya podido comer
                          alimentos saludables y nutritivos por falta de dinero
                          u otros recursos?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.comidoPocaVariedad" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          5.3 ¿Hubo alguna vez en que usted haya comido poca
                          variedad de alimentos por falta de dinero u otros
                          recursos?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group
                    v-model="encuesta.dejarDesayunoAlmuerzoCena"
                    row
                  >
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          5.4 ¿Hubo alguna vez en que usted haya tenido que
                          dejar de desayunar, almorzar o cenar porque no había
                          suficiente dinero u otros recursos para obtener
                          alimentos?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.comidoMenos" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          5.5 ¿Hubo alguna vez en que usted haya comido menos de
                          lo que pensaba que debía comer por falta de dinero u
                          otros recursos?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.sinAlimentos" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          5.6 ¿Hubo alguna vez en que su hogar se haya quedado
                          sin alimentos por falta de dinero u otros recursos?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.sentidoHambre" row>
                    <template v-slot:label>
                      <h3 class="font-weight-regular">
                        5.7 ¿Hubo alguna vez en que usted haya sentido hambre
                        pero no comió porque no había suficiente dinero u otros
                        recursos para obtener alimentos?
                      </h3>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col>
                  <v-radio-group v-model="encuesta.dejadoComer" row>
                    <template v-slot:label>
                      <div>
                        <h3 class="font-weight-regular">
                          5.8 ¿Hubo alguna vez en que usted haya dejado de comer
                          todo un día por falta de dinero u otros recursos?
                        </h3>
                      </div>
                    </template>
                    <v-radio label="Si" value="1"></v-radio>
                    <v-radio label="No" value="0"></v-radio>
                    <v-radio label="NS/NC" value="NS/NC"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="encuesta.observacionesBloque5"
                    label="Observaciones"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <v-divider class="mt-3"></v-divider>   
            <v-card-actions class="mx-4">
              <v-btn color="red" text @click="dialog = false"> Cerrar </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" text @click="limpiarEncuesta">
                Limpiar
              </v-btn>
              <v-btn color="primary" text @click="editarEncuesta" :loading="loading">
                Actualizar encuesta
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
    diabetes,
    enfermedadRenal,
    hipertension,
    colesterolTrigliceridosAltos,
    asmaEPOC,
    covid19,
    anemia,
    enfermedadCronica,
    cualEnfermedadCronica,
    consumeMedicamento,
    cualConsumeMedicamento,
    consumeComplejoVitaminicoSuplemento,
    cualConsumeComplejoVitaminicoSuplemento,
    fumaActual,
    fumaAntes,
    alcoholActual,
    embarazoAntes,
    cuantosEmbarazoAntes,
    hijos,
    cuantosHijos,
    observacionesBloque1,
    pais,
    provincia,
    personasVivienda,
    habitacionesVivienda,
    desagueCloaca,
    aguaPotable,
    redElectrica,
    gasNatural,
    nivelEducativo,
    empleo,
    asistenciaEstado,
    cualAsistenciaEstado,
    recibioBolson,
    recibioTickets,
    recibioTarjeta,
    recibioLeche,
    recibioOtra,
    cualUltimoMesRecibio,
    ingresoIndividual,
    ingresoTotal,
    recibioIFE,
    observacionesBloque2,
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
    preocupadoSuficienteAlimentos,
    podidoAlimentos,
    comidoPocaVariedad,
    dejarDesayunoAlmuerzoCena,
    comidoMenos,
    sinAlimentos,
    sentidoHambre,
    dejadoComer,
    observacionesBloque4Parte1,
    Recordatorio24hs,
    observacionesBloque4Parte2,
    desayuno,
    almuerzo,
    merienda,
    cena,
    frecuenciaConsumo,
    golosinas,
    panBlanco,
    pan,
    copetin,
    frutas,
    lacteos,
    bebidas,
    otros,
    nsnc,
    observacionesBloque4Parte3,
    consumioLeche,
    consumioFrutasFrescas,
    consumioVerduras,
    consumioPapa,
    consumioCereales,
    consumioEmbutidos,
    observacionesBloque4Parte4,
    consumioCarne,
    consumioPescado,
    consumioAceites,
    consumioFrutasSecas,
    consumioProductosCopetin,
    consumioGolosinas,
    observacionesBloque4Parte5
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
    this.diabetes = diabetes;
    this.enfermedadRenal = enfermedadRenal;
    this.hipertension = hipertension;
    this.colesterolTrigliceridosAltos = colesterolTrigliceridosAltos;
    this.asmaEPOC = asmaEPOC;
    this.covid19 = covid19;
    this.anemia = anemia;
    this.enfermedadCronica = enfermedadCronica;
    this.cualEnfermedadCronica = cualEnfermedadCronica;
    this.consumeMedicamento = consumeMedicamento;
    this.cualConsumeMedicamento = cualConsumeMedicamento;
    this.consumeComplejoVitaminicoSuplemento =
      consumeComplejoVitaminicoSuplemento;
    this.cualConsumeComplejoVitaminicoSuplemento =
      cualConsumeComplejoVitaminicoSuplemento;
    this.fumaActual = fumaActual;
    this.fumaAntes = fumaAntes;
    this.alcoholActual = alcoholActual;
    this.embarazoAntes = embarazoAntes;
    this.cuantosEmbarazoAntes = cuantosEmbarazoAntes;
    this.hijos = hijos;
    this.cuantosHijos = cuantosHijos;
    this.observacionesBloque1 = observacionesBloque1;
    this.pais = pais;
    this.provincia = provincia;
    this.personasVivienda = personasVivienda;
    this.habitacionesVivienda = habitacionesVivienda;
    this.desagueCloaca = desagueCloaca;
    this.aguaPotable = aguaPotable;
    this.redElectrica = redElectrica;
    this.gasNatural = gasNatural;
    this.nivelEducativo = nivelEducativo;
    this.empleo = empleo;
    this.asistenciaEstado = asistenciaEstado;
    this.cualAsistenciaEstado = cualAsistenciaEstado;
    this.recibioBolson = recibioBolson;
    this.recibioTickets = recibioTickets;
    this.recibioTarjeta = recibioTarjeta;
    this.recibioLeche = recibioLeche;
    this.recibioOtra = recibioOtra;
    this.cualUltimoMesRecibio = cualUltimoMesRecibio;
    this.ingresoIndividual = ingresoIndividual;
    this.ingresoTotal = ingresoTotal;
    this.recibioIFE = recibioIFE;
    this.observacionesBloque2 = observacionesBloque2;
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
    this.preocupadoSuficienteAlimentos = preocupadoSuficienteAlimentos;
    this.podidoAlimentos = podidoAlimentos;
    this.comidoPocaVariedad = comidoPocaVariedad;
    this.dejarDesayunoAlmuerzoCena = dejarDesayunoAlmuerzoCena;
    this.comidoMenos = comidoMenos;
    this.sinAlimentos = sinAlimentos;
    this.sentidoHambre = sentidoHambre;
    this.dejadoComer = dejadoComer;
    this.observacionesBloque4Parte1 = observacionesBloque4Parte1;
    this.Recordatorio24hs = Recordatorio24hs;
    this.observacionesBloque4Parte2 = observacionesBloque4Parte2;
    this.desayuno = desayuno;
    this.almuerzo = almuerzo;
    this.merienda = merienda;
    this.cena = cena;
    this.frecuenciaConsumo = frecuenciaConsumo;
    this.golosinas = golosinas;
    this.panBlanco = panBlanco;
    this.pan = pan;
    this.copetin = copetin;
    this.frutas = frutas;
    this.lacteos = lacteos;
    this.bebidas = bebidas;
    this.otros = otros;
    this.nsnc = nsnc;
    this.observacionesBloque4Parte3 = observacionesBloque4Parte3;
    this.consumioLeche = consumioLeche;
    this.consumioFrutasFrescas = consumioFrutasFrescas;
    this.consumioVerduras = consumioVerduras;
    this.consumioPapa = consumioPapa;
    this.consumioCereales = consumioCereales;
    this.consumioEmbutidos = consumioEmbutidos;
    this.observacionesBloque4Parte4 = observacionesBloque4Parte4;
    this.consumioCarne = consumioCarne;
    this.consumioPescado = consumioPescado;
    this.consumioAceites = consumioAceites;
    this.consumioFrutasSecas = consumioFrutasSecas;
    this.consumioProductosCopetin = consumioProductosCopetin;
    this.consumioGolosinas = consumioGolosinas;
    this.observacionesBloque4Parte5 = observacionesBloque4Parte5;
    this.tipoEncuesta = "Primer y segundo trimestre";
  }
}
class Recordatorio24hs {
  constructor(alimento) {
    this.alimento = alimento;
  }
}
export default {
    name: "Editar1y2Trimestre",
    props: ['id'],
    data() {
        return {
        dialog: false,
        encuesta: new Encuesta(),
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
            v => !!v || 'Este campo es obligatorio',
            v => /.+@.+/.test(v) || 'El E-mail debe ser valido',
          ],
          number: [val => /^[0-9]\d*(\.\d+)?$/.test(val) || 'Usar punto en lugar de coma'],
          obligatorio: [o=> !!o || 'Este campo es obligatorio'],
        },
        lugares: [],
        itemsNivelEducativo: [
          { nivel: 'Primario incompleto', valor: '0' },
          { nivel: 'Primario completo', valor: '1' },
          { nivel: 'Secundario incompleto', valor: '2' },
          { nivel: 'Secundario completo', valor: '3' },
          { nivel: 'Terciario incompleto', valor: '4' },
          { nivel: 'Terciario completo', valor: '5' },
          { nivel: 'Universitario incompleto', valor: '6' },
          { nivel: 'Universitario completo', valor: '7' },
        ],
        itemsEmpleo: [
          { nivel: 'Desempleada', valor: 'Desempleada' },
          { nivel: 'Empleada en relación de dependencia registrada', valor: 'Relación_dependencia' },
          { nivel: 'Empleada en relación de dependencia no registrada', valor: 'Relación_dependencia' },
          { nivel: 'Trabajando por cuenta propia', valor: 'Cuenta_propia' },
          { nivel: 'Trabajando como monotribustista', valor: 'Monotributista' },
          { nivel: 'Trabajando como autónomo', valor: 'Autonomo' },
        ],
        itemsPlanSocial: [
          { nivel: 'AUH', valor: 'AUH' },
          { nivel: 'Pensión', valor: 'Pension' },
          { nivel: 'Plan social', valor: 'Plan' },
          { nivel: 'Otro', valor: 'Otro' },
        ],
        itemsIngresoIndividual: [
          { nivel: '0 - 2200', valor: '0' },
          { nivel: '2200 - 4400', valor: '1' },
          { nivel: '4400 - 6600', valor: '2' },
          { nivel: '6600 - 13000', valor: '3' },
          { nivel: '13000 - 25000', valor: '4' },
          { nivel: 'Más de 25000', valor: '5' },
        ],
        itemsIngresoTotal: [
          { nivel: '0 - 16000', valor: '0' },
          { nivel: '16000 - 38000', valor: '1' },
          { nivel: '38000 - 60000', valor: '2' },
          { nivel: 'Más de 60000', valor: '3' },
        ],
      }
    },
    created() {
    this.getLugares();
    },
    methods: {
      async getEncuesta() {
      const res = await this.axios.get(
        `${this.baseUrl}/encuestas1y2Trimestre/` + this.id
      );
      this.encuesta = res.data;
      this.recordatorios = res.data.recordatorio24Horas;
      },      
      async editarEncuesta() {
        if (this.$refs.obligatorio.validate()) {
          this.loading = true;
          const headers = {
            Accept: "application/json",
            "Content-type": "application/json",
          };
          this.encuesta.recordatorio24Horas = this.recordatorios;
          this.axios.put(`${this.baseUrl}/encuestas1y2Trimestre/` + this.id,     
            JSON.stringify(this.encuesta),
            { headers }).then((result) => {
                this.loading = false;
                this.encuesta = new Encuesta();
                this.recordatorios = [];
                this.dialog = false;
                this.$emit('encuestaActualizada')
                this.$emit('getEncuestas')
            }) 
          this.$refs.obligatorio.resetValidation();
        }
        else
        {
          this.$emit('camposObligatorios');
        }
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
      this.recordatorio.alimento = this.recordatorios[this.recordatorios.indexOf(recordatorio)].alimento;
      this.recordatorios.splice(this.recordatorios.indexOf(recordatorio), 1);
    },
  }    
}
</script>