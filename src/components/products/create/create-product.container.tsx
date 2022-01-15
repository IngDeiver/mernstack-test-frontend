import { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import React from "react";
import { uploadImage, create, getById, update } from "../../../api/product.api";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../redux/store";
import { UserLocalSesion } from "../../../types/UserLocalSesion";
import { showErrorToast } from "../../../utils/toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CreateProduct } from "../../../types/CreateProduct";
import toast from "react-hot-toast";
import { fetchProductsThunk } from "../../../redux/thunks/product.thunks";
import { GetProduct } from "../../../types/GetProducto";
import { setProductUpdateAction } from "../../../redux/slices/updateProduct.slice";
import { UpdateProduct } from "../../../types/UpdateProduct";
import CreateProductComponent from "./create-product.component";

export default function NewProduct() {
  const dispatch = useAppDispatch();
  const session: UserLocalSesion = useAppSelector(
    (state: RootState) => state.sesion
  );
  const ACCESS_TOKEN: any = session?.access_token;
  const [image, setImage] = React.useState<File | null>(null);
  const [productToUpdate, setProductToUpdate] =
    React.useState<GetProduct | null>(null);
  const productUpdateId: string | null = useAppSelector(
    (state: RootState) => state.updateProductId
  );

  const onFileChange = React.useCallback((event: any) => {
    // Update the state
    setImage(event.target.files[0]);
  }, []);

  const saveImage = (): AxiosPromise => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    if (image) formData.append("image", image, image?.name);
    return uploadImage(ACCESS_TOKEN, formData);
  };

  const completeUpdateProduct = (product: UpdateProduct) => {
    toast.promise(
      update(ACCESS_TOKEN, product),
      {
        loading: "Updating product",
        success: () => {
          dispatch(fetchProductsThunk(ACCESS_TOKEN));
          dispatch(setProductUpdateAction(null));
          setProductToUpdate(null);
          //form.resetForm()
          return "Product updated";
        },
        error: (error: AxiosError) => {
          return `Something went wrong ${error.message}`;
        },
      },
      { duration: 4000 }
    );
  };

  const updateProduct = (newDataProduct: UpdateProduct) => {
    if (ACCESS_TOKEN && productToUpdate) {
      if (image) {
        saveImage()
          .then((res: AxiosResponse) => {
            newDataProduct.imageUrl = res.data.imageUrl;
            completeUpdateProduct(newDataProduct);
          })
          .catch((err: AxiosError) =>
            showErrorToast("Upload image error : " + err.message)
          );
      } else {
        completeUpdateProduct(newDataProduct);
      }
    }
  };

  const saveProduct = (product: CreateProduct, setSubmitting: any) => {
    if (image) {
      saveImage()
        .then((res: AxiosResponse) => {
          product.imageUrl = res.data.imageUrl;

          if (ACCESS_TOKEN) {
            toast.promise(
              create(ACCESS_TOKEN, product),
              {
                loading: "Sign Up...",
                success: () => {
                  setSubmitting(false);
                  form.resetForm();
                  setImage(null);
                  dispatch(fetchProductsThunk(ACCESS_TOKEN));
                  return "Product saved";
                },
                error: (error: AxiosError) => {
                  setSubmitting(false);
                  return `Something went wrong ${error.message}`;
                },
              },
              { duration: 4000 }
            );
          }
        })
        .catch((err: AxiosError) =>
          showErrorToast("Upload iage error : " + err.message)
        );
    } else {
      showErrorToast("Select a image");
    }
  };

  const cancelUpdateProduct = React.useCallback(() => {
    dispatch(setProductUpdateAction(null));
    setProductToUpdate(null);
    form.resetForm();
  }, []);

  const getProduct = () => {
    if (ACCESS_TOKEN && productUpdateId) {
      toast.promise(
        getById(ACCESS_TOKEN, productUpdateId),
        {
          loading: "Getting product",
          success: (res: AxiosResponse) => {
            setProductToUpdate(res.data);
            return "Product found";
          },
          error: (error: AxiosError) => {
            return `Something went wrong ${error.message}`;
          },
        },
        { duration: 4000 }
      );
    }
  };

  React.useEffect(() => {
    if (productUpdateId) {
      getProduct();
    }
  }, [productUpdateId]);

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required("The name is required"),
    price: Yup.number().required("The price is required"),
  });

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productToUpdate ? productToUpdate.name : "",
      price: productToUpdate ? productToUpdate.price : 0,
    },
    onSubmit: (values, { setSubmitting }) => {
      if (productToUpdate) {
        const product: any = {
          ...values,
          _id: productToUpdate._id,
        };
        updateProduct(product);
      } else {
        const product: CreateProduct = {
          ...values,
          imageUrl: "",
        };

        saveProduct(product, setSubmitting);
      }
    },
    validationSchema: ProductSchema,
  });

  return (
    <CreateProductComponent
      onFileChange={onFileChange}
      productToUpdate={productToUpdate}
      form={form}
      productUpdateId={productUpdateId}
      cancelUpdateProduct={cancelUpdateProduct}
    />
  );
}
