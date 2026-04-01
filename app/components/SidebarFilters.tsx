"use client";

import { useState, useEffect } from "react";
import { Product } from "./LatestCollection";

interface SidebarFiltersProps {
  products: Product[];
  onFilterChange: (filters: {
    category: string[];
    color: string[];
    size: string[];
    gender: string[];
  }) => void;
}

export default function SidebarFilters({ products, onFilterChange }: SidebarFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

  const categories = Array.from(new Set(products.map(p => p.category)));
  const colors = Array.from(new Set(products.flatMap(p => p.colors)));
  const sizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const genders = Array.from(new Set(products.map(p => p.gender)));

  useEffect(() => {
    onFilterChange({
      category: selectedCategories,
      color: selectedColors,
      size: selectedSizes,
      gender: selectedGenders,
    });
  }, [selectedCategories, selectedColors, selectedSizes, selectedGenders, onFilterChange]);

  const toggleItem = (item: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(item)) setList(list.filter(i => i !== item));
    else setList([...list, item]);
  };

  const renderCheckboxes = (
    items: string[],
    selected: string[],
    setSelected: (v: string[]) => void,
    prefix: string
  ) =>
    items.map(item => (
      <label key={`${prefix}-${item}`} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selected.includes(item)}
          onChange={() => toggleItem(item, selected, setSelected)}
          className="w-4 h-4"
        />
        <span>{item}</span>
      </label>
    ));

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedGenders([]);
  };

  return (
    <aside className="w-64 p-4 bg-white shadow rounded-lg flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-indigo-600 hover:underline"
        >
          Clear
        </button>
      </div>

      <h4 className="font-semibold mb-2">Categories</h4>
      <div className="flex flex-col mb-4">{renderCheckboxes(categories, selectedCategories, setSelectedCategories, "cat")}</div>

      <h4 className="font-semibold mb-2">Colors</h4>
      <div className="flex flex-col mb-4">{renderCheckboxes(colors, selectedColors, setSelectedColors, "color")}</div>

      <h4 className="font-semibold mb-2">Sizes</h4>
      <div className="flex flex-col mb-4">{renderCheckboxes(sizes, selectedSizes, setSelectedSizes, "size")}</div>

      <h4 className="font-semibold mb-2">Gender</h4>
      <div className="flex flex-col">{renderCheckboxes(genders, selectedGenders, setSelectedGenders, "gender")}</div>
    </aside>
  );
}