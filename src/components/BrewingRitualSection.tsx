import React, { useState } from 'react';
import { BREWING_GUIDE_STEPS } from '../data/teaProducts';
import { Sparkles, Flame, Clock, Heart, Volume2, VolumeX } from 'lucide-react';

export const BrewingRitualSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (idx: number) => {
    switch(idx) {
      case 0: return <Sparkles className="w-5 h-5" />;
      case 1: return <Flame className="w-5 h-5" />;
      case 2: return <Clock className="w-5 h-5" />;
      default: return <Heart className="w-5 h-5" />;
    }
  };

  const stepVisuals = [
    {
      title: '첫 번째 의식: 정갈한 다기 준비',
      image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=900&auto=format&fit=crop',
      tip: '따뜻한 온수로 잔을 미리 덥히면 차의 온도가 급격히 식지 않아 향이 오래 머뭅니다.'
    },
    {
      title: '두 번째 의식: 숨결을 불어넣는 온수',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop',
      tip: '꽃잎에 물줄기가 직접 닿지 않도록 다관 벽을 타고 부드럽게 원을 그리며 부어주세요.'
    },
    {
      title: '세 번째 의식: 만개의 순간 감상',
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=900&auto=format&fit=crop',
      tip: '찻잔 속에서 꽃잎이 서서히 기지개를 켜며 활짝 피어납니다. 복잡한 생각을 비우고 3분의 여유를 느껴보세요.'
    },
    {
      title: '네 번째 의식: 3단 음미',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=900&auto=format&fit=crop',
      tip: '첫 모금은 코끝으로 아로마를, 두 번째 모금은 혀끝의 달콤함을, 세 번째는 목넘김 후 차오르는 온기를 느낍니다.'
    }
  ];

  return (
    <section id="brewing-ritual" className="py-20 sm:py-28 bg-[#FAF6F0] border-b border-[#E8DEC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E5A44] bg-[#EFE4D8] px-3.5 py-1 rounded-full inline-block">
            The Blooming Ritual
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-kr font-bold text-[#2A221E] leading-tight">
            꽃이 다시 피어나는 3분의 의식
          </h2>
          <p className="text-xs sm:text-sm text-[#736358] leading-relaxed">
            마른 꽃송이가 맑은 물을 만나 다시 생명력을 얻는 과정. 
            단순히 마시는 음료를 넘어, 오감을 깨우는 다도의 시간을 선물합니다.
          </p>
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Step Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            {BREWING_GUIDE_STEPS.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex items-start gap-4 ${
                  activeStep === idx
                    ? 'bg-white border-[#8E5A44] shadow-md scale-[1.02]'
                    : 'bg-white/60 hover:bg-white border-[#E8DFD3] text-[#716156]'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                  activeStep === idx 
                    ? 'bg-[#8E5A44] text-white' 
                    : 'bg-[#F2ECE3] text-[#7D6B60]'
                }`}>
                  {getStepIcon(idx)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#8E5A44] tracking-wider">
                      STEP 0{step.step} • {step.time}
                    </span>
                  </div>
                  <h4 className="font-serif-kr text-base font-bold text-[#2A221D] mt-0.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#75665D] mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Visual Showcase for Active Step */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DECFC1] shadow-xl relative overflow-hidden">
              <div className="aspect-16/10 rounded-2xl overflow-hidden relative shadow-inner mb-6">
                <img
                  src={stepVisuals[activeStep].image}
                  alt={stepVisuals[activeStep].title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold bg-[#8E5A44]/90 px-2.5 py-1 rounded-full">
                    STEP 0{activeStep + 1}
                  </span>
                  <h3 className="font-serif-kr text-lg sm:text-xl font-bold mt-1.5 drop-shadow-sm">
                    {stepVisuals[activeStep].title}
                  </h3>
                </div>
              </div>

              {/* Tip Box */}
              <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#E9DFD2] flex items-start gap-3">
                <span className="text-lg shrink-0">💡</span>
                <div>
                  <h5 className="text-xs font-bold text-[#342822]">화담 다도사의 마스터 팁</h5>
                  <p className="text-xs text-[#6F5E54] mt-0.5 leading-relaxed">
                    {stepVisuals[activeStep].tip}
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
