/* ═══════════════════════════════════════════════════════════════════════════════
   ADA BUNGALOW - TRANSLATION SYSTEM
   Complete multi-language support (TR, EN, AR)
   ═══════════════════════════════════════════════════════════════════════════════ */

const translations = {
    // ═══════════════════════════════════════════════════════════════════════════════
    // TURKISH (Default)
    // ═══════════════════════════════════════════════════════════════════════════════
    tr: {
        // Meta
        lang: 'tr',
        dir: 'ltr',
        
        // Header
        siteName: 'ADA BUNGALOW',
        weather: {
            temp: '°C',
            location: 'Uzungöl',
            partly_cloudy: 'Parçalı bulutlu',
            clear: 'Açık',
            cloudy: 'Bulutlu',
            rain: 'Yağmurlu',
            snow: 'Karlı',
            mist: 'Sisli',
            thunderstorm: 'Fırtınalı'
        },
        
        // Hero Section
        hero: {
            badge: 'KURULUŞ 2020',
            headline: 'Sisin Buluştuğu\nLüks',
            subheadline: 'Uzungöl\'ün antik ormanlarının kalbinde sessiz lüks',
            description: 'Özel villalar. Panoramik orman manzarası. Dokunulmamış doğanın sessiz lüksü.',
            cta: 'Rezervasyon Yap',
            ctaIcon: '→',
            scrollHint: 'Keşfet'
        },
        
        // Villas Section
        villas: {
            sectionTitle: 'Villalarımız',
            sectionSubtitle: 'Her biri özenle tasarlanmış özel yaşam alanları',
            
            // Havuzlu VIP
            vip: {
                label: '01 — PRESTİJLİ',
                name: 'Havuzlu VIP Villa',
                description: 'Sisli dağların kucağında, özel havuzlu terasınızda infinity deneyimi yaşayın.',
                amenities: {
                    pool: 'Özel Havuz',
                    suite: 'King Suite',
                    view: 'Panoramik Manzara',
                    jacuzzi: 'Jakuzi'
                },
                priceWhisper: 'Fiyat için arayınız',
                cta: 'WhatsApp\'tan Rezervasyon',
                whatsappMessage: 'Havuzlu VIP Villa hakkında bilgi almak istiyorum'
            },
            
            // Şelaleli
            waterfall: {
                label: '02 — PREMIUM',
                name: 'Şelaleli Villa',
                description: 'Şelalenin senfonisiyle uyanın, doğanın ritmi gününüzün temposunu belirlesin.',
                amenities: {
                    waterfallView: 'Şelale Manzarası',
                    fireplace: 'Şömine',
                    naturalAir: 'Doğal Hava',
                    terrace: 'Teras'
                },
                priceWhisper: 'Fiyat için arayınız',
                cta: 'WhatsApp\'tan Rezervasyon',
                whatsappMessage: 'Şelaleli Villa hakkında bilgi almak istiyorum'
            },
            
            // Luxury 3+1
            family: {
                label: '03 — AİLE',
                name: 'Luxury 3+1',
                description: 'Sevdiklerinizle seyahat edenler için geniş elegans, her köşe konfor fısıldıyor.',
                amenities: {
                    bedrooms: 'Üç Yatak Odası',
                    kitchen: 'Full Mutfak',
                    livingRoom: 'Oturma Odası',
                    garden: 'Bahçe'
                },
                priceWhisper: 'Fiyat için arayınız',
                cta: 'WhatsApp\'tan Rezervasyon',
                whatsappMessage: 'Luxury 3+1 Villa hakkında bilgi almak istiyorum'
            }
        },
        
        // Daily Rituals Section
        rituals: {
            sectionLabel: 'DENEYİM',
            sectionTitle: 'Günlük Ritüeller',
            
            morning: {
                title: 'Sabah Kahvesi',
                description: 'Özel terasınızda taze demlenmiş Türk kahvesiyle uyanın'
            },
            forest: {
                title: 'Orman Yürüyüşü',
                description: 'Rehberli doğa yürüyüşleri ve antik patika keşifleri'
            },
            dinner: {
                title: 'Akşam Yemeği',
                description: 'Yerel şef tarafından hazırlanan otantik Karadeniz mutfağı'
            },
            campfire: {
                title: 'Kamp Ateşi',
                description: 'Yıldızların altında marshmallow ve hikayeler'
            }
        },
        
        // Check Availability Section
        booking: {
            sectionTitle: 'Müsaitlik Kontrolü',
            subtitle: 'WhatsApp üzerinden rezervasyon',
            
            form: {
                checkin: 'Giriş Tarihi',
                checkout: 'Çıkış Tarihi',
                villa: 'Villa Seçimi',
                villaPlaceholder: 'Villa seçiniz',
                guests: 'Misafir Sayısı',
                specialRequests: 'Özel İstekler',
                specialRequestsPlaceholder: 'Özel istekleriniz varsa belirtiniz...'
            },
            
            pricing: {
                nights: 'gece',
                perNight: 'Gecelik',
                cleaning: 'Temizlik',
                total: 'Tahmini Toplam',
                note: 'Fiyat için arayınız',
                finalNote: 'Kesin fiyat WhatsApp\'tan onaylanacaktır'
            },
            
            cta: 'Müsaitlik Kontrolü',
            
            trust: {
                instant: 'Anında Yanıt',
                secure: 'Güvenli Rezervasyon',
                support: '7/24 Destek'
            },
            
            whatsappTemplate: 'Merhaba! Ada Bungalow için müsaitlik kontrolü yapmak istiyorum.\n\n📅 Giriş: {checkin}\n📅 Çıkış: {checkout}\n🏡 Villa: {villa}\n👥 Misafir: {guests}\n{requests}\nLütfen müsaitlik ve fiyat bilgisi veriniz. Teşekkürler!'
        },
        
        // Gallery Section
        gallery: {
            title: 'Galeri',
            subtitle: 'Ada Bungalow\'dan anılar',
            
            captions: {
                villa_exterior: 'Villa dış görünüm',
                pool_view: 'Özel havuz manzarası',
                interior_living: 'Oturma alanı',
                bedroom_suite: 'Yatak odası suit',
                bathroom_luxury: 'Lüks banyo',
                kitchen_modern: 'Modern mutfak',
                terrace_morning: 'Sabah terası',
                forest_view: 'Orman manzarası',
                fireplace_cozy: 'Şömine köşesi',
                dining_area: 'Yemek alanı'
            },
            
            lightbox: {
                close: 'Kapat',
                prev: 'Önceki',
                next: 'Sonraki',
                loading: 'Yükleniyor...'
            }
        },
        
        // Footer
        footer: {
            about: {
                title: 'Ada Bungalow',
                description: 'Uzungöl\'ün kalbinde, doğayla iç içe lüks konaklama deneyimi. 2020\'den beri misafirlerimize unutulmaz anılar sunuyoruz.'
            },
            
            quickLinks: {
                title: 'Hızlı Bağlantılar',
                villas: 'Villalar',
                gallery: 'Galeri',
                location: 'Konum',
                contact: 'İletişim'
            },
            
            contact: {
                title: 'İletişim',
                phone: '+90 545 417 43 44',
                email: 'info@adabungalow.com',
                address: 'Uzungöl, Çaykara, Trabzon',
                hours: '7/24 Açık'
            },
            
            location: {
                title: 'Konum',
                viewMap: 'Haritada Görüntüle'
            },
            
            bottom: {
                copyright: '© 2024 Ada Bungalow',
                crafted: 'Dağlarda özenle tasarlandı',
                languages: {
                    tr: 'TR',
                    en: 'EN',
                    ar: 'AR'
                }
            }
        },
        
        // Common
        common: {
            loading: 'Yükleniyor...',
            error: 'Bir hata oluştu',
            retry: 'Tekrar dene',
            close: 'Kapat',
            open: 'Aç',
            select: 'Seç',
            selected: 'Seçildi',
            cancel: 'İptal',
            confirm: 'Onayla',
            save: 'Kaydet',
            delete: 'Sil',
            edit: 'Düzenle',
            view: 'Görüntüle',
            more: 'Daha fazla',
            less: 'Daha az'
        }
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // ENGLISH
    // ═══════════════════════════════════════════════════════════════════════════════
    en: {
        // Meta
        lang: 'en',
        dir: 'ltr',
        
        // Header
        siteName: 'ADA BUNGALOW',
        weather: {
            temp: '°C',
            location: 'Uzungöl',
            partly_cloudy: 'Partly cloudy',
            clear: 'Clear',
            cloudy: 'Cloudy',
            rain: 'Rainy',
            snow: 'Snowy',
            mist: 'Misty',
            thunderstorm: 'Stormy'
        },
        
        // Hero Section
        hero: {
            badge: 'EST. 2020',
            headline: 'Where Mist\nMeets Luxury',
            subheadline: 'Quiet luxury in the heart of Uzungöl\'s ancient forests',
            description: 'Private villas. Panoramic forest views. Quiet luxury in untouched nature.',
            cta: 'Make Reservation',
            ctaIcon: '→',
            scrollHint: 'Discover'
        },
        
        // Villas Section
        villas: {
            sectionTitle: 'Our Villas',
            sectionSubtitle: 'Carefully designed private living spaces',
            
            // Havuzlu VIP
            vip: {
                label: '01 — PRESTIGIOUS',
                name: 'VIP Villa with Pool',
                description: 'Experience infinity on your private poolside terrace, embraced by misty mountains.',
                amenities: {
                    pool: 'Private Pool',
                    suite: 'King Suite',
                    view: 'Panoramic View',
                    jacuzzi: 'Jacuzzi'
                },
                priceWhisper: 'Request a quote',
                cta: 'Reserve via WhatsApp',
                whatsappMessage: 'I would like information about the VIP Villa with Pool'
            },
            
            // Şelaleli
            waterfall: {
                label: '02 — PREMIUM',
                name: 'Waterfall Villa',
                description: 'Wake to the symphony of cascading water, where nature\'s rhythm sets the pace of your day.',
                amenities: {
                    waterfallView: 'Waterfall View',
                    fireplace: 'Fireplace',
                    naturalAir: 'Natural Air',
                    terrace: 'Terrace'
                },
                priceWhisper: 'Request a quote',
                cta: 'Reserve via WhatsApp',
                whatsappMessage: 'I would like information about the Waterfall Villa'
            },
            
            // Luxury 3+1
            family: {
                label: '03 — FAMILY',
                name: 'Luxury 3+1',
                description: 'Spacious elegance for those who travel with their tribe, where every corner whispers comfort.',
                amenities: {
                    bedrooms: 'Three Bedrooms',
                    kitchen: 'Full Kitchen',
                    livingRoom: 'Living Room',
                    garden: 'Garden'
                },
                priceWhisper: 'Request a quote',
                cta: 'Reserve via WhatsApp',
                whatsappMessage: 'I would like information about the Luxury 3+1 Villa'
            }
        },
        
        // Daily Rituals Section
        rituals: {
            sectionLabel: 'THE EXPERIENCE',
            sectionTitle: 'Daily Rituals',
            
            morning: {
                title: 'Morning Coffee',
                description: 'Wake to freshly brewed Turkish coffee served on your private terrace'
            },
            forest: {
                title: 'Forest Walk',
                description: 'Guided nature walks and ancient trail discoveries'
            },
            dinner: {
                title: 'Evening Dinner',
                description: 'Authentic Black Sea cuisine prepared by local chef'
            },
            campfire: {
                title: 'Campfire',
                description: 'Marshmallows and stories under the stars'
            }
        },
        
        // Check Availability Section
        booking: {
            sectionTitle: 'Check Availability',
            subtitle: 'Reservation via WhatsApp',
            
            form: {
                checkin: 'Check-in Date',
                checkout: 'Check-out Date',
                villa: 'Select Villa',
                villaPlaceholder: 'Choose a villa',
                guests: 'Number of Guests',
                specialRequests: 'Special Requests',
                specialRequestsPlaceholder: 'Any special requests...'
            },
            
            pricing: {
                nights: 'nights',
                perNight: 'Per night',
                cleaning: 'Cleaning',
                total: 'Estimated Total',
                note: 'Contact for pricing',
                finalNote: 'Final price will be confirmed via WhatsApp'
            },
            
            cta: 'Check Availability',
            
            trust: {
                instant: 'Instant Reply',
                secure: 'Secure Booking',
                support: '24/7 Support'
            },
            
            whatsappTemplate: 'Hello! I would like to check availability for Ada Bungalow.\n\n📅 Check-in: {checkin}\n📅 Check-out: {checkout}\n🏡 Villa: {villa}\n👥 Guests: {guests}\n{requests}\nPlease confirm availability and pricing. Thank you!'
        },
        
        // Gallery Section
        gallery: {
            title: 'Gallery',
            subtitle: 'Memories from Ada Bungalow',
            
            captions: {
                villa_exterior: 'Villa exterior',
                pool_view: 'Private pool view',
                interior_living: 'Living area',
                bedroom_suite: 'Bedroom suite',
                bathroom_luxury: 'Luxury bathroom',
                kitchen_modern: 'Modern kitchen',
                terrace_morning: 'Morning terrace',
                forest_view: 'Forest view',
                fireplace_cozy: 'Cozy fireplace',
                dining_area: 'Dining area'
            },
            
            lightbox: {
                close: 'Close',
                prev: 'Previous',
                next: 'Next',
                loading: 'Loading...'
            }
        },
        
        // Footer
        footer: {
            about: {
                title: 'Ada Bungalow',
                description: 'Luxury accommodation experience in harmony with nature in the heart of Uzungöl. Creating unforgettable memories for our guests since 2020.'
            },
            
            quickLinks: {
                title: 'Quick Links',
                villas: 'Villas',
                gallery: 'Gallery',
                location: 'Location',
                contact: 'Contact'
            },
            
            contact: {
                title: 'Contact',
                phone: '+90 545 417 43 44',
                email: 'info@adabungalow.com',
                address: 'Uzungöl, Çaykara, Trabzon',
                hours: 'Open 24/7'
            },
            
            location: {
                title: 'Location',
                viewMap: 'View on Map'
            },
            
            bottom: {
                copyright: '© 2024 Ada Bungalow',
                crafted: 'Crafted with precision in the mountains',
                languages: {
                    tr: 'TR',
                    en: 'EN',
                    ar: 'AR'
                }
            }
        },
        
        // Common
        common: {
            loading: 'Loading...',
            error: 'An error occurred',
            retry: 'Try again',
            close: 'Close',
            open: 'Open',
            select: 'Select',
            selected: 'Selected',
            cancel: 'Cancel',
            confirm: 'Confirm',
            save: 'Save',
            delete: 'Delete',
            edit: 'Edit',
            view: 'View',
            more: 'More',
            less: 'Less'
        }
    },
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // ARABIC
    // ═══════════════════════════════════════════════════════════════════════════════
    ar: {
        // Meta
        lang: 'ar',
        dir: 'rtl',
        
        // Header
        siteName: 'آدا بنغالو',
        weather: {
            temp: '°م',
            location: 'أوزونجول',
            partly_cloudy: 'غائم جزئياً',
            clear: 'صافي',
            cloudy: 'غائم',
            rain: 'ممطر',
            snow: 'ثلجي',
            mist: 'ضبابي',
            thunderstorm: 'عاصف'
        },
        
        // Hero Section
        hero: {
            badge: 'تأسست 2020',
            headline: 'حيث يلتقي الضباب\nبالفخامة',
            subheadline: 'فخامة هادئة في قلب غابات أوزونجول القديمة',
            description: 'فلل خاصة. إطلالات بانورامية على الغابة. فخامة هادئة في طبيعة عذراء.',
            cta: 'احجز الآن',
            ctaIcon: '←',
            scrollHint: 'اكتشف'
        },
        
        // Villas Section
        villas: {
            sectionTitle: 'الفلل',
            sectionSubtitle: 'مساحات معيشة خاصة مصممة بعناية',
            
            // Havuzlu VIP
            vip: {
                label: '01 — مرموقة',
                name: 'فيلا VIP مع مسبح',
                description: 'اختبر اللامحدود على شرفتك الخاصة بجانب المسبح، محتضنًا بالجبال الضبابية.',
                amenities: {
                    pool: 'مسبح خاص',
                    suite: 'جناح كينج',
                    view: 'إطلالة بانورامية',
                    jacuzzi: 'جاكوزي'
                },
                priceWhisper: 'اطلب عرض سعر',
                cta: 'احجز عبر واتساب',
                whatsappMessage: 'أود الحصول على معلومات حول فيلا VIP مع المسبح'
            },
            
            // Şelaleli
            waterfall: {
                label: '02 — متميزة',
                name: 'فيلا الشلال',
                description: 'استيقظ على سيمفونية المياه المتدفقة، حيث يحدد إيقاع الطبيعة وتيرة يومك.',
                amenities: {
                    waterfallView: 'إطلالة على الشلال',
                    fireplace: 'مدفأة',
                    naturalAir: 'هواء طبيعي',
                    terrace: 'شرفة'
                },
                priceWhisper: 'اطلب عرض سعر',
                cta: 'احجز عبر واتساب',
                whatsappMessage: 'أود الحصول على معلومات حول فيلا الشلال'
            },
            
            // Luxury 3+1
            family: {
                label: '03 — عائلية',
                name: 'فيلا فاخرة 3+1',
                description: 'أناقة واسعة لمن يسافرون مع عائلاتهم، حيث تهمس كل زاوية بالراحة.',
                amenities: {
                    bedrooms: 'ثلاث غرف نوم',
                    kitchen: 'مطبخ كامل',
                    livingRoom: 'غرفة معيشة',
                    garden: 'حديقة'
                },
                priceWhisper: 'اطلب عرض سعر',
                cta: 'احجز عبر واتساب',
                whatsappMessage: 'أود الحصول على معلومات حول فيلا فاخرة 3+1'
            }
        },
        
        // Daily Rituals Section
        rituals: {
            sectionLabel: 'التجربة',
            sectionTitle: 'الطقوس اليومية',
            
            morning: {
                title: 'قهوة الصباح',
                description: 'استيقظ على القهوة التركية الطازجة المقدمة على شرفتك الخاصة'
            },
            forest: {
                title: 'نزهة في الغابة',
                description: 'جولات طبيعية مصحوبة بمرشدين واكتشاف المسارات القديمة'
            },
            dinner: {
                title: 'عشاء المساء',
                description: 'مأكولات البحر الأسود الأصيلة من إعداد طاهٍ محلي'
            },
            campfire: {
                title: 'نار المخيم',
                description: 'مارشميلو وقصص تحت النجوم'
            }
        },
        
        // Check Availability Section
        booking: {
            sectionTitle: 'التحقق من التوفر',
            subtitle: 'الحجز عبر واتساب',
            
            form: {
                checkin: 'تاريخ الوصول',
                checkout: 'تاريخ المغادرة',
                villa: 'اختر الفيلا',
                villaPlaceholder: 'اختر فيلا',
                guests: 'عدد الضيوف',
                specialRequests: 'طلبات خاصة',
                specialRequestsPlaceholder: 'أي طلبات خاصة...'
            },
            
            pricing: {
                nights: 'ليالي',
                perNight: 'لليلة',
                cleaning: 'التنظيف',
                total: 'المجموع التقديري',
                note: 'اتصل للسعر',
                finalNote: 'سيتم تأكيد السعر النهائي عبر واتساب'
            },
            
            cta: 'تحقق من التوفر',
            
            trust: {
                instant: 'رد فوري',
                secure: 'حجز آمن',
                support: 'دعم 24/7'
            },
            
            whatsappTemplate: 'مرحباً! أود التحقق من التوفر في آدا بنغالو.\n\n📅 الوصول: {checkin}\n📅 المغادرة: {checkout}\n🏡 الفيلا: {villa}\n👥 الضيوف: {guests}\n{requests}\nالرجاء تأكيد التوفر والسعر. شكراً!'
        },
        
        // Gallery Section
        gallery: {
            title: 'المعرض',
            subtitle: 'ذكريات من آدا بنغالو',
            
            captions: {
                villa_exterior: 'الفيلا من الخارج',
                pool_view: 'إطلالة المسبح الخاص',
                interior_living: 'منطقة المعيشة',
                bedroom_suite: 'جناح النوم',
                bathroom_luxury: 'حمام فاخر',
                kitchen_modern: 'مطبخ حديث',
                terrace_morning: 'شرفة الصباح',
                forest_view: 'إطلالة الغابة',
                fireplace_cozy: 'زاوية المدفأة',
                dining_area: 'منطقة الطعام'
            },
            
            lightbox: {
                close: 'إغلاق',
                prev: 'السابق',
                next: 'التالي',
                loading: 'جاري التحميل...'
            }
        },
        
        // Footer
        footer: {
            about: {
                title: 'آدا بنغالو',
                description: 'تجربة إقامة فاخرة في انسجام مع الطبيعة في قلب أوزونجول. نخلق ذكريات لا تُنسى لضيوفنا منذ عام 2020.'
            },
            
            quickLinks: {
                title: 'روابط سريعة',
                villas: 'الفلل',
                gallery: 'المعرض',
                location: 'الموقع',
                contact: 'اتصل بنا'
            },
            
            contact: {
                title: 'اتصل بنا',
                phone: '+90 545 417 43 44',
                email: 'info@adabungalow.com',
                address: 'أوزونجول، تشايكارا، طرابزون',
                hours: 'مفتوح 24/7'
            },
            
            location: {
                title: 'الموقع',
                viewMap: 'عرض على الخريطة'
            },
            
            bottom: {
                copyright: '© 2024 آدا بنغالو',
                crafted: 'صُنع بدقة في الجبال',
                languages: {
                    tr: 'TR',
                    en: 'EN',
                    ar: 'AR'
                }
            }
        },
        
        // Common
        common: {
            loading: 'جاري التحميل...',
            error: 'حدث خطأ',
            retry: 'حاول مرة أخرى',
            close: 'إغلاق',
            open: 'فتح',
            select: 'اختر',
            selected: 'محدد',
            cancel: 'إلغاء',
            confirm: 'تأكيد',
            save: 'حفظ',
            delete: 'حذف',
            edit: 'تعديل',
            view: 'عرض',
            more: 'المزيد',
            less: 'أقل'
        }
    }
};