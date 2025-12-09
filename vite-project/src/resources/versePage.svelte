<script>
  import { onMount } from "svelte";
  import HomeButton from "../homeButton.svelte";
  import Search from "../search.svelte";

  let q = "";
  let searchEl;

  onMount(() => {
    searchEl?.focus?.();
  });

  function handleSearch(e) {
    q = e.detail?.q ?? "";
  }

  const verses = [
    { ref: "Proverbs 17:22", text: "A merry heart doeth good like a medicine: but a broken spirit drieth the bones." },
    { ref: "1 Timothy 5:23", text: "Drink no longer water, but use a little wine for thy stomach's sake and thine often infirmities." },
    { ref: "Revelation 22:2", text: "In the midst of the street of it, and on either side of the river, was there the tree of life, which bare twelve manner of fruits, and yielded her fruit every month: and the leaves of the tree were for the healing of the nations." },
    { ref: "Matthew 9:12", text: "But when Jesus heard that, he said unto them, They that be whole need not a physician, but they that are sick." },
    { ref: "Ezekiel 47:12", text: "And by the river upon the bank thereof, on this side and on that side, shall grow all trees for meat, whose leaf shall not fade, neither shall the fruit thereof be consumed: it shall bring forth new fruit according to his months, because their waters they issued out of the sanctuary: and the fruit thereof shall be for meat, and the leaf thereof for medicine." },
    { ref: "Jeremiah 8:22", text: "Is there no balm in Gilead; is there no physician there? why then is not the health of the daughter of my people recovered?" },
    { ref: "Isaiah 38:21", text: "For Isaiah had said, Let them take a lump of figs, and lay it for a plaster upon the boil, and he shall recover." },
    { ref: "Luke 10:34", text: "And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him." },
    { ref: "Job 5:18", text: "For he maketh sore, and bindeth up: he woundeth, and his hands make whole." },
    { ref: "Jeremiah 46:11", text: "Go up into Gilead, and take balm, O virgin, the daughter of Egypt: in vain shalt thou use many medicines; for thou shalt not be cured." },
    { ref: "James 5:15", text: "And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him." },
    { ref: "Romans 12:2", text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God." },
    { ref: "Psalm 147:3", text: "He healeth the broken in heart, and bindeth up their wounds." },
    { ref: "Psalm 103:3", text: "Who forgiveth all thine iniquities; who healeth all thy diseases;" },
    { ref: "Colossians 4:14", text: "Luke, the beloved physician, and Demas, greet you." },
    { ref: "John 3:16-17", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.  For God sent not his Son into the world to condemn the world; but that the world through him might be saved." },
    { ref: "John 10:10", text: "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly." },
    { ref: "Proverbs 31:6", text: "Give strong drink unto him that is ready to perish, and wine unto those that be of heavy hearts." },
    { ref: "3 John 1:2", text: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth." },
    { ref: "2 Kings 20:7", text: "And Isaiah said, Take a lump of figs. And they took and laid it on the boil, and he recovered." },
    { ref: "1 Corinthians 6:19-20", text: "What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own?  For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God's." },
    { ref: "Proverbs 15:13", text: "A merry heart maketh a cheerful countenance: but by sorrow of the heart the spirit is broken." },
    { ref: "Mark 5:25-26", text: "And a certain woman, which had an issue of blood twelve years,  And had suffered many things of many physicians, and had spent all that she had, and was nothing bettered, but rather grew worse," },
    { ref: "Genesis 9:3", text: "Every moving thing that liveth shall be meat for you; even as the green herb have I given you all things." },
    { ref: "Genesis 1:29", text: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat." },
    { ref: "Exodus 30:23", text: "Take thou also unto thee principal spices, of pure myrrh five hundred shekels, and of sweet cinnamon half so much, two hundred and fifty, and of sweet calamus two hundred and fifty," },
    { ref: "Song of Solomon 4:14", text: "Spikenard and saffron; calamus and cinnamon, with all trees of frankincense; myrrh and aloes, with all the chief spices:" },
    { ref: "2 Chronicles 7:14", text: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land." },
    { ref: "1 Timothy 4:8", text: "For bodily exercise profiteth little: but godliness is profitable unto all things, having promise of the life that now is, and of that which is to come." },
    { ref: "Mark 5:34", text: "And he said unto her, Daughter, thy faith hath made thee whole; go in peace, and be whole of thy plague." },
    { ref: "Psalm 30:2", text: "O LORD my God, I cried unto thee, and thou hast healed me." },
    { ref: "Psalm 41:3", text: "The LORD will strengthen him upon the bed of languishing: thou wilt make all his bed in his sickness." },
    { ref: "Matthew 10:8", text: "Heal the sick, cleanse the lepers, raise the dead, cast out devils: freely ye have received, freely give." },
    { ref: "James 5:14-15", text: "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord:  And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him." },
    { ref: "Exodus 15:26", text: "And said, If thou wilt diligently hearken to the voice of the LORD thy God, and wilt do that which is right in his sight, and wilt give ear to his commandments, and keep all his statutes, I will put none of these diseases upon thee, which I have brought upon the Egyptians: for I am the LORD that healeth thee." },
    { ref: "Jeremiah 33:6", text: "Behold, I will bring it health and cure, and I will cure them, and will reveal unto them the abundance of peace and truth." },
    { ref: "Isaiah 53:5", text: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed." },
    { ref: "Psalm 23:1-6", text: "The LORD is my shepherd; I shall not want.  He maketh me to lie down in green pastures: he leadeth me beside the still waters.  He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.  Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.  Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.  Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." },
    { ref: "Proverbs 16:24", text: "Pleasant words are as an honeycomb, sweet to the soul, and health to the bones." },
    { ref: "Proverbs 20:1", text: "Wine is a mocker, strong drink is raging: and whosoever is deceived thereby is not wise." },
    { ref: "Proverbs 23:29-35", text: "Who hath woe? who hath sorrow? who hath contentions? who hath babbling? who hath wounds without cause? who hath redness of eyes?  They that tarry long at the wine; they that go to seek mixed wine.  Look not thou upon the wine when it is red, when it giveth his colour in the cup, when it moveth itself aright.  At the last it biteth like a serpent, and stingeth like an adder.  Thine eyes shall behold strange women, and thine heart shall utter perverse things.  Yea, thou shalt be as he that lieth down in the midst of the sea, or as he that lieth upon the top of a mast.  They have stricken me, shalt thou say, and I was not sick; they have beaten me, and I felt it not: when shall I awake? I will seek it yet again." },
    { ref: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness." },
    { ref: "Jeremiah 30:17", text: "For I will restore health unto thee, and I will heal thee of thy wounds, saith the LORD; because they called thee an Outcast, saying, This is Zion, whom no man seeketh after." },
    { ref: "Psalm 103:2-3", text: "Bless the LORD, O my soul, and forget not all his benefits:  Who forgiveth all thine iniquities; who healeth all thy diseases;" },
    { ref: "Psalm 51:7", text: "Purge me with hyssop, and I shall be clean: wash me, and I shall be whiter than snow." },
    { ref: "Jeremiah 17:14", text: "Heal me, O LORD, and I shall be healed; save me, and I shall be saved: for thou art my praise." },
    { ref: "Ezekiel 4:9", text: "Take thou also unto thee wheat, and barley, and beans, and lentiles, and millet, and fitches, and put them in one vessel, and make thee bread thereof..." },
    { ref: "2 Kings 20:5-8", text: "Turn again, and tell Hezekiah the captain of my people, Thus saith the LORD, the God of David thy father, I have heard thy prayer, I have seen thy tears: behold, I will heal thee... And Isaiah said, Take a lump of figs. And they took and laid it on the boil, and he recovered." },
    { ref: "Genesis 50:2", text: "And Joseph commanded his servants the physicians to embalm his father: and the physicians embalmed Israel." },
    { ref: "Mark 2:17", text: "When Jesus heard it, he saith unto them, They that are whole have no need of the physician, but they that are sick: I came not to call the righteous, but sinners to repentance." },
    { ref: "Acts 5:29", text: "Then Peter and the other apostles answered and said, We ought to obey God rather than men." },
    { ref: "Revelation 1:1", text: "The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass..." },
    { ref: "Revelation 21:8", text: "But the fearful, and unbelieving, and the abominable, and murderers, and whoremongers, and sorcerers, and idolaters, and all liars, shall have their part in the lake which burneth with fire and brimstone: which is the second death." },
    { ref: "Job 13:4", text: "But ye should say, Why persecute we him, seeing the root of the matter is found in me?" },
    { ref: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you." },
    { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me." },
    { ref: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
    { ref: "Revelation 3:18", text: "I counsel thee to buy of me gold tried in the fire, that thou mayest be rich; and white raiment, that thou mayest be clothed..." },
    { ref: "Matthew 6:33", text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." },
    { ref: "Revelation 22:15", text: "For without are dogs, and sorcerers, and whoremongers, and murderers, and idolaters, and whosoever loveth and maketh a lie." },
    { ref: "1 Peter 4:7", text: "But the end of all things is at hand: be ye therefore sober, and watch unto prayer." },
    { ref: "1 Thessalonians 5:6-8", text: "Therefore let us not sleep, as do others; but let us watch and be sober.  For they that sleep sleep in the night; and they that be drunken are drunken in the night.  But let us, who are of the day, be sober, putting on the breastplate of faith and love; and for an helmet, the hope of salvation." },
    { ref: "Galatians 5:19-21", text: "Now the works of the flesh are manifest, which are these; Adultery, fornication, uncleanness, lasciviousness... they which do such things shall not inherit the kingdom of God." },
    { ref: "Romans 13:13", text: "Let us walk honestly, as in the day; not in rioting and drunkenness, not in chambering and wantonness, not in strife and envying." },
    { ref: "1 Corinthians 10:13", text: "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able..." },
    { ref: "1 Corinthians 3:17", text: "If any man defile the temple of God, him shall God destroy; for the temple of God is holy, which temple ye are." },
    { ref: "1 Corinthians 6:10", text: "Nor thieves, nor covetous, nor drunkards, nor revilers, nor extortioners, shall inherit the kingdom of God." },
    { ref: "1 Corinthians 5:11", text: "But now I have written unto you not to keep company, if any man that is called a brother be a fornicator, or covetous, or an idolater... with such an one no not to eat." },
    { ref: "Genesis 1:11-31", text: "And God said, Let the earth bring forth grass, the herb yielding seed... and God saw every thing that he had made, and, behold, it was very good." },
    { ref: "Esther 5:1-14", text: "And it came to pass on the third day, that Esther put on her royal apparel... (Esther's approach to the king and the banquet.)" },
    { ref: "Mark 5:24-29", text: "And there came a great multitude about him, and he was by the sea... And the woman, having heard of Jesus, came in the press behind, and touched his garment.  For she said, If I may touch but his clothes, I shall be whole.  And straightway the fountain of her blood was dried up; and she felt in her body that she was healed of that plague." },
    { ref: "2 Chronicles 16:12", text: "And Asa in the thirty and ninth year of his reign was diseased in his feet, until his disease was exceeding great: yet in his disease he sought not to the LORD, but to the physicians." }
  ];

  $: filtered = verses.filter(v =>
    !q ||
    v.ref.toLowerCase().includes(q.toLowerCase()) ||
    v.text.toLowerCase().includes(q.toLowerCase())
  );
</script>

<section class="verses-page container">
  <header class="card page-header verses-header">
    <div class="verses-header-left">
      <div class="title-block">
        <h1>Bible Verses on Medicine (KJV)</h1>
        <p class="lead">Verses from the King James Version that show why God tells us to take care of our health. Use the search to find verses by book, chapter, or phrase.</p>
      </div>
    </div>

    <div class="verses-header-right" style="display:flex; gap:0.5rem; align-items:center;">
      <Search bind:this={searchEl} placeholder="Search..." on:search={(e) => q = e.detail?.q ?? ""} compact={true} />
      <HomeButton />
    </div>
  </header>

  <section class="card verses-list" aria-label="Verses list">
    <div class="search-row">
      <div class="count">{filtered.length} reference{filtered.length === 1 ? '' : 's'}</div>
    </div>

    <ol class="refs" role="list">
      {#each filtered as v}
        <li class="ref-item" role="listitem">
          <h3 class="ref-title">{v.ref}</h3>
          <p class="ref-text">{v.text}</p>
        </li>
      {/each}
    </ol>

    {#if filtered.length === 0}
      <div class="empty muted">No references match your search.</div>
    {/if}
  </section>
</section>

<style>
  :root {
    --card-bg: #fff;
    --card-border: rgba(0,0,0,0.06);
    --accent: #7a4b2b;
    --muted: #6b7280;
    --shadow: 0 6px 18px rgba(20,20,20,0.04); 
    --title-font: "Lavishly Yours", cursive;
    --body-font: "Special Elite", monospace;
  }

  .container { max-width: 980px; margin: 0 auto; padding: 1rem; font-family: var(--body-font); }
  .card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 10px; padding: 0.85rem; box-shadow: var(--shadow); margin-bottom: 1rem; }

  .page-header h1 { margin: 0 0 0.25rem 0; font-family: var(--title-font); color: var(--toffee-1); }
  .lead { margin: 0 0 0.5rem 0; color: var(--toffee-1); }

  .verses-list .search-row { display:flex; gap:0.5rem; align-items:center; margin-bottom:0.6rem; }
  .count { color:var(--muted); font-size:0.95rem; }

  .refs { margin:0; padding-left:1.25rem; }
  .ref-item { margin-bottom:0.9rem; line-height:1.35; }
  .ref-title { margin:0 0 0.25rem 0; font-weight:700; color: var(--toffee-1); font-family:var(--title-font); font-size:2rem; }
  .ref-text { margin:0; color:var(--muted); }

  .verses-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem;
    border-radius: 10px;
    background: var(--card-bg, #fff);
    border: 1px solid var(--card-border, rgba(0,0,0,0.06));
    box-shadow: var(--shadow, 0 6px 18px rgba(20,20,20,0.04));
  }

  .verses-header-left { flex: 1 1 auto; min-width: 0; }
  .verses-header-right { flex: 0 0 auto; display:flex; align-items:center; }

  @media (max-width: 720px) {
    .verses-header { flex-direction: column; align-items: stretch; }
    .verses-header-right { justify-content: flex-start; margin-top: 0.5rem; }
  }
</style>
