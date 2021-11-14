import { IProduct, IAditional } from "./store";

export interface IItemProduct extends IProduct {
    itemProduct: any;
    quantity: number;
    checkedAditionals: IAditional[];
    selectedFlavors: IProduct[];
    subTotalValue: number;
}
