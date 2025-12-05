<script>
  export let imageSrc = "/assets/anxietyThumb.jpeg";
  export let imageAlt = "Picture for article";
  export let shortDescription = "Short description";
  export let quizPrompt = "One line for quiz";
  export let articleHref = "#";
  let imgError = false;
  function handleImgError() {
    imgError = true;
  }

</script>

<article class="card section" aria-labelledby="article-title">
  <h2 id="article-title">Closing the Gap</h2>
  <p class="muted">shuffling verses</p>

  <div class="preview">
    <figure class="media" aria-hidden={imgError ? "true" : "false"}>
      <!-- hard-set image (no conditional) -->
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        on:error={handleImgError}
        width="640"
        height="360"
        decoding="async"
      />
      <figcaption class="sr-only">{imageAlt}</figcaption>
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