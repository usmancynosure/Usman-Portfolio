"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
  following: number;
}

function AnimatedNumber({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div ref={ref} className="glass-card rounded-2xl p-4 sm:p-6 text-center hover:border-gold-500 hover:shadow-[0_4px_20px_rgba(206,17,38,0.2)] hover:-translate-y-1 transition-all duration-500">
      <span className="font-heading text-3xl md:text-4xl font-bold text-gold-500 block mb-1">{count}</span>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}

export function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats>({ repos: 15, stars: 8, followers: 20, following: 10 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${personalInfo.githubUsername}`);
        if (!res.ok) return;
        const data = await res.json();
        const reposRes = await fetch(`https://api.github.com/users/${personalInfo.githubUsername}/repos?per_page=100`);
        const repos = reposRes.ok ? await reposRes.json() : [];
        const totalStars = repos.reduce((s: number, r: { stargazers_count: number }) => s + (r.stargazers_count || 0), 0);

        setStats({
          repos: data.public_repos || 15,
          stars: totalStars || 8,
          followers: data.followers || 20,
          following: data.following || 10,
        });
      } catch {
        // Keep fallback values
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="github" className="py-14 md:py-20 lg:py-28 geo-pattern">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-gold-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GitHub Activity
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center text-base sm:text-lg mb-8 md:mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Open Source Contributions
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <AnimatedNumber target={stats.repos} label="Public Repos" />
          <AnimatedNumber target={stats.stars} label="Stars Earned" />
          <AnimatedNumber target={stats.followers} label="Followers" />
          <AnimatedNumber target={stats.following} label="Following" />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-8 py-3 rounded-lg text-sm inline-flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
