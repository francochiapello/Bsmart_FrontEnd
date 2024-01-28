import axios from "axios";
import config from "../config";

const UserHook = () => {
  const url = `${config.URL}/auth`;

  const login = async (data) => {
    const response = axios.post(`${url}/login`, data);

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
  const register = async (data) => {
    const response = axios.post(`${url}/register`, data);

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
    login,
    register,
  };
};

export default UserHook;
