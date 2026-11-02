"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { X, SlidersHorizontal } from "lucide-react";
import Dropdown from "@/app/components/molecules/Dropdown";
import CheckBox from "@/app/components/atoms/CheckBox";
import { debounce } from "lodash";

export interface FilterValues {
  search: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
}

interface ProductFiltersProps {
  initialFilters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
  categories: Array<{ id: string; name: string }>;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  initialFilters,
  onFilterChange,
  categories,
  isMobile = false,
  onCloseMobile,
}) => {
  const { control, watch, reset, handleSubmit } = useForm<FilterValues>({
    defaultValues: initialFilters,
  });

  // Watch form values
  const formValues = watch();

  // Debounced search update
  const debouncedSearch = debounce((searchValue: string) => {
    onFilterChange({ ...formValues, search: searchValue });
  }, 500);

  // Handle search input change
  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  // Handle form submission (Apply Filters)
  const onSubmit = (data: FilterValues) => {
    onFilterChange(data);
    if (isMobile && onCloseMobile) onCloseMobile();
  };

  // Reset all filters
  const handleReset = () => {
    reset({
      search: "",
      categoryId: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      isNew: undefined,
      isFeatured: undefined,
      isTrending: undefined,
      isBestSeller: undefined,
    });
    onFilterChange({
      search: "",
      categoryId: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      isNew: undefined,
      isFeatured: undefined,
      isTrending: undefined,
      isBestSeller: undefined,
    });
    if (isMobile && onCloseMobile) onCloseMobile();
  };

  // Format categories for dropdown
  const categoryOptions = [
    { label: "All Categories", value: "" },
    ...categories.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  ];

  // Count active filters
  const activeFilterCount = Object.values(formValues).filter(
    (value) => value !== undefined && value !== "" && value !== false
  ).length;

  return (
    <aside
      className={`pb-3 bg-card [&::-webkit-scrollbar]:hidden ${
        isMobile
          ? "fixed inset-0 z-50 overflow-y-auto scroll-"
          : "sticky top-24 h-fit max-h-[calc(100vh-120px)] overflow-y-auto "
      }`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        {/* Header */}
        <div
          className={`flex items-center justify-between  ${
            isMobile ? "p-4" : "p-6 pb-4"
          }`}
        >
          <div className="  flex items-center gap-3 " >
            <SlidersHorizontal size={20} className="text-emigreen" />
            <h2 className="font-bold text-emigreen/60 text-lg">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full px-2.5 py-1">
                {activeFilterCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1.5 font-medium"
              >
                <X size={16} />
                Clear all
              </button>
            )}
            {isMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Filters Content */}
        <div
          className={`flex-1 space-y-6 ${
            isMobile ? "p-4" : "p-6 pt-4"
          } overflow-y-auto`}
        >
          {/* Search */}
          <div className="space-y-3">
            {/* <label className="text-sm font-semibold text-gray-800">
              Search Products
            </label> */}
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full  rounded-2 p-3.5 text-sm   transition-all duration-200 bg-transparent placeholder:text-textDark text-white green-input"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleSearchChange(e.target.value);
                  }}
                />
              )}
            />
          </div>

          {/* Category */}
          <div className="space-y-3">
            {/* <label className="text-sm font-semibold text-gray-800">
              Category
            </label> */}
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Dropdown
                  options={categoryOptions}
                  value={field.value || ""}
                  onChange={(val) => field.onChange(val || undefined)}
                  className="w-full bg-transparent"
                />
              )}
            />
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-emigreen/60 font-mono">
              Price Range
            </label>
            <div className="grid grid-cols-2 space-x-3">
              <Controller
                name="minPrice"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    placeholder="Min"
                    className=" rounded-2 p-3 text-sm transition-all duration-200 placeholder:text-textDark text-white  green-input "
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                )}
              />
              <Controller
                name="maxPrice"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    placeholder="Max"
                    className="rounded-2 p-3 text-sm transition-all duration-200 placeholder:text-textDark text-white  green-input "
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                )}
              />
            </div>
          </div>

          {/* Product Flags */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-emigreen/60 font-mono">
              Product Status
            </label>
            <div className="space-y-4 pl-1">
              <CheckBox name="isNew" control={control} label="New Arrivals"
              className="" />
              <CheckBox
                name="isFeatured"
                control={control}
                label="Featured Products"
              />
              <CheckBox
                name="isTrending"
                control={control}
                label="Trending Now"
              />
              <CheckBox
                name="isBestSeller"
                control={control}
                label="Best Sellers"
              />
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div
          className={` ${
            isMobile ? "p-4" : "p-6 pt-4"
          }`}
        >
          <button
            type="submit"
            className="w-full bg-emigreen text-white py-3.5 rounded-xl hover:bg-emigreen/60 transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </aside>
  );
};

export default ProductFilters;
