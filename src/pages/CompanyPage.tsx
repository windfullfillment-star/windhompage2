import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/Section';
import { SEO } from '@/components/SEO';
import { motion } from 'motion/react';

const TIMELINE = [
  {
    year: '2026',
    event: '소수 고객사 집중 운영 방침 전환\n웹정산서 개발 완료(2월)\n김포센터 이전(5월)'
  },
  {
    year: '2025',
    event: '부천센터 출점(7월)\n본사이전 (7월)\n웹정산서 개발 착수\n김포센터 자사물류 착공(11월)'
  },
  {
    year: '2024',
    event: '물류센터매입 검토(1월)\n인천2센터 출점(4월)\n1%의비밀 고수열전 출연\n해외수출 출고 서비스 개시\n고객사 80개 확대'
  },
  {
    year: '2023',
    event: '주식회사 윈드 상표등록 접수(3월)\n고객사 40개 확대\n청라 로지스포트 센터 사업소재지 변경\n23년 상반기 10억 달성\n인천대 무역학과 산학연계자문위원회 자문위원 위촉(물류)'
  },
  {
    year: '2022',
    event: '고객사 20개 확대\n주식회사 윈드 법인설립(10월)\nCJ대한통운 택배대리점 개설(6월)'
  },
  {
    year: '2021',
    event: '(주)이지스토리지원 설립(21년 4월)\n김포 1,000평 센터 계약'
  }
];

export function CompanyPage() {
  return (
    <>
      <SEO title="회사소개" />
      
      {/* Hero */}
      <div className="bg-gray-50 py-32 px-6 border-b border-gray-100">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl tracking-tighter mb-8"
          >
            COMPANY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-light"
          >
            우리는 고객사의 물류 고민을 해결하고, 성장을 돕는 가장 든든한 파트너가 되고자 합니다.
          </motion.p>
        </div>
      </div>

      {/* Philosophy */}
      <Section title="회사의 철학" subtitle="소수 고객사 집중 운영, 소통 중심의 가치">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <div className="space-y-6">
            <h3 className="text-2xl tracking-tight">"우리는 양보다 질을 선택합니다"</h3>
            <p className="text-gray-500 leading-relaxed text-lg font-light whitespace-pre-line">
              {`윈드는 외형적 확장보다 운영의 밀도에 집중합니다.
우리가 가장 완벽한 퍼포먼스를 낼 수 있는 고객사를 선별하여 역량을 결집하는 것,
이를 통해 파트너사의 물류 담당자가 현장을 떠난 시간에도 비즈니스의 연속성을 신뢰할 수 있는 환경을 구축하는 것이
윈드의 핵심 가치입니다.`}
            </p>
          </div>
          <div className="aspect-video bg-gray-100 overflow-hidden grayscale">
            <img
              src="/wind_warehouse.png"
              alt="Wind Warehouse"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section title="연혁" className="bg-gray-50">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200" />
          <div className="space-y-16">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  'relative flex flex-col md:flex-row items-start md:items-center',
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                )}
              >
                <div className="absolute left-[-4px] md:left-1/2 md:ml-[-4px] w-2 h-2 bg-black rounded-full z-10" />
                <div className={cn('w-full md:w-1/2 pl-8 md:pl-0', idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right')}>
                  <span className="text-2xl tracking-tighter mb-2 block">{item.year}</span>
                  <p className="text-gray-500 font-light whitespace-pre-line">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section title="오시는 길">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-[21/9] bg-gray-100 border border-gray-100 overflow-hidden font-sans shadow-inner">
            <iframe 
              src="https://maps.google.com/maps?q=경기도 김포시 대곶면 대곶남로 311&z=15&output=embed" 
              className="absolute inset-0 w-full h-full border-0" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-6 right-6 z-10">
              <a 
                href="https://map.naver.com/p/search/경기도%20김포시%20대곶면%20대곶남로%20311" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#2DB400] hover:bg-[#208000] text-white font-medium shadow-lg flex items-center space-x-2 transition-transform hover:scale-105 rounded-md"
              >
                <span>📍 네이버 앱으로 길찾기</span>
              </a>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="mb-2">본사</h4>
              <p className="text-gray-500">경기도 김포시 대곶면 대곶남로 307, 2층</p>
            </div>
            <div>
              <h4 className="mb-2">물류</h4>
              <p className="text-gray-500">경기도 김포시 대곶면 대곶남로 311</p>
            </div>
            <div>
              <h4 className="mb-2">전화</h4>
              <p className="text-gray-500">010-9011-5002</p>
            </div>
            <div>
              <h4 className="mb-2">이메일</h4>
              <p className="text-gray-500">hkkim@windl.co.kr</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

