<script>
  import Search from "../search.svelte";
  import HomeButton from "../homeButton.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let query = "";
  // SPA navigation helper (keeps behavior consistent with your app)
  function nav(url, e) {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    e?.preventDefault();
    try {
      window.history.pushState({}, "", url);
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch {
      window.location.assign(url);
    }
  }

  import ashwaganda from "../assets/tinktures/ashwagandha.jpeg";
  import avena from "../assets/tinktures/avena.jpeg";
  import brahmi from "../assets/tinktures/brahmi.jpeg";
  import chamomile from "../assets/tinktures/chamomile.jpeg";
  import dandelion from "../assets/tinktures/dandelionRoot.png";
  import ginko from "../assets/tinktures/ginko.jpeg";
  import gotu from "../assets/tinktures/gotuKola.jpeg";
  import basil from "../assets/tinktures/holyBasil.jpeg";
  import lemon from "../assets/tinktures/lemonBalm.jpeg";
  import maca from "../assets/tinktures/macaRoot.jpg";
  import milkThistle from "../assets/tinktures/milkThistle.jpeg";
  import NAC from "../assets/tinktures/nac.jpeg";
  import passionFlower from "../assets/tinktures/passionflower.jpeg";
  import rhodiola from "../assets/tinktures/rhodiola.jpeg";
  import saffrom from "../assets/tinktures/saffron.jpeg";
  import stJohn from "../assets/tinktures/stJohnsWort.jpeg";
  import valerian from "../assets/tinktures/valerianRoot.jpg";
  import vitex from "../assets/tinktures/vitex.jpeg";
  import zince from "../assets/tinktures/zinc.jpeg";

    const tinctures = [
        { name: "Vitex (Chasteberry)", img: vitex, uses: ["Cycle regularity", "Post‑birth‑control transition"] },
        { name: "Ashwagandha", img: ashwaganda, uses: ["Stress resilience", "Adaptogen support", "Endocrine balance"] },
        { name: "Maca root", img: maca, uses: ["Energy", "Libido", "Hormone tonic"] },
        { name: "Milk thistle", img: milkThistle, uses: ["Liver support", "Hormone metabolism"] },
        { name: "Dandelion root", img: dandelion, uses: ["Liver & digestive support", "Hormone clearance"] },

        { name: "St. John's Wort", img: stJohn, uses: ["Mild–moderate depression (drug interactions possible)"] },
        { name: "Saffron", img: saffrom, uses: ["Mood support", "Adjunct for depression"] },
        { name: "Bacopa (Brahmi)", img: brahmi, uses: ["Cognitive support", "Memory", "Mood stabilization"] },

        { name: "Chamomile", img: chamomile, uses: ["Anxiety", "Sleep support", "Gentle calming"] },
        { name: "Lemon balm", img: lemon, uses: ["Anxiety", "Nervous tension", "Sleep"] },
        { name: "Passionflower", img: passionFlower, uses: ["Acute anxiety", "Insomnia"] },
        { name: "Valerian root", img: valerian, uses: ["Sleep‑related anxiety", "Sedative support"] },
        { name: "Holy basil (Tulsi)", img: basil, uses: ["Adaptogen stress support", "Calming"] },

        { name: "N‑Acetylcysteine (NAC)", img: NAC, uses: ["OCD adjunct (glutamate modulation)"] },
        { name: "Inositol (formulation)", img: zince, uses: ["OCD adjunct (high‑dose studies)"] },
        { name: "Zinc / trace minerals", img: zince, uses: ["Support for deficiencies linked to mood/compulsive symptoms"] },

        { name: "Gotu kola", img: gotu, uses: ["Cognitive support", "Circulation to the brain"] },
        { name: "Ginkgo biloba", img: ginko, uses: ["Processing speed", "Cerebral blood flow", "Focus support"] },
        { name: "Rhodiola", img: rhodiola, uses: ["Mental stamina", "Fatigue", "Adaptogen for focus"] },
        { name: "Milky oats (Avena)", img: avena, uses: ["Nervine‑tonic", "Burnout", "Wired‑tired states"] }
    ];

  // Reactive filtered list
  $: filtered = tinctures.filter(t => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return true;
    return t.name.toLowerCase().includes(q) || t.uses.join(" ").toLowerCase().includes(q);
  });

  function handleSearch(e) { query = e.detail?.q ?? ""; }
  function back() { dispatch("backToHome"); }
</script>

<section class="directory container">
  <header class="directory-header">
    <div class="title-block">
      <h1 class="site-title">Tinctures Index</h1>
      <div class="subtitle">Useful Tinktures to help Naturally treat conditions</div>
    </div>

    <div class="controls">
      <Search placeholder="Search tinctures or uses..." on:search={handleSearch} />
      <HomeButton />
    </div>
  </header>

  <div class="card section" style="margin-top:1rem;">
    <div class="dict-grid">
      {#each filtered as t}
        <article class="dir-item" tabindex="0" aria-label={t.name}>
          <div class="dir-thumb">
            <img src={t.img} alt={t.name} loading="lazy" />
          </div>

          <div class="dir-body">
            <h2 class="dir-title">{t.name}</h2>
            <p class="dir-desc">
              <strong>Best for:</strong>
              {#if t.uses && t.uses.length}
                {t.uses.join(", ")}
              {:else}
                General tonic/support
              {/if}
            </p>

    
          </div>
        </article>
      {/each}
    </div>

    {#if filtered.length === 0}
      <p class="dir-empty muted">No tinctures match your search.</p>
    {/if}
  </div>
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

  .title-block .site-title {
    margin: 0;
    font-family: var(--title-font);
    font-size: 2.4rem;
    line-height: 1.05;
    font-weight: 700;
    color: var(--toffee-1);
  }
  .subtitle { color:var(--muted); font-size:0.95rem; }

  .controls { display:flex; gap:0.5rem; align-items:center; }

  .card.section { padding:0.75rem; box-sizing: border-box; }

  .dict-grid {
    display:grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
    
  }
  .dir-item:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(107,63,43,0.12); }

  .dir-thumb {
    width:64px;
    height:64px;
    border-radius:10px;
    overflow: hidden;
    flex-shrink:0;
    display:flex;
    align-items:center;
    justify-content:center;
    background: linear-gradient(135deg, var(--toffee-3), var(--toffee-2));
  }
  .dir-thumb img { width:100%; height:100%; object-fit:cover; display:block; }

  .dir-body { flex:1; min-width:0; }
  .dir-title { margin:0 0 0.25rem 0; font-size:1.05rem; color:var(--toffee-1); line-height:1.15; font-family: var(--body-font); }
  .dir-desc { margin:0; color:var(--muted); font-size:0.92rem; font-family: var(--body-font); }

  .dir-link { display:inline-flex; align-items:center; gap:0.5rem; margin-top:0.5rem; color:var(--toffee-2); text-decoration:none; font-weight:600; }
  .dir-link:hover { color:var(--accent); text-decoration:underline; }

  .dir-empty { padding:2rem; border-radius:var(--radius); background: linear-gradient(180deg, rgba(183,134,90,0.06), rgba(183,134,90,0.03)); color:var(--muted); text-align:center; }

  @media (max-width:1000px) {
    .dict-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width:640px) {
    .dict-grid { grid-template-columns: 1fr; }
    .title-block .site-title { font-size: 1.6rem; }
    .dir-thumb { width:56px; height:56px; }
  }

  :global(html), :global(body) { margin:0; padding:0; box-sizing:border-box; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
</style>