import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, createProduct, updateProduct, deleteProduct } from "./productThunk";

const initialState = {
    products: [],
    loading: false,
    isError: false,
    errorMessage: "",
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearProductError(state) {
            state.errorMessage = "";
        },

    },
    extraReducers: (builder) => {
        //------Fetch All Products------
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.isError = false;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Failed to fetch products";
            })

        //------Create Product------
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.isError = false;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                const newProduct = action.payload.product || action.payload;

                // Check karein agar array hai aur product already exist nahi karta
                if (Array.isArray(state.products)) {
                    const exists = state.products.find(p => p._id === newProduct._id);
                    if (!exists) {
                        state.products.push(newProduct);
                    }
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Failed to create product";
            });

        // ------updateProduct------
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.isError = false;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Failed to update product";
            });


        // ------Delete product------

        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.isError = false;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload.id || action.payload._id;

                if (Array.isArray(state.products)) {
                    state.products = state.products.filter(p => p._id !== deletedId);
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Failed to delete product";
            })
    },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
