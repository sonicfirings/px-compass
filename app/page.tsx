"use client";

import { useEffect, useMemo, useState } from "react";

type Category = "All" | "Start" | "Contribute" | "Robots" | "Learn" | "Community";

type Destination = {
  title: string;
  description: string;
  href: string;
  category: Exclude<Category, "All">;
  eyebrow: string;
  action: string;
  featured?: boolean;
};

const destinations: Destination[] = [
  {
    title: "Launch PrismaX",
    description: "Enter the main PrismaX application and access your account.",
    href: "https://app.prismax.ai/",
    category: "Start",
    eyebrow: "Main application",
    action: "Open app",
    featured: true,
  },
  {
    title: "Verify Quality",
    description: "Review robot demonstrations, score data quality, and contribute as a validator.",
    href: "https://app.prismax.ai/data/review",
    category: "Contribute",
    eyebrow: "For validators",
    action: "Start validating",
    featured: true,
  },
  {
    title: "Operator Uploads",
    description: "Submit robotics data to the VLA training pipeline and manage your contributions.",
    href: "https://app.prismax.ai/data/upload",
    category: "Contribute",
    eyebrow: "For operators",
    action: "Upload data",
    featured: true,
  },
  {
    title: "Robot Fleet",
    description: "Explore PrismaX-validated robot platforms, specifications, and hardware options.",
    href: "https://app.prismax.ai/data/fleet",
    category: "Robots",
    eyebrow: "Hardware marketplace",
    action: "Explore robots",
    featured: true,
  },
  {
    title: "Register a Robot",
    description: "Connect supported hardware to PrismaX and prepare it for data collection tasks.",
    href: "https://app.prismax.ai/account?open=register-robot",
    category: "Robots",
    eyebrow: "For robot owners",
    action: "Register hardware",
  },
  {
    title: "Robot Control Center",
    description: "Access the central operating area for registered robots and sessions.",
    href: "https://app.prismax.ai/robots-center",
    category: "Robots",
    eyebrow: "Operations",
    action: "Open control center",
  },
  {
    title: "Operate Robots",
    description: "Enter the teleoperation experience and remotely operate available robots.",
    href: "https://app.prismax.ai/tele-op",
    category: "Contribute",
    eyebrow: "Teleoperation",
    action: "Start operating",
  },
  {
    title: "Operator Dashboard",
    description: "Track data submissions and manage your operator workflow from one dashboard.",
    href: "https://app.prismax.ai/data/upload/dashboard",
    category: "Contribute",
    eyebrow: "Your workspace",
    action: "View dashboard",
  },
  {
    title: "Upload History",
    description: "Review previously uploaded operator datasets and submission activity.",
    href: "https://app.prismax.ai/data/upload/history",
    category: "Contribute",
    eyebrow: "Activity",
    action: "View history",
  },
  {
    title: "Validator Progress",
    description: "Follow your validation activity and review progress inside PrismaX.",
    href: "https://app.prismax.ai/data/review/progress",
    category: "Contribute",
    eyebrow: "Your progress",
    action: "Check progress",
  },
  {
    title: "Teleoperation Leaderboard",
    description: "See leading operators and community performance across robot sessions.",
    href: "https://app.prismax.ai/tele_op/leaderboard",
    category: "Community",
    eyebrow: "Community rankings",
    action: "View leaderboard",
  },
  {
    title: "PrismaX Whitepaper",
    description: "Read the full vision, mechanics, and architecture behind the PrismaX ecosystem.",
    href: "https://app.prismax.ai/whitepaper",
    category: "Learn",
    eyebrow: "Core reading",
    action: "Read whitepaper",
  },
  {
    title: "Standards for Data",
    description: "Understand the pass/fail and quality criteria used for robotics demonstrations.",
    href: "https://www.prismax.ai/blog/standards-for-data",
    category: "Learn",
    eyebrow: "Validator guide",
    action: "Read standards",
  },
  {
    title: "PrismaX Insights",
    description: "Explore product updates, research perspectives, and physical AI explainers.",
    href: "https://www.prismax.ai/blog",
    category: "Learn",
    eyebrow: "News & research",
    action: "Browse insights",
  },
  {
    title: "Brand Kit",
    description: "Find official PrismaX brand assets and usage resources.",
    href: "https://www.prismax.ai/brand-kit",
    category: "Community",
    eyebrow: "Official assets",
    action: "Open brand kit",
  },
  {
    title: "Careers",
    description: "Discover open roles and opportunities to work with the PrismaX team.",
    href: "https://www.prismax.ai/careers",
    category: "Community",
    eyebrow: "Join the team",
    action: "View careers",
  },
  {
    title: "PrismaX on X",
    description: "Follow official announcements, product moments, and community updates.",
    href: "https://x.com/PrismaXai",
    category: "Community",
    eyebrow: "Official social",
    action: "Follow on X",
  },
  {
    title: "Discord Community",
    description: "Meet PrismaX builders, operators, validators, and physical AI enthusiasts.",
    href: "https://discord.com/invite/prismaxai",
    category: "Community",
    eyebrow: "Community chat",
    action: "Join Discord",
  },
];

const categories: Category[] = ["All", "Start", "Contribute", "Robots", "Learn", "Community"];

const quickPaths = [
  { index: "01", title: "Validate robot data", copy: "Score demonstrations and help define training-grade data.", href: "https://app.prismax.ai/data/review", tag: "Validator" },
  { index: "02", title: "Operate real robots", copy: "Enter PrismaX teleoperation and build operator experience.", href: "https://app.prismax.ai/tele-op", tag: "Operator" },
  { index: "03", title: "Contribute VLA data", copy: "Upload robotics episodes and manage your submissions.", href: "https://app.prismax.ai/data/upload", tag: "Contributor" },
  { index: "04", title: "Explore the fleet", copy: "Compare validated robot platforms and supported hardware.", href: "https://app.prismax.ai/data/fleet", tag: "Robot owner" },
];

const brandSlides = [
  {
    src: "/brand/prismax-bridge.png",
    alt: "PrismaX key visual showing a robotic hand passing through a reflective X-shaped portal",
    label: "The bridge",
  },
  {
    src: "/brand/prismax-teleop.png",
    alt: "PrismaX flywheel graphic highlighting teleoperation as the source of real work and valuable data",
    label: "Teleoperation",
  },
  {
    src: "/brand/prismax-data.png",
    alt: "PrismaX flywheel graphic highlighting robotics data used to train smarter models",
    label: "Data",
  },
  {
    src: "/brand/prismax-models.png",
    alt: "PrismaX flywheel graphic highlighting models that increase robot autonomy",
    label: "Models",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("px-navigator-bookmarks");
      if (saved) setBookmarks(JSON.parse(saved));
    } catch {
      // Local preferences are optional; the directory still works without them.
    }
  }, []);

  useEffect(() => {
    if (carouselPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % brandSlides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [carouselPaused]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return destinations.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch = !term || `${item.title} ${item.description} ${item.eyebrow} ${item.category}`.toLowerCase().includes(term);
      const matchesSaved = !showSaved || bookmarks.includes(item.href);
      return matchesCategory && matchesSearch && matchesSaved;
    });
  }, [query, category, bookmarks, showSaved]);

  function toggleBookmark(href: string) {
    setBookmarks((current) => {
      const next = current.includes(href) ? current.filter((item) => item !== href) : [...current, href];
      window.localStorage.setItem("px-navigator-bookmarks", JSON.stringify(next));
      return next;
    });
  }

  function jumpToDirectory() {
    document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
  }

  function changeSlide(direction: -1 | 1) {
    setActiveSlide((current) => (current + direction + brandSlides.length) % brandSlides.length);
  }

  return (
    <main>
      <header className="site-header">
        <a className="compass-brand" href="#top" aria-label="PX Compass home">
          <img className="compass-mark" src="/brand/prismax-lockup-px.svg" alt="" aria-hidden="true" />
          <span className="compass-name">COMPASS</span>
          <span className="compass-tag">COMMUNITY GUIDE</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#resources">Start here</a>
          <a href="#paths">Choose a path</a>
          <a href="#directory">Directory</a>
        </nav>
        <a className="header-cta" href="https://app.prismax.ai/" target="_blank" rel="noreferrer">
          Launch app <Arrow />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="signal-pill"><span /> Independent community gateway</div>
          <h1>
            Find your way<br />through{" "}
            <span className="hero-logo-word">
              <img src="/brand/prismax-logotype-cream.svg" alt="PrismaX" />
              <span aria-hidden="true">.</span>
            </span>
          </h1>
          <p className="hero-lede">
            One clear starting point for the PrismaX ecosystem. Find the right tool, understand what it does, and move directly to the official destination.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={jumpToDirectory}>Explore the directory <span>↓</span></button>
            <a className="text-link" href="https://app.prismax.ai/whitepaper" target="_blank" rel="noreferrer">Read the whitepaper <Arrow /></a>
          </div>
        </div>

        <aside
          className="hero-panel carousel-panel"
          aria-label="PrismaX ecosystem brand carousel"
          onMouseEnter={() => setCarouselPaused(true)}
          onMouseLeave={() => setCarouselPaused(false)}
          onFocus={() => setCarouselPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setCarouselPaused(false);
          }}
        >
          <div className="panel-topline">
            <span>ECOSYSTEM / BRAND KIT</span>
            <span>{String(activeSlide + 1).padStart(2, "0")} / {String(brandSlides.length).padStart(2, "0")}</span>
          </div>
          <div className="brand-carousel" aria-live="polite">
            {brandSlides.map((slide, index) => (
              <figure className={`brand-slide ${index === activeSlide ? "active" : ""}`} aria-hidden={index !== activeSlide} key={slide.src}>
                <img src={slide.src} alt={index === activeSlide ? slide.alt : ""} />
              </figure>
            ))}
          </div>
          <div className="carousel-controls">
            <div className="carousel-current"><span>NOW SHOWING</span><strong>{brandSlides[activeSlide].label}</strong></div>
            <div className="carousel-dots" role="tablist" aria-label="Choose ecosystem visual">
              {brandSlides.map((slide, index) => (
                <button
                  className={index === activeSlide ? "active" : ""}
                  key={slide.src}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show ${slide.label} visual`}
                  aria-selected={index === activeSlide}
                  role="tab"
                />
              ))}
            </div>
            <div className="carousel-arrows">
              <button onClick={() => changeSlide(-1)} aria-label="Previous ecosystem visual">←</button>
              <button onClick={() => changeSlide(1)} aria-label="Next ecosystem visual">→</button>
            </div>
          </div>
        </aside>
      </section>

      <section className="ticker" aria-label="PrismaX focus areas">
        <div><span>ROBOTS</span><b>◆</b><span>DATA</span><b>◆</b><span>INTELLIGENCE</span><b>◆</b><span>TELEOPERATION</span><b>◆</b><span>VALIDATION</span><b>◆</b><span>PHYSICAL AI</span></div>
      </section>

      <section className="section resources-section" id="resources">
        <div className="resource-intro">
          <span className="section-kicker light">01 / START HERE</span>
          <h2>New to PrismaX?</h2>
          <p>Understand the system before choosing how you want to participate.</p>
          <a href="https://www.prismax.ai/" target="_blank" rel="noreferrer">Visit the official website <Arrow /></a>
        </div>
        <div className="steps">
          <a href="https://app.prismax.ai/whitepaper" target="_blank" rel="noreferrer"><span>01</span><div><h3>Understand the vision</h3><p>Start with the whitepaper and learn how robots, data, and human participation connect.</p></div><Arrow /></a>
          <a href="https://www.prismax.ai/blog/standards-for-data" target="_blank" rel="noreferrer"><span>02</span><div><h3>Learn the standard</h3><p>See what makes robotics data training-grade and how validators evaluate it.</p></div><Arrow /></a>
          <a href="https://app.prismax.ai/" target="_blank" rel="noreferrer"><span>03</span><div><h3>Choose your role</h3><p>Enter the app as a validator, operator, contributor, or robot owner.</p></div><Arrow /></a>
        </div>
      </section>

      <section className="section paths-section" id="paths">
        <div className="section-heading">
          <div><span className="section-kicker">02 / CHOOSE YOUR PATH</span><h2>What are you here to do?</h2></div>
          <p>Start with your goal. Each route takes you directly to the relevant PrismaX experience.</p>
        </div>
        <div className="path-grid">
          {quickPaths.map((path) => (
            <a className="path-card" href={path.href} target="_blank" rel="noreferrer" key={path.title}>
              <div className="path-meta"><span>{path.index}</span><span>{path.tag}</span></div>
              <h3>{path.title}</h3>
              <p>{path.copy}</p>
              <div className="path-action">Go to destination <Arrow /></div>
            </a>
          ))}
        </div>
      </section>

      <section className="section directory-section" id="directory">
        <div className="section-heading directory-heading">
          <div><span className="section-kicker">03 / DIRECTORY</span><h2>Every route, one directory.</h2></div>
          <p>Search by task or browse by category. Every link opens an official PrismaX destination.</p>
        </div>

        <div className="directory-controls">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search PrismaX destinations..." aria-label="Search PrismaX destinations" />
            {query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}
          </label>
          <button className={`saved-toggle ${showSaved ? "active" : ""}`} onClick={() => setShowSaved((value) => !value)} aria-pressed={showSaved}>
            <span aria-hidden="true">★</span> Saved <b>{bookmarks.length}</b>
          </button>
        </div>

        <div className="category-tabs" role="group" aria-label="Filter destinations by category">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={category === item ? "active" : ""} aria-pressed={category === item}>{item}</button>
          ))}
        </div>

        <div className="results-bar"><span>{filtered.length.toString().padStart(2, "0")} destinations</span><span>Official links verified</span></div>

        {filtered.length > 0 ? (
          <div className="destination-grid">
            {filtered.map((item) => {
              const saved = bookmarks.includes(item.href);
              return (
                <article className="destination-card" key={item.href}>
                  <div className="card-topline">
                    <span className="card-category">{item.eyebrow}</span>
                    <button className={`bookmark ${saved ? "saved" : ""}`} onClick={() => toggleBookmark(item.href)} aria-label={`${saved ? "Remove" : "Save"} ${item.title}`} aria-pressed={saved}>★</button>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.href} target="_blank" rel="noreferrer"><span>{item.action}</span><Arrow /></a>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state"><span>NO MATCH</span><h3>That route isn’t mapped yet.</h3><p>Try another search, switch categories, or view all destinations.</p><button onClick={() => { setQuery(""); setCategory("All"); setShowSaved(false); }}>Reset directory</button></div>
        )}
      </section>

      <section className="section latest-section">
        <div className="section-heading">
          <div><span className="section-kicker">04 / LATEST SIGNALS</span><h2>What’s happening now.</h2></div>
          <a className="text-link dark" href="https://www.prismax.ai/blog" target="_blank" rel="noreferrer">View all insights <Arrow /></a>
        </div>
        <div className="editorial-grid">
          <a className="feature-story" href="https://www.prismax.ai/blog/prismax-product-updates-q2-2026" target="_blank" rel="noreferrer">
            <div className="story-visual"><span>Q2</span><i>2026</i><b>PRODUCT<br />UPDATE</b></div>
            <div className="story-content"><span>PRODUCT INFO · JUL 07, 2026</span><h3>PrismaX Product Updates: Q2 2026</h3><p>Operator data uploads, Verify Quality, and the redesigned Robot Fleet hardware marketplace.</p><strong>Read update <Arrow /></strong></div>
          </a>
          <div className="story-list">
            <a href="https://www.prismax.ai/blog/introducing-the-first-100" target="_blank" rel="noreferrer"><span>JUN 23, 2026</span><h3>Introducing The First 100</h3><p>Meet the founding Data Quality Validators.</p><Arrow /></a>
            <a href="https://www.prismax.ai/blog/standards-for-data" target="_blank" rel="noreferrer"><span>JUL 09, 2026</span><h3>Standards for Data</h3><p>The rubric behind training-grade robot demonstrations.</p><Arrow /></a>
            <a href="https://www.prismax.ai/blog/intro-to-ai-for-robotics" target="_blank" rel="noreferrer"><span>JAN 06, 2026</span><h3>Intro to AI for Robotics</h3><p>A clear primer on physical AI and training loops.</p><Arrow /></a>
          </div>
        </div>
      </section>

      <section className="community-strip">
        <div><span className="section-kicker light">05 / STAY CONNECTED</span><h2>Follow the signal.</h2></div>
        <div className="social-links">
          <a href="https://x.com/PrismaXai" target="_blank" rel="noreferrer"><span>X</span> @PrismaXai <Arrow /></a>
          <a href="https://discord.com/invite/prismaxai" target="_blank" rel="noreferrer"><span>DC</span> Discord <Arrow /></a>
          <a href="https://t.me/PrismaX_News" target="_blank" rel="noreferrer"><span>TG</span> Telegram <Arrow /></a>
          <a href="https://www.linkedin.com/company/prismaxai/" target="_blank" rel="noreferrer"><span>IN</span> LinkedIn <Arrow /></a>
        </div>
      </section>

      <footer>
        <a className="compass-brand footer-brand" href="#top" aria-label="PX Compass home"><img className="compass-mark" src="/brand/prismax-lockup-px.svg" alt="" aria-hidden="true" /><span className="compass-name">COMPASS</span><span className="compass-tag">COMMUNITY GUIDE</span></a>
        <p>PX Compass is an independent community-built gateway to the PrismaX ecosystem. Not affiliated with or endorsed by PrismaX.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
