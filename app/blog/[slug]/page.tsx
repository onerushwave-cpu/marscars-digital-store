import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/lib/data/blog";
import { Reveal } from "@/components/motion";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://marscars.store/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Marscars" },
    publisher: { "@type": "Organization", name: "Marscars Digital Marketplace" },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal>
        <Link href="/blog" className="text-sm text-mist transition-colors hover:text-white">
          ← Back to blog
        </Link>

        <div
          className={`mt-6 flex aspect-[21/9] items-center justify-center rounded-3xl bg-gradient-to-br ${post.gradient}`}
        >
          <span className="text-7xl" aria-hidden>
            {post.emoji}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-mist">
          <span className="rounded-full bg-ember/15 px-3 py-1 text-xs font-bold text-amber">
            {post.category}
          </span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="font-display mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 space-y-6">
          {post.content.map((para, i) => (
            <p key={i} className="leading-relaxed text-white/85">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-mist">
              #{t}
            </span>
          ))}
        </div>

        <div className="glow-ring mt-14 rounded-3xl border border-ember/30 bg-card p-8 text-center">
          <h2 className="font-display text-xl font-bold">Ready to put this into practice?</h2>
          <p className="mt-2 text-sm text-mist">
            Grab the templates, prompts and presets that make it effortless.
          </p>
          <Link href="/products" className="btn-primary mt-5 px-8 py-3 text-sm">
            Shop the Marketplace →
          </Link>
        </div>
      </Reveal>

      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold">
          Keep <span className="text-ember-gradient">Reading</span>
        </h2>
        <div className="mt-6 space-y-4">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card-hover group flex items-center gap-4 rounded-2xl border border-line bg-card p-4"
            >
              <span
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${p.gradient}`}
                aria-hidden
              >
                {p.emoji}
              </span>
              <div>
                <p className="text-xs font-semibold text-amber">{p.category}</p>
                <h3 className="font-display mt-0.5 font-bold leading-snug group-hover:text-amber">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
