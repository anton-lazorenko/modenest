import { useState, useEffect } from "react";

export interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
  inStock?: boolean;
}

export function useSearch(query: string) {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch("/api/products")
      .then(res => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 10)); // максимум 10 результатов
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Ошибка при поиске");
        setLoading(false);
      });
  }, [query]);

  return { results, loading, error };
}