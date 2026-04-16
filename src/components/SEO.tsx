import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

const BASE_URL = 'https://windl.co.kr';
const DEFAULT_OG_IMAGE = `${BASE_URL}/WINDLOGO.png`;

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '주식회사 윈드',
  alternateName: 'Wind Logistics',
  url: BASE_URL,
  logo: DEFAULT_OG_IMAGE,
  image: DEFAULT_OG_IMAGE,
  description: '소수 고객사 집중 운영과 소통 중심의 3PL/2PL 전문 물류 기업',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '대곶면 대곶남로 307, 2층',
    addressLocality: '김포시',
    addressRegion: '경기도',
    postalCode: '10020',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.641,
    longitude: 126.584,
  },
  telephone: '010-9011-5002',
  email: 'hkkim@windl.co.kr',
  areaServed: 'KR',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '물류 서비스',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '입고(Inbound) 서비스' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '보관(Storage) 서비스' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '택배출고(Parcel) 서비스' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'B2B출고 서비스' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WMS IT 서비스' } },
    ],
  },
  sameAs: [
    'https://www.youtube.com/watch?v=fAxA_OGOYgA',
    'https://blog.naver.com/s106m',
  ],
};

export function SEO({
  title = '윈드(Wind) - 3PL/2PL 물류 전문 기업',
  description = '소수 고객사 집중 운영과 소통 중심의 3PL/2PL 전문 물류 기업 윈드(Wind) 공식 홈페이지입니다. 입고, 보관, 택배출고, B2B출고, WMS 서비스를 제공합니다.',
  keywords = '3PL, 2PL, 물류대행, 풀필먼트, 택배출고, 보관, 입고, B2B출고, WMS, 경기도 김포 물류, 윈드, 주식회사 윈드, 물류기업, 물류센터',
  ogImage = DEFAULT_OG_IMAGE,
  ogUrl = BASE_URL,
  canonical,
}: SEOProps) {
  const fullTitle = `${title} | WIND`;
  const canonicalUrl = canonical || ogUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="윈드(Wind) 물류" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={ogUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD 구조화 데이터 */}
      <script type="application/ld+json">
        {JSON.stringify(LOCAL_BUSINESS_SCHEMA)}
      </script>
    </Helmet>
  );
}
