<script>
  import { slide } from "svelte/transition";
  import { onDestroy } from "svelte";

  export let title = "Shuffling verses";
  export let verses = [];
  export let interval = 4500000;

  let i = 0;
  let timer;

  $: start();
  function start() {
    clearInterval(timer);
    if (verses.length > 1) {
      timer = setInterval(() => {
        i = (i + 1) % verses.length;
      }, interval);
    }
  }

  onDestroy(() => clearInterval(timer));
</script>

<section class="card section">
  <h2>{title}</h2>

  <div class="verse-frame">
    {#key i}
      <div class="verse" in:slide={{ x: 200 }} out:slide={{ x: -200 }}>
        {verses[i]}
      </div>
    {/key}
  </div>
</section>

<style>
.verse-frame {
  position: relative;
  min-height: 64px;
  overflow: hidden;
}
.verse {
  position: absolute;
  left: 0; right: 0;
  padding: 0.5rem 0.75rem;
  background: #f9fbff;
  border: 1px dashed var(--border);
  border-radius: 8px;
}
</style>
