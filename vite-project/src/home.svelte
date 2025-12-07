<script>
  import HomeButton from "./homeButton.svelte";
  import Search from "./search.svelte";
  import SidePanel from "./pannel.svelte";
  import VersesRotator from "./verses.svelte";
  import HerbModal from "./modal.svelte";

  // Directory preview images (Vite resolves these)
  import tincturesImg from "./assets/tinktures.jpeg";
  import versesImg from "./assets/verses.jpg";
  import herbsImg from "./assets/herbs.jpeg";

  // Directory preview items — use route paths (no .svelte)
  const directoryItems = [
    { img: tincturesImg, href: "/resources/ailments", title: "Ailments", desc: "Care basics and first steps moving forward." },
    { img: versesImg, href: "/resources/versePage", title: "Verses", desc: "List of verses to help you understand the Lord's word." },
    { img: herbsImg, href: "/resources/resources", title: "Resources", desc: "Tools & resources for moving forward in your journey." }
  ];

  // Site state
  let recentPages = [
    { title: "Understanding", href: "/articles/metrics" },
    { title: "Quiz: Gaps 101", href: "/quiz/gaps-101" }
  ];
  let afterQuizArticles = [];
  let quizCompleted = false;

  function completeQuiz() {
    quizCompleted = true;
    afterQuizArticles = [
      { title: "Understanding Results", href: "/articles/results" },
      { title: "Next Steps", href: "/articles/next-steps" }
    ];
  }

  // Verses rotator
  const verses = [
    "Proverbs 17:22 -- A joyful heart is good medicine, but a crushed spirit dries up the bones.",
    "Psalm 147:3 -- He heals the brokenhearted and binds up their wounds.",
    "1 Peter 5:7 -- Casting all your anxieties on him, because he cares for you.",
    "Jeremiah 33:6 -- Behold, I will bring to it health and healing, and I will heal them and reveal to them abundance of prosperity and security.",
    "Luke 1:37 -- For nothing will be impossible with God."
  ];

  // Optional small preview modal state (if you want to preview herbs inline)
  let selected = null;
  function openHerbPreview(h) { selected = h; }
  function closeModal() { selected = null; }

  // Search handlers
  function handleGlobalSearch(e) {
    const q = (e.detail?.q || "").trim();
    if (!q) return;
    recentPages = [{ title: `Search: ${q}`, href: `/search?q=${encodeURIComponent(q)}` }, ...recentPages];
  }

  // SPA navigation helper (same pattern used in your panel)
  function nav(url, e) {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    e?.preventDefault();
    try {
      window.history.pushState({}, "", url);
      window.dispatchEvent(new PopStateEvent("popstate"));
      console.log('nav pushState ->', url);
    } catch (err) {
      console.warn('pushState failed, falling back to full navigation', err);
      window.location.assign(url);
    }
  }
</script>

<!-- Top header (site title, global search, home) -->
<header class="header">
  <div class="header-inner container">
    <div class="title">
      <h1>Closing the Gap</h1>
      <div class="subtitle">home page</div>
    </div>

    <Search on:search={handleGlobalSearch} placeholder="Search site..." compact={true} buttonLabel="Go" />

    <HomeButton />
  </div>
</header>

<!-- Main content with center column and side panel -->
<main class="main container">
  <div class="center">
    <VersesRotator title="Shuffling verses" {verses} interval={45000} />

    <!-- directory preview placed inside the center column -->
    <section class="card section directory-preview" aria-labelledby="dir-preview-title" style="margin-top:1.25rem;">
      <h2 id="dir-preview-title" class="dir-heading">Directory</h2>

      <div class="dir-grid" role="list">
        {#each directoryItems as item}
          <article class="dir-card" role="listitem">
            <!-- use nav() so SPA routing is used -->
            <a class="dir-media-link" href={item.href} aria-label={item.title} on:click={(e) => nav(item.href, e)}>
              <figure class="dir-media">
                {#if item.img}
                    <img src={item.img} alt={item.title} loading="lazy"/>                
                  {:else}
                    <div class="dir-placeholder">image</div>
                {/if}
              </figure>
            </a>

            <div class="dir-body">
              <h3 class="dir-title">
                <a href={item.href} on:click={(e) => nav(item.href, e)}>{item.title}</a>
              </h3>
              <p class="dir-desc">{item.desc}</p>
            </div>
          </article>
        {/each}
      </div>
    </section>
  </div>

  <aside class="right-panel">
    <!-- pass afterQuizArticles so SidePanel can show post-quiz links if needed -->
    <SidePanel {afterQuizArticles} />
  </aside>
</main>

{#if selected}
  <HerbModal herb={selected} on:close={closeModal} />
{/if}

<style>
 :root {
  --title-font: "Lavishly Yours", cursive;
  --body-font: "Special Elite", "Courier New", monospace;

  /* Toffee Fudge palette */
  --toffee-1: #6b3f2b;
  --toffee-2: #8f5a3b;
  --toffee-3: #b7865a;
  --cream-1: #fff7ef;
  --cream-2: #f3e6d8;
  --muted: #6b5a50;
  --accent: #c77a3a;
  --card-border: rgba(107,63,43,0.08);
  --surface: linear-gradient(180deg, var(--cream-2), #fff);
  --shadow: 0 12px 30px rgba(107,63,43,0.06);
  --accent-soft: rgba(199,122,58,0.08);
  --fudge-2: #e9d6c8;
  --blush-1: #fff1ee;

  --radius: 12px;
}

/* Global resets and utilities */
:global(html), :global(body) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
:global(*) { box-sizing: border-box; word-wrap: break-word; }

/* Page container */
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  font-family: var(--body-font);
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: transparent;
  border-bottom: 1px solid var(--card-border);
}
.header-inner {
  display: grid;
  grid-template-columns: 1fr auto 48px;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem 0.75rem;
}
.title h1 {
  margin: 0;
  font-family: var(--title-font);
  font-size: 3.0rem;
  color: var(--toffee-1);
  line-height: 1.05;
}
.subtitle {
  color: var(--muted);
  font-size: 0.95rem;
  font-family: var(--body-font);
}

/* Main layout */
.main {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}
.center {
  flex: 1 1 0%;
  max-width: 920px;
  display: grid;
  gap: 1rem;
  box-sizing: border-box;
}
.right-panel {
  flex: 0 0 320px;
  min-width: 240px;
  margin-left: 1rem;
  box-sizing: border-box;
}
@media (max-width: 1000px) {
  .main { flex-direction: column; }
  .right-panel { width: 100%; margin-left: 0; margin-top: 1rem; flex: 0 0 auto; }
  .center { max-width: 100%; }
}

/* Directory heading */
.dir-heading {
  margin: 1.0rem 0 1.0rem 0;
  font-family: var(--body-font);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--toffee-1);
}

/* Directory grid */
.dir-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@media (max-width: 1000px) {
  .dir-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .dir-grid { grid-template-columns: 1fr; }
}

/* Card */
.dir-card {
  background: var(--surface);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform .14s ease, box-shadow .14s ease;
  width: 100%;
  box-sizing: border-box;
}
.dir-card:hover,
.dir-card:focus-within {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(107,58,42,0.08);
  outline: none;
}

/* Media container: centered focal point and consistent cover behavior */
.dir-card .dir-media {
  display: block;
  align-items: flex-start; /* no-op for block, kept for clarity */
  justify-content: flex-start; /* no-op for block, kept for clarity */
  overflow: hidden;
  width: 100%;
  aspect-ratio: 4 / 3;
  min-height: 140px;
  background: linear-gradient(180deg, var(--fudge-2), var(--blush-1));
}

/* Make image cover but align its focal point to the left */
.dir-card .dir-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center; /* left-aligned crop */
  display: block;
  margin: 0;
}

/* Left-align title and description under the image */
.dir-card .dir-body {
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  text-align: left;
}

/* Keep small-screen adjustments consistent */
@media (max-width: 420px) {
  .dir-card .dir-media { min-height: 120px; }
  .dir-card .dir-body { padding: 0.6rem; }
}

/* Title and description */
.dir-title {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.25;
  color: var(--toffee-1);
  font-family: var(--title-font);
}
.dir-title a {
  color: var(--toffee-1);
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
}
.dir-title a:hover,
.dir-title a:focus {
  text-decoration: underline;
}
.dir-desc {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.35;
  word-break: break-word;
  font-family: var(--body-font);
}

/* Focus outlines */
:global(a:focus), :global(button:focus), .dir-card:focus-within {
  outline: 3px solid rgba(127,90,138,0.12);
  outline-offset: 2px;
}



/* Utility: ensure images don't overflow elsewhere */
img { max-width: 100%; height: auto; display: block; object-fit: cover; }

/* Optional: visually center links inside card when needed */
.dir-card .dir-body .dir-link-row { display: flex; justify-content: center; width: 100%; }

/* End of CSS */


  
</style>
