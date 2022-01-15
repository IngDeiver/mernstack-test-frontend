import axios from "axios";
import { CreateProduct } from "../types/CreateProduct";
import { UpdateProduct } from "../types/UpdateProduct";

const BASER_URL = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL: `${BASER_URL}/api/products` || "",
});

const list = (access_token: string) => {
  return instance.get("/", {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
};

const getById = (access_token: string, id: string) => {
  return instance.get(`/${id}`, {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
};


const remove = (access_token: string, id: string) => {
  return instance.delete(`/${id}`, {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
};

const create = (access_token: string, product: CreateProduct) => {
  return instance.post(`/`, product, {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
};

const update = (access_token: string, product: UpdateProduct) => {
  return instance.put(`/`, product, {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
};

const uploadImage = (access_token: string, image: FormData
) => {
  return instance.post(
    `/upload`,
     image ,
    {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    }
  );
};

export { list, remove, uploadImage, create, getById, update };
