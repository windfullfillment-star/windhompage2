import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
}

export function SEO({
  title = '윈드(Wind) - 3PL/2PL 물류 전문 기업',
  description = '소수 고객사 집중 운영과 소통 중심의 3PL/2PL 전문 물류 기업 윈드(Wind) 공식 홈페이지입니다.',
  ogImage = 'https://picsum.photos/seed/wind-logistics/1200/630',
  ogUrl = 'https://windl.co.kr',
}: SEOProps) {
  const fullTitle = `${title} | WIND`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
