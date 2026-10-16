import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Heart, ShoppingBag } from 'lucide-react';
import { TEA_PRODUCTS, TeaProduct } from '../data/teaProducts';

interface TeaFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: TeaProduct) => void;
  onAddToCart: (product: TeaProduct) => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    tag: string;
    icon: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: '지금 당신에게 가장 필요한 위로 또는 케어는 무엇인가요?',
    subtitle: '하루의 끝자락, 내 몸과 마음의 소리에 귀 기울여보세요.',
    options: [
      {
        label: '침침하고 피로한 눈의 휴식',
        description: '하루 종일 스마트폰과 모니터로 뻑뻑하고 피로한 눈',
        tag: 'eye',
        icon: '👁️'
      },
      {
        label: '쌀쌀한 환절기 목과 호흡기 케어',
        description: '답답한 목, 비염으로 상쾌한 숨결이 필요할 때',
        tag: 'respiratory',
        icon: '🌿'
      },
      {
        label: '깊은 밤 뒤척임 없는 꿀잠과 이완',
        description: '복잡한 생각과 스트레스를 비우고 평온한 숙면을 원할 때',
        tag: 'sleep',
        icon: '🌙'
      },
      {
        label: '달콤한 기분 전환과 디저트 타임',
        description: '우울함을 털어내고 향긋한 꿀향으로 채우는 나만의 힐링',
        tag: 'mood',
        icon: '🍯'
      },
      {
        label: '소중한 분께 건네는 품격 있는 선물',
        description: '감사와 정성을 고급스러운 보자기와 함께 전하고 싶을 때',
        tag: 'gift',
        icon: '🎁'
      }
    ]
  },
  {
    id: 2,
    title: '어떤 향미 노트를 가장 선호하시나요?',
    subtitle: '은은하게 코끝을 스치는 나만의 아로마 취향을 골라주세요.',
    options: [
      {
        label: '시원하고 알싸한 박하 + 바닐라의 반전 매력',
        description: '첫 향은 시원하고 끝은 달콤하게 감도는 청량감',
        tag: 'refreshing',
        icon: '🍃'
      },
      {
        label: '가을 노을처럼 구수하고 달큰한 국화향',
        description: '쓰지 않고 숭늉처럼 편안하게 마실 수 있는 온기',
        tag: 'savory',
        icon: '🍂'
      },
      {
        label: '천연 아카시아 꿀처럼 화사하고 달콤한 꽃향',
        description: '차 한 잔으로 향수를 뿌린 듯 입안 가득 피어나는 꽃길',
        tag: 'sweet',
        icon: '🌸'
      },
      {
        label: '붉은 보석처럼 매혹적인 수색과 담백한 여운',
        description: '보는 즐거움과 몸을 따뜻하게 데워주는 붉은 에너지',
        tag: 'ruby',
        icon: '🍷'
      }
    ]
  },
  {
    id: 3,
    title: '어떤 방식으로 꽃차를 즐기실 예정인가요?',
    subtitle: '나의 라이프스타일에 맞춘 다도 방식을 선택해주세요.',
    options: [
      {
        label: '유리 다기에 통꽃을 띄워 천천히 피어나는 다도',
        description: '꽃이 서서히 만개하는 시각적 감동을 느끼는 온전한 쉼',
        tag: 'ceremony',
        icon: '🫖'
      },
      {
        label: '사무실이나 외출 시 텀블러로 간편하게 즐기는 티백',
        description: '생분해 삼각 티백으로 언제 어디서나 깔끔하게',
        tag: 'teabag',
        icon: '☕'
      },
      {
        label: '보자기 매듭과 전통 노리개가 포함된 완성형 선물세트',
        description: '선물 받는 분이 감동할 수 있는 최고급 패키지',
        tag: 'giftset',
        icon: '🎀'
      }
    ]
  }
];

export const TeaFinderModal: React.FC<TeaFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedTea, setRecommendedTea] = useState<TeaProduct | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (tag: string) => {
    const newAnswers = [...answers, tag];
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      const matched = calculateRecommendation(newAnswers);
      setRecommendedTea(matched);
    }
  };

  const calculateRecommendation = (userAnswers: string[]): TeaProduct => {
    const [need, scent, style] = userAnswers;

    if (need === 'gift' || style === 'giftset') {
      return TEA_PRODUCTS.find(t => t.id === 'gift-hwadam-master') || TEA_PRODUCTS[0];
    }
    if (style === 'teabag') {
      return TEA_PRODUCTS.find(t => t.id === 'blend-bloom-trio') || TEA_PRODUCTS[0];
    }
    if (need === 'eye' || scent === 'savory') {
      return TEA_PRODUCTS.find(t => t.id === 'tea-marigold') || TEA_PRODUCTS[0];
    }
    if (need === 'respiratory' || scent === 'refreshing') {
      return TEA_PRODUCTS.find(t => t.id === 'tea-magnolia') || TEA_PRODUCTS[0];
    }
    if (need === 'sleep') {
      return TEA_PRODUCTS.find(t => t.id === 'tea-chrysanthemum') || TEA_PRODUCTS[0];
    }
    if (need === 'mood' || scent === 'sweet') {
      return TEA_PRODUCTS.find(t => t.id === 'tea-acacia') || TEA_PRODUCTS[0];
    }
    if (scent === 'ruby') {
      return TEA_PRODUCTS.find(t => t.id === 'tea-cockscomb') || TEA_PRODUCTS[0];
    }
    return TEA_PRODUCTS[0];
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendedTea(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E3D9CD] overflow-hidden transition-all my-8">
        {/* Header */}
        <div className="px-6 py-5 bg-[#F2ECE3] border-b border-[#E4D9CC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#8E5A44] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-kr text-base font-bold text-[#2A2320]">
                화담(花談) 꽃차 취향 큐레이션
              </h3>
              <p className="text-[11px] text-[#786960]">
                오늘 당신의 마음에 피어날 차를 찾아드립니다
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#786960] hover:text-[#2A2320] hover:bg-[#E5DBD0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!recommendedTea ? (
            <div>
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-[#827166] mb-1.5 font-medium">
                  <span>질문 {currentStep + 1} / {QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% 완료</span>
                </div>
                <div className="w-full bg-[#E5DCD0] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#8E5A44] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="space-y-6">
                <div className="text-center sm:text-left">
                  <h4 className="text-lg sm:text-xl font-serif-kr font-semibold text-[#28201C] leading-snug">
                    {QUESTIONS[currentStep].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#736359] mt-1.5">
                    {QUESTIONS[currentStep].subtitle}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {QUESTIONS[currentStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.tag)}
                      className="w-full p-4 text-left rounded-2xl bg-white hover:bg-[#F5EFE6] border border-[#E3D9CC] hover:border-[#8E5A44] transition-all duration-200 flex items-start gap-4 shadow-xs group cursor-pointer"
                    >
                      <span className="text-2xl shrink-0 p-2 rounded-xl bg-[#FAF8F5] group-hover:scale-110 transition-transform">
                        {opt.icon}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#2C2420] group-hover:text-[#8E5A44] transition-colors">
                          {opt.label}
                        </p>
                        <p className="text-xs text-[#7A6B62] mt-0.5 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#A89A90] group-hover:text-[#8E5A44] group-hover:translate-x-1 transition self-center shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DF] text-[#734330] text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#8E5A44]" />
                <span>당신만을 위한 맞춤 꽃차 블렌드</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-serif-kr font-bold text-[#2A2320]">
                  오늘 당신의 마음에 피어날 차는
                </h4>
                <p className="text-sm text-[#73645A]">
                  선택하신 마음의 상태와 향미 취향에 가장 알맞은 전통 수제 꽃차입니다.
                </p>
              </div>

              {/* Recommended Tea Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#DECFC1] shadow-md flex flex-col sm:flex-row items-center gap-5 text-left">
                <img
                  src={recommendedTea.image}
                  alt={recommendedTea.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl shadow-xs shrink-0"
                />
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3.5 h-3.5 rounded-full inline-block border border-black/10"
                      style={{ backgroundColor: recommendedTea.liquorColor.hex }}
                    />
                    <span className="text-xs text-[#8E5A44] font-medium">
                      수색: {recommendedTea.liquorColor.name}
                    </span>
                  </div>

                  <h5 className="font-serif-kr text-lg font-bold text-[#251E1A]">
                    {recommendedTea.name}
                  </h5>
                  <p className="text-xs text-[#6F5F55] line-clamp-2">
                    {recommendedTea.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {recommendedTea.effects.map((eff, i) => (
                      <span key={i} className="text-[11px] bg-[#F7F2EB] text-[#786457] px-2 py-0.5 rounded-md font-medium">
                        #{eff}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#F0E8DC]">
                    <span className="font-serif text-lg font-bold text-[#8E5A44]">
                      {recommendedTea.price.toLocaleString()}원
                    </span>
                    <span className="text-[11px] text-[#8C7D73]">
                      무료 선물 포장 가능
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onAddToCart(recommendedTea);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 bg-[#8E5A44] hover:bg-[#784632] text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>이 차 장바구니에 담기</span>
                </button>
                <button
                  onClick={() => {
                    onSelectProduct(recommendedTea);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 bg-[#EFE8DF] hover:bg-[#E5DCD0] text-[#4A3B32] rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>상세 정보 & 다도법 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div>
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C7A70] hover:text-[#2A2320] transition mt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>다시 테스트하기</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
