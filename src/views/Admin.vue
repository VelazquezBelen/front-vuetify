<template>
  <div class="admin">
    <h2 class="grey--text">
      <span>ADMINISTRACION</span>
    </h2>
    <hr />
    <div class="pa-2">
    </div>
    <v-simple-table
    fixed-header
    height="300px"
    >
      <template>
        <thead>
          <tr>
            <th class="text-center">
              Lugar de relevamiento
            </th>
            <th class="text-center">
              Accion
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lugar in lugares"
            :key="lugar.nombre"
          >
            <td>{{ lugar.nombre }}</td>
            <div class="text-center">
            <v-btn
              text
              @click="deleteLugar(lugar._id)"
              color="blue-grey"
            >
            <v-icon left small>mdi-delete</v-icon>
            </v-btn>
            </div>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="lugarInput"
                  :counter="25"
                  label="Nuevo lugar de relevamiento"
                  :rules="rules.obligatorio"
                ></v-text-field>
                <div class="text-center">
                <v-btn
                      text
                      @click="addLugar()"
                      color="blue-grey"
                    >
                    <v-icon left small>mdi-plus</v-icon>
                    </v-btn>
                  </div>
              </v-col>
            </v-row>
          </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "https://tpftestbackend.herokuapp.com",
      lugares: [],
      lugarInput: null,
      rules: {
          obligatorio: [o=> !!o || 'Este campo es obligatorio'],
        },
    };
  },
  created() {
    this.getLugares();
  },
  methods: {
    async getLugares() {
      const res = await this.axios.get(`${this.baseUrl}/lugares`);
      this.lugares = res.data;
    },
    async addLugar() {
      //this.lugares.push({ nombre: this.lugarInput });
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      await this.axios.post(
        `${this.baseUrl}/lugares/`,
        JSON.stringify({ nombre: this.lugarInput }),
        { headers }
      );
      this.getLugares();
      this.lugarInput = null;
    },
    async deleteLugar(id) {
      await this.axios.delete(`${this.baseUrl}/lugares/` + id);
      this.getLugares();
    },
  },
};
</script>