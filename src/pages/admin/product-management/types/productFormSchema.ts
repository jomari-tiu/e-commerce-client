import z from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price is required"),
  stock: z.number().min(0, "Stock is required"),
});

export type ProductFormType = z.infer<typeof productFormSchema>;
