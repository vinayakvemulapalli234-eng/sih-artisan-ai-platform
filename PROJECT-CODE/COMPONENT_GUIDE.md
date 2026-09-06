# SIH Artisan Project — UI/UX Component & Design System Guide
**Author: Person 1 (Shared UI/UX Foundation)**  
**Audience: The 5 Engineering Team Members (Feature Pages, Backend/API, Database, AI Features, QA)**

---

## 1. Design System Tokens (Single Source of Truth)

All styling is strictly governed by design tokens configured in Tailwind and CSS variables. **Do not create new hex colors or non-standard spacing units.**

### Color Palette
| Token Name | Hex Code | Purpose |
|---|---|---|
| `primary` | `#B5502E` | Terracotta Brand Primary (actions, active links, accents) |
| `primary-dark` | `#8F3E22` | Hover & active state for primary buttons |
| `secondary` | `#7A6A3F` | Earthy Brass (artisan attributions, subtitles) |
| `accent` | `#2F5D50` | Forest Emerald (GI verification badges, AI feature tags) |
| `background` | `#FBF7F1` | Warm Ivory App Background |
| `surface` | `#FFFFFF` | Card & Panel Surfaces |
| `border` | `#E4DCCF` | Structural divider lines |
| `text-primary` | `#2B2420` | Deep Charcoal Heading & Body copy (AAA contrast) |
| `text-secondary` | `#6B6055` | Muted descriptions & metadata |
| `success` | `#3D7A4C` | Order delivered, stock available |
| `warning` | `#C08A1E` | Low stock, pending moderation |
| `error` | `#B23A34` | Critical stock out, destructive actions |
| `info` | `#2E5F8A` | Transit updates, regional badges |

### Typography
- **Headings / Hero / Stories:** `"Fraunces", serif` (weights: 400, 600, 700)
- **Body / Nav / UI / Tables / Forms:** `"Inter", sans-serif` (weights: 400, 500, 600, 700)

### Spacing Scale (4px Base Unit Only)
Use only Tailwind classes corresponding to the 4px scale:
`1` (4px), `2` (8px), `3` (12px), `4` (16px), `6` (24px), `8` (32px), `12` (48px), `16` (64px), `24` (96px).

### Border Radii & Elevation
- `rounded-sm` (6px), `rounded-md` (10px), `rounded-lg` (16px), `rounded-pill` (999px)
- `shadow-sm`, `shadow-md`, `shadow-lg`

---

## 2. Team Handoff Rules (Strictly Enforced)

1. **No One-Off Styling**: Never create ad-hoc buttons, cards, or inputs with inline classes for a feature. Reuse or extend existing primitives.
2. **Primitive Composition**: Every feature view must be composed from the shared primitives and domain components.
3. **Naming Convention**:
   - PascalCase for components (`ProductCard`, `Button`)
   - camelCase for props, hooks, and helpers (`onSelect`, `useMediaQuery`)
   - `"Domain + Element"` for composite components (`ProductCard`, `ArtisanCard`, `OrderRow`)
4. **Clean Scope**: Do not put backend routers, database schemas, or ML model code in this repository's UI directories.
5. **Decoupled Mock Layer**: Real data must be passed via props or imported from `/lib/mockData.js`. Replace mock promises with backend API calls without altering component JSX.

---

## 3. Primitives Quick Reference (`/src/components/primitives`)

### `Button`
```jsx
import { Button } from '@/components/primitives';

// Primary
<Button variant="primary" size="md" onClick={handleClick}>
  Save Craft
</Button>

// With loading state & icons
<Button
  variant="outline"
  size="sm"
  isLoading={isSaving}
  leftIcon={<Sparkles className="w-4 h-4" />}
>
  Generate Cultural Story
</Button>
```
*Variants:* `primary` | `secondary` | `outline` | `ghost` | `destructive` | `link`  
*Sizes:* `sm` | `md` | `lg`

### `Input` & `FormField`
```jsx
import { FormField, Input } from '@/components/primitives';

<FormField
  label="Craft Title"
  htmlFor="title-input"
  required
  error={errors.title}
  helperText="Give your handcrafted piece a descriptive name"
>
  <Input
    id="title-input"
    placeholder="e.g. Tree of Life Kalamkari"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    error={Boolean(errors.title)}
  />
</FormField>
```

### `MultiSelect`
```jsx
import { MultiSelect } from '@/components/primitives';

<MultiSelect
  options={[
    { value: 'cotton', label: 'Organic Khadi Cotton' },
    { value: 'indigo', label: 'Natural Indigo Vat' }
  ]}
  value={selectedMaterials}
  onChange={setSelectedMaterials}
  placeholder="Select materials..."
/>
```

### `Card`
```jsx
import { Card } from '@/components/primitives';

<Card variant="flat" padding="md">
  <Card.Header
    title="Card Title"
    subtitle="Subtitle text"
    action={<Button size="sm">Action</Button>}
  />
  <Card.Body>Main content goes here.</Card.Body>
  <Card.Footer>Footer content</Card.Footer>
</Card>
```
*Variants:* `flat` | `elevated` | `interactive`  
*Padding:* `none` | `sm` | `md` | `lg`

### `Modal` & `Drawer`
```jsx
import { Modal, Drawer } from '@/components/primitives';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
>
  Modal body text.
</Modal>

<Drawer
  isOpen={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
  title="Filters"
  position="right"
>
  Drawer contents.
</Drawer>
```

---

## 4. Domain & Living Craft Graph Components (`/src/components/domain`)

### `ProductCard`
```jsx
import { ProductCard } from '@/components/domain';

<ProductCard
  product={productData}
  onProductClick={(p) => navigateToDetail(p.id)}
  onTagClick={(type, val) => filterBy(val)}
  onFavoriteToggle={(p, isFav) => toggleFavorite(p.id, isFav)}
/>
```

### `CraftTagGroup` (Living Craft Graph Primary UI)
```jsx
import { CraftTagGroup } from '@/components/domain';

<CraftTagGroup
  craft="Kalamkari"
  technique="Bamboo Reed Pen"
  material="Organic Khadi Cotton"
  region="Andhra Pradesh"
  onTagClick={(type, label) => exploreGraphNode(type, label)}
/>
```

### `GraphView` (Living Craft Graph Radial Showcase)
```jsx
import { GraphView } from '@/components/domain';

<GraphView
  centerEntity={{
    id: 'craft-1',
    type: 'Craft',
    label: 'Kalamkari Hand Painting',
    summary: '...'
  }}
  connectedNodes={nodesArray}
  onNodeSelect={(node) => inspectNode(node)}
/>
```

### `DashboardStatCard`
```jsx
import { DashboardStatCard } from '@/components/domain';

<DashboardStatCard
  title="Total Sales"
  value="₹1,48,500"
  trend="+18.4%"
  isPositive={true}
  iconName="DollarSign"
  description="Direct earnings"
/>
```

---

## 5. Integration Guide for Other Team Members

### For Person 2 (Feature Pages & Flows)
- Compose all views using `PageContainer`, `SectionHeader`, `Grid`, and `Card`.
- Use the navigation config in `/src/lib/navigationConfig.js` to add or rename sidebar/topbar menu items.

### For Person 3 (Backend / API Engineer)
- Look in `/src/lib/mockData.js`. All data access functions are annotated with `// TODO: integrate with backend`.
- Replace the mock promises with `fetch('/api/v1/products')` or Axios calls. The component interfaces expect the exact JSON structure defined in `mockProducts`, `mockArtisans`, and `mockOrders`.

### For Person 4 (Database & Craft Graph Engineer)
- Map your relational database schemas or graph database tables to the Living Craft Graph node attributes:
  `Artisan → Product → Craft → Technique → Material → Region → Story → Season → Preference → Trend`.
- Every entity has a stable `id`, `name`/`label`, `region`, and `craft` field matching `/src/lib/constants.js`.

### For Person 5 (AI Features Engineer)
- **Personalized Recommendations:** Wire into `RecommendationCarousel` in `/src/components/domain/RecommendationCarousel.jsx` marked with `// STUB: AI feature`.
- **Natural Language Search:** Wire into `SearchBar` in `/src/components/domain/SearchBar.jsx` marked with `// STUB: AI feature`.
- **Artisan Story Assistant:** Wire into `ArtisanAddProductPage` in `/src/pages/artisan/ArtisanAddProductPage.jsx` marked with `// STUB: AI feature`.
- **Artisan Demand Insights:** Wire into `ArtisanInsightsPage` in `/src/pages/artisan/ArtisanInsightsPage.jsx` marked with `// STUB: AI feature`.

### For Person 6 (QA & Accessibility)
- **Responsive verification:** All pages have been tested at `375px` (mobile), `768px` (tablet), and `1280px` (desktop).
- **Keyboard navigation:** All buttons, modals, dropdowns, and tags support `Tab`, `Enter`, `Space`, and `Escape`.
- **Focus visibility:** Accessible focus rings are enabled on all interactive elements via the `focus-ring` utility.

---

## 6. Frontend Authentication System & API Integration Guide

### Authentication Files
- **Service Layer**: `/src/lib/authService.js` (Mock abstraction & pre-seeded demo personas)
- **Context & Hook**: `/src/hooks/useAuth.jsx` (`AuthProvider`, `useAuth()`)
- **Shared Auth Components**:
  - `/src/components/auth/AuthLayout.jsx` (Cultural split brand banner & card)
  - `/src/components/auth/PasswordInput.jsx` (Show/hide toggle & live strength meter)
- **Pages**:
  - Customer: `/src/pages/auth/CustomerLoginPage.jsx`, `/src/pages/auth/CustomerRegisterPage.jsx`
  - Artisan: `/src/pages/auth/ArtisanLoginPage.jsx`, `/src/pages/auth/ArtisanRegisterPage.jsx`
  - Admin: `/src/pages/auth/AdminLoginPage.jsx`
  - Recovery: `/src/pages/auth/ForgotPasswordPage.jsx`, `/src/pages/auth/ResetPasswordPage.jsx`

### Authentication Routes
- `#/login` → Customer Login
- `#/register` → Customer Registration
- `#/artisan-login` → Artisan Studio Sign In
- `#/artisan-register` → Artisan Onboarding
- `#/admin-login` → Administrative Governance Console
- `#/forgot-password` → Password Recovery Request
- `#/reset-password` → Password Reset & Validation

### How Role-Based Navigation Works
- **Guest Browsing**: Customers can browse the entire craft catalog (`/home`, `/explore`, `/craft-graph`, `/product-detail`, `/artisan-profile`) without signing in.
- **Protected Areas**: Navigating to `/artisan/*` or `/admin/*` without an active session automatically renders the corresponding login screen.
- **TopBar State**: If unauthenticated, TopBar displays a **"Sign In"** button. When authenticated, it shows the user's name, avatar with verification badge, and a **"Sign Out"** button.

### Backend API Integration Points (For Person 3)
In `/src/lib/authService.js`, replace the mock methods marked `// TODO: integrate with backend`:
1. `login({ identifier, password, role })` → `POST /api/v1/auth/login`
2. `register(userData)` → `POST /api/v1/auth/register`
3. `logout()` → `POST /api/v1/auth/logout`
4. `forgotPassword(email)` → `POST /api/v1/auth/forgot-password`
5. `resetPassword({ newPassword, confirmPassword })` → `POST /api/v1/auth/reset-password`

