import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const EditProductList = () => {
  const { product, statusProduct } = useSelector((state) => state.post);
  const [productList, setProductList] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const result = product && product.find((product) => product.id == id);
    setProductList(result);
  }, [id]);

  console.log("productList id", productList);

  return <div>editProduct</div>;
};

export default EditProductList;
