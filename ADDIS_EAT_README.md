# ADDIS-EAT - Food Delivery Platform

A modern, full-featured food delivery platform built with React, Vite, Tailwind CSS, Zustand, and React Router. Features JWT authentication, role-based access control, and a comprehensive business dashboard.

## 🎨 Design Philosophy

**Vibrant Urban** aesthetic combining bold colors, contemporary typography, and playful interactions. The design celebrates energy and efficiency while maintaining approachability and trust.

### Color Palette
- **Primary Orange (#FF6B35)**: Energy, appetite, and action
- **Secondary Teal (#00A8A8)**: Trust, freshness, and balance
- **Accent Yellow (#FFD700)**: Highlights and micro-interactions
- **Neutrals**: Charcoal (#1A1A1A) and Off-white (#F8F8F8)

### Typography
- **Display Font**: Poppins Bold (700) for headlines
- **Body Font**: Inter Regular (400) for content
- **Accent Font**: Poppins SemiBold (600) for CTAs

## 📁 Project Structure

```
addis-eat/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Auth.tsx              # Authentication (login/signup)
│   │   │   ├── Home.tsx              # Customer home with restaurants
│   │   │   ├── Restaurant.tsx        # Restaurant menu & items
│   │   │   ├── Cart.tsx              # Shopping cart
│   │   │   ├── Orders.tsx            # Order history
│   │   │   ├── Dashboard.tsx         # Restaurant management dashboard
│   │   │   └── NotFound.tsx          # 404 page
│   │   ├── stores/
│   │   │   ├── authStore.ts          # JWT authentication state
│   │   │   └── cartStore.ts          # Shopping cart state
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx    # Route protection component
│   │   │   └── ui/                   # shadcn/ui components
│   │   ├── lib/
│   │   │   ├── mockData.ts           # Mock restaurants, orders, analytics
│   │   │   └── utils.ts              # Utility functions
│   │   ├── App.tsx                   # Router configuration
│   │   ├── main.tsx                  # Entry point
│   │   └── index.css                 # Global styles & design tokens
│   ├── index.html                    # HTML template
│   └── public/                       # Static assets
├── package.json
└── tsconfig.json
```

## 🚀 Key Features

### 1. **Authentication System**
- JWT-based authentication with mock backend
- Role-based access (Customer vs Restaurant)
- Secure token storage using cookies
- Sign up and sign in functionality
- Demo credentials: `demo@addis.com` / `demo123`

### 2. **Customer Features**
- **Home Page**: Browse restaurants with search and filtering
- **Restaurant Menu**: View detailed menu items with ratings and reviews
- **Shopping Cart**: Add/remove items, adjust quantities, persistent storage
- **Order Management**: Track order history with status updates
- **Responsive Design**: Optimized for mobile and desktop

### 3. **Restaurant Dashboard**
- **Overview**: Real-time KPIs (orders, revenue, ratings, customers)
- **Order Management**: View and update order statuses
- **Menu Management**: Add, edit, delete menu items
- **Analytics**: Weekly trends, top-selling items, revenue distribution
- **Charts**: Interactive charts using Recharts

### 4. **State Management**
- **Zustand**: Global state for auth and cart
- **Persistent Storage**: Cart and auth data survive page refreshes
- **Smooth Selections**: Centralized state for global selections

## 🔐 Authentication & Authorization

### JWT Implementation
```typescript
// Mock JWT token structure
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ email, role, iat: Date.now() }))}.mock_signature`
```

### Protected Routes
```typescript
<ProtectedRoute requiredRole="restaurant">
  <Dashboard />
</ProtectedRoute>
```

Routes automatically redirect unauthenticated users to `/auth` and check role-based access.

## 📦 Dependencies

### Core
- **React 19**: UI framework
- **Vite**: Build tool
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Styling

### State Management & Routing
- **Zustand**: Global state management
- **React Router DOM**: Client-side routing
- **js-cookie**: Cookie management

### UI Components
- **shadcn/ui**: Pre-built React components
- **Lucide React**: Icon library
- **Recharts**: Data visualization

### Utilities
- **Sonner**: Toast notifications
- **Framer Motion**: Animations (pre-installed)

## 🎯 Getting Started

### Installation
```bash
cd addis-eat
pnpm install
```

### Development
```bash
pnpm dev
```
Server runs on `http://localhost:3000`

### Build
```bash
pnpm build
```

### Type Checking
```bash
pnpm check
```

## 🔄 Data Flow

### Authentication Flow
1. User navigates to `/auth`
2. Enters credentials and selects role (Customer/Restaurant)
3. Mock auth service validates and returns JWT token
4. Token stored in cookies and Zustand store
5. User redirected to appropriate dashboard

### Cart Flow
1. Customer browses restaurants and selects items
2. Items added to Zustand cart store
3. Cart persists in localStorage
4. Checkout calculates subtotal, tax, delivery fee
5. Order placed and cart cleared

### Order Flow
1. Restaurant receives order notification
2. Order status updates through dashboard
3. Customer views order status in `/orders`
4. Status progression: pending → confirmed → preparing → ready → out_for_delivery → delivered

## 🎨 Design Tokens

### Colors
```css
--primary: #FF6B35;           /* Deep Orange */
--secondary: #00A8A8;         /* Teal */
--accent: #FFD700;            /* Yellow */
--foreground: #1A1A1A;        /* Charcoal */
--background: #F8F8F8;        /* Off-white */
```

### Spacing
Uses Tailwind's default spacing scale (4px base unit)

### Border Radius
```css
--radius: 0.65rem;            /* Default */
--radius-sm: 0.25rem;
--radius-md: 0.45rem;
--radius-lg: 0.65rem;
--radius-xl: 1.05rem;
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

All pages are mobile-first and fully responsive.

## 🧪 Mock Data

### Restaurants
- **Addis Red Sea**: Traditional Ethiopian cuisine
- **Habesha Kitchen**: Modern Ethiopian flavors
- **Lion of Judah**: Premium Ethiopian dining

### Menu Items
Each restaurant has 3-4 signature dishes with:
- Name, description, price
- Customer ratings and reviews
- Category classification

### Orders
Mock order history with various statuses and items

### Analytics
Weekly trends, top-selling items, revenue distribution

## 🔒 Security Considerations

### Current Implementation (Development)
- Mock JWT tokens for demonstration
- Tokens stored in cookies with 7-day expiration
- Basic role-based access control

### Production Recommendations
- Replace mock auth with real backend API
- Implement proper JWT signing/verification
- Use secure HTTP-only cookies
- Add CSRF protection
- Implement rate limiting
- Add input validation and sanitization

## 🚀 Future Enhancements

- [ ] Real backend API integration
- [ ] Payment processing (Stripe)
- [ ] Real-time order tracking with WebSockets
- [ ] Push notifications
- [ ] User reviews and ratings
- [ ] Favorites/bookmarks
- [ ] Promo codes and discounts
- [ ] Multiple delivery addresses
- [ ] Order scheduling
- [ ] Admin panel for platform management

## 📝 Environment Variables

The application uses built-in Manus environment variables:
- `VITE_ANALYTICS_ENDPOINT`: Analytics endpoint
- `VITE_ANALYTICS_WEBSITE_ID`: Analytics website ID
- `VITE_APP_ID`: Application ID
- `VITE_APP_TITLE`: Application title

## 🎯 Testing Credentials

### Customer Account
- Email: `demo@addis.com`
- Password: `demo123`
- Role: Customer

### Restaurant Account
- Email: `demo@addis.com`
- Password: `demo123`
- Role: Restaurant

## 📞 Support

For issues or questions, refer to the design philosophy in `ideas.md` and component documentation in `client/src/components/`.

## 📄 License

MIT

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
