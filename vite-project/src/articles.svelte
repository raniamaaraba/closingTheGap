<script>
  import { onMount } from "svelte";
  import Search from "./search.svelte";
  import { fade } from "svelte/transition";
  import HomeButton from "./homeButton.svelte";


  // Sample articles — replace with your real data or fetch
  // Expanded article data with herbs and tincture recommendations
let articles = [
    //majority of content was created with Copilot just for scope purposes
  {
    id: "birth-control-and-lust",
    title: "Birth Control and Sexual Desire",
    subtitle: "How contraceptives can affect libido and what to consider",
    excerpt: "An overview of common contraceptives, possible effects on desire, safe natural supports, lifestyle steps, and spiritual encouragement.",
    currentMedicine: {
      notes: "Common hormonal contraceptives include combined oral contraceptives (estrogen + progestin), progestin-only pills, implants, and hormonal IUDs. Some users report changes in libido, energy, or mood depending on formulation and individual sensitivity. It is important to talk with your physician to either get off of birth control or IUDs. Cold Turkey can cause life-threatning side effects."
    },
    naturalRemedies: {
      notes: "People sometimes try nutritional supports, adaptogens, or topical approaches to support energy and libido. Below are herbs commonly discussed and a gentle tincture approach to consider after checking safety.",
      herbs: [
        {
          name: "Maca (Lepidium meyenii)",
          benefits: "Traditionally used to support energy and libido; often taken as a root powder or extract.",
          preparation: "Powdered root in smoothies or capsules; some use tinctures made from the dried root.",
          safety: "Generally well tolerated; discuss with a clinician if pregnant, breastfeeding, or taking hormone therapies."
        },
        {
          name: "Damiana (Turnera diffusa)",
          benefits: "Used historically as a mild tonic for sexual function and mood.",
          preparation: "Often prepared as a tea or tincture.",
          safety: "Avoid heavy use with certain medications; check interactions and avoid if pregnant."
        },
        {
          name: "Ashwagandha (Withania somnifera)",
          benefits: "Adaptogen that may support stress resilience and energy.",
          preparation: "Root powder, capsules, or tincture.",
          safety: "May interact with sedatives or thyroid medications; consult a clinician."
        }
      ],
      tincture: {
        title: "Gentle Libido Support Tincture (example)",
        description: "A simple herbal tincture approach combining a mild adaptogen and a supportive tonic herb. This is an example preparation; follow safe herb sourcing and consult a clinician before use.",
        method: [
          "Choose high-quality dried herbs (e.g., maca root and damiana) from a reputable supplier.",
          "Place herbs in a clean jar and cover with a neutral alcohol (or glycerin for alcohol-free preparations) so the herbs are fully submerged.",
          "Seal and store in a cool, dark place for several weeks, shaking daily to help extraction.",
          "Strain the liquid through a fine mesh or cheesecloth into a clean bottle and label with contents and date.",
          "Start with a small amount and observe effects; follow product label guidance or consult a clinician for personalized advice."
        ],
        safety: "Do not combine with prescription hormones or other medications without checking interactions. If pregnant, breastfeeding, or under medical care, consult a clinician before using herbal tinctures."
      }
    },
    lifestyle: {
      notes: "Prioritize sleep, reduce alcohol and nicotine, manage stress, schedule intentional couple time, and communicate openly with partners. Small experiments (short exercise routines, improved diet, mindfulness practice) can reveal what helps individual libido."
    },
    verses: {
      text: "Growing up as a Christian or not we have all heard Matthew 5:27-30 'You shall not commit adultery,' which is one of the Ten Commandmants God commands us to abide by. This is a common illness that plagues our current generation and world. The world is full of lust and awards those whom are lustful. In 2 Timothy 2:22 it reads 'So flee youthful passions and pursue righteousness, faith, love, and peace, alond with those who call on the Lord from a pure heart.' In this verse, the Lord commands us to drop our ways, lust is always a never ending battle with or without a partner, but remmeber God will always be there to forgive you. He understands, and is waiting--willing to work with you to just take that next step forward to redemption.' "
    },
    sidePoints: [
      "Modern medicines: types of contraceptives and typical side effects on mood/desire",
      "Natural remedies: safety, interactions, and tincture/supplement notes",
      "Lifestyle: sleep, stress, relationship communication",
      "Spiritual care: encouragement and resources"
    ]
  },

  {
    id: "adhd",
    title: "ADHD (Attention‑Deficit/Hyperactivity Disorder)",
    subtitle: "Medication, herbal supports, routines, and encouragement",
    excerpt: "Overview of common medications, evidence for supplements, practical habit changes, and spiritual encouragement.",
    currentMedicine: {
      notes: "First‑line medications often include stimulants (methylphenidate, amphetamines) and non‑stimulants (atomoxetine, guanfacine). These can improve attention and reduce impulsivity. Monitoring for side effects (sleep, appetite, mood) and regular follow‑up are important."
    },
    naturalRemedies: {
      notes: "Some people explore omega‑3s, ginkgo, or adaptogens. Below are herbs commonly discussed and a sample tincture approach for supportive use.",
      herbs: [
        {
          name: "Omega‑3 (fish oil)",
          benefits: "Not an herb but commonly used; supports brain health and attention in some studies.",
          preparation: "High-quality supplements; follow label guidance.",
          safety: "Check with clinician if on blood thinners."
        },
        {
          name: "Ginkgo (Ginkgo biloba)",
          benefits: "Sometimes used to support cognitive function and circulation.",
          preparation: "Standardized extracts or tinctures.",
          safety: "May interact with blood thinners; consult a clinician."
        },
        {
          name: "Rhodiola (Rhodiola rosea)",
          benefits: "Adaptogen used for mental stamina and stress resilience.",
          preparation: "Tincture or capsule.",
          safety: "Use cautiously with stimulants and check interactions."
        }
      ],
      tincture: {
        title: "Supportive Focus Tincture (example)",
        description: "A mild adaptogen-forward tincture for occasional support of focus and resilience.",
        method: [
          "Select dried rhodiola and ginkgo (or a single herb if preferred).",
          "Cover herbs with alcohol or glycerin in a jar, seal, and steep for several weeks.",
          "Strain and bottle; label clearly.",
          "Use cautiously and consult a clinician if taking prescription stimulants."
        ],
        safety: "Always check for interactions with prescription ADHD medications and follow clinician guidance."
      }
    },
    lifestyle: {
      notes: "Structure and environment matter: use planners, timers, task‑breaking, consistent sleep, and regular aerobic exercise. Small habit changes (5–10 minute focused work blocks, decluttered workspace) often yield measurable improvements."
    },
    verses: {
      text: "Be patient with progress; small, steady steps add up. You are not defined by a diagnosis."
    },
    sidePoints: [
      "Medication options and monitoring",
      "Evidence and safety of supplements",
      "Practical habit and environment changes",
      "Support resources and spiritual encouragement"
    ]
  },

  {
    id: "ocd",
    title: "OCD (Obsessive‑Compulsive Disorder)",
    subtitle: "Therapy, medication, supportive herbs, and daily routines",
    excerpt: "Why therapy (ERP) matters, medication options, safe herbal supports for anxiety, and practical daily strategies.",
    currentMedicine: {
      notes: "SSRIs at higher therapeutic doses are commonly used; some cases use antipsychotic augmentation. Medication is most effective when combined with evidence‑based therapy such as exposure and response prevention (ERP)."
    },
    naturalRemedies: {
      notes: "Herbs that reduce general anxiety may ease distress but are not a substitute for therapy. Below are calming herbs and a gentle tincture approach.",
      herbs: [
        {
          name: "Chamomile (Matricaria recutita)",
          benefits: "Calming herb used for mild anxiety and sleep support.",
          preparation: "Tea or tincture.",
          safety: "Generally well tolerated; avoid if allergic to related plants."
        },
        {
          name: "Lavender (Lavandula angustifolia)",
          benefits: "Used for calming and mild anxiety relief; also used topically in aromatherapy.",
          preparation: "Infusions, tinctures, or essential oil (topical/aromatherapy).",
          safety: "Avoid ingesting essential oil; check for skin sensitivity."
        }
      ],
      tincture: {
        title: "Calming Tincture (example)",
        description: "A simple calming blend using chamomile and lavender for occasional anxiety relief.",
        method: [
          "Combine dried chamomile flowers and dried lavender in a jar.",
          "Cover with alcohol or glycerin, seal, and steep for several weeks.",
          "Strain and bottle; label with contents and date.",
          "Use as a short-term supportive measure and continue therapy as recommended."
        ],
        safety: "Not a replacement for therapy or prescribed medication; consult a clinician if symptoms are severe."
      }
    },
    lifestyle: {
      notes: "Consistent practice of ERP techniques, sleep hygiene, stress reduction, and structured schedules support long‑term progress. Small daily wins and tracking exposures help maintain momentum."
    },
    verses: {
      text: "Courage grows in small steps. Celebrate progress and seek steady support."
    },
    sidePoints: [
      "Therapy (ERP) + medication synergy",
      "Herbal supports for anxiety, not a replacement for therapy",
      "Daily routines and relapse prevention"
    ]
  },

  {
    id: "depression",
    title: "Depression",
    subtitle: "Medication options, herbal cautions, lifestyle supports, and hope",
    excerpt: "Common antidepressant classes, herbal interactions to watch for, lifestyle interventions with evidence, and spiritual encouragement.",
    currentMedicine: {
      notes: "Antidepressants (SSRIs, SNRIs, atypicals) are commonly used. Choice depends on symptoms and side‑effect profile. Early treatment requires monitoring for mood changes and suicidal ideation—seek immediate help if thoughts of self‑harm occur."
    },
    naturalRemedies: {
      notes: "Some people try St. John's wort, SAMe, or omega‑3s. Below are herbs commonly discussed and a cautious tincture approach.",
      herbs: [
        {
          name: "St. John's wort (Hypericum perforatum)",
          benefits: "Used for mild-to-moderate depression in some studies.",
          preparation: "Standardized extracts; tinctures are also used.",
          safety: "Many drug interactions (including with antidepressants); do not use without clinician oversight."
        },
        {
          name: "Lavender",
          benefits: "May help with anxiety and sleep, which can support mood.",
          preparation: "Tea, tincture, or aromatherapy.",
          safety: "See safety notes above."
        }
      ],
      tincture: {
        title: "Mood Support Tincture (example)",
        description: "A cautious approach focusing on supportive herbs and avoiding strong antidepressant herbs without clinical oversight.",
        method: [
          "Select mild supportive herbs (e.g., lavender) rather than potent antidepressant herbs unless under clinician guidance.",
          "Prepare as a standard tincture: herbs covered with alcohol or glycerin, steeped for several weeks, then strained and bottled.",
          "Label clearly and use under guidance if taking prescription antidepressants."
        ],
        safety: "St. John's wort and similar herbs have significant interactions—do not self-prescribe if you are on prescription medications."
      }
    },
    lifestyle: {
      notes: "Behavioral activation, regular exercise, sleep regulation, social connection, and small daily goals are evidence‑based supports. Even short, consistent activity can improve mood over weeks."
    },
    verses: {
      text: "You are not alone; rest, reach out, and take one small step today."
    },
    sidePoints: [
      "Medication choices and safety monitoring",
      "Herbal interactions and cautions",
      "Lifestyle interventions and crisis resources"
    ]
  },

  {
    id: "bipolar-disorder",
    title: "Bipolar Disorder",
    subtitle: "Specialist care, mood stability, and safe supports",
    excerpt: "Why specialist diagnosis and mood stabilizers matter, cautious use of supplements, and routine strategies to preserve stability.",
    currentMedicine: {
      notes: "Mood stabilizers (lithium, valproate), certain antipsychotics, and carefully managed antidepressant use (if any) are typical. Bipolar disorder requires specialist management to avoid triggering mania."
    },
    naturalRemedies: {
      notes: "Omega‑3s have some supportive evidence; many herbs that affect mood are not recommended. Below are conservative options and a note on tincture caution.",
      herbs: [
        {
          name: "Omega‑3 (fish oil)",
          benefits: "Supportive evidence for mood stability as an adjunct.",
          preparation: "High-quality supplements.",
          safety: "Discuss with your psychiatrist before starting."
        }
      ],
      tincture: {
        title: "Caution: Tincture Use in Bipolar",
        description: "Because some herbs can destabilize mood, tinctures should be used only under psychiatric guidance. This section is informational rather than a recommendation to self-treat.",
        method: [
          "Avoid potent mood-altering herbs without specialist oversight.",
          "If using supportive tinctures, inform your treating clinician and monitor mood closely."
        ],
        safety: "Do not start herbal antidepressants without psychiatric oversight."
      }
    },
    lifestyle: {
      notes: "Consistent sleep/wake times, routine, stress management, early warning sign monitoring, and a crisis plan with clinician contact are essential for stability."
    },
    verses: {
      text: "Stability is built with routine and community; seek wise counsel and keep a plan."
    },
    sidePoints: [
      "Specialist‑led medication plans",
      "Caution with herbs that affect mood",
      "Routine and relapse prevention"
    ]
  },

  {
    id: "anxiety",
    title: "Anxiety",
    subtitle: "Medication, calming herbs, practical techniques, and peace",
    excerpt: "Common medication options, herbal choices with evidence, self‑help techniques, and spiritual reminders for calm.",
    currentMedicine: {
      notes: "SSRIs and SNRIs are common long‑term options; short‑term benzodiazepines may be used cautiously. Discuss dependence risks and alternatives with your prescriber."
    },
    naturalRemedies: {
      notes: "Lavender, passionflower, and chamomile are commonly used for mild anxiety. Below are herb entries and a calming tincture example.",
      herbs: [
        {
          name: "Chamomile",
          benefits: "Calming and sleep-supportive.",
          preparation: "Tea or tincture.",
          safety: "Generally well tolerated; avoid if allergic to related plants."
        },
        {
          name: "Passionflower (Passiflora incarnata)",
          benefits: "Used for anxiety and sleep support.",
          preparation: "Tincture or infusion.",
          safety: "Use cautiously with sedatives; check interactions."
        },
        {
          name: "Lavender",
          benefits: "Calming and supportive for mild anxiety.",
          preparation: "Tea, tincture, or aromatherapy.",
          safety: "See notes above."
        }
      ],
      tincture: {
        title: "Calming Tincture (example)",
        description: "A gentle blend for occasional anxiety relief using chamomile and passionflower.",
        method: [
          "Combine dried chamomile and passionflower in a jar and cover with alcohol or glycerin.",
          "Seal and steep for several weeks, shaking daily.",
          "Strain and bottle; label with contents and date.",
          "Use as a short-term supportive measure and consult a clinician if symptoms persist."
        ],
        safety: "Not a replacement for therapy or prescribed medication; check interactions with other medicines."
      }
    },
    lifestyle: {
      notes: "Breathing exercises, progressive muscle relaxation, CBT techniques, regular exercise, and sleep hygiene are effective. Short daily practices can reduce acute anxiety over time."
    },
    verses: {
      text: "Breathe, be present, and remember you are cared for. Small practices bring calm."
    },
    sidePoints: [
      "Medication options and short‑term vs long‑term strategies",
      "Herbal options and interaction checks",
      "Self‑help techniques and professional therapy"
    ]
  },

  {
    id: "sleep-disturbances",
    title: "Sleep Disturbances",
    subtitle: "Medicines, herbal sleep aids, and practical sleep hygiene",
    excerpt: "Overview of common sleep aids, herbal options, and stepwise sleep hygiene to restore rest.",
    currentMedicine: {
      notes: "Short‑term prescription sleep aids and melatonin are sometimes used. Discuss duration and next steps with a clinician to avoid dependence."
    },
    naturalRemedies: {
      notes: "Valerian, chamomile, and passionflower are commonly used for sleep support. Below is a sleep tincture example.",
      herbs: [
        {
          name: "Valerian (Valeriana officinalis)",
          benefits: "Used for sleep support in some people.",
          preparation: "Tincture or tea.",
          safety: "May cause morning grogginess in some users; avoid heavy machinery until you know how it affects you."
        },
        {
          name: "Chamomile",
          benefits: "Gentle calming herb supportive of sleep.",
          preparation: "Tea or tincture.",
          safety: "Generally well tolerated."
        }
      ],
      tincture: {
        title: "Sleep Support Tincture (example)",
        description: "A gentle sleep-support blend using valerian and chamomile prepared as a tincture.",
        method: [
          "Combine dried valerian root and chamomile flowers in a jar and cover with alcohol or glycerin.",
          "Steep for several weeks, strain, and bottle.",
          "Use cautiously and consult a clinician if taking other sedating medications."
        ],
        safety: "Avoid combining with sedatives without clinician guidance."
      }
    },
    lifestyle: {
      notes: "Consistent bedtime, limiting screens before bed, reducing caffeine, and a calming pre‑sleep routine are first‑line behavioral steps."
    },
    verses: {
      text: "Rest is part of care; small evening rituals help the body and mind prepare for sleep."
    },
    sidePoints: [
      "Short‑term vs long‑term medication strategies",
      "Herbal sleep aids and safety",
      "Behavioral sleep hygiene"
    ]
  },

  {
    id: "chronic-pain",
    title: "Chronic Pain",
    subtitle: "Medication, topical and herbal supports, movement, and coping",
    excerpt: "Medication classes, topical herbal supports, pacing and movement strategies, and spiritual coping resources.",
    currentMedicine: {
      notes: "Analgesics, adjuvant medications, and topical agents are commonly used. Work with a clinician for a tailored plan."
    },
    naturalRemedies: {
      notes: "Topical herbal preparations (e.g., arnica in approved formulations) and anti‑inflammatory dietary supports are sometimes used. Below is a topical tincture/infusion approach.",
      herbs: [
        {
          name: "Arnica (Arnica montana) — topical only",
          benefits: "Used topically for bruising and mild inflammation.",
          preparation: "Topical preparations only; do not ingest arnica unless in approved formulations.",
          safety: "Do not apply to broken skin; avoid internal use unless under professional guidance."
        },
        {
          name: "Turmeric (Curcuma longa)",
          benefits: "Anti‑inflammatory dietary support.",
          preparation: "Dietary use, extracts, or topical preparations.",
          safety: "Check interactions with blood thinners."
        }
      ],
      tincture: {
        title: "Topical Infusion (example)",
        description: "A topical herbal infusion or oil using anti‑inflammatory herbs for external use.",
        method: [
          "Infuse dried arnica or turmeric in a carrier oil using gentle heat or a long cold infusion.",
          "Strain and use externally as a rub; label clearly and keep for topical use only."
        ],
        safety: "Topical only for certain herbs (e.g., arnica); avoid ingestion and check for skin sensitivity."
      }
    },
    lifestyle: {
      notes: "Pacing, graded movement, physical therapy, sleep, and stress management are central. Small, consistent movement and pacing plans reduce flare‑ups over time."
    },
    verses: {
      text: "Strength for the day and patience for the journey—seek community and steady care."
    },
    sidePoints: [
      "Medication and specialist referral when needed",
      "Topical and herbal supports with safety notes",
      "Movement, pacing, and coping strategies"
    ]
  } 
    ];


  // Search
  let query = "";
  $: filtered = articles.filter(a => {
    const q = query.trim().toLowerCase();
    return !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
  });

  // expanded state per article id (multiple allowed)
  let expanded = new Set();

  function toggleExpand(id, e) {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    e?.preventDefault();
    if (expanded.has(id)) expanded.delete(id);
    else expanded.add(id);
    expanded = new Set(expanded);
    setTimeout(() => document.getElementById(`card-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  }

  function closeExpand(id) {
    if (expanded.has(id)) {
      expanded.delete(id);
      expanded = new Set(expanded);
    }
  }

  function handleSearch(e) {
    query = (e.detail?.q ?? "").trim();
  }

  // keyboard: Esc closes all expanded cards
  function onKeydown(e) {
    if (e.key === "Escape" && expanded.size) {
      expanded = new Set();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  });
</script>

<section class="articles-page container" aria-labelledby="articles-title">
  <header class="articles-header">
    <h1 id="articles-title">Articles</h1>
    <div class="search-row">
      <Search on:search={handleSearch} placeholder="Search articles..." compact={false} />
      <HomeButton />
    </div>
  </header>

  <main class="stacked-list" aria-live="polite">
    {#if filtered.length === 0}
      <div class="empty card section">
        <p class="muted">No articles match your search.</p>
      </div>
    {:else}
      {#each filtered as a}
        <article id={"card-" + a.id} class="big-card card" aria-expanded={expanded.has(a.id)}>
          <!-- clickable header toggles details -->
          <button class="header-toggle" on:click={(e) => toggleExpand(a.id, e)} aria-expanded={expanded.has(a.id)}>
            <div class="title-row">
              <h2 class="big-title">{a.title}</h2>
              <div class="meta-actions">
                {#if expanded.has(a.id)}
                  <button class="close" on:click|stopPropagation={() => closeExpand(a.id)} aria-label="Close details">Close</button>
                {/if}
              </div>
            </div>
            {#if a.subtitle}
              <p class="subtitle">{a.subtitle}</p>
            {/if}
          </button>

          <div class="big-body">
            <p class="big-excerpt">{a.excerpt}</p>

            {#if expanded.has(a.id)}
              <div class="expanded" transition:fade>
                <!-- Current Medicine (own line) -->
                <section class="section full-line">
                  <h3>Current Medicine</h3>
                  <p>{a.currentMedicine?.notes}</p>
                </section>

                <!-- Natural Remedies: images under the title replaced with herb list + tincture -->
<section class="section full-line">
  <h3>Natural Remedies</h3>

  <!-- short intro note -->
  <p class="muted">{a.naturalRemedies?.notes}</p>

                <!-- herbs list -->
                {#if a.naturalRemedies?.herbs && a.naturalRemedies.herbs.length}
                    <ul class="herb-list">
                    {#each a.naturalRemedies.herbs as herb}
                        <li class="herb-card">
                        <div class="herb-header">
                            <strong class="herb-name">{herb.name}</strong>
                        </div>
                        <div class="herb-body">
                            <p class="herb-benefit"><strong>Benefits:</strong> {herb.benefits}</p>
                            <p class="herb-prep"><strong>How it's used:</strong> {herb.preparation}</p>
                            <p class="herb-safety"><strong>Safety:</strong> {herb.safety}</p>
                        </div>
                        </li>
                    {/each}
                    </ul>
                {:else}
                    <div class="muted">No herb recommendations available for this article.</div>
                {/if}

                <!-- tincture recommendation -->
                {#if a.naturalRemedies?.tincture}
                    <div class="tincture-box">
                    <h4 class="tincture-title">{a.naturalRemedies.tincture.title}</h4>
                    <p class="muted">{a.naturalRemedies.tincture.description}</p>

                    <ol class="tincture-steps">
                        {#each a.naturalRemedies.tincture.method as step}
                        <li>{step}</li>
                        {/each}
                    </ol>

                    </div>
                {/if}
                </section>

                <!-- Lifestyle Modifications (own line) -->
                <section class="section full-line">
                  <h3>Lifestyle Modifications</h3>
                  <p>{a.lifestyle?.notes}</p>
                </section>

                <!-- Verses: image under the title (own line) -->
                <section class="section full-line">
                  <h3>Biblical Perspective</h3>

                  <!-- text first -->
                  <div class="text-row">
                    <p>{a.verses?.text}</p>
                  </div>

                  <!-- image under the title/text -->
                  <div class="images-row">
                    {#if a.verses?.image}
                      <figure><img src={a.verses.image} alt="Verses related image" loading="lazy" /></figure>
                    {:else}
                      <div class="image-placeholder">No image</div>
                    {/if}
                  </div>
                </section>
              </div>
            {/if}
          </div>

          <footer class="card-footer">
            <button class="btn" on:click={(e) => toggleExpand(a.id, e)}>{expanded.has(a.id) ? "Hide details" : "View details"}</button>
          </footer>
        </article>
      {/each}
    {/if}
  </main>
</section>

<style>
  :root {
    --title-font: "Lavishly Yours", cursive;
    --body-font: "Special Elite", "Courier New", monospace;

    /* Toffee Fudge palette */
    --toffee-1: #6b3f2b;
    --toffee-2: #8f5a3b;
    --toffee-3: #b7865a;
    --cream-1:  #fff7ef;
    --cream-2:  #f3e6d8;
    --muted:    #6b5a50;
    --accent:   #c77a3a;
    --card-border: rgba(107,63,43,0.08);
    --radius: 12px;
    --shadow: 0 8px 22px rgba(107,63,43,0.08);

    /* additional tokens used by the page layout CSS */
    --card-bg: linear-gradient(180deg, var(--cream-2), #fff);
    --primary: var(--toffee-1);
    --ink: #2b2b2b;
  }

  /* Page layout (merged) */
  .articles-page { padding: 1rem 0; }
  .articles-header { display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-bottom:1rem; }
  .articles-header h1 { margin:0; font-family:var(--title-font); font-size:2.6rem; }
  .search-row { display:flex; gap:0.5rem; align-items:center; }

  /* Toffee base */
  .articles {
    background: linear-gradient(180deg, var(--cream-1), #fffaf3);
    color: var(--toffee-1);
    padding: 1.25rem 0;
    min-height: 100%;
    font-family: var(--body-font);
  }

  /* stacked large cards */
  .stacked-list { display:flex; flex-direction:column; gap:1rem; }
  .big-card {
    padding:1.25rem;
    border-radius:14px;
    background:var(--card-bg);
    border:1px solid var(--card-border);
    box-shadow: var(--shadow);
    overflow:visible;
    font-family: var(--body-font);
  }
  .header-toggle {
    display:block;
    width:100%;
    text-align:left;
    background:transparent;
    border:none;
    padding:0;
    cursor:pointer;
  }
  .big-header { margin-bottom:0.5rem; }
  .title-row { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; }
  .big-title { margin:0; font-size:1.8rem; font-family:var(--title-font); color:var(--primary); }
  .subtitle { margin:0.25rem 0 0 0; color:var(--muted);font-family: var(--body-font); }

  /* excerpt and actions */
  .big-body { margin-top:0.75rem; display:flex; flex-direction:column; gap:0.75rem; }
  .big-excerpt { margin:0; color:var(--muted); font-size:1.05rem; line-height:1.5; }
  .meta-actions { display:flex; gap:0.5rem; align-items:center; }

  /* expanded detail: each section its own line */
  .expanded { margin-top:0.75rem; display:flex; flex-direction:column; gap:1rem; }

  /* full-line sections */
  .full-line { width:100%; }

  /* images under title layout */
  .images-row { display:flex; gap:0.75rem; margin:0.5rem 0 0.75rem 0; flex-wrap:wrap; }
  .images-row figure { margin:0; width:100%; }
  .images-row img { width:100%; height:auto; border-radius:8px; display:block; object-fit:cover; }

  /* text row */
  .text-row { margin-top:0.25rem; }

  /* regular single-line sections */
  .section { padding:0.75rem; border-radius:10px; background:var(--card-bg); border:1px solid var(--card-border); }
  .section h3 { margin:0 0 0.5rem 0; color:var(--accent); }

  /* sidebar */
  .side-points { padding:0.75rem; border-radius:10px; background:#fff7d6; border:1px solid rgba(0,0,0,0.06); }
  .side-points h4 { margin:0 0 0.5rem 0; color:var(--primary); }

  /* footer */
  .card-footer { margin-top:0.75rem; display:flex; justify-content:flex-end; gap:0.5rem; }
  .btn { display:inline-flex; align-items:center; gap:0.5rem; padding:0.4rem 0.6rem; border-radius:8px; background:var(--accent); color:#fff; border:none; cursor:pointer; text-decoration:none; font-family: var(--body-font); }
  .close { background:transparent; border:1px solid var(--card-border); padding:0.25rem 0.5rem; border-radius:6px; cursor:pointer; color:var(--primary); }

  .herb-list { list-style:none; padding:0; margin:0.5rem 0 0 0; display:flex; flex-direction:column; gap:0.75rem; }
  .herb-card { padding:0.75rem; border-radius:10px; background: #fff; border:1px solid var(--card-border); box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
  .herb-header { display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.5rem; }
  .herb-name { font-size:1.05rem; color:var(--primary); }
  .herb-body p { margin:0.25rem 0; color:var(--muted); font-size:0.95rem; }

  .tincture-box { margin-top:0.75rem; padding:0.75rem; border-radius:10px; background: linear-gradient(180deg, #fffefb, #fffdf8); border:1px solid rgba(0,0,0,0.04); }
  .tincture-title { margin:0 0 0.25rem 0; color:var(--accent); font-weight:700; }
  .tincture-steps { margin:0.5rem 0; padding-left:1.1rem; color:var(--ink); }
  .tincture-steps li { margin-bottom:0.4rem; }
  .tincture-safety { margin-top:0.5rem; color:#7a1f1f; font-weight:600; }

  /* Article list cards (merged with Toffee styles) */
  .article-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }

  .article-card {
    display:flex;
    gap: 0.75rem;
    align-items:flex-start;
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 0.9rem;
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow);
    transition: transform 160ms ease, box-shadow 160ms ease;
  }
  .article-card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(107,63,43,0.12); }

  .card-thumb {
    width:64px;
    height:64px;
    border-radius:10px;
    background: linear-gradient(135deg, var(--toffee-3), var(--toffee-2));
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    font-family: var(--title-font);
    font-weight:700;
    flex-shrink:0;
  }

  .card-body { min-width:0; flex:1; }
  .card-title {
    margin:0 0 0.25rem 0;
    font-family: var(--title-font);
    color: var(--toffee-1);
    font-size: 1.05rem;
  }
  .card-excerpt {
    margin:0;
    color: var(--muted);
    font-family: var(--body-font);
    font-size: 0.92rem;
  }
  .card-link {
    display:inline-block;
    margin-top:0.5rem;
    color: var(--toffee-2);
    text-decoration:none;
    font-weight:600;
    font-family: var(--body-font);
  }
  .card-link:hover { color: var(--accent); text-decoration: underline; }

  /* Detail view */
  .article-detail {
    background: var(--card-bg);
    border-radius: var(--radius);
    padding: 1rem;
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow);
  }
  .article-title {
    font-family: var(--title-font);
    margin: 0 0 0.5rem 0;
    color: var(--toffee-1);
  }
  .article-excerpt { margin: 0 0 1rem 0; color: var(--muted); font-family: var(--body-font); }
  .article-body { color: var(--toffee-1); font-family: var(--body-font); line-height: 1.5; }

  .not-found {
    padding: 1rem;
    color: var(--muted);
    background: linear-gradient(180deg, rgba(183,134,90,0.04), rgba(183,134,90,0.02));
    border-radius: var(--radius);
  }

  /* small responsive tweak */
  @media (max-width: 900px) {
    .herb-card { padding:0.6rem; }
    .tincture-box { padding:0.6rem; }
  }

  /* responsive: images remain full width on small screens */
  @media (max-width: 900px) {
    .big-title { font-size:1.4rem; }
    .image-placeholder { height:140px; }
    .article-list { grid-template-columns: 1fr; }
    .card-thumb { width:56px; height:56px; }
  }

  .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
</style>