<script>
  import { onMount, onDestroy } from "svelte";

  // Import your top-level pages
  import Home from "./Home.svelte";
  import Articles from "./articles.svelte";
  import Quiz from "./quiz.svelte";
  import Dictionary from "./directory.svelte";

  // simple route map
  const routes = {
    "/": Home,
    "/articles": Articles,
    "/quiz": Quiz,
    "/directory": Dictionary
  };

  // current route path
  let route = "/";

  function handlePop() {
    route = window.location.pathname || "/";
  }

  // optional: global click interception so plain anchors navigate client-side
  function onGlobalClick(e) {
    // only left-click, no modifier, and an <a> with same-origin href
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;

    const anchor = e.composedPath().find(n => n && n.tagName === "A");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("http") && new URL(href).origin !== location.origin) return;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

    // allow anchors with target="_blank"
    if (anchor.target && anchor.target !== "_self") return;

    // prevent full reload and navigate client-side
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  onMount(() => {
    window.addEventListener("popstate", handlePop);
    document.addEventListener("click", onGlobalClick);
  });

  onDestroy(() => {
    window.removeEventListener("popstate", handlePop);
    document.removeEventListener("click", onGlobalClick);
  });
</script>

<!-- render the matched component -->
<svelte:component this={routes[route] ?? NotFound} />

<style>
/* keep App-level styles minimal */
:global(body) { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
</style>