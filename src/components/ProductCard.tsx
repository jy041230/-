import React from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { TeaProduct } from '../data/teaProducts';

interface ProductCardProps {
  product: TeaProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: TeaProduct) => void;
  onQuickAddToCart: (product: TeaProduct) => void;
  onOpenDetail: (product: TeaProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAddToCart,
  onOpenDetail
}) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-[#E8DEC0]/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Top Image Container */}
      <div 
        className="relative aspect-square w-full overflow-hidden bg-[#F6F2EB] cursor-pointer"
        onClick={() => onOpenDetail(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-tight text-white bg-[#8E5A44]/95 shadow-xs backdrop-blur-xs">
              {product.badge}
            </span>
          )}
          {product.caffeineFree && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-[#46382F] bg-white/90 shadow-xs border border-black/5">
              카페인 Free
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs z-10 ${
            isWishlisted 
              ? 'bg-[#BE123C] text-white hover:bg-[#9F1239]' 
              : 'bg-white/85 text-[#5C4D43] hover:text-[#BE123C] hover:bg-white'
          }`}
          aria-label={isWishlisted ? '찜 해제' : '찜하기'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Liquor Color Swatch Floating Pill */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-[#42342D] shadow-xs flex items-center gap-1.5 border border-black/5">
          <span 
            className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-xs shrink-0" 
            style={{ backgroundColor: product.liquorColor.hex }}
          />
          <span className="truncate max-w-[120px]">{product.liquorColor.name}</span>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/95 text-[#2C241F] rounded-full text-xs font-semibold shadow-md backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5" />
            <span>상세보기 & 다도법</span>
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Rating & Flower category */}
          <div className="flex items-center justify-between text-xs text-[#8A796F]">
            <span className="text-[11px] font-medium text-[#8E5A44]">{product.flowerType}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-[#2F2722]">{product.rating}</span>
              <span className="text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetail(product)}
            className="font-serif-kr text-base sm:text-lg font-bold text-[#2A2320] group-hover:text-[#8E5A44] transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle / Poetic note */}
          <p className="text-xs text-[#7A6A61] line-clamp-1 font-light">
            {product.koreanSubtitle}
          </p>
        </div>

        {/* Efficacy Tags */}
        <div className="flex flex-wrap gap-1">
          {product.effects.slice(0, 2).map((eff, i) => (
            <span 
              key={i} 
              className="text-[10px] bg-[#FAF5EE] text-[#705F55] px-1.5 py-0.5 rounded border border-[#EAE1D3]"
            >
              #{eff}
            </span>
          ))}
        </div>

        {/* Price and Cart Action */}
        <div className="pt-2 border-t border-[#F0E8DC] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-bold text-[#29221E]">
                {product.price.toLocaleString()}원
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#9E8E84] line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#8C7A70] block">
              {product.capacity}
            </span>
          </div>

          <button
            onClick={() => onQuickAddToCart(product)}
            className="p-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#8E5A44] text-[#5A4B42] hover:text-white transition-all shadow-xs flex items-center justify-center cursor-pointer"
            title="장바구니 담기"
            aria-label="장바구니 담기"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
