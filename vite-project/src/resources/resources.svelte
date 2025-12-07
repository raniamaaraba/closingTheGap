<script>
  import Search from "../search.svelte";
  import HomeButton from "../homeButton.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  // SPA nav helper (same pattern used elsewhere)
  function nav(url, e) {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    e?.preventDefault();
    try {
      window.history.pushState({}, "", url);
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch {
      window.location.assign(url);
    }
  }

  // Search state
  let q = "";

  // Resources provided by you (web links + books + Bible)
  const resources = [
    {
      type: "article",
      title: "Gen Z and mental health (APA Monitor 2019)",
      href: "https://www.apa.org/monitor/2019/01/gen-z",
      short: "Overview of mental‑health trends and common illnesses in Gen Z."
    },
    {
      type: "article",
      title: "Antidepressant use in girls and women after the pandemic (APA Monitor 2024)",
      href: "https://www.apa.org/monitor/2024/07/antidepressant-use-girls-women-covid-pandemic",
      short: "Data and about antidepressant prescribing trends among women since COVID‑19."
    },
    {
      type: "article",
      title: "Managing adverse effects of antidepressants (Psychiatric Times)",
      href: "https://www.psychiatrictimes.com/view/managing-adverse-effects-antidepressants",
      short: "Recognising the critical side-effects of anti-depressants while using and while tapering."
    },
    {
      type: "book",
      title: "Herbs in Every Season — Bevin Cohen",
      href: "https://www.amazon.com/Herbs-Every-Season-Medicinal-Apothecary/dp/1643261967/ref=sr_1_1?dib=eyJ2IjoiMSJ9.65-uPkoQc8Q3C_FRgZOc9mHmLvDOZcJsDBKkfN4RHbk.0KYAMZPTcng_khZq4N1MTtj0LzNFLvQ6fq1lNvGZZVI&dib_tag=se&hvadid=598729310810&hvdev=c&hvexpln=0&hvlocphy=9193289&hvnetw=g&hvocijid=12064435408477427923--&hvqmt=e&hvrand=12064435408477427923&hvtargid=kwd-2418127233726&hydadcr=22594_13531167&keywords=bevin+cohen+herbs+in+every+season&mcid=cc277b0f434c35f985e37a88970320d6&qid=1765071959&sr=8-1",
      short: "Truly a must buy book to understand how to live your life to the fullest with herbs."
    },
    {
      type: "book",
      title: "Herbal Medicine for Modern Life — Ruth A. Blanding",
      href: "https://www.amazon.com/Herbal-Medicine-Modern-Life-Traditional/dp/0593689925/ref=sr_1_3?crid=22RGEI925J2C8&dib=eyJ2IjoiMSJ9.nFu-zBCOgAg6jVEipjKE544V9kK1l5cmWzUqMTrE3sVRQAQis7Dq3KAi7G1u7PQhvbmgYsfDZUHZowlLmvCae6jxFAYxFmGsE25Dfs496h6l4su5IXdM7MycSnVHWX8YVC8k_ekA8HP561fKYcgqFJHsWbSZXxuox0FNwwNeuVmdswLlhu9khRUhBsAwu1Pg6u5IoU7PPlgo7bcHY0RpsHABifhldmQEdC9fvFszc8Y.T7CZgCwoB5dLKoeATXwFEUa9teEbIWS_m3wf9Rb5ju0&dib_tag=se&keywords=herbs+for+the+everyday+life&qid=1765071922&sprefix=herbs+for+hte+everyday+life%2Caps%2C144&sr=8-3",
      short: "An additionally useful source on herbal medicines and their applications"
    },
    {
      type: "book",
      title: "Natural Health Bible — Steven Bratman, M.D. & David Kroll, Ph.D.",
      href: "https://www.amazon.com/Natural-Health-Bible-Information-Supplements/dp/0761520821/ref=sr_1_1?crid=1EYWABQZEKVNF&dib=eyJ2IjoiMSJ9.srehT64yFAIFnU-Q8hQUWRbKE5i9EdvbxlmB3-4jyuCFEuWqxOiYXfWdTELlB3dDK7b2O7UGxR0M3ioi-ZgG2KometxyEztxl-ks-lY_DT1f9-UmRH6d7g3vo0kNgRM36sC0OPBas5-Vn65feebMZsUnZk8y-NebQg1jQy_kpGF3fUyXetqKYjAhBlAJRVcliEySxAvu10iW5bi18snp0ughfJ3CeElC_aS0Pxok61k.n_e_uaW9gkoapQsDGTj6GXyHfb_xKdwBWFObT6IlFWM&dib_tag=se&keywords=natural+health+bible&qid=1765071870&sprefix=natural+health+bible%2Caps%2C162&sr=8-1",
      short: "A know all be all reference book on natural health and supplements."
    },
    {
      type: "book",
      title: "The Bible (King James Version)",
      href: "https://www.kingjamesbibleonline.org/",
      short: "The King James Version of the Bible which is project is based around."
    },
    {
      type: "article",
      title: "Is Your ADHD Treatment Making You Worse?",
      href: "https://www.amenclinics.com/is-your-adhd-treatment-making-you-worse/",
      short: "How ADHD is actually affecting your brain."
    },
    {
      type: "article",
      title:"Non-prescription interventions for attention deficity hyperactivity disorder",
      href:"https://caringforkids.cps.ca/handouts/behavior-and-development/non-prescription-interventions-for-attention-deficit-hyperactivity-disorder",
      short:"Alteratives for kids and adults with ADHD symptoms."
    },
    {
     type: "article",
     title: "Facts About ADHD Throughout the Years",
     href:"https://www.cdc.gov/adhd/data/adhd-throughout-the-years.html",
     short: "Reports from the CDC and NHIS how ADHD had doubled over the last two decades." 
    },
    {
      type: "article",
      title: " 14 Ways Birth Control Piills Rob Us of Our Health",
      href: "https://integrativehg.com/14-ways-birth-control-pills-rob-us-of-our-health/"
    }
  ];

  // Reactive filtered list
  $: filtered = resources.filter(r => {
    const ql = (q || "").trim().toLowerCase();
    if (!ql) return true;
    return (
      (r.title || "").toLowerCase().includes(ql) ||
      (r.short || "").toLowerCase().includes(ql) ||
      (r.type || "").toLowerCase().includes(ql)
    );
  });

  // Optional: expose a "back" event for parent if needed
  function back() { dispatch("backToHome"); }

    // small helper to create a slug (used for internal routing if desired)
  function slugify(text = "") {
    return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
  }
</script>

<section class="resources-page container">
  <header class="resources-header">
    <div class="title-block">
      <h1 class="site-title">Resources</h1>
      <div class="subtitle">Curated articles, books, and scripture</div>
    </div>

    <div class="controls">
      <Search placeholder="Search resources..." on:search={(e) => q = e.detail?.q ?? ""} compact={true} />
      <HomeButton />
    </div>
  </header>

  <div class="card section" style="margin-top:1rem;">
    <div class="res-grid" role="list">
      {#each filtered as r}
        <article class="res-card" role="listitem" tabindex="0" aria-label={r.title}>
          <div class="res-body">
            <h2 class="res-title">{r.title}</h2>
            <p class="res-desc">{r.short}</p>

            <div class="res-meta">
              <span class="res-type">{r.type === "book" ? "Book" : "Article"}</span>

              {#if r.href}
                <a class="res-link" href={r.href} target="_blank" rel="noopener noreferrer">Open</a>
              {:else}
                <button class="res-link" on:click={() => nav("/resources/" + slugify(r.title))}>View</button>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>

    {#if filtered.length === 0}
      <p class="muted">No resources match your search.</p>
    {/if}
  </div>
</section>


<style>
  :root{
    --title-font: "Lavishly Yours", cursive;
    --body-font: "Special Elite", "Courier New", monospace;

    --toffee-1: #6b3f2b;
    --toffee-2: #8f5a3b;
    --cream-1:  #fff7ef;
    --cream-2:  #f3e6d8;
    --muted:    #6b5a50;
    --accent:   #c77a3a;
    --card-border: rgba(107,63,43,0.08);
    --radius: 12px;
    --shadow: 0 6px 18px rgba(107,63,43,0.08);
  }

  .resources-page { font-family: var(--body-font); color: var(--toffee-1); padding: 1rem 0; }

  .resources-header {
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:1rem;
  }

  .title-block .site-title {
    margin: 0;
    font-family: var(--title-font);
    font-size: 2.2rem;
    color: var(--toffee-1);
  }
  .subtitle { color:var(--muted); font-size:0.95rem; }

  .controls { display:flex; gap:0.5rem; align-items:center; }

  .card.section { padding:0.75rem; box-sizing: border-box; }

  .res-grid {
    display:grid;
    gap: 0.9rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    margin-top: 1rem;
  }

  .res-card {
    background: linear-gradient(180deg, var(--cream-2), #fff);
    border-radius: var(--radius);
    padding: 0.9rem;
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow);
    display:flex;
    align-items:flex-start;
    transition: transform 160ms ease, box-shadow 160ms ease;
  }
  .res-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(107,63,43,0.12); }

  .res-body { flex:1; min-width:0; }
  .res-title { margin:0 0 0.25rem 0; font-family: var(--body-font); font-size:1.05rem; color:var(--toffee-1); }
  .res-desc { margin:0; color:var(--muted); font-size:0.95rem; }

  .res-meta { margin-top:0.6rem; display:flex; gap:0.6rem; align-items:center; }
  .res-type { font-size:0.85rem; color:var(--toffee-2); font-weight:700; }
  .res-link {
    margin-left:auto;
    background: linear-gradient(180deg, var(--toffee-2), var(--accent));
    color:#fff;
    padding:0.35rem 0.6rem;
    border-radius:8px;
    border:none;
    cursor:pointer;
    font-weight:600;
    text-decoration:none;
  }
  .res-link:hover { opacity:0.95; }

  .muted { color:var(--muted); margin-top:0.75rem; }

  @media (max-width: 900px) {
    .title-block .site-title { font-size:1.6rem; }
    .res-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 640px) {
    .res-grid { grid-template-columns: 1fr; }
  }
</style>
