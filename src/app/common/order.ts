export class Order {

    order_id: number;
    orderTrackingNumber: string;
    totalPrice: number;
    totalQuantity: number;
    customer_id: number;
    shippingAddress_id: string;
    status: string;
    dateCreated: Date;
    payment: string;
}
