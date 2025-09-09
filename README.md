# Rental Co - Complete Online Ordering System

A full-featured e-commerce platform for rental and sale products with user authentication, cart management, order processing, and admin dashboard.

## 🚀 Features

### 🔐 Authentication System
- **User Registration & Login**: Email/password authentication with Firebase
- **Session Management**: Persistent user sessions across the application
- **Protected Routes**: Secure access to user-specific features

### 🛒 Shopping Cart System
- **Add to Cart**: Add products to cart from product listings
- **Cart Management**: Update quantities, remove items, view cart total
- **Persistent Cart**: Cart data persists across browser sessions
- **Cart Icon**: Real-time cart item count in header

### 📦 Order Management
- **Checkout Process**: Complete order placement with shipping address
- **Order Confirmation**: Detailed order confirmation page
- **Order History**: Users can view all their past orders
- **Order Status Tracking**: Real-time order status updates

### 👨‍💼 Admin Dashboard
- **Order Management**: View and update order statuses
- **User Management**: View registered users and their order history
- **Analytics**: Revenue tracking, order statistics, user counts
- **Real-time Updates**: Live data updates without page refresh

### 🎨 User Interface
- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Loading States**: Smooth loading animations and transitions
- **Error Handling**: User-friendly error messages and validation

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── admin/          # Admin dashboard components
│   │   └── AdminDashboard.tsx
│   ├── Cart.tsx        # Shopping cart component
│   ├── Checkout.tsx    # Checkout process
│   ├── OrderConfirmation.tsx
│   ├── UserOrders.tsx  # User order history
│   └── ...            # Other existing components
├── contexts/
│   └── AuthContext.tsx # Authentication context
├── store/
│   └── cartStore.ts    # Zustand cart store
├── firebase.ts         # Firebase configuration
└── App.tsx            # Main application component
```

## 🔥 Firebase Setup

### Required Firebase Services:
1. **Authentication**: Enable Email/Password sign-in method
2. **Firestore Database**: Create the following collections:

#### Users Collection
```javascript
users/{uid}/
{
  name: string,
  email: string,
  address: string,
  orders: string[],
  createdAt: timestamp
}
```

#### Products Collection
```javascript
products/{id}/
{
  name: string,
  description: string,
  price: number,
  type: 'rent' | 'sale',
  imageUrl: string
}
```

#### Orders Collection
```javascript
orders/{orderId}/
{
  uid: string,
  items: CartItem[],
  address: AddressForm,
  total: number,
  status: 'pending' | 'confirmed' | 'cancelled',
  timestamp: timestamp,
  email: string
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Authentication and Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rental-co
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Update `src/firebase.ts` with your Firebase config

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Usage

### For Users:
1. **Sign Up/Login**: Create an account or sign in
2. **Browse Products**: View products in the product library
3. **Add to Cart**: Add items to your shopping cart
4. **Checkout**: Complete the checkout process with shipping details
5. **Track Orders**: View order history and status

### For Admins:
1. **Access Dashboard**: Navigate to `/admin` or use the user menu
2. **Manage Orders**: Update order statuses and view order details
3. **View Users**: Monitor registered users and their activity
4. **Analytics**: Track revenue and order statistics

## 🔒 Security Features

- **Protected Routes**: Authentication required for cart, checkout, and orders
- **Firebase Security Rules**: Configure Firestore security rules
- **Input Validation**: Form validation and error handling
- **Session Management**: Secure user session handling

## 🎯 Key Features Explained

### Cart System
- Uses Zustand for state management with persistence
- Real-time cart updates across components
- Quantity management and item removal
- Automatic total calculation

### Order Processing
- Complete checkout flow with address collection
- Order creation in Firestore
- User order history tracking
- Order status management

### Admin Dashboard
- Real-time order monitoring
- User management interface
- Revenue and statistics tracking
- Order status updates

## 🔧 Customization

### Adding New Product Types
1. Update the product type in Firestore
2. Modify the filter logic in product components
3. Update the cart store to handle new types

### Customizing Order Status
1. Update the status options in admin dashboard
2. Modify the status display components
3. Update the order confirmation page

### Styling Changes
- All styling uses Tailwind CSS classes
- Modify components directly for design changes
- Update color schemes in Tailwind config

## 🐛 Troubleshooting

### Common Issues:
1. **Firebase Connection**: Ensure Firebase config is correct
2. **Authentication**: Check Firebase Authentication settings
3. **Firestore Rules**: Verify Firestore security rules allow read/write
4. **CORS Issues**: Check Firebase project settings

### Development Tips:
- Use browser dev tools to check for console errors
- Verify Firebase console for authentication and database logs
- Test with different user accounts for admin features

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository. 