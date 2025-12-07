<script>
  import { onMount, createEventDispatcher } from "svelte";
  import HomeButton from "./homeButton.svelte";

  const dispatch = createEventDispatcher();

  const questions = [
    {
      id: "q1",
      title: "Which symptoms are you experiencing?",
      hint: "Pick which you feel is the strongest or would like to work on the most.",
      options: [
        { id: "q1a", label: "ADHD (Attention-deficit/hyperactivity Disorder)" },
        { id: "q1b", label: "OCD (Obsessive Compulsive Disorder)" },
        { id: "q1c", label: "Depression or Bipolar Disorder" },
        { id: "q1d", label: "Generalised Anxiety Disorder" },
        { id: "q1e", label: "Lust and Birth Control" }
      ]
    },
    {
      id: "q3",
      title: "What treatments are you currently using?",
      hint: "Select all that apply",
      options: [
        { id: "q3a", label: "Prescription medication" },
        { id: "q3b", label: "Over the counter supplements" },
        { id: "q3c", label: "Herbal remedies" },
        { id: "q3d", label: "None" },
        { id: "q3e", label: "All of the Above" }
      ]
    },
    {
      id: "q5",
      title: "What kind of support would you prefer?",
      hint: "Select all that apply",
      options: [
        { id: "q5a", label: "Quick herbal suggestions" },
        { id: "q5b", label: "Lifestyle tips" },
        { id: "q5c", label: "Links to articles" },
        { id: "q5d", label: "Spiritual encouragement" }
      ]
    }
  ];

  const tinctures = [
    { id: "ashwagandha", name: "Ashwagandha (tincture)", uses: ["Stress resilience", "Adaptogen support"] },
    { id: "bacopa", name: "Bacopa (tincture)", uses: ["Cognitive support", "Memory", "Attention"] },
    { id: "rhodiola", name: "Rhodiola (tincture)", uses: ["Mental stamina", "Fatigue", "Adaptogen for focus"] },
    { id: "chamomile", name: "Chamomile (tincture/balm)", uses: ["Anxiety", "Gentle calming", "Sleep support"] },
    { id: "valerian", name: "Valerian (tincture)", uses: ["Sleep support", "Sedative adjunct"] },
    { id: "saffron", name: "Saffron (extract/tincture)", uses: ["Mood support"] },
    { id: "milkthistle", name: "Milk thistle (tincture)", uses: ["Liver support", "Hormone metabolism"] },
    { id: "vitex", name: "Vitex (Chasteberry) tincture", uses: ["Cycle regularity", "Hormone balance"] },
    { id: "passionflower", name: "Passionflower (tincture)", uses: ["Acute anxiety", "Insomnia"] },
    { id: "milky-oats", name: "Milky oats (Avena) balm/tincture", uses: ["Nervine tonic", "Burnout"] }
  ];

  const articleTitles = {
    "birth-control-and-lust": "Birth Control and Sexual Desire",
    "adhd": "ADHD (Attention‑Deficit/Hyperactivity Disorder)",
    "ocd": "OCD (Obsessive‑Compulsive Disorder)",
    "depression": "Depression",
    "bipolar-disorder": "Bipolar Disorder",
    "anxiety": "Anxiety",
    "sleep-disturbances": "Sleep Disturbances",
    "chronic-pain": "Chronic Pain"
  };

  const profileMap = {
    adhd: { label: "Focus & Attention", tinctures: ["bacopa","rhodiola"], articles: ["adhd"] },
    ocd: { label: "Obsessive Patterns & Calm", tinctures: ["chamomile","passionflower"], articles: ["ocd"] },
    mood: { label: "Mood Support", tinctures: ["saffron","ashwagandha"], articles: ["depression"] },
    anxiety: { label: "Anxiety & Stress", tinctures: ["ashwagandha","chamomile","passionflower","milky-oats"], articles: ["anxiety"] },
    hormone: { label: "Hormone Support", tinctures: ["milkthistle","vitex"], articles: ["birth-control-and-lust"] }
  };

  let step = 0;
  let answers = {};
  let lastAction = "";
  let activeNav = null;

  function toggle(optionId) {
    // multi-select behavior preserved; clicking toggles selection
    if (answers[optionId]) delete answers[optionId];
    else answers[optionId] = true;
    answers = { ...answers };
  }

  function setLastAction(action) {
    lastAction = action;
    activeNav = action.toLowerCase();
    setTimeout(() => { activeNav = null; }, 300);
  }

  function prev() {
    if (step === 0) return;
    step -= 1;
    setLastAction("Prev");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    if (step >= questions.length) return;
    step += 1;
    setLastAction("Next");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit() {
    step = questions.length;
    setLastAction("Submit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeToHome() {
    setLastAction("Close");
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  $: progress = Math.round((step / questions.length) * 100);
  $: selectedOptionIds = Object.keys(answers);

  function mapAnswersToProfiles(selectedIds) {
    const set = new Set();
    selectedIds.forEach(id => {
      if (id === "q1a") set.add("adhd");
      if (id === "q1b") set.add("ocd");
      if (id === "q1c") set.add("mood");
      if (id === "q1d") set.add("anxiety");
      if (id === "q1e") set.add("hormone");
    });
    if (set.size === 0) set.add("anxiety");
    return Array.from(set);
  }

  $: profiles = mapAnswersToProfiles(selectedOptionIds);
  $: recs = profiles.map(p => {
    const map = profileMap[p];
    if (!map) return null;
    return {
      profile: p,
      label: map.label,
      tinctures: map.tinctures.map(id => tinctures.find(t => t.id === id)).filter(Boolean),
      articles: map.articles.map(aid => ({ id: aid, title: articleTitles[aid] })).filter(Boolean)
    };
  }).filter(Boolean);

</script>

<section class="quiz container" aria-labelledby="quiz-title">
  <header class="quiz-header card">
    <div class="header-row">
      <div>
        <h1 id="quiz-title">Diagnosis Quiz</h1>
        <p class="support">The Lord sees you and you are heard — thank you for taking this step toward better health.</p>
      </div>

      <div class="header-controls" style="display:flex; gap:0.5rem; align-items:center;">
        <HomeButton />
      </div>
    </div>

    <div class="progress" aria-hidden="true">
      <div class="progress-bar" style="width: {progress}%"></div>
    </div>
    <div class="progress-label">{step} / {questions.length}</div>
  </header>

  {#if step < questions.length}
    <form class="question-card card" on:submit|preventDefault={() => { step < questions.length - 1 ? next() : submit(); }}>
      <h2 id={questions[step].id} class="q-title">{questions[step].title}</h2>
      {#if questions[step].hint}
        <p class="hint">{questions[step].hint}</p>
      {/if}

      <!-- Options rendered as accessible buttons (no checkboxes) -->
      <ul class="options" role="list">
        {#each questions[step].options as opt}
          <li class="option" role="listitem">
            <div
              role="button"
              tabindex="0"
              class="option-button {answers[opt.id] ? 'selected' : ''}"
              aria-pressed={!!answers[opt.id]}
              on:click={() => toggle(opt.id)}
              on:keydown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(opt.id); } }}
            >
              <span class="label-text">{opt.label}</span>
            </div>
          </li>
        {/each}
      </ul>

      <div class="controls">
        <div class="nav-arrows">
          <button
            type="button"
            class="arrow prev {activeNav === 'prev' ? 'arrow-active' : ''}"
            on:click={prev}
            aria-label="Previous question"
            disabled={step === 0}
          >‹</button>

          {#if step < questions.length - 1}
            <button
              type="button"
              class="arrow next {activeNav === 'next' ? 'arrow-active' : ''}"
              on:click={next}
              aria-label="Next question"
            >›</button>
          {:else}
            <button
              type="button"
              class="arrow submit {activeNav === 'submit' ? 'arrow-active' : ''}"
              on:click={submit}
              aria-label="See results"
            >✓</button>
          {/if}
        </div>
      </div>
    </form>
  {:else}
    <section class="results card">
      <header>
        <h2>Results & Recommendations</h2>
        <p class="muted">Tailored tincture and article title suggestions based on your answers.</p>
      </header>

      {#if recs.length === 0}
        <p class="muted">No selections were made. Try answering a few questions to get personalized suggestions.</p>
      {:else}
        <div class="rec-grid">
          {#each recs as rec}
            <article class="rec-card">
              <h3 class="rec-title">{rec.label}</h3>

              <div class="rec-section">
                <strong>Tinctures & balms</strong>
                <ul>
                  {#each rec.tinctures as t}
                    <li>
                      <strong>{t.name}</strong>
                      <div class="small muted">{t.uses.join(", ")}</div>
                    </li>
                  {/each}
                </ul>
              </div>

              <div class="rec-section">
                <strong>Suggested reading (titles)</strong>
                <ul>
                  {#each rec.articles as a}
                    <li>{a.title}</li>
                  {/each}
                </ul>
              </div>

            </article>
          {/each}
        </div>
      {/if}

    </section>
  {/if}
</section>

<style>
  :root {
    --toffee-1: #6b3f2b;
    --toffee-2: #8f5a3b;
    --toffee-3: #b7865a;
    --cream-1: #fff7ef;
    --cream-2: #f3e6d8;
    --muted: #6b5a50;
    --card-border: rgba(107,63,43,0.08);
    --shadow: 0 8px 24px rgba(107,63,43,0.04);
    --title-font: "Lavishly Yours", cursive;
    --body-font: "Special Elite", monospace;
  }

  .container {
    max-width: 980px;
    margin: 0 auto;
    padding: 1rem;
    font-family: var(--body-font);
    color: var(--toffee-1);
  }

  .card {
    background: linear-gradient(180deg, var(--cream-2), #fff);
    border-radius: 12px;
    padding: 0.85rem;
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow);
    margin-bottom: 1rem;
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .quiz-header .support {
    margin: 0.25rem 0 0.5rem 0;
    color: var(--muted);
  }

  .quiz-header h1 {
    margin: 0;
    font-family: var(--title-font);
    font-size: 1.9rem;
    color: var(--toffee-1);
  }

  .progress {
    height: 8px;
    background: #f6f3f0;
    border-radius: 999px;
    overflow: hidden;
    margin-top: 0.5rem;
  }
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--toffee-2), var(--toffee-3));
    width: 0%;
    transition: width .25s ease;
  }
  .progress-label {
    font-size: 0.85rem;
    color: var(--muted);
    margin-top: 0.5rem;
  }

  .question-card { margin-top: 1rem; }
  .q-title {
    margin: 0 0 0.25rem 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--toffee-1);
  }
  .hint {
    margin: 0 0 0.75rem 0;
    color: var(--muted);
  }

  .options { list-style: none; padding: 0; margin: 0 0 1rem 0; display: grid; gap: 0.5rem; }
  .option-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.65rem;
    border-radius: 8px;
    transition: background .12s ease, border-color .12s ease, transform .06s ease;
    background: transparent;
    border: 1px solid transparent;
    user-select: none;
  }
  .option-button:hover { background: rgba(107,63,43,0.03); transform: translateY(-1px); }
  .option-button:focus { outline: 2px solid rgba(107,63,43,0.08); border-radius: 8px; }

  .option-button.selected {
    background: linear-gradient(180deg, rgba(143,90,59,0.08), rgba(183,134,90,0.06));
    border: 1px solid rgba(143,90,59,0.12);
  }

  .label-text { font-size: 1rem; color: var(--toffee-1); }

  .controls { display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-top: 0.5rem; }
  .nav-arrows { display:flex; gap:0.5rem; align-items:center; }

  .arrow {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: 1px solid var(--card-border);
    background: transparent;
    font-size: 1.4rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--toffee-1);
    transition: background .12s ease, transform .08s ease;
  }
  .arrow:hover { background: rgba(107,63,43,0.04); }
  .arrow[disabled] { opacity: 0.45; cursor: not-allowed; }

  .arrow-active {
    transform: translateY(1px);
    background: linear-gradient(90deg, rgba(143,90,59,0.12), rgba(183,134,90,0.08));
    color: var(--toffee-1);
    border-color: transparent;
  }

  .results { margin-top: 1rem; }
  .muted { color: var(--muted); }

  .rec-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  .rec-card {
    background: linear-gradient(180deg, #fff, var(--cream-1));
    border-radius: 10px;
    padding: 0.85rem;
    border: 1px solid var(--card-border);
    box-shadow: 0 8px 20px rgba(107,63,43,0.03);
  }
  .rec-title { margin: 0 0 0.5rem 0; color: var(--toffee-1); font-weight: 700; }

  .rec-section ul { margin: 0.4rem 0 0 1rem; padding: 0; }
  .small { font-size: 0.9rem; color: var(--muted); }

  /* FINAL BUTTONS USE BODY FONT */
  .btn {
    background: linear-gradient(180deg, var(--toffee-2), var(--toffee-3));
    color: #fff;
    border: none;
    padding: 0.45rem 0.7rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
    font-family: var(--body-font);
  }
  .btn.ghost {
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--toffee-1);
    font-family: var(--body-font);
  }
  .btn.secondary {
    background: transparent;
    color: var(--toffee-1);
    border: 1px solid var(--card-border);
    font-family: var(--body-font);
  }

  .results-actions { display:flex; gap:0.5rem; justify-content:flex-end; margin-top: 1rem; }

  @media (max-width: 720px) {
    .header-row { flex-direction: column; align-items: stretch; gap: 0.75rem; }
    .rec-grid { grid-template-columns: 1fr; }
  }
</style>
