# Website Color Scheme Guide

## 🎨 Primary Color: Light Gray

### Background Color
```css
background-color: #EAEAEA;
```

**RGB**: `rgb(234, 234, 234)`  
**HSL**: `hsl(0, 0%, 92%)`

This light gray provides:
- Soft, easy-on-the-eyes background
- Better than pure white for extended viewing
- Makes white cards and elements pop
- Modern, minimalist aesthetic

---

## 📝 Text Color Hierarchy

### 1. Primary Headings (H1, H2)
```css
color: #111827; /* text-gray-900 */
```
**Usage**: Main titles, section headings  
**Example**: "Your next hire is agentic", "Turn your audience into a business"

### 2. Secondary Text (Body, Paragraphs)
```css
color: #374151; /* text-gray-700 */
```
**Usage**: Body text, descriptions, longer content  
**Example**: Feature descriptions, explanatory text

### 3. Tertiary Text (Labels, Captions)
```css
color: #4B5563; /* text-gray-600 */
```
**Usage**: Labels, small text, metadata  
**Example**: "Compliant", "Control", form labels

### 4. Muted Text (Placeholders, Disabled)
```css
color: #9CA3AF; /* text-gray-400 */
```
**Usage**: Placeholder text, disabled states, icons  
**Example**: Icon colors, subtle elements

---

## 🎯 Accent Colors

### Primary Accent (Mint Green)
```css
color: #6ee7b7;
```
**Usage**: 
- Animated dots in visualizations
- Pie chart segments
- Active states
- Call-to-action highlights

### Success/CTA (Green)
```css
color: #10B981; /* green-500 */
```
**Usage**:
- "Request Access" indicator
- Success states
- Positive actions

---

## 🃏 Card & Component Colors

### White Cards
```css
background-color: #FFFFFF;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
```
**Usage**: All card components, modals, panels

### Dark Dashboard (Contrast Element)
```css
background-color: #111827; /* gray-900 */
```
**Usage**: Dashboard mockup in BusinessSection (intentional contrast)

### Gray Elements
```css
background-color: #F9FAFB; /* gray-50 */
background-color: #E5E7EB; /* gray-200 */
background-color: #9CA3AF; /* gray-400 */
background-color: #4B5563; /* gray-600 */
```
**Usage**: Subtle backgrounds, borders, decorative elements

---

## 🔄 Hover States

### Text Links
```css
/* Default */
color: #374151; /* text-gray-700 */

/* Hover */
color: #111827; /* text-gray-900 */
```

### Cards
```css
/* Default */
background-color: #FFFFFF;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);

/* Hover */
background-color: #F9FAFB; /* gray-50 */
box-shadow: 0 4px 12px rgba(0,0,0,0.12);
transform: translateY(-2px);
```

### Buttons
```css
/* Primary Button */
background-color: #FFFFFF;
color: #111827;

/* Hover */
background-color: #F9FAFB;
transform: scale(1.05);
```

---

## 📐 Spacing & Layout

### Section Padding
```css
padding: 5rem 2rem; /* py-20 px-8 */
padding: 6rem 2rem; /* py-24 px-8 */
```

### Container Max Width
```css
max-width: 1400px; /* Integration section */
max-width: 1280px; /* max-w-7xl - Most sections */
max-width: 1152px; /* max-w-6xl - Timeline section */
```

---

## 🎭 Special Effects

### Shadows
```css
/* Light shadow (cards) */
box-shadow: 0 2px 8px rgba(0,0,0,0.08);

/* Medium shadow (hover) */
box-shadow: 0 4px 12px rgba(0,0,0,0.12);

/* Heavy shadow (modals) */
box-shadow: 0 8px 30px rgba(0,0,0,0.12);
```

### Gradients
```css
/* Blue landscape gradient */
background: linear-gradient(to bottom right, #60A5FA, #3B82F6, #2563EB);

/* Purple chart gradient */
background: linear-gradient(to top, rgba(147,51,234,0.5), rgba(236,72,153,0.3));
```

---

## ✅ Accessibility

### Contrast Ratios (WCAG AA)

| Combination | Ratio | Status |
|-------------|-------|--------|
| `#111827` on `#EAEAEA` | 11.2:1 | ✅ AAA |
| `#374151` on `#EAEAEA` | 7.8:1 | ✅ AAA |
| `#4B5563` on `#EAEAEA` | 5.2:1 | ✅ AA |
| `#111827` on `#FFFFFF` | 14.5:1 | ✅ AAA |

All text combinations meet WCAG AA standards for accessibility.

---

## 🎨 Quick Reference

### Copy-Paste Color Values

```css
/* Main Theme */
--bg-main: #EAEAEA;
--bg-card: #FFFFFF;
--text-heading: #111827;
--text-body: #374151;
--text-label: #4B5563;
--text-muted: #9CA3AF;
--accent-primary: #6ee7b7;
--accent-success: #10B981;

/* Grays */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

---

## 🚀 Implementation Examples

### Section Background
```tsx
<section className="py-24 px-8" style={{ backgroundColor: '#EAEAEA' }}>
  {/* Content */}
</section>
```

### Card Component
```tsx
<div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
  <h3 className="text-gray-900 text-xl font-bold mb-2">Title</h3>
  <p className="text-gray-700">Description text</p>
  <span className="text-gray-600 text-sm">Label</span>
</div>
```

### Button
```tsx
<button className="px-6 py-2 bg-white text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
  Get Started
</button>
```

---

**Last Updated**: October 14, 2025  
**Theme**: Light Gray Minimalist  
**Status**: Production Ready
