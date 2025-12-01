<script>
  export let href = "/";
  export let label = "Home";
</script>

<a class="home-btn" href={href} aria-label={label} title={label}>
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9z" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.5"/>
  </svg>
</a>

<style>
.home-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px; height: 42px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--card);
  box-shadow: var(--shadow);
  color: var(--accent);
  text-decoration: none;
}
.home-btn:hover { filter: brightness(1.05); }
</style>
