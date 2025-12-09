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
  //a-z
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

  .directory {
    background: linear-gradient(180deg, var(--cream-1) 0%, #fffaf3 100%);
    color: var(--toffee-1);
    min-height: 100%;
    padding: 1.25rem;
    font-family: var(--body-font);
  }

  .directory-header {
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:1rem;
    margin-bottom:1rem;
  }

  
  @media (max-width:640px){
    .directory-header { flex-direction:column; align-items:flex-start; gap:0.5rem; }
  }
    
:global(html), :global(body) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.directory-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1rem;
}

.title-block .site-title {
  margin: 0;
  font-family: var(--title-font);
  font-size: 3.0rem;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.02em;
}

@media (max-width: 900px) {
  .title-block .site-title { font-size: 1.6rem; }
}
@media (max-width: 480px) {
  .title-block .site-title { font-size: 1.35rem; }
}

.subtitle { color:var(--muted); font-size:0.9rem; }

.controls { display:flex; gap:0.5rem; align-items:center; }

.dict-grid {
  display:grid;
  gap:0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items:start;
  width: 100%;
  max-width: 100%;
  margin: 0; 
  box-sizing: border-box;
  padding: 0;
}

.card.section { padding:0.75rem; box-sizing: border-box; }
.muted { color:var(--muted); margin-top:0.75rem; }

</style>
