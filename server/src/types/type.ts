export type ProductData = {
  name: string;
  price: number;
  image?: string | null;
};

export type ProductId = string;
export type Quantity = number;

export type ShoppingCartData = {
  productId: ProductId;
  quantity: Quantity;
};

interface BaseCoupon {
  name: string;
  expiresAt: string;
}

export interface FixedAmountCoupon extends BaseCoupon {
  code: 'FIXED5000';
  discountAmount: number;
  minOrderAmount: number;
}

export interface BogoCoupon extends BaseCoupon {
  code: 'BOGO';
  minCount: number;
  freeCount: number;
}

export interface FreeShippingCoupon extends BaseCoupon {
  code: 'FREESHIPPING';
  minOrderAmount: number;
  discountAmount: number;
  remoteAreaFee: number;
}

export interface PercentageCoupon extends BaseCoupon {
  code: 'MIRACLESALE';
  discountRate: number;
  startTime: string;
  endTime: string;
}

export type Coupon =
  | FixedAmountCoupon
  | BogoCoupon
  | FreeShippingCoupon
  | PercentageCoupon;

export type CouponWithState = Coupon & {
  isSelected: boolean;
  isDisabled: boolean;
};
