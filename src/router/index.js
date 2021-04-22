import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import PessoaIndex from "../views/Pessoa/Index";
import PessoaAdd from "../views/Pessoa/Add";
import AnimalIndex from "../views/Animal/Index";
import AnimalAdd from "../views/Animal/Add";
import LoteIndex from "../views/Lote/Index";
import LoteAdd from "../views/Lote/Add";
import AlocacaoIndex from "../views/Alocacao/Index";
import AlocacaoAdd from "../views/Alocacao/Add";

import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/pessoa", name: "Pessoa", component: PessoaIndex },
  { path: "/pessoa/add", component: PessoaAdd },
  { path: "/animal", name: "Animal", component: AnimalIndex },
  { path: "/animal/add", component: AnimalAdd },
  { path: "/lote", name: "Lote", component: LoteIndex },
  { path: "/lote/add", component: LoteAdd },
  { path: "/alocacao", name: "Alocação", component: AlocacaoIndex },
  { path: "/alocacao/add", component: AlocacaoAdd },
  { path: "*", component: NotFound },
];

const router = new VueRouter({
  routes,
  linkActiveClass: "active",
});

export default router;
