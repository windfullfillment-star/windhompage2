export interface Inquiry {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  is_private: boolean;
  password_hash?: string;
}

export interface HeroSlide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
}
