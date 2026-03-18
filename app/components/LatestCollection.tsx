"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  inStock: boolean;
}

export default function LatestCollection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/products")
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-24 container mx-auto px-6 md:px-12 text-left">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-indigo-600">
        Our Latest Collection
      </h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
        Explore our newest arrivals and find the perfect style for you.
      </p>
      <div className="flex mt-16">sort</div>
      <div className="flex mt-16">
        <span>Filters</span>
        <div className="w-full flex flex-row gap-4 justify-end">
          {products
            .filter(product => product.inStock === true)
            .map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={`$${product.price}`}
                imageSrc={product.image}
                href={`/products/${product.id}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}