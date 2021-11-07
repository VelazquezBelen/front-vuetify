<template>
  <div class="lugares">
    <h2 class="grey--text">
      <span>Administrar Lugares</span>
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
            :items="lugares"
            sort-by="lugar.nombre"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-col cols="6">
                <v-text-field
                  class="xs-3"
                  v-model="lugarInput"
                  label="Nuevo lugar de relevamiento"
                  hide-details
                ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-btn text outlined @click="addLugar" class="mx-2 caption"
                  dark
                  color="grey" >Agregar lugar
                  <v-icon dark right>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-row>
                    <v-btn
                    text
                    @click="deleteLugar(item._id)"
                    color="grey"
                    >
                    <v-icon left small>mdi-delete</v-icon>
                    </v-btn>
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
export default {
  data() {
    return {
      search: '',
      baseUrl: "https://tpftestbackend.herokuapp.com",
      headers: [
        {
          text: "Lugar de relevamiento",
          align: "start",
          value: "nombre"
        },
        { text: "Eliminar", value: "actions", sortable: false, filterable: false},
      ],
      lugares: [],
      lugarInput: null,
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
