"use client";

import React, { useContext } from "react";
import ImageDisplay from "/shared/ui/ImageDisplay";
import ProductDetails from "./ProductDetails";
import Context from "/shared/config/Context";
import CardDisplay from "/widgets/ProductGrid/CardDisplay";

const ProductContainer = ({ product }) => {
  const { productItem } = useContext(Context);
  const similarProducts =
    productItem
      ?.filter(
        (p) =>
          p.category?.name === product?.category?.name &&
          p._id !== product?._id,
      )
      .slice(0, 4) || [];

  return (
    <div className="mb-24">
      <div className=" flex justify-between gap-[1rem] w-full max-md:flex-col">
        <ImageDisplay product={product} />
        <ProductDetails product={product} />
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-32 pt-16 border-t border-slate-100">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
            You Might Also Like
          </h2>
          <CardDisplay
            products={similarProducts}
            hideTitle={true}
            className="w-full mt-0"
          />
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
