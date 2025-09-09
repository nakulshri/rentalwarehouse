import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      setBlog(docSnap.data());
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold text-classyblack mb-4">{blog.title}</h1>
      <div className="text-classygray mb-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <p className="text-sm text-classylavender">By {blog.author} • {blog.createdAt?.toDate?.().toLocaleString?.() || ''}</p>
    </div>
  );
};

export default BlogDetail;
