import React from 'react';
import { TEA_STORY_STEPS } from '../data/teaProducts';
import { CheckCircle2, Award, Heart, Leaf } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="brand-story" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8DEC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E5A44] bg-[#F2E8DF] px-3.5 py-1 rounded-full inline-block">
            Our Craftsmanship & Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-kr font-bold text-[#2A2320] leading-snug">
            자연이 피우고, 장인이 덖고,<br />
            사람이 비로소 누리는 꽃의 시간
          </h2>
          <p className="text-xs sm:text-sm text-[#73645A] leading-relaxed">
            화담은 단순한 꽃 건조가 아닌, 한의학의 법제(法製) 원리를 담은 
            전통 9증9포(九蒸九曝) 덖음 기법으로 꽃의 찬 기운과 독성을 다스립니다. 
            매일 한 잔, 몸과 마음이 가장 편안해지는 최적의 균형을 완성합니다.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEA_STORY_STEPS.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E7DFD4] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="font-serif text-3xl font-bold text-[#DEC9B7] group-hover:text-[#8E5A44] transition-colors block">
                  {step.step}
                </span>
                
                <div>
                  <span className="text-[11px] font-semibold text-[#8E5A44] tracking-tight block">
                    {step.subtitle}
                  </span>
                  <h3 className="font-serif-kr text-lg font-bold text-[#29221E] mt-0.5">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-[#736359] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2ECE3] flex items-center gap-1.5 text-[11px] text-[#8E7E73]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8E5A44]" />
                <span>장인 100% 수작업 검수</span>
              </div>
            </div>
          ))}
        </div>

        {/* Master Quality Highlights Banner */}
        <div className="mt-14 bg-[#F2ECE3] rounded-3xl p-8 sm:p-12 border border-[#E3D8CC] grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#8E5A44] flex items-center justify-center shrink-0 shadow-xs">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-kr text-base font-bold text-[#27201D]">0% 인공 첨가물</h4>
              <p className="text-xs text-[#6F5F55] mt-1 leading-relaxed">
                착향료, 보존제, 인공 색소를 단 0.01%도 넣지 않은 순수한 야생화 원물만을 고집합니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#8E5A44] flex items-center justify-center shrink-0 shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-kr text-base font-bold text-[#27201D]">HACCP & 무농약 인증</h4>
              <p className="text-xs text-[#6F5F55] mt-1 leading-relaxed">
                국가 공인 잔류농약 463종 전수 검사 적합 판정을 받아 온 가족이 안심하고 음용합니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#8E5A44] flex items-center justify-center shrink-0 shadow-xs">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-kr text-base font-bold text-[#27201D]">전용 유리 보관병 & 씰링</h4>
              <p className="text-xs text-[#6F5F55] mt-1 leading-relaxed">
                빛과 습기를 차단하는 고기밀성 마개와 친환경 실리카겔로 마지막 한 모금까지 신선합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
