import { cn } from '@/lib/utils';
import { Section } from '@/components/Section';
import { SEO } from '@/components/SEO';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Search, Plus, ChevronRight, Check, X } from 'lucide-react';

interface Inquiry {
  id: string;
  title: string;
  author: string;
  company_name?: string;
  contact?: string;
  email?: string;
  content: string;
  created_at: string;
  is_private: boolean;
  status: string;
  reply_content?: string;
  password?: string;
}

export function InquiryPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inquiries')
        .select('id, title, author, email, content, created_at, is_private, status, reply_content, password')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (inquiry: Inquiry) => {
    if (selectedInquiry?.id === inquiry.id) {
       setSelectedInquiry(null);
       return;
    }
    setSelectedInquiry(inquiry);
    setPasswordInput('');
    setPasswordError('');
    
    // DB의 자료형 불일치 또는 잘못 저장된 예외 케이스 방어
    const isStrictlyPrivate = 
      inquiry.is_private === true || 
      String(inquiry.is_private) === 'true' || 
      (inquiry.password && inquiry.password.trim() !== '' ? true : false);
      
    setPasswordVerified(!isStrictlyPrivate);
  };

  const [formData, setFormData] = useState({
    author: '',
    company_name: '',
    contact: '',
    email: '',
    password: '',
    title: '',
    content: '',
    is_private: false,
    privacy_agreed: false
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!formData.author || !formData.title || !formData.content) {
      alert('작성자, 제목, 내용을 입력해주세요.');
      return;
    }

    try {
      setSubmitting(true);
      
      const mergedContent = `[업체명: ${formData.company_name || '미입력'}]\n[연락처: ${formData.contact || '미입력'}]\n\n${formData.content}`;
      
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          author: formData.author,
          email: formData.email,
          password: formData.is_private ? formData.password : null,
          title: formData.title,
          content: mergedContent,
          is_private: formData.is_private,
          status: '신규',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      alert('문의가 접수되었습니다.');
      setIsModalOpen(false);
      setFormData({
        author: '',
        company_name: '',
        contact: '',
        email: '',
        password: '',
        title: '',
        content: '',
        is_private: false,
        privacy_agreed: false
      });
      fetchInquiries();
    } catch (err: any) {
      console.error('Error saving inquiry:', err);
      alert('저장 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="고객문의" />
      
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[300px] bg-gray-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=2000"
          alt="Inquiry Hero"
          className="w-full h-full object-cover opacity-40 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl tracking-tighter text-white mb-4"
          >
            INQUIRY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 font-light"
          >
            윈드는 언제나 여러분의 목소리에 귀를 기울입니다.
          </motion.p>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h3 className="text-2xl tracking-tight">문의 게시판</h3>
              <p className="text-sm text-gray-400 mt-1">총 {inquiries.length}건의 문의가 있습니다.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white px-8 py-3 text-sm flex items-center space-x-2 hover:bg-gray-800 transition-colors"
            >
              <Plus size={18} />
              <span>문의하기</span>
            </button>
          </div>

          {/* List */}
          <div className="border-t border-black">
            {loading ? (
              <div className="py-20 text-center text-gray-400">불러오는 중...</div>
            ) : inquiries.length === 0 ? (
              <div className="py-20 text-center text-gray-400">등록된 문의가 없습니다.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id}>
                    <div
                      onClick={() => handleRowClick(inquiry)}
                      className="group flex items-center justify-between py-6 px-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-4 flex-grow min-w-0">
                        <span className="text-xs font-mono text-gray-300 w-8">{inquiry.id.slice(0, 2)}</span>
                        <div className="flex items-center space-x-2 min-w-0">
                          {inquiry.is_private && <Lock size={14} className="text-gray-400 flex-shrink-0" />}
                          <h4 className="text-sm md:text-base truncate group-hover:text-black transition-colors">
                            {inquiry.title}
                          </h4>
                          {/* [확인] 답변 상태 배지 추가 */}
                          <span className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full ml-2",
                            inquiry.status === '답변완료' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          )}>
                            {inquiry.status || '확인중'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-8 text-xs text-gray-400 ml-4 flex-shrink-0">
                        <span className="hidden sm:inline">{inquiry.author}</span>
                        <span className="hidden sm:inline">{new Date(inquiry.created_at).toLocaleDateString()}</span>
                        <ChevronRight size={16} className={cn("transition-transform", selectedInquiry?.id === inquiry.id ? "rotate-90" : "text-gray-200 group-hover:text-black")} />
                      </div>
                    </div>
                    
                    {/* [추가] 상세 내용 및 관리자 답변 영역 */}
                    {selectedInquiry?.id === inquiry.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-gray-50 p-6 md:p-8 space-y-6 overflow-hidden"
                      >
                        {!passwordVerified ? (
                           <div className="space-y-4 max-w-sm">
                             <div className="flex items-center space-x-2 text-gray-700">
                               <Lock size={16} />
                               <span className="text-sm font-medium">비밀글입니다. 비밀번호를 입력해주세요.</span>
                             </div>
                             <div className="flex items-center space-x-2">
                               <input
                                 type="password"
                                 value={passwordInput}
                                 onChange={(e) => setPasswordInput(e.target.value)}
                                 onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                     if (passwordInput === inquiry.password) {
                                       setPasswordVerified(true);
                                       setPasswordError('');
                                     } else {
                                       setPasswordError('비밀번호가 일치하지 않습니다.');
                                     }
                                   }
                                 }}
                                 className="flex-grow border-b border-gray-200 py-2 focus:border-black outline-none transition-colors text-sm"
                                 placeholder="비밀번호"
                                 autoFocus
                               />
                               <button
                                 onClick={() => {
                                   if (passwordInput === inquiry.password) {
                                     setPasswordVerified(true);
                                     setPasswordError('');
                                   } else {
                                     setPasswordError('비밀번호가 일치하지 않습니다.');
                                   }
                                 }}
                                 type="button"
                                 className="bg-black text-white px-4 py-2 text-xs"
                               >
                                 확인
                               </button>
                             </div>
                             {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                           </div>
                        ) : (
                           <>
                             <div className="space-y-2">
                               <p className="text-xs text-gray-400">질문 내용</p>
                               <p className="text-sm leading-relaxed whitespace-pre-wrap">{inquiry.content}</p>
                             </div>
                             
                             {inquiry.reply_content ? (
                               <div className="mt-6 pt-6 border-t border-gray-200">
                                 <div className="flex items-center space-x-2 mb-3">
                                   <span className="bg-black text-white text-[10px] px-2 py-0.5 uppercase tracking-widest">Wind Reply</span>
                                 </div>
                                 <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700 bg-white p-4 border border-gray-100 shadow-sm">
                                   {inquiry.reply_content}
                                 </p>
                               </div>
                             ) : (
                               <div className="mt-6 pt-6 border-t border-gray-200">
                                 <p className="text-xs text-gray-400 italic">담당자가 내용을 확인하고 있습니다. 빠른 시일 내에 답변 드리겠습니다.</p>
                               </div>
                             )}
                           </>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-12 flex justify-center space-x-2">
             {[1, 2, 3].map(n => (
               <button key={n} className={cn("w-8 h-8 text-xs border", n === 1 ? "bg-black text-white border-black" : "border-gray-200 text-gray-400")}>
                 {n}
               </button>
             ))}
          </div>
        </div>
      </Section>

      {/* Write Modal [수정] */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl p-8 md:p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
               <Plus size={24} className="rotate-45" />
            </button>
            <h3 className="text-2xl mb-8 tracking-tight">문의 작성</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
               {/* 업체명 및 작성자 [추가/수정] */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">업체명</label>
                    <input 
                      type="text" 
                      required
                      value={formData.company_name}
                      onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                      className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors" 
                      placeholder="회사명을 입력해주세요"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">작성자 (성함)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors" 
                      placeholder="성함을 입력해주세요"
                    />
                  </div>
               </div>

               {/* 연락처 및 이메일 [추가] */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">연락처</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors" 
                      placeholder="010-0000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400">이메일</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors" 
                      placeholder="example@email.com"
                    />
                  </div>
               </div>

               {/* 비밀글 체크 시에만 비밀번호 입력란 표시 */}
               <AnimatePresence>
                 {formData.is_private && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }} 
                     animate={{ opacity: 1, height: 'auto' }} 
                     exit={{ opacity: 0, height: 0 }}
                     className="space-y-2 overflow-hidden"
                   >
                     <label className="text-xs uppercase tracking-widest text-gray-400">비밀번호</label>
                     <input 
                       type="password" 
                       required={formData.is_private}
                       value={formData.password}
                       onChange={(e) => setFormData({...formData, password: e.target.value})}
                       placeholder="비밀글 열람용 (4자리 이상 필수)" 
                       className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors" 
                     />
                   </motion.div>
                 )}
               </AnimatePresence>

               <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">제목</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400">내용</label>
                  <textarea 
                    rows={5} 
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full border border-gray-200 p-4 focus:border-black outline-none transition-colors resize-none" 
                  />
               </div>
               <div className="flex flex-col space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setFormData({...formData, privacy_agreed: !formData.privacy_agreed})}>
                       <div className={cn(
                         "w-5 h-5 border rounded flex items-center justify-center transition-colors",
                         formData.privacy_agreed ? "bg-black border-black" : "border-gray-300 group-hover:border-black"
                       )}>
                         {formData.privacy_agreed && <Check size={12} className="text-white" />}
                       </div>
                       <span className="text-sm font-medium">개인정보 수집 및 이용 동의 (필수)</span>
                    </div>
                  </div>
                  <div className="h-24 overflow-y-auto bg-gray-50 p-4 text-[10px] text-gray-400 leading-relaxed border border-gray-100 rounded font-light">
                    <p className="mb-2 text-gray-600 font-medium">1. 수집하는 개인정보 항목</p>
                    <p className="mb-2">회사명, 작성자명, 연락처, 이메일 주소</p>
                    <p className="mb-2 text-gray-600 font-medium">2. 수집 및 이용목적</p>
                    <p className="mb-2">물류 상담 제공 및 안내, 서비스 관련 공지</p>
                    <p className="mb-2 text-gray-600 font-medium">3. 보유 및 이용기간</p>
                    <p>목적 달성 후 즉시 파기 (단, 관계 법령에 따라 보존 필요 시 해당 기간 보관)</p>
                  </div>
               </div>

               <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="private" 
                    className="accent-black w-4 h-4 cursor-pointer" 
                    checked={formData.is_private}
                    onChange={(e) => setFormData({...formData, is_private: e.target.checked})}
                  />
                  <label htmlFor="private" className="text-sm text-gray-500 cursor-pointer">비밀글로 작성</label>
               </div>
               <button 
                type="submit"
                disabled={submitting || !formData.privacy_agreed}
                className="w-full bg-black text-white py-5 tracking-widest hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
               >
                  {submitting ? '등록 중...' : '등록하기'}
               </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

