-- تفعيل الإضافات اللازمة
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. جدول المستخدمين والصلاحيات (Profiles & RBAC)
CREATE TYPE user_role AS ENUM ('customer', 'trip_leader', 'finance', 'marketing', 'admin');

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'customer'::user_role NOT NULL,
  referral_code TEXT UNIQUE,
  total_bookings INT DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. جدول التصنيفات (Categories)
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- 3. جدول الرحلات والتجارب (Experiences)
CREATE TABLE public.experiences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  subtitle_ar TEXT,
  subtitle_en TEXT,
  description_ar TEXT,
  description_en TEXT,
  price_egp DECIMAL(10,2) NOT NULL,
  service_fee_egp DECIMAL(10,2) DEFAULT 15.00,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  meeting_point_ar TEXT NOT NULL,
  meeting_point_en TEXT NOT NULL,
  includes_ar TEXT[] DEFAULT '{}',
  includes_en TEXT[] DEFAULT '{}',
  total_seats INT NOT NULL DEFAULT 40,
  available_seats INT NOT NULL DEFAULT 40,
  trip_leaders TEXT DEFAULT 'Dalia & Rania',
  cover_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 4.9,
  reviews_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. جدول الحجوزات (Bookings)
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE payment_method_type AS ENUM ('card_meza', 'bank_transfer', 'vodafone_cash');

CREATE TABLE public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_number TEXT UNIQUE NOT NULL, -- مثال: LOE-20241012-0015
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE RESTRICT NOT NULL,
  attendee_name TEXT NOT NULL,
  attendee_phone TEXT NOT NULL,
  attendee_email TEXT,
  special_requests TEXT,
  seats_count INT NOT NULL DEFAULT 1 CHECK (seats_count > 0),
  subtotal_egp DECIMAL(10,2) NOT NULL,
  service_fee_egp DECIMAL(10,2) NOT NULL DEFAULT 15.00,
  total_egp DECIMAL(10,2) NOT NULL,
  payment_method payment_method_type NOT NULL,
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'pending_verification', 'paid', 'refunded')),
  receipt_url TEXT,
  status booking_status DEFAULT 'pending'::booking_status NOT NULL,
  source_channel TEXT DEFAULT 'direct', -- Facebook, Instagram, Direct, Google, WhatsApp
  qr_code_payload TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- تفعيل حماية الجداول (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة للرحلات والتصنيفات
CREATE POLICY "Allow public read on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read on experiences" ON public.experiences FOR SELECT USING (true);

-- سياسات الحجوزات للعميلة
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create a booking" ON public.bookings
  FOR INSERT WITH CHECK (true);
