// Language Translations
const translations = {
  en: {
    nav: {
      home: 'Home',
      experience: 'Experience',
      accommodations: 'Accommodations',
      amenities: 'Amenities',
      gallery: 'Gallery',
      location: 'Location',
      contact: 'Contact',
      reserve: 'Reserve Now'
    },
    hero: {
      welcome: 'WELCOME TO',
      title1: 'ADA BUNGALOW',
      title2: 'UZUNGÖL',
      description: 'Where Alpine Elegance Meets Black Sea Tranquility',
      explore: 'Explore',
      book: 'Book Your Stay',
      scroll: 'Scroll to discover'
    },
    experience: {
      subtitle: 'THE EXPERIENCE',
      title: 'A Sanctuary Above the Clouds',
      description: 'Perched at 1,090 meters above sea level, Ada Bungalow offers an exclusive retreat where luxury harmonizes with nature\'s grandeur. Our carefully crafted bungalows provide an intimate escape into the heart of Uzungöl\'s mystical landscape.',
      features: {
        bungalows: 'Luxury Bungalows',
        elevation: 'Above Sea Level',
        views: 'Mountain Views'
      }
    },
    accommodations: {
      subtitle: 'ACCOMMODATIONS',
      title: 'Refined Alpine Living',
      exploreSuite: 'Explore Suite',
      from: 'From',
      perNight: 'per night',
      deluxe: {
        title: 'Deluxe Bungalow',
        description: 'Intimate luxury with panoramic lake views, featuring handcrafted furnishings and a private terrace overlooking the pristine waters.',
        features: ['45 m² living space', 'Lake view terrace', 'King-size bed', 'Rainfall shower']
      },
      premium: {
        title: 'Premium Suite',
        description: 'Spacious elegance with separate living area, fully equipped kitchen, and expansive mountain views from every window.',
        features: ['65 m² living space', 'Full kitchen', 'Fireplace', 'Jacuzzi bath']
      },
      signature: {
        title: 'Signature Villa',
        description: 'The pinnacle of alpine luxury with two bedrooms, private sauna, and wraparound terrace offering 360-degree panoramic views.',
        features: ['95 m² living space', 'Private sauna', '2 bedrooms', 'Butler service']
      }
    },
    amenities: {
      subtitle: 'AMENITIES',
      title: 'Curated for Perfection',
      gourmet: {
        title: 'Gourmet Dining',
        description: 'Savor authentic Black Sea cuisine crafted by our master chefs, featuring locally-sourced ingredients and traditional recipes elevated to fine dining standards.'
      },
      concierge: {
        title: 'Concierge Service',
        description: 'Our dedicated concierge team ensures every detail of your stay is flawless, from private tours to helicopter transfers and bespoke experiences.'
      },
      wellness: {
        title: 'Wellness Retreat',
        description: 'Rejuvenate in our spa sanctuary with traditional hammam, therapeutic massages, and yoga sessions overlooking the serene alpine lake.'
      },
      adventure: {
        title: 'Adventure Curated',
        description: 'Explore Uzungöl\'s pristine wilderness with guided hiking trails, private boat tours, and exclusive access to hidden viewpoints and untouched plateaus.'
      },
      events: {
        title: 'Private Events',
        description: 'Host unforgettable celebrations in our exclusive venues, from intimate gatherings to grand occasions with the dramatic alpine backdrop.'
      },
      culture: {
        title: 'Cultural Immersion',
        description: 'Experience authentic Black Sea culture through private tea ceremonies, traditional music performances, and artisan craft workshops.'
      }
    },
    gallery: {
      subtitle: 'GALLERY',
      title: 'Visual Poetry of Nature',
      viewFull: 'View Full Gallery',
      captions: {
        mist: 'Morning Mist',
        interiors: 'Refined Interiors',
        alpine: 'Alpine Majesty',
        dining: 'Culinary Excellence',
        wellness: 'Wellness Sanctuary',
        activities: 'Adventure Awaits'
      }
    },
    testimonials: {
      subtitle: 'TESTIMONIALS',
      title: 'Voices of Excellence',
      reviews: [
        {
          text: 'An extraordinary retreat that exceeded every expectation. The seamless blend of luxury and nature, coupled with impeccable service, created memories that will last a lifetime.',
          author: 'Alexander Laurent',
          title: 'CEO, Laurent Holdings'
        },
        {
          text: 'Ada Bungalow is not just accommodation; it\'s a transformative experience. The attention to detail, from the architecture to the cuisine, reflects a deep commitment to excellence.',
          author: 'Sophia Chen',
          title: 'Travel Journalist, Condé Nast'
        },
        {
          text: 'The perfect harmony of Turkish hospitality and alpine luxury. Every sunrise from our bungalow terrace was a masterpiece, and the staff anticipated our every need.',
          author: 'Prince Abdullah',
          title: 'Royal Family of Saudi Arabia'
        }
      ]
    },
    location: {
      subtitle: 'LOCATION',
      title: 'Gateway to Paradise',
      description: 'Nestled in the heart of Turkey\'s Eastern Black Sea region, Ada Bungalow is perfectly positioned to offer both seclusion and accessibility. Just 96 kilometers from Trabzon Airport, our retreat serves as your gateway to the mystical beauty of Uzungöl.',
      details: {
        airport: {
          title: 'From Trabzon Airport',
          description: '90 minutes by private transfer\nHelicopter service available'
        },
        coordinates: {
          title: 'Coordinates',
          description: '40.6203° N, 40.2923° E\nElevation: 1,090m'
        },
        nearby: {
          title: 'Nearby Attractions',
          description: 'Uzungöl Lake: 5 min walk\nSoğanlı Valley: 15 min drive'
        }
      },
      directions: 'Get Directions'
    },
    contact: {
      title: 'Begin Your Journey',
      description: 'Let us craft your perfect alpine escape. Our reservation team is available 24/7 to assist with your inquiries and create a bespoke experience tailored to your desires.',
      labels: {
        reservations: 'Reservations',
        concierge: 'Concierge',
        address: 'Address'
      },
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        dates: 'Preferred Dates',
        room: 'Select Accommodation',
        message: 'Special Requests',
        submit: 'Send Reservation Request'
      }
    },
    footer: {
      tagline: 'Where Alpine Elegance Meets Black Sea Tranquility',
      discover: 'Discover',
      experience: 'Experience',
      connect: 'Connect',
      links: {
        accommodations: 'Accommodations',
        amenities: 'Amenities',
        gallery: 'Gallery',
        location: 'Location',
        dining: 'Dining',
        wellness: 'Wellness',
        activities: 'Activities',
        events: 'Events',
        reservations: 'Reservations',
        contact: 'Contact',
        press: 'Press',
        careers: 'Careers'
      },
      legal: {
        rights: '© 2024 Ada Bungalow Uzungöl. All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      }
    }
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      experience: 'Deneyim',
      accommodations: 'Konaklama',
      amenities: 'Olanaklar',
      gallery: 'Galeri',
      location: 'Konum',
      contact: 'İletişim',
      reserve: 'Rezervasyon Yap'
    },
    hero: {
      welcome: 'HOŞ GELDİNİZ',
      title1: 'ADA BUNGALOW',
      title2: 'UZUNGÖL',
      description: 'Alp Zarafeti ile Karadeniz Huzurunun Buluştuğu Yer',
      explore: 'Keşfet',
      book: 'Rezervasyon Yap',
      scroll: 'Keşfetmek için kaydırın'
    },
    experience: {
      subtitle: 'DENEYİM',
      title: 'Bulutların Üzerinde Bir Sığınak',
      description: 'Deniz seviyesinden 1.090 metre yükseklikte konumlanan Ada Bungalow, lüksün doğanın ihtişamıyla uyum içinde olduğu özel bir dinlenme yeri sunuyor. Özenle tasarlanmış bungalovlarımız, Uzungöl\'ün mistik manzarasının kalbinde samimi bir kaçış sağlıyor.',
      features: {
        bungalows: 'Lüks Bungalov',
        elevation: 'Deniz Seviyesinden',
        views: 'Dağ Manzarası'
      }
    },
    accommodations: {
      subtitle: 'KONAKLAMA',
      title: 'Rafine Alp Yaşamı',
      exploreSuite: 'Süiti Keşfet',
      from: 'Başlangıç',
      perNight: 'gecelik',
      deluxe: {
        title: 'Deluxe Bungalov',
        description: 'El yapımı mobilyalar ve kristal berraklığındaki sulara bakan özel terasıyla panoramik göl manzaralı samimi lüks.',
        features: ['45 m² yaşam alanı', 'Göl manzaralı teras', 'King size yatak', 'Yağmur duşu']
      },
      premium: {
        title: 'Premium Süit',
        description: 'Ayrı oturma alanı, tam donanımlı mutfak ve her pencereden geniş dağ manzarası ile geniş zarafet.',
        features: ['65 m² yaşam alanı', 'Tam mutfak', 'Şömine', 'Jakuzi']
      },
      signature: {
        title: 'Signature Villa',
        description: 'İki yatak odası, özel sauna ve 360 derece panoramik manzara sunan sarma teras ile alp lüksünün zirvesi.',
        features: ['95 m² yaşam alanı', 'Özel sauna', '2 yatak odası', 'Kişisel hizmet']
      }
    },
    amenities: {
      subtitle: 'OLANAKLAR',
      title: 'Mükemmellik İçin Tasarlandı',
      gourmet: {
        title: 'Gurme Mutfak',
        description: 'Usta şeflerimiz tarafından hazırlanan, yerel kaynaklı malzemeler ve geleneksel tariflerle yükseltilmiş otantik Karadeniz mutfağının tadını çıkarın.'
      },
      concierge: {
        title: 'Concierge Hizmeti',
        description: 'Özel concierge ekibimiz, özel turlardan helikopter transferlerine ve kişiye özel deneyimlere kadar konaklamanızın her detayının kusursuz olmasını sağlar.'
      },
      wellness: {
        title: 'Wellness Merkezi',
        description: 'Geleneksel hamam, terapötik masajlar ve sakin alp gölüne bakan yoga seansları ile spa cennetimizde yenilenin.'
      },
      adventure: {
        title: 'Macera Rehberliği',
        description: 'Rehberli yürüyüş parkurları, özel tekne turları ve gizli manzara noktalarına özel erişim ile Uzungöl\'ün el değmemiş vahşi doğasını keşfedin.'
      },
      events: {
        title: 'Özel Etkinlikler',
        description: 'Dramatik alp manzarası eşliğinde samimi toplantılardan büyük kutlamalara kadar unutulmaz etkinliklere ev sahipliği yapın.'
      },
      culture: {
        title: 'Kültürel Deneyim',
        description: 'Özel çay seremonileri, geleneksel müzik performansları ve zanaat atölyeleri ile otantik Karadeniz kültürünü deneyimleyin.'
      }
    },
    gallery: {
      subtitle: 'GALERİ',
      title: 'Doğanın Görsel Şiiri',
      viewFull: 'Tüm Galeriyi Görüntüle',
      captions: {
        mist: 'Sabah Sisi',
        interiors: 'Zarif İç Mekanlar',
        alpine: 'Alp İhtişamı',
        dining: 'Mutfak Mükemmelliği',
        wellness: 'Wellness Cenneti',
        activities: 'Macera Bekliyor'
      }
    },
    testimonials: {
      subtitle: 'MİSAFİR YORUMLARI',
      title: 'Mükemmelliğin Sesleri',
      reviews: [
        {
          text: 'Her beklentiyi aşan olağanüstü bir dinlenme yeri. Lüks ve doğanın kusursuz uyumu, kusursuz hizmetle birleşince ömür boyu sürecek anılar yarattı.',
          author: 'Alexander Laurent',
          title: 'CEO, Laurent Holdings'
        },
        {
          text: 'Ada Bungalow sadece bir konaklama değil; dönüştürücü bir deneyim. Mimariden mutfağa kadar detaylara gösterilen özen, mükemmelliğe derin bir bağlılığı yansıtıyor.',
          author: 'Sophia Chen',
          title: 'Seyahat Yazarı, Condé Nast'
        },
        {
          text: 'Türk misafirperverliği ve alp lüksünün mükemmel uyumu. Bungalov terasımızdan her gün doğumu bir başyapıttı ve personel her ihtiyacımızı önceden tahmin etti.',
          author: 'Prens Abdullah',
          title: 'Suudi Arabistan Kraliyet Ailesi'
        }
      ]
    },
    location: {
      subtitle: 'KONUM',
      title: 'Cennete Açılan Kapı',
      description: 'Türkiye\'nin Doğu Karadeniz bölgesinin kalbinde yer alan Ada Bungalow, hem inziva hem de erişilebilirlik sunmak için mükemmel konumda. Trabzon Havalimanı\'na sadece 96 kilometre uzaklıkta olan tesisimiz, Uzungöl\'ün mistik güzelliğine açılan kapınız.',
      details: {
        airport: {
          title: 'Trabzon Havalimanı\'ndan',
          description: 'Özel transferle 90 dakika\nHelikopter servisi mevcut'
        },
        coordinates: {
          title: 'Koordinatlar',
          description: '40.6203° K, 40.2923° D\nRakım: 1.090m'
        },
        nearby: {
          title: 'Yakın Çevre',
          description: 'Uzungöl Gölü: 5 dk yürüyüş\nSoğanlı Vadisi: 15 dk araç'
        }
      },
      directions: 'Yol Tarifi Al'
    },
    contact: {
      title: 'Yolculuğunuza Başlayın',
      description: 'Mükemmel alp kaçışınızı sizin için tasarlayalım. Rezervasyon ekibimiz, sorularınızda size yardımcı olmak ve arzularınıza göre özel bir deneyim yaratmak için 7/24 hizmetinizde.',
      labels: {
        reservations: 'Rezervasyon',
        concierge: 'Concierge',
        address: 'Adres'
      },
      form: {
        name: 'Ad Soyad',
        email: 'E-posta Adresi',
        phone: 'Telefon Numarası',
        dates: 'Tercih Edilen Tarihler',
        room: 'Konaklama Seçin',
        message: 'Özel İstekler',
        submit: 'Rezervasyon Talebi Gönder'
      }
    },
    footer: {
      tagline: 'Alp Zarafeti ile Karadeniz Huzurunun Buluştuğu Yer',
      discover: 'Keşfet',
      experience: 'Deneyim',
      connect: 'İletişim',
      links: {
        accommodations: 'Konaklama',
        amenities: 'Olanaklar',
        gallery: 'Galeri',
        location: 'Konum',
        dining: 'Yemek',
        wellness: 'Wellness',
        activities: 'Aktiviteler',
        events: 'Etkinlikler',
        reservations: 'Rezervasyon',
        contact: 'İletişim',
        press: 'Basın',
        careers: 'Kariyer'
      },
      legal: {
        rights: '© 2024 Ada Bungalow Uzungöl. Tüm hakları saklıdır.',
        privacy: 'Gizlilik Politikası',
        terms: 'Kullanım Şartları'
      }
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      experience: 'التجربة',
      accommodations: 'الإقامة',
      amenities: 'المرافق',
      gallery: 'المعرض',
      location: 'الموقع',
      contact: 'اتصل بنا',
      reserve: 'احجز الآن'
    },
    hero: {
      welcome: 'مرحباً بكم في',
      title1: 'آدا بنغالو',
      title2: 'أوزنجول',
      description: 'حيث تلتقي أناقة جبال الألب مع هدوء البحر الأسود',
      explore: 'استكشف',
      book: 'احجز إقامتك',
      scroll: 'اسحب للاستكشاف'
    },
    experience: {
      subtitle: 'التجربة',
      title: 'ملاذ فوق السحاب',
      description: 'يقع آدا بنغالو على ارتفاع 1090 متر فوق مستوى سطح البحر، ويوفر ملاذاً حصرياً حيث تتناغم الفخامة مع روعة الطبيعة. توفر أكواخنا المصممة بعناية ملاذاً حميماً في قلب المناظر الطبيعية الساحرة لأوزنجول.',
      features: {
        bungalows: 'أكواخ فاخرة',
        elevation: 'فوق سطح البحر',
        views: 'إطلالات جبلية'
      }
    },
    accommodations: {
      subtitle: 'أماكن الإقامة',
      title: 'حياة جبلية راقية',
      exploreSuite: 'استكشف الجناح',
      from: 'ابتداءً من',
      perNight: 'لليلة الواحدة',
      deluxe: {
        title: 'كوخ ديلوكس',
        description: 'رفاهية حميمة مع إطلالات بانورامية على البحيرة، وتتميز بأثاث مصنوع يدوياً وشرفة خاصة تطل على المياه النقية.',
        features: ['45 م² مساحة المعيشة', 'شرفة بإطلالة على البحيرة', 'سرير كينج', 'دش مطري']
      },
      premium: {
        title: 'جناح بريميوم',
        description: 'أناقة واسعة مع منطقة معيشة منفصلة ومطبخ مجهز بالكامل وإطلالات جبلية واسعة من كل نافذة.',
        features: ['65 م² مساحة المعيشة', 'مطبخ كامل', 'موقد', 'حمام جاكوزي']
      },
      signature: {
        title: 'فيلا سيجنتشر',
        description: 'قمة الفخامة الجبلية مع غرفتي نوم وساونا خاصة وشرفة محيطة توفر إطلالات بانورامية 360 درجة.',
        features: ['95 م² مساحة المعيشة', 'ساونا خاصة', 'غرفتا نوم', 'خدمة الخادم الشخصي']
      }
    },
    amenities: {
      subtitle: 'المرافق',
      title: 'مصممة للكمال',
      gourmet: {
        title: 'تناول الطعام الفاخر',
        description: 'تذوق مأكولات البحر الأسود الأصيلة التي يعدها طهاتنا المحترفون، والتي تتميز بمكونات محلية المصدر ووصفات تقليدية مرتقية إلى معايير الطعام الفاخر.'
      },
      concierge: {
        title: 'خدمة الكونسيرج',
        description: 'يضمن فريق الكونسيرج المخصص لدينا أن كل تفصيل في إقامتك لا تشوبه شائبة، من الجولات الخاصة إلى نقل الهليكوبتر والتجارب المخصصة.'
      },
      wellness: {
        title: 'منتجع العافية',
        description: 'جدد نشاطك في ملاذ السبا لدينا مع الحمام التركي التقليدي والتدليك العلاجي وجلسات اليوغا المطلة على البحيرة الجبلية الهادئة.'
      },
      adventure: {
        title: 'المغامرة المنسقة',
        description: 'استكشف البرية البكر لأوزنجول مع مسارات المشي لمسافات طويلة الموجهة وجولات القوارب الخاصة والوصول الحصري إلى وجهات النظر المخفية والهضاب البكر.'
      },
      events: {
        title: 'الأحداث الخاصة',
        description: 'استضف احتفالات لا تُنسى في أماكننا الحصرية، من التجمعات الحميمة إلى المناسبات الكبرى مع خلفية جبال الألب الدراماتيكية.'
      },
      culture: {
        title: 'الانغماس الثقافي',
        description: 'اختبر ثقافة البحر الأسود الأصيلة من خلال احتفالات الشاي الخاصة والعروض الموسيقية التقليدية وورش الحرف اليدوية.'
      }
    },
    gallery: {
      subtitle: 'المعرض',
      title: 'الشعر البصري للطبيعة',
      viewFull: 'عرض المعرض الكامل',
      captions: {
        mist: 'ضباب الصباح',
        interiors: 'التصاميم الداخلية الراقية',
        alpine: 'جلال جبال الألب',
        dining: 'التميز في الطهي',
        wellness: 'ملاذ العافية',
        activities: 'المغامرة في انتظارك'
      }
    },
    testimonials: {
      subtitle: 'الشهادات',
      title: 'أصوات التميز',
      reviews: [
        {
          text: 'ملاذ استثنائي تجاوز كل التوقعات. المزج السلس بين الفخامة والطبيعة، إلى جانب الخدمة التي لا تشوبها شائبة، خلق ذكريات ستدوم مدى الحياة.',
          author: 'ألكسندر لوران',
          title: 'الرئيس التنفيذي، لوران القابضة'
        },
        {
          text: 'آدا بنغالو ليس مجرد إقامة؛ إنها تجربة تحويلية. الاهتمام بالتفاصيل، من الهندسة المعمارية إلى المأكولات، يعكس التزاماً عميقاً بالتميز.',
          author: 'صوفيا تشين',
          title: 'صحفية سفر، كوندي ناست'
        },
        {
          text: 'التناغم المثالي بين الضيافة التركية والفخامة الجبلية. كل شروق شمس من شرفة كوخنا كان تحفة فنية، وتوقع الموظفون كل احتياجاتنا.',
          author: 'الأمير عبد الله',
          title: 'العائلة المالكة السعودية'
        }
      ]
    },
    location: {
      subtitle: 'الموقع',
      title: 'بوابة الجنة',
      description: 'يقع آدا بنغالو في قلب منطقة البحر الأسود الشرقية في تركيا، وهو في موقع مثالي لتوفير العزلة وسهولة الوصول. على بعد 96 كيلومتراً فقط من مطار طرابزون، يعمل منتجعنا كبوابة إلى الجمال الساحر لأوزنجول.',
      details: {
        airport: {
          title: 'من مطار طرابزون',
          description: '90 دقيقة بالنقل الخاص\nخدمة الهليكوبتر متاحة'
        },
        coordinates: {
          title: 'الإحداثيات',
          description: '40.6203° شمالاً، 40.2923° شرقاً\nالارتفاع: 1090م'
        },
        nearby: {
          title: 'المعالم القريبة',
          description: 'بحيرة أوزنجول: 5 دقائق سيراً\nوادي سوغانلي: 15 دقيقة بالسيارة'
        }
      },
      directions: 'احصل على الاتجاهات'
    },
    contact: {
      title: 'ابدأ رحلتك',
      description: 'دعنا نصمم لك الهروب الجبلي المثالي. فريق الحجز لدينا متاح على مدار الساعة طوال أيام الأسبوع للمساعدة في استفساراتك وإنشاء تجربة مخصصة مصممة حسب رغباتك.',
      labels: {
        reservations: 'الحجوزات',
        concierge: 'الكونسيرج',
        address: 'العنوان'
      },
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        dates: 'التواريخ المفضلة',
        room: 'اختر الإقامة',
        message: 'طلبات خاصة',
        submit: 'إرسال طلب الحجز'
      }
    },
    footer: {
      tagline: 'حيث تلتقي أناقة جبال الألب مع هدوء البحر الأسود',
      discover: 'اكتشف',
      experience: 'التجربة',
      connect: 'تواصل',
      links: {
        accommodations: 'أماكن الإقامة',
        amenities: 'المرافق',
        gallery: 'المعرض',
        location: 'الموقع',
        dining: 'تناول الطعام',
        wellness: 'العافية',
        activities: 'الأنشطة',
        events: 'الفعاليات',
        reservations: 'الحجوزات',
        contact: 'اتصل بنا',
        press: 'الصحافة',
        careers: 'الوظائف'
      },
      legal: {
        rights: '© 2024 آدا بنغالو أوزنجول. جميع الحقوق محفوظة.',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة'
      }
    }
  }
};

// Language Manager
class LanguageManager {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.init();
  }

  detectLanguage() {
    // Check saved preference first
    const saved = localStorage.getItem('language');
    if (saved && translations[saved]) {
      return saved;
    }

    // Auto-detect from browser/phone language
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Map browser languages to our supported languages
    if (browserLang.startsWith('tr')) return 'tr';
    if (browserLang.startsWith('ar')) return 'ar';
    if (browserLang.startsWith('en')) return 'en';
    
    // Default to English
    return 'en';
  }

  init() {
    this.applyLanguage();
    this.setupLanguageToggle();
  }

  applyLanguage() {
    const t = translations[this.currentLang];
    
    // Update all text elements with data-translate attributes
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.dataset.translate;
      const translation = this.getTranslation(key);
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang;
    
    // Handle RTL for Arabic
    if (this.currentLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }

    // Update language button
    const langBtn = document.querySelector('[data-lang-current]');
    if (langBtn) {
      langBtn.textContent = this.currentLang.toUpperCase();
    }
  }

  getTranslation(key) {
    const keys = key.split('.');
    let translation = translations[this.currentLang];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return null;
      }
    }
    
    return translation;
  }

  setupLanguageToggle() {
    const langToggle = document.querySelector('[data-lang-toggle]');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', () => {
      this.showLanguageMenu();
    });
  }

  showLanguageMenu() {
    const existingMenu = document.querySelector('.language-menu');
    if (existingMenu) existingMenu.remove();
    
    const menu = document.createElement('div');
    menu.className = 'language-menu';
    menu.innerHTML = `
      <div class="language-menu-content">
        <h3>${this.getTranslation('nav.reserve') || 'Select Language'}</h3>
        <div class="language-options">
          <button data-lang="en" ${this.currentLang === 'en' ? 'class="active"' : ''}>
            <span class="flag">🇬🇧</span>
            <span>English</span>
          </button>
          <button data-lang="tr" ${this.currentLang === 'tr' ? 'class="active"' : ''}>
            <span class="flag">🇹🇷</span>
            <span>Türkçe</span>
          </button>
          <button data-lang="ar" ${this.currentLang === 'ar' ? 'class="active"' : ''}>
            <span class="flag">🇸🇦</span>
            <span>العربية</span>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(menu);
    
    setTimeout(() => menu.classList.add('active'), 10);
    
    menu.addEventListener('click', (e) => {
      if (e.target === menu) {
        menu.classList.remove('active');
        setTimeout(() => menu.remove(), 300);
      }
    });
    
    const buttons = menu.querySelectorAll('[data-lang]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.changeLanguage(lang);
        menu.classList.remove('active');
        setTimeout(() => menu.remove(), 300);
      });
    });
  }

  changeLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.applyLanguage();
    this.updateDynamicContent();
  }

  updateDynamicContent() {
    // Update hero section
    const t = translations[this.currentLang];
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = t.hero.welcome;
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = `
        <span class="title-line">${t.hero.title1}</span>
        <span class="title-line">${t.hero.title2}</span>
      `;
    }
    
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) heroDesc.textContent = t.hero.description;
    
    // Update nav links
    document.querySelectorAll('.navbar-nav a').forEach((link, index) => {
      const keys = ['home', 'experience', 'accommodations', 'amenities', 'gallery', 'location', 'contact'];
      if (t.nav[keys[index]]) {
        link.textContent = t.nav[keys[index]];
      }
    });
    
    // Update buttons
    const reserveBtn = document.querySelector('.navbar-actions .btn-primary');
    if (reserveBtn) reserveBtn.textContent = t.nav.reserve;
    
    const exploreBtn = document.querySelector('.hero-actions .btn-outline');
    if (exploreBtn) exploreBtn.textContent = t.hero.explore;
    
    const bookBtn = document.querySelector('.hero-actions .btn-primary');
    if (bookBtn) bookBtn.textContent = t.hero.book;
    
    // Update sections
    this.updateSection('experience', t.experience);
    this.updateSection('accommodations', t.accommodations);
    this.updateSection('amenities', t.amenities);
    this.updateSection('gallery', t.gallery);
    this.updateSection('testimonials', t.testimonials);
    this.updateSection('location', t.location);
    this.updateContact(t.contact);
    this.updateFooter(t.footer);
  }

  updateSection(sectionId, translations) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const subtitle = section.querySelector('.section-subtitle');
    if (subtitle) subtitle.textContent = translations.subtitle;
    
    const title = section.querySelector('.section-title');
    if (title) title.textContent = translations.title;
    
    // Section-specific updates
    if (sectionId === 'experience') {
      const lead = section.querySelector('.lead');
      if (lead) lead.textContent = translations.description;
      
      const features = section.querySelectorAll('.feature-label');
      const featureKeys = ['bungalows', 'elevation', 'views'];
      features.forEach((label, i) => {
        if (translations.features[featureKeys[i]]) {
          label.textContent = translations.features[featureKeys[i]];
        }
      });
    }
    
    if (sectionId === 'accommodations') {
      const rooms = ['deluxe', 'premium', 'signature'];
      rooms.forEach(roomType => {
        const card = section.querySelector(`[data-room="${roomType}"]`);
        if (card && translations[roomType]) {
          const title = card.querySelector('.room-title');
          if (title) title.textContent = translations[roomType].title;
          
          const desc = card.querySelector('.room-description');
          if (desc) desc.textContent = translations[roomType].description;
          
          const features = card.querySelectorAll('.room-features li');
          translations[roomType].features.forEach((feature, i) => {
            if (features[i]) features[i].textContent = feature;
          });
        }
      });
      
      section.querySelectorAll('.price-from').forEach(el => {
        el.textContent = translations.from;
      });
      
      section.querySelectorAll('.price-night').forEach(el => {
        el.textContent = translations.perNight;
      });
      
      section.querySelectorAll('.room-overlay .btn').forEach(el => {
        el.textContent = translations.exploreSuite;
      });
    }
  }

  updateContact(translations) {
    const section = document.querySelector('.contact');
    if (!section) return;
    
    const title = section.querySelector('.contact-title');
    if (title) title.textContent = translations.title;
    
    const desc = section.querySelector('.contact-description');
    if (desc) desc.textContent = translations.description;
    
    const labels = section.querySelectorAll('.contact-label');
    const labelKeys = ['reservations', 'concierge', 'address'];
    labels.forEach((label, i) => {
      if (translations.labels[labelKeys[i]]) {
        label.textContent = translations.labels[labelKeys[i]];
      }
    });
    
    // Update form
    const formFields = {
      'name': translations.form.name,
      'email': translations.form.email,
      'phone': translations.form.phone,
      'dates': translations.form.dates,
      'message': translations.form.message
    };
    
    Object.keys(formFields).forEach(id => {
      const field = document.getElementById(id);
      if (field) {
        const label = field.nextElementSibling;
        if (label) label.textContent = formFields[id];
      }
    });
    
    const submitBtn = section.querySelector('.btn-submit');
    if (submitBtn) submitBtn.textContent = translations.form.submit;
  }

  updateFooter(translations) {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const tagline = footer.querySelector('.footer-tagline');
    if (tagline) tagline.textContent = translations.tagline;
    
    const columns = footer.querySelectorAll('.footer-column h4');
    const columnKeys = ['discover', 'experience', 'connect'];
    columns.forEach((col, i) => {
      if (translations[columnKeys[i]]) {
        col.textContent = translations[columnKeys[i]];
      }
    });
    
    const copyright = footer.querySelector('.footer-bottom p');
    if (copyright) copyright.textContent = translations.legal.rights;
  }
}

// Premium Animations and Interactions
class PremiumWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupPreloader();
    this.setupNavbar();
    this.setupSmoothScroll();
    this.setupAnimations();
    this.setupGallery();
    this.setupBooking();
    this.setupMobileOptimizations();
  }

  setupPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        document.body.style.overflow = '';
        this.animateHero();
      }, 1500);
    });
  }

  animateHero() {
    const elements = document.querySelectorAll('.hero-inner > *');
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'all 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 150);
    });
  }

  setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');
    const links = document.querySelectorAll('.navbar-nav a');
    
    if (!navbar) return;
    
    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
      
      if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.classList.add('navbar-hidden');
      } else {
        navbar.classList.remove('navbar-hidden');
      }
      
      lastScroll = currentScroll;
    });
    
    // Mobile menu
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
      });
      
      links.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 1024) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      });
    }
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          
          setTimeout(() => {
            entry.target.style.transition = 'all 0.8s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
      if (section.id !== 'home') {
        observer.observe(section);
      }
    });
  }

  setupGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox active';
        lightbox.innerHTML = `
          <button class="lightbox-close">×</button>
          <img src="${img.src}" alt="${img.alt}">
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            setTimeout(() => {
              lightbox.remove();
              document.body.style.overflow = '';
            }, 300);
          }
        });
      });
    });
  }

  setupBooking() {
    const form = document.getElementById('reservation-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Show success message
        const success = document.createElement('div');
        success.className = 'booking-success';
        success.textContent = 'Reservation request sent successfully!';
        form.appendChild(success);
        
        setTimeout(() => {
          success.remove();
          form.reset();
        }, 3000);
      }, 2000);
    });
  }

  setupMobileOptimizations() {
    // Viewport height fix
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Touch optimizations
    if ('ontouchstart' in window) {
      document.body.classList.add('touch-device');
      
      // Improve touch responsiveness
      document.addEventListener('touchstart', () => {}, { passive: true });
      document.addEventListener('touchmove', () => {}, { passive: true });
    }
  }
}

// Add dynamic styles
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  .language-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .language-menu.active {
    opacity: 1;
    visibility: visible;
  }
  
  .language-menu-content {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 400px;
    width: 90%;
  }
  
  .language-menu h3 {
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.5rem;
  }
  
  .language-options {
    display: grid;
    gap: 0.5rem;
  }
  
  .language-options button {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8f7f4;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .language-options button:hover {
    background: #efefec;
    transform: translateX(5px);
  }
  
  .language-options button.active {
    background: white;
    border-color: #1a3a2e;
  }
  
  .flag {
    font-size: 1.5rem;
  }
  
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    padding: 2rem;
  }
  
  .lightbox.active {
    opacity: 1;
    visibility: visible;
  }
  
  .lightbox img {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
  }
  
  .lightbox-close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: none;
    border: none;
    color: white;
    font-size: 3rem;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .lightbox-close:hover {
    transform: rotate(90deg);
  }
  
  .booking-success {
    background: #27ae60;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    text-align: center;
    animation: slideInUp 0.5s ease;
  }
  
  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .rtl {
    direction: rtl;
    text-align: right;
  }
  
  .rtl .navbar-nav {
    flex-direction: row-reverse;
  }
  
  .rtl .navbar-actions {
    flex-direction: row-reverse;
  }
  
  .rtl .hero-actions {
    flex-direction: row-reverse;
  }
  
  .rtl .contact-grid {
    direction: ltr;
  }
  
  .rtl .footer-links {
    text-align: right;
  }
  
  .touch-device button {
    cursor: default;
  }
  
  @media (max-width: 768px) {
    .hero {
      height: calc(var(--vh, 1vh) * 100);
    }
    
    .language-menu-content {
      width: 95%;
      padding: 1.5rem;
    }
    
    .lightbox-close {
      top: 1rem;
      right: 1rem;
      font-size: 2rem;
    }
  }
`;
document.head.appendChild(dynamicStyles);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LanguageManager();
  new PremiumWebsite();
});