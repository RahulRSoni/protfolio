"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { notFound } from "next/navigation";
import Head from "next/head";

// This would normally come from a CMS, database, or API
const getBlogPost = (slug: string) => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Modern Web Applications with Next.js 15",
      excerpt: "Explore the latest features in Next.js 15 and learn how to build performant, scalable web applications with cutting-edge tools.",
      category: "Web Development",
      tags: ["Next.js", "React", "JavaScript", "Performance"],
      author: "Alex Thompson",
      date: "2024-12-15",
      readTime: "8 min",
      emoji: "⚡",
      slug: "building-modern-web-apps-nextjs-15",
      type: "tutorial",
      featured: true,
      // Different content structures based on type
      content: {
        intro: "Next.js 15 introduces revolutionary features that change how we build web applications. This comprehensive guide covers everything you need to know.",
        sections: [
          {
            id: "whats-new",
            title: "What's New in Next.js 15?",
            content: "The latest version brings significant improvements in performance, developer experience, and new features that make building web applications more efficient than ever.",
            subsections: [
              {
                title: "Enhanced App Router",
                content: "The App Router now includes partial prerendering, improved streaming, and better caching strategies.",
                codeExample: {
                  language: "typescript",
                  code: `// app/dashboard/page.tsx
import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Suspense fallback={<LoadingSkeleton />}>
        <UserProfile />
      </Suspense>
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />
      </Suspense>
    </div>
  )
}`
                }
              },
              {
                title: "Server Actions Evolution",
                content: "Server Actions now have full TypeScript support, better error handling, and optimistic updates.",
                codeExample: {
                  language: "typescript",
                  code: `// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string
  
  try {
    const user = await db.user.create({
      data: { email }
    })
    return { success: true, user }
  } catch (error) {
    return { success: false, error: 'Failed to create user' }
  }
}`
                }
              }
            ]
          },
          {
            id: "performance",
            title: "Performance Optimization Strategies",
            content: "Learn how to maximize performance with Next.js 15's new optimization features.",
            subsections: [
              {
                title: "Image Optimization",
                content: "The Image component now provides automatic WebP conversion, responsive generation, and blur placeholders.",
                codeExample: {
                  language: "typescript",
                  code: `import Image from 'next/image'

export function OptimizedImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={400}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      priority
    />
  )
}`
                }
              }
            ]
          }
        ],
        conclusion: "Next.js 15 represents a major step forward in web development. The enhanced performance, developer experience, and new features make it the perfect choice for modern applications."
      }
    },
    {
      id: 2,
      title: "Case Study: How We Increased Client Engagement by 300%",
      excerpt: "A detailed analysis of our redesign project for TechCorp, showcasing strategic UX improvements that led to dramatic engagement increases.",
      category: "Case Studies",
      tags: ["Case Study", "UX", "Analytics", "Results"],
      author: "Sarah Chen",
      date: "2024-12-12",
      readTime: "12 min",
      emoji: "📈",
      slug: "techcorp-engagement-case-study",
      type: "case-study",
      featured: true,
      // Case study specific structure
      content: {
        client: "TechCorp",
        industry: "SaaS",
        timeline: "3 months",
        team: ["Sarah Chen", "Marcus Rodriguez", "Emily Watson"],
        challenge: "TechCorp's user engagement was declining rapidly with a 40% drop in daily active users and 60% higher bounce rate than industry average.",
        approach: [
          {
            phase: "Research & Analysis",
            duration: "2 weeks",
            activities: ["User interviews (50+ participants)", "Analytics deep dive", "Competitor analysis", "Technical audit"]
          },
          {
            phase: "Design & Prototyping", 
            duration: "4 weeks",
            activities: ["Information architecture redesign", "Mobile-first wireframes", "Interactive prototypes", "Usability testing"]
          },
          {
            phase: "Development & Launch",
            duration: "6 weeks", 
            activities: ["Component library creation", "Performance optimization", "A/B testing implementation", "Gradual rollout"]
          }
        ],
        results: [
          { metric: "Page Load Time", before: "4.2s", after: "1.8s", improvement: "57% faster" },
          { metric: "Mobile Score", before: "45/100", after: "94/100", improvement: "109% improvement" },
          { metric: "Conversion Rate", before: "2.1%", after: "6.8%", improvement: "224% increase" },
          { metric: "User Satisfaction", before: "6.2/10", after: "8.9/10", improvement: "44% improvement" }
        ],
        testimonial: {
          quote: "DIGIVO didn't just redesign our platform—they transformed our entire business. The results speak for themselves.",
          author: "Jennifer Smith",
          title: "CEO, TechCorp"
        },
        lessonsLearned: [
          "Mobile-first approach is non-negotiable in 2024",
          "Performance directly impacts business metrics", 
          "User research prevents costly design mistakes",
          "Gradual rollouts reduce risk and improve adoption"
        ]
      }
    }
    // Add more blog posts as needed...
  ];

  return blogPosts.find(post => post.slug === slug);
};

// Get related posts based on category and tags
const getRelatedPosts = (currentSlug: string, category: string, tags: string[]) => {
  const allPosts = [
    {
      id: 3,
      title: "UI/UX Design Trends That Will Dominate 2025",
      excerpt: "Discover the emerging design trends that will shape user experiences in 2025.",
      category: "UI/UX Design",
      slug: "ux-design-trends-2025",
      emoji: "🎨",
      readTime: "6 min",
      type: "article"
    },
    {
      id: 4,
      title: "Mobile App Performance: Advanced Optimization Techniques",
      excerpt: "Deep dive into mobile app optimization strategies for better performance.",
      category: "Mobile Development",
      slug: "mobile-app-performance-optimization", 
      emoji: "📱",
      readTime: "10 min",
      type: "tutorial"
    },
    {
      id: 5,
      title: "The Complete Guide to Cloud Migration for Startups",
      excerpt: "Everything startups need to know about migrating to the cloud.",
      category: "Cloud Solutions",
      slug: "cloud-migration-guide-startups",
      emoji: "☁️", 
      readTime: "15 min",
      type: "guide"
    }
  ];

  return allPosts.filter(post => post.slug !== currentSlug).slice(0, 3);
};

// Code Block Component
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-[#1a1f2e] rounded-lg overflow-hidden my-6">
      <div className="flex items-center justify-between bg-[#0f1419] px-4 py-2">
        <span className="text-[#8db1a4] text-sm font-medium">{language}</span>
        <motion.button
          onClick={copyToClipboard}
          className="text-[#b8bcc3] hover:text-white text-sm px-3 py-1 rounded bg-[#2d4f4a] hover:bg-[#8db1a4] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? "Copied!" : "Copy"}
        </motion.button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-[#e5e7eb] text-sm leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}

// Tutorial Content Renderer
function TutorialContent({ content }: { content: any }) {
  return (
    <div className="tutorial-content">
      {/* Introduction */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">What You'll Learn</h2>
        <p className="text-blue-800 dark:text-blue-200">{content.intro}</p>
      </div>

      {/* Sections */}
      {content.sections?.map((section: any, index: number) => (
        <motion.section
          key={section.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 id={section.id} className="text-3xl font-bold text-[#0a0f1d] dark:text-white mb-6 scroll-mt-24">
            {section.title}
          </h2>
          <p className="text-[#787a84] dark:text-[#d1d5db] text-lg leading-relaxed mb-6">
            {section.content}
          </p>

          {/* Subsections */}
          {section.subsections?.map((subsection: any, subIndex: number) => (
            <div key={subIndex} className="ml-6 mb-8 border-l-4 border-[#8db1a4] pl-6">
              <h3 className="text-xl font-semibold text-[#0a0f1d] dark:text-white mb-4">
                {subsection.title}
              </h3>
              <p className="text-[#787a84] dark:text-[#d1d5db] leading-relaxed mb-4">
                {subsection.content}
              </p>
              
              {subsection.codeExample && (
                <CodeBlock 
                  code={subsection.codeExample.code} 
                  language={subsection.codeExample.language} 
                />
              )}
            </div>
          ))}
        </motion.section>
      ))}

      {/* Conclusion */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-12">
        <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">Key Takeaways</h2>
        <p className="text-green-800 dark:text-green-200">{content.conclusion}</p>
      </div>
    </div>
  );
}

// Case Study Content Renderer
function CaseStudyContent({ content }: { content: any }) {
  return (
    <div className="case-study-content">
      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🏢</div>
          <div className="text-sm text-[#787a84] dark:text-[#b8bcc3]">Client</div>
          <div className="font-semibold text-[#0a0f1d] dark:text-white">{content.client}</div>
        </div>
        <div className="bg-white dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🏭</div>
          <div className="text-sm text-[#787a84] dark:text-[#b8bcc3]">Industry</div>
          <div className="font-semibold text-[#0a0f1d] dark:text-white">{content.industry}</div>
        </div>
        <div className="bg-white dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">⏱️</div>
          <div className="text-sm text-[#787a84] dark:text-[#b8bcc3]">Timeline</div>
          <div className="font-semibold text-[#0a0f1d] dark:text-white">{content.timeline}</div>
        </div>
        <div className="bg-white dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">👥</div>
          <div className="text-sm text-[#787a84] dark:text-[#b8bcc3]">Team</div>
          <div className="font-semibold text-[#0a0f1d] dark:text-white">{content.team?.length} members</div>
        </div>
      </div>

      {/* Challenge */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0a0f1d] dark:text-white mb-6">The Challenge</h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <p className="text-red-800 dark:text-red-200 text-lg leading-relaxed">{content.challenge}</p>
        </div>
      </section>

      {/* Approach */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0a0f1d] dark:text-white mb-6">Our Approach</h2>
        <div className="space-y-6">
          {content.approach?.map((phase: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2d4f4a] dark:bg-[#8db1a4] rounded-full flex items-center justify-center text-white dark:text-[#0a0f1d] font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#0a0f1d] dark:text-white mb-2">
                    {phase.phase}
                  </h3>
                  <p className="text-[#8db1a4] dark:text-[#8db1a4] font-medium mb-3">{phase.duration}</p>
                  <ul className="space-y-2">
                    {phase.activities?.map((activity: string, actIndex: number) => (
                      <li key={actIndex} className="flex items-center text-[#787a84] dark:text-[#d1d5db]">
                        <div className="w-2 h-2 bg-[#8db1a4] rounded-full mr-3 flex-shrink-0"></div>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0a0f1d] dark:text-white mb-6">Results</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-lg">
            <thead className="bg-[#f8fafa] dark:bg-[#0a0f1d]">
              <tr>
                <th className="px-6 py-4 text-left text-[#0a0f1d] dark:text-white font-semibold">Metric</th>
                <th className="px-6 py-4 text-left text-[#0a0f1d] dark:text-white font-semibold">Before</th>
                <th className="px-6 py-4 text-left text-[#0a0f1d] dark:text-white font-semibold">After</th>
                <th className="px-6 py-4 text-left text-[#0a0f1d] dark:text-white font-semibold">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {content.results?.map((result: any, index: number) => (
                <tr key={index} className="border-t border-[#dfeoe2] dark:border-[#2d4f4a]">
                  <td className="px-6 py-4 text-[#0a0f1d] dark:text-white font-medium">{result.metric}</td>
                  <td className="px-6 py-4 text-[#787a84] dark:text-[#d1d5db]">{result.before}</td>
                  <td className="px-6 py-4 text-[#787a84] dark:text-[#d1d5db]">{result.after}</td>
                  <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">{result.improvement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonial */}
      {content.testimonial && (
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#2d4f4a] to-[#8db1a4] rounded-2xl p-8 text-white">
            <div className="text-4xl mb-4">💬</div>
            <blockquote className="text-xl lg:text-2xl font-light italic mb-6 leading-relaxed">
              "{content.testimonial.quote}"
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {content.testimonial.author.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold">{content.testimonial.author}</div>
                <div className="text-white/80">{content.testimonial.title}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lessons Learned */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0a0f1d] dark:text-white mb-6">Lessons Learned</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <ul className="space-y-3">
            {content.lessonsLearned?.map((lesson: string, index: number) => (
              <li key={index} className="flex items-start text-blue-800 dark:text-blue-200">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                  ✓
                </div>
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

// Share Component
function ShareButtons({ title, url }: { title: string; url: string }) {
  const shareLinks = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
  ];

  return (
    <div className="flex items-center space-x-3">
      <span className="text-[#787a84] dark:text-[#b8bcc3] font-medium">Share:</span>
      {shareLinks.map(link => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#dfeoe2] dark:bg-[#2d4f4a] rounded-lg flex items-center justify-center hover:bg-[#8db1a4] dark:hover:bg-[#8db1a4] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={`Share on ${link.name}`}
        >
          <span className="text-sm">{link.icon}</span>
        </motion.a>
      ))}
    </div>
  );
}

// Related Posts Component
function RelatedPosts({ posts }: { posts: any[] }) {
  return (
    <section className="py-16 bg-[#f8fafa] dark:bg-[#1a1f2e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-[#0a0f1d] dark:text-white mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Related Articles
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white dark:bg-[#0a0f1d] border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] transition-all duration-300">
                <CardBody className="p-6">
                  <div className="text-3xl mb-4">{post.emoji}</div>
                  <Chip className="mb-3" size="sm" variant="flat">
                    {post.category}
                  </Chip>
                  <h3 className="font-bold text-[#0a0f1d] dark:text-white mb-3 leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-[#787a84] dark:text-[#b8bcc3] text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8db1a4]">{post.readTime}</span>
                    <Link href={`/blog/${post.slug}`} className="text-[#2d4f4a] dark:text-[#8db1a4] text-sm font-medium hover:underline">
                      Read More →
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Table of Contents Component
function TableOfContents({ content }: { content: any }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -80% 0px" }
    );

    const headings = document.querySelectorAll("h2[id], h3[id]");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  // Generate TOC items based on content type
  const getTocItems = () => {
    if (content.sections) {
      // Tutorial content
      return content.sections.map((section: any) => ({
        id: section.id,
        title: section.title,
        level: 2
      }));
    } else {
      // Case study content
      return [
        { id: "challenge", title: "The Challenge", level: 2 },
        { id: "approach", title: "Our Approach", level: 2 },
        { id: "results", title: "Results", level: 2 },
        { id: "lessons", title: "Lessons Learned", level: 2 }
      ];
    }
  };

  const tocItems = getTocItems();

  if (tocItems.length === 0) return null;

  return (
    <Card className="bg-[#f8fafa] dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] sticky top-24">
      <CardBody className="p-6">
        <h3 className="font-bold text-[#0a0f1d] dark:text-white mb-4">Table of Contents</h3>
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm transition-colors ${
                activeSection === item.id
                  ? 'text-[#2d4f4a] dark:text-[#8db1a4] font-medium'
                  : 'text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4]'
              } ${item.level === 3 ? 'ml-4' : ''}`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </CardBody>
    </Card>
  );
}

// Main Blog Post Component
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [mounted, setMounted] = useState(false);
  const post = getBlogPost(params.slug);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, post.category, post.tags);
  const currentUrl = `https://digivo.com/blog/${post.slug}`;

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{post.title} - DIGIVO Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "datePublished": post.date,
            "publisher": {
              "@type": "Organization",
              "name": "DIGIVO"
            },
            "url": currentUrl,
            "articleSection": post.category,
            "keywords": post.tags.join(", ")
          })}
        </script>
      </Head>

      {/* Article Header */}
      <article className="pt-24">
        <header className="bg-gradient-to-br from-[#f8fafa] to-[#dfeoe2]/30 dark:from-[#1a1f2e] dark:to-[#2d4f4a]/20 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <nav className="mb-8">
                <ol className="flex items-center space-x-2 text-sm text-[#787a84] dark:text-[#b8bcc3]">
                  <li><Link href="/" className="hover:text-[#2d4f4a] dark:hover:text-[#8db1a4]">Home</Link></li>
                  <li>•</li>
                  <li><Link href="/blog" className="hover:text-[#2d4f4a] dark:hover:text-[#8db1a4]">Blog</Link></li>
                  <li>•</li>
                  <li><Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-[#2d4f4a] dark:hover:text-[#8db1a4]">{post.category}</Link></li>
                </ol>
              </nav>

              {/* Type & Category Badges */}
              <div className="flex items-center gap-3 mb-6">
                <Chip className="bg-[#2d4f4a] text-white font-semibold">
                  {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </Chip>
                <Chip variant="flat" className="bg-[#8db1a4]/20 text-[#2d4f4a] dark:text-[#8db1a4]">
                  {post.category}
                </Chip>
                {post.featured && (
                  <Chip className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold">
                    ⭐ Featured
                  </Chip>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0a0f1d] dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-[#787a84] dark:text-[#b8bcc3] mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-[#787a84] dark:text-[#b8bcc3] mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#2d4f4a] rounded-full flex items-center justify-center text-white font-semibold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-[#0a0f1d] dark:text-white">{post.author}</p>
                    <p className="text-sm">Author</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[#0a0f1d] dark:text-white">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm">Published</p>
                </div>
                <div>
                  <p className="font-medium text-[#0a0f1d] dark:text-white">{post.readTime}</p>
                  <p className="text-sm">Read time</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map(tag => (
                  <Chip
                    key={tag}
                    variant="flat"
                    className="bg-white dark:bg-[#2d4f4a]/30 text-[#2d4f4a] dark:text-[#8db1a4] border border-[#dfeoe2] dark:border-[#2d4f4a]"
                    size="sm"
                  >
                    #{tag}
                  </Chip>
                ))}
              </div>

              {/* Share Buttons */}
              <ShareButtons title={post.title} url={currentUrl} />
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <TableOfContents content={post.content} />
              </motion.div>
            </aside>

            {/* Article Content */}
            <main className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Featured Image/Hero */}
                <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-[#dfeoe2] to-[#8db1a4] rounded-2xl flex items-center justify-center mb-12 overflow-hidden">
                  <div className="text-8xl">{post.emoji}</div>
                </div>

                {/* Dynamic Content Based on Type */}
                {post.type === 'tutorial' && <TutorialContent content={post.content} />}
                {post.type === 'case-study' && <CaseStudyContent content={post.content} />}
                
                {/* Default content for other types */}
                {!['tutorial', 'case-study'].includes(post.type) && (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-[#787a84] dark:text-[#d1d5db] text-lg leading-relaxed">
                      This is a {post.type} article. The content structure can be customized based on the specific needs of this content type.
                    </p>
                  </div>
                )}

                {/* Call to Action */}
                <motion.div
                  className="bg-gradient-to-r from-[#2d4f4a] to-[#8db1a4] rounded-2xl p-8 text-white text-center mt-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Let's discuss how our expertise can help transform your digital presence with cutting-edge solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      as={Link}
                      href="/contact"
                      size="lg"
                      className="bg-white text-[#2d4f4a] hover:bg-white/90 font-semibold"
                      radius="lg"
                    >
                      Start Your Project
                    </Button>
                    <Button
                      as={Link}
                      href="/services"
                      variant="bordered"
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white hover:text-[#2d4f4a] font-semibold"
                      radius="lg"
                    >
                      View Our Services
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </main>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />

      {/* Back to Blog */}
      <section className="py-8 bg-white dark:bg-[#0a0f1d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              as={Link}
              href="/blog"
              variant="bordered"
              size="lg"
              className="border-2 border-[#2d4f4a] dark:border-[#8db1a4] text-[#2d4f4a] dark:text-[#8db1a4] hover:bg-[#2d4f4a] dark:hover:bg-[#8db1a4] hover:text-white dark:hover:text-[#0a0f1d] font-semibold"
              radius="lg"
            >
              ← Back to All Articles
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}