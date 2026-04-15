import { HeroSlider } from '@/components/HeroSlider';
import { Section } from '@/components/Section';
import { SEO } from '@/components/SEO';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Package, Truck, Monitor, MessageSquare, FileText, Check, ArrowDownToLine, Database, Send, ShoppingBag, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const PHILOSOPHY_IMAGES = [
  '/sotong1.png',
  '/wind_delivery_boxes_mockup_1775520646200.png',
  '/rapping.png',
];

const SERVICES = [
  {
    title: '입고 (Inbound)',
    desc: '철저한 전수 검수와 실시간 재고 반영',
    icon: ArrowDownToLine,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    id: 'inbound',
  },
  {
    title: '보관 (Storage)',
    desc: '스마트 로케이션 관리 및 안전한 보관 환경',
    icon: Database,
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800',
    id: 'storage',
  },
  {
    title: '택배출고 (Parcel)',
    desc: '당일 출고 원칙과 고객사 맞춤 패킹 서비스',
    icon: Send,
    image: '/wind_very_realistic_korean_team.png',
    id: 'parcel',
  },
  {
    title: 'B2B출고 (B2B)',
    desc: '다양한 엔드포인트 출고와 입고별 기준 충족',
    icon: ShoppingBag,
    image: '/B2B출고이미지.png',
    id: 'b2b',
  },
  {
    title: 'WMS (IT)',
    desc: '스마트 WMS 기반의 투명한 물류 데이터 제공',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    id: 'wms',
  },
];

const CLIENTS = [
  {
    id: 1,
    name: 'PISCESS',
    logo: '/piscess.png',
    link: 'https://www.musinsa.com/content/cms/10790'
  },
  {
    id: 2,
    name: 'CODEMENTS',
    logo: '/codements.png',
    link: 'https://m.codements.shop/'
  },
  {
    id: 3,
    name: 'MADGOAT',
    logo: '/mago.png',
    link: 'https://madgoat-official.com'
  },
  {
    id: 4,
    name: 'ISNTREE',
    logo: '/isntree.png',
    link: 'https://isntree.com/'
  },
  {
    id: 5,
    name: 'CARENOLOGY',
    logo: '/carenology.png',
    link: 'https://carenology95.com/'
  },
  {
    id: 6,
    name: 'KLAR',
    logo: '/KLAR.png',
    link: 'https://klarkorea.com/'
  },
  {
    id: 7,
    name: 'BLUESTONE',
    logo: '/BLUESTONE.png',
    link: 'https://www.bxkorea.com/'
  },
  {
    id: 8,
    name: 'EPICUREAN',
    logo: '/epicurean.png',
    link: 'https://www.instagram.com/epicureankorea_official/'
  },
  {
    id: 9,
    name: 'NEOFLAM',
    logo: '/neoflam.png',
    link: null
  },
  {
    id: 10,
    name: 'SELINE',
    logo: '/seline.png',
    link: 'https://smartstore.naver.com/seline86'
  }
];

export function MainPage() {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % PHILOSOPHY_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // [추가] 견적 폼 상태 관리
  const [formData, setFormData] = useState({
    categories: [] as string[],
    sales_channels: '',
    sku_count: '',
    avg_bundle: '',
    barcode_status: '',
    parcel_size: '',
    packing_method: '',
    monthly_parcel_count: '',
    expected_pallets: '',
    storage_method: '',
    inbound_pallet_qty: '',
    inbound_box_qty: '',
    company_name: '',
    manager_name: '',
    contact: '',
    email: '',
    inquiry_details: '',
    privacy_agreed: false
  });
  const [submitting, setSubmitting] = useState(false);

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!formData.privacy_agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    if (!formData.company_name || !formData.manager_name || !formData.contact) {
      alert('회사명, 담당자명, 연락처는 필수 입력 항목입니다.');
      return;
    }

    try {
      setSubmitting(true);
      
      const { privacy_agreed, ...saveData } = formData;
      
      const { error } = await supabase
        .from('estimation_requests')
        .insert([{
          ...saveData,
          categories: formData.categories.join(', '),
          status: '신규',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      alert('견적 요청이 성공적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');
      // 폼 초기화
      setFormData({
        categories: [],
        sales_channels: '',
        sku_count: '',
        avg_bundle: '',
        barcode_status: '',
        parcel_size: '',
        packing_method: '',
        monthly_parcel_count: '',
        expected_pallets: '',
        storage_method: '',
        inbound_pallet_qty: '',
        inbound_box_qty: '',
        company_name: '',
        manager_name: '',
        contact: '',
        email: '',
        inquiry_details: '',
        privacy_agreed: false
      });
    } catch (err: any) {
      console.error('Error submitting quote:', err);
      alert('오류가 발생했습니다: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO />
      <HeroSlider />

      {/* Philosophy Section */}
      <Section
        title="윈드의 철학"
        subtitle={<>우리는 모든 고객사를 모시지 않습니다. 대신, 우리가 모시는 소수의 고객사에게는 <br className="hidden md:block" />압도적인 집중력과 최고의 소통을 제공합니다.</>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={PHILOSOPHY_IMAGES[currentImg]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl tracking-tight">소통이 물류의 핵심입니다</h3>
              <p className="text-gray-500 leading-relaxed font-light">
                물류는 단순히 물건을 옮기는 것이 아닙니다. 고객사의 비즈니스 흐름을 이해하고,
                필요한 순간에 즉각적으로 대응하는 <br className="hidden md:block" />소통이 가장 중요합니다. 윈드는 고객사와 한 팀처럼 움직입니다.
              </p>
            </div>
            <Link
              to="/company"
              className="inline-flex items-center space-x-2 text-black border-b-2 border-brand-blue pb-1 hover:opacity-70 transition-opacity"
            >
              <span>회사소개 더보기</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* Service Summary Section */}
      <Section title="서비스" className="bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-[#111111] border border-white/10 hover:border-brand-blue/50 transition-all duration-500 shadow-sm"
            >
              <div className="aspect-video overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 flex-grow">
                <service.icon className="mb-4 text-white/50 group-hover:text-brand-blue transition-colors duration-500" size={24} />
                <h3 className="text-base mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 font-light">{service.desc}</p>
                <Link
                  to={`/service#${service.id}`}
                  className="text-[10px] tracking-[0.1em] uppercase flex items-center space-x-2 opacity-30 group-hover:opacity-100 group-hover:text-brand-blue transition-all duration-500"
                >
                  <span>자세히 보기</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Clients Section */}
      <Section title="고객사/브랜드" subtitle="윈드와 함께 성장하는 파트너사들입니다.">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          {CLIENTS.map((client) => {
            const Content = (
              <div className="group flex flex-col items-center space-y-4 w-full">
                <div className="relative aspect-square max-w-[160px] mx-auto w-full rounded-full bg-[#262626] border border-white/5 flex items-center justify-center p-6 group-hover:border-brand-blue group-hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain filter " referrerPolicy="no-referrer" />
                  ) : (
                    <div className="text-[10px] text-gray-500 tracking-widest uppercase">{client.name}</div>
                  )}
                </div>
                <span className="text-[11px] text-gray-400 group-hover:text-black transition-colors duration-500 font-light tracking-wider">{client.name}</span>
              </div>
            );

            if (client.link && client.link !== '#') {
              return (
                <a
                  key={client.id}
                  href={client.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  {Content}
                </a>
              );
            }

            return <div key={client.id} className="w-full">{Content}</div>;
          })}
        </div>
      </Section>

      {/* Quote Form Section */}
      <Section title="견적하기" id="quote" className="bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 shadow-sm border border-gray-100">
          <form className="space-y-12" onSubmit={handleQuoteSubmit}>
            {/* 견적 정보 */}
            <div className="space-y-8">
              <h4 className="text-lg border-l-4 border-brand-blue pl-4">견적 정보</h4>
              
              <div className="space-y-6">
                <label className="text-xs text-gray-400 uppercase tracking-widest block">상품 카테고리 (중복 선택 가능)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['패션의류/잡화', '뷰티', '가전/디지털', '스포츠/레저', '출산/유아동', '생활잡화', '애완용품', '기타'].map((item) => (
                    <label key={item} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-gray-200 rounded flex items-center justify-center group-hover:border-brand-blue transition-colors">
                        <input 
                          type="checkbox" 
                          className="hidden peer" 
                          checked={formData.categories.includes(item)}
                          onChange={() => handleCategoryChange(item)}
                        />
                        <Check size={12} className={cn("text-brand-blue opacity-0 peer-checked:opacity-100 transition-opacity", formData.categories.includes(item) && "opacity-100")} />
                      </div>
                      <span className="text-sm text-gray-500 font-light">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">판매채널 정보</label>
                  <input 
                    type="text" 
                    value={formData.sales_channels}
                    onChange={(e) => setFormData({...formData, sales_channels: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light" 
                    placeholder="예) 스마트스토어, 쿠팡, 오픈마켓" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">운영 상품 수 (SKU)</label>
                  <input 
                    type="text" 
                    value={formData.sku_count}
                    onChange={(e) => setFormData({...formData, sku_count: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light" 
                    placeholder="숫자만 입력" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">평균 합포장 수</label>
                  <input 
                    type="text" 
                    value={formData.avg_bundle}
                    onChange={(e) => setFormData({...formData, avg_bundle: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light" 
                    placeholder="숫자만 입력" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">상품 바코드 여부</label>
                  <select 
                    value={formData.barcode_status}
                    onChange={(e) => setFormData({...formData, barcode_status: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light bg-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="있음">있음</option>
                    <option value="없음">없음</option>
                    <option value="일부 있음">일부 있음</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">주로 사용하는 택배사이즈</label>
                  <select 
                    value={formData.parcel_size}
                    onChange={(e) => setFormData({...formData, parcel_size: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light bg-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="극소">극소</option>
                    <option value="소">소</option>
                    <option value="중">중</option>
                    <option value="대">대</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">포장방법</label>
                  <select 
                    value={formData.packing_method}
                    onChange={(e) => setFormData({...formData, packing_method: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light bg-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="기본 무지">기본 무지</option>
                    <option value="고객사 전용">고객사 전용</option>
                    <option value="에어캡">에어캡</option>
                    <option value="친환경">친환경</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">월 택배출고 건수</label>
                  <input 
                    type="text" 
                    value={formData.monthly_parcel_count}
                    onChange={(e) => setFormData({...formData, monthly_parcel_count: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light" 
                    placeholder="숫자만 입력" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">예상 보관 파레트 수</label>
                  <input 
                    type="text" 
                    value={formData.expected_pallets}
                    onChange={(e) => setFormData({...formData, expected_pallets: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light" 
                    placeholder="숫자만 입력" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">보관 방법</label>
                  <select 
                    value={formData.storage_method}
                    onChange={(e) => setFormData({...formData, storage_method: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light bg-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="상온">상온</option>
                    <option value="냉장/냉동">냉장/냉동</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">입고 예상 물량</label>
                  <div className="flex items-center space-x-8">
                    <div className="flex-1 flex items-center space-x-2">
                      <input 
                        type="text" 
                        value={formData.inbound_pallet_qty}
                        onChange={(e) => setFormData({...formData, inbound_pallet_qty: e.target.value})}
                        className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light text-center" 
                        placeholder="0" 
                      />
                      <span className="text-sm text-gray-400 whitespace-nowrap">파레트</span>
                    </div>
                    <div className="flex-1 flex items-center space-x-2">
                      <input 
                        type="text" 
                        value={formData.inbound_box_qty}
                        onChange={(e) => setFormData({...formData, inbound_box_qty: e.target.value})}
                        className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light text-center" 
                        placeholder="0" 
                      />
                      <span className="text-sm text-gray-400 whitespace-nowrap">박스</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 담당자 정보 */}
            <div className="space-y-8 pt-8 border-t border-gray-100">
              <h4 className="text-lg border-l-4 border-brand-blue pl-4">담당자 정보</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">회사명</label>
                  <input 
                    type="text" 
                    required
                    value={formData.company_name}
                    onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light" 
                    placeholder="회사명을 입력해주세요" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">담당자명</label>
                  <input 
                    type="text" 
                    required
                    value={formData.manager_name}
                    onChange={(e) => setFormData({...formData, manager_name: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light" 
                    placeholder="성함을 입력해주세요" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">연락처</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light" 
                    placeholder="010-0000-0000" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">이메일 주소</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 focus:border-brand-blue outline-none transition-colors font-light" 
                    placeholder="example@email.com" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-widest">문의사항 (최대 1000자)</label>
                <textarea 
                  rows={4} 
                  maxLength={1000} 
                  value={formData.inquiry_details}
                  onChange={(e) => setFormData({...formData, inquiry_details: e.target.value})}
                  className="w-full border border-gray-100 bg-gray-50 p-6 focus:border-brand-blue outline-none transition-colors font-light resize-none" 
                  placeholder="기타 궁금하신 사항을 자유롭게 적어주세요." 
                />
              </div>
            </div>

            {/* 개인정보 처리방침 */}
            <div className="space-y-6 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h4 className="text-sm">개인정보 수집 및 이용 동의</h4>
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <div className="w-5 h-5 border border-gray-200 rounded flex items-center justify-center group-hover:border-brand-blue transition-colors">
                    <input 
                      type="checkbox" 
                      className="hidden peer" 
                      checked={formData.privacy_agreed}
                      onChange={(e) => setFormData({...formData, privacy_agreed: e.target.checked})}
                    />
                    <Check size={12} className={cn("text-brand-blue opacity-0 peer-checked:opacity-100 transition-opacity", formData.privacy_agreed && "opacity-100")} />
                  </div>
                  <span className="text-sm">위 내용에 동의합니다.</span>
                </label>
              </div>
              <div className="h-40 overflow-y-auto bg-gray-50 p-6 text-[11px] text-gray-400 leading-relaxed space-y-4 font-light border border-gray-100">
                <div>
                  <p className="text-gray-600 mb-1">1. 수집하는 개인정보 항목</p>
                  <p>회사는 물류 상담 제공 및 안내를 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
                  <p>1) 문의 신청자</p>
                  <p>- 수집항목 : 회사명, 담당자명, 연락처, 이메일 주소, 물류정보</p>
                  <p>- 개인정보 수집방법 : 웹사이트/모바일 (예약신청접수)</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">2. 개인정보의 수집 및 이용목적</p>
                  <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                  <p>1). 서비스 제공에 관한 문의 이행 및 서비스 제공</p>
                  <p>- 컨텐츠 제공, 문의 알림 서비스 제공</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">3. 개인정보의 보유 및 이용기간</p>
                  <p>회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.</p>
                  <p>단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
                  <p>1) 보존 항목 : 접속 로그, 문의기록, 이메일</p>
                  <p>2) 보존 근거 : 전자상거래등에서의 소비자보호에 관한 법률</p>
                  <p>- 계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)</p>
                  <p>- 대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)</p>
                  <p>- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래등에서의 소비자보호에 관한 법률)</p>
                  <p>- 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년 (신용정보의 이용 및 보호에 관한 법률)</p>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-5 tracking-widest hover:bg-brand-blue transition-all duration-500 disabled:bg-gray-400"
            >
              {submitting ? '전송 중...' : '견적 요청하기'}
            </button>
          </form>
        </div>
      </Section>

      {/* New Inquiry Banner Section */}
      <section className="bg-brand-blue py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white space-y-2">
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight">
              비즈니스의 가치를 높이는 물류, 지금 바로 경험해보세요.
            </h2>
            <p className="text-white/80 text-sm md:text-base font-light">
              윈드 물류 전문가가 24시간 이내에 답변을 드립니다.
            </p>
          </div>
          <Link
            to="/inquiry"
            className="bg-black text-white px-10 py-4 text-sm tracking-widest hover:bg-neutral-900 transition-colors shrink-0"
          >
            문의하기
          </Link>
        </div>
      </section>
    </>
  );
}
