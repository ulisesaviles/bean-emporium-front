import { ProductVariant } from "../config/types";

export const getCurrentPriceRange = (
  quantity: number,
  selectedVariant: ProductVariant
) => {
  for (let i = 0; i < selectedVariant?.priceRanges.length; i++) {
    const priceRange = selectedVariant?.priceRanges[i];
    if (
      quantity >= priceRange.minQuantity &&
      quantity <= priceRange.maxQuantity
    )
      return priceRange.price;
  }
  return selectedVariant.priceRanges[selectedVariant.priceRanges.length - 1]
    .price;
};