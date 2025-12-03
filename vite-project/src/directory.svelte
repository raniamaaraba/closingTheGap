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
  :root{
    --title-font: "Lavishly Yours", cursive;
    --body-font: "Special Elite", "Courier New", monospace;

    --toffee-1: #6b3f2b;
    --toffee-2: #8f5a3b;
    --toffee-3: #b7865a;
    --cream-1:  #fff7ef;
    --cream-2:  #f3e6d8;
    --muted:    #6b5a50;
    --accent:   #c77a3a;
    --card-border: rgba(107,63,43,0.08);
    --radius: 12px;
    --shadow: 0 6px 18px rgba(107,63,43,0.08);
  }

  /* Base */
  .directory {
    background: linear-gradient(180deg, var(--cream-1) 0%, #fffaf3 100%);
    color: var(--toffee-1);
    min-height: 100%;
    padding: 1.25rem;
    font-family: var(--body-font);
  }

  /* Header uses Lavishly Yours */
  .directory-header {
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:1rem;
    margin-bottom:1rem;
  }

  .directory-title {
    font-family: var(--title-font);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--toffee-1);
    margin: 0;
    letter-spacing: 0.4px;
  }

  .directory-sub {
    font-family: var(--title-font);
    color: var(--muted);
    font-size: 0.95rem;
    margin: 0;
  }

  /* Controls */
  .directory-controls { display:flex; gap:0.5rem; align-items:center; }
  .dir-search {
    background: var(--cream-2);
    border: 1px solid var(--card-border);
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
    color: var(--toffee-1);
    outline: none;
    min-width: 220px;
    box-shadow: var(--shadow);
    font-family: var(--body-font);
  }
  .dir-search::placeholder { color: var(--muted); }

  .btn {
    background: linear-gradient(180deg, var(--toffee-2), var(--accent));
    color: #fff;
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 6px 12px rgba(199,122,58,0.18);
    font-family: var(--body-font);
  }

  /* Grid and items */
  .dir-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .dir-item {
    background: linear-gradient(180deg, var(--cream-2), #fff);
    border-radius: var(--radius);
    padding: 0.9rem;
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow);
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    transition: transform 160ms ease, box-shadow 160ms ease;
    font-family: var(--body-font);
  }
  .dir-item:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(107,63,43,0.12); }

  .dir-thumb {
    width:64px;
    height:64px;
    border-radius:10px;
    background: linear-gradient(135deg, var(--toffee-3), var(--toffee-2));
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    font-weight:700;
    flex-shrink:0;
    font-family: var(--title-font); /* decorative initial in header font */
    font-size:1.05rem;
    letter-spacing:0.6px;
  }

  .dir-body { flex:1; min-width:0; }

  .dir-title {
    margin:0 0 0.25rem 0;
    font-size:1.05rem;
    color:var(--toffee-1);
    line-height:1.15;
    font-family: var(--title-font);
  }

  .dir-desc {
    margin:0;
    color:var(--muted);
    font-size:0.92rem;
    font-family: var(--body-font);
  }

  .dir-link {
    display:inline-flex;
    align-items:center;
    gap:0.5rem;
    margin-top:0.5rem;
    color:var(--toffee-2);
    text-decoration:none;
    font-weight:600;
    font-family: var(--body-font);
  }
  .dir-link:hover { color:var(--accent); text-decoration:underline; }

  .dir-empty {
    padding:2rem;
    border-radius:var(--radius);
    background: linear-gradient(180deg, rgba(183,134,90,0.06), rgba(183,134,90,0.03));
    color:var(--muted);
    text-align:center;
    font-family: var(--body-font);
  }

  @media (max-width:640px){
    .directory-header { flex-direction:column; align-items:flex-start; gap:0.5rem; }
    .dir-search { min-width:100%; }
    .dir-thumb { width:56px; height:56px; }
  }
    
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
