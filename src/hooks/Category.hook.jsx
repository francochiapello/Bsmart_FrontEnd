import axios from "axios";
import config from "../config";
import Cookie from "../services/Cookie.service";
const { getCookie } = Cookie();

const CategoryHook = () => {
  const url = `${config.URL}/category`;
  const token = getCookie();

  const getOne = async (id) => {
    const response = axios.get(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
  const select = async (fill) => {
    const params = fill == null ? "" : fill;
    const response = axios.get(`${config.URL}/categories/select/${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    const response = axios.post(`${config.URL}/categories/all`, param, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
    const response = axios.post(`${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
    const response = axios.put(`${url}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
    const response = axios.delete(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
    select,
    getAll,
    create,
    update,
    remove,
  };
};

export default CategoryHook;
