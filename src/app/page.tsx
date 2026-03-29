"use client";

import { Preloader } from "@/components/ui/Preloader";
import { Navigation } from "@/components/ui/Navigation";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { DesignShowcaseSection } from "@/components/sections/DesignShowcaseSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navigation />

      <main>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <CertificationsSection />
        <SectionDivider />
        <ResumeSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <BlogSection />
        <SectionDivider />
        <DesignShowcaseSection />
        <SectionDivider />
        <GitHubSection />
        <SectionDivider />
        <ContactSection />
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}
