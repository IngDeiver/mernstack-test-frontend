import React from "react";
import { GetProduct } from "../../../types/GetProducto";
import { UserLocalSesion } from "../../../types/UserLocalSesion";
import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchProductsThunk } from "../../../redux/thunks/product.thunks";
import ListProductsComponent from "./list-products.component";



export default function ListProducts() {
  const products: Array<GetProduct> = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();
  const [fetching, setFetching] = React.useState<boolean>(true);
  const session: UserLocalSesion = useAppSelector(
    (state: RootState) => state.sesion
  );

  const getProducts = () => {
    if (session.access_token) {
      dispatch(fetchProductsThunk(session.access_token))
        .unwrap()
        .then(() => {
          setFetching(false);
        })
        .catch((err) => {
          setFetching(false);
          console.error(err);
        });
    }
  };





  React.useEffect(() => {
    getProducts();
  }, [session]);

  return (
    <ListProductsComponent
      products={products}
      fetching={fetching}
    />
  );
}
