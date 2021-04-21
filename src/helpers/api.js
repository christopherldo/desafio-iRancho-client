import axios from "axios";
import qs from "qs";

const BASE_API = "http://127.0.0.1:3000/api";

const axiosGET = async (endpoint, body = {}) => {
  return await axios({
    method: "get",
    url: `${BASE_API + endpoint}?${qs.stringify(body)}`,
    headers: {
      Accept: "application/json",
    },
  });
};

const axiosPOST = async (endpoint, body) => {
  return await axios({
    method: "post",
    url: BASE_API + endpoint,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      ...body,
    },
  });
};

// const axiosPUT = async (endpoint, body) => {
//   return await axios({
//     method: "put",
//     url: BASE_API + endpoint,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     data: {
//       body,
//     },
//   });
// };

const axiosPATCH = async (endpoint) => {
  return await axios({
    method: "patch",
    url: BASE_API + endpoint,
    headers: {
      Accept: "application/json",
    },
  });
};

const axiosDELETE = async (endpoint) => {
  return await axios({
    method: "delete",
    url: BASE_API + endpoint,
    headers: {
      Accept: "application/json",
    },
  });
};

const API = {
  getPessoas: async (options = {}) => {
    return await axiosGET("/pessoa", options);
  },
  addPessoa: async (body) => {
    return await axiosPOST("/pessoa", body);
  },
  togglePessoaActive: async (id) => {
    return await axiosPATCH(`/pessoa/${id}`);
  },
  deletePessoa: async (id) => {
    return await axiosDELETE(`/pessoa/${id}`);
  },
  getAnimais: async (options = {}) => {
    return await axiosGET("/animal", options);
  },
  addAnimal: async (body) => {
    return await axiosPOST("/animal", body);
  },
  deleteAnimal: async (id) => {
    return await axiosDELETE(`/animal/${id}`);
  },
  getLotes: async (options = {}) => {
    return await axiosGET("/lote", options);
  },
  deleteLote: async (id) => {
    return await axiosDELETE(`/lote/${id}`);
  },
  getAlocacoes: async (options = {}) => {
    return await axiosGET("/animal-x-lote", options);
  },
  deleteAlocacao: async (id) => {
    return await axiosDELETE(`/animal-x-lote/${id}`);
  },
};

export default API;
