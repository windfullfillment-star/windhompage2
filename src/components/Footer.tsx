import { ChevronsRight, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="flex items-center">
              <img
                src="/windhompage2/WINDLOGO.png"
                alt="WIND"
                className="h-12 md:h-14 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md font-light">
              소수 고객사 집중 운영과 소통 중심의 3PL 전문 물류 기업 윈드(Wind)입니다.
              고객사의 성장이 곧 우리의 성장이라는 믿음으로 최선을 다합니다.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.youtube.com/watch?v=fAxA_OGOYgA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF0000] transition-colors group"
                title="YouTube"
              >
                <Youtube size={20} className="text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://blog.naver.com/s106m"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#03C75A] transition-colors group"
                title="네이버 블로그"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
                </svg>
              </a>
              <a
                href="https://open.kakao.com/o/g8gefIvf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FEE500] transition-colors group"
                title="카카오톡 오픈채팅"
              >
                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white group-hover:fill-black group-hover:scale-110 transition-all" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.868 1.836 5.38 4.636 6.88.232.124.364.38.296.632l-.92 3.44c-.068.252.204.452.428.324l3.96-2.604c.18-.116.4-.144.596-.084 1.144.336 2.372.512 3.648.512 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[13px] text-gray-500 font-light">
            <div className="space-y-3">
              <p><span className="text-gray-300 mr-2">상호명</span> (주)윈드</p>
              <p><span className="text-gray-300 mr-2">대표자</span> 김현기</p>
              <p><span className="text-gray-300 mr-2">사업자번호</span> 728-81-02861</p>
              <p><span className="text-gray-300 mr-2">본사</span> 경기도 김포시 대곶면 대곶남로 307, 2층</p>
            </div>
            <div className="space-y-3">
              <p><span className="text-gray-300 mr-2">TEL</span> 010-9011-5002</p>
              <p><span className="text-gray-300 mr-2">EMAIL</span> hkkim@windl.co.kr</p>
              <p className="pt-4 text-gray-600">© {new Date().getFullYear()} (주)윈드. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
