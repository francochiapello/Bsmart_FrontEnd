import axios from "axios";
import config from "../config";

const ProductHook = () => {
  const url = `${config.URL}/product`;

  const getOne = async (id) => {
    const response = axios.get(`${url}/${id}`);
    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const getAll = async (param) => {
    const response = axios.post(`${config.URL}/products/all`, param);

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const create = async (data) => {
    const response = axios.post(`${url}`, data);

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const update = async (id, data) => {
    const response = axios.put(`${url}/${id}`, data);

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const remove = async (id) => {
    const response = axios.delete(`${url}/${id}`);

    return new Promise((resolve, reject) => {
      response
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    getOne,
    getAll,
    create,
    update,
    remove,
  };
};

export default ProductHook;
