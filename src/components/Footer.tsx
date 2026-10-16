import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#261F1B] text-[#D8CECA] border-t border-[#3B322D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3B322D]">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif-kr tracking-widest font-bold text-white">
                花 談
              </span>
              <span className="text-base font-serif-kr text-[#D89F82] font-medium">
                화담다원
              </span>
            </div>
            <p className="text-xs text-[#A8988F] leading-relaxed max-w-sm">
              사계절의 숨결과 햇살을 품은 꽃을 정성껏 덖어 찻잔에 올립니다. 
              향기로운 꽃차 한 잔이 전하는 온전한 쉼과 위로를 경험해보세요.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] bg-[#3B3029] text-[#E0D5CE] px-3 py-1 rounded-full border border-[#4E4138]">
                국내산 100% 무농약
              </span>
              <span className="text-[11px] bg-[#3B3029] text-[#E0D5CE] px-3 py-1 rounded-full border border-[#4E4138]">
                전통 9증9포 덖음
              </span>
            </div>
          </div>

          {/* Customer Support */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-kr text-sm font-bold text-white">
              고객 감동 센터
            </h4>
            <p className="font-serif text-2xl font-bold text-[#E5B582]">
              1544-7821
            </p>
            <p className="text-xs text-[#A8988F] space-y-1">
              <span className="block">운영 시간: 평일 10:00 ~ 18:00 (점심 12:30 ~ 13:30)</span>
              <span className="block">주말 및 공휴일 휴무 / 카카오톡 채널 @화담다원</span>
            </p>
            <div className="pt-2 text-xs text-[#C5B5AA] space-y-1">
              <p>대량 구매 및 기업 답례품 제휴 문의: <span className="text-white underline">b2b@hwadamtea.kr</span></p>
            </div>
          </div>

          {/* Quick Links & Bank Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-kr text-sm font-bold text-white">
              안내 및 바로가기
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#A8988F]">
              <a href="#products-section" className="hover:text-white transition">꽃차 컬렉션</a>
              <a href="#gift-section" className="hover:text-white transition">보자기 선물포장</a>
              <a href="#brewing-ritual" className="hover:text-white transition">3분 다도 가이드</a>
              <a href="#brand-story" className="hover:text-white transition">장인 덖음 이야기</a>
              <span className="hover:text-white cursor-pointer">이용약관</span>
              <span className="hover:text-white cursor-pointer font-bold text-[#D89F82]">개인정보처리방침</span>
            </div>

            <div className="pt-3 border-t border-[#3B322D]">
              <p className="text-xs text-[#A8988F]">
                입금 계좌: 국민은행 841501-04-192831 (예금주: 주식회사 화담)
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Business Footnotes */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#8C7A70] gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p>
              (주)화담다원 | 대표: 김은우 | 사업자등록번호: 214-88-91024 | 통신판매업신고: 제2026-서울종로-0142호
            </p>
            <p>
              주소: 서울특별시 종로구 인사동길 44 화담빌딩 2층 | 개인정보관리책임자: 박서진 (privacy@hwadamtea.kr)
            </p>
            <p className="text-[#6D5D54]">
              © 2026 HWADAM FLOWER TEA. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#9E8E84]">
            <ShieldCheck className="w-4 h-4 text-[#8E5A44]" />
            <span>KG이니시스 구매안전 에스크로 서비스 가입</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
