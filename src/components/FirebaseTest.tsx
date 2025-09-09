import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function FirebaseTest() {
  const [status, setStatus] = useState<string>('Testing...');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        setStatus('Testing Firebase connection...');
        
        // Test Firestore
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
        
        setStatus(`Firebase connected successfully! Found ${productsData.length} products.`);
        console.log('Firebase test successful');
        console.log('Products:', productsData);
      } catch (error: any) {
        setStatus(`Firebase test failed: ${error.message}`);
        console.error('Firebase test error:', error);
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Firebase Connection Test</h3>
      <p className="text-sm text-gray-600 mb-4">{status}</p>
      
      {products.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Products in database:</h4>
          <ul className="text-sm space-y-1">
            {products.map(product => (
              <li key={product.id}>
                {product.name} - ${product.price} ({product.type})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 