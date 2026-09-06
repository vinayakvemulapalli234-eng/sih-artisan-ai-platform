# SIH ARTISAN PROJECT — MASTER PROJECT SPECIFICATION

## 1. Project Purpose

Build a modern digital platform that helps traditional artisans preserve, showcase, market, and grow their craft while helping customers discover authentic handcrafted products.

The platform should connect:
- Artisans
- Customers / Buyers
- Craft traditions
- Products
- Materials
- Techniques
- Regions
- Cultural stories
- Market demand
- Customer preferences

The system should not behave like a simple e-commerce website. It should combine:
- Craft discovery
- Artisan empowerment
- E-commerce
- Cultural storytelling
- AI-powered recommendations
- Knowledge relationships between crafts and products

---

## 2. Core Differentiating Concept — Living Craft Graph

The platform should contain a "Living Craft Graph".

The graph represents relationships between:

Artisan → Product → Craft → Technique → Material → Region → Cultural Story → Season → Customer Preference → Market Trends

Example:

An artisan creates a product using:
- Kalamkari technique
- Natural dyes
- Cotton
- Andhra Pradesh craft tradition

The system should be able to connect these entities and use the relationships to improve:
- Product discovery
- Recommendations
- Artisan visibility
- Craft storytelling
- Customer understanding
- Market insights

The graph should be designed so that relationships can grow as new products, artisans, techniques, materials, and customer interactions are added.

---

## 3. Main User Roles

### Artisan

The artisan should be able to:

- Register/login
- Create an artisan profile
- Add craft information
- Upload products
- Add product images
- Add product descriptions
- Add price
- Add materials
- Add techniques
- Add region
- Add cultural/story information
- Manage inventory
- View orders
- View sales
- View customer interest
- Receive useful insights
- Manage their profile and products

### Customer / Buyer

The customer should be able to:

- Register/login
- Browse products
- Search products
- Filter products
- Explore artisans
- Explore crafts
- View product details
- Learn the cultural story behind products
- Save/favorite products
- Add products to cart
- Purchase products
- View orders
- Receive personalized recommendations

### Admin

The admin should be able to:

- Manage users
- Manage artisans
- Manage products
- Manage crafts
- Manage categories
- Monitor platform activity
- Manage reported content
- View platform-level analytics

---

## 4. Customer Experience

The customer experience should focus on discovery rather than only selling.

The customer should be able to discover:

- Products
- Artisans
- Crafts
- Regions
- Techniques
- Materials
- Cultural stories

Product pages should communicate both:

1. What the customer is buying
2. The story and heritage behind the product

---

## 5. Artisan Experience

The artisan dashboard should be simple and accessible.

Avoid unnecessarily complicated interfaces.

Important dashboard areas:

- Overview
- Products
- Add Product
- Orders
- Inventory
- Sales
- Insights
- Profile

The interface should prioritize clarity and usability.

---

## 6. AI Features

AI can be used for:

### Personalized Product Recommendations

Recommend products based on:

- Customer interests
- Previous interactions
- Previous purchases
- Craft preferences
- Materials
- Techniques
- Regions

### Product Story Assistance

Help artisans create better product descriptions and cultural stories from the information they provide.

### Smart Search

Allow customers to search naturally for products using meaningful queries.

Example:

"I want a traditional handmade gift from South India."

### Artisan Insights

Provide useful insights to artisans based on:

- Product interest
- Customer preferences
- Sales patterns
- Popular crafts
- Popular materials
- Seasonal demand

AI should support the platform and should not replace the artisan's cultural knowledge.

---

## 7. Product Information

Each product should support information such as:

- Product name
- Description
- Images
- Price
- Availability
- Materials
- Techniques
- Craft category
- Region
- Artisan
- Cultural story
- Estimated production information where appropriate
- Tags

---

## 8. UI/UX PRINCIPLES

The entire application must follow ONE consistent design system.

All team members must follow the same:

- Color palette
- Typography
- Button styles
- Card styles
- Navigation
- Form styles
- Spacing
- Border radius
- Icons
- Shadows
- Responsive behavior
- Component patterns

Do not create separate visual styles for different modules.

The UI should feel:

- Modern
- Premium
- Cultural
- Trustworthy
- Accessible
- Clean
- Easy to navigate

The cultural identity should be represented respectfully without making the interface visually cluttered.

---

## 9. Responsive Design

The application must work properly on:

- Desktop
- Laptop
- Tablet
- Mobile

Design mobile-first where practical.

---

## 10. Navigation

The application should provide clear navigation appropriate to the user's role.

Customer navigation may include:

- Home
- Explore
- Crafts
- Artisans
- Favorites
- Cart
- Profile

Artisan navigation may include:

- Dashboard
- Products
- Add Product
- Orders
- Inventory
- Insights
- Profile

Admin navigation may include:

- Dashboard
- Users
- Artisans
- Products
- Crafts
- Reports
- Analytics

The exact navigation can be refined during UI/UX design.

---

## 11. Technical Principles

The final application should have:

- Clean architecture
- Reusable components
- Secure authentication
- Proper authorization
- Validated forms
- Proper error handling
- Responsive UI
- Maintainable code
- Scalable database structure
- API-based communication between frontend and backend

Do not hard-code data that should come from the database.

---

## 12. Database Principles

The database should be designed around the main entities:

- Users
- Artisans
- Products
- Crafts
- Materials
- Techniques
- Regions
- Stories
- Orders
- Order Items
- Favorites
- Reviews
- Recommendations
- Graph Relationships

Relationships between entities should be considered carefully because the Living Craft Graph is a major project feature.

---

## 13. Team Development Rule

This project is being developed by a team.

All team members must:

1. Follow the master project specification.
2. Follow the common UI/UX design created by Person 1.
3. Reuse existing components whenever possible.
4. Avoid changing another member's module without discussion.
5. Keep APIs and data models consistent.
6. Communicate integration requirements clearly.
7. Avoid creating duplicate features.
8. Keep code modular and maintainable.

---

## 14. Person 1 — UI/UX Foundation

Person 1 is responsible for establishing the common visual foundation.

Person 1 should create:

- Overall application layout
- Design system
- Color palette
- Typography
- Navigation system
- Buttons
- Cards
- Forms
- Product cards
- Artisan cards
- Dashboard layout
- Responsive layout patterns
- Common reusable components

The resulting design should become the visual standard for the other team members.

Other team members should reuse this design rather than creating unrelated UI styles.

---

## 15. Development Workflow

The preferred workflow is:

Project Requirements
        ↓
Master Specification
        ↓
UI/UX Design
        ↓
Frontend Structure
        ↓
Backend/API
        ↓
Database
        ↓
AI Features
        ↓
Integration
        ↓
Testing
        ↓
Deployment

AI coding tools may be used, but generated code must be reviewed and understood by the team.

---

## 16. Important Rule for AI Coding Tools

When using Claude, Antigravity, or other AI coding tools:

- Do not blindly accept generated code.
- Follow the master project specification.
- Do not introduce technologies without checking compatibility.
- Do not overwrite existing work unnecessarily.
- Reuse existing components.
- Preserve the established UI design.
- Explain major architectural decisions.
- Identify files that will be created or modified.
- Consider integration with other team members before making structural changes.

---

## 17. Project Quality Goals

The final project should demonstrate:

- Strong problem solving
- Real-world usefulness
- Clean UI/UX
- Meaningful AI integration
- Good database design
- Working APIs
- Strong Living Craft Graph concept
- Good accessibility
- Responsive design
- Secure authentication
- Clear separation of modules
- Good teamwork and integration

The goal is to create a functional, coherent product rather than a collection of disconnected demos.

---

## 18. Source of Truth

This document is the MASTER PROJECT SPECIFICATION.

Before making major architectural, UI, database, or feature decisions, compare the decision against this document.

If a new requirement conflicts with this document, identify the conflict before implementing it.

Future project-specific prompts should reference this master specification whenever possible.