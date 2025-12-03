<script>
  import Search from "./search.svelte";
  import HerbCard from "./herbCards.svelte"
  import HerbModal from "./modal.svelte";
  import { herbs } from "./herbs.js";
  import { createEventDispatcher } from "svelte";
  import HomeButton from "./homeButton.svelte";
  const dispatch = createEventDispatcher();

  let query = "";
  let selected = null;

  // Reactive filtered list (no A-Z filtering)
  $: filtered = herbs.filter(h => {
    const name = (h.name || "").toLowerCase();
    const short = (h.short || "").toLowerCase();
    const matchesQuery = !query || name.includes(query.toLowerCase()) || short.includes(query.toLowerCase());
    return matchesQuery;
  });

  function openHerb(h) { selected = h; }
  function closeModal() { selected = null; }

  function handleSearch(e) { query = e.detail?.q ?? ""; }
  function back() { dispatch("backToHome"); }
</script>

<section class="directory container">
  <header class="directory-header">
    <div class="title-block">
      <h1 class="site-title">Herbal Dictionary</h1>
      <div class="subtitle">Quick Index of Useful Herbs</div>
    </div>

    <div class="controls">
      <Search placeholder="Search herbs..." on:search={handleSearch} />
      <HomeButton />
    </div>
  </header>

  <div class="card section" style="margin-top:1rem;">
    <!-- left-aligned grid container -->
    <div class="dict-grid">
      {#each filtered as herb}
        <HerbCard {herb} on:open={() => openHerb(herb)} />
      {/each}
    </div>

    {#if filtered.length === 0}
      <p class="muted">No herbs match your search.</p>
    {/if}
  </div>

  {#if selected}
    <HerbModal herb={selected} on:close={closeModal} />
  {/if}
</section>

<style>
    
:global(html), :global(body) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden; /* prevent page-level horizontal scroll */
}

/* container: full-width but constrained for readability */
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

/* header */
.directory-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1rem;
}

/* Directory.svelte — responsive title */
.title-block .site-title {
  margin: 0;
  font-family: var(--title-font);
  font-size: 3.0rem;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* scale down on smaller screens */
@media (max-width: 900px) {
  .title-block .site-title { font-size: 1.6rem; }
}
@media (max-width: 480px) {
  .title-block .site-title { font-size: 1.35rem; }
}

.subtitle { color:var(--muted); font-size:0.9rem; }

/* controls */
.controls { display:flex; gap:0.5rem; align-items:center; }

/* Grid: fluid, left-aligned but never wider than container */
.dict-grid {
  display:grid;
  gap:0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items:start;

  /* make grid fill the container without forcing extra width */
  width: 100%;
  max-width: 100%;
  margin: 0; /* remove right auto that caused extra whitespace */
  box-sizing: border-box;
  padding: 0;
}

/* tablet */
@media (max-width:1000px) {
  .dict-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* mobile */
@media (max-width:640px) {
  .dict-grid { grid-template-columns: 1fr; }
}

/* card wrapper */
.card.section { padding:0.75rem; box-sizing: border-box; }

/* ensure herb cards themselves are fluid */
HerbCard, .herb-card, .card { width: 100%; max-width: 100%; box-sizing: border-box; }

/* images must not overflow */
img { max-width: 100%; height: auto; display: block; object-fit: cover; }

/* utility */
.muted { color:var(--muted); margin-top:0.75rem; }

/* debug helper (temporary) - uncomment to find overflow sources */
/*
:global(*) { outline: 1px dashed rgba(255,0,0,0.06); }
*/
</style>
