"use client";

import useSWR from "swr";
import { useState } from "react";
import ProductCard from "./ProductCard";
import SidebarFilters from "./SidebarFilters";
import ProductSkeleton from "./ProductSkeleton";
import { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  inStock: boolean;
  category: string;
  colors: string[];
  sizes: string[];
  gender: string;
  createdAt: Timestamp;
}

interface ProductsResponse {
  products: Product[];
}

// fetcher для SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function LatestCollection() {
  const { data, error, isLoading } = useSWR<ProductsResponse>("/api/products", fetcher);
  const products: Product[] = data?.products ?? [];

  // Фильтры
  const [filters, setFilters] = useState({
    category: [] as string[],
    color: [] as string[],
    size: [] as string[],
    gender: [] as string[]
  });

  // Пагинация
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  if (error) return <div>Error loading products</div>;

  // Фильтрация
  const filteredProducts = products
    .filter(p => p.inStock)
    .filter(p => (filters.category.length ? filters.category.includes(p.category) : true))
    .filter(p => (filters.color.length ? p.colors.some(c => filters.color.includes(c)) : true))
    .filter(p => (filters.size.length ? p.sizes.some(s => filters.size.includes(s)) : true))
    .filter(p => (filters.gender.length ? filters.gender.includes(p.gender) : true));

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
        <div className="flex flex-col flex-1">
          <div className="flex flex-wrap gap-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : paginatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={`$${product.price}`}
                  imageSrc={product.image}
                  href={`/products/${product.id}`}
                />
              ))
            }

            {!isLoading && paginatedProducts.length === 0 && (
              <p className="text-gray-500">No products found.</p>
            )}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="flex items-center gap-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}