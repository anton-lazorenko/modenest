"use client";

import { useState, useRef, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearch, Product } from "../hooks/useSearch";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { results, loading } = useSearch(debouncedQuery);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Закрыть dropdown при клике вне
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!query) return;
    setIsOpen(false);
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-64">
      <div className="flex">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") handleSearch();
          }}
          className="w-full border rounded-3xl p-3 appearance-none outline-none focus:appearance-none focus:outline-none border-amber-100 placeholder:text-amber-100/60"
        />
        <button
          onClick={handleSearch}
          className="px-3 rounded-3xl border border-amber-100 bg-amber-100"
        >
          <Search className="text-amber-700" />
        </button>
      </div>

      {isOpen && (loading || results.length > 0) && (
        <ul className="absolute top-full left-0 right-0 bg-white border rounded mt-1 max-h-60 overflow-auto z-50">
          {loading && <li className="p-2 text-gray-500">Загрузка...</li>}
          {!loading && results.length === 0 && (
            <li className="p-2 text-gray-500">Ничего не найдено</li>
          )}
          {!loading &&
            results.map((p: Product) => (
              <li
                key={p.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery("");
                  setIsOpen(false);
                  router.push(`/products/${p.id}`);
                }}
              >
                {p.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}