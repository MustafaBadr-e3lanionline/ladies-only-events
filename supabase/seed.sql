INSERT INTO public.categories (slug, name_ar, name_en, icon_name, image_url, sort_order) VALUES
('day-trips', 'رحلات اليوم الواحد', 'Day Trips', 'Mountain', '/images/cats/day-trips.jpg', 1),
('beach-getaways', 'مصايف وشواطئ', 'Beach Getaways', 'Palmtree', '/images/cats/beach.jpg', 2),
('cultural-tours', 'جولات ثقافية', 'Cultural Tours', 'Landmark', '/images/cats/cultural.jpg', 3),
('special-events', 'إيفنتات خاصة', 'Special Events', 'Heart', '/images/cats/events.jpg', 4),
('workshops', 'ورش عمل', 'Workshops', 'Sparkles', '/images/cats/workshops.jpg', 5),
('community', 'مجتمع السيدات', 'Ladies Community', 'Users', '/images/cats/community.jpg', 6);

INSERT INTO public.experiences (
  slug, title_ar, title_en, subtitle_ar, subtitle_en, price_egp, service_fee_egp,
  event_date, start_time, end_time, meeting_point_ar, meeting_point_en,
  includes_ar, includes_en, total_seats, available_seats, cover_image, rating, reviews_count, is_featured
) VALUES
(
  'ain-sokhna-day-trip',
  'رحلة العين السخنة',
  'Ain Sokhna Day Trip',
  'رحلة العين السخنة - يوم ممتع على البحر',
  'Ain Sokhna Day Trip - A Relaxing Day by the Sea',
  750.00, 15.00, '2026-11-14', '06:00', '20:00',
  'القاهرة الجديدة (نقطة التجمع)', 'New Cairo (Meeting Point)',
  ARRAY['الانتقالات ذهاب وعودة', 'دخول الشاطئ وحمام السباحة', 'وجبة الغداء'],
  ARRAY['Transportation', 'Beach Access', 'Lunch'],
  40, 12, '/images/trips/sokhna.jpg', 4.9, 128, true
),
(
  'dahab-getaway',
  'دهب',
  'Dahab Getaway',
  'مغامرة واستجمام في سحر دهب',
  'Adventure & Relaxation in Magical Dahab',
  1450.00, 15.00, '2026-11-25', '05:00', '22:00',
  'ميدان عبد المنعم رياض / التجمع', 'Tahrir / New Cairo',
  ARRAY['الانتقالات بباصات حديثة', 'الإقامة والانتقالات الداخلية', 'رحلة يخت وسفاري'],
  ARRAY['Modern Bus Transport', 'Accommodation', 'Yacht & Safari'],
  30, 8, '/images/trips/dahab.jpg', 4.9, 94, true
),
(
  'alexandria-tour',
  'جولة الإسكندرية',
  'Alexandria Tour',
  'عروس البحر المتوسط وتاريخها الساحر',
  'Bride of the Mediterranean & Cultural Gems',
  600.00, 15.00, '2026-12-02', '06:30', '21:00',
  'القاهرة الجديدة / المهندسين', 'New Cairo / Mohandessin',
  ARRAY['الانتقالات', 'دخول المزارات', 'فطار وإفطار على البحر'],
  ARRAY['Transportation', 'Tickets', 'Sea View Breakfast'],
  40, 15, '/images/trips/alex.jpg', 4.8, 76, true
),
(
  'fayoum-oasis-trip',
  'رحلة الفيوم',
  'Fayoum Oasis',
  'شلالات وادي الريان والتزحلق على الرمال',
  'Wadi El Rayan Waterfalls & Sandboarding',
  700.00, 15.00, '2026-12-08', '07:00', '19:00',
  'الشيخ زايد / القاهرة الجديدة', 'Sheikh Zayed / New Cairo',
  ARRAY['الانتقالات', 'سيارات دفع رباعي 4x4', 'فلوكة وغداء بدوي'],
  ARRAY['Transportation', '4x4 Safari', 'Felucca & Bedouin Lunch'],
  35, 10, '/images/trips/fayoum.jpg', 4.9, 112, true
);
