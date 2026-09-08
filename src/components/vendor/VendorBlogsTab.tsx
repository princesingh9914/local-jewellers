import React, { useState } from 'react';
import { BlogPost, Vendor } from '../../types';
import { storageService } from '../../services/storage';
import { ImageUploader } from '../common/ImageUploader';
import { BookOpen, Plus, Trash2, Edit3, Eye, Clock, Calendar, Check, X, Sparkles, Image as ImageIcon } from 'lucide-react';

interface VendorBlogsTabProps {
  vendor: Vendor;
  onRefresh: () => void;
  onViewStore: () => void;
}

const PRESET_BLOG_IMAGES = [
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1611591475878-a400c6bbbece?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&auto=format&fit=crop&q=80',
];

export const VendorBlogsTab: React.FC<VendorBlogsTabProps> = ({ vendor, onRefresh, onViewStore }) => {
  const blogs = storageService.getBlogs(vendor.id);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Gold Purity & Education');
  const [author, setAuthor] = useState(vendor.ownerName || vendor.name);
  const [featuredImage, setFeaturedImage] = useState(PRESET_BLOG_IMAGES[0]);
  const [readTimeMinutes, setReadTimeMinutes] = useState(4);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Gold Purity & Education');
    setAuthor(vendor.ownerName || vendor.name);
    setFeaturedImage(PRESET_BLOG_IMAGES[0]);
    setReadTimeMinutes(4);
    setDescription('');
    setContent(`### Introduction\nExplain the importance of this jewellery concept to your patrons.\n\n### Key Highlights\n- **Hallmark Guarantee**: 100% BIS certified purity\n- **Artisanal Finish**: Handcrafted by master karigars\n\n### Tips for Customers\nAlways consult with ${vendor.name} for custom requirements.`);
    setIsPublished(true);
    setIsEditing(true);
  };

  const handleOpenEdit = (b: BlogPost) => {
    setEditingId(b.id);
    setTitle(b.title);
    setCategory(b.category || 'Jewellery');
    setAuthor(b.author || vendor.name);
    setFeaturedImage(b.featuredImage || PRESET_BLOG_IMAGES[0]);
    setReadTimeMinutes(b.readTimeMinutes || 4);
    setDescription(b.description || '');
    setContent(b.content || '');
    setIsPublished(b.isPublished);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide an article title and content.');
      return;
    }

    const newBlog: BlogPost = {
      id: editingId || `blog_${Date.now()}`,
      vendorId: vendor.id,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: category.trim(),
      author: author.trim(),
      featuredImage: featuredImage.trim(),
      readTimeMinutes: Number(readTimeMinutes) || 4,
      description: description.trim(),
      content: content.trim(),
      publishedDate: new Date().toISOString().split('T')[0],
      isPublished,
    };

    const isUpdate = Boolean(editingId);
    storageService.saveBlog(vendor.id, newBlog);
    setIsEditing(false);
    setEditingId(null);
    onRefresh();
    const msg = isUpdate
      ? `Article "${newBlog.title}" updated successfully!`
      : `Article "${newBlog.title}" published successfully!`;
    setUpdateMsg(msg);
    setTimeout(() => setUpdateMsg(null), 5000);
  };

  const handleDelete = (blogId: string) => {
    if (confirm('Are you sure you want to delete this blog article?')) {
      storageService.deleteBlog(vendor.id, blogId);
      onRefresh();
      setUpdateMsg('Article deleted successfully.');
      setTimeout(() => setUpdateMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Update Message Alert Banner */}
      {updateMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-black text-[13px] text-emerald-900">Updated Successfully!</span>
              <span className="text-[11px] text-emerald-700 font-medium">{updateMsg}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUpdateMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header with Stats & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs">
        <div>
          <h3 className="text-base font-bold font-royal text-[#2A1810] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#B8860B]" />
            Jewellery Journal &amp; Articles ({blogs.length})
          </h3>
          <p className="text-xs text-[#7A6855] mt-0.5">
            Publish educational articles on gold purity, bridal trends, and care secrets to build immense trust with jewellery patrons.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onViewStore}
            className="px-3.5 py-2 rounded-xl border border-[#D8CEBE] hover:bg-[#FAF6EE] text-xs font-bold text-[#2A1810] flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#8C232C]" />
            <span>View on Storefront</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#E5C158]" />
            <span>Publish New Article</span>
          </button>
        </div>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="bg-white rounded-2xl p-6 border-2 border-[#D4AF37] shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0EAE1] mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="text-base font-bold font-royal text-[#2A1810]">
                {editingId ? 'Edit Article' : 'Publish New Jewellery Article'}
              </h4>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded-lg text-[#7A6855] hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Essential Guide to 916 BIS Hallmark & HUID Protection"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] text-xs sm:text-sm focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Article Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gold Purity & Education, Bridal Heritage, Diamond Care"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Author Name / Showroom Atelier
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <ImageUploader
                  value={featuredImage}
                  onChange={(val) => setFeaturedImage(val)}
                  label="Article Featured Cover Image (कवर फोटो अपलोड करें)"
                  helperText="Upload a photo from your device or choose a preset."
                  aspectRatio="wide"
                  presets={PRESET_BLOG_IMAGES.map((url, i) => ({ label: `Cover Preset ${i + 1}`, url }))}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Estimated Read Time (Minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={readTimeMinutes}
                  onChange={(e) => setReadTimeMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2A1810]">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 accent-[#4A0E17] rounded"
                  />
                  <span>Publish to Customer Storefront immediately</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#2A1810] mb-1">
                  Short Description / Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="A compelling 1-2 sentence preview for customer article cards..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D8CEBE] text-xs focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#2A1810] mb-1 flex items-center justify-between">
                  <span>Full Article Content (Markdown / Text) *</span>
                  <span className="text-[11px] text-[#7A6855]">Use ### for Subheadings, - for Bullet lists</span>
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Write the full jewellery article here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] text-xs font-mono focus:border-[#4A0E17] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0EAE1]">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#4A0E17] hover:bg-[#681420] text-white text-xs font-bold shadow-md transition-colors"
              >
                {editingId ? 'Update Article' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs Table / Cards */}
      {blogs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DFC8] space-y-3">
          <BookOpen className="w-10 h-10 text-[#D4AF37] mx-auto opacity-70" />
          <h4 className="text-base font-bold font-royal text-[#2A1810]">No Articles Published Yet</h4>
          <p className="text-xs text-[#7A6855] max-w-md mx-auto">
            Share articles about your gold hallmark purity, wedding styling tips, and jewellery care to engage visitors.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#4A0E17] text-white text-xs font-bold"
          >
            Create First Article
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/9 overflow-hidden bg-gray-100">
                  <img
                    src={b.featuredImage}
                    alt={b.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        b.isPublished
                          ? 'bg-[#EBF9F0] text-[#1B6D3E] border border-[#A7E6BC]'
                          : 'bg-gray-100 text-gray-600 border border-gray-300'
                      }`}
                    >
                      {b.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  {b.category && (
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="bg-[#2A0E13]/80 backdrop-blur-xs text-[#E5C158] text-[10px] font-bold px-2 py-0.5 rounded">
                        {b.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-[#7A6855]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#B8860B]" />
                      {b.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B8860B]" />
                      {b.readTimeMinutes || 4} min
                    </span>
                  </div>

                  <h4 className="text-sm font-bold font-royal text-[#2A1810] line-clamp-2 leading-snug">
                    {b.title}
                  </h4>

                  <p className="text-xs text-[#5C4D44] line-clamp-2 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#7A6855] truncate max-w-[120px]">
                  By {b.author || vendor.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="p-1.5 rounded-lg text-[#8C232C] hover:bg-[#FAF0F1] transition-colors"
                    title="Edit article"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
