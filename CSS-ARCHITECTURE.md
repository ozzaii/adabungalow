# CSS ARCHITECTURE - SINGLE SOURCE OF TRUTH

## 🚨 CRITICAL RULES - READ BEFORE EDITING ANY CSS

This codebase had 33 CSS files all fighting each other. We've spent hours fixing cascade conflicts. **NEVER AGAIN.**

---

## 📋 SINGLE SOURCE OF TRUTH MAPPING

Each component has ONE file that controls it. **NEVER override in another file.**

### Component Ownership

| Component | Owner File | DO NOT TOUCH IN |
|-----------|-----------|-----------------|
| `.villa-chapter` (glass cards) | `liquid-glass.css` | ❌ cinematic-polish.css, styles.css, villa-borders.css |
| `.villa-narrative` (text) | `styles.css` + `liquid-glass.css` (visibility only) | ❌ cinematic-polish.css, premium-polish.css |
| `.villa-visual` (image container) | `liquid-glass.css` | ❌ cinematic-polish.css, villa-borders.css |
| `.villa-image` (images) | `liquid-glass.css` | ❌ cinematic-polish.css |
| `.booking-card` | `liquid-glass.css` + `booking-luxury.css` (form fields) | ❌ cinematic-polish.css |
| `.ritual-panel` | `liquid-glass.css` + `styles.css` (horizontal scroll) | ❌ premium-polish.css |
| `.badge` / `.amenity-chips` | `liquid-glass.css` + `styles.css` (text) | ❌ premium-polish.css, villa-borders.css |
| `.gallery-item` | `gallery-quiet.css` | ❌ gallery-supreme.css (unused), premium-polish.css |
| `.lightbox` | `lightbox-premium.css` | ❌ cinematic-polish.css |
| Hero section | `hero-supreme.css` | ❌ styles.css |
| Footer | `footer-premium.css` | ❌ styles.css, cinematic-polish.css |
| Navigation/Header | `navigation-styles.css` + `liquid-glass.css` (glass effect) | ❌ styles.css |
| Typography | `styles.css` + `typography-polish.css` | ❌ All other files |
| Language visibility | `styles.css` (lines 140-316) | ❌ ALL other files |

---

## 🚫 WHAT NOT TO DO

### ❌ NEVER ADD THESE TO FILES THAT DON'T OWN THE COMPONENT:

```css
/* BAD - DO NOT DO THIS */
/* In cinematic-polish.css: */
.villa-chapter {
    background: rgba(255, 255, 255, 0.5); /* ❌ CONFLICT! liquid-glass.css owns this */
    backdrop-filter: blur(40px); /* ❌ CONFLICT! */
}

/* BAD - DO NOT DO THIS */
/* In premium-polish.css: */
.villa-visual::before {
    background: linear-gradient(...); /* ❌ CONFLICT! Creates overlays */
}
```

### ✅ CORRECT WAY:

```css
/* GOOD - Only in liquid-glass.css: */
.villa-chapter {
    --glass-bg: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(12px);
}

/* Other files can ONLY add non-conflicting properties: */
/* In spacing-refinements.css: */
.villa-chapter {
    margin-bottom: var(--s-8); /* ✅ OK - doesn't conflict */
}
```

---

## 📐 CSS LOADING ORDER (index.html)

**Order matters!** Files loaded later override earlier files.

```html
<!-- 1. CORE STYLES (base, reset, tokens) -->
<link rel="stylesheet" href="styles.css?v=10">

<!-- 2. GLASSMORPHISM SYSTEM (glass effects) -->
<link rel="stylesheet" href="liquid-glass.css?v=11">

<!-- 3. TYPOGRAPHY & SPACING -->
<link rel="stylesheet" href="typography-polish.css">
<link rel="stylesheet" href="spacing-refinements.css">

<!-- 4. ANIMATIONS & PERFORMANCE -->
<link rel="stylesheet" href="animation-polish.css?v=5">
<link rel="stylesheet" href="performance-60fps.css?v=2">

<!-- 5. COMPONENT-SPECIFIC -->
<link rel="stylesheet" href="hero-supreme.css">
<link rel="stylesheet" href="cinematic-polish.css?v=7"> <!-- ONLY hover animations, NO backgrounds -->
<link rel="stylesheet" href="lightbox-premium.css">
<link rel="stylesheet" href="gallery-quiet.css?v=6">

<!-- 6. DEFERRED (non-critical) -->
<link rel="stylesheet" href="premium-polish.css?v=2" media="print" onload="this.media='all'">
<link rel="stylesheet" href="footer-premium.css?v=14" media="print" onload="this.media='all'">
<link rel="stylesheet" href="booking-luxury.css?v=19" media="print" onload="this.media='all'">
<!-- ... more deferred ... -->
```

---

## 🔧 HOW TO ADD NEW STYLES

### Before Adding CSS:

1. **Check ownership table** - Which file owns this component?
2. **Open ONLY that file** - Do not edit other files
3. **Search for conflicts** - `grep -n "component-name" *.css`
4. **Test in isolation** - Comment out other CSS files temporarily

### Example: Adding a new villa card style

```css
/* ✅ CORRECT - Add to liquid-glass.css */
.villa-chapter {
    /* New property that doesn't conflict */
    border-width: 2px;
}

/* ❌ WRONG - Do NOT add to cinematic-polish.css */
.villa-chapter {
    background: ...; /* CONFLICT with liquid-glass.css! */
}
```

---

## 🐛 DEBUGGING CSS CONFLICTS

### When something looks broken:

1. **Inspect element** in browser DevTools
2. **Check "Computed" tab** - See which file is winning
3. **Look for strikethrough** - Shows overridden styles
4. **Grep for the selector:**
   ```bash
   grep -n ".villa-chapter" *.css
   ```
5. **Check loading order** - Later files override earlier

### Common Conflicts We Fixed:

| Issue | Cause | Solution |
|-------|-------|----------|
| White overlays | Multiple `::before` pseudo-elements | Disabled all except owner |
| Invisible text | Animations starting at `opacity: 0` | Disabled animation |
| Transparent images | Conflicting opacity rules | Force `opacity: 1 !important` in owner |
| Background changing on scroll | `background-attachment: fixed` on mobile | Changed to `scroll` |
| White gap under images | Images as inline elements | `display: block !important` |

---

## 🎯 CLEAN CODE PRINCIPLES

### 1. One Component, One Owner
- Each component controlled by ONE file
- Other files can only add non-conflicting properties

### 2. Use `!important` Sparingly
- Only use in owner file to prevent overrides
- Document WHY you used it

### 3. Disable, Don't Delete
```css
/* ✅ GOOD */
.villa-chapter::before {
    /* DISABLED - Removing overlay per user request */
    display: none !important;
}

/* ❌ BAD - Just deleting leaves no documentation */
```

### 4. Comment Conflicts
```css
/* ✅ GOOD */
.villa-chapter {
    /* ALL GLASS EFFECTS MANAGED BY liquid-glass.css - DO NOT ADD BACKGROUND/BACKDROP-FILTER HERE */
}
```

### 5. Version Your Changes
- Update `?v=X` in index.html when editing CSS
- Force browser cache refresh

---

## 📊 FILES TO CLEAN UP (Future)

These files have conflicts or unused code:

- ❌ `cinematic-layout.css` - Unused, conflicts with styles.css
- ❌ `cinematic.css` - Unused, old version
- ❌ `gallery-supreme.css` - Replaced by gallery-quiet.css
- ❌ `luxury.css` - Old monolith file
- ❌ `polish.css` - Duplicate of premium-polish.css
- ⚠️ `villa-borders.css` - Mostly disabled, consider merging into liquid-glass.css

**Action:** Move to `/archive/` folder, don't delete (for reference)

---

## 🚀 PERFORMANCE RULES

### Mobile Optimizations

```css
@media (max-width: 768px) {
    /* ALWAYS reduce blur on mobile */
    .villa-chapter {
        --glass-blur: 8px; /* Desktop: 16px */
    }

    /* ALWAYS disable animations on mobile */
    .glass-distortion-overlay {
        animation: none !important;
        display: none;
    }

    /* ALWAYS use scroll, not fixed */
    body {
        background-attachment: scroll; /* NOT fixed */
    }
}
```

---

## ✅ CHECKLIST BEFORE COMMITTING CSS

- [ ] I checked the ownership table
- [ ] I only edited the owner file
- [ ] I searched for conflicts: `grep -n ".my-selector" *.css`
- [ ] I tested on desktop AND mobile
- [ ] I updated cache version in index.html
- [ ] I documented WHY I made the change
- [ ] I disabled conflicting code instead of deleting
- [ ] I tested with hard refresh (Ctrl+Shift+R)

---

## 📞 NEED HELP?

If you're unsure which file to edit:

1. Open browser DevTools
2. Inspect the element
3. Look at "Computed" styles
4. See which file is currently controlling it
5. Edit THAT file only

---

## 🎓 LESSONS LEARNED

### What Went Wrong:
- 33 CSS files all trying to style the same components
- No documentation of ownership
- Files loaded in wrong order
- Cascade conflicts everywhere
- Hours wasted debugging

### What We Fixed:
- Established single source of truth
- Documented ownership clearly
- Disabled conflicting styles
- Created this guide

### Moving Forward:
- **FOLLOW THIS GUIDE**
- One component = One owner
- Document everything
- Test thoroughly
- Never again.

---

**Last Updated:** Oct 2025
**Maintained By:** Development Team
**Status:** 🟢 Active - MUST FOLLOW
