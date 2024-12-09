"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Category, Product, Stock } from "@/shared/types";
import { kautionApiService } from "@/shared/services/api";

interface StorageContextType {
  products: Product[];
  categories: Category[];
  stocks: Stock[];
  fetchData: () => Promise<void>;
}

const StorageContext = createContext({} as StorageContextType);

export function StorageProvider({ children }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData, stocksData] = await Promise.all([
        kautionApiService.product.getAll(),
        kautionApiService.category.getAll(),
        kautionApiService.stock.getAll(),
      ]);
      setProducts(productsData ?? []);
      setCategories(categoriesData ?? []);
      setStocks(stocksData ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StorageContext.Provider
      value={{ products, categories, stocks, fetchData }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export const useStorage = (): StorageContextType => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
};
