import axios from "axios";
import { base_url } from "../base_url";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const token = localStorage.getItem("token");

const registerUser = async (data) => {
  const response = await axios
    .post(`${base_url}/register`, data)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};

const loginUser = async (data) => {
  const response = await axios
    .post(`${base_url}/login`, data)
    .then((result) => {
      localStorage.setItem("token", result.data.token);
      return result;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};

const addTodo = async (data) => {
  const response = await axios
    .post(`${base_url}/add_todo`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};
const getcompletedTodo = async (data) => {
  const response = await axios
    .get(`${base_url}/completed_todo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};

const getAllTodo = async (token) => {
  const response = await axios
    .get(`${base_url}/getalltodo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};
const searchTodo = async (query,token) => {
  console.log(query,token);
  const response = await axios
    .get(`${base_url}/search?query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};

const filterPriority = async (query) => {
  console.log(query);
  const response = await axios
    .get(`${base_url}/priority?priority=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};

const updateTodo = async (id , data) => {
  console.log({id})
  const response = await axios
    .put(`${base_url}/update_todo/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};


const deleteTodo = async (id ) => {
  console.log({id})
  const response = await axios
    .delete(`${base_url}/delete_todo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });

  return response;
};

export { registerUser, loginUser, addTodo, getAllTodo,updateTodo,deleteTodo,searchTodo,getcompletedTodo,filterPriority };
