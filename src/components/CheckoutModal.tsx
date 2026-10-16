import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Gift, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../data/teaProducts';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderId, setOrderId] = useState('');

  // Form State
  const [buyerName, setBuyerName] = useState('이지연');
  const [buyerPhone, setBuyerPhone] = useState('010-9876-5432');
  const [recipientName, setRecipientName] = useState('김영희');
  const [recipientPhone, setRecipientPhone] = useState('010-1234-5678');
  const [address, setAddress] = useState('서울특별시 종로구 인사동길 44');
  const [detailAddress, setDetailAddress] = useState('화담정 2층');
  const [shippingMemo, setShippingMemo] = useState('배송 전 미리 연락 바랍니다. (파손주의)');
  const [selectedPayment, setSelectedPayment] = useState<'kakaopay' | 'naverpay' | 'toss' | 'card'>('kakaopay');
  const [giftCardText, setGiftCardText] = useState('항상 따스한 온기를 전해주셔서 감사합니다. 건강하세요.');

  if (!isOpen) return null;

  // Calculation
  const subtotal = items.reduce((acc, item) => {
    let extra = 0;
    if (item.selectedPackaging.includes('+2,000원')) extra = 2000;
    if (item.selectedPackaging.includes('+4,000원')) extra = 4000;
    if (item.selectedPackaging.includes('+5,000원')) extra = 5000;
    return acc + (item.product.price + extra) * item.quantity;
  }, 0);

  const shippingFee = subtotal >= 50000 ? 0 : 3000;
  const finalTotal = subtotal + shippingFee;

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `HWD-${new Date().getFullYear()}${String(Date.now()).slice(-6)}`;
    setOrderId(newOrderId);
    setStep('success');

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  const handleFinish = () => {
    onOrderSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#DECFC1] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#F2ECE3] border-b border-[#E3D8CC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8E5A44]" />
            <h3 className="font-serif-kr text-base font-bold text-[#2A2320]">
              {step === 'form' ? '화담 안전 주문 및 결제' : '주문 완료 및 결제 확인'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#73645A] hover:text-[#2A2320] rounded-full hover:bg-[#E5DCD0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7">
          {step === 'form' ? (
            <form onSubmit={handleProcessOrder} className="space-y-6">
              {/* Order items preview summary */}
              <div className="bg-white p-4 rounded-2xl border border-[#E7DFD4] space-y-2">
                <span className="text-xs font-bold text-[#8E5A44] uppercase tracking-wider block">
                  주문 상품 ({items.length}종)
                </span>
                <div className="divide-y divide-[#F2ECE3] max-h-36 overflow-y-auto pr-1">
                  {items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <div className="truncate mr-2">
                        <p className="font-semibold text-[#2F2520] truncate">{item.product.name}</p>
                        <p className="text-[11px] text-[#8C7A70]">{item.selectedPackaging} x {item.quantity}개</p>
                      </div>
                      <span className="font-bold text-[#2A221E] shrink-0">
                        {((item.product.price + (item.selectedPackaging.includes('+5,000') ? 5000 : 0)) * item.quantity).toLocaleString()}원
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery info */}
              <div className="bg-white p-5 rounded-2xl border border-[#E7DFD4] space-y-3">
                <h4 className="font-serif-kr text-sm font-bold text-[#29221E] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#8E5A44]" />
                  <span>배송지 정보</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#6B5A50] block mb-1">받는 분 성함</label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] focus:outline-none focus:border-[#8E5A44] bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#6B5A50] block mb-1">받는 분 연락처</label>
                    <input
                      type="tel"
                      required
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] focus:outline-none focus:border-[#8E5A44] bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#6B5A50] block mb-1">기본 주소</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] focus:outline-none focus:border-[#8E5A44] bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#6B5A50] block mb-1">상세 주소</label>
                  <input
                    type="text"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] focus:outline-none focus:border-[#8E5A44] bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#6B5A50] block mb-1">배송 요청사항</label>
                  <input
                    type="text"
                    value={shippingMemo}
                    onChange={(e) => setShippingMemo(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] focus:outline-none focus:border-[#8E5A44] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              {/* Gift Message Card option */}
              <div className="bg-white p-5 rounded-2xl border border-[#E7DFD4] space-y-2">
                <h4 className="font-serif-kr text-sm font-bold text-[#29221E] flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-[#8E5A44]" />
                  <span>동봉할 캘리그라피 감사 엽서 문구</span>
                </h4>
                <textarea
                  rows={2}
                  value={giftCardText}
                  onChange={(e) => setGiftCardText(e.target.value)}
                  placeholder="선물 포장 상자에 정성스레 동봉할 문구를 적어주세요."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] focus:outline-none focus:border-[#8E5A44] bg-[#FAF8F5]"
                />
              </div>

              {/* Payment Methods */}
              <div className="bg-white p-5 rounded-2xl border border-[#E7DFD4] space-y-3">
                <h4 className="font-serif-kr text-sm font-bold text-[#29221E] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#8E5A44]" />
                  <span>결제 수단 선택</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('kakaopay')}
                    className={`p-3 rounded-xl border text-center transition font-semibold text-xs flex flex-col items-center gap-1 ${
                      selectedPayment === 'kakaopay' 
                        ? 'border-[#FEE500] bg-[#FEE500]/20 text-[#3C1E1E]' 
                        : 'border-[#E5DACD] bg-[#FAF8F5] text-[#695A50]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-[#FEE500] text-[#3C1E1E] flex items-center justify-center font-black text-[10px]">K</span>
                    <span>카카오페이</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('naverpay')}
                    className={`p-3 rounded-xl border text-center transition font-semibold text-xs flex flex-col items-center gap-1 ${
                      selectedPayment === 'naverpay' 
                        ? 'border-[#03C75A] bg-[#03C75A]/15 text-[#03C75A]' 
                        : 'border-[#E5DACD] bg-[#FAF8F5] text-[#695A50]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-[#03C75A] text-white flex items-center justify-center font-black text-[10px]">N</span>
                    <span>네이버페이</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('toss')}
                    className={`p-3 rounded-xl border text-center transition font-semibold text-xs flex flex-col items-center gap-1 ${
                      selectedPayment === 'toss' 
                        ? 'border-[#0064FF] bg-[#0064FF]/15 text-[#0064FF]' 
                        : 'border-[#E5DACD] bg-[#FAF8F5] text-[#695A50]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-[#0064FF] text-white flex items-center justify-center font-black text-[10px]">T</span>
                    <span>토스페이</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('card')}
                    className={`p-3 rounded-xl border text-center transition font-semibold text-xs flex flex-col items-center gap-1 ${
                      selectedPayment === 'card' 
                        ? 'border-[#8E5A44] bg-[#8E5A44]/15 text-[#8E5A44]' 
                        : 'border-[#E5DACD] bg-[#FAF8F5] text-[#695A50]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>신용카드</span>
                  </button>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-2xl text-base font-bold shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{finalTotal.toLocaleString()}원 결제하기</span>
                </button>
                <div className="flex items-center justify-center gap-1 text-[11px] text-[#8C7A70] mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8E5A44]" />
                  <span>256-bit SSL 안전 암호화 결제 시스템 적용</span>
                </div>
              </div>
            </form>
          ) : (
            /* Order Success View */
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#8E5A44] uppercase tracking-wider">
                  Payment Completed
                </span>
                <h4 className="text-2xl font-serif-kr font-bold text-[#2A2320]">
                  꽃차 주문이 정성스레 접수되었습니다
                </h4>
                <p className="text-xs text-[#736358]">
                  화담의 장인이 가장 맑은 꽃송이를 골라 정갈하게 포장하여 보내드립니다.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#DECFC1] text-left text-xs space-y-3 shadow-xs max-w-lg mx-auto">
                <div className="flex justify-between pb-2 border-b border-[#F0E8DD]">
                  <span className="text-[#8C7A70]">주문 번호</span>
                  <span className="font-mono font-bold text-[#29221E]">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A70]">받는 분</span>
                  <span className="font-medium text-[#29221E]">{recipientName} ({recipientPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A70]">배송 주소</span>
                  <span className="font-medium text-[#29221E] text-right truncate max-w-[240px]">{address} {detailAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A70]">결제 수단</span>
                  <span className="font-medium text-[#29221E]">
                    {selectedPayment === 'kakaopay' ? '카카오페이 간편결제' : 
                     selectedPayment === 'naverpay' ? '네이버페이' : 
                     selectedPayment === 'toss' ? '토스페이' : '신용카드 결제'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F0E8DD] font-bold text-sm text-[#2A2320]">
                  <span>총 결제 금액</span>
                  <span className="font-serif text-lg text-[#8E5A44]">
                    {finalTotal.toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleFinish}
                  className="px-8 py-3 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-xl text-sm font-semibold transition shadow-md cursor-pointer"
                >
                  쇼핑 계속하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
