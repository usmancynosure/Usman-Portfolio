"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/portfolio";

export function BlogSection() {
  return (
    <section id="blog" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Blog & Articles
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-lg mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Thoughts on AI & Engineering
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-gold-500 hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:-translate-y-1.5 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="relative h-44 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-700">
                  {post.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold text-gold-400 bg-navy-900/80 backdrop-blur-sm rounded-full border border-gold-500/30">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-gold-500 uppercase tracking-wider">{post.date}</span>
                <h3 className="font-heading text-lg text-white mt-1 mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">{post.excerpt}</p>
                <span className="text-xs text-text-muted">{post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
