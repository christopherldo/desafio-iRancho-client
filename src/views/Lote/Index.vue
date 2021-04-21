<template>
  <main class="lote">
    <div class="container">
      <div class="top--actions">
        <router-link
          class="button bg-warning text-dark"
          to="/"
          title="Voltar para a Home"
        >
          <font-awesome-icon icon="home" />
        </router-link>
        <router-link
          class="button bg-success text-white"
          to="/lote/add"
          title="Adicionar lote"
        >
          <font-awesome-icon icon="plus" />
        </router-link>
        <h1>Lista de Lotes</h1>
        <form>
          <div class="input-group mb-3">
            <input
              v-model="q"
              placeholder="Faça uma busca..."
              type="text"
              class="form-control"
              name="q"
            />
          </div>
        </form>
      </div>
      <ul v-if="errors.length > 0" class="alert alert-danger" role="alert">
        <div v-for="(error, key) in errors" v-bind:key="key">
          {{ error.msg }}
        </div>
      </ul>
      <div v-if="loading" class="loading">Carregando...</div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col" class="th-actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lote, key) in animalLoteArray" v-bind:key="key">
            <th scope="row">{{ lote.id }}</th>
            <td>{{ lote.no_lote }}</td>
            <td>{{ lote.ds_lote }}</td>
            <td class="td-actions">
              <router-link
                class="button bg-dark text-white"
                v-bind:to="`/lote/edit/${lote.id}`"
                v-bind:title="`Editar ${lote.no_lote}`"
              >
                <font-awesome-icon icon="pen" />
              </router-link>
              <a
                class="button bg-dark"
                v-on:click="deleteLote(lote.id, key)"
                v-bind:title="`Apagar ${lote.no_lote}`"
              >
                <font-awesome-icon icon="trash" class="text-white" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import API from "../../helpers/api";
export default {
  data() {
    return {
      animalLoteArray: [],
      loading: true,
      errors: [],
      timer: null,
      getLotesList: async () => {
        this.errors = [];
        this.animalLoteArray = [];
        this.loading = true;

        try {
          const response = await API.getLotes({ q: this.q });
          this.animalLoteArray = response.data.animalLoteArray;
        } catch (e) {
          if (e.response.data.error) {
            for (let err in e.response.data.error) {
              this.errors.push(e.response.data.error[err]);
            }
          } else {
            this.errors.push(e);
          }
        }

        this.loading = false;
      },
    };
  },
  methods: {
    async deleteLote(id, key) {
      this.errors = [];

      this.$swal
        .fire({
          title: "Você tem certeza?",
          text: "Isso não pode ser desfeito",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await API.deleteLote(id);
              this.animalLoteArray.splice(key, 1);
              this.$swal.fire(
                "Deletado!",
                "O registro foi deletado.",
                "success"
              );
            } catch (e) {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocorreu um erro",
              });
              if (e.response.data.error) {
                for (let err in e.response.data.error) {
                  this.errors.push(e.response.data.error[err]);
                }
              }
            }
          }
        });
    },
  },
  async mounted() {
    await this.getLotesList();
  },
  watch: {
    async q() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(this.getLotesList, 500);
    },
  },
  computed: {
    q: {
      get() {
        return this.$route.query.q;
      },
      set(q) {
        this.$router.push({ query: { q } });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.lote {
  display: flex;

  .container {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;

    .top--actions {
      display: flex;

      h1 {
        margin: auto;
        margin-top: 0;
        font-size: 26px;
        line-height: 50px;
      }

      .button {
        height: 50px;
        width: 50px;
        line-height: 50px;
        font-size: 25px;
        margin: 0 10px 20px 0;
      }

      form {
        margin-left: auto;
        height: 50px;

        .input-group,
        input {
          height: 100%;
        }
      }
    }

    .button {
      display: block;
      height: 40px;
      width: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
    }

    th,
    td {
      padding-top: 0;
      padding-bottom: 0;
      height: 60px;
      line-height: 60px;

      &.th-actions {
        width: 125px;
      }

      &.td-actions {
        display: flex;
        align-items: center;

        a {
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
