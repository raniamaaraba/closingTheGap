<!-- src/lib/components/Search.svelte -->
<script>
  import { createEventDispatcher } from "svelte";
  export let placeholder = "Search...";
  export let showLetters = false;
  export let letters = [];
  export let buttonLabel = "Search";
  export let compact = false; // smaller styling for header

  const dispatch = createEventDispatcher();
  let q = "";

  function submit(e) {
    e?.preventDefault();
    dispatch("search", { q: q.trim() });
  }

  function pickLetter(letter) {
    q = "";
    dispatch("filter", { letter });
  }

  // expose a small clear helper (optional)
  function clear() {
    q = "";
    dispatch("search", { q: "" });
  }
</script>

<form class="search" on:submit|preventDefault={submit} aria-label="Search form">
  <input
    class:compact
    type="search"
    bind:value={q}
    placeholder={placeholder}
    aria-label={placeholder}
  />
  <button type="submit" class="btn">{buttonLabel}</button>
  <button type="button" class="btn secondary" on:click={clear} aria-label="Clear search">Clear</button>
</form>

{#if showLetters}
  <div class="letters" role="toolbar" aria-label="Alphabet filter">
    {#each letters as L}
      <button class="tab" on:click={() => pickLetter(L)} aria-pressed="false">{L}</button>
    {/each}
    <button class="tab" on:click={() => pickLetter("")}>All</button>
  </div>
{/if}

<style>
:root {
    --title-font: "Lavishly Yours", cursive;
    --body-font: "Special Elite", "Courier New", monospace;
    --card-bg: var(--card-bg, #fff);
    --border: var(--card-border, rgba(0,0,0,0.06));
    --button-bg: var(--accent, #c77a3a);
    --button-text: #fff;
    --ink: var(--ink, #1f2937);
    --accent: var(--accent, #c77a3a);
  }

  /* Search container uses the Special Elite body font for a typewriter feel */
  .search {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-family: var(--body-font);
  }

  .search input {
    flex: 1;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.5rem 0.6rem;
    background: var(--card-bg);
    max-width: 420px;
    color: var(--ink);
    font-family: var(--body-font);
    font-size: 0.98rem;
    outline: none;
    transition: box-shadow .12s ease, border-color .12s ease;
  }

  .search input:focus {
    box-shadow: 0 6px 18px rgba(107,63,43,0.06);
    border-color: rgba(107,63,43,0.12);
  }

  .search input.compact {
    padding: 0.35rem 0.45rem;
    max-width: 260px;
  }

  /* Buttons follow the Toffee Fudge tokens and use Special Elite for labels */
  .btn {
    border: none;
    background: var(--button-bg);
    color: var(--button-text);
    border-radius: 8px;
    padding: 0.45rem 0.6rem;
    cursor: pointer;
    font-family: var(--body-font);
    font-weight: 600;
    box-shadow: 0 6px 12px rgba(199,122,58,0.12);
  }

  .btn.secondary {
    background: transparent;
    color: var(--accent);
    border: 1px solid var(--border);
    box-shadow: none;
    font-family: var(--body-font);
    font-weight: 600;
  }

  /* Letter chips and tabs use the body font; tabs get a decorative header font option */
  .letters {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
    font-family: var(--body-font);
  }

  .tab {
    border: 1px solid var(--border);
    background: var(--card-bg);
    color: var(--ink);
    border-radius: 999px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-family: var(--body-font);
    font-size: 0.92rem;
    transition: transform .08s ease, background .12s ease;
  }

  /* If you want some tabs to feel more decorative, add .tab.decorative to use the header font */
  .tab.decorative {
    font-family: var(--title-font);
    letter-spacing: 0.6px;
  }

  .tab:hover {
    filter: brightness(0.98);
    transform: translateY(-1px);
  }

  /* Small responsive tweak */
  @media (max-width: 640px) {
    .search { gap: 0.4rem; }
    .search input { max-width: 100%; font-size: 0.95rem; }
    .btn { padding: 0.35rem 0.5rem; }
  }
</style>
