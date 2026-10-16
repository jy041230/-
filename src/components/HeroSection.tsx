import React from 'react';
import { Sparkles, ArrowDown, ShieldCheck, Leaf, HeartHandshake } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onOpenQuiz }) => {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EE] border-b border-[#E8DFD5]">
      {/* Background Decorative ambient glow & subtle pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#F3D7C4]/50 blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 rounded-full bg-[#EBD8C1]/50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text & Call-To-Action */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#DECFC1] text-[#7C4836] text-xs font-medium tracking-wide shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C] animate-ping" />
              <span>지리산·안동 청정 다원 2026 햇꽃차 개화 덖음</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-serif-kr text-[#261E1A] leading-[1.3] font-medium tracking-tight">
                한 송이 꽃이 피어나듯,<br />
                당신의 일상에 건네는 <span className="text-[#8E5A44] italic font-serif">따스한 쉼</span>
              </h1>
              <p className="text-sm sm:text-base text-[#67574E] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                자연 그대로의 꽃송이를 손수 덖어 온전히 말렸습니다. 
                뜨거운 물을 부으면 찻잔 속에서 꽃잎이 만개하며 피어나는 
                찬란한 오색 수색과 그윽한 향기를 경험해보세요.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>꽃차 컬렉션 둘러보기</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/90 hover:bg-white text-[#564237] border border-[#D5C4B4] rounded-full text-sm font-medium transition-all shadow-xs hover:border-[#8E5A44] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#8E5A44]" />
                <span>나에게 맞는 꽃차 찾기 (1분)</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#E8DEC0]/60 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EFE8DF] flex items-center justify-center shrink-0 text-[#8E5A44]">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2D2420]">100% 무농약</p>
                  <p className="text-[11px] text-[#7A6B62]">국내산 청정 꽃잎</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EFE8DF] flex items-center justify-center shrink-0 text-[#8E5A44]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2D2420]">전통 9증9포</p>
                  <p className="text-[11px] text-[#7A6B62]">장인의 정성 덖음</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EFE8DF] flex items-center justify-center shrink-0 text-[#8E5A44]">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2D2420]">실크 보자기</p>
                  <p className="text-[11px] text-[#7A6B62]">무료 선물 포장</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Composition (Pinterest editorial style) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/5 border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop"
                  alt="화담 프리미엄 꽃차 다도"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Floating caption on image */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] font-medium tracking-wider uppercase bg-[#8E5A44]/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-white/95 inline-block">
                    Signature Flower Tea
                  </span>
                  <h3 className="font-serif-kr text-xl font-medium drop-shadow-sm">
                    구례 지리산 백목련 꽃차
                  </h3>
                  <p className="text-xs text-white/80 font-light">
                    투명한 유리잔에서 다시 살아나는 순백의 꽃송이
                  </p>
                </div>
              </div>

              {/* Floating aesthetic small card 1 */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-[#EBE3D7] flex items-center gap-3 max-w-[210px] animate-bounce-subtle">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#DFD5C7]">
                  <img 
                    src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=300&auto=format&fit=crop" 
                    alt="황금 메리골드" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#342A24] line-clamp-1">황금 메리골드</p>
                  <p className="text-[10px] text-[#8E5A44] font-medium">눈 피로 개선 루테인</p>
                </div>
              </div>

              {/* Floating aesthetic small card 2 */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-[#EBE3D7] text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#8C7A70] font-semibold block">고객 평점</span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <span className="text-amber-500 text-xs">★</span>
                  <span className="font-serif text-sm font-bold text-[#2A2320]">4.96</span>
                  <span className="text-[10px] text-[#8C7A70]">(2,840+)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
