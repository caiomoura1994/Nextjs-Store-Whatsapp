export interface ICategory {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    store: number;
    products?: IProduct[];
}

export interface IProduct {
    id: number;
    price: string;
    name: string;
    is_active: boolean;
    description: string;
    photo: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
    store: number;
    categories: number[] & ICategory[];
}

export interface IOrder {
    id: number;
    store: number;
    order_details: any;
    total: number;
    status: string;
    address: string;
    client_name: string;
    phone: string;
}

export interface IAditional {
    id: number;
    description: string;
    price: number;
}

export interface IAddress {
    id: number;
    zip_code: string;
    public_place: string;
    neighborhood: string;
    number: string;
    complement: string;
    city: string;
    country: string;
    store: number;
}

export interface IOpeninghour {
    id: number;
    start_hour: string;
    end_hour: string;
    day_of_week: string;
    store: number;
}

export interface IStore {
    id: number;
    categories: ICategory[];
    products?: IProduct[];
    address: IAddress;
    openinghours: IOpeninghour[];
    establishment_name: string;
    description: string;
    photo: string;
    is_active: boolean;
    can_pick_up_in_store: boolean;
    delivery: boolean;
    phone_number: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
}
