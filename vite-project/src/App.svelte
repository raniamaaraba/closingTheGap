<script>
  import { onMount, onDestroy } from "svelte";

  //pages import
  import Home from "./Home.svelte";
  import Articles from "./articles.svelte";
  import Quiz from "./quiz.svelte";
  import Dictionary from "./directory.svelte";
  import Ailments from "./resources/ailments.svelte";
  import Verses from "./resources/verses.svelte";

  //routes
  const routes = {
    "/": Home,
    "/articles": Articles,
    "/quiz": Quiz,
    "/directory": Dictionary,
    "/resources/ailments": Ailments,
    "/resources/verses": Verses
  };

  //current route path
  let route = "/";

  function handlePop() {
    route = window.location.pathname || "/";
  }

  onMount(() => {
    window.addEventListener("popstate", handlePop);
    document.addEventListener("click");
  });

  onDestroy(() => {
    window.removeEventListener("popstate", handlePop);
    document.removeEventListener("click");
  });
</script>

<svelte:component this={routes[route]} />

<style>
:global(body) { margin: 0 }
</style>