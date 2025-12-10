<script>
  import { onMount, onDestroy } from "svelte";

  //pages import
  import Home from "./home.svelte";
  import Articles from "./articles.svelte";
  import Quiz from "./quiz.svelte";
  import Dictionary from "./directory.svelte";
  import Ailments from "./resources/ailments.svelte";
  import Verses from "./resources/versePage.svelte";
  import Resources from "./resources/resources.svelte";

  //routes
  const routes = {
    "/": Home,
    "/articles": Articles,
    "/quiz": Quiz,
    "/directory": Dictionary,
    "/resources/ailments": Ailments,
    "/resources/versePage": Verses,
    "/resources/resources" : Resources
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