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