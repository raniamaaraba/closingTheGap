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
  color: var(--toffee-1);
}

/* Verse styling: no border, no background, no shadow — blends with parent card */
.verse {
  position: absolute;
  left: 0;
  right: 0;
  padding: 0.5rem 0.75rem;
  background: transparent;      /* remove white background */
  border: 0;                    /* remove dashed border */
  box-shadow: none;             /* remove any shadow */
  border-radius: 0;             /* remove inner rounding so it sits flush */
  line-height: 1.3;
  color: var(--toffee-1);
}

/* Optional: subtle separator line above the verse (unobtrusive) */
.verse::before {
  content: "";
  display: block;
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02));
  margin-bottom: 0.45rem;
  color: var(--toffee-1);
}

/* Keep transitions smooth and avoid layout jumps */
.verse, .verse-frame { -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
</style>
