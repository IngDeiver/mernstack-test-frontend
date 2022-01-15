import ListItemComponent from "./list-item.component";
import React from "react";
import { GetProduct } from "../../../types/GetProducto";
import { setProductUpdateAction } from "../../../redux/slices/updateProduct.slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Swal, { SweetAlertResult } from "sweetalert2";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { RootState } from "../../../redux/store";
import { UserLocalSesion } from "../../../types/UserLocalSesion";
import { remove } from "../../../api/product.api";
import { fetchProductsThunk } from "../../../redux/thunks/product.thunks";

type ListItemProductContainerProps = {
  product: GetProduct;
};

const ListItemProductContainer = ({
  product,
}: ListItemProductContainerProps) => {
  const dispatch = useAppDispatch();
  const session: UserLocalSesion = useAppSelector(
    (state: RootState) => state.sesion
  );

  const getProducts = () => {
    if (session.access_token) {
      dispatch(fetchProductsThunk(session.access_token))
    }
  };

  const onRemove = React.useCallback((product: GetProduct) => {
    Swal.fire({
      title: "Remove product!",
      text: `Do you want to remove the produxt ${product.name} ?`,
      icon: "question",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed && session.access_token) {
        toast.promise(
          remove(session.access_token, product._id),
          {
            loading: "Removing...",
            success: () => {
              getProducts();
              return "Product removed";
            },
            error: (error: AxiosError) => {
              return `Something went wrong ${error.message}`;
            },
          },
          { duration: 4000 }
        );
      }
    });
  }, []);

  const setUpdateProductId = React.useCallback((product: GetProduct) => {
    dispatch(setProductUpdateAction(product._id));
  }, []);

  return (
    <ListItemComponent
      product={product}
      onRemove={onRemove}
      setUpdateProductId={setUpdateProductId}
    />
  );
};

export default React.memo(ListItemProductContainer);
