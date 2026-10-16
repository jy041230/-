import React, { useState, useEffect, useMemo } from 'react';
import { 
  TEA_PRODUCTS, 
  TeaProduct, 
  CartItem 
} from './data/teaProducts';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TeaFinderModal } from './components/TeaFinderModal';
import { BrewingRitualSection } from './components/BrewingRitualSection';
import { BojagiGiftSection } from './components/BojagiGiftSection';
import { BrandStorySection } from './components/BrandStorySection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { 
  Filter, 
  Sparkles, 
  Layers, 
  SlidersHorizontal, 
  Check, 
  Gift, 
  Coffee, 
  GlassWater, 
  Flower2,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function App() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState<'all' | 'single' | 'blend' | 'gift' | 'teaware'>('all');
  const [activeEffect, setActiveEffect] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'popular' | 'rating' | 'priceAsc' | 'priceDesc'>('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<TeaProduct | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart & Wishlist storage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hwadam_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: TEA_PRODUCTS[0],
          quantity: 1,
          selectedPackaging: '단품 유리병'
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<TeaProduct[]>(() => {
    try {
      const saved = localStorage.getItem('hwadam_wishlist');
      return saved ? JSON.parse(saved) : [TEA_PRODUCTS[1]];
    } catch {
      return [];
    }
  });

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    try {
      localStorage.setItem('hwadam_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('hwadam_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      // ignore
    }
  }, [wishlist]);

  // Wishlist handler
  const handleToggleWishlist = (product: TeaProduct) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showToast(`'${product.name}' 찜 목록에서 삭제되었습니다.`);
    } else {
      setWishlist([...wishlist, product]);
      showToast(`'${product.name}' 찜 목록에 추가되었습니다.`);
    }
  };

  // Add to cart handlers
  const handleAddToCart = (product: TeaProduct, quantity = 1, packaging = '단품 유리병') => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedPackaging === packaging
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedPackaging: packaging }];
      }
    });
    showToast(`'${product.name}' 장바구니에 담았습니다.`);
  };

  const handleBuyNow = (product: TeaProduct, quantity = 1, packaging = '단품 유리병') => {
    handleAddToCart(product, quantity, packaging);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    showToast('장바구니 상품이 삭제되었습니다.');
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    showToast('주문이 정상적으로 접수되었습니다. 감사합니다!');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return TEA_PRODUCTS.filter(product => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Effect filter
      if (activeEffect !== 'all') {
        const matchesEffect = product.effects.some(eff => eff.includes(activeEffect));
        if (!matchesEffect) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesType = product.flowerType.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesEffects = product.effects.some(e => e.toLowerCase().includes(q));
        if (!matchesName && !matchesType && !matchesDesc && !matchesEffects) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      return 0; // recommended
    });
  }, [activeCategory, activeEffect, sortBy, searchQuery]);

  const efficacyOptions = [
    { label: '전체 효능', value: 'all' },
    { label: '#눈건강', value: '눈' },
    { label: '#호흡기/비염', value: '호흡기' },
    { label: '#숙면/안정', value: '숙면' },
    { label: '#여성건강', value: '여성' },
    { label: '#선물/상견례', value: '선물' }
  ];

  const categoryTabs = [
    { id: 'all', label: '전체 컬렉션', count: TEA_PRODUCTS.length, icon: Flower2 },
    { id: 'single', label: '시그니처 단품 꽃차', count: TEA_PRODUCTS.filter(t => t.category === 'single').length, icon: GlassWater },
    { id: 'blend', label: '간편 블렌딩 티백', count: TEA_PRODUCTS.filter(t => t.category === 'blend').length, icon: Coffee },
    { id: 'gift', label: '보자기 기프트 세트', count: TEA_PRODUCTS.filter(t => t.category === 'gift').length, icon: Gift },
    { id: 'teaware', label: '내열유리 다구/티웨어', count: TEA_PRODUCTS.filter(t => t.category === 'teaware').length, icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2724] font-sans selection:bg-[#E8D9CD]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C241F] text-white text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-slideUp border border-[#4A3D35]">
          <CheckCircle className="w-4 h-4 text-[#E5B582]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection
        onExplore={() => scrollToSection('products-section')}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Shopping Section */}
      <main id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E5A44] bg-[#F2ECE3] px-3.5 py-1 rounded-full inline-block">
            Curated Flower Tea Collection
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-kr font-bold text-[#2A2320]">
            사계절의 숨결을 담은 꽃차 컬렉션
          </h2>
          <p className="text-xs sm:text-sm text-[#73645A] leading-relaxed">
            전통 방식 그대로 덖어낸 꽃송이의 자연스러운 수색과 향기. 
            매일의 시간에 맞춰 당신만을 위한 차를 선택해보세요.
          </p>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#8E5A44] text-white shadow-md'
                    : 'bg-white text-[#635349] hover:bg-[#F2ECE3] border border-[#E7DFD4]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8E5A44]'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/25 text-white' : 'bg-[#FAF5EE] text-[#8C7A70]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters & Sorting Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-white border border-[#E8DEC0]/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Efficacy Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-[#8C7A70] font-medium mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>효능 필터:</span>
            </span>
            {efficacyOptions.map((eff) => (
              <button
                key={eff.value}
                onClick={() => setActiveEffect(eff.value)}
                className={`text-xs px-2.5 py-1 rounded-lg transition shrink-0 cursor-pointer ${
                  activeEffect === eff.value
                    ? 'bg-[#F2ECE3] text-[#8E5A44] font-bold border border-[#DECFC1]'
                    : 'text-[#6F5F54] hover:bg-[#FAF8F5]'
                }`}
              >
                {eff.label}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            <span className="text-xs text-[#8C7A70]">
              총 <strong className="text-[#2A2320] font-bold">{filteredProducts.length}</strong>개 상품
            </span>

            <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E3D9CC] rounded-xl px-3 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8E5A44]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-transparent text-[#382C24] font-medium focus:outline-none cursor-pointer"
              >
                <option value="recommended">화담 추천순</option>
                <option value="popular">리뷰 많은 순</option>
                <option value="rating">평점 높은 순</option>
                <option value="priceAsc">낮은 가격순</option>
                <option value="priceDesc">높은 가격순</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results Indicator */}
        {searchQuery && (
          <div className="mt-4 flex items-center justify-between bg-[#F2ECE3] px-4 py-2.5 rounded-xl text-xs text-[#5C4D43]">
            <span>
              <strong>'{searchQuery}'</strong> 검색 결과 ({filteredProducts.length}건)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#8E5A44] hover:underline font-semibold"
            >
              검색어 초기화
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F2ECE3] text-[#8E5A44] flex items-center justify-center mx-auto">
              <Flower2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-kr text-lg font-bold text-[#2A2320]">
              조건에 맞는 꽃차가 없습니다.
            </h3>
            <p className="text-xs text-[#7A6B62]">
              다른 카테고리나 효능 필터를 선택해보세요.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveEffect('all');
                setSearchQuery('');
              }}
              className="mt-2 px-6 py-2.5 bg-[#8E5A44] text-white text-xs font-semibold rounded-xl hover:bg-[#784632] transition"
            >
              전체 상품 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mt-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some(item => item.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickAddToCart={(prod) => handleAddToCart(prod, 1, '단품 유리병')}
                onOpenDetail={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        )}

        {/* Seasonal Recommendation Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#F0E6DC] via-[#FAF4ED] to-[#EFE6DC] rounded-3xl p-6 sm:p-10 border border-[#E3D7CB] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-[#8E5A44] bg-white/80 px-3 py-1 rounded-full border border-[#D9CDBE] inline-block">
              🌸 10월 환절기 제철 큐레이션
            </span>
            <h3 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#2A2320]">
              찬바람 부는 날, 목련과 메리골드의 따스한 조화
            </h3>
            <p className="text-xs sm:text-sm text-[#736358] max-w-xl">
              비염과 호흡기에 좋은 백목련꽃차와 컴퓨터 작업으로 지친 눈을 풀어주는 황금 메리골드를 듀엣 세트로 만나보세요.
            </p>
          </div>

          <button
            onClick={() => {
              const duet = TEA_PRODUCTS.find(p => p.id === 'gift-duet-box');
              if (duet) setSelectedProduct(duet);
            }}
            className="px-6 py-3.5 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-full text-xs font-semibold transition shrink-0 flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span>듀엣 선물세트 보러가기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Traditional Bojagi Gift Section */}
      <BojagiGiftSection
        onGoToGiftSets={() => {
          setActiveCategory('gift');
          scrollToSection('products-section');
        }}
      />

      {/* 3-Minute Blooming Ritual Guide */}
      <BrewingRitualSection />

      {/* Brand Craftsmanship & Roasting Story */}
      <BrandStorySection />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.some(i => i.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <TeaFinderModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onAddToCart={(product) => handleAddToCart(product, 1, '단품 유리병')}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(prod) => handleAddToCart(prod, 1, '단품 유리병')}
        onOpenDetail={(prod) => setSelectedProduct(prod)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
