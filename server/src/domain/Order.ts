import type { OrderData, OrderProduct } from '../types/type.ts';

export default class Order {
  private id: string = crypto.randomUUID();
  private orderProducts: OrderProduct[] = [];
  private isRemoteArea: boolean = false;
  private orderAmount: number = 0;
  private discountAmount: number = 0;
  private shippingFee: number = 0;
  private totalAmount: number = 0;

  createOrder(products: OrderProduct[]) {
    this.orderProducts = products;
    this.#calculateOrderAmount(this.orderProducts);
    this.#calculateShippingFee();
  }

  #calculateOrderAmount(orderProducts: OrderProduct[]) {
    this.orderAmount = orderProducts.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  #calculateShippingFee() {
    this.shippingFee = this.orderAmount >= 100000 ? 0 : 3000;
    this.shippingFee += this.isRemoteArea ? 3000 : 0;
  }

  setAmount(discountAmount: number, totalAmount: number) {
    this.discountAmount = discountAmount;
    this.totalAmount = totalAmount;
  }

  setRemoteArea(isRemoteArea: boolean) {
    this.isRemoteArea = isRemoteArea;
    this.#calculateShippingFee();
  }

  getId() {
    return this.id;
  }

  getOrderData() {
    return { products: this.orderProducts, isRemoteArea: this.isRemoteArea };
  }

  getOrder(): OrderData {
    return {
      id: this.id,
      products: this.orderProducts,
      isRemoteArea: this.isRemoteArea,
      amount: {
        orderAmount: this.orderAmount,
        discountAmount: this.discountAmount,
        shippingFee: this.shippingFee,
        totalAmount: this.totalAmount,
      },
    };
  }
}
