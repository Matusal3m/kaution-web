import * as authService from "./auth-service";
import * as categoryService from "./category-service";
import * as productService from "./product-service";
import * as stockService from "./stock-service";

export const kautionApiService = {
  auth: authService,
  category: categoryService,
  product: productService,
  stock: stockService,
};
