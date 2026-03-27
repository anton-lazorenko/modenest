"use client";

import useSWR from "swr";
import { useState } from "react";
import ProductCard from "./ProductCard";
import SidebarFilters from "./SidebarFilters";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  inStock: boolean;
  category: string;
  colors: string[];
  sizes: string[];
  gender: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function LatestCollection() {
  const { data: products = [], error, isLoading } = useSWR<Product[]>("/api/products", fetcher);
  const [filters, setFilters] = useState({
    category: [] as string[],
    color: [] as string[],
    size: [] as string[],
    gender: [] as string[]
  });

  if (error) return <div>Error loading products</div>;
  if (isLoading) return <div>Loading...</div>;

  const filteredProducts = products
    .filter(p => p.inStock)
    .filter(p => (filters.category.length ? filters.category.includes(p.category) : true))
    .filter(p => (filters.color.length ? p.colors.some(c => filters.color.includes(c)) : true))
    .filter(p => (filters.size.length ? p.sizes.some(s => filters.size.includes(s)) : true))
    .filter(p => (filters.gender.length ? filters.gender.includes(p.gender) : true));

  return (
    <section className="py-24 container mx-auto px-6 md:px-12 text-left">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-indigo-600">Our Latest Collection</h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
        Explore our newest arrivals and find the perfect style for you.
      </p>

      <div className="flex mt-16 gap-8">
        {/* Боковая панель фильтров */}
        <SidebarFilters products={products} onFilterChange={setFilters} />

        {/* Товары */}
        <div className="flex flex-wrap gap-4 flex-1">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={`$${product.price}`}
              imageSrc={product.image}
              href={`/products/${product.id}`}
            />
          ))}
          {filteredProducts.length === 0 && <p className="text-gray-500">No products found.</p>}
        </div>
      </div>
    </section>
  );
}