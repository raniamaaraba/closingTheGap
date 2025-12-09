<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let herb = {
    name: "",
    image: "",
    short: "",
    uses: "",
    effects: "",
    allergens: ""
  };

  function open() {
    dispatch("open", herb);
  }
</script>

<article class="herb-card" on:click={open} role="button" tabindex="0" aria-label={`Open ${herb.name}`}>
  <figure class="herb-media">
    {#if herb.image}
      <img src={herb.image} alt={herb.name} />
    {:else}
      <div class="placeholder">image</div>
    {/if}
  </figure>

  <div class="herb-body">
    <h3 class="herb-name">{herb.name}</h3>
    {#if herb.short}
      <p class="herb-short">{herb.short}</p>
    {/if}

    <div class="meta">
      {#if herb.uses}<div class="meta-row"><strong>Uses</strong><span>{herb.uses}</span></div>{/if}
      {#if herb.effects}<div class="meta-row"><strong>Effects</strong><span>{herb.effects}</span></div>{/if}
      {#if herb.allergens}<div class="meta-row"><strong>Allergens</strong><span>{herb.allergens}</span></div>{/if}
    </div>
  </div>
</article>

<style>
.herb-card {
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  transition: transform .12s ease, box-shadow .12s ease;
  will-change: transform; 
  -webkit-backface-visibility: hidden;
}

.herb-card:hover,
.herb-card:focus-within,
.herb-card:focus {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  outline: none;
}

.herb-media,
.herb-media img,
.herb-media .placeholder {
  display: block;
  margin: 0;
  box-sizing: border-box;
  line-height: 0;
}

.herb-media {
  width: 100%;
  aspect-ratio: 4 / 3; 
  overflow: hidden;
  background: var(--muted-bg);
  flex-shrink: 0;
}

.herb-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  vertical-align: middle;
  image-rendering: auto;
  loading: lazy;
  decode: async;
}

.placeholder {
  display:flex;
  align-items:center;
  justify-content:center;
  height:100%;
  color:var(--muted);
  padding:0.5rem;
}

.herb-body {
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}
.herb-name { margin: 0; font-size: 1rem; line-height: 1.1; }
.herb-short { margin: 0; color: var(--muted); font-size: 0.85rem; }

.meta { margin-top: auto; display: flex; flex-direction: column; gap: 0.25rem; }
.meta-row { display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.82rem; color: var(--muted); }
.meta-row strong { width: 64px; font-weight: 600; color: var(--muted); font-size: 0.78rem; }
.meta-row span { color: var(--text); font-size: 0.82rem; }
</style>
