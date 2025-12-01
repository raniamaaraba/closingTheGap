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
.search {
  display:flex;
  gap:0.5rem;
  align-items:center;
}
.search input {
  flex:1;
  border:1px solid var(--border);
  border-radius:8px;
  padding:0.5rem 0.6rem;
  background:var(--card-bg);
  max-width:420px;
}
.search input.compact { padding:0.35rem 0.45rem; max-width:260px; }
.btn {
  border:none; background:var(--button-bg); color:var(--button-text);
  border-radius:8px; padding:0.45rem 0.6rem; cursor:pointer;
}
.btn.secondary {
  background:transparent; color:var(--accent); border:1px solid var(--border);
}
.letters {
  margin-top:0.5rem;
  display:flex;
  gap:0.25rem;
  flex-wrap:wrap;
}
.tab {
  border:1px solid var(--border); background:var(--card-bg);
  color:var(--ink); border-radius:999px; padding:0.25rem 0.5rem; cursor:pointer;
}
.tab:hover { filter:brightness(0.98); }
</style>
