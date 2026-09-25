## 1. Introduction

<div align="center">
  <h1>
    <img src="./Docs/LOGO.png" alt="E-Commerce Pro" width="200" height="200" />
  </h1>
  <p><strong>Ecom-A Full-Stack MERN Application for Online Clothing Brands</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>
  <p><strong>Live:</strong> <a href="https://projectecom-omega.vercel.app">Ecom</a> <strong>Screenshots:</strong> <a href="#4-screenshots">here</a></p>

</div>

<p>This repository contains the source code for E-Commerce Pro, a complete responsive e-commerce platform built with a React frontend and Node.js backend.The application includes product discovery, authentication, persistent cart management, customer and admin dashboards, order fulfillment, reviews, Cloudinary image uploads, and secure payment processing through Stripe.</p>

## 2. Features

1. **Multi-Provider Authentication:** Secure email/password login and one-click Google OAuth 2.0 with JWT access and HTTP-only refresh tokens.
2. **Instant Product Search:** Debounced 300ms live search in the navbar with MongoDB regex querying across product names, categories, and descriptions.
3. **Advanced Catalog Filtering:** Multi-facet catalog filtering by categories, dual-thumb interactive price range sliders, color swatches, and dress styles.
4. **Interactive Product Showcase:** Dynamic image gallery with live variant selection, discount badge calculation, and stock limits.
5. **Customer Reviews & Ratings:** Star-rating submission modal with sorting options and verified buyer feedback display.
6. **Persistent Slide-Out Cart:** Global sliding cart drawer supporting individual variant combinations, real-time quantity controls, and live subtotal updates.
7. **Dual Payment & Stripe Integration:** Seamless checkout supporting Cash on Delivery and server-verified Stripe card payments with webhook order confirmation.
8. **Real-Time Admin Analytics:** Interactive KPI dashboard featuring revenue charts, conversion rates, order counts, and instant CSV export reports.
9. **Full Inventory Studio:** Complete product lifecycle manager with multi-image uploads, size pickers, hex color tags, and rich text descriptions.
10. **Order Fulfillment Hub:** Admin order tracker with live status updates and customer shipping details.
11. **Visual Storefront Configurator:** Dynamic admin tools to customize the homepage style showcase and configure footer contact details, brand bio, and social links.
12. **Customer Self-Service Portal:** User dashboard to monitor order timelines, manage shipping addresses, and securely update passwords.
13. **Fluid Motion & Micro-Interactions:** Modern UI powered by Framer Motion with staggered page reveals, 3D card tilt physics, and tactile button feedback.

## 3. Installation

<br/>
<p><strong>1. Clone the repository and open the project folder:</strong></p>

```bash
git clone https://github.com/SMKanzuleman/Ecom
cd Ecom
```

### 3.1 Backend

<br/>
<p><strong>2. Install the backend dependencies:</strong></p>

```bash
cd BackEnd
npm install
```

<br/>
<p><strong>3. Create a `.env` file inside <code>BackEnd</code> and add your private environment values. Do not commit this file or publish its secrets.</strong></p>

Required variables:

```dotenv
PORT="Backend Port"
MONGOURL="Your MongoDB Atlas cluster URL or MongoDB Compass URL"
ACCESS_TOKEN_JWT_SECRET="Your access token secret"
ACCESS_TOKEN_EXPIRY="Access token expiry duration"
REFRESH_TOKEN_EXPIRY="Refresh token expiry duration"
REFRESH_TOKEN_JWT_SECRET="Your refresh token secret"
NODE_ENV="Application environment"
OAUTH_CLIENT_ID="Your Google OAuth client ID"
OAUTH_CLIENT_SECRET="Your Google OAuth client secret"
OAUTH_CALLBACK_URL="Your Google OAuth callback URL"
CLOUDINARY_CLOUD_NAME="Your Cloudinary cloud name"
CLOUDINARY_API_KEY="Your Cloudinary API key"
CLOUDINARY_API_SECRET="Your Cloudinary API secret"
RESEND_API_KEY="Your Resend API key"
STRIPE_SECRET_KEY="Your Stripe secret key"
CLIENT_URL="Your frontend URL"
```

<p><strong>4. Start the backend:</strong></p>

```bash
npm run dev
```

### 3.2 Frontend

<br/>
<p><strong>5. Open a new terminal, then install and start the frontend:</strong></p>

```bash
cd FrontEnd
npm install
npm run dev
```

## 4. Screenshots

### 4.1 Storefront

<table width="100%">
  <tr>
    <!-- LEFT SIDE: Full-height Home Page -->
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Home Page
      </div>
      <br/><br/>
      <img src="./Docs/HP.png" alt="Home Page" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
    <!-- RIGHT SIDE: Shop + Product Detail -->
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Shop Page
      </div>
      <br/><br/>
      <img src="./Docs/sp.png" alt="Shop Page" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
      <br/><br/>
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Product Detail Page
      </div>
      <br/><br/>
      <img src="./Docs/pd.png" alt="Product Detail" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
  </tr>
</table>

<table width="100%">
  <tr>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Shopping Cart
      </div>
      <br/><br/>
      <img src="./Docs/cart.png" alt="Cart Drawer" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Checkout
      </div>
      <br/><br/>
      <img src="./Docs/checkout.png" alt="Authentication" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
  </tr>
    <tr>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Shopping Cart
      </div>
      <br/><br/>
      <img src="./Docs/Welcome.png" alt="Cart Drawer" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Authentication
      </div>
      <br/><br/>
      <img src="./Docs/Login.png" alt="Authentication" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
  </tr>
</table>

### 4.2 Admin Dashboard

<table width="100%">
<tr>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Dashboard Analytics
      </div>
      <br/><br/>
      <img src="./Docs/AdDash.png" alt="Admin Dashboard" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Product Inventory
      </div>
      <br/><br/>
      <img src="./Docs/AdPs.png" alt="Product Inventory" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Add New Product
      </div>
      <br/><br/>
      <img src="./Docs/AdADDP.png" alt="Add Product" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Order Fulfillment
      </div>
      <br/><br/>
      <img src="./Docs/AdOrders.png" alt="Orders Manager" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Customers Management
      </div>
      <br/><br/>
      <img src="./Docs/AdCs.png" alt="Customers Manager" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Home Showcase Layout
      </div>
      <br/><br/>
      <img src="./Docs/AdHomeStyle.png" alt="Home Styles" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Footer & Social Configurator
      </div>
      <br/><br/>
      <img src="./Docs/AdConfFoo.png" alt="Footer Config" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
     <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Adding HomePage(Browse) Styles
      </div>
      <br/><br/>
      <img src="./Docs/AdStyles.png" alt="Footer Config" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
  </tr>
 
  </tr>
</table>

<br/>

### 4.3 Customer Dashboard

<table width="100%">
  <tr>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Account Overview
      </div>
      <br/><br/>
      <img src="./Docs/UsOverview.png" alt="User Overview" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Recent Orders
      </div>
      <br/><br/>
      <img src="./Docs/UsROds.png" alt="User Orders" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <div style="background: #1e1e24; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 13px; letter-spacing: 0.5px; border: 1px solid #333;">
        Profile & Settings
      </div>
      <br/><br/>
      <img src="./Docs/UsPF.png" alt="User Profile" width="100%" style="border-radius: 8px; border: 1px solid #333;" />
    </td>
  </tr>
</table>
