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
/* directory grid responsiveness */
.dir-heading {
  margin: 0 0 0.75rem 0;
  font-family: var(--title-font);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}

/* three across grid */
.dir-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  width: 100%;
  box-sizing: border-box;
}

/* card */
.dir-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform .12s ease, box-shadow .12s ease;
}

/* keep hover subtle */
.dir-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }

/* image area: consistent aspect ratio */
.dir-media {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--muted-bg);
  margin: 0;
  display: block;
  line-height: 0;
}
.dir-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* clickable image wrapper removes default link styles */
.dir-media-link { display:block; text-decoration:none; color:inherit; }

/* body */
.dir-body { padding: 0.75rem; display:flex; flex-direction:column; gap:0.5rem; }
.dir-title { margin: 0; font-size: 1rem; }
.dir-title a { color: var(--primary); text-decoration: none; font-weight: 600; }
.dir-title a:hover { text-decoration: underline; }

.dir-desc { margin: 0; color: var(--muted); font-size: 0.9rem; line-height:1.25; }

/* responsive: 2 columns on medium, 1 on small */
@media (max-width: 1000px) {
  .dir-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .dir-grid { grid-template-columns: 1fr; }
}

/* layout helpers */
.main { display:flex; gap:0; align-items:flex-start; }
.center { display: grid; gap: 1rem; max-width: 920px; } /* expanded so article fills space */
.right-panel { width: 320px; margin-left: 1rem; } /* sits directly next to center */

/* make ArticlePreview visually larger */
.large-article {
  padding: 1rem;
  border-radius: 12px;
}

/* buttons and badges */
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--accent); color: white; border: none;
  border-radius: 8px; padding: 0.5rem 0.75rem; cursor: pointer;
}
.btn:hover { filter: brightness(1.05); }
.badge {
  display: inline-block; font-size: 0.8rem; padding: 0.15rem 0.5rem;
  border-radius: 999px; border: 1px solid var(--border);
  background: #f1f8f7; color: var(--accent);
}
.directory-separator { height: 1px; background: var(--border); margin: 1.25rem 0; }

/* header and title styles */
.header { position: sticky; top: 0; z-index: 20; background: var(--bg); border-bottom: 1px solid var(--border); }
.header-inner { display: grid; grid-template-columns: 1fr auto 48px; gap: 0.75rem; align-items: center; padding: 0.5rem 1rem; }
.title h1 { margin: 0; font-family: var(--title-font); font-size: 1.6rem; color: var(--primary); }
.subtitle { color: var(--muted); font-size: 0.9rem; }
.muted { color: var(--muted); }

/* responsive: stack sidebar under content on small screens */
@media (max-width: 900px) {
  .main { flex-direction: column; }
  .right-panel { width: 100%; margin-left: 0; margin-top: 1rem; }
  .center { max-width: 100%; }
}
</style>
