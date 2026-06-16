import type { OrderData, OrderProduct } from '../types/type.ts';

export default class Order {
  private orderProducts: OrderProduct[] = [];
  private isRemoteArea: boolean = false;
  private orderAmount: number = 0;
  private discountAmount: number = 0;
  private shippingFee: number = 0;
  private totalAmount: number = 0;

  constructor(products: OrderProduct) {
    this.orderProducts.push(products);
    this.#setOrderAmount(this.orderProducts);
    this.#setShippingFee();
  }

  #setOrderAmount(orderProducts: OrderProduct[]) {
    this.orderAmount = orderProducts.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  #setShippingFee() {
    this.shippingFee = this.orderAmount >= 100000 ? 0 : 3000;
  }

  setAmount(discountAmount: number, totalAmount: number) {
    this.discountAmount = discountAmount;
    this.totalAmount = totalAmount;
  }

  setRemoteArea(isRemoteArea: boolean) {
    this.isRemoteArea = isRemoteArea;
  }

  getOrderData() {
    return { products: this.orderProducts, isRemoteArea: this.isRemoteArea };
  }

  getOrder(): OrderData {
    return {
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
