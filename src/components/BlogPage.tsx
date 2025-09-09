import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setBlogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-6xl font-extrabold mb-8 text-classygray tracking-tight border-b border-classygray/20 pb-3">
        Blogs
      </h1>
      {loading ? (
        <div className="py-24 text-center text-classygray text-lg">Loading...</div>
      ) : (
        <div className="grid gap-8">
          {blogs.length === 0 && (
            <div className="text-center py-20 text-classygray/60 text-xl">No blog posts yet.</div>
          )}
          {blogs.map(blog => (
            <div
              key={blog.id}
              className="rounded-xl shadow bg-classywhite overflow-hidden group transition hover:shadow-lg"
            >
              {/* Blog image */}
              {blog.imageUrl && (
                <Link to={`/blogs/${blog.id}`}>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-56 object-cover object-center hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>
              )}
              <div className="p-6">
                {/* Title */}
                <Link to={`/blogs/${blog.id}`}>
                  <h2 className="text-4xl font-bold text-classyblack mb-1 transition-colors group-hover:text-classyblack">
                    {blog.title}
                  </h2>
                </Link>
                {/* Meta */}
                <div className="mb-2 text-sm text-classygray/80 italic flex items-center gap-2">
                  {blog.author && <span>by {blog.author}</span>}
                  {/* If you want date:
                  {blog.createdAt?.toDate &&
                    <span>· {blog.createdAt.toDate().toLocaleDateString()}</span>
                  }
                  */}
                </div>
                {/* Excerpt / preview (with graceful fallback) */}
                <div
                  className="text-classygray mb-4 leading-relaxed max-h-16 overflow-hidden line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: blog.content
                      ? blog.content.replace(/(<([^>]+)>)/gi, '').slice(0, 160) + '...'
                      : ''
                  }}
                />
                {/* Read more button */}
                <Link
                  to={`/blogs/${blog.id}`}
                  className="inline-block px-4 py-1 rounded border border-black/60 text-black font-semibold bg-classywhite/70 hover:bg-classylavender hover:text-white transition focus:outline-none focus:ring focus:ring-classylavender/30"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
