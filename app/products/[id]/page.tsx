"use client";

import { use, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Props {
  params: Promise<{ id: string }>;
}

interface Product {
  id: string;
  title: string;
  price: number;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
  image?: string;
  description?: string;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params); // распаковываем Promise

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setProduct(null);
      } else {
        setProduct({ id: docSnap.id, ...(docSnap.data() as Omit<Product, "id">) });
      }

      setLoading(false);
    }

    fetchProduct();
  }, [id]); // используем распакованный id

  if (loading) return <div>Загрузка...</div>;
  if (!product) return <div>Товар не найден</div>;

  return (
    <div className="max-w-[1440px] flex gap-8 mx-auto mt-48">
      <img src={product.image} alt={product.title} className="max-w-[500px] h-auto mb-6" />
      <div className=" flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p>Price: ${product.price}</p>
        <p>In stock: {product.inStock ? "Yes" : "No"}</p>
        <p>Colors: {product.colors?.join(", ")}</p>
        <p>Sizes: {product.sizes?.join(", ")}</p>
        <p>Description: {product.description}</p>
      </div>
    </div>
  );
}