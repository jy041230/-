import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  Gift, 
  Coffee, 
  Compass,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: 'all' | 'single' | 'blend' | 'gift' | 'teaware') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  onScrollToSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notice Banner */}
      {showBanner && (
        <div className="bg-[#8E5A44] text-[#FDFBF7] text-xs py-2 px-4 flex items-center justify-between tracking-wide font-medium">
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E5B582] animate-pulse" />
            <span>
              첫 구매 전용 <strong>10% 웰컴 쿠폰</strong> 증정 & 50,000원 이상 <strong>전국 무료배송 & 실크 보자기 포장</strong>
            </span>
            <button 
              onClick={() => onScrollToSection('gift-section')}
              className="hidden sm:inline-flex items-center text-[11px] underline ml-1 hover:text-[#E8D9CD]"
            >
              선물 포장 보기 <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="text-[#E8D9CD] hover:text-white p-0.5 rounded transition"
            aria-label="공지 닫기"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-[#E7DFD5] shadow-xs' 
          : 'bg-[#FAF8F5] border-[#ECE5DC]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#4A3E38] hover:text-[#201A17] transition"
                aria-label="메뉴 열기"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Left Nav (Desktop) */}
            <div className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#5A4E46]">
              <button 
                onClick={() => {
                  onSelectCategory('all');
                  onScrollToSection('products-section');
                }}
                className={`transition hover:text-[#8E5A44] py-1 ${activeCategory === 'all' ? 'text-[#8E5A44] font-semibold' : ''}`}
              >
                꽃차 컬렉션
              </button>
              <button 
                onClick={() => {
                  onSelectCategory('single');
                  onScrollToSection('products-section');
                }}
                className={`transition hover:text-[#8E5A44] py-1 ${activeCategory === 'single' ? 'text-[#8E5A44] font-semibold' : ''}`}
              >
                단품 꽃차
              </button>
              <button 
                onClick={() => {
                  onSelectCategory('gift');
                  onScrollToSection('products-section');
                }}
                className={`transition hover:text-[#8E5A44] py-1 ${activeCategory === 'gift' ? 'text-[#8E5A44] font-semibold' : ''}`}
              >
                보자기 선물세트
              </button>
              <button 
                onClick={() => onScrollToSection('brewing-ritual')}
                className="transition hover:text-[#8E5A44] py-1"
              >
                다도 가이드
              </button>
              <button 
                onClick={() => onScrollToSection('brand-story')}
                className="transition hover:text-[#8E5A44] py-1"
              >
                덖음 스토리
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex flex-col items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-serif-kr tracking-widest font-bold text-[#2A2320] group-hover:text-[#8E5A44] transition-colors">
                  花 談
                </span>
                <span className="text-base sm:text-lg font-serif-kr text-[#8E5A44] font-medium tracking-tight">
                  화담
                </span>
              </div>
              <span className="text-[10px] tracking-[0.28em] text-[#8C7A70] font-light -mt-0.5 uppercase">
                Artisanal Flower Tea
              </span>
            </div>

            {/* Right Nav & Utilities */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Tea Finder Quiz Button */}
              <button
                onClick={onOpenQuiz}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#734330] bg-[#F2E8DF] hover:bg-[#EADBCF] transition shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8E5A44]" />
                <span>나만의 꽃차 찾기</span>
              </button>

              {/* Search Toggle */}
              <div className="relative">
                {isSearchOpen ? (
                  <div className="flex items-center bg-white border border-[#D9CEBF] rounded-full px-3 py-1.5 shadow-xs w-48 sm:w-64 transition-all">
                    <Search className="w-4 h-4 text-[#8C7A70] mr-2 shrink-0" />
                    <input
                      type="text"
                      placeholder="꽃차 이름, 효능(목련, 눈건강...)"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none text-[#2C2724] placeholder:text-[#A8988C]"
                      autoFocus
                    />
                    <button 
                      onClick={() => {
                        setIsSearchOpen(false);
                        onSearchChange('');
                      }}
                      className="text-[#8C7A70] hover:text-[#2C2724] ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-[#4A3E38] hover:text-[#8E5A44] transition rounded-full hover:bg-[#F2ECE4]"
                    aria-label="검색 열기"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-[#4A3E38] hover:text-[#8E5A44] transition rounded-full hover:bg-[#F2ECE4]"
                aria-label="찜한 상품"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#BE123C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-[#4A3E38] hover:text-[#8E5A44] transition rounded-full hover:bg-[#F2ECE4] flex items-center gap-1.5"
                aria-label="장바구니 열기"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#8E5A44] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-t border-[#E7DFD5] px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2 text-base font-medium text-[#4A3E38]">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  onScrollToSection('products-section');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#F0EAE1]"
              >
                전체 꽃차 컬렉션
              </button>
              <button
                onClick={() => {
                  onSelectCategory('single');
                  onScrollToSection('products-section');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#F0EAE1]"
              >
                단품 꽃차 (유리병)
              </button>
              <button
                onClick={() => {
                  onSelectCategory('blend');
                  onScrollToSection('products-section');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#F0EAE1]"
              >
                블렌딩 티백 세트
              </button>
              <button
                onClick={() => {
                  onSelectCategory('gift');
                  onScrollToSection('products-section');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#F0EAE1]"
              >
                보자기 선물세트
              </button>
              <button
                onClick={() => {
                  onScrollToSection('brewing-ritual');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#F0EAE1]"
              >
                꽃차 3분 다도 가이드
              </button>
              <button
                onClick={() => {
                  onScrollToSection('brand-story');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#F0EAE1]"
              >
                전통 9증9포 덖음 스토리
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#8E5A44] text-white rounded-xl text-sm font-medium shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>나에게 맞는 꽃차 찾기 (1분 테스트)</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
