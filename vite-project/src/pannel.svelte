<script>
  import { createEventDispatcher } from "svelte";
  export let recentPages = [];
  export let afterQuizArticles = [];

  const dispatch = createEventDispatcher();

  // Programmatic nav for regular Svelte SPA
  function nav(url, e) {
    // allow normal open-in-new-tab / ctrl/cmd+click
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    e?.preventDefault();

    // push state and notify listeners
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  // optional: notify parent if needed
  function notifyOpenDictionary() { dispatch("openDictionary"); }
</script>

<aside class="card section side-panel" aria-label="Side panel">
  <h2>Side panel</h2>

  <nav class="nav-icons" aria-label="Primary shortcuts">
    <a class="icon-btn" href="/quiz" title="Quiz" aria-label="Quiz" on:click={(e) => nav('/quiz', e)}>Quiz</a>
    <a class="icon-btn" href="/articles" title="Articles" aria-label="Articles" on:click={(e) => nav('/articles', e)}>Articles</a>
    <a class="icon-btn" href="/dictionary" title="Herbal Dictionary" aria-label="Herbal Dictionary" on:click={(e) => nav('/dictionary', e)}>Herbs</a>
    </nav>


  <div class="group">
    <h3>Recent pages</h3>
    <ul>
      {#each recentPages as p}
        <li><a href={p.href}>{p.title}</a></li>
      {/each}
      {#if recentPages.length === 0}
        <li class="muted">No recent pages yet</li>
      {/if}
    </ul>
  </div>

  <div class="group">
    <h3>Quick access after quiz</h3>
    <ul>
      {#each afterQuizArticles as a}
        <li><a href={a.href}>{a.title}</a></li>
      {/each}
      {#if afterQuizArticles.length === 0}
        <li class="muted">Complete the quiz to unlock targeted articles</li>
      {/if}
    </ul>
  </div>
</aside>

<style>
.icon-btn {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width: 88px;           /* keeps consistent button width */
  height:36px;
  padding: 0 0.6rem;
  border-radius:8px;
  border:1px solid var(--border);
  background: var(--card-bg);
  box-shadow: var(--shadow);
  text-decoration:none;
  font-size:0.95rem;
  color: var(--accent);
  font-weight:600;
  transition: filter .12s ease, transform .12s ease;
}

.icon-btn:hover,
.icon-btn:focus {
  filter: brightness(1.05);
  transform: translateY(-2px);
  outline: none;
}

/* keep spacing between the buttons */
.nav-icons { display:inline-flex; gap:0.5rem; margin-bottom:0.75rem; }

.side-panel { padding: 0.5rem; display:flex; flex-direction:column; gap:1rem; }
.card.section { background:var(--card-bg); border:1px solid var(--card-border); padding:0.75rem; border-radius:10px; }
.icon-btn{ display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:8px; border:1px solid var(--border); background:var(--card-bg); box-shadow:var(--shadow); text-decoration:none; font-size:1.1rem; color:var(--accent); }
.icon-btn:hover{filter:brightness(1.05)}
.nav-icons { display: inline-flex; gap: 0.5rem; margin-bottom: 0.75rem; }
.group h3 { margin: 0.5rem 0; font-size: 1rem; color: var(--accent); }
.group ul { margin: 0; padding-left: 1.1rem; }
.muted { color: var(--muted); }



.btn {
  background:var(--accent); color:#fff; border:none; padding:0.4rem 0.6rem; border-radius:8px; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:0.4rem;
}
.btn[disabled] { opacity:0.6; cursor:not-allowed; }
.badge { display:inline-block; font-size:0.8rem; padding:0.15rem 0.5rem; border-radius:999px; border:1px solid var(--border); background:#f1f8f7; color:var(--accent); }

/* recommended list */
.after-quiz ul { margin:0.4rem 0 0 1rem; padding:0; }
.after-quiz li { margin-bottom:0.25rem; }

/* small utility for screen-reader-only text */
.sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
</style>
