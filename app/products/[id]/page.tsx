"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
  inStock?: boolean;
}

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch("/api/products")
      .then(res => res.json())
      .then((data: Product[]) => {
        const found = data.find(p => p.id === id);
        setProduct(found || null);
      });
  }, [id]);

  if (!product) return <div className="p-4">Товар не найден</div>;

  return (
    <div className="mt-32 max-w-[1440px] mx-auto flex flex-row gap-8">
      {product.image && <Image
        src={product.image?.trimEnd() || "/images/default.jpg"}
        alt={product.title}
        width={400}
        height={400}
        className="mb-4 object-contain"
      />}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-lg mb-2">Цена: {product.price} грн</p>
        <p>В наличии: {product.inStock ? "Да" : "Нет"}</p>
      </div>
    </div>
  );
}