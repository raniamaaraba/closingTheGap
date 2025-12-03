<script>
  import HomeButton from "./homeButton.svelte";
  import Search from "./search.svelte";
  import SidePanel from "./pannel.svelte";
  import VersesRotator from "./verses.svelte";
  import ArticlePreview from "./preview.svelte";
  import HerbModal from "./modal.svelte";

  // Directory preview images (Vite resolves these)
  import tincturesImg from "./assets/tinktures.jpeg";
  import versesImg from "./assets/verses.jpg";
  import herbsImg from "./assets/herbs.jpeg";

  // Directory preview items
  const directoryItems = [
    { img: tincturesImg, href: "/resources/articles", title: "Ailments", desc: "Care basics and first steps moving forward." },
    { img: versesImg, href: "/resources/verses", title: "Verses", desc: "List of verses to help you understand the Lord's word." },
    { img: herbsImg, href: "/resources/directory", title: "Resources", desc: "Tools & resoruces for moving forward in your journey." }
  ];

  // Site state
  let recentPages = [
    { title: "Intro to Metrics", href: "/articles/metrics" },
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
    <VersesRotator title="Shuffling verses" {verses} interval={4500} />

    <ArticlePreview
      class="large-article"
      imageSrc=""
      imageAlt="Picture for article"
      shortDescription="A brief, contextual overview of the topic."
      quizPrompt="Try the 1-question quiz to see which article fits you best."
      articleHref="/articles/closing-the-gap"
    />

    <!-- directory preview placed inside the center column -->
    <section class="card section directory-preview" aria-labelledby="dir-preview-title" style="margin-top:1.25rem;">
      <h2 id="dir-preview-title" class="dir-heading">Directory</h2>

      <div class="dir-grid" role="list">
        {#each directoryItems as item}
          <article class="dir-card" role="listitem">
            <a class="dir-media-link" href={item.href} aria-label={item.title}>
              <figure class="dir-media">
                {#if item.img}
                  <img src={item.img} alt={item.title} loading="lazy" />
                {:else}
                  <div class="dir-placeholder">image</div>
                {/if}
              </figure>
            </a>

            <div class="dir-body">
              <h3 class="dir-title"><a href={item.href}>{item.title}</a></h3>
              <p class="dir-desc">{item.desc}</p>
            </div>
          </article>
        {/each}
      </div>
    </section>
  </div>

  <!-- SidePanel: keep the old look, add quiz via event handler -->
  <aside class="right-panel">
    <SidePanel
      {recentPages}
      {afterQuizArticles}
      {quizCompleted}
      on:completeQuiz={() => completeQuiz()}
    />
  </aside>
</main>

<footer class="footer container">
  <p class="muted">Developed by Rania Maaraba for Education Purposes.</p>
</footer>

{#if selected}
  <HerbModal herb={selected} on:close={closeModal} />
{/if}

<style>
  /* Ensure font tokens exist (index.html should load the fonts) */
  :root {
    --title-font: var(--title-font, "Lavishly Yours", cursive);
    --body-font: var(--body-font, "Special Elite", "Courier New", monospace);

    /* Toffee Fudge palette (defaults if not set globally) */
    --toffee-1: #6b3f2b;
    --toffee-2: #8f5a3b;
    --toffee-3: #b7865a;
    --cream-1:  #fff7ef;
    --cream-2:  #f3e6d8;
    --muted:    #6b5a50;
    --accent:   #c77a3a;
    --card-border: rgba(107,63,43,0.08);
    --surface: linear-gradient(180deg, var(--cream-2), #fff);
    --shadow: 0 12px 30px rgba(107,63,43,0.06);
    --accent-soft: rgba(199,122,58,0.08);
    --fudge-2: #e9d6c8;
    --blush-1: #fff1ee;
  }

  /* Component root */
  .home {
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem;
    display: block;
    font-family: var(--body-font);
    color: var(--toffee-1);
    background: linear-gradient(180deg, var(--cream-1), #fffaf3);
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
    font-family: var(--body-font);
  }

  /* Center column */
  .center {
    flex: 1 1 0%;
    max-width: 920px;
    display: grid;
    gap: 1rem;
    box-sizing: border-box;
  }

  /* Right panel */
  .right-panel {
    flex: 0 0 320px;
    min-width: 240px;
    margin-left: 1rem;
    box-sizing: border-box;
  }

  /* Responsive stacking */
  @media (max-width: 1000px) {
    .main { flex-direction: column; }
    .right-panel { width: 100%; margin-left: 0; margin-top: 1rem; flex: 0 0 auto; }
    .center { max-width: 100%; }
  }

  /* Directory heading */
  .dir-heading {
    margin: 0 0 0.75rem 0;
    font-family: var(--title-font);
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

  /* Directory card */
  .dir-card {
    background: var(--surface);
    border: 1px solid var(--card-border);
    border-radius: 12px;
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

  /* Media area */
  .dir-media {
    width: 100%;
    aspect-ratio: 4 / 3;
    min-height: 140px;
    overflow: hidden;
    background: linear-gradient(180deg, var(--fudge-2), var(--blush-1));
    display: block;
  }
  .dir-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Card body */
  .dir-body {
    padding: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
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

  /* Large article preview */
  .large-article {
    padding: 1rem;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow);
    box-sizing: border-box;
    font-family: var(--body-font);
  }

  /* Buttons and badges */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.85rem;
    border-radius: 10px;
    background: linear-gradient(180deg, var(--accent) 0%, var(--accent-soft) 100%);
    color: #fff;
    border: 1px solid rgba(0,0,0,0.06);
    cursor: pointer;
    font-family: var(--body-font);
  }
  .btn.secondary {
    background: linear-gradient(180deg, var(--primary, var(--toffee-2)), var(--toffee-2));
    color: #fff;
  }
  .badge {
    display: inline-block;
    font-size: 0.85rem;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(231,106,154,0.06), rgba(139,94,60,0.03));
    color: var(--primary, var(--toffee-1));
    border: 1px solid var(--card-border);
    font-family: var(--body-font);
  }

  /* Directory separator */
  .directory-separator {
    height: 1px;
    background: var(--card-border);
    margin: 1.25rem 0;
  }

  /* Sticky notes / sidebar widgets */
  .sticky-notes {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr 1fr;
    margin: 1rem 0;
  }
  .sticky {
    background: linear-gradient(180deg, #fff8e6, #fff6d9);
    border: 1px solid rgba(139,94,60,0.06);
    border-radius: 8px;
    padding: 0.6rem 0.75rem;
    color: #7a6c2b;
    box-shadow: 0 8px 20px rgba(139,94,60,0.06);
    font-family: var(--body-font);
  }
  @media (max-width: 640px) {
    .sticky-notes { grid-template-columns: 1fr; }
  }

  /* Modal overrides for Home */
  .modal .close {
    background: transparent;
    border: 1px solid var(--card-border);
    padding: 0.35rem 0.6rem;
    border-radius: 8px;
    cursor: pointer;
    color: var(--muted);
    font-family: var(--body-font);
  }

  /* Accessibility and focus */
  :global(a:focus), :global(button:focus), .dir-card:focus-within {
    outline: 3px solid rgba(127,90,138,0.12);
    outline-offset: 2px;
  }

  /* Prevent accidental horizontal overflow */
  :global(*) {
    box-sizing: border-box;
    word-wrap: break-word;
  }

  /* Small screen tweaks */
  @media (max-width: 420px) {
    .dir-media { min-height: 120px; }
    .title h1 { font-size: 1.4rem; }
    .dir-title { font-size: 0.98rem; }
    .dir-desc { font-size: 0.9rem; }
  }
</style>

