"use client";

import { useSearch, Product } from "../hooks/useSearch";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const { results, loading } = useSearch(query);
  const router = useRouter();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Результаты поиска: "{query}"
      </h1>

      {loading && <p>Загрузка...</p>}
      {!loading && results.length === 0 && <p>Ничего не найдено</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {results.map((p: Product) => (
          <div
            key={p.id}
            className="border rounded p-2 cursor-pointer hover:shadow-md transition"
            onClick={() => router.push(`/products/${p.id}`)}
          >
            {p.image && <img src={p.image} alt={p.title} className="mb-2" />}
            <h2 className="font-bold">{p.title}</h2>
            <p>Цена: {p.price} грн</p>
            <p>В наличии: {p.inStock ? "Да" : "Нет"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}