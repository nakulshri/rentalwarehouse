# Firebase Setup Guide

## 🔥 Firebase Configuration Issues

The 400 error you're seeing is likely due to Firebase Authentication not being properly configured. Here's how to fix it:

## 1. Firebase Console Setup

### Step 1: Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `rentalco`
3. In the left sidebar, click **Authentication**
4. Click **Get started**
5. Go to the **Sign-in method** tab
6. Enable **Email/Password** provider:
   - Click on **Email/Password**
   - Toggle the **Enable** switch to ON
   - Click **Save**

### Step 2: Configure Firestore
1. In the left sidebar, click **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location (choose the closest to your users)
5. Click **Done**

### Step 3: Set Firestore Rules
1. In Firestore Database, go to the **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read products
    match /products/{productId} {
      allow read: if request.auth != null;
    }
    
    // Allow authenticated users to create orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## 2. Test the Connection

1. Start your development server: `npm run dev`
2. Navigate to `/admin` to see the Firebase test component
3. Check the browser console for any error messages
4. The test component will show if Firebase is connected properly

## 3. Common Issues & Solutions

### Issue: "Firebase: Error (auth/operation-not-allowed)"
**Solution**: Enable Email/Password authentication in Firebase Console

### Issue: "Firebase: Error (auth/invalid-api-key)"
**Solution**: Check that your Firebase config in `src/firebase.ts` matches your project

### Issue: "Firebase: Error (firestore/permission-denied)"
**Solution**: Update Firestore security rules as shown above

### Issue: "Firebase: Error (firestore/unavailable)"
**Solution**: Check your internet connection and Firebase project status

## 4. Verify Configuration

Your `src/firebase.ts` should look like this:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCoutws3NQn11pkh7S99HxMqpM0nJ5KpA",
  authDomain: "rentalco.firebaseapp.com",
  projectId: "rentalco",
  storageBucket: "rentalco.firebasestorage.app",
  messagingSenderId: "94644487380",
  appId: "1:94644487380:web:3e34f9b026600ba980e741",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
```

## 5. Add Sample Data

To test the system, add some sample products to your Firestore:

1. Go to Firestore Database in Firebase Console
2. Click **Start collection**
3. Collection ID: `products`
4. Add documents with this structure:

```javascript
{
  name: "Sample Product",
  description: "This is a sample product for testing",
  price: 99.99,
  type: "sale",
  imageUrl: "https://via.placeholder.com/300x200"
}
```

## 6. Testing the System

1. **Test Authentication**:
   - Go to `/signup` and create a new account
   - Check browser console for any errors
   - Try logging in at `/login`

2. **Test Products**:
   - Go to `/products` to see the product library
   - Try adding items to cart

3. **Test Cart**:
   - Go to `/cart` to view your cart
   - Try updating quantities and removing items

4. **Test Checkout**:
   - Go to `/checkout` to test the order process
   - Fill in shipping details and place an order

## 7. Remove Test Component

Once everything is working, remove the Firebase test component:

1. Delete `src/components/FirebaseTest.tsx`
2. Remove the import and usage from `AdminDashboard.tsx`

## 🔧 Troubleshooting

If you're still having issues:

1. **Check Browser Console**: Look for specific error messages
2. **Check Firebase Console**: Look for authentication attempts and errors
3. **Verify Network**: Ensure your app can reach Firebase services
4. **Check Project Settings**: Verify your Firebase project is active and properly configured

## 📞 Support

If you continue to have issues, check:
- Firebase Console for any service disruptions
- Your Firebase project billing status
- Network connectivity and firewall settings 