<script>
  
  import { createEventDispatcher } from "svelte";
  export let afterQuizArticles = [];

  export let externalResources = [
    { title: "What does the Bible say about Medicine?", href: "https://www.openbible.info/topics/medicine" },
    { title: "Cincinnati Apothocary Store", href: "https://nativemoonherbals.com/" },
    { title: "Calhoun Farms - Salves & Tinktures", href: "https://calhounfarmstead.com/"}
  ];

  const dispatch = createEventDispatcher();

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

  function goTo(path, e) {
    // allow normal open-in-new-tab / modifier clicks
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    e?.preventDefault();
    console.log('goTo clicked:', path);
    try {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
      dispatch("openDictionary");
    } catch (err) {
      console.warn('goTo pushState failed, falling back', err);
      window.location.assign(path);
    }
  }

  function notifyOpenDictionary() { dispatch("openDictionary"); }
</script>

<aside class="card section side-panel" aria-label="Side panel">
  <h2 class="sr-only">Side panel</h2>

  <!--header -->
  <div class="nav-intro" aria-hidden="false">
    <h3 class="nav-title">Navigation</h3>
  </div>

  <!-- shortcuts-->
  <nav class="nav-icons" aria-label="Primary shortcuts">
    <a class="icon-btn" href="/quiz" title="Quiz" aria-label="Quiz" on:click={(e) => nav('/quiz', e)}>Quiz</a>
    <a class="icon-btn" href="/articles" title="Articles" aria-label="Articles" on:click={(e) => nav('/articles', e)}>Articles</a>

    <a
      class="icon-btn"
      href="/directory"
      title="Herbal Dictionary"
      aria-label="Herbal Dictionary"
      on:click={(e) => goTo('/directory', e)}
    >
      Herbs
    </a>
  </nav>

  <!-- exterbal-->
  <div class="group resources">
    <h3>External resources</h3>
    <ul class="dash-list">
      {#each externalResources as r}
        <li>
          <a class="external-link" href={r.href} target="_blank" rel="noopener noreferrer">
            {r.title}
          </a>
        </li>
      {/each}
      {#if externalResources.length === 0}
        <li class="muted">No external resources available</li>
      {/if}
    </ul>
  </div>
</aside>

<style>
  :root {
    --title-font: var(--title-font, "Lavishly Yours", cursive);
    --body-font: var(--body-font, "Special Elite", "Courier New", monospace);
  }

  .side-panel {
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--body-font);
  }

  .card.section {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    padding: 0.75rem;
    border-radius: 10px;
  }

  .nav-icons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
    align-items: stretch;
    justify-content: flex-start;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 44px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--card-bg);
    box-shadow: var(--shadow);
    text-decoration: none;
    font-size: 0.95rem;
    color: var(--accent);
    font-weight: 700;
    transition: transform .12s ease, filter .12s ease;
    padding: 0 0.75rem;
    text-align: left;
  }
  .icon-btn:hover,
  .icon-btn:focus {
    transform: translateY(-3px);
    filter: brightness(1.05);
    outline: none;
  }

  .resources ul { margin: 0; padding-left: 1rem; }

  .dash-list { 
    list-style: none; 
    margin: 0; 
    padding-left: 1rem; 
  }

  .dash-list li { 
    position: relative; 
    padding-left: 1.05rem; 
    margin-bottom: 0.35rem; 
    line-height: 1.3; }

  .dash-list li::before { 
    content: "—"; 
    position: absolute; 
    left: 0; 
    top: 0; 
    color: var(--muted); 
    font-weight: 600; 
    font-family: var(--body-font); 
    line-height: 1;
   }

  .external-link {
    color: var(--ink, #1f2937);
    text-decoration: none;
    font-family: var(--body-font);
    display: inline-flex;
    gap: 0.35rem;
    align-items: center;
  }
  .external-link:hover { text-decoration: underline; color: var(--accent); }

  .muted { color: var(--muted); font-family: var(--body-font); }

  .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }

  @media (max-width: 640px) {
    .icon-btn { height: 42px; }
  }
</style>
