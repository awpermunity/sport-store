export interface Product {
    id?: number;
    name?: string;
    price: number;
    details: {
        category: string;
        brand: string;
        size?: string;
    }
    description: string;
}