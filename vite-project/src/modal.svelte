<script>
  import { createEventDispatcher } from "svelte";
  export let herb = null;
  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }
</script>

{#if herb}
  <div class="modal-backdrop" role="dialog" aria-modal="true" aria-label={herb.name}>
    <div class="modal card">
      <header style="display:flex; justify-content:space-between; align-items:center;">
        <h2>{herb.name}</h2>
        <button aria-label="Close" on:click={close}>✕</button>
      </header>

      <div style="display:grid; grid-template-columns: 160px 1fr; gap:1rem; margin-top:0.5rem;">
        <div>
          {#if herb.image}
            <img src={herb.image} alt={herb.name} style="width:100%; height:auto; border-radius:8px;" />
          {/if}
        </div>
        <div>
          <p><strong>Short</strong>: {herb.short}</p>
          <p><strong>Uses</strong>: {herb.uses.join(", ")}</p>
          <p><strong>Effects</strong>: {herb.effects.join(", ")}</p>
          <p><strong>Possible allergens</strong>: {herb.allergens.join(", ")}</p>
        </div>
      </div>

      <footer style="margin-top:1rem; text-align:right;">
        <button class="btn" on:click={close}>Close</button>
      </footer>
    </div>
  </div>
{/if}

<style>
.modal-backdrop{
  position:fixed; inset:0; display:grid; place-items:center; background:rgba(0,0,0,0.35); z-index:60;
}
.modal{ width: min(880px, 96%); padding:1rem; border-radius:12px; }
.modal header button{ background:transparent; border:none; font-size:1.1rem; cursor:pointer; }
</style>
