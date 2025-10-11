# Ada Bungalow - Cinematic Quiet Luxury Redesign Plan

## 🎬 Vision Statement
Transform Ada Bungalow from a standard luxury website into a **cinematic, story-driven experience** that feels like a calm boutique film. The site should exhale mist, glow in brass, and tell a story as users scroll — not just show cards.

## 🎨 Art Direction

### Color Palette (Quiet Luxury in Misty Forest)
```css
--alpine-white: #F7F6F2    /* Main background */
--evergreen: #1B2A24       /* Primary text */
--deep-overlay: #18332C    /* Dark overlays */
--brass: #C9A227          /* Sparse accent only */
--moss-chip: #EFF2ED      /* Soft backgrounds */
--divider: #E7E7E0        /* Subtle lines */
```

### Typography
- **Display**: Fraunces or Canela (headlines)
- **Body/UI**: Inter
- Enable discretionary ligatures
- Tight letter-spacing on all-caps micro labels
- Optical sizing enabled

### Visual Treatment
- Soft gradients (no harsh transitions)
- Wood grain texture details
- Thin brass hairlines (1px max)
- Faint vignette on hero media
- Cinematic color grade: cool greens + warm brass highlights
- NO HDR look, NO neon, NO cheap gradients

## 📖 Narrative Layout Structure

### 1. PROLOGUE - Arrival (100vh)
- Subtle preloader: brass ring traces line-art leaf/bungalow (700-900ms)
- Logotype with letterpress effect (soft inner shadow)
- Micro shimmer on brass hairline
- Scroll cue: thin chevron with gentle float animation

### 2. SIGNATURE SCENE - The Valley Breathes
- Full-bleed photo/video with mist
- Parallax layers via ScrollTrigger:
  - Forest: 0.3 speed
  - Deck: 0.5 speed  
  - UI: 0.8 speed
- Pinned text stanza:
  ```
  "Private villas.
   Panoramic forest.
   Quiet luxury."
  ```

### 3. CHAPTERS - The Villas
- One viewport per room
- Split-panel: 60-70% image left, content right
- Reveal choreography:
  ```
  0ms: Image scales 102% → 100%, blur 8% → 0
  140ms: Eyebrow rises +8px, fades in
  220ms: H3 title appears, letter-spacing tightens
  360ms: Amenity chips stagger in (60ms steps)
  420ms: CTA lifts with shadow
  ```
- Brass progress dots at screen edge

### 4. INTERLUDE - The Rituals (Horizontal)
- Horizontal scroll with pinned title
- Panels: Fireplace · Pool · Waterfall · Kitchen · Family · 24/7
- Cinemagraphs or stills with particle overlays (6-10% opacity)

### 5. GALLERY - The Mood Reel
- Justified grid → smooth lightbox
- Origin transform animation (400-500ms)
- Pinch-zoom, arrow keys, swipe support

### 6. TRUST - Whispered Reviews
- Floating quotes over soft forest texture
- Thin brass outline stars
- "Rated 4.8/5 by guests" microcopy

### 7. THE JOURNEY - Map as Keepsake
- Photo frame vignette with brass pin
- Distance chips: "5 min to lake"
- Weather chip in header: "Uzungöl 18°C · Partly cloudy"

### 8. FINALE - Book with Ease
- Sticky booking dock (mobile bottom)
- Dates · Guests · [Check availability]
- WhatsApp secondary, desaturated green

## ⚡ Motion Language

### Core Principles
- **Easing**: cubic-bezier(.2,.8,.2,1) or GSAP power3.out
- **Durations**: 
  - UI: 140-220ms
  - Hero reveals: 380-520ms
  - Parallax: 0.3-0.8 speed
- **Stagger**: 40-70ms between elements
- **Depth**: 2-4px translateY on hover (no bounces)
- **Accessibility**: Respect prefers-reduced-motion

### Signature Micro-Moments
1. **Loader**: Line-drawing trace → filled logo (stroke-dashoffset)
2. **Section dividers**: Brass hairline wipes in (clip-path)
3. **Chips**: Micro press 0.98 scale, shadow ease-in 120ms
4. **Links**: Underline grows from center (text-decoration-thickness)
5. **Scroll cue**: 2px yoyo every 1.6s, 10% opacity pulse

## 🛠 Implementation Plan

### Phase 1: Foundation (Day 1)
1. Set up color tokens and typography
2. Implement Lenis smooth scrolling
3. Add GSAP + ScrollTrigger
4. Create base motion classes

### Phase 2: Hero & Preloader (Day 1)
1. Design line-art preloader animation
2. Build letterpress logotype
3. Implement parallax hero scene
4. Add scroll cue animations

### Phase 3: Villa Chapters (Day 2)
1. Create split-panel layouts
2. Choreograph reveal sequences
3. Add progress dots navigation
4. Implement panel transitions

### Phase 4: Horizontal Stories (Day 2)
1. Build horizontal scroll section
2. Add cinemagraph/particle effects
3. Pin section titles
4. Create smooth scroll snapping

### Phase 5: Gallery & Lightbox (Day 3)
1. Design justified grid
2. Build origin-transform lightbox
3. Add pinch-zoom functionality
4. Implement keyboard/swipe navigation

### Phase 6: Polish & Optimize (Day 3)
1. Add weather chip to header
2. Create sticky booking dock
3. Fine-tune all animations
4. Test accessibility features
5. Optimize performance

## 📊 Success Metrics

### Performance
- Lighthouse Mobile (throttled):
  - Performance: ≥90
  - Accessibility: ≥95
  - Best Practices: ≥95
  - SEO: ≥95

### User Experience
- Animations feel natural, not flashy
- Page reads like film sequence, not catalog
- Smooth 60fps scrolling on all devices
- Lightbox butter-smooth on mobile
- Booking dock never jitters

### Visual Quality
- No cheap gradients or neon
- Brass used sparingly (hairlines/icons only)
- Consistent motion language throughout
- Professional photography grade
- Clean, uncluttered compositions

## 🚀 Quick Start Code

### CSS Foundation
```css
:root {
  --bg: #F7F6F2;
  --ink: #1B2A24;
  --overlay: #18332C;
  --accent: #C9A227;
  --chip: #EFF2ED;
  --ease: cubic-bezier(.2,.8,.2,1);
  --shadow: 0 6px 24px rgba(20,36,32,.08);
}

.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity .42s var(--ease),
              transform .42s var(--ease);
}

.reveal.is-inview {
  opacity: 1;
  transform: none;
}
```

### JavaScript Setup
```javascript
// GSAP + ScrollTrigger registration
gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

// Animation loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

## ✅ Checklist

- [ ] Color palette implemented
- [ ] Typography system in place
- [ ] Smooth scrolling active
- [ ] Preloader animation working
- [ ] Hero parallax scene complete
- [ ] Villa chapters with choreography
- [ ] Horizontal amenities scroll
- [ ] Gallery lightbox smooth
- [ ] Weather chip in header
- [ ] Sticky booking dock
- [ ] All animations tested
- [ ] Performance optimized
- [ ] Accessibility verified
- [ ] Mobile experience polished

## 🎯 Final Goal
The experience should feel like entering a quiet, misty forest retreat. Every scroll reveals a new chapter, every interaction feels considered, and the entire journey from arrival to booking flows like a carefully directed film. No flashy effects — just subtle, tasteful motion that enhances the story of luxury in nature.

---

# Premium Revamp Report — UX/UI + Content + Flow

## Executive Summary

### Identified Issues:
- Language selector/translation inconsistencies
- Overlay and card alignment errors
- Contrast/readability problems
- "Daily Rituals" section scroll/opacity bugs
- Gallery aspect ratio inconsistencies
- Map layer white blur issue
- **Booking form WEAK** (missing fields, no validation, no pricing/availability flow, premature WhatsApp escape)

### Goals:
- Boutique-luxury feel
- "Skylight" brightness (airy, open)
- One-click booking flow
- Flawless 3-language (TR/EN/AR) experience
- Mobile-first performance (LCP < 2.5s)

### Approach:
- Design system + flow corrections
- Content language standardization
- Form/booking engine architecture
- Performance/accessibility

---

## Simple WhatsApp Booking Form

**Philosophy:** Keep it dead simple. Collect basic info → send prefilled WhatsApp message. No complex APIs, no multi-step wizard, no pricing calculations.

### Form Fields (Single Page)

```
[ H2 ] Check Availability / Müsaitlik Kontrolü

[ Check-in Date ▢ ]
[ Check-out Date ▢ ]

[ Villa Type ▽ ]
  - Havuzlu VIP Villa
  - Şelaleli Villa
  - Luxury 3+1 Villa

[ Guests ]
  Adults: [−] 2 [+]
  (Children optional)

[ Special Requests (optional) ]
  ▭▭▭

[ CTA: "Check via WhatsApp" / "WhatsApp'tan Kontrol Et" ]
```

### WhatsApp Message Template

```
Merhaba Ada Bungalow 👋

{checkIn} - {checkOut} tarihleri için müsait mi?

Villa: {villaType}
Kişi sayısı: {guests} yetişkin
{optionalChildren}
{optionalRequests}

Teşekkürler!
```

**English:**
```
Hello Ada Bungalow 👋

Are you available {checkIn} - {checkOut}?

Villa: {villaType}
Guests: {guests} adults
{optionalChildren}
{optionalRequests}

Thank you!
```

**Arabic:**
```
مرحبا Ada Bungalow 👋

هل أنت متاح {checkIn} - {checkOut}؟

فيلا: {villaType}
الضيوف: {guests} بالغين
{optionalChildren}
{optionalRequests}

شكراً!
```

### Implementation Notes

- No validation beyond "dates filled + villa selected"
- No pricing shown (too complex, changes seasonally)
- Button generates WhatsApp link with prefilled text
- Works offline, no API calls
- Fast, simple, bulletproof

---

## Priority Fixes

### 1. Nav & Language Selector
**Issues:**
- TR/EN/AR buttons inconsistent; empty/borderless states
- Some texts remain in TR when switched to EN/AR
- No RTL support for Arabic

**Solutions:**
- Language switcher: fixed in header (right) + mobile drawer
- Labels in native language: TR / English / العربية
- AR: full RTL layout
- URL structure: /tr, /en, /ar
- Hreflang + meta-title/desc/og in all languages

### 2. Hero & CTA
**Issues:**
- Dark overlay + text contrast borderline
- CTA buried in dark background
- Title typography kerning/line-height overflow

**Solutions:**
- Title font: Display serif (Canela/Cinzel/Cormorant) H1 56–64px, line-height 1.05
- Subtitle: sans (Manrope/Inter) 18–20px
- Primary CTA: "Book Now" (TR/EN/AR). Gold fill (#c8a96a) on dark / dark text
- Secondary CTA: "Villas" anchor

### 3. Villa Cards
**Issues:**
- Image aspect ratios vary; content jumps
- Feature chips diffuse, low clickability
- "WhatsApp reservation" too early

**Solutions:**
- Aspect ratio lock: all card images 3:2 (desktop), 4:3 (mobile). object-fit: cover
- Chip style: rounded, filled min-badge; icon + short label (e.g. 🛁 Jacuzzi)
- Card CTA: "View Details" → modal or villa detail page
- Reservation CTA leads to form; WhatsApp secondary for support/special requests

### 4. Daily Rituals Section
**Issues:**
- Opacity/blur overlay cuts off cards; collides with titles; slider misaligned

**Solutions:**
- Static grid (3 columns desktop / 1 column mobile) + hover lift (soft shadow)
- Thin gradient over image; title white, subtitle 90% white
- Click card → lightbox (text + photo) or "Experience details" modal

### 5. Gallery
**Issues:**
- Last row two images + gap; inconsistent aspect/color temperature; no caption

**Solutions:**
- Uniform grid instead of masonry; WebP/AVIF sources; lazyload + blur-up
- Lightbox shows room name + angle (e.g. "VIP Villa — Terrace")
- 12–18 select images; rest in "Load More"

### 6. Map & "Hidden in the Mist"
**Issues:**
- Thick white blur under map; low interactivity

**Solutions:**
- Thin blur, default terrain/satellite toggle
- POI pins: "Ada Bungalow" branded pin + "Get Directions" (Google Maps link)

---

## Design System

### Color Palette (Example)
```css
--deep-forest: #10241b    /* Primary dark */
--gold: #c8a96a          /* Accent/CTA */
--ivory: #f6f3ec         /* Background */
--skylight-accent: #e8f3ff → #f6faff  /* Subtle gradient, airiness */
```

### Typography
- Display serif (Canela/Cormorant) + Sans (Manrope/Inter)

### Components
- **Buttons:** Fill (gold) / Outline (dark border, light bg). Focus ring visible
- **Chip/Badge:** filled min-badge, icon + short label
- **Card:** 16–20px radius, soft shadow, hover 2–4px lift

---

## Accessibility (A11y)

- Contrast AA: check text/bg ratios
- Keyboard access: tab order, skip-to-content
- Images: alt text; language selector aria-current
- Animations: prefers-reduced-motion support

---

## Performance

- Hero and gallery images: AVIF/WebP, responsive srcset
- Lazyload + priority preload (hero)
- Critical CSS inline, no blocking JS
- **Targets:** LCP < 2.5s, CLS < 0.05, TTFB < 0.8s

---

## SEO & Social

- Language-based hreflang, structured data (LodgingBusiness/Hotel)
- OpenGraph/Twitter images 1200×630, title/description per language
- FAQ rich snippet for "Reservation" and "Villas" (cancellation policy, check-in)

---

## Analytics & Measurement

**Events:** Hero CTA, Villa detail, Form step, Submit, WhatsApp fallback

**Funnel:** Landing → Villa → Form Step1 → Step2 → Submit → WhatsApp/Call

---

## Implementation Sprint Plan

### Sprint 1 (Foundation):
- Design system, header/footer, hero, language selector (RTL), nav

### Sprint 2 (Content):
- Villa cards, Rituals, Gallery

### Sprint 3 (Form):
- Booking form + availability/pricing mock + WhatsApp fallback

### Sprint 4 (Map & SEO):
- Map layer, hreflang, schema, performance optimization

### Sprint 5 (QA):
- Device tests, accessibility, Lighthouse, copy final

---

## QA Checklist

- [ ] All languages menu flow / RTL verified
- [ ] CTA contrasts / hover & focus
- [ ] Card ratios consistent across all breakpoints
- [ ] Gallery lightbox caption + description correct
- [ ] Form: date/capacity/coupon validation + inline errors
- [ ] Availability badges correct state
- [ ] WhatsApp summary text correct language
- [ ] LCP/CLS targets met
- [ ] OG images and hreflang tests passed

---

## Sample Micro-Copy (TR)

- **Hero title:** "Dağların fısıldadığı yer: lüks"
- **Subtitle:** "Sabah sisinin kucakladığı mimari şiir."
- **CTA:** "Hemen Rezervasyon"
- **Form info note:** "Fiyat tahminidir; kesin fiyat onayla birlikte paylaşılır."
- **WhatsApp fallback:** "Merhaba Ada Bungalow, 12–14 Kasım için 2 yetişkin 1 çocuk, Havuzlu VIP müsaid mi? Adım Kaan, tel: +49… Ek istek: şömine & geç check-out."