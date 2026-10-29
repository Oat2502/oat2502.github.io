/* =====================================================================
   YOUR WEBSITE CONTENT — this is the only file you need to edit.
   =====================================================================

   HOW TO EDIT (the three rules):
   1. Text goes inside "double quotes".
   2. Every entry is a block in { curly brackets }, followed by a comma.
   3. To add a new paper / talk / project: copy an existing block
      (from { to },), paste it at the TOP of its list, change the text.

   Lists show newest first, in the order you write them.
   If you need a quote mark inside text, use ’ or “ ” (curly quotes).
   Lines starting with // are notes for you. They don't appear on the site.

   Made a typo? The site shows a red box saying which line to check.
   ===================================================================== */

window.SITE = {

  // ---- BASICS ---------------------------------------------------------
  name: "Otis Sloan Wood",
  role: "Architect & researcher",
  tagline: "Designing healthier environments, together with the people who use them.",
  location: "Copenhagen, Denmark",
  email: "obri@kglakademi.dk",
  updated: "October 2026",          // shown in the footer

  // Your name as it appears in author lists. These get highlighted in bold.
  myName: ["Otis Sloan Wood", "O. Sloan Wood", "Sloan Wood O"],

  // Photos: upload to the "images" folder, then write e.g. "images/portrait.jpg".
  // Leave as "" to show a drawing instead.
  portrait: "images/portrait.jpg",
  heroImage: "images/zanzibar-hospital.jpg",
  heroCaption: "Planting day in Chumbuni District Hospital in Zanzibar, where staff and other volunteers created their own waiting gardens to reduce overcrowding in waiting areas",

  // ---- CURRENT POSITIONS (top of the page) -----------------------------
  now: [
    { role: "Postdoctoral researcher", org: "Royal Danish Academy, Institute of Architecture and Technology", years: "2026 –" },
    { role: "Architect, MBD-Free project", org: "Zanzibar hospitals · with University of Copenhagen", years: "2022 –" },
    { role: "PhD, “Unbitten”", org: "Royal Danish Academy", years: "Defended 2026" },
  ],

  // ---- ABOUT (one string per paragraph) ---------------------------------
  // Tip: *word* becomes italic, and [text](https://link) becomes a link.
  about: [
    "I’m an architect and researcher at the Royal Danish Academy in Copenhagen. Since 2018 my work has focused on one question: how the built environment affects public health, mostly in sub-Saharan Africa.",
    "I lived and worked in Tanzania from 2018 to 2021, coordinating prototype housing for *Star Homes*, a large randomised trial on whether better-designed houses can reduce malaria and other diseases. My PhD, *Unbitten*, is part of the [MBD-Free project](https://publichealth.ku.dk/about-the-department/global/research/building-resilience-to-climate-sensitive-mosquito-borne-viral-diseases). It worked with staff and patients at four district hospitals in Zanzibar to co-create building and landscape changes that reduce mosquito-borne disease transmission.",
    "I’m most interested in the space between disciplines: how architects, entomologists and public-health professionals can design together, and how designers make decisions. I also make the visual material for my projects, including photography, film, drone work and drawings.",
  ],

  // ---- LINKS (shown in Contact) ----------------------------------------
  links: [
    { label: "LinkedIn",        url: "https://www.linkedin.com/in/otis-sloan-wood/" },
    { label: "Bluesky",         url: "https://bsky.app/profile/otissloanwood.bsky.social" },
    { label: "Research profile", url: "https://adk.elsevierpure.com/en/persons/otis-sloan-wood" },
    { label: "Royal Danish Academy", url: "https://royaldanishacademy.com/en/profile/1247" },
  ],

  // ---- PROJECTS --------------------------------------------------------
  // image: "images/yourphoto.jpg" (or "" for a placeholder)
  projects: [
    {
      title: "MBD-Free: mosquito-safe hospitals",
      years: "2022 – 2027",
      place: "Zanzibar, Tanzania",
      role: "Architect & PhD researcher",
      text: "A transdisciplinary project at four district hospitals that combines environmental monitoring, archival analysis, co-creation workshops and material practice. With staff and patients, we design building and landscape changes that reduce contact between people and mosquitoes.",
      image: "",
      link: "https://publichealth.ku.dk/about-the-department/global/research/building-resilience-to-climate-sensitive-mosquito-borne-viral-diseases",
    },
    {
      title: "Star Homes",
      years: "2018 – 2025",
      place: "Mtwara, Tanzania",
      role: "Architect, on-site coordination",
      text: "110 healthy homes with separate fly-proof latrines in 60 villages, built and tested in a randomised trial. The houses combine screened, raised and well-ventilated design with cleaner cooking and water.",
      image: "",
      link: "https://royaldanishacademy.com/en/case/star-homes",
    },
    {
      title: "Healthy Homes: Architecture as a Global Health Intervention",
      years: "2025",
      place: "Online course",
      role: "Co-author & producer",
      text: "The Royal Danish Academy’s first MOOC. It’s a free course on designing houses as health interventions, drawing on the Star Homes research.",
      image: "",
      link: "https://www.udemy.com/course/healthyhomes",
    },
  ],

  // ---- PUBLICATIONS ----------------------------------------------------
  // type must be one of: "Journal article", "Conference", "Thesis", "Other"
  // award: "" or a short text, e.g. "Outstanding Paper Award"
  publications: [
    {
      year: "2026",
      title: "Thermal comfort, ventilation and mosquito-borne disease risk in Zanzibar hospitals",
      authors: "O. Sloan Wood, J. B. Knudsen, K. L. Schiøler, E. Lupenza, M. Msellem, F. Saleh",
      venue: "Buildings & Cities, 7(1)",
      type: "Journal article",
      link: "https://doi.org/10.5334/bc.657",
      award: "",
    },
    {
      year: "2026",
      title: "Unbitten [add full thesis title]",
      authors: "O. Sloan Wood",
      venue: "PhD thesis, Royal Danish Academy",
      type: "Thesis",
      link: "",
      award: "",
    },
    {
      year: "2025",
      title: "Co-creating interventions to prevent mosquito-borne disease transmission in hospitals",
      authors: "O. Sloan Wood, E. Lupenza, D. M. Agnello, J. B. Knudsen, M. Msellem, K. L. Schiøler, F. Saleh",
      venue: "Buildings & Cities, 6(1), 819–840",
      type: "Journal article",
      link: "https://doi.org/10.5334/bc.636",
      award: "",
    },
    {
      year: "2025",
      title: "Community responses to a novel house design: A qualitative study of “Star Homes” in Mtwara, southeastern Tanzania",
      authors: "S. Mshamu, J. Meta, B. Adhikari, S. Halifa, A. Mmbando, H. Sloan Wood, O. Sloan Wood, T. Chevalier Bøjstrup, N. P. J. Day, S. W. Lindsay, J. Knudsen, J. Deen, L. von Seidlein, C. Pell",
      venue: "PLOS ONE, 20(1), e0309518",
      type: "Journal article",
      link: "https://doi.org/10.1371/journal.pone.0309518",
      award: "",
    },
    {
      year: "2025",
      title: "Healthy Homes: Architecture as a Global Health Intervention",
      authors: "J. B. Knudsen, O. Sloan Wood, H. Sloan Wood, T. Chevalier Bøjstrup, S. Mshamu, L. von Seidlein, J. Meta, C. Pell, J. Deen",
      venue: "Online course (MOOC), Udemy",
      type: "Other",
      link: "https://www.udemy.com/course/healthyhomes",
      award: "",
    },
    {
      year: "2024",
      title: "Thermal comfort, ventilation, and mosquito-borne disease risk: A preliminary field study of new hospitals in Zanzibar, Tanzania",
      authors: "O. Sloan Wood, J. B. Knudsen",
      venue: "Comfort at the Extremes (CATE 2024), Seville",
      type: "Conference",
      link: "",
      award: "Outstanding Paper",
    },
    {
      year: "2024",
      title: "Integrating vector control: A large language model chatbot for interdisciplinary design processes",
      authors: "O. Sloan Wood",
      venue: "Conference abstract",
      type: "Conference",
      link: "https://adk.elsevierpure.com/en/publications/integrating-vector-control-a-large-language-model-chatbot-for-int/",
      award: "",
    },
    {
      year: "2023",
      title: "Studying the health benefits of improved housing in rural Tanzania: challenges and progress",
      authors: "S. Mshamu, S. Halifa, J. Meta, A. Mmbando, S. W. Lindsay, F. Okumu, H. Sloan Wood, O. Sloan Wood, T. Chevalier Bøjstrup, N. P. J. Day, J. Knudsen, J. Deen, C. Pell, L. von Seidlein",
      venue: "Transactions of the Royal Society of Tropical Medicine and Hygiene, 117(10), 678–681",
      type: "Journal article",
      link: "https://doi.org/10.1093/trstmh/trad039",
      award: "",
    },
  ],

  // ---- TALKS, EXHIBITIONS & MEDIA --------------------------------------
  // type: "Talk", "Media", "Exhibition" or "Podcast"
  talks: [
    { date: "2026", type: "Media",   title: "Co-creating hospital waiting landscapes in Zanzibar", where: "", link: "" },
    { date: "Dec 2025", type: "Talk", title: "Climatic building design could reduce risk of mosquito-borne disease in hospitals facing rising temperatures", where: "", link: "" },
    { date: "Oct 2025", type: "Media", title: "Go’ morgen Danmark: Farlige myg bevæger sig mod Norden", where: "TV 2, with J. B. Knudsen", link: "" },
    { date: "Oct 2025", type: "Talk",  title: "Co-creating mosquito-safe environments", where: "", link: "https://adk.elsevierpure.com/da/activities/co-creating-mosquito-safe-environments/" },
    { date: "Sep 2023", type: "Media", title: "South to North: The construction industry must prepare for the threat of mosquito-borne diseases", where: "", link: "" },
    { date: "Jul 2023", type: "Talk",  title: "UIA World Congress of Architects", where: "Copenhagen", link: "" },
    { date: "2023", type: "Podcast", title: "Architecture and Extreme Environments: Superflex & Otis Sloan Wood", where: "CAFx Journal", link: "https://www.cafx.dk/post/architecture-and-extreme-environment-superflex-otis-sloan-wood" },
  ],

  // ---- TEACHING --------------------------------------------------------
  teaching: [
    { title: "Designers’ decision making: heuristic and naturalistic", where: "Royal Danish Academy", years: "" },
    { title: "Architecture and Extreme Environments (MA programme)", where: "Royal Danish Academy", years: "" },
    { title: "Healthy Homes: free online course", where: "Udemy", years: "2025" },
  ],

  // ---- AWARDS & ROLES --------------------------------------------------
  awards: [
    { year: "2026", title: "Peer review & editorial work, Cities & Health (journal)" },
    { year: "2025", title: "Buildings & Cities PhD Video Prize" },
    { year: "2024", title: "CATE Prize for Outstanding Paper, Comfort at the Extremes, Seville" },
  ],

};
