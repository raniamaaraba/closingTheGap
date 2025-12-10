<script>
  import Search from "./search.svelte";
  import HerbCard from "./herbCards.svelte"
  import HerbModal from "./modal.svelte";
  //import { herbs } from "./herbs.js";
  import { createEventDispatcher } from "svelte";
  import HomeButton from "./homeButton.svelte";
  const dispatch = createEventDispatcher();

  let query = "";
  let selected = null;
  //a-z
  $: filtered = herbs.filter(h => {
    const name = (h.name || "").toLowerCase();
    const short = (h.short || "").toLowerCase();
    const matchesQuery = !query || name.includes(query.toLowerCase()) || short.includes(query.toLowerCase());
    return matchesQuery;
  });

  function openHerb(h) { selected = h; }
  function closeModal() { selected = null; }

  function handleSearch(e) { query = e.detail?.q ?? ""; }
  function back() { dispatch("backToHome"); }

  import arinca from "./assets/dictonary/arnica.jpeg";
  import ashwagandha from "./assets/dictonary/ashwagandha.jpg";
  import blackpepper from "./assets/dictonary/blackpepper.jpg";
  import calendula from "./assets/dictonary/calendula.jpeg";
  import cardamom from "./assets/dictonary/cardamon.jpg";
  import cayenne from "./assets/dictonary/cayanne.jpeg";
  import chicory from "./assets/dictonary/chicory.jpg";
  import cinnamon from "./assets/dictonary/cinnamon.jpg";
  import clove from "./assets/dictonary/clove.jpg";
  import comfrey from "./assets/dictonary/comfrey.jpeg";
  import dandelion from "./assets/dictonary/dandelion.jpeg";
  import dulse from "./assets/dictonary/dulse.jpeg";
  import echinacea from "./assets/dictonary/echinacea.jpg";
  import elecampane from "./assets/dictonary/elecampane.jpg";
  import eucalyptus from "./assets/dictonary/eucalyptus.png";
  import fennel from "./assets/dictonary/fennel.jpg";
  import fenugreek from "./assets/dictonary/fenugreek.jpeg";
  import chamomile from "./assets/dictonary/germanChamomile.jpeg";
  import ginger from "./assets/dictonary/ginger.jpeg";
  import greentea from "./assets/dictonary/greenTea.jpg";
  import hibiscus from "./assets/dictonary/hibiscus.jpg";
  import lavender from "./assets/dictonary/lavendar.jpg";
  import lemon from "./assets/dictonary/lemon.jpg";
  import lemonbalm from "./assets/dictonary/lemonBalm.jpg";
  import marshmallow from "./assets/dictonary/marshmallow.jpg";
  import mullein from "./assets/dictonary/mullein.jpeg";
  import nettle from "./assets/dictonary/nettle.jpeg";
  import orange from "./assets/dictonary/orange.jpg";
  import parsley from "./assets/dictonary/parsley.jpeg";
  import passionflower from "./assets/dictonary/passionflower.jpeg";
  import peppermint from "./assets/dictonary/peppermint.png";
  import pineneedle from "./assets/dictonary/pineNeedle.jpg";
  import plantain from "./assets/dictonary/plantain.jpg";
  import rasberryleaf from "./assets/dictonary/redRasberryLeaf.jpg";
  import skullcap from "./assets/dictonary/skullcap.jpeg";
  import stjohn from "./assets/dictonary/stJohnsWort.jpeg";
  import tumeric from "./assets/dictonary/tumeric.jpg";
  import willowbark from "./assets/dictonary/whiteWillowBark.jpeg";
  import yarrow from "./assets/dictonary/yarrow.jpeg";


  export const herbs = [
    {
      id: "arnica",
      name: "Arnica",
      image: arinca,
      short: "Blooms in midsummer and fall with the best harvest early in the season",
      uses: ["Used for relieving pain, high blood pressure, and healing wounds"],
      effects: ["warming and drying"],
      dosage: ["take in small doses and do not apply on open wounds; using over the recommended dosage can cause dizziness, arrhythmia, tachycardia, shaking, and potential collapse"],
      allergens: ["beware if you have weed allergies for potential reactions"]
    },
    {
      id: "ashwagandha",
      name: "Ashwagandha",
      image: ashwagandha,
      short: "Adaptogenic root used in Ayurvedic tradition for stress resilience",
      uses: ["Stress resilience and adaptogenic support (traditional)", "sleep and energy balancing in folk use"],
      effects: ["Mild calming or balancing; may lower cortisol in some people"],
      dosage: ["Follow product guidance; consult a healthcare professional if pregnant, nursing, or taking thyroid/sedative medications"],
      allergens: ["Rare; consult a clinician if on thyroid medication or immunomodulating drugs; avoid in pregnancy without guidance"]
    },
    {
      id: "black-pepper",
      name: "Black Pepper",
      image: blackpepper,
      short: "Stored as whole peppercorns and is also used largely in cooking",
      uses: ["Used for anti-inflammation, improving blood sugar, improving brain function, gut health, and pain relief"],
      effects: ["Warming, can cause excessive sneezing when inhaled"],
      allergens: ["Do not give to children in large quantities"]
    },
    {
      id: "calendula",
      name: "Calendula",
      image: calendula,
      short: "Found around the time of the first snowfall; perfect for salves and butters",
      uses: ["Dry skin, eczema, bruises, rashes, Crohn's disease, gastrics, anti-bacterial, and menstruation"],
      effects: ["Drying, cooling, astringent"],
      allergens: ["Allergens arise in weed allergies; Do NOT use when pregnant; Avoid using in the chest area"]
    },
    {
      id: "cardamom",
      name: "Cardamom",
      image: cardamom,
      short: "A fragrant spice often used in cooking and teas",
      uses: ["Relieving gas, aromatics, and respiratory aid"],
      effects: ["Warming & drying"],
      allergens: ["Do not use if pregnant or taking blood thinners"]
    },
    {
      id: "cayenne-pepper",
      name: "Cayenne Pepper",
      image: cayenne,
      short: "Common cooking herb known for its spice",
      uses: ["Pain reliever, relieving gas, slow or stop bleeding, heat tonic, digestive aid, releases endorphins, ulcers & heart health"],
      effects: ["Warming & drying"],
      allergens: ["Can cause gastrointestinal distress; Keep away from genitals, eyes, and sinus cavities; Do not ingest if you have hemorrhoids"]
    },
    {
      id: "chicory",
      name: "Chicory",
      image: chicory,
      short: "Great for cleaning the body and improving functionality of organs",
      uses: ["Antioxidant, antidiabetic, prebiotic, liver function and decrease risk of gastrointestinal illnesses"],
      effects: ["Cooling & cleansing"],
      allergens: ["Avoid if you have IBS or are nursing; Do not take if you have diabetes; Can cause allergens with weed allergies; Can aggravate gallstones"]
    },
    {
      id: "cinnamon",
      name: "Cinnamon",
      image: cinnamon,
      short: "Common holiday herb",
      uses: ["Antidiabetic, astringent, lowers blood sugar, regulate menstrual bleeding for heavy flow and cramps"],
      effects: ["Warming & drying"],
      allergens: ["Consume in moderation during pregnancy or if you have urinary contractions"]
    },
    {
      id: "clove",
      name: "Clove",
      image: clove,
      short: "Common ingredient in teas",
      uses: ["Muscle pain and spasms, antiseptic, anti-inflammatory, antibacterial, antioxidant, astringent, numb or sore gums in adults and children"],
      effects: ["Calming"],
      allergens: [""]
    },
    {
      id: "comfrey",
      name: "Comfrey",
      image: comfrey,
      short: "Delicate herb used topically for tissue support and wound care",
      uses: ["Astringent, demulcent, emollient, and helps heal wounds"],
      effects: ["Cooling & moisturizing"],
      allergens: ["Do not take if nursing, pregnant, have liver issues, or have cancer"]
    },
    {
      id: "dandelion",
      name: "Dandelion",
      image: dandelion,
      short: "Often found in early spring through summer; releases white latex when harvested",
      uses: ["Liver tonic, diuretic, and digestion"],
      effects: ["Cooling & drying"],
      allergens: ["Latex can cause allergies; Beware of weed allergens"]
    },
    {
      id: "dulse",
      name: "Dulse",
      image: dulse,
      short: "A red seaweed often used in tinctures and glycerites",
      uses: ["Increasing iodine, lowering blood pressure, improving eyesight and improving thyroid health"],
      effects: ["Cooling & moisturizing"],
      allergens: ["Avoid if you have high iodine levels or hyperthyroidism"]
    },
    {
      id: "echinacea",
      name: "Echinacea",
      image: echinacea,
      short: "A strong immune system supplement in folk use",
      uses: ["Antiseptic, stimulates the immune system and supports the liver; Great for upper-respiratory illnesses and easing a sore throat"],
      effects: [""],
      allergens: ["Avoid if you have an autoimmune disease; Do not take if you have weed allergens"]
    },
    {
      id: "elecampane",
      name: "Elecampane",
      image: elecampane,
      short: "Herb often used as an antioxidant",
      uses: ["Antiseptic, anti-inflammatory, reduces inflammation and bacteria"],
      effects: ["Warming & drying"],
      dosage: ["Take in small doses; Larger doses can cause nausea, vomiting, diarrhea, and abdominal cramping"],
      allergens: ["May cause reactions with those with weed allergens"]
    },
    {
      id: "eucalyptus",
      name: "Eucalyptus",
      image: eucalyptus,
      short: "Oils traditionally used to relax the body and muscles",
      uses: ["Antimicrobial, antibacterial, antifungal, reduces coughs, reduces upper-respiratory congestion, reduce muscle and joint pain"],
      effects: ["Warming & drying"],
      dosage: ["Small doses must be given to children; Can be potentially toxic to young children"],
      allergens: [""]
    },
    {
      id: "fennel",
      name: "Fennel",
      image: fennel,
      short: "Sweet, anise-like seed used in cooking and traditional remedies",
      uses: ["Eases bloating, increases production of breast milk, eases gas and upset stomachs"],
      effects: ["Drying & warming"],
      allergens: ["Avoid during pregnancy"]
    },
    {
      id: "fenugreek",
      name: "Fenugreek",
      image: fenugreek,
      short: "Bitter, maple-scented seeds used as a spice and traditional galactagogue",
      uses: ["Supports lactation (traditional use)", "blood sugar support", "digestive aid", "culinary spice"],
      effects: ["Warming; may increase milk supply; can cause a maple-syrup odor in sweat and urine in some people"],
      dosage: ["Use culinary amounts for flavor; medicinal doses should follow product guidance or a practitioner's advice; avoid high doses if on blood sugar-lowering medication"],
      allergens: ["May cause hypoglycemia if combined with diabetes medications; possible allergic reactions; avoid if pregnant without professional guidance"]
    },
    {
      id: "germanChamomile",
      name: "German Chamomile",
      image: chamomile,
      short: "Gentle, calming flower used in teas for relaxation and digestion",
      uses: ["Short-term sleep support (informational)", "digestive comfort"],
      effects: ["sedative effects reported; can cause grogginess in some people"],
      allergens: ["Asteraceae allergy (ragweed) possible; avoid combining with sedatives without guidance"]
    },
    {
      id: "ginger",
      name: "Ginger",
      image: ginger,
      short: "Spicy root used for digestion and nausea",
      uses: ["Digestive support", "nausea relief (culinary/folk)"],
      effects: ["warming, carminative"],
      allergens: ["rare; topical irritation possible"]
    },
    {
      id: "greenTea",
      name: "Green Tea",
      image: greentea,
      short: "Leaf used for gentle stimulation and antioxidant support",
      uses: ["Mild stimulant, antioxidant support, digestive comfort"],
      effects: ["stimulating in higher amounts; calming in small amounts"],
      allergens: ["can affect liver in concentrated extracts; avoid with certain medications"]
    },
    {
      id: "hibiscus",
      name: "Hibiscus",
      image: hibiscus,
      short: "Tart, floral calyces used as a cooling tea",
      uses: ["Culinary beverage", "may support healthy blood pressure in folk reports"],
      effects: ["cooling; may affect blood clotting in high doses"],
      allergens: ["rare; consult professional if on blood thinners"]
    },
    {
      id: "lemon",
      name: "Lemons",
      image: lemon,
      short: "Citrus fruit used for flavor, vitamin C, and aromatic oils",
      uses: ["Digestive support", "flavoring, topical aromatics"],
      effects: ["warming, carminative in some preparations"],
      allergens: ["rare; topical irritation possible"]
    },
    {
      id: "lemonBalm",
      name: "Lemon Balm",
      image: lemonbalm,
      short: "Citrusy mint-family herb used for calming teas",
      uses: ["Calming tea", "digestive support"],
      effects: ["mild calming, antiviral in folk reports"],
      allergens: ["rare; Lamiaceae sensitivity possible"]
    },
    {
      id: "marshmallow",
      name: "Marshmallow",
      image: marshmallow,
      short: "Mucilaginous root used for soothing mucous membranes",
      uses: ["Soothing throat and mucous membranes (folk)"],
      effects: ["soothing, demulcent"],
      allergens: ["rare"]
    },
    {
      id: "mullein",
      name: "Mullein",
      image: mullein,
      short: "Soft-leafed plant used in respiratory folk preparations",
      uses: ["Respiratory steam or oil infusions in folk use"],
      effects: ["soothing to mucous membranes in topical/steam uses"],
      allergens: ["rare; dust from leaves can irritate"]
    },
    {
      id: "nettle",
      name: "Nettle",
      image: nettle,
      short: "Nutrient-rich leaf used as a spring tonic",
      uses: ["Nutrient tonic", "topical itch relief after stinging (folk)"],
      effects: ["nutritive; diuretic in some uses"],
      allergens: ["topical stinging if fresh; processing removes stingers"]
    },
    {
      id: "orange",
      name: "Oranges",
      image: orange,
      short: "Citrus fruit and aromatic peel used in culinary and medicinal traditions",
      uses: ["Nutrient tonic", "topical aromatics, flavoring"],
      effects: ["nutritive; uplifting aroma"],
      allergens: ["citrus sensitivity possible"]
    },
    {
      id: "parsley",
      name: "Parsley",
      image: parsley,
      short: "Common garnish and mild culinary herb",
      uses: ["Culinary", "fresh breath in folk use"],
      effects: ["mild diuretic in large amounts"],
      allergens: ["rare; avoid very large amounts in pregnancy"]
    },
    {
      id: "passionflower",
      name: "Passionflower",
      image: passionflower,
      short: "Vining plant used for calming and sleep support",
      uses: ["Calming tea", "sleep support (folk)"],
      effects: ["mild calming"],
      allergens: ["rare; avoid mixing with sedatives without guidance"]
    },
    {
      id: "peppermint",
      name: "Peppermint",
      image: peppermint,
      short: "Cooling, aromatic mint used in teas and topical preparations",
      uses: ["Digestive tea", "topical cooling for muscles"],
      effects: ["cooling, soothing to digestion in culinary amounts"],
      allergens: ["avoid internal use in infants; topical sensitivity possible"]
    },
    {
      id: "pineNeedle",
      name: "Pine Needle",
      image: pineneedle,
      short: "Needle and resin used for aromatic and traditional respiratory support",
      uses: ["Aromatic steam, topical rubs for muscle soreness"],
      effects: ["warming topically; can irritate broken skin"],
      allergens: ["avoid if sensitive to conifer resins"]
    },
    {
      id: "plantain",
      name: "Plantain",
      image: plantain,
      short: "Common plant used topically for skin and insect bites",
      uses: ["Topical skin soothing", "minor wound care in folk use"],
      effects: ["soothing topically"],
      allergens: ["rare"]
    },
    {
      id: "redRaspberryLeaf",
      name: "Red Raspberry Leaf",
      image: rasberryleaf,
      short: "Leaf used traditionally for uterine tone and as a nutritive tea",
      uses: ["Menstrual support, uterine tone in folk use", "digestive bitters"],
      effects: ["tonic, astringent"],
      allergens: ["rare"]
    },
    {
      id: "skullcap",
      name: "Skullcap",
      image: skullcap,
      short: "Herb used for calming and nervous system support in folk traditions",
      uses: ["Soothing nervous tension, mild calming"],
      effects: ["soothing, mildly sedative"],
      allergens: ["rare"]
    },
    {
      id: "st-johns-wort",
      name: "St John's Wort",
      image: stjohn,
      short: "Yellow-flowering herb traditionally used for mood support",
      uses: ["Traditional support for mild–moderate low mood (informational)", "topical use in some folk preparations"],
      effects: ["May cause photosensitivity in some people; can interact with many medications"],
      dosage: ["Do not combine with prescription antidepressants or other interacting medications; consult a healthcare professional before use"],
      allergens: ["Can interact with many medications (including birth control, anticoagulants, and antidepressants); avoid without professional guidance"]
    },
    {
      id: "turmeric",
      name: "Turmeric",
      image: tumeric,
      short: "Golden root used as spice and in traditional remedies",
      uses: ["Culinary spice", "topical and internal anti-inflammatory in folk use"],
      effects: ["warming, may affect blood clotting in high doses"],
      allergens: ["rare; consult professional if on blood thinners"]
    },
    {
      id: "whiteWillowBark",
      name: "White Willow Bark",
      image: willowbark,
      short: "Bark traditionally used for pain and inflammation",
      uses: ["Topical and internal folk uses for pain and circulation"],
      effects: ["mildly nutritive; analgesic in traditional use"],
      allergens: ["Avoid if allergic to salicylates; consult professional if on blood thinners"]
    },
    {
      id: "yarrow",
      name: "Yarrow",
      image: yarrow,
      short: "Astringent herb used in wound and circulation traditions",
      uses: ["Nutrient tonic", "skin support in folk use"],
      effects: ["nutritive, blood-supporting in tradition"],
      allergens: ["rare; possible cross-reactivity with Asteraceae"]
    }

  ];

</script>

<section class="directory container">
  <header class="directory-header">
    <div class="title-block">
      <h1 class="site-title">Herbal Dictionary</h1>
      <div class="subtitle">Quick Index of Useful Herbs</div>
    </div>

    <div class="controls">
      <Search placeholder="Search herbs..." on:search={handleSearch} />
      <HomeButton />
    </div>
  </header>

  <div class="card section" style="margin-top:1rem;">
    <div class="dict-grid">
      {#each filtered as herb}
        <HerbCard {herb} on:open={() => openHerb(herb)} />
      {/each}
    </div>

    {#if filtered.length === 0}
      <p class="muted">No herbs match your search.</p>
    {/if}
  </div>

  {#if selected}
    <HerbModal herb={selected} on:close={closeModal} />
  {/if}
</section>

<style>
  :root{
    --title-font: "Lavishly Yours", cursive;
    --body-font: "Special Elite", "Courier New", monospace;

    --toffee-1: #6b3f2b;
    --toffee-2: #8f5a3b;
    --toffee-3: #b7865a;
    --cream-1:  #fff7ef;
    --cream-2:  #f3e6d8;
    --muted:    #6b5a50;
    --accent:   #c77a3a;
    --card-border: rgba(107,63,43,0.08);
    --radius: 12px;
    --shadow: 0 6px 18px rgba(107,63,43,0.08);
  }

  .directory {
    background: linear-gradient(180deg, var(--cream-1) 0%, #fffaf3 100%);
    color: var(--toffee-1);
    min-height: 100%;
    padding: 1.25rem;
    font-family: var(--body-font);
  }

  .directory-header {
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:1rem;
    margin-bottom:1rem;
  }

  
  @media (max-width:640px){
    .directory-header { flex-direction:column; align-items:flex-start; gap:0.5rem; }
  }
    
:global(html), :global(body) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.directory-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1rem;
}

.title-block .site-title {
  margin: 0;
  font-family: var(--title-font);
  font-size: 3.0rem;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.02em;
}

@media (max-width: 900px) {
  .title-block .site-title { font-size: 1.6rem; }
}
@media (max-width: 480px) {
  .title-block .site-title { font-size: 1.35rem; }
}

.subtitle { color:var(--muted); font-size:0.9rem; }

.controls { display:flex; gap:0.5rem; align-items:center; }

.dict-grid {
  display:grid;
  gap:0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items:start;
  width: 100%;
  max-width: 100%;
  margin: 0; 
  box-sizing: border-box;
  padding: 0;
}

.card.section { padding:0.75rem; box-sizing: border-box; }
.muted { color:var(--muted); margin-top:0.75rem; }

</style>
