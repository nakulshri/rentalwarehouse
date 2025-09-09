import { db } from './src/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

async function addSampleBlog() {
  await addDoc(collection(db, 'blogs'), {
    title: 'Welcome to Our Blog!',
    content: '<p>This is a sample blog post. You can use the admin panel to add more posts!</p>',
    imageUrl: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    createdAt: serverTimestamp(),
    author: 'Admin',
  });
}

addSampleBlog();
