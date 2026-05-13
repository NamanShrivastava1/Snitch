import React, { useState, useRef, useCallback, useEffect } from "react";
import { useProduct } from "../hook/useProduct";
import { useNavigate } from "react-router";

const useGoogleFont = (href) => {
  useEffect(() => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [href]);
};

const MAX_IMAGES = 7;
const CURRENCIES = ["INR", "USD", "EUR", "GBP"];

const Label = ({ children }) => (
  <span
    className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
    style={{ color: "#999" }}
  >
    {children}
  </span>
);

const inputBase =
  "w-full bg-transparent border-0 border-b text-white text-[14px] py-2 focus:outline-none transition-colors duration-200 placeholder-[#4a4a4a] tracking-wide";

const SmallSlot = ({ image, index, isNext, onAdd, onRemove }) => {
  const base =
    "relative aspect-square rounded-sm overflow-hidden transition-all duration-200";

  if (image) {
    return (
      <div className={`${base} group border border-white/10 cursor-pointer`}>
        <img
          src={image.preview}
          alt=""
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  if (isNext) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className={`${base} border border-dashed border-[#3a3a3a] hover:border-[#FFD700]/50 flex items-center justify-center group cursor-pointer`}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#666] group-hover:text-[#FFD700] transition-colors"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className={`${base} border border-dashed border-[#1f1f1f] opacity-30`}
    />
  );
};

const CreateProduct = () => {
  useGoogleFont(
    "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap",
  );

  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const addFiles = useCallback(
    (files) => {
      const slots = MAX_IMAGES - images.length;
      if (slots <= 0) return;
      const accepted = Array.from(files)
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, slots)
        .map((file) => ({ file, preview: URL.createObjectURL(file) }));
      setImages((p) => [...p, ...accepted]);
    },
    [images.length],
  );

  const removeImage = (i) =>
    setImages((p) => {
      const next = [...p];
      URL.revokeObjectURL(next[i].preview);
      next.splice(i, 1);
      return next;
    });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    if (!dropRef.current?.contains(e.relatedTarget)) setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      images.forEach(({ file }) => fd.append("images", file));
      await handleCreateProduct(fd);
      navigate(-1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const coverImage = images[0] ?? null;
  const thumbSlots = Array.from({ length: 6 });

  return (
    <div
      className="h-dvh w-screen overflow-hidden bg-[#050505] text-white flex flex-col"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <header className="shrink-0 relative flex items-center justify-between px-5 sm:px-8 h-13 sm:h-16 border-b border-white/6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 group z-10"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#888] group-hover:text-white transition-colors group-hover:-translate-x-0.5 duration-150"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#888] group-hover:text-white transition-colors hidden sm:inline">
            Back
          </span>
        </button>

        {/* Centered title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
            <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] text-white/80">
              New Product
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
          </div>
        </div>

        {/* Desktop publish */}
        <button
          type="submit"
          form="cp-form"
          disabled={isSubmitting}
          className="z-10 hidden lg:block bg-[#FFD700] text-[#050505] text-[10px] font-black uppercase tracking-[0.22em] px-7 py-2.5 hover:bg-[#e6c200] active:scale-[0.97] transition-all duration-150 disabled:opacity-40"
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 28px rgba(255,215,0,0.18)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          {isSubmitting ? "Publishing…" : "Publish"}
        </button>

        <div className="w-[60px] lg:hidden" />
      </header>

      <form
        id="cp-form"
        onSubmit={handleSubmit}
        className="flex-1 overflow-hidden flex flex-col lg:flex-row"
      >
        <div
          className="
          shrink-0
          lg:w-[44%] lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-white/6
          px-5 sm:px-8 lg:px-12
          pt-5 sm:pt-7 lg:pt-10
          pb-3 lg:pb-10
          border-b border-white/6 lg:border-b-0
        "
        >
          <div
            className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1
            gap-x-8 gap-y-5 lg:gap-y-8
          "
          >
            {/* Title — full width always */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Label>Product Title</Label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Oversized Linen Shirt"
                required
                autoComplete="off"
                className={inputBase}
                style={{
                  borderBottomColor: form.title ? "#FFD700" : "#2a2a2a",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "#FFD700")}
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = form.title
                    ? "#FFD700"
                    : "#2a2a2a")
                }
              />
            </div>

            {/* Description — full width on mobile/desktop, right col on tablet */}
            <div className="sm:col-span-1 lg:col-span-1">
              <div className="flex items-baseline justify-between mb-2">
                <Label>Description</Label>
                <span className="text-[10px] text-[#777] tabular-nums">
                  {form.description.length}/500
                </span>
              </div>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Material, fit, care instructions…"
                maxLength={500}
                rows={2}
                className={`${inputBase} resize-none leading-relaxed`}
                style={{ borderBottomColor: "#2a2a2a" }}
                onFocus={(e) => (e.target.style.borderBottomColor = "#FFD700")}
                onBlur={(e) => (e.target.style.borderBottomColor = "#2a2a2a")}
              />
            </div>

            {/* Price */}
            <div className="sm:col-span-1 lg:col-span-1">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label>Price</Label>
                  <input
                    type="number"
                    name="priceAmount"
                    value={form.priceAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                    className={`${inputBase} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none`}
                    style={{ borderBottomColor: "#2a2a2a" }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor = "#FFD700")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor = "#2a2a2a")
                    }
                  />
                </div>
                <div>
                  <Label>Currency</Label>
                  <div className="relative">
                    <select
                      name="priceCurrency"
                      value={form.priceCurrency}
                      onChange={handleChange}
                      className={`${inputBase} pr-5 appearance-none cursor-pointer`}
                      style={{ borderBottomColor: "#2a2a2a" }}
                      onFocus={(e) =>
                        (e.target.style.borderBottomColor = "#FFD700")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderBottomColor = "#2a2a2a")
                      }
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c} className="bg-[#111]">
                          {c}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#666]"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop footer */}
          <div className="hidden lg:flex items-center gap-3 mt-8">
            <div className="h-px flex-1 bg-[#1e1e1e]" />
            <span className="text-[9px] text-[#555] uppercase tracking-[0.2em] font-semibold">
              Snitch Seller Studio
            </span>
            <div className="h-px flex-1 bg-[#1e1e1e]" />
          </div>
        </div>

        <div
          className="
          flex-1 overflow-hidden
          flex flex-col
          px-5 sm:px-8 lg:px-10
          pt-4 sm:pt-5 lg:pt-10
          pb-4 sm:pb-5 lg:pb-10
          gap-3 lg:gap-5
        "
        >
          <div
            ref={dropRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !coverImage && fileInputRef.current.click()}
            className={[
              "flex-1 relative rounded overflow-hidden flex flex-col items-center justify-center transition-all duration-300 min-h-0",
              isDragging
                ? "border-2 border-[#FFD700] bg-[#FFD700]/4"
                : coverImage
                  ? "border border-white/6"
                  : "border border-dashed border-[#2e2e2e] hover:border-[#484848] cursor-pointer group",
            ].join(" ")}
          >
            {coverImage ? (
              <>
                <img
                  src={coverImage.preview}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#FFD700] text-[#050505] text-[7px] font-black uppercase tracking-[0.18em] px-1.5 py-0.5">
                  Cover
                </span>
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current.click();
                    }}
                    className="border border-white/20 text-white text-[10px] uppercase tracking-widest px-4 py-1.5 hover:bg-white/10 transition-colors"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(0);
                    }}
                    className="text-[10px] text-white/50 uppercase tracking-widest hover:text-white/80 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </>
            ) : (
              <div
                className={`flex flex-col items-center gap-3 transition-all duration-200 ${isDragging ? "scale-110" : "group-hover:scale-105"}`}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border transition-colors duration-200 ${isDragging ? "border-[#FFD700] bg-[#FFD700]/10" : "border-[#383838] group-hover:border-[#555]"}`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDragging ? "#FFD700" : "#888"}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-light text-[#aaa] group-hover:text-[#ccc] transition-colors">
                    {isDragging ? "Release to upload" : "Drop cover photo"}
                  </p>
                  <p className="text-[9px] text-[#666] uppercase tracking-[0.18em] mt-1">
                    or tap to browse
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          <div className="shrink-0">
            <div className="flex items-center justify-between mb-2">
              <Label>More Photos</Label>
              <span className="text-[10px] font-semibold text-[#888] tabular-nums">
                {images.length} / {MAX_IMAGES}
              </span>
            </div>
            {/* progress */}
            <div className="h-px bg-[#242424] mb-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFD700] transition-all duration-500 ease-out"
                style={{ width: `${(images.length / MAX_IMAGES) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {thumbSlots.map((_, i) => {
                const gi = i + 1;
                return (
                  <SmallSlot
                    key={i}
                    index={gi}
                    image={images[gi]}
                    isNext={gi === images.length && images.length < MAX_IMAGES}
                    onAdd={() => fileInputRef.current.click()}
                    onRemove={removeImage}
                  />
                );
              })}
            </div>
            <p className="mt-2 text-[9px] text-[#555] font-light">
              JPG · PNG · WEBP · Max 7 · First = Cover
            </p>
          </div>
          <div className="shrink-0 lg:hidden">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FFD700] text-[#050505] text-[10px] font-black uppercase tracking-[0.22em] py-3.5 hover:bg-[#e6c200] active:scale-[0.99] transition-all duration-150 disabled:opacity-40"
            >
              {isSubmitting ? "Publishing…" : "Publish Product"}
            </button>
          </div>
        </div>
      </form>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default CreateProduct;
