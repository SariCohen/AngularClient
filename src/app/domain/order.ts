import { OrderItem } from "./orderItem";

export interface order{
    orderId?:number;
    orderDate?:Date;
    orderSum?:number;
    userId?:string;
    listOrderPresent?:OrderItem[];
}