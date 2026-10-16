import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { TeaProduct } from '../data/teaProducts';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: TeaProduct[];
  onRemoveWishlist: (product: TeaProduct) => void;
  onAddToCart: (product: TeaProduct) => void;
  onOpenDetail: (product: TeaProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onAddToCart,
  onOpenDetail
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DACD] animate-slideInRight">
        {/* Header */}
        <div className="p-5 bg-[#F2ECE3] border-b border-[#E3D9CC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#BE123C] fill-current" />
            <h3 className="font-serif-kr text-base font-bold text-[#2A2320]">
              찜한 꽃차 목록 ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6B62] hover:text-[#2A2320] rounded-full hover:bg-[#E5DCD0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {wishlist.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F2ECE3] text-[#BE123C] flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7" />
              </div>
              <p className="font-serif-kr text-base font-medium text-[#382C25]">
                찜한 상품이 없습니다.
              </p>
              <p className="text-xs text-[#7A6B62]">
                마음에 드는 꽃차의 하트를 눌러 보관해보세요.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 bg-[#8E5A44] text-white rounded-xl text-xs font-semibold hover:bg-[#784632] transition"
              >
                꽃차 둘러보기
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-2xl border border-[#E7DFD4] shadow-xs flex gap-3 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => {
                    onClose();
                    onOpenDetail(item);
                  }}
                  className="w-16 h-16 object-cover rounded-xl shrink-0 cursor-pointer border border-[#EAE2D8]"
                />

                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      onClose();
                      onOpenDetail(item);
                    }}
                    className="font-serif-kr text-xs font-bold text-[#2A221E] truncate cursor-pointer hover:text-[#8E5A44]"
                  >
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#8C7A70] truncate mt-0.5">
                    {item.liquorColor.name} • {item.origin}
                  </p>
                  <span className="font-serif text-xs font-bold text-[#8E5A44] block mt-1">
                    {item.price.toLocaleString()}원
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="p-2 rounded-lg bg-[#FAF5EE] hover:bg-[#8E5A44] text-[#5A4B42] hover:text-white transition shadow-xs"
                    title="장바구니 담기"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(item)}
                    className="p-2 rounded-lg text-[#9C8B81] hover:text-[#BE123C] hover:bg-[#FBEBEB] transition"
                    title="찜 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F2ECE3] border-t border-[#E3D8CC]">
          <button
            onClick={onClose}
            className="w-full py-3 bg-white hover:bg-[#FAF8F5] text-[#5A4B42] border border-[#D9CEBF] rounded-xl text-xs font-semibold transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
