import React from "react";
import { motion } from "framer-motion";

export interface VideoPreviewProps {
  src: string;
  alt?: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ src, alt }) => {
  return (
    <motion.div
      className="relative h-full w-full max-w-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.12)_0,_transparent_55%)]" />

      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 shadow-[0_24px_70px_rgba(15,23,42,0.35)]">
        <video
          src={src}
          aria-label={alt}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </motion.div>
  );
};

export default VideoPreview;
