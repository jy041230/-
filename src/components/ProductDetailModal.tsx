import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Clock, 
  Droplet, 
  Thermometer, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  Play, 
  Pause, 
  RotateCcw,
  Check,
  MessageCircle,
  Gift
} from 'lucide-react';
import { TeaProduct, TeaReview } from '../data/teaProducts';

interface ProductDetailModalProps {
  product: TeaProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: TeaProduct) => void;
  onAddToCart: (product: TeaProduct, quantity: number, packaging: string) => void;
  onBuyNow: (product: TeaProduct, quantity: number, packaging: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow
}) => {
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedPackaging, setSelectedPackaging] = useState(product?.packagingOptions?.[0] || '기본 포장');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'brewing' | 'reviews'>('info');

  // Interactive 3-minute brewing timer simulation
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  // Reviews state with new review input
  const [reviewsList, setReviewsList] = useState<TeaReview[]>(product?.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedPackaging(product.packagingOptions[0] || '기본 포장');
      setQuantity(1);
      setTimerSeconds(180);
      setIsTimerRunning(false);
      setIsTimerFinished(false);
      setReviewsList(product.reviews);
      setActiveTab('info');
    }
  }, [product]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setIsTimerFinished(true);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen || !product) return null;

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewContent.trim()) return;

    const newRev: TeaReview = {
      id: `rev-user-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: '2026.10.16',
      content: newReviewContent.trim(),
      flowerTeaName: product.name,
      helpfulCount: 0,
      tags: ['실구매자', '포토리뷰']
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewContent('');
    setShowReviewForm(false);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const calculateTotalPrice = () => {
    let extra = 0;
    if (selectedPackaging.includes('+2,000원')) extra = 2000;
    if (selectedPackaging.includes('+4,000원')) extra = 4000;
    if (selectedPackaging.includes('+5,000원')) extra = 5000;
    return (product.price + extra) * quantity;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E3D9CD] overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Sticky Header with Close button */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-b border-[#E7DFD5] flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#8E5A44] bg-[#F2E8DF] px-2.5 py-1 rounded-full">
              {product.flowerType}
            </span>
            <span className="text-xs text-[#8C7A70] hidden sm:inline">
              {product.origin}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#6D5D53] hover:text-[#2A2320] hover:bg-[#F0EAE1] rounded-full transition relative"
              title="링크 복사"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-7 right-0 text-[10px] bg-black text-white px-2 py-0.5 rounded shadow whitespace-nowrap">
                  링크가 복사되었습니다!
                </span>
              )}
            </button>
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2 rounded-full transition ${
                isWishlisted 
                  ? 'text-[#BE123C] bg-red-50' 
                  : 'text-[#6D5D53] hover:text-[#BE123C] hover:bg-[#F0EAE1]'
              }`}
              title="찜하기"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#6D5D53] hover:text-[#2A2320] hover:bg-[#F0EAE1] rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-8">
          {/* Top Product Hero (Images + Buy Info) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Image Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F2ECE3] border border-[#E7DFD5] shadow-xs">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Liquor Color Visual badge in corner */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 border border-black/5">
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                    style={{ backgroundColor: product.liquorColor.hex }}
                  />
                  <div className="text-left">
                    <p className="text-[10px] text-[#7A6A61] leading-none">찻잔의 수색</p>
                    <p className="text-xs font-semibold text-[#2F2622] leading-none mt-0.5">{product.liquorColor.name}</p>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              {product.detailImages.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.detailImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        selectedImage === img ? 'border-[#8E5A44]' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="썸네일" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Product Overview & Buy Config */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-[#8C7A70]">
                    리뷰 {reviewsList.length}개
                  </span>
                  {product.caffeineFree && (
                    <span className="text-[11px] font-medium text-[#4D6541] bg-[#EBF3E8] px-2 py-0.5 rounded-md">
                      카페인 Free
                    </span>
                  )}
                </div>

                <h1 className="font-serif-kr text-2xl sm:text-3xl font-bold text-[#27201D] leading-snug">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#78665B] mt-1 font-light">
                  {product.koreanSubtitle}
                </p>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-3 py-2 border-y border-[#EBE3D7]">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8E5A44]">
                  {product.price.toLocaleString()}원
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9C8B81] line-through">
                    {product.originalPrice.toLocaleString()}원
                  </span>
                )}
                <span className="text-xs text-[#8E5A44] font-medium ml-auto">
                  50,000원 이상 무료배송
                </span>
              </div>

              {/* Quick specs pill row */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#F5EFE6] p-3 rounded-xl text-[#5C4C42]">
                <div>
                  <span className="text-[#8E7E73] block text-[11px]">용량/구성</span>
                  <span className="font-medium text-[#2C241F]">{product.capacity}</span>
                </div>
                <div>
                  <span className="text-[#8E7E73] block text-[11px]">우림 권장</span>
                  <span className="font-medium text-[#2C241F]">{product.brewing.waterTemp} / {product.brewing.steepTime}</span>
                </div>
              </div>

              {/* Packaging Options */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#342923] flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#8E5A44]" />
                  <span>패키지 및 선물 포장 선택</span>
                </label>
                <div className="space-y-1.5">
                  {product.packagingOptions.map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                        selectedPackaging === opt 
                          ? 'border-[#8E5A44] bg-[#F7F1EA] font-semibold text-[#281F1A]' 
                          : 'border-[#E4D9CD] bg-white text-[#5F5046] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="packaging"
                          checked={selectedPackaging === opt}
                          onChange={() => setSelectedPackaging(opt)}
                          className="accent-[#8E5A44]"
                        />
                        <span>{opt}</span>
                      </div>
                      {opt.includes('보자기') && (
                        <span className="text-[10px] text-[#8E5A44] font-normal">
                          노리개 매듭 동봉
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantity selector & Total */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center border border-[#D9CFC3] rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm text-[#58483F] hover:bg-[#F2ECE3] transition"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-sm font-semibold text-[#281F1A] min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm text-[#58483F] hover:bg-[#F2ECE3] transition"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#88786F] block">총 주문 금액</span>
                  <span className="font-serif text-2xl font-bold text-[#2A2320]">
                    {calculateTotalPrice().toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* Purchase Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onAddToCart(product, quantity, selectedPackaging)}
                  className="py-3.5 px-4 bg-[#F2EAE0] hover:bg-[#E8DCCF] text-[#4A3B31] border border-[#D4C3B2] rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>장바구니 담기</span>
                </button>
                <button
                  onClick={() => onBuyNow(product, quantity, selectedPackaging)}
                  className="py-3.5 px-4 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>바로 구매하기</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation for Detailed Content */}
          <div className="border-t border-[#E8DEC0] pt-6">
            <div className="flex border-b border-[#E3D8CB] space-x-6 text-sm font-medium">
              <button
                onClick={() => setActiveTab('info')}
                className={`pb-3 transition-colors relative ${
                  activeTab === 'info' 
                    ? 'text-[#8E5A44] font-bold border-b-2 border-[#8E5A44]' 
                    : 'text-[#6F6056] hover:text-[#261E1A]'
                }`}
              >
                향미 노트 & 효능
              </button>
              <button
                onClick={() => setActiveTab('brewing')}
                className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
                  activeTab === 'brewing' 
                    ? 'text-[#8E5A44] font-bold border-b-2 border-[#8E5A44]' 
                    : 'text-[#6F6056] hover:text-[#261E1A]'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>3분 꽃차 피우기 타이머</span>
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
                  activeTab === 'reviews' 
                    ? 'text-[#8E5A44] font-bold border-b-2 border-[#8E5A44]' 
                    : 'text-[#6F6056] hover:text-[#261E1A]'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>고객 리뷰 ({reviewsList.length})</span>
              </button>
            </div>

            {/* Tab 1: Flavor & Scent Notes */}
            {activeTab === 'info' && (
              <div className="pt-6 space-y-6">
                {/* Scent & Flavor Profiles */}
                <div className="bg-white p-6 rounded-2xl border border-[#E7DFD5] shadow-xs space-y-5">
                  <h4 className="font-serif-kr text-base font-bold text-[#2A2320] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8E5A44]" />
                    <span>향미 프로필 (Aroma & Taste Spectrum)</span>
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <div className="flex justify-between text-xs text-[#6F5F55] mb-1">
                        <span>단맛 (Sweetness)</span>
                        <span className="font-bold">{product.scentProfile.sweetness} / 5</span>
                      </div>
                      <div className="w-full bg-[#EAE2D8] h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#D97706] h-full rounded-full" 
                          style={{ width: `${(product.scentProfile.sweetness / 5) * 100}%` }} 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-[#6F5F55] mb-1">
                        <span>아로마 (Aroma)</span>
                        <span className="font-bold">{product.scentProfile.aroma} / 5</span>
                      </div>
                      <div className="w-full bg-[#EAE2D8] h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#8E5A44] h-full rounded-full" 
                          style={{ width: `${(product.scentProfile.aroma / 5) * 100}%` }} 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-[#6F5F55] mb-1">
                        <span>바디감 (Body)</span>
                        <span className="font-bold">{product.scentProfile.body} / 5</span>
                      </div>
                      <div className="w-full bg-[#EAE2D8] h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#78350F] h-full rounded-full" 
                          style={{ width: `${(product.scentProfile.body / 5) * 100}%` }} 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-[#6F5F55] mb-1">
                        <span>수색 맑기 (Clarity)</span>
                        <span className="font-bold">{product.scentProfile.clarity} / 5</span>
                      </div>
                      <div className="w-full bg-[#EAE2D8] h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#059669] h-full rounded-full" 
                          style={{ width: `${(product.scentProfile.clarity / 5) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Scent notes tag bubbles */}
                  <div className="pt-2 border-t border-[#F2ECE3] flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-[#8C7A70] font-medium">테이스팅 노트:</span>
                    {product.scentProfile.notes.map((note, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-[#FAF5EE] border border-[#DECFC1] text-[#634E42] px-2.5 py-1 rounded-full font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Efficacy & Story Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#E7DFD5] space-y-3">
                    <h5 className="font-serif-kr text-sm font-bold text-[#2C241F] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#8E5A44]" />
                      <span>기대 효능 & 추천 대상</span>
                    </h5>
                    <div className="space-y-1.5">
                      {product.effects.map((eff, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#5D4E44]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8E5A44]" />
                          <span>{eff}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#8E7E73] pt-2 border-t border-[#F2ECE3]">
                      * 본 제품은 천연 꽃을 건조한 다류 식품으로 의약품이 아닙니다.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E7DFD5] space-y-2">
                    <h5 className="font-serif-kr text-sm font-bold text-[#2C241F]">
                      장인의 덖음 이야기
                    </h5>
                    <p className="text-xs text-[#6B5A4F] leading-relaxed">
                      {product.story}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Brewing Timer Simulator */}
            {activeTab === 'brewing' && (
              <div className="pt-6 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DECFC1] shadow-sm text-center max-w-xl mx-auto space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-[#8E5A44] uppercase tracking-widest block mb-1">
                      The 3-Minute Blooming Ritual
                    </span>
                    <h4 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#251D19]">
                      꽃이 활짝 피어나는 3분의 쉼
                    </h4>
                    <p className="text-xs sm:text-sm text-[#736358] mt-1">
                      뜨거운 물을 붓고 타이머를 시작해보세요. 찻잔 속에 꽃잎이 춤추며 피어납니다.
                    </p>
                  </div>

                  {/* Brewing Circular Visualization */}
                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    {/* Outer glowing pulsing ring */}
                    <div 
                      className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
                        isTimerRunning ? 'animate-spin-slow border-dashed' : 'border-solid'
                      }`}
                      style={{ borderColor: product.liquorColor.hex }}
                    />
                    
                    {/* Inner color wash representing tea extraction */}
                    <div 
                      className="w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-700 shadow-inner"
                      style={{ 
                        backgroundColor: `${product.liquorColor.hex}${isTimerRunning ? '44' : '22'}` 
                      }}
                    >
                      <span className="font-serif text-3xl font-bold text-[#2A2320]">
                        {formatTimer(timerSeconds)}
                      </span>
                      <span className="text-[11px] text-[#7A6B62] mt-0.5">
                        {isTimerFinished ? '🎉 만개 완료!' : isTimerRunning ? '우러나는 중...' : '준비 완료'}
                      </span>
                    </div>
                  </div>

                  {/* Timer Controls */}
                  <div className="flex items-center justify-center gap-3">
                    {!isTimerRunning ? (
                      <button
                        onClick={() => {
                          if (timerSeconds === 0) setTimerSeconds(180);
                          setIsTimerRunning(true);
                          setIsTimerFinished(false);
                        }}
                        className="px-6 py-2.5 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-full text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>타이머 시작</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsTimerRunning(false)}
                        className="px-6 py-2.5 bg-[#B45309] hover:bg-[#92400E] text-white rounded-full text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition"
                      >
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>일시 정지</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(180);
                        setIsTimerFinished(false);
                      }}
                      className="p-2.5 bg-[#F2ECE3] hover:bg-[#E5DCD0] text-[#55453C] rounded-full text-xs transition cursor-pointer"
                      title="타이머 초기화"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Steeping step cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-4 border-t border-[#F0E8DC]">
                    <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E9DFD2]">
                      <span className="text-[10px] font-bold text-[#8E5A44] block">STEP 1</span>
                      <p className="text-xs font-semibold text-[#29221E] mt-0.5">물 온도: {product.brewing.waterTemp}</p>
                      <p className="text-[11px] text-[#7A6A61] mt-1">꽃송이를 다기에 담고 뜨거운 물을 붓습니다.</p>
                    </div>
                    <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E9DFD2]">
                      <span className="text-[10px] font-bold text-[#8E5A44] block">STEP 2</span>
                      <p className="text-xs font-semibold text-[#29221E] mt-0.5">우림 시간: {product.brewing.steepTime}</p>
                      <p className="text-[11px] text-[#7A6A61] mt-1">꽃잎이 서서히 만개하며 수색이 짙어집니다.</p>
                    </div>
                    <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E9DFD2]">
                      <span className="text-[10px] font-bold text-[#8E5A44] block">STEP 3</span>
                      <p className="text-xs font-semibold text-[#29221E] mt-0.5">재우림 3회 가능</p>
                      <p className="text-[11px] text-[#7A6A61] mt-1">{product.brewing.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="pt-6 space-y-6">
                {/* Review Header & Write CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E7DFD5]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-3xl font-bold text-[#2A2320]">
                        {product.rating}
                      </span>
                      <div className="flex text-amber-500">
                        {'★'.repeat(5)}
                      </div>
                      <span className="text-xs text-[#8C7A70]">
                        (실제 구매 고객 만족도 99.4%)
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6B62] mt-0.5">
                      화담의 꽃차를 경험하신 소중한 분들의 진솔한 이야기입니다.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-5 py-2.5 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
                  >
                    {showReviewForm ? '작성 취소' : '후기 작성하기'}
                  </button>
                </div>

                {/* Write Review Form */}
                {showReviewForm && (
                  <form 
                    onSubmit={handleAddReview}
                    className="bg-[#FAF5ED] p-5 rounded-2xl border border-[#DECFC1] space-y-4 animate-fadeIn"
                  >
                    <h5 className="font-serif-kr text-sm font-bold text-[#2A2320]">
                      솔직한 꽃차 후기를 남겨주세요
                    </h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-[#635349] block mb-1">작성자 닉네임</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="예: 지리산다람쥐"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#D9CFC3] bg-white focus:outline-none focus:border-[#8E5A44]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#635349] block mb-1">별점</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full text-xs p-2.5 rounded-lg border border-[#D9CFC3] bg-white focus:outline-none focus:border-[#8E5A44]"
                        >
                          <option value={5}>★★★★★ (5점 - 최고예요)</option>
                          <option value={4}>★★★★☆ (4점 - 만족해요)</option>
                          <option value={3}>★★★☆☆ (3점 - 보통이에요)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-[#635349] block mb-1">후기 내용 (향, 맛, 수색 등)</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewContent}
                        onChange={(e) => setNewReviewContent(e.target.value)}
                        placeholder="꽃차를 우리며 느꼈던 향기와 힐링의 순간을 나눠주세요."
                        className="w-full text-xs p-2.5 rounded-lg border border-[#D9CFC3] bg-white focus:outline-none focus:border-[#8E5A44]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#8E5A44] text-white rounded-xl text-xs font-semibold hover:bg-[#784632] transition"
                    >
                      리뷰 등록하기 (포인트 500P 지급)
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviewsList.map((rev) => (
                    <div 
                      key={rev.id} 
                      className="bg-white p-5 rounded-2xl border border-[#E7DFD5] space-y-2.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#2F2621]">{rev.author}</span>
                          <div className="flex text-amber-500 text-xs">
                            {'★'.repeat(rev.rating)}
                          </div>
                        </div>
                        <span className="text-[11px] text-[#9A8B81]">{rev.date}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#5C4C42] leading-relaxed">
                        {rev.content}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex gap-1.5">
                          {rev.tags?.map((t, i) => (
                            <span key={i} className="text-[10px] bg-[#FAF5EE] text-[#8E5A44] px-2 py-0.5 rounded font-medium">
                              #{t}
                            </span>
                          ))}
                        </div>
                        <span className="text-[11px] text-[#8E7E74]">
                          도움됨 {rev.helpfulCount}명
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
