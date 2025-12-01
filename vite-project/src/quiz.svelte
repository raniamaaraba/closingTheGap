<script>
  import { onMount } from "svelte";

  const questions = [
    {
      id: "q1",
      title: "Which symptoms are you experiencing?",
      hint: "Pich which you feel is the strongs or would like to work on the most.",
      options: [
        { id: "q1a", label: "ADHD (Attention-deficit/hyperactivity Disorder)" },
        { id: "q1b", label: "OCD (Obsessive Compulsvie Disorder)" },
        { id: "q1c", label: "Depression or Bipolar Disorder" },
        { id: "q1d", label: "Generalised Anxiety Disorder" },
        { id: "q1e", label: "Lust and Birth Controll"}
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
        { id: "q3e", label: "All of the Above"}
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

  const recommendations = {
    q1a: ["article:focus-basics"],
    q1b: ["article:ocd-overview"],
    q1c: ["article:depression-care"],
    q1d: ["article:anxiety-relief"],
    q2a: ["Try gentle lifestyle changes; monitor progress."],
    q2b: ["Consider a consult with a clinician; combine lifestyle and remedies."],
    q2c: ["Seek professional care; use supportive remedies under guidance."],
    q3a: ["Be mindful of interactions; consult before adding herbs."],
    q3b: ["Track supplements and discuss with your provider."],
    q3c: ["We have tincture guides and safety notes."],
    q3d: ["Natural options and lifestyle changes may help."],
    q4a: ["Sleep hygiene checklist; herbal sleep aids."],
    q4b: ["Dietary tips for mood and focus."],
    q4c: ["Exercise routines that support mental health."],
    q4d: ["Breathing, journaling, and routine practices."],
    q5a: ["See our quick tincture recipes and safety notes."],
    q5b: ["Short habit plans and trackers."],
    q5c: ["Curated articles based on your answers."],
    q5d: ["Encouraging verses and spiritual resources."]
  };

  let step = 0;
  let answers = {};
  let lastAction = "";          // shows which button was clicked
  let activeNav = null;         // "prev" | "next" | "submit" | "close" for visual active state

  onMount(() => {
    // nothing special for now
  });

  function toggle(optionId) {
    if (answers[optionId]) delete answers[optionId];
    else answers[optionId] = true;
    answers = { ...answers };
  }

  function setLastAction(action) {
    lastAction = action;
    activeNav = action.toLowerCase();
    // clear active state after a short delay so user sees the press
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
    // navigate to homepage and notify SPA router
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  $: progress = Math.round((step / questions.length) * 100);
  $: selectedOptionIds = Object.keys(answers);
  $: resultItems = Array.from(new Set(selectedOptionIds.flatMap(id => recommendations[id] ?? [])));
</script>

<section class="quiz container" aria-labelledby="quiz-title">
  <header class="quiz-header">
    <div class="header-row">
      <h1 id="quiz-title">Diagnosis Quiz</h1>
      <div class="header-actions">
        <button class="btn close-btn" on:click={closeToHome} aria-label="Close and return home">
          ✕ Close
        </button>
      </div>
    </div>

    <p class="support">The Lord sees you and you are Heard — thank you for taking this step toward better health.</p>

    <div class="progress" aria-hidden="true">
      <div class="progress-bar" style="width: {progress}%"></div>
    </div>
    <div class="progress-label">{step} / {questions.length}</div>
  </header>

  {#if step < questions.length}
    <form class="question-card" on:submit|preventDefault={() => { step < questions.length - 1 ? next() : submit(); }}>
      <h2 id={questions[step].id} class="q-title">{questions[step].title}</h2>
      {#if questions[step].hint}
        <p class="hint">{questions[step].hint}</p>
      {/if}

      <ul class="options" role="list">
        {#each questions[step].options as opt}
          <li class="option" role="listitem">
            <label class="checkbox" tabindex="0" on:keydown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(opt.id); } }}>
                <input
                    type="checkbox"
                    bind:checked={answers[opt.id]}
                    on:change={() => toggle(opt.id)}
                    aria-checked={!!answers[opt.id]}
                />
                <span class="box" aria-hidden="true">
                    <!-- SVG check appears when .checked class is applied via CSS selector -->
                    <svg class="check" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M20.3 6.3a1 1 0 0 0-1.6-1.2L9 14.8 5.3 11.1A1 1 0 0 0 3.7 12.7l4 4a1 1 0 0 0 1.4 0l11.2-10.4z" fill="currentColor"/>
                    </svg>
                </span>
                <span class="label-text">{opt.label}</span>
            </label>
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
        <h2>Results</h2>
        <p class="support">You did great. Below are tailored suggestions based on your answers.</p>
      </header>

      {#if resultItems.length === 0}
        <p class="muted">No selections were made. Try answering a few questions to get personalized suggestions.</p>
      {:else}
        <ul class="results-list">
          {#each resultItems as item}
            <li class="result-item">{item}</li>
          {/each}
        </ul>
      {/if}

      <div class="results-actions">
        <button class="btn" on:click={() => { step = 0; answers = {}; lastAction = ""; }}>Retake Quiz</button>
        <button class="btn secondary" on:click={closeToHome}>Close</button>
      </div>
    </section>
  {/if}
</section>

<style>
  :global(:root) {
    --card-bg: var(--card-bg, #fff);
    --accent: var(--accent, #2f6f6b);
    --muted: var(--muted, #6b7280);
    --primary: var(--primary, #8B5E3C);
  }

  .quiz { padding: 1rem; max-width: 820px; margin: 0 auto; }
  .header-row { display:flex; justify-content:space-between; align-items:center; gap:1rem; }
  .quiz-header h1 { margin: 0 0 0.25rem 0; font-family: var(--title-font); font-size: 2rem; color: var(--primary); }
  .header-actions { display:flex; gap:0.5rem; align-items:center; }
  .close-btn { background:transparent; border:1px solid var(--card-border, #e5e7eb); padding:0.35rem 0.6rem; border-radius:8px; cursor:pointer; color:var(--muted); }

  .support { margin: 0 0 0.5rem 0; color: var(--muted); }
  .progress { height: 8px; background: #f1f1f1; border-radius: 999px; overflow: hidden; margin-bottom: 0.5rem; }
  .progress-bar { height: 100%; background: linear-gradient(90deg, var(--accent), var(--primary)); width: 0%; transition: width .25s ease; }
  .progress-label { font-size: 0.85rem; color: var(--muted); margin-bottom: 0.75rem; }

  .question-card { background: var(--card-bg); border: 1px solid var(--card-border, #e5e7eb); padding: 1rem; border-radius: 12px; box-shadow: var(--shadow); }
  .q-title { margin: 0 0 0.25rem 0; font-size: 1.25rem; }
  .hint { margin: 0 0 0.75rem 0; color: var(--muted); font-size: 0.95rem; }

  .options { list-style: none; padding: 0; margin: 0 0 1rem 0; display: grid; gap: 0.5rem; }
  .checkbox { display:flex; align-items:center; gap:0.75rem; cursor:pointer; padding:0.5rem; border-radius:8px; transition: background .12s ease; }
.checkbox input { position:absolute; opacity:0; width:0; height:0; pointer-events:none; }

/* visible box */
.box {
  width:22px;
  height:22px;
  border-radius:6px;
  border:1px solid var(--card-border, #e5e7eb);
  background: #fff;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition: background .18s ease, border-color .18s ease, transform .12s ease;
  flex: 0 0 22px;
}

/* hidden by default; will be shown when input is checked */
.check {
  width:14px;
  height:14px;
  color: white;
  opacity: 0;
  transform: scale(0.6) rotate(-10deg);
  transition: opacity .18s ease, transform .18s cubic-bezier(.2,.9,.2,1);
}

/* when the input is checked, style the box and reveal the check */
.checkbox input:checked + .box {
  background: linear-gradient(180deg, var(--accent), var(--primary));
  border-color: transparent;
  transform: translateY(-1px);
}
.checkbox input:checked + .box .check {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

/* subtle hover/focus states */
.checkbox:hover { background: rgba(0,0,0,0.02); }
.checkbox:focus-within { outline: 2px solid rgba(47,111,107,0.12); border-radius:8px; }

/* label text */
.label-text { font-size: 1rem; color: var(--ink, #1f2937); }

  .controls { display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-top: 0.5rem; }
  .nav-arrows { display:flex; gap:0.5rem; align-items:center; }
  .arrow { width:44px; height:44px; border-radius:10px; border:1px solid var(--card-border, #e5e7eb); background:transparent; font-size:1.4rem; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; color:var(--primary); }
  .arrow[disabled] { opacity:0.45; cursor:not-allowed; }
  .arrow-active { transform: translateY(1px); box-shadow: inset 0 2px 6px rgba(0,0,0,0.06); background: linear-gradient(90deg, var(--accent), var(--primary)); color:#fff; border-color: transparent; }

  .last-action { text-align:right; }
  .pill { display:inline-block; padding:0.25rem 0.5rem; border-radius:999px; background:#f3f7f6; color:var(--muted); font-size:0.9rem; border:1px solid rgba(0,0,0,0.04); }
  .pill strong { color:var(--primary); margin-left:0.35rem; }

  .results { padding: 1rem; border-radius: 12px; }
  .results-list { list-style: none; padding: 0; margin: 0.5rem 0 1rem 0; display:flex; flex-direction:column; gap:0.5rem; }
  .result-item { padding: 0.6rem; border-radius: 8px; background: #fff; border: 1px solid var(--card-border, #e5e7eb); }

  .results-actions { display:flex; gap:0.5rem; justify-content:flex-end; margin-top: 0.75rem; }
  .btn { background: var(--accent); color: #fff; border: none; padding: 0.5rem 0.9rem; border-radius: 8px; cursor: pointer; }
  .btn.secondary { background: transparent; color: var(--accent); border: 1px solid var(--card-border, #e5e7eb); }

  @media (max-width: 700px) {
    .quiz { padding: 0.75rem; }
    .q-title { font-size: 1.1rem; }
    .arrow { width:40px; height:40px; }
  }
</style>
