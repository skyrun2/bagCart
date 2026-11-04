"use client";
import React from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { ApolloError } from "@apollo/client";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types/productTypes";

interface ProductSectionProps {
  title: string;
  products: Product[];
  loading: boolean;
  error: ApolloError | undefined;
  showTitle?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  error,
  showTitle = false,
}) => {
  if (error) {
    return (
      <section className="w-full py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Error loading {title.toLowerCase()}
              </h3>
              <p className="text-red-600 text-sm">{error.message}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No {title.toLowerCase()} available
              </h3>
              <p className="text-gray-600 text-sm">
                Check back soon for new products!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-section ">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-full py-8 flex flex-col  items-center justify-center gap-4">
              <div className="w-full  items-center justify-center flex flex-col gap-3">
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  Our Collection
                </h2>
                <p className="w-full text-center text-textDark max-w-lg ">Limited early-access drops from our experimental labs. Delivered to your doorstep in hours, not days.</p>

              </div>
              {products.length > 8 && (
                <button
                  className="inline-flex items-center gap-2 bg-emigreen hover:bg-emigreen/60 text-white px-4 sm:px-6 py-2 sm:py-3
                 rounded-sm font-semibold
                  self-start sm:self-auto text-sm cursor-pointer"
                >
                  View All
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}

        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto py-32">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      
    </section>
  );
};

export default React.memo(ProductSection);
