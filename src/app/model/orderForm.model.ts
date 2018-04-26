export class OrderForm {
    id: any = '';
    selectedProducts: Array<SelectedProduct> = [];
    personal: {
        firstname: string;
        lastname: string;
        address: {
            street: string;
            postcode: string;
            city: string;
            country: string;
        }
        company: string;
        phone: string;
        email: string;
        spam: boolean;
        term: boolean;
    }
    delivery: {
        method: string;
        type: string;
        payment: string;
    }
}

export interface SelectedProduct {
    id: number;
    uniqueName: string;
    name: string;
    price: number;
    availableQuantity: number;
    img: string;
    selectedOptions: {
        size: string;
        quantity: number;
    }
}

export interface Personal {
    firstname: string;
    lastname: string;
    address: {
        street: string;
        postcode: string;
        city: string;
        country: string;
    }
    company: string;
    phone: string;
    email: string;
    spam: boolean;
    term: boolean;
}

export interface Delivery {
    method: string;
    type: string;
    payment: string;
}