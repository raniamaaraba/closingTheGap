<script>
  import HomeButton from "./homeButton.svelte";
  import { onMount, tick } from "svelte";

  import adhd from "./assets/adhd.png";
  import birthcontrol from "./assets/birthcontrol.png";
  import anxiety from "./assets/anxiety.png";
  import depression from "./assets/depression.png";
  import bipolar from "./assets/bipolar.png";
  import ocd from "./assets/ocd.png";
  import insomnia from "./assets/insomnia.png";
  import chronicPain from "./assets/chronic-pain.png";
  import lust from "./assets/lust.png";

  // Full article data (structured; paragraphs are arrays where appropriate)
    const articles = [
  {
    id: "birth-control-and-lust",
    title: "Birth Control and Sexual Desire",
    excerpt: "Wanna fix that acne? Take Birth Control! But oh actually Birth Controls ruin your body and menstrual cycle.",
    currentMedicine: {
      body: [
        "Fun Fact! You are supposed to menstrate every cycle--Rejoice God made you that way for a reason! But nowadays, doctors are prescribing birth control pills, IUDS, and other hormonal blocks with no concern for you Bibical Calling as well as your overal health as a woman. 83% of Women in the United States that are on some form of birth control contain progestins that are made from Male hormones. Let that sink in for a second--Male hormoes for you Female body. Yeah, that makes sense. ",
        "Birth Control Pills have been known to lower libido, cause weight gain, mood swings, and even long term infertility in some cases. The hormones in birth control pills are synthetic versions of your natural hormones--estrogen and progesterone. By taking these synthetic hormones, your body stops producing its own natural hormones, which can lead to a decrease in sexual desire and other side effects. Additionally, birth control pills can affect the levels of testosterone in the body, which is also important for sexual health. Women have four main hormones that regulate their entire lives--Estrogen, Progesterone, Testosterone, and Cortisol. Men, on the other hand, only have estrogen and testosterone that go through the same cycle each day. Taking birth control pills can disrupt this delicate balance, changing every fundamental of your body--how your brain processes information, changes your behaviours, and destory your menstrual cycle even after you stop taking the pills.",
        "Now, not only is birth control messsing with your entire body and future life, but what does God have to say about this? In Exodus, we are introduced to God's 10 Commandments, with the 7th being 'Thou shall not commit adultery.' You might wonder how this effects the Lord's view on birth control. 63% of Women who are capable of childbirth are on a birth contraseptive just as a means for Lust rather than the possible phoney use of other conditons. Thou shall not commit adultery is a direct command from God, and by using birth control as a means for lust, you are directly disobeying God's commandment. In 1 Corinthians 6:19-20 it reads 'Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies.' By using birth control as a means for lust, you are dishonoring God with your body, which is a temple of the Holy Spirit. It is important to remember that our bodies are not our own, and we should strive to honor God in all that we do, including how we treat our bodies. It is important to note this is also from ages 15-49, in which 83% of 15-24 year olds are using these contraseptives just for the purpose of lust.",
      ]
      },
    naturalRemedies: {
      notes: "The greatest way to get your body back on track after being on birth control is to improve your lifestyle and take addtional supplements",
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
    ],
    image: birthcontrol,
  },

  {
    id: "adhd",
    title: "ADHD (Attention‑Deficit/Hyperactivity Disorder)",
    subtitle: "Medication, herbal supports, routines, and encouragement",
    excerpt: "Think twice next time your physician persribes Adderall--how is this affecting your body?",
    currentMedicine: {
      body: [
        "7 million children are reported from ages 3-17 to have ADHD in the United States--yet most parents without thinking twice sign their kids up for Adderall, Dexedrine, or other like drugs. The very same drugs that college kids often use and abuse the system as a gateway drug. But, what is it actually doing to your and your children's body?",
        "The National Health Interview Survey (NHISH) has reported double the amount of cases of ADHD in the last two decades. With ADHD steadily on the rise, it is imperative to understand how these drugs are damaging your body. After just one year of use of Ritalin, the brain shows a 24% increase of dopamine being transmitted. As many know with the current raging Cell Phone addiciotn largely fueled by TikTok, Instagram Reels, and other such short scolling algorithms, dopamine is the key to getting you addicited. The more dopamine your brain recieves without completing a task to release dopamine, the quicker it comes for addicition and self-doubts to trickle in. Instead of taking a medication to help control the transporters of dopamine to control your ADHD, it actually amplifies it.    "
      ],
    },
    naturalRemedies: {
      notes: "Consider herbal supports and different types of therapy to negate the sideeffects of ADHD. Chriopathic and vision therapy are two great physical alternatives. It is important to ensure you are getting enough sleep, limiting screen time, exercising, and eating a regular healthy diet alongside supplements",
      herbs: [
        {
          name: "Omega‑3s (fish oil)",
          benefits: "Great for brain health and cognitive function for ADHD symptom support--also a great way to get your fatty acids.",
          preparation: "High-quality supplements; follow label guidance.",
          safety: "Check with clinician if on blood thinners."
        },
        {
          name: "Ginkgo (Ginkgo biloba)",
          benefits: "Improves the circulation of blood to the brain, enhancing cognitive function and focus.",
          preparation: "Standardized extracts or tinctures.",
          safety: "May interact with blood thinners; consult a clinician."
        },
        {
          name: "Rhodiola (Rhodiola rosea)",
          benefits: "An adaptogen that may help with mental fatigue and focus.",
          preparation: "Tincture or capsule.",
          safety: "Use cautiously with stimulants and check interactions."
        }
      ],
      tincture: {
        title: "Supportive Focus Tincture (ADHD Tinktures)",
        description: "A mild adaptogen-forward tincture for occasional support of focus and resilience.",
        method: [
          "Select dried rhodiola and ginkgo (or a single herb if preferred).",
          "Cover herbs with alcohol or glycerin in a jar, seal, and steep for several weeks.",
          "Strain and bottle; label clearly.",
          "Use cautiously and consult a clinician if taking prescription stimulants."
        ],
        safety: "Always check for interactions with prescription ADHD medications."
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
    ],
    image: adhd
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
    ],
    image: ocd
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
    ],
    image: depression
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
    ],
    image: bipolar
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
    ],
    image: anxiety
  },

  {
    id: "insomnia",
    title: "Insomnia",
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
    ],
    image: insomnia
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
    ],
    image: chronicPain
    } 
    ];

  // UI state
  let q = "";
  let selected = null;
  let lastFocused = null;

  $: filtered = articles.filter(a => {
    const s = (q || "").trim().toLowerCase();
    if (!s) return true;
    return (a.title + " " + (a.subtitle || "") + " " + (a.excerpt || "") + " " + (a.sidePoints || []).join(" ")).toLowerCase().includes(s);
  });

  // Normalize different shapes into an array of paragraph strings
  function paragraphs(field) {
    if (!field) return [];
    if (Array.isArray(field)) return field.map(String).map(s => s.trim()).filter(Boolean);
    if (typeof field === "object" && field !== null) {
      if (Array.isArray(field.body)) return field.body.map(String).map(s => s.trim()).filter(Boolean);
      if (typeof field.body === "string") return field.body.split(/\n{1,2}/).map(s => s.trim()).filter(Boolean);
      if (typeof field.notes === "string") return field.notes.split(/\n{1,2}/).map(s => s.trim()).filter(Boolean);
      // fallback: collect string values
      const vals = Object.values(field).filter(v => typeof v === "string");
      if (vals.length) return vals.join("\n\n").split(/\n{1,2}/).map(s => s.trim()).filter(Boolean);
      return [];
    }
    if (typeof field === "string") return field.split(/\n{1,2}/).map(s => s.trim()).filter(Boolean);
    return [];
  }

  async function openArticle(id) {
    lastFocused = document.activeElement;
    selected = articles.find(a => a.id === id) || null;
    await tick();
    const closeBtn = document.querySelector(".detail-close");
    closeBtn?.focus?.();
    // then move focus into the article body region (programmatic focus)
    const bodyEl = document.querySelector(".detail-body");
    bodyEl?.focus?.();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    try { history.pushState({ articleOpen: id }, "", `#${id}`); } catch {}
  }

  function closeDetail() {
    selected = null;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    lastFocused?.focus?.();
    try { if (location.hash) history.back(); } catch {}
  }

  onMount(() => {
    // debug logs to help diagnose "not showing" issues
    console.log("articles count:", articles.length);
    console.log("initial filtered:", filtered);
    const onKey = (e) => { if (e.key === "Escape" && selected) closeDetail(); };
    const onPop = () => { if (selected && !location.hash) closeDetail(); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    if (location.hash) {
      const id = location.hash.replace("#", "");
      if (articles.some(a => a.id === id)) openArticle(id);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  });
</script>

<section class="articles-page container" aria-labelledby="articles-title">
  <header class="page-header card">
    <div class="header-left">
      <h1 id="articles-title">Articles</h1>
      <p class="lead">Practical writing on herbs, mental health, and spiritual encouragement — tap any card to read the full article.</p>
    </div>

    <div class="header-right">
      <input class="search" placeholder="Filter titles or excerpts..." bind:value={q} aria-label="Search articles" />
      <HomeButton />
    </div>
  </header>

  <main class="content">
    <section class="grid" aria-label="Article grid">
      {#each filtered as a (a.id)}
        <article
          class="card post"
          role="button"
          tabindex="0"
          on:click={() => openArticle(a.id)}
          on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openArticle(a.id); } }}
          aria-describedby={"excerpt-" + a.id}
        >
          <!-- big image on top (show full image, no crop) -->
          <div class="post-media-top">
            {#if a.image}
              <img src={a.image} alt={a.imageAlt || a.title} class="thumb-top" loading="lazy" />
            {:else}
              <div class="media-placeholder-top" title={a.imageAlt}>
                <span class="media-initial">{a.title.split(" ").slice(0,2).map(w => w[0]).join("")}</span>
              </div>
            {/if}
          </div>

          <div class="post-body">
            <h3 class="post-title">{a.title}</h3>
            {#if a.subtitle}<div class="post-sub">{a.subtitle}</div>{/if}
            <p id={"excerpt-" + a.id} class="post-excerpt">{a.excerpt}</p>
          </div>
        </article>
      {/each}
    </section>

    {#if selected}
      <div class="overlay" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <article class="detail card article-detail">
          <header class="detail-header">
            <div>
              <h2 id="detail-title">{selected.title}</h2>
              {#if selected.subtitle}<div class="detail-sub">{selected.subtitle}</div>{/if}
            </div>
            <div class="detail-controls">
              <button class="detail-close" on:click={closeDetail} aria-label="Close article">✕</button>
            </div>
          </header>

          <!-- make the whole content (image + sections) scrollable -->
          <section
            class="detail-body"
            role="region"
            aria-labelledby="detail-title"
            tabindex="-1"
          >
            {#if selected.image}
              <div class="detail-image-wrap">
                <img src={selected.image} alt={selected.imageAlt || selected.title} class="detail-image" />
              </div>
            {/if}

            {#if selected.currentMedicine}
              <section class="detail-section">
                <h4>Current medicine</h4>
                {#each paragraphs(selected.currentMedicine) as p}
                  <p class="article-paragraph">{p}</p>
                {/each}
              </section>
            {/if}

            {#if selected.naturalRemedies}
              <section class="detail-section">
                <h4>Natural remedies</h4>
                {#each paragraphs(selected.naturalRemedies.notes ?? selected.naturalRemedies) as p}
                  <p class="article-paragraph">{p}</p>
                {/each}

                {#if selected.naturalRemedies.herbs}
                  <ul class="herb-list">
                    {#each selected.naturalRemedies.herbs as h}
                      <li>
                        <strong>{h.name}</strong> — <span class="small">{h.benefits}</span>
                        {#if h.preparation}<div class="tiny">Preparation: {h.preparation}</div>{/if}
                        {#if h.safety}<div class="tiny">Safety: {h.safety}</div>{/if}
                      </li>
                    {/each}
                  </ul>
                {/if}

                {#if selected.naturalRemedies.tincture}
                  <div class="tincture">
                    <strong>{selected.naturalRemedies.tincture.title}</strong>
                    {#if selected.naturalRemedies.tincture.description}
                      {#each paragraphs(selected.naturalRemedies.tincture.description) as p}
                        <p class="article-paragraph">{p}</p>
                      {/each}
                    {/if}

                    {#if selected.naturalRemedies.tincture.method}
                      <ol>
                        {#each selected.naturalRemedies.tincture.method as step}
                          <li>{step}</li>
                        {/each}
                      </ol>
                    {/if}

                    {#if selected.naturalRemedies.tincture.safety}
                      <p class="tiny"><strong>Safety:</strong> {selected.naturalRemedies.tincture.safety}</p>
                    {/if}
                  </div>
                {/if}
              </section>
            {/if}

            {#if selected.lifestyle}
              <section class="detail-section">
                <h4>Lifestyle</h4>
                {#each paragraphs(selected.lifestyle) as p}
                  <p class="article-paragraph">{p}</p>
                {/each}
              </section>
            {/if}

            {#if selected.verses}
              <section class="detail-section verses">
                <h4>Verse</h4>
                {#each paragraphs(selected.verses.text ?? selected.verses) as p}
                  <p class="article-paragraph">{p}</p>
                {/each}
              </section>
            {/if}

            {#if selected.sidePoints}
              <section class="detail-section">
                <h4>Side points</h4>
                <ul>
                  {#each selected.sidePoints as sp}
                    <li>{sp}</li>
                  {/each}
                </ul>
              </section>
            {/if}

            <!-- footer actions inside the scrollable region so they are reachable by scrolling -->
            <footer class="detail-footer">
              <div class="detail-actions">
                <button class="btn secondary" on:click={closeDetail}>Close</button>
              </div>
            </footer>
          </section>
        </article>
      </div>
{/if}
  </main>
</section>

<style>
  :root{
    --accent: #7a4b2b;
    --muted: #6b7280;
    --cream-1: #fff7ef;
    --cream-2: #f3e6d8;
    --card-border: rgba(107,63,43,0.08);
    --shadow: 0 12px 36px rgba(20,20,20,0.06);
    --title-font: "Lavishly Yours", cursive;
    --body-font: "Special Elite", monospace;
  }

  .container { max-width:1100px; margin:0 auto; padding:1rem; font-family:var(--body-font); color:var(--accent); }

  .card { background: linear-gradient(180deg,var(--cream-2),#fff); border-radius:12px; padding:1rem; border:1px solid var(--card-border); box-shadow:var(--shadow); }

  .page-header { display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-bottom:1rem; }
  .header-left h1 { margin:0; font-family:var(--title-font); font-size:1.9rem; color:var(--accent); }
  .lead { margin:0.25rem 0 0 0; color:var(--muted); font-size:0.95rem; }

  .header-right { display:flex; gap:0.5rem; align-items:center; }
  .search { padding:0.45rem 0.6rem; border-radius:8px; border:1px solid var(--card-border); background:#fbfbfd; font-family:var(--body-font); color:var(--accent); }

  .content { display:flex; gap:1rem; align-items:flex-start; }
  .grid {
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    gap:1rem;
    flex:1;
  }
  @media (max-width: 920px) { .grid { grid-template-columns: 1fr; } .content { flex-direction:column; } }

  .post { display:flex; flex-direction:column; gap:0.75rem; cursor:pointer; padding:0; overflow:hidden; border-radius:10px; background: linear-gradient(180deg,var(--cream-2),#fff); border:1px solid var(--card-border); }
  .post:hover { transform: translateY(-4px); transition: transform .14s ease, box-shadow .14s ease; box-shadow: 0 18px 40px rgba(107,63,43,0.08); }

  /* big image on top (show full image) */
  .post-media-top {
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background: var(--cream-1);
    border-radius:10px 10px 0 0;
    overflow:hidden;
    border-bottom:1px solid var(--card-border);
  }
  .thumb-top {
    width:100%;
    height:auto;
    max-height:420px;
    object-fit: contain;
    display:block;
    background: var(--cream-1);
  }
  .media-placeholder-top {
    width:100%;
    height:220px;
    display:flex;
    align-items:center;
    justify-content:center;
    background: linear-gradient(135deg, rgba(122,75,43,0.06), rgba(183,134,90,0.04));
  }
  .media-initial { font-family:var(--title-font); color:var(--accent); font-size:2rem; }

  .post-body { padding: 0.9rem; background: transparent; }
  .post-title { margin:0 0 0.25rem 0; font-family:var(--title-font); font-size:1.15rem; color:var(--accent); }
  .post-sub { margin:0 0 0.5rem 0; color:var(--muted); font-size:0.92rem; }
  .post-excerpt { margin:0; color:var(--muted); line-height:1.45; }

  /* FULL-SCREEN OVERLAY */
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 120;
    display: flex;
    align-items: stretch;
    justify-content: center;
    padding: 2.5vh 2vw;
    background: rgba(10,10,10,0.45);
    backdrop-filter: blur(4px);
  }

  .article-detail {
    width: 100%;
    max-width: 1100px;
    height: 100%;
    border-radius: 10px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .detail-header { display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; }
  .detail-header h2 { margin:0; font-family:var(--title-font); color:var(--accent); font-size:1.4rem; }
  .detail-sub { color:var(--muted); margin-top:0.25rem; }

  .detail-close {
    background:transparent;
    border:1px solid var(--card-border);
    border-radius:8px;
    padding:0.35rem 0.6rem;
    cursor:pointer;
    font-family:var(--body-font);
    color:var(--accent);
  }

  .detail-image-wrap { margin-top:0.8rem; display:flex; justify-content:center; }
  .detail-image { width:100%; height:auto; max-height:560px; object-fit: contain; border-radius:8px; border:1px solid var(--card-border); background:var(--cream-1); }

  .detail-body {
    margin-top:0.9rem;
    overflow:auto;
    padding-right: 0.5rem;
    color:var(--muted);
    line-height:1.6;
    flex:1;
    -webkit-overflow-scrolling: touch;
  }

  .detail-section { margin-bottom:1rem; }
  .detail-section h4 { margin:0 0 0.4rem 0; font-family:var(--title-font); color:var(--accent); font-size:2rem; }
  .herb-list { list-style:none; padding:0; margin:0.4rem 0 0 0; }
  .herb-list li { margin-bottom:0.6rem; }
  .tiny { font-size:0.85rem; color:var(--muted); margin-top:0.15rem; }

  .article-paragraph { margin: 0 0 1rem 0; line-height:1.6; color:var(--muted); font-size:1rem; }

  .detail-footer { margin-top:0.6rem; display:flex; justify-content:flex-end; gap:0.5rem; }

  .btn { padding:0.45rem 0.7rem; border-radius:8px; border:none; cursor:pointer; font-family:var(--body-font); background:linear-gradient(180deg,#8f5a3b,#b7865a); color:#fff; }
  .btn.secondary { background:transparent; border:1px solid var(--card-border); color:var(--accent); }

  @media (max-width: 720px) {
    .overlay { padding: 4vh 3vw; }
    .article-detail { border-radius: 8px; padding: 1rem; }
    .thumb-top { max-height: 260px; }
  }

  /* accessibility focus */
  .post:focus, .post[tabindex="0"]:focus, .detail-close:focus { outline: 3px solid rgba(122,75,43,0.12); outline-offset: 3px; }
</style>
