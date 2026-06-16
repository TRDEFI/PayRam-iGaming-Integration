# TRDEFI Design System

## 1. Visual Theme & Atmosphere

**Vibe:** Premium crypto fintech meets Turkish warmth. Dark, sophisticated, but approachable.

**Mood:** Trustworthy like a bank, innovative like a startup, warm like Turkish hospitality.

**Density:** Medium-high. Data-rich but not cluttered. Every pixel serves a purpose.

**Inspiration:** Stripe's gradient elegance + Coinbase's trust-focused clarity + Turkish geometric patterns (subtle).

---

## 2. Color Palette & Roles

```css
:root {
  /* Primary - Turkish Orange/Amber */
  --color-primary-50: #fffbeb;
  --color-primary-100: #fef3c7;
  --color-primary-200: #fde68a;
  --color-primary-300: #fcd34d;
  --color-primary-400: #fbbf24;
  --color-primary-500: #f59e0b;  /* Main brand color */
  --color-primary-600: #d97706;
  --color-primary-700: #b45309;
  --color-primary-800: #92400e;
  --color-primary-900: #78350f;

  /* Accent - Emerald (Trust/Growth) */
  --color-accent-400: #34d399;
  --color-accent-500: #10b981;
  --color-accent-600: #059669;

  /* Neutral - Dark surfaces */
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #020617;

  /* Semantic */
  --color-background: #0a0a0f;
  --color-surface: #12121a;
  --color-surface-elevated: #1a1a25;
  --color-border: rgba(245, 158, 11, 0.15);
  --color-border-hover: rgba(245, 158, 11, 0.3);
}
```

---

## 3. Typography Rules

**Primary Font:** `Clash Display` (headings, hero)
- Weight: 500 (Medium), 600 (Semibold), 700 (Bold)
- Letter-spacing: -0.02em (tight for headlines)

**Secondary Font:** `Newsreader` (body, descriptions)
- Weight: 400 (Regular), 500 (Medium)
- Line-height: 1.6 (generous for readability)

**Mono Font:** `JetBrains Mono` (stats, code, numbers)
- Weight: 500

**Type Scale:**
```css
--text-hero: clamp(3rem, 8vw, 6rem);      /* 48-96px */
--text-h1: clamp(2.5rem, 5vw, 4rem);      /* 40-64px */
--text-h2: clamp(2rem, 4vw, 3rem);        /* 32-48px */
--text-h3: clamp(1.5rem, 3vw, 2rem);      /* 24-32px */
--text-body-lg: 1.25rem;                   /* 20px */
--text-body: 1rem;                         /* 16px */
--text-body-sm: 0.875rem;                  /* 14px */
--text-caption: 0.75rem;                   /* 12px */
```

---

## 4. Component Stylings

### Buttons
```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: #000;
  font-weight: 600;
  border-radius: 12px;
  padding: 16px 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.25);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.35);
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-neutral-300);
  border-radius: 12px;
  padding: 16px 32px;
}

.btn-secondary:hover {
  border-color: var(--color-primary-500);
  background: rgba(245, 158, 11, 0.05);
}
```

### Cards
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

### Gradients
```css
.gradient-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
}

.gradient-mesh {
  background: 
    radial-gradient(at 20% 80%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
    radial-gradient(at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
    var(--color-background);
}
```

---

## 5. Layout Principles

**Grid System:** 12-column, max-width 1280px
**Spacing Scale:** 4px base (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128)
**Section Padding:** 128px vertical (desktop), 80px (mobile)
**Content Width:** 1120px max for text content

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 6. Depth & Elevation

**Shadow Tokens:**
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);
--shadow-glow: 0 0 40px rgba(245, 158, 11, 0.15);
```

**Surface Hierarchy:**
1. Background (lowest): `#0a0a0f`
2. Surface: `#12121a`
3. Surface Elevated: `#1a1a25`
4. Overlay: `rgba(0, 0, 0, 0.8)`

---

## 7. Do's and Don'ts

### ✅ Do:
- Use generous whitespace between sections
- Apply subtle glow effects on primary elements
- Use asymmetric layouts (bento grid, overlapping)
- Include micro-interactions on hover
- Use real data/stats when possible
- Keep CTAs above the fold

### ❌ Don't:
- Use Inter or Roboto fonts
- Use Lucide icons (use Iconify Solar instead)
- Apply purple gradients
- Create perfectly symmetrical grids
- Use generic bento grid without twist
- Overload with animations (subtle is key)

---

## 8. Responsive Behavior

**Mobile-First Approach:**
- Stack cards vertically on mobile
- Reduce hero text size by 40%
- Hide secondary navigation
- Simplify gradients (remove mesh on mobile)
- Touch targets: minimum 44px

**Tablet Adjustments:**
- 2-column grids become single column
- Reduce section padding to 80px
- Simplify hover effects

---

## 9. Agent Prompt Guide

**For Claude Design:**
```
Use the TRDEFI design system defined in DESIGN.md.

Key characteristics:
- Dark theme with orange (#f59e0b) as primary accent
- Emerald (#10b981) for trust/growth indicators
- Clash Display for headlines, Newsreader for body
- Generous spacing, asymmetric layouts
- Subtle glow effects, not heavy shadows
- Turkish warmth meets fintech precision

Apply these tokens consistently across all components.
```

---

## Vibe Spec

**One-line summary:** "Premium Turkish crypto platform that feels like a luxury bank app, not a garage startup."

**Three adjectives:** Trustworthy, Warm, Innovative

**Visual metaphor:** A golden Ottoman pattern overlaid on a modern dark fintech interface.

**Never look like:** Generic SaaS landing page, crypto bro aesthetic, corporate banking site.
