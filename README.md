# SHOP.CO - Full-Stack E-Commerce Web Application

A full-stack e-commerce web application featuring a frontend clone of the Shop.co Figma design template, combined with an administrative dashboard and role-based authentication.

## Tech Stack & Architecture

- **Frontend**: React.js 18, Vite, Tailwind CSS, Lucide Icons, React Router 6, Axios
- **Backend**: Node.js, Express.js (MVC Pattern with `index.js` entrypoint)
- **Database**: MongoDB Atlas with Mongoose
- **File Upload**: Multer disk storage for product image uploads

---

## Directory Structure

```
SHOPCO/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── seed.js
│
├── src/
│   ├── components/
│   │   ├── brands/ (Brands.jsx, Brands.css)
│   │   ├── breadcrumbs/ (Breadcrumbs.jsx, Breadcrumbs.css)
│   │   ├── dressstyle/ (DressStyle.jsx, DressStyle.css)
│   │   ├── footer/ (Footer.jsx, Footer.css)
│   │   ├── hero/ (Hero.jsx, Hero.css)
│   │   ├── navbar/ (Navbar.jsx, Navbar.css)
│   │   ├── newsletter/ (Newsletter.jsx, Newsletter.css)
│   │   ├── productcard/ (ProductCard.jsx, ProductCard.css)
│   │   ├── productlist/ (ProductList.jsx, ProductList.css)
│   │   ├── protectedroute/ (ProtectedRoute.jsx, ProtectedRoute.css)
│   │   ├── starrating/ (StarRating.jsx, StarRating.css)
│   │   ├── testimonials/ (Testimonials.jsx, Testimonials.css)
│   │   └── topbanner/ (TopBanner.jsx, TopBanner.css)
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx, AdminDashboard.css
│   │   │   ├── AdminOrders.jsx, AdminOrders.css
│   │   │   └── AdminProducts.jsx, AdminProducts.css
│   │   ├── auth/
│   │   │   ├── AdminLogin.jsx, AdminLogin.css
│   │   │   ├── Login.jsx, Login.css
│   │   │   └── Register.jsx, Register.css
│   │   ├── cart/ (Cart.jsx, Cart.css)
│   │   ├── checkout/ (Checkout.jsx, Checkout.css)
│   │   ├── home/ (Home.jsx, Home.css)
│   │   ├── orders/ (Orders.jsx, Orders.css)
│   │   ├── product/ (ProductDetail.jsx, ProductDetail.css)
│   │   └── shop/ (Shop.jsx, Shop.css)
│   ├── utils/
│   │   ├── api.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Environment Configuration

The backend environment file is located at `backend/.env`:

```env
PORT=8000
MONGO_URI=mongodb+srv://moizmoiz1000_db_user:901ed42c@qazimoiz.z11mwh5.mongodb.net/shopco?retryWrites=true&w=majority
ADMIN_EMAIL=admin@shopco.com
ADMIN_PASSWORD=admin123
JWT_SECRET=shopco_jwt_secret_key_2024_auth_token
```

---

## Installation & Setup Instructions

### 1. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Seed the MongoDB database with initial categories, mock products, and default accounts:

```bash
node seed.js
```

Start the backend server on port 8000:

```bash
node index.js
```

The API will be live at `http://localhost:8000`.

---

### 2. Frontend Setup

Open a second terminal at the project root (`SHOPCO/`):

```bash
npm install
npm run dev
```

The application will run locally at `http://localhost:5173`.

To create an optimized production build:

```bash
npm run build
```

---

## Default Login Credentials

### Administrator Account
- **Portal**: `/admin/login` or accessible via user menu
- **Email**: `admin@shopco.com`
- **Password**: `admin123`
- **Role**: `admin`
- **Privileges**: Access to `/admin`, `/admin/products` (CRUD + Multer Image Upload), and `/admin/orders` (fulfillment management).

### Customer Account
- **Portal**: `/login`
- **Email**: `user@shopco.com`
- **Password**: `user123`
- **Role**: `customer`
- **Privileges**: Browse products, apply filters, add to bag, checkout, and track personal orders.

---

## Key Features

1. **Role-Based Authentication**:
   - Customer registration, login, and profile retrieval via JWT.
   - Dedicated Administrator login with strict role enforcement on backend routes and frontend views.

2. **Storefront (Shop.co Figma Clone)**:
   - Top dismissible promo banner.
   - Sticky navbar with brand logo, interactive category dropdown, live search bar, cart item counter, and user profile menu.
   - Hero section with bold typography, dynamic counters (200+, 2000+, 30000+), decorative sparkle stars, and CTA.
   - Marquee brand bar (Versace, Zara, Gucci, Prada, Calvin Klein).
   - Dynamic New Arrivals & Top Selling sections fetched directly from MongoDB.
   - Browse by Dress Style interactive cards (Casual, Formal, Party, Gym).
   - Customer review testimonials carousel with 5-star ratings and verified buyer badges.
   - Overlapping newsletter subscription banner.
   - Multi-column footer with social links and payment badges.

3. **Product Catalog & Filters (`/shop`)**:
   - Filter by Category, Price Range, Color Swatches, Size Pills, and Dress Style.
   - Live search integration.
   - Sorting by Popularity, Price (Low/High), Newest, and Rating.
   - Responsive mobile filter drawer.
   - Pagination support.

4. **Product Detail Page (`/product/:id`)**:
   - Image gallery with selectable thumbnails.
   - Color picker and size selector.
   - Quantity selector with Add to Cart feedback.
   - Tabs for Product Details, Customer Reviews with "Write a Review" modal, and FAQs.
   - "You Might Also Like" related product recommendations.

5. **Shopping Bag & Checkout (`/cart` & `/checkout`)**:
   - Real-time cart state with persistent localStorage storage.
   - Quantity controls, item removal, subtotal, itemized discounts, delivery calculation (free over $200).
   - Promo code application (`SHOP20` for 20% off).
   - Full checkout workflow with shipping address form and payment method selection.
   - Order confirmation with instant database storage.

6. **Admin Dashboard (`/admin`)**:
   - Revenue, orders, live product counts, and customer statistics.
   - Product Management: Table with pagination, search, Add Product modal with Multer image upload, Edit modal, and Delete confirmation.
   - Order Management: Status tracking (Pending, Processing, Shipped, Delivered, Cancelled) with instant database updates.

