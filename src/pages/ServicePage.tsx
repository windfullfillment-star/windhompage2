import { Section } from '@/components/Section';
import { SEO } from '@/components/SEO';
import { motion } from 'motion/react';
import { Package, Truck, Monitor, CheckCircle2, ArrowDownToLine, Database, Send, ShoppingBag, Cpu } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ServicePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <SEO title="서비스소개" />
      
      {/* Hero - Lightened */}
      <div className="bg-gray-50 py-32 px-6 border-b border-gray-100">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl tracking-tighter mb-8 text-black"
          >
            SERVICE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto font-light"
          >
            윈드만의 차별화된 물류 솔루션을 소개합니다. <br />
            소수 고객사 집중 운영을 통해 최상의 품질을 보장합니다.
          </motion.p>
        </div>
      </div>

      {/* 1. 입고 (Inbound) */}
      <Section id="inbound" title="입고 (Inbound)" subtitle="정확한 검수와 체계적인 입고 관리">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <ArrowDownToLine className="text-brand-blue" size={24} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl tracking-tight">표준 입고 관리</h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  입고되는 모든 상품에 대해 수량 및 상태를 검수합니다. 
                  오입고 및 파손 상품을 사전에 차단하여 재고의 무결성을 확보합니다.
                </p>
              </div>
            </div>
            <ul className="space-y-4 pl-18">
              {['다양한 형태의 입고 가능', '철저한 입고상품 검수', '유통기한/로트번호 관리', '입고 즉시 실시간 재고 반영'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-[4/3] bg-gray-100 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
              alt="Inbound"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </Section>

      {/* 2. 보관 (Storage) */}
      <Section id="storage" title="보관 (Storage)" subtitle="최적의 환경에서 안전하게 보관합니다" className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 aspect-[4/3] bg-gray-100 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200"
              alt="Storage"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Database className="text-brand-blue" size={24} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl tracking-tight">스마트 로케이션 관리</h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  상품의 특성과 출고 빈도에 따른 최적의 로케이션을 지정합니다. 
                  체계적인 구역 관리를 통해 피킹 효율을 극대화하고 오피킹을 방지합니다.
                </p>
              </div>
            </div>
            <ul className="space-y-4 pl-18">
              {['피킹 최적화를 위한 보관', '항온/항습 유지 관리', '정기적인 재고 실사', '보안 시스템 및 물류건물 보험'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 3. 택배출고 (Parcel Outbound) */}
      <Section id="parcel" title="택배출고 (Parcel Outbound)" subtitle="빠르고 정확한 택배출고 서비스">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Send className="text-brand-blue" size={24} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl tracking-tight">당일 출고 원칙</h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  주문 마감 시간 내 인입된 주문에 대해 당일 출고를 원칙으로 합니다. 
                  대형 택배사와의 긴밀한 협력을 통해 안정적인 배송 서비스를 제공합니다.
                </p>
              </div>
            </div>
            <ul className="space-y-4 pl-18">
              {['쇼핑몰 API 연동을 통한 자동 주문수집', '고객사 맞춤 패킹 출고', '실시간 배송 추적 연동', '오배송 방지 검수 시스템'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-[4/3] bg-gray-100 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="/wind_very_realistic_korean_team.png"
              alt="Parcel"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </Section>

      {/* 4. B2B출고 (B2B Outbound) */}
      <Section id="b2b" title="B2B출고 (B2B Outbound)" subtitle="다양한 엔드포인트 출고과 맞춤형 패키징" className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 aspect-[4/3] bg-gray-100 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="/B2B출고이미지.png"
              alt="B2B"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="text-brand-blue" size={24} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl tracking-tight">브랜드 맞춤형 패키징</h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  고객사별 다양한 B2B 출고처에 맞는 패킹 및 서류 작업 서비스를 제공합니다.
                </p>
              </div>
            </div>
            <ul className="space-y-4 pl-18">
              {['쿠팡 밀크런, 그로스 출고', '올리브영, 면세점, 네이버전용물류 출고', '출고지별 표준 패킹 작업', '출고시점 맞춤 서비스'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 5. WMS (Warehouse Management System) */}
      <Section id="wms" title="WMS (IT)" subtitle="데이터 기반의 스마트 물류 IT 솔루션">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cpu className="text-brand-blue" size={24} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl tracking-tight">스마트 WMS & 웹 정산 시스템</h3>
                <p className="text-gray-500 leading-relaxed font-light">
                  최신 WMS 시스템을 통해 입고부터 재고, 출고까지 전 과정을 실시간으로 관리합니다. 
                  자체 웹 정산 시스템을 통해 투명한 비용 관리를 지원합니다.
                </p>
              </div>
            </div>
            <ul className="space-y-4 pl-18">
              {['실시간 주문 재고 현황 모니터링', '다양한 쇼핑몰과의 연동', '상세 정산 내역 웹 조회', '다양한 통계 리포트 제공'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-[4/3] bg-gray-100 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
              alt="WMS"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
