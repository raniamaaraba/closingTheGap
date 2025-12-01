<script>
  export let imageSrc = "";
  export let imageAlt = "Picture for article";
  export let shortDescription = "Short description";
  export let quizPrompt = "One line for quiz";
  export let articleHref = "#";
</script>

<article class="card section">
  <h2 id="article">Closing the Gap</h2>
  <p class="muted">shuffling verses</p>

  <div class="preview">
    <figure class="media">
      {#if imageSrc}
        <img src={imageSrc} alt={imageAlt} />
      {:else}
        <div class="placeholder">Picture for article</div>
      {/if}
    </figure>

    <div class="info">
      <p><strong>Short description:</strong> {shortDescription}</p>
      <p><strong>Quiz:</strong> {quizPrompt}</p>
      <p><a class="link" href={articleHref}>Link to full article →</a></p>
    </div>
  </div>
</article>

<style>
.preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  align-items: start;
}
.media {
  margin: 0;
  border-radius: 8px; overflow: hidden; border: 1px solid var(--border);
  background: #f6f7f9;
}
.media img { display: block; width: 100%; height: auto; }
.placeholder {
  display: grid; place-items: center;
  height: 220px; color: var(--muted);
}
.info .link { color: var(--accent); text-decoration: none; }
.info .link:hover { text-decoration: underline; }
</style>
