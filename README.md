# Verto Shopping Cart

A simple e-commerce shopping cart application built with React.js frontend and Node.js Express backend.

## Features

### Core Features ✅
- **Backend API**:
  - `/api/products` - Returns hardcoded list of products
  - `/api/checkout` - Processes cart data and logs orders
  
- **Frontend**:
  - Product grid display with images, names, and prices
  - Add to cart functionality
  - Client-side cart state management
  - Shopping cart modal with item management
  - Checkout process that communicates with backend

### Bonus Features ✨
- **Quantity Management**: Users can change item quantities in the cart
- **Local Storage**: Cart contents persist across page refreshes
- **Backend Tests**: Jest tests for the `/products` endpoint and checkout functionality
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, modern interface with hover effects and animations

## Project Structure

```
verto_assignment/
├── backend/                    # Node.js Express server (MVC Pattern)
│   ├── models/                # Data models
│   │   ├── Product.js         # Product model with business logic
│   │   └── Order.js           # Order model with business logic
│   ├── controllers/           # Route controllers
│   │   ├── ProductController.js # Product-related endpoints
│   │   └── OrderController.js   # Order/checkout endpoints
│   ├── routes/                # Route definitions
│   │   ├── productRoutes.js   # Product routes
│   │   └── orderRoutes.js     # Order routes
│   ├── server.js              # Main server file
│   ├── server.test.js         # Test suite for API endpoints
│   └── package.json           # Backend dependencies
└── verto_shopping_cart/       # React.js frontend
    ├── src/
    │   ├── components/        # React components
    │   │   ├── Header.js      # Navigation header with cart button
    │   │   ├── ProductGrid.js # Product listing component
    │   │   ├── ProductCard.js # Individual product display
    │   │   └── CartModal.js   # Shopping cart modal
    │   ├── context/           # React Context for state management
    │   │   └── CartContext.js # Cart state management
```
    │   ├── services/          # API service layer
    │   │   └── api.js         # HTTP client for backend communication
    │   └── App.js             # Main application component
    └── package.json           # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Setup

1. **Clone the repository**:
   ```bash
   cd /path/to/verto_assignment
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The backend server will start on `http://localhost:5000`

3. **Set up the frontend** (in a new terminal):
   ```bash
   cd verto_shopping_cart
   npm install
   npm start
   ```
   The React app will start on `http://localhost:3000`

### Running Tests

**Backend Tests**:
```bash
cd backend
npm test
```

## API Endpoints

### GET /api/products
Returns a list of available products.

**Response**:
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Wireless Bluetooth Headphones",
      "price": 79.99,
      "imageUrl": "https://example.com/image.jpg"
    }
  ]
}
```

### POST /api/checkout
Processes cart checkout.

**Request Body**:
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Order placed successfully!",
  "orderId": "ORDER_1234567890",
  "total": "159.98",
  "items": [...]
}
```

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework with MVC architecture
- **CORS** - Cross-origin resource sharing
- **Jest** - Testing framework
- **Supertest** - HTTP testing library

### Frontend
- **React.js** - UI framework
- **React Context** - State management
- **Axios** - HTTP client
- **CSS3** - Styling with modern features
- **localStorage** - Client-side persistence

## Features Implemented

- [x] Product listing with grid layout
- [x] Add to cart functionality
- [x] Cart state management
- [x] Shopping cart modal
- [x] Quantity adjustment in cart
- [x] Remove items from cart
- [x] Cart total calculation
- [x] Checkout process
- [x] Backend API endpoints
- [x] Order logging to console
- [x] Local storage persistence
- [x] Backend test suite
- [x] Responsive design
- [x] Error handling
- [x] Loading states

## Development Notes

- The backend follows MVC (Model-View-Controller) architecture pattern
- Models handle business logic and data operations
- Controllers handle HTTP requests and responses
- Routes define API endpoints and map them to controllers
- The backend uses hardcoded product data (no database required)
- Cart state is managed using React Context API
- Cart contents are persisted to localStorage
- The application is fully responsive and mobile-friendly
- All API calls include proper error handling
- Backend includes comprehensive test coverage
