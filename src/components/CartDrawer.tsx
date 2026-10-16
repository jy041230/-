import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Gift } from 'lucide-react';
import { CartItem } from '../data/teaProducts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  // Calculate items subtotal
  const subtotal = items.reduce((acc, item) => {
    let extra = 0;
    if (item.selectedPackaging.includes('+2,000원')) extra = 2000;
    if (item.selectedPackaging.includes('+4,000원')) extra = 4000;
    if (item.selectedPackaging.includes('+5,000원')) extra = 5000;
    return acc + (item.product.price + extra) * item.quantity;
  }, 0);

  const freeShippingThreshold = 50000;
  const shippingFee = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 3000;
  const discountAmount = Math.round(subtotal * couponDiscount);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'WELCOME10' || code === '화담10') {
      setCouponDiscount(0.10);
      setCouponSuccess('10% 웰컴 첫 구매 할인이 적용되었습니다!');
    } else if (code === 'FLOWERTEA' || code === '꽃차') {
      setCouponDiscount(0.15);
      setCouponSuccess('15% 시크릿 VIP 꽃차 할인이 적용되었습니다!');
    } else {
      setCouponError('유효하지 않은 쿠폰 코드입니다. (추천: WELCOME10)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DACD] animate-slideInRight">
        {/* Cart Header */}
        <div className="p-5 bg-[#F2ECE3] border-b border-[#E3D9CC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8E5A44]" />
            <h3 className="font-serif-kr text-base font-bold text-[#2A2320]">
              장바구니 ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6B62] hover:text-[#2A2320] rounded-full hover:bg-[#E5DCD0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#FAF5ED] px-5 py-3 border-b border-[#EAE0D3]">
          <div className="flex items-center justify-between text-xs text-[#5D4E44] mb-1.5">
            <span className="flex items-center gap-1 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#8E5A44]" />
              {subtotal >= freeShippingThreshold ? (
                <strong className="text-[#8E5A44]">전국 무료배송 혜택 적용!</strong>
              ) : (
                <>무료배송까지 <strong className="text-[#8E5A44]">{(freeShippingThreshold - subtotal).toLocaleString()}원</strong> 남음</>
              )}
            </span>
            <span className="text-[11px] text-[#8C7A70]">{freeShippingThreshold.toLocaleString()}원 기준</span>
          </div>
          <div className="w-full bg-[#E5DCD0] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#8E5A44] h-full transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F2ECE3] text-[#8E5A44] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="font-serif-kr text-base font-medium text-[#382C25]">
                장바구니가 비어 있습니다.
              </p>
              <p className="text-xs text-[#7A6B62]">
                사계절의 향기를 담은 화담의 꽃차를 담아보세요.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 bg-[#8E5A44] text-white rounded-xl text-xs font-semibold hover:bg-[#784632] transition"
              >
                꽃차 둘러보기
              </button>
            </div>
          ) : (
            items.map((item, index) => {
              let extra = 0;
              if (item.selectedPackaging.includes('+2,000원')) extra = 2000;
              if (item.selectedPackaging.includes('+4,000원')) extra = 4000;
              if (item.selectedPackaging.includes('+5,000원')) extra = 5000;
              const itemTotal = (item.product.price + extra) * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${index}`}
                  className="bg-white p-3.5 rounded-2xl border border-[#E7DFD4] shadow-xs flex gap-3 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-xl shrink-0 border border-[#EAE2D8]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif-kr text-xs font-bold text-[#2A221E] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-[#9C8B81] hover:text-[#BE123C] p-1 transition"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#8E5A44] flex items-center gap-1 mt-0.5">
                      <Gift className="w-3 h-3" />
                      <span className="truncate">{item.selectedPackaging}</span>
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2ECE3]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DECFC1] rounded-lg bg-[#FAF8F5] overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 text-xs text-[#5D4E44] hover:bg-[#EAE2D8]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#2C231E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#5D4E44] hover:bg-[#EAE2D8]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#2A221E]">
                        {itemTotal.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Coupon Code Section */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#EAE0D3] space-y-2">
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#9C8B81] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="쿠폰코드 (WELCOME10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-[#D9CEBF] bg-[#FAF8F5] focus:outline-none focus:border-[#8E5A44]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#5A493F] text-white text-xs font-semibold rounded-xl hover:bg-[#43352D] transition shrink-0"
              >
                적용
              </button>
            </form>
            {couponSuccess && <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>}
            {couponError && <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>}
          </div>
        )}

        {/* Price Summary & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 bg-[#F2ECE3] border-t border-[#E3D8CC] space-y-3">
            <div className="space-y-1.5 text-xs text-[#6F5F54]">
              <div className="flex justify-between">
                <span>상품 금액</span>
                <span>{subtotal.toLocaleString()}원</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#BE123C] font-medium">
                  <span>쿠폰 할인</span>
                  <span>-{discountAmount.toLocaleString()}원</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>배송비</span>
                <span>{shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E0D5C7] text-sm font-bold text-[#2A2320]">
                <span>최종 결제 예정 금액</span>
                <span className="font-serif text-xl text-[#8E5A44]">
                  {finalTotal.toLocaleString()}원
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
              className="w-full py-3.5 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>주문서 작성 및 결제하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
