<template>
  <div class="lugares">
    <h2 class="grey--text">
      <span>Administrar Lugares</span>
    </h2>
    <hr />
    <v-row justify="center">
      <v-col cols="12" sm="6" class="mx-20 my-14">
        <template>
          <v-data-table
            :headers="headers"
            :items="lugares"
            sort-by="lugar.nombre"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-col sm="4">
                  <v-text-field
                    class="xs-3"
                    v-model="lugarInput"
                    label="Nuevo lugar de relevamiento"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col sm="2">
                  <v-text-field
                    class="xs-3"
                    v-model="codLugarInput"
                    label="Código"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-btn @click="addLugar" color="grey" text fab small>
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-row>
                <v-icon text @click="deleteLugar(item._id)" color="grey" small>
                  mdi-delete
                </v-icon>
              </v-row>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      baseUrl: "https://tpftestbackend.herokuapp.com",
      headers: [
        { text: "Lugar de relevamiento", align: "start", value: "nombre" },
        { text: "Código", value: "codigo" },
        {
          text: "Eliminar",
          value: "actions",
          sortable: false,
          filterable: false,
        },
      ],
      lugares: [],
      lugarInput: null,
      codLugarInput : "",
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
        JSON.stringify({ nombre: this.lugarInput, codigo: this.codLugarInput }),
        { headers }
      );
      this.getLugares();
      this.lugarInput = null;
      this.codLugarInput = "";
    },
    async deleteLugar(id) {
      await this.axios.delete(`${this.baseUrl}/lugares/` + id);
      this.getLugares();
    },
  },
};
</script>
