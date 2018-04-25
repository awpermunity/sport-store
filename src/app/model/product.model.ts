export interface Product {

    id?: number;
    groupID?: number;
    name?: string;
    price: number;
    details: {
        category: string;
        brand: string;
        size?: string;
    }
    description: string;
    imgsPaths: Array<string>;
    offers: Array<any>;
}