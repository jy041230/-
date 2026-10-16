import React, { useState } from 'react';
import { BOJAGI_OPTIONS, BojagiOption } from '../data/teaProducts';
import { Gift, Sparkles, Feather, Check, ArrowRight } from 'lucide-react';

interface BojagiGiftSectionProps {
  onGoToGiftSets: () => void;
}

export const BojagiGiftSection: React.FC<BojagiGiftSectionProps> = ({ onGoToGiftSets }) => {
  const [selectedBojagi, setSelectedBojagi] = useState<BojagiOption>(BOJAGI_OPTIONS[0]);
  const [toName, setToName] = useState('소중한 어머니께');
  const [message, setMessage] = useState('늘 따뜻한 사랑에 감사드립니다. 향기로운 꽃차와 함께 평온한 쉼을 누리시길 바랍니다.');
  const [fromName, setFromName] = useState('사랑하는 딸 올림');

  return (
    <section id="gift-section" className="py-20 sm:py-28 bg-[#F4EFEB] border-b border-[#E5DACD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#D9CDBF] text-[#8E5A44] text-xs font-semibold">
            <Gift className="w-3.5 h-3.5" />
            <span>화담만의 시그니처 정성</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif-kr font-bold text-[#2A211D]">
            마음을 매듭짓는 전통 실크 보자기 & 캘리그라피
          </h2>
          <p className="text-xs sm:text-sm text-[#726257] leading-relaxed">
            전통 양면 실크 보자기와 수제 나비 노리개 매듭, 그리고 한 글자 한 글자 적어 내려가는 
            정성 어린 캘리그라피 감사 엽서로 가장 귀한 분께 품격을 전하세요.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Bojagi Color & Message Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#DFD3C4] shadow-sm space-y-5">
              <h3 className="font-serif-kr text-lg font-bold text-[#271E1A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8E5A44]" />
                <span>1. 보자기 원단 및 색상 선택 (무료)</span>
              </h3>

              {/* Bojagi Color Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                {BOJAGI_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedBojagi(opt)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                      selectedBojagi.id === opt.id
                        ? 'border-[#8E5A44] bg-[#FAF5EE] shadow-xs'
                        : 'border-[#E7DCCE] bg-white hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <span 
                      className="w-6 h-6 rounded-full shrink-0 border border-black/10 shadow-xs flex items-center justify-center"
                      style={{ backgroundColor: opt.hex }}
                    >
                      {selectedBojagi.id === opt.id && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-bold text-[#2D241E] truncate">{opt.colorName}</p>
                      <p className="text-[10px] text-[#7A6A60] truncate">{opt.name}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Bojagi Description note */}
              <p className="text-xs text-[#7B6A5F] bg-[#FAF6F0] p-3 rounded-xl border border-[#ECE0D3]">
                <strong>{selectedBojagi.colorName}</strong>: {selectedBojagi.description}
              </p>
            </div>

            {/* Custom Calligraphy Message Simulator */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#DFD3C4] shadow-sm space-y-4">
              <h3 className="font-serif-kr text-lg font-bold text-[#271E1A] flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#8E5A44]" />
                <span>2. 한지 캘리그라피 감사 카드 문구 작성</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#5A4A41] block mb-1">받는 분 (호칭)</label>
                  <input
                    type="text"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    placeholder="예: 존경하는 선생님께"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] focus:outline-none focus:border-[#8E5A44] bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5A4A41] block mb-1">마음을 전하는 메시지</label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="따스한 안부와 감사의 인사를 전해보세요."
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] focus:outline-none focus:border-[#8E5A44] bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5A4A41] block mb-1">보내는 분</label>
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="예: 제자 민수 올림"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] focus:outline-none focus:border-[#8E5A44] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <button
                onClick={onGoToGiftSets}
                className="w-full mt-2 py-3.5 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>이 구성으로 선물세트 둘러보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Realtime Preview Canvas */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DECFC1] shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DD]">
                <span className="text-xs font-bold text-[#8E5A44] uppercase tracking-wider">
                  실시간 패키지 미리보기
                </span>
                <span className="text-xs text-[#8A796E]">
                  수제 나비 노리개 매듭 기본 포함
                </span>
              </div>

              {/* Bojagi Package Image with Colored Tint / Aura */}
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-[#F4EFEB] border border-[#E5DACD] shadow-inner flex items-center justify-center">
                <img
                  src={selectedBojagi.image}
                  alt={selectedBojagi.name}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                />
                
                {/* Bojagi Tag overlay */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 border border-black/5">
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: selectedBojagi.hex }}
                  />
                  <span className="text-xs font-bold text-[#2A221E]">{selectedBojagi.name}</span>
                </div>
              </div>

              {/* Hanji Calligraphy Card Preview */}
              <div className="bg-[#FFFDF9] border border-[#E8DEC0] rounded-2xl p-5 shadow-xs relative">
                <div className="absolute -top-3 right-4 bg-[#8E5A44] text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                  수제 한지 엽서 동봉
                </div>
                
                <div className="space-y-3 font-serif-kr text-[#2C231E]">
                  <p className="text-sm font-bold text-[#8E5A44]">
                    {toName || '받는 분께'}
                  </p>
                  <p className="text-xs text-[#4E3F35] leading-relaxed whitespace-pre-line italic">
                    "{message || '따뜻한 마음을 담아 전합니다.'}"
                  </p>
                  <p className="text-xs text-right text-[#7E6C60] font-medium">
                    {fromName || '보내는 분 올림'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
