import React, { useState } from 'react';
import { db } from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const uploadBlogImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'rentalblog');
  formData.append('cloud_name', 'dqqfa8len');

  const res = await fetch('https://api.cloudinary.com/v1_1/dqqfa8len/image/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data.secure_url;
};

// 👇 Accept onBlogCreated as prop!
const CreateBlog = ({ onBlogCreated }: { onBlogCreated?: () => void }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = '';
    if (file) {
      imageUrl = await uploadBlogImage(file);
    }
    await addDoc(collection(db, 'blogs'), {
      title,
      content,
      imageUrl,
      createdAt: serverTimestamp(),
      author: currentUser?.displayName || 'Admin',
    });
    setTitle('');
    setContent('');
    setFile(null);
    setLoading(false);
    alert('Blog posted!');
    // 👇 call parent's callback
    if (onBlogCreated) onBlogCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-classywhite rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-classygray">Create Blog</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border border-classygray rounded"
        required
      />
      <ReactQuill value={content} onChange={setContent} className="mb-4" />
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button type="submit" disabled={loading} className="bg-classylavender text-classywhite px-4 py-2 rounded">
        {loading ? 'Posting...' : 'Post Blog'}
      </button>
    </form>
  );
};

export default CreateBlog;
