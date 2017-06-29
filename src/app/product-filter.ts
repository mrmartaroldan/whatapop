type sellingState = 'selling' | 'sold';
export interface ProductFilter {
    text?: string;
    category?: string;
    state?: sellingState;
    priceMin?: string;
    priceMax?: string;
    order?: string;
    name?: string;
}
