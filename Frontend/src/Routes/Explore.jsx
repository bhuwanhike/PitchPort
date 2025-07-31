import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { ArrowRight } from "lucide-react";
import { AuthContext } from "../contexts/auth-context";
import axios from "axios";
// A utility component for the glowing effect, makes the code cleaner
const Glow = () => (
  <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 opacity-0 blur transition duration-500 group-hover:opacity-75" />
);

const Explore = () => {
  const { isLoggedIn, setRole } = useContext(AuthContext);

  // Updated dummy data with more modern/abstract logos
  const fundedStartupsDemo = [
    {
      id: 1,
      name: "InnovateX Solutions",
      logo: "https://cdn.dribbble.com/userupload/12497042/file/original-1b4591f1a0e5f29987823f66299b66b7.jpg?resize=400x300&vertical=center",
      description: "Secured $2.5M Seed Round",
      investor: "Led by Horizon Ventures",
    },
    {
      id: 2,
      name: "GreenEnergy Co.",
      logo: "https://cdn.dribbble.com/userupload/12502690/file/original-3e580a97c36b856c8024223e7eda58c7.jpg?resize=400x300&vertical=center",
      description: "Raised $5M Series A",
      investor: "Powered by EcoFund",
    },
    {
      id: 3,
      name: "Aura AI",
      logo: "https://cdn.dribbble.com/userupload/12494191/file/original-65d1b7458117947171d9a04a58b88dbd.jpg?resize=400x300&vertical=center",
      description: "$1.8M Pre-Seed Funding",
      investor: "From Angel Syndicate",
    },
    {
      id: 4,
      name: "SynthWave Labs",
      logo: "https://cdn.dribbble.com/userupload/12499121/file/original-b9dcb0d201c10d7a0494a806c9a4055d.jpg?resize=400x300&vertical=center",
      description: "Closed $7M Series B",
      investor: "Backed by TechGrowth",
    },
    {
      id: 5,
      name: "DataDrive Analytics",
      logo: "https://cdn.dribbble.com/userupload/12489814/file/original-2726756819b16e100366b26c7e145821.jpg?resize=400x300&vertical=center",
      description: "Successfully acquired $3M",
      investor: "Funded by Innovation Capital",
    },
    {
      id: 6,
      name: "NextGen Software",
      logo: "https://cdn.dribbble.com/userupload/12501980/file/original-220025f8229a7569b4c13a0785161b96.jpg?resize=400x300&vertical=center",
      description: "Secured $4M Seed Round",
      investor: "Led by VenturePath",
    },
    {
      id: 7,
      name: "Quantum Leap",
      logo: "https://cdn.dribbble.com/userupload/12493902/file/original-2776c12c5b364491024bd35a4d702330.jpg?resize=400x300&vertical=center",
      description: "$1.5M Seed Funding",
      investor: "From Innovate Capital",
    },
  ];
  const [fundedStartups, setFundedStartups] = useState(fundedStartupsDemo);

  const getNEWS = async () => {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=("startup funding" OR "seed round" OR "series a" OR "startup investment") AND "India"&language=en&sortBy=publishedAt&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );
    // const response = {
    //   status: "ok",
    //   totalResults: 101,
    //   articles: [
    //     {
    //       source: {
    //         id: null,
    //         name: "GlobeNewswire",
    //       },
    //       author: "Research and Markets",
    //       title:
    //         "India Oncology Market Outlook to 2033 | Focus on Colorectal Cancer Screening Tests, EGFR Tests, KRAS Tests - Revenue Trends, Segment Volumes, Pricing, and Key Company Profiles",
    //       description:
    //         'Discover comprehensive insights with the "India Oncology Market Outlook to 2033" report. Covering key segments like Colorectal, EGFR, and BRCA Tests, the report offers data on market values, volumes, and prices from 2018-2033. Enhance your strategies with det…',
    //       url: "https://www.globenewswire.com/news-release/2025/07/22/3119655/28124/en/India-Oncology-Market-Outlook-to-2033-Focus-on-Colorectal-Cancer-Screening-Tests-EGFR-Tests-KRAS-Tests-Revenue-Trends-Segment-Volumes-Pricing-and-Key-Company-Profiles.html",
    //       urlToImage:
    //         "https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7",
    //       publishedAt: "2025-07-22T15:01:00Z",
    //       content:
    //         'Dublin, July 22, 2025 (GLOBE NEWSWIRE) -- The "India Oncology Market Outlook to 2033 - Colorectal Cancer Screening Tests, EGFR Tests, KRAS Tests and Others" report has been added to ResearchAndMarket… [+5525 chars]',
    //     },
    //     {
    //       source: {
    //         id: "business-insider",
    //         name: "Business Insider",
    //       },
    //       author: "Jacob Silverman",
    //       title:
    //         "The metamorphosis of Sequoia's Shaun Maguire: 'Never back down.'",
    //       description:
    //         "Shaun Maguire's posts about Zohran Mamdani shocked many. Not the people who know him.",
    //       url: "https://www.businessinsider.com/shaun-maguire-silicon-valleys-most-maga-firebrand-sequoia-mamdani-2025-7",
    //       urlToImage:
    //         "https://i.insider.com/68792041f748d8c055f5cdaa?width=1200&format=jpeg",
    //       publishedAt: "2025-07-22T08:11:01Z",
    //       content:
    //         "Shaun Maguire wanted New York City voters to know about the dangers ahead. On July 4, the general partner at the industry-leading Sequoia Capital posted on X that Democratic mayoral candidate Zohran … [+20418 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "Riya Sharma",
    //       title:
    //         "Info Edge’s bet on Eternal now makes up over a third of its market cap",
    //       description:
    //         "Info Edge India shares saw a surge following Eternal's earnings report. Eternal, parent company of Zomato and Blinkit, witnessed a rise in share value. This increased the value of Info Edge's stake in Eternal. The stake is now more than a third of Info Edge's…",
    //       url: "https://economictimes.indiatimes.com/markets/stocks/news/info-edges-bet-on-eternal-now-makes-up-over-a-third-of-its-market-cap/articleshow/122828191.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/msid-122828161,width-1200,height-630,imgsize-9382,overlay-etmarkets/articleshow.jpg",
    //       publishedAt: "2025-07-22T05:24:03Z",
    //       content:
    //         "Shares of Info Edge (India) rallied as much as 4.4% on Tuesday to Rs 1,465 on BSE, after the latest earnings-fuelled rally in Eternal, the parent company of Zomato and Blinkit, lifted the value of In… [+2465 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "PTI",
    //       title: "VC investments in India at $3.5-bn mark in Q2, 2025: KPMG",
    //       description:
    //         "Venture capital investments in India rose to USD 3.5 billion across 355 deals in Q2 2025, up from USD 2.8 billion in the previous quarter, according to KPMG. Key sectors drawing investor interest included fintech, healthtech, and logistics. India’s largest VC…",
    //       url: "https://economictimes.indiatimes.com/news/economy/indicators/vc-investments-in-india-at-3-5-bn-mark-in-q2-2025-kpmg/articleshow/122819957.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/msid-122819977,width-1200,height-630,imgsize-36360,overlay-economictimes/articleshow.jpg",
    //       publishedAt: "2025-07-21T17:19:46Z",
    //       content:
    //         "Venture Capital (VC) investments in India touched USD 3.5 billion across 355 deals in Q2 of 2025, warming up sequentially in value terms from USD 2.8 billion across 456 deals in March quarter, accord… [+1900 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "PTI",
    //       title:
    //         "VC investments in India at $3.5-billion mark in Q2, 2025: KPMG",
    //       description:
    //         "Venture capital investments in India rose to $3.5 billion across 355 deals in Q2 2025, up from $2.8 billion in Q1, signaling resilience amid global uncertainty, per KPMG. Fintech, healthtech, and logistics led activity, with PB Healthcare’s $218 million seed …",
    //       url: "https://economictimes.indiatimes.com/tech/technology/vc-investments-in-india-at-3-5-billion-mark-in-q2-2025-kpmg/articleshow/122819245.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-51342,resizemode-75,msid-122819245/tech/technology/vc-investments-in-india-at-3-5-billion-mark-in-q2-2025-kpmg.jpg",
    //       publishedAt: "2025-07-21T16:16:03Z",
    //       content:
    //         "Venture Capital (VC) investments in India touched $3.5 billion across 355 deals in Q2 of 2025, warming up sequentially in value terms from $2.8 billion across 456 deals in March quarter, according to… [+1825 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "New York Post",
    //       },
    //       author: "Michael Leboff",
    //       title:
    //         "India vs. England cricket preview: A guide to betting the Old Trafford Test",
    //       description:
    //         "There is no better time to give cricket a try than this week during India vs. England at Old Trafford.",
    //       url: "https://nypost.com/2025/07/21/betting/india-vs-england-cricket-preview-a-guide-to-betting-the-old-trafford-test/",
    //       urlToImage:
    //         "https://nypost.com/wp-content/uploads/sites/2/2025/07/indias-yashasvi-jaiswal-celebrates-half-107495810.jpg?quality=75&strip=all&w=1024",
    //       publishedAt: "2025-07-21T13:30:32Z",
    //       content:
    //         "Gambling content 21+. The New York Post may receive an affiliate commission if you sign up through our links. Read our editorial standards for more information.\r\nOn these shores, the middle of July i… [+3598 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Livemint",
    //       },
    //       author: "Sayantan Bera",
    //       title:
    //         "Inside Otipy’s crash and burn: How 10-minute delivery killed a 10-year dream",
    //       description:
    //         "Agri-tech startup Otipy, which had raised $44 million, shut its operations in May. The company ran out of cash after a $10 million fundraise, from a new investor, did not come through. What changed this investor’s mind?",
    //       url: "https://www.livemint.com/companies/blinkit-instamart-grofers-farm-produce-agri-tech-quick-commerce-zepto-kirana-otipy-agriculture-startups-11753087991560.html",
    //       urlToImage:
    //         "https://www.livemint.com/lm-img/img/2025/07/21/1600x900/Otipy_Pic_1753091224175_1753091226802_1753091267291.jpg",
    //       publishedAt: "2025-07-21T11:30:12Z",
    //       content:
    //         "New Delhi: Back in 2015, Varun Khurana, then 35, sold his year-old grocery delivery startup, MyGreenBox, to what is now known as Blinkit. Back then, it went by the name Grofers. Khurana, a computer s… [+15468 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ET Special",
    //       title:
    //         "Hyderabad to host debut ET Soonicorns Sundowner series: India’s product-first startup stars step into the spotlight",
    //       description:
    //         "The ET Soonicorns Sundowner series launches on July 31, 2025, with its first stop in Hyderabad, marking the inaugural city edition in a new spin-off from the flagship ET Soonicorns Summit 2025, which returns to Bengaluru this August. Hyderabad’s deeptech and …",
    //       url: "https://economictimes.indiatimes.com/tech/startups/hyderabad-to-host-debut-et-soonicorns-sundowner-series-indias-product-first-startup-stars-step-into-the-spotlight/articleshow/122807982.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-1379259,resizemode-75,msid-122807982/tech/startups/hyderabad-to-host-debut-et-soonicorns-sundowner-series-indias-product-first-startup-stars-step-into-the-spotlight.jpg",
    //       publishedAt: "2025-07-21T06:28:25Z",
    //       content:
    //         "Indias next unicorns arent just coming from the usual suspects anymore. The momentum is shifting. From deeptech disruptors building satellites to electric vehicle (EV) pioneers manufacturing batterie… [+6075 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "Sanjana B",
    //       title: "Chasing next-generation mega-trends",
    //       description:
    //         "Auxano Capital invests in tech-enabled, consumer-focused businesses with disruptive potential, emphasizing long-term leadership and market impact.",
    //       url: "https://www.thehindubusinessline.com/specials/emerging-entrepreneurs/chasing-next-generation-mega-trends/article69835865.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/yyti3m/article69835867.ece/alternates/LANDSCAPE_1200/BL2107_Sprk_QA.jpg",
    //       publishedAt: "2025-07-21T00:34:00Z",
    //       content:
    //         "Auxano Capital focuses on tech-enabled, consumer-oriented businesses with a potential for market disruption and long-term leadership. Brijesh Damodaran, Managing Partner, says the fund looks closely … [+2499 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Livemint",
    //       },
    //       author: "Sowmya Ramasubramanian",
    //       title:
    //         "W Health Ventures set to close $100–150 mn fund II for early-stage healthcare bets in India and US",
    //       description:
    //         "W Health is also witnessing a leadership churn. Namit Chugh, a principal at the firm, has resigned from the post and is currently serving his notice",
    //       url: "https://www.livemint.com/companies/start-ups/w-health-ventures-healthcare-venture-capital-healthtech-vc-india-us-healthcare-startups-early-stage-healthcare-11752817749552.html",
    //       urlToImage:
    //         "https://www.livemint.com/lm-img/img/2025/07/18/1600x900/g3957c3e069b2e493c11ad9008663df7a2e872e9ea0beefb35_1752821109399_1752821109581.jpg",
    //       publishedAt: "2025-07-18T07:39:06Z",
    //       content:
    //         "Bengaluru: Delhi-based venture capital firm W Health Ventures is likely to announce the first close of its second fund of $100 million in the coming weeks, according to two people aware of the develo… [+3517 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Livemint",
    //       },
    //       author: "Sowmya Ramasubramanian, Jessica Jani",
    //       title:
    //         "India has seen an explosion of fertility startups. Next up: deal spree",
    //       description:
    //         "At least 37 fertility ventures were founded between 2021 and 2025 as rising incomes make assisted reproduction services accessible to more Indians. Here's what these startups offer and who is chasing them…",
    //       url: "https://www.livemint.com/companies/start-ups/india-fertility-startups-rising-incomes-growing-infertility-investors-large-chains-indira-ivf-luma-inito-arva-11752656100023.html",
    //       urlToImage:
    //         "https://www.livemint.com/lm-img/img/2025/07/17/1600x900/2-0-72943410-clinical-research-4C-0_1681402123488_1752757981243.jpg",
    //       publishedAt: "2025-07-18T00:10:00Z",
    //       content:
    //         "Bengaluru/Mumbai: Indias growing incomes and falling fertility rate have birthed a new breed of startups looking to fill gaps and provide convenience in assisted reproduction services, drawing intere… [+7982 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "SiliconANGLE News",
    //       },
    //       author: "Mike Wheatley",
    //       title:
    //         "Indian startup QpiAI gets $32M to supercharge AI development with quantum computing",
    //       description:
    //         "QpiAI India Pvt. Ltd. is looking to establish its home nation as a leading light in the field of quantum computing-based artificial intelligence after bagging $32 million in a Series A round of funding. Today’s round was led by Avataar Ventures and saw partic…",
    //       url: "https://siliconangle.com/2025/07/17/indian-startup-qpiai-gets-32m-supercharge-ai-development-quantum-computing/",
    //       urlToImage:
    //         "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2025/07/Screenshot-from-2025-07-16-10-49-27.png",
    //       publishedAt: "2025-07-17T12:00:29Z",
    //       content:
    //         "QpiAI India Pvt. Ltd. is looking to establish its home nation as a leading light in the field of quantum computing-based artificial intelligence after bagging $32 million in a Series A round of fundi… [+5832 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Livemint",
    //       },
    //       author: "mint",
    //       title:
    //         "India’s craft chocolate revolution is taking a bite out of Lindt and Cadbury",
    //       description:
    //         "A new generation of artisanal chocolate makers is turning Indian cacao into luxury bars—and challenging the global giants’ long-held dominance.",
    //       url: "https://www.livemint.com/industry/india-craft-chocolate-vs-lindt-cadbury-global-brands-11752747099395.html",
    //       urlToImage:
    //         "https://www.livemint.com/lm-img/img/2025/07/17/1600x900/Ruby_Islam_Head_Chef_Manam_Chocolate_1752747896448_1752747916459_1752748159317.jpg",
    //       publishedAt: "2025-07-17T11:30:19Z",
    //       content:
    //         'Gurugram /Mysuru: Not Belgian. Not French. Not Swiss. This is Indian craft chocolate." Manam Chocolates tagline leaves little doubt about its distinctly homegrown origins, and it plays out in every c… [+14464 chars]',
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: null,
    //       title:
    //         "QpiAI raises USD 32 million (INR 279 crore) in Series-A round led by Avataar Ventures and National Quantum Mission",
    //       description:
    //         "QpiAI raises $32 million in Series A round to advance full-stack Quantum Computing technology globally.",
    //       url: "https://www.thehindubusinessline.com/brandhub/qpiai-raises-usd-32-million-inr-279-crore-in-series-a-round-led-by-avataar-ventures-and-national-quantum-mission/article69822047.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/2f5jbg/article69822067.ece/alternates/LANDSCAPE_1200/Article%202.jpg",
    //       publishedAt: "2025-07-17T09:10:58Z",
    //       content:
    //         "QpiAI raises $32 million (INR 279 cr) in Series A round led by Avataar Ventures and National Quantum mission of Department of Science and Technology, Government of India. Current investors and additi… [+3294 chars]",
    //     },
    //     {
    //       source: {
    //         id: "techcrunch",
    //         name: "TechCrunch",
    //       },
    //       author: "Jagmeet Singh",
    //       title:
    //         "India eyes global quantum computer push — and QpiAI is its chosen vehicle | TechCrunch",
    //       description:
    //         "QpiAI, an Indian startup that integrates AI and quantum computing for enterprise use cases, has raised $32 million in a new funding round co-led by the Indian government.",
    //       url: "https://techcrunch.com/2025/07/16/india-eyes-global-quantum-computer-push-and-qpiai-is-its-chosen-vehicle/",
    //       urlToImage:
    //         "https://techcrunch.com/wp-content/uploads/2025/07/qpiai-indus.jpg?resize=1200,800",
    //       publishedAt: "2025-07-16T20:55:07Z",
    //       content:
    //         "QpiAI, an Indian startup that claims to integrate AI and quantum computing for enterprise use cases, has raised $32 million in a new funding round co-led by the Indian government as the company aims … [+4610 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Yahoo Entertainment",
    //       },
    //       author: "Jagmeet Singh",
    //       title:
    //         "India eyes global quantum computer push — and QpiAI is its chosen vehicle",
    //       description:
    //         "QpiAI, an Indian startup that integrates AI and quantum computing for enterprise use cases, has raised $32 million in a new funding round co-led by the...",
    //       url: "https://finance.yahoo.com/news/india-eyes-global-quantum-computer-205401794.html",
    //       urlToImage:
    //         "https://s.yimg.com/ny/api/res/1.2/u8zE2c6_kDG0t0CICFTSOQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/techcrunch_finance_785/389c027e535da829d42228d7b557dd64",
    //       publishedAt: "2025-07-16T20:54:01Z",
    //       content:
    //         "Image Credits:QpiAI\r\nQpiAI, an Indian startup that claims to integrate AI and quantum computing for enterprise use cases, has raised $32 million in a new funding round co-led by the Indian government… [+4623 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ETtech",
    //       title:
    //         "Cybersecurity startup Deep Algorithm raises Rs 10.8 crore from Unicorn India Ventures",
    //       description:
    //         "The company, which focuses on fraud prevention in the finance sector, will use the fresh funds to scale engineering and threat intelligence teams, accelerate go-to-market activities in India and Southeast Asia, expand integrations with key enterprise platform…",
    //       url: "https://economictimes.indiatimes.com/tech/funding/cybersecurity-startup-deep-algorithm-raises-rs-10-8-crore-from-unicorn-india-ventures/articleshow/122586240.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-33952,resizemode-75,msid-122586240/tech/funding/cybersecurity-startup-deep-algorithm-raises-rs-10-8-crore-from-unicorn-india-ventures.jpg",
    //       publishedAt: "2025-07-16T17:13:58Z",
    //       content:
    //         "Deep Algorithm Solutions, a cybersecurity and artificial intelligence (AI) startup specialising in fraud prevention in digital financial systems, has raised its first seed round of Rs 10.8 crore from… [+2197 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Nofilmschool.com",
    //       },
    //       author: "Jason Hellerman",
    //       title: "Who Got The 2025 Emmy Awards Nominations?",
    //       description:
    //         "Happy Emmy nomination morning. The 77th Annual Emmy Awards were announced by actors Harvey Guillén and Brenda Song at the Television Academy's Wolf Theatre in Los AngelesSeverance led Emmy nominations with 27 nods this morning, and The Studio led comedy nomin…",
    //       url: "https://nofilmschool.com/2025-emmy-awards-nominations",
    //       urlToImage:
    //         "https://nofilmschool.com/media-library/image.jpg?id=34052589&width=1200&height=600&coordinates=0%2C97%2C0%2C97",
    //       publishedAt: "2025-07-15T17:01:01Z",
    //       content:
    //         "Happy Emmy nomination morning. The 77th Annual Emmy Awards were announced by actors Harvey Guillén and Brenda Song at the Television Academy's Wolf Theatre in Los AngelesSeverance led Emmy nomination… [+141112 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Forbes",
    //       },
    //       author:
    //         "Robert Rapier, Senior Contributor, \n Robert Rapier, Senior Contributor\n https://www.forbes.com/sites/rrapier/",
    //       title:
    //         "Why Natural Gas Is Still Thriving In A World Chasing Net Zero",
    //       description:
    //         "Global natural gas production and consumption hit record highs in 2024, led by the U.S., China, and LNG exports. Here's what the 2025 data reveals about the future.",
    //       url: "https://www.forbes.com/sites/rrapier/2025/07/15/why-natural-gas-is-still-thriving-in-a-world-chasing-net-zero/",
    //       urlToImage:
    //         "https://imageio.forbes.com/specials-images/imageserve/65b8072fd8f154d0fb6e50da/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    //       publishedAt: "2025-07-15T15:59:16Z",
    //       content:
    //         "CAMERON LOUISIANA - JUNE 7: A large liquified natural gas transport ship sits docked in the ... More Calcasieu River on Wednesday, June 7, 2023, near Cameron, La. (Jon Shapley/Houston Chronicle via G… [+7198 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ETtech",
    //       title:
    //         "Voice AI startup Navana AI raises Rs 7 crore in round led by Antler India",
    //       description:
    //         "Ajay Agarwal, Ronnie Screwvala, and Sandeep Singhal participated in the funding round. The fresh funds will be used by the company for its R&D activities and to scale its products.",
    //       url: "https://economictimes.indiatimes.com/tech/funding/voice-ai-startup-navana-ai-raises-rs-7-crore-in-round-led-by-antler-india/articleshow/122516906.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-23696,resizemode-75,msid-122516906/tech/funding/voice-ai-startup-navana-ai-raises-rs-7-crore-in-round-led-by-antler-india.jpg",
    //       publishedAt: "2025-07-15T14:42:45Z",
    //       content:
    //         "The voice AI startupNavana.ai raised Rs 7 crore in a pre-Series A, led by Antler India along with Ajay Agarwal, Ronnie Screwvala, and Sandeep Singhal.Navana.ai has developed three products -- a voice… [+1570 chars]",
    //     },
    //     {
    //       source: {
    //         id: "fortune",
    //         name: "Fortune",
    //       },
    //       author: "Allie Garfinkle",
    //       title:
    //         "North American VC assets under management are set to grow 38% in five years—slower than the previous five",
    //       description:
    //         "According to PitchBook, AUM in VC doubled between 2019 and 2024, and are projected to grow about 38% over the next five years.",
    //       url: "https://fortune.com/2025/07/15/north-american-vc-assets-under-management-are-set-to-grow-38-in-five-years-slower-than-the-previous-five/",
    //       urlToImage:
    //         "https://fortune.com/img-assets/wp-content/uploads/2025/01/GettyImages-1408769890-e1736999421247.jpg?resize=1200,600",
    //       publishedAt: "2025-07-15T11:19:55Z",
    //       content:
    //         "VCs are getting bigger. But you already knew thatone of the key narratives in the venture capital marketplace from the first day that I started covering the space, is that not only are VCs raising mo… [+8058 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Thefutoncritic.com",
    //       },
    //       author: null,
    //       title: "77th Emmy Awards Complete Nominations List",
    //       description:
    //         '"Andor," "The Diplomat," "The Last of Us," "Paradise," "The Pitt," "Severance," "Slow Horses," and "The White Lotus" will compete for Outstanding Drama Series.',
    //       url: "http://www.thefutoncritic.com/news/2025/07/15/77th-emmy-awards-complete-nominations-list-833115/20250715atas01/",
    //       urlToImage: null,
    //       publishedAt: "2025-07-15T09:00:00Z",
    //       content:
    //         "77th Emmy Awards Complete Nominations List\r\nOutstanding Animated ProgramArcane · The Dirt Under Your Nails · Netflix · A Riot Games and Fortiche production for Netflix\r\nChristian Linke, Executive Pro… [+152447 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Plos.org",
    //       },
    //       author:
    //         "Nannan Qian, Chengcheng Lu, Taohua Wei, Wenming Yang, Hui Han, Meixia Wang, Qiao Shi, Yulong Yang, Hu Xi, Wei He",
    //       title:
    //         "The global burden of stroke attributable to high alcohol use from 1990 to 2021: An analysis for the global burden of disease study 2021",
    //       description:
    //         "Background Stroke, a leading global cause of death and disability, has high alcohol consumption as a significant modifiable risk factor. Despite the known association, the global spatiotemporal burden and changing relationship between high alcohol use and str…",
    //       url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0328135",
    //       urlToImage:
    //         "https://journals.plos.org/plosone/article/figure/image?id=10.1371/journal.pone.0328135.g008&size=inline",
    //       publishedAt: "2025-07-14T14:00:00Z",
    //       content:
    //         "Introduction\r\nStroke, the second leading cause of death globally, is a clinical syndrome characterized by neurological deficits resulting from acute cerebrovascular lesions. It primarily comprises is… [+51462 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ET Special",
    //       title:
    //         "ET X Tracxn report on top soonicorns and minicorns across ten sectors: ET Soonicorns sundowner Hyderabad edition",
    //       description:
    //         "Attention: The comprehensive ‘ET Top Soonicorns and Minicorns X Top 10 Sectors AP-Telangana’ report to debut at inaugural ET Soonicorns Sundowner on July 31, 2025! Read on to learn more about the unveiling of this report at the inaugural ET Soonicorns Sundown…",
    //       url: "https://economictimes.indiatimes.com/tech/startups/et-x-tracxn-report-on-top-soonicorns-and-minicorns-across-ten-sectors-et-soonicorns-sundowner-hyderabad-edition/articleshow/122442625.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-1168357,resizemode-75,msid-122442625/tech/startups/et-x-tracxn-report-on-top-soonicorns-and-minicorns-across-ten-sectors-et-soonicorns-sundowner-hyderabad-edition.jpg",
    //       publishedAt: "2025-07-14T13:08:54Z",
    //       content:
    //         "The Economic Times, in collaboration with leading data intelligence platform Tracxn, announces the upcoming launch of its comprehensive ET Top Soonicorns and Minicorns X Top 10 Sectors Andhra Pradesh… [+7845 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "BL Chennai Bureau",
    //       title:
    //         "Unibose secures ₹5.5 crore to expand AI-powered industrial robots",
    //       description:
    //         "Unibose Tech raises ₹5.5 Cr in Pre-Series A to expand its Zone-0 robots for hazardous industries. Plans global scale-up and AI-driven inspection R&D.",
    //       url: "https://www.thehindubusinessline.com/news/unibose-secures-55-crore-to-expand-ai-powered-industrial-robots/article69810535.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/news/2tv5pl/article69810541.ece/alternates/LANDSCAPE_1200/Unibose.jpeg",
    //       publishedAt: "2025-07-14T11:24:07Z",
    //       content:
    //         "Unibose Technology, a Chennai-based deep-tech robotics company, has raised 5.5 Crores in a Pre-Series A round to scale its robotic solutions for hazardous and confined industrial environments.\r\nThe r… [+1237 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "BL Bengaluru Bureau",
    //       title:
    //         "Home decor start-up Vaaree raises $4.6 mn in pre-Series A round",
    //       description:
    //         "The funding round was led by PeerCapital, along with existing investors Peak XV’s Surge, All In Capital, and new investors Sattva Ventures and the Asian Paints family office",
    //       url: "https://www.thehindubusinessline.com/companies/home-decor-start-up-vaaree-raises-46-mn-in-pre-series-a-round/article69804343.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/hf2cdz/article69801530.ece/alternates/LANDSCAPE_1200/PO23_Money_bag.jpg",
    //       publishedAt: "2025-07-12T14:47:13Z",
    //       content:
    //         "Home decor marketplace Vaaree has raised $4.6 million in a preseries A round led by PeerCapital.\r\nThe funding round also saw participation from existing investors Peak XVs Surge, All In Capital, and … [+1205 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "TNN",
    //       title: "Vaaree raises $4.6 million to scale home décor platform",
    //       description:
    //         "India Business News: BENGALURU: Bengaluru-based home décor startup Vaaree has raised $4.6 million in a pre-Series A round led by PeerCapital, with participation from other.",
    //       url: "https://timesofindia.indiatimes.com/business/india-business/vaaree-raises-4-6-million-to-scale-home-dcor-platform/articleshow/122406189.cms",
    //       urlToImage:
    //         "https://static.toiimg.com/thumb/msid-122406257,width-1070,height-580,imgsize-1622077,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    //       publishedAt: "2025-07-12T12:54:32Z",
    //       content:
    //         "Marilyn Monroe's strongest quotes every woman must hear today",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "Bikash Singh",
    //       title:
    //         "STPI signs MoU with IICA to strengthen capacity building, advocacy and research initiatives",
    //       description:
    //         "Software Technology Parks of India (STPI) and Indian Institute of Corporate Affairs (IICA) have partnered through an MoU to boost capacity building, research, and advocacy. The collaboration aims to foster interdisciplinary learning and thought leadership in …",
    //       url: "https://economictimes.indiatimes.com/news/india/stpi-signs-mou-with-iica-to-strengthen-capacity-building-advocacy-and-research-initiatives/articleshow/122390037.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/msid-122390034,width-1200,height-630,imgsize-6902,overlay-economictimes/articleshow.jpg",
    //       publishedAt: "2025-07-11T13:24:06Z",
    //       content:
    //         "Software Technology Parks of India (STPI) and Indian Institute of Corporate Affairs (IICA) have signed a Memorandum of Understanding (MoU) to collaborate in the fields of capacity building, advocacy,… [+2475 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Bitrebels.com",
    //       },
    //       author: "Kate Kendler",
    //       title:
    //         "How Digital Risk Became The New Currency In India’s Online Gaming Space",
    //       description:
    //         "Online gaming in India has become more than a pastime. It now plays the role of a tech success story, investment magnet, and youth culture driver. According to EY-FICCI, India’s gaming sector has grown over 28 percent year-on-year since 2020, with mobile-firs…",
    //       url: "https://bitrebels.com/business/digital-risk-new-currency-indias-online-gaming-space/",
    //       urlToImage:
    //         "https://bitrebels.com/wp-content/uploads/2025/07/digital-risk-new-currency-indias-online-gaming-space-header-image.jpg",
    //       publishedAt: "2025-07-11T11:00:00Z",
    //       content:
    //         "Online gaming in India has become more than a pastime. It now plays the role of a tech success story, investment magnet, and youth culture driver.\r\nAccording to EY-FICCI, Indias gaming sector has gro… [+5909 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Forbes",
    //       },
    //       author:
    //         "Cat Wang, Forbes Staff, \n Cat Wang, Forbes Staff\n https://www.forbes.com/sites/catzxwang/",
    //       title: "Japanese VC Firm UTEC Launches $326 Million Fund",
    //       description:
    //         "UTEC is one of Japan’s largest science and technology-focused VCs, with a portfolio spanning more than 150 companies either originated from or backed by academic institutions.",
    //       url: "https://www.forbes.com/sites/catzxwang/2025/07/11/japanese-vc-firm-utec-launches-326-million-fund/",
    //       urlToImage:
    //         "https://imageio.forbes.com/specials-images/imageserve/6870d118b5ac42bdc318b3d2/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    //       publishedAt: "2025-07-11T09:30:23Z",
    //       content:
    //         "The UTEC team.\r\nCourtesy of UTEC\r\nThe University of Tokyo Edge Capital Partners (UTEC), a Japanese venture capital firm specializing in science and technology startups, has announced the close of its… [+3873 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "TNN",
    //       title:
    //         "Clean Fanatics raises $2 million in seed round led by Inflection Point Ventures",
    //       description:
    //         "Clean Fanatics, a premium home services marketplace, has secured $2 million in seed funding led by Inflection Point Ventures. The investment will fuel team growth, tech upgrades, and expansion into civil construction and home renovation. Currently serving 2,5…",
    //       url: "https://timesofindia.indiatimes.com/business/india-business/clean-fanatics-raises-2-million-in-seed-round-led-by-inflection-point-ventures/articleshow/122370184.cms",
    //       urlToImage:
    //         "https://static.toiimg.com/thumb/msid-122370218,width-1070,height-580,imgsize-2554142,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    //       publishedAt: "2025-07-10T16:07:37Z",
    //       content:
    //         "Kalahandi to Gadwal: Lesser-known saree weaving hidden gems in India",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "B  Baskar",
    //       title: "An Indian summer in England?",
    //       description:
    //         "At one Test apiece, a treat is in store for Test cricket fans",
    //       url: "https://www.thehindubusinessline.com/opinion/an-indian-summer-in-england/article69797402.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/1t3dm2/article69797401.ece/alternates/LANDSCAPE_1200/2025-07-06T161350Z_1689347760_UP1EL7619315C_RTRMADP_3_CRICKET-TEST-ENG-IND.JPG",
    //       publishedAt: "2025-07-10T15:57:26Z",
    //       content:
    //         "In the first two Tests of the ongoing India-England series, a total of 3,365 runs have been scored, of which India has scored 1,849. At 585, Indias captain Shubman Gill has scored almost 32 per cent … [+1663 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ETtech",
    //       title:
    //         "Saas fintech platform Arteria Technologies raises Rs 100 crore funding from ICICI Venture",
    //       description:
    //         "Founded in 2007 by Parag Sushilkumar Jain and Sriram Kanuri, the company offers upstream and downstream supply chain solutions to enterprises while acting as a technology partner for lending services in supply chain finance. The funding is a mix of primary an…",
    //       url: "https://economictimes.indiatimes.com/tech/funding/saas-fintech-platform-arteria-technologies-raises-rs-100-crore-funding-from-icici-venture/articleshow/122364309.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-24232,resizemode-75,msid-122364309/tech/funding/saas-fintech-platform-arteria-technologies-raises-rs-100-crore-funding-from-icici-venture.jpg",
    //       publishedAt: "2025-07-10T10:24:29Z",
    //       content:
    //         "Supply chain collaboration software-as-a-service (SaaS) and financing platform Arteria Technologies has raised Rs 100 crore from ICICI Venture, the investment arm of ICICI Bank, in a funding round.Th… [+1711 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Livemint",
    //       },
    //       author: "Sakshi Sadashiv",
    //       title:
    //         "Swiss PE firm Partners Group to acquire majority stake in Infinity Fincorp for $230 mn, outbids Advent and Creador",
    //       description:
    //         "Partners Group's deal includes a  ₹600 crore primary capital infusion and a secondary purchase of shares from existing shareholders, including Indium IV (Mauritius) Holdings",
    //       url: "https://www.livemint.com/companies/partners-group-nbfc-infinity-fincorp-msme-lending-advent-creador-11752129631874.html",
    //       urlToImage:
    //         "https://www.livemint.com/lm-img/img/2025/07/10/1600x900/g989600b573cd7148e97d72363beb1067be70a4ca2bd6f3221_1752131440698_1752131440838.jpg",
    //       publishedAt: "2025-07-10T07:38:33Z",
    //       content:
    //         "Swiss private equity firm Partners Group is set to acquire a majority stake in shadow lender Infinity Fincorp for 1,950 crore ($230 million), the companies said on Thursday.\r\nThe transaction includes… [+3105 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ETtech",
    //       title:
    //         "Partners Group to acquire majority stake in Infinity Fincorp for Rs 1,950 crore",
    //       description:
    //         "The deal, which includes participation from existing shareholder Jungle Ventures, comprises a primary infusion of Rs 600 crore ($70 million) and a secondary purchase of shares from Indium IV (Mauritius) Holdings and other shareholders. Infinity Fincorp plans …",
    //       url: "https://economictimes.indiatimes.com/tech/funding/partners-group-to-acquire-majority-stake-in-infinity-fincorp-for-rs-1950-crore/articleshow/122358709.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-12620,resizemode-75,msid-122358709/tech/funding/partners-group-to-acquire-majority-stake-in-infinity-fincorp-for-rs-1950-crore.jpg",
    //       publishedAt: "2025-07-10T06:45:06Z",
    //       content:
    //         "Swiss private equity firm Partners Group will acquire a majority stake in Infinity Fincorp Solutions, a Mumbai-based non-bank lender focused on MSMEs, through an investment of Rs 1,950 crore (around … [+2877 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "PTI",
    //       title:
    //         "IndiGo Ventures raises Rs 450 cr; invests in startup Jeh Aerospace",
    //       description:
    //         "IndiGo Ventures, the corporate venture capital arm of domestic carrier IndiGo, on Monday announced the first close of its maiden fund at Rs 450 crore.",
    //       url: "https://economictimes.indiatimes.com/markets/stocks/news/indigo-ventures-raises-rs-450-cr-invests-in-startup-jeh-aerospace/articleshow/122346121.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/msid-122346137,width-1200,height-630,imgsize-18642,overlay-etmarkets/articleshow.jpg",
    //       publishedAt: "2025-07-09T14:35:26Z",
    //       content:
    //         "IndiGo Ventures, the corporate venture capital arm of domestic carrier IndiGo, on Monday announced the first close of its maiden fund at Rs 450 crore.Besides, the company also announced the first inv… [+2610 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Skift",
    //       },
    //       author: "Peden Doma Bhutia",
    //       title:
    //         "IndiGo's Startup Investment Arm Picks Jeh Aerospace as First Bet",
    //       description:
    //         "IndiGo's investment in an aerospace startup is a sign that Indian aviation is slowly beginning to think about its long-term independence and technological depth. It signals a shift in how India might eventually build more of the parts that keep its skies movi…",
    //       url: "http://skift.com/2025/07/09/indigos-startup-investment-arm-picks-jeh-aerospace-as-first-bet/",
    //       urlToImage:
    //         "https://skift.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-09-at-19.09.45.jpeg?resize=1024,682",
    //       publishedAt: "2025-07-09T13:44:59Z",
    //       content:
    //         "IndiGo on Wednesday announced it has invested in Hyderabad-based startup Jeh Aerospace as its first bet through IndiGo Ventures, a fund aimed at backing early-stage startups in aviation and related i… [+2662 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Revinate.com",
    //       },
    //       author: "Karen Stephens",
    //       title: "Why regenerative tourism is the future of hospitality",
    //       description:
    //         "In this week’s episode of Hotel Moment, Aradhana Khowala, CEO of Aptamind Partners, joins Revinate CMO Karen Stephens with a sobering perspective on the state of hospitality and global tourism. Aradhana explains the ways hospitality has become “extractive” — …",
    //       url: "https://www.revinate.com/hotel-moment-podcast/why-regenerative-tourism-is-the-future-of-hospitality/",
    //       urlToImage:
    //         "https://www.hospitalitynet.org/picture/social_153185227.jpg?t=1752050432",
    //       publishedAt: "2025-07-09T10:42:00Z",
    //       content:
    //         "In this weeks episode of Hotel Moment, Aradhana Khowala, CEO of Aptamind Partners, joins Revinate CMO Karen Stephens with a sobering perspective on the state of hospitality and global tourism. Aradha… [+31061 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Forbes",
    //       },
    //       author:
    //         "Iain Martin, Forbes Staff, \n Iain Martin, Forbes Staff\n https://www.forbes.com/sites/iainmartin/",
    //       title:
    //         "Why A Top General Catalyst Partner Is Joining A Tiny Israel-Focused Fund",
    //       description:
    //         "Former General Catalyst partner Adam Valkin has joined Eric Reiner's Vine Ventures to back a new crop of Israeli startups.",
    //       url: "https://www.forbes.com/sites/iainmartin/2025/07/09/why-a-top-general-catalyst-partner-is-joining-a-tiny-israel-focused-fund/",
    //       urlToImage:
    //         "https://imageio.forbes.com/specials-images/imageserve/686d3ace567fcb77195e35ae/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    //       publishedAt: "2025-07-09T10:30:21Z",
    //       content:
    //         "Former General Catalyst partner Adam Valkin has joined Eric Reiner's Vine Ventures to back a new crop of Israeli startups.\r\nScott Wasserman\r\nAdam Valkin had his next act all mapped out. After a 12-ye… [+3811 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Washington Monthly",
    //       },
    //       author: "The Editors",
    //       title: "Feeding the World But Killing the Planet w/ Michael Grunwald",
    //       description:
    //         "Michael Grunwald explains how agriculture is devouring the planet—and why eating less beef, wasting less food, and rethinking our “natural” farming ideals are essential to fighting climate change.\nThe post Feeding the World But Killing the Planet w/ Michael G…",
    //       url: "http://washingtonmonthly.com/2025/07/09/feeding-the-world-but-killing-the-planet-w-michael-grunwald/",
    //       urlToImage:
    //         "https://washingtonmonthly.com/wp-content/uploads/2025/07/AP24187618289683-scaled.jpg",
    //       publishedAt: "2025-07-09T04:17:23Z",
    //       content:
    //         "Michael Grunwald, author of the new book, We Are Eating the Earth, speaks with Anne Kim and Bill Scher about the devastating environmental impacts of agriculture. Grunwald challenges conventional wis… [+21950 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ANI",
    //       title:
    //         "So good to see youngsters stand up and win: Sourav Ganguly hails team India after triumph over England",
    //       description:
    //         "Sourav Ganguly lauded Shubman Gill's leadership and the young Indian team's dominant performance against England in the second Test at Birmingham. Gill's batting prowess and Akash Deep's ten-wicket haul were instrumental in India's 336-run victory, leveling t…",
    //       url: "https://economictimes.indiatimes.com/news/sports/so-good-to-see-youngsters-stand-up-and-win-sourav-ganguly-hails-team-india-after-triumph-over-england/articleshow/122332802.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/msid-122332893,width-1200,height-630,imgsize-13136,overlay-economictimes/articleshow.jpg",
    //       publishedAt: "2025-07-09T03:58:11Z",
    //       content:
    //         "Former India captain Sourav Ganguly hailed the Shubman Gill-led side and praised the young players for their match-winning performance against England in the second Test of the five-match series. A h… [+3107 chars]",
    //     },
    //     {
    //       source: {
    //         id: "al-jazeera-english",
    //         name: "Al Jazeera English",
    //       },
    //       author: null,
    //       title: "Is Pakistan’s messaging on India convincing anyone?",
    //       description:
    //         "Journalist Sreenivasan Jain asks Pakistani MP Hina Rabbani Khar whether Islamabad's messaging is falling short.",
    //       url: "https://www.aljazeera.com/video/the-india-report/2025/7/8/is-pakistans-messaging-on-india-convincing-anyone",
    //       urlToImage:
    //         "https://www.aljazeera.com/wp-content/uploads/2025/07/NRL-2X04-RABBANI-WEB-THUMB-1751958093.jpg?resize=1920%2C1080&quality=80",
    //       publishedAt: "2025-07-08T07:30:00Z",
    //       content:
    //         "Journalist Sreenivasan Jain asks Pakistani MP Hina Rabbani Khar whether Islamabads messaging is falling short.India and Pakistan went to war in May this year. The military clashes have ceased, but th… [+622 chars]",
    //     },
    //     {
    //       source: {
    //         id: "al-jazeera-english",
    //         name: "Al Jazeera English",
    //       },
    //       author: null,
    //       title: "Is India really winning the narrative war with Pakistan?",
    //       description:
    //         "Journalist Sreenivasan Jain speaks with Indian MP Milind Deora about India's campaign to isolate Pakistan.",
    //       url: "https://www.aljazeera.com/video/the-india-report/2025/7/8/is-india-really-winning-the-narrative-war-with-pakistan",
    //       urlToImage:
    //         "https://www.aljazeera.com/wp-content/uploads/2025/07/NRL-2X03-DEORA-WEB-THUMB-1751958087.jpg?resize=1920%2C1080&quality=80",
    //       publishedAt: "2025-07-08T07:03:11Z",
    //       content:
    //         "Journalist Sreenivasan Jain speaks with Indian MP Milind Deora about Indias campaign to isolate Pakistan.India and Pakistan went to war in May this year. The military clashes have ceased, but the nar… [+619 chars]",
    //     },
    //     {
    //       source: {
    //         id: "techcrunch",
    //         name: "TechCrunch",
    //       },
    //       author: "Tage Kene-okafor",
    //       title:
    //         "UAE proptech Huspy raises $59M to scale in Europe | TechCrunch",
    //       description:
    //         "Huspy closes $59 million Series B to double down on operations across the Middle East and Europe, backed by Balderton Capital and Peak XV.",
    //       url: "https://techcrunch.com/2025/07/07/uae-proptech-huspy-raises-59m-to-scale-in-europe/",
    //       urlToImage:
    //         "https://techcrunch.com/wp-content/uploads/2025/07/IMG_1460.jpeg?w=1170",
    //       publishedAt: "2025-07-08T06:04:50Z",
    //       content:
    //         "If you walked into a Dubai bank to apply for a mortgage in 2020, chances are youd spend months buried in paperwork or face a huge price discrepancy when it came to listings. Such experiences led Jad … [+4027 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "Himanshi Lohchab",
    //       title:
    //         "AI infra firm RackBank gets land in Indore, Raipur for data centres",
    //       description:
    //         "RackBank plans to grow data centers in cities like Indore and Raipur. This move aims to cut operational costs significantly. The company recently launched NeevCloud, an AI cloud business. They acquired land in Indore and Raipur for new facilities. These proje…",
    //       url: "https://economictimes.indiatimes.com/tech/artificial-intelligence/ai-infra-firm-rackbank-gets-land-in-indore-raipur-for-data-centres/articleshow/122305380.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-23694,resizemode-75,msid-122305380/tech/artificial-intelligence/ai-infra-firm-rackbank-gets-land-in-indore-raipur-for-data-centres.jpg",
    //       publishedAt: "2025-07-08T00:30:00Z",
    //       content:
    //         "AI infrastructure startup RackBank is looking to expand data centres in tier-2 cities like Indore and Raipur to reduce its operational cost by 23x as compared to data centre hotspots like Mumbai, Che… [+2508 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Plos.org",
    //       },
    //       author:
    //         "Inês M. Luís, Mariana Parada, João B. Vicente, Isabel A. Abreu",
    //       title:
    //         "pET28g: A Golden Gate-compatible pET vector for protein expression in Escherichia coli, validated by production of functional human ACE2",
    //       description:
    //         "The pET28g plasmid is a new tool for protein expression in Escherichia coli. It was derived from pET28a by replacing the traditional multiple cloning site with a Golden Gate cassette containing the lacZα reporter gene. The assembly of pET28g is based on Golde…",
    //       url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0327341",
    //       urlToImage:
    //         "https://journals.plos.org/plosone/article/figure/image?id=10.1371/journal.pone.0327341.g006&size=inline",
    //       publishedAt: "2025-07-07T14:00:00Z",
    //       content:
    //         "Citation: Luís IM, Parada M, Vicente JB, Abreu IA (2025) pET28g: A Golden Gate-compatible pET vector for protein expression in Escherichia coli, validated by production of functional human ACE2. PLoS… [+40865 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "Rohan Das",
    //       title: "Backing innovators beyond the big cities",
    //       description:
    //         "NSRCEL at IIM-B supports start-ups nationwide with funding, mentorship, and guidance, focusing on social impact and non-urban entrepreneurs.",
    //       url: "https://www.thehindubusinessline.com/specials/emerging-entrepreneurs/backing-innovators-beyond-the-big-cities/article69780759.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/tkt6wj/article69780756.ece/alternates/LANDSCAPE_1200/BL0707_Spark_Lead_WSP%20Participents%20at%20WSP%20Santhe%201.jpg",
    //       publishedAt: "2025-07-06T15:12:36Z",
    //       content:
    //         "When Siji Mathew decided to launch a software-as-a-service start-up, all she had was a rough idea an early vision that would later grow into Insightdials, a business analytics platform for small and … [+6063 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "Global Desk",
    //       title:
    //         "Who is Soham Parekh? Silicon Valley’s secret star, who juggled multiple jobs without anyone knowing",
    //       description:
    //         "Soham Parekh has quickly become one of the most talked-about names in tech after it was revealed he secretly worked multiple jobs at once across Silicon Valley startups. Known as a serial moonlighter, Parekh was exposed after Playground AI CEO Suhail Doshi sh…",
    //       url: "https://economictimes.indiatimes.com/news/international/us/who-is-soham-parekh-silicon-valleys-secret-star-who-juggled-multiple-jobs-without-anyone-knowing/articleshow/122267377.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/msid-122267530,width-1200,height-630,imgsize-12642,overlay-economictimes/articleshow.jpg",
    //       publishedAt: "2025-07-05T12:05:33Z",
    //       content:
    //         "Soham Parekh, the serial moonlighter Silicon Valley startups cant stop hiring- Soham Parekh, a software engineer based in India, has recently become one of the most talked-about names in Silicon Vall… [+6678 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ET Online",
    //       title:
    //         "Badshah now sells pizza with Ghost, enters Domino’s turf with Badboy Pizza",
    //       description:
    //         "Badshah is entering India's QSR market with Badboy Pizza. It is a mass-premium pizza brand blending Indian and global flavors. The launch is in partnership with Ghost Kitchens India. They aim to open 50 outlets across India's metros in three years. The brand …",
    //       url: "https://economictimes.indiatimes.com/industry/cons-products/food/badshah-now-sells-pizza-with-ghost-enters-dominos-turf-with-badboy-pizza/articleshow/122266663.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/msid-122266810,width-1200,height-630,imgsize-108866,overlay-economictimes/articleshow.jpg",
    //       publishedAt: "2025-07-05T10:56:17Z",
    //       content:
    //         "Rapper and entrepreneur Badshah has forayed into Indias fast-growing quick service restaurant (QSR) space with the launch of Badboy Pizza, a mass-premium pizza brand that eh company said blends India… [+3622 chars]",
    //     },
    //     {
    //       source: {
    //         id: "al-jazeera-english",
    //         name: "Al Jazeera English",
    //       },
    //       author: null,
    //       title: "The New Red Line: Bilawal Bhutto on India’s new ‘abnormal’",
    //       description:
    //         "Is Pakistan legitimately able to claim that it no longer provides safe harbour to extremist groups that attack India?",
    //       url: "https://www.aljazeera.com/video/the-india-report/2025/7/4/the-new-red-line-bilawal-bhutto-on-indias-new",
    //       urlToImage:
    //         "https://www.aljazeera.com/wp-content/uploads/2025/07/image-1751621061.jpg?resize=1920%2C1080&quality=80",
    //       publishedAt: "2025-07-04T09:29:04Z",
    //       content:
    //         "India and Pakistan nuclear-armed neighbours have gone to war before. But a brief, intense battle in May this year marked a dramatic shift in their equations.\r\nIndia says it has drawn a new red line t… [+732 chars]",
    //     },
    //     {
    //       source: {
    //         id: "al-jazeera-english",
    //         name: "Al Jazeera English",
    //       },
    //       author: null,
    //       title:
    //         "The New Red Line: Shashi Tharoor on India’s stance vs Pakistan",
    //       description:
    //         "Does India have evidence to blame Pakistan for the attack in Kashmir?",
    //       url: "https://www.aljazeera.com/video/the-india-report/2025/7/4/the-new-red-line-shashi-tharoor-on-indias-stance-vs-pakistan",
    //       urlToImage:
    //         "https://www.aljazeera.com/wp-content/uploads/2025/07/image-1751620986.jpg?resize=1920%2C1080&quality=80",
    //       publishedAt: "2025-07-04T09:23:58Z",
    //       content:
    //         "India and Pakistan nuclear-armed neighbours have gone to war before. But a brief, intense battle in May this year marked a dramatic shift in their equations.\r\nIndia says it has drawn a new red line t… [+738 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "MIT Technology Review",
    //       },
    //       author: "Shadma Shaikh",
    //       title: "Inside India’s scramble for AI independence",
    //       description:
    //         "In Bengaluru, India, Adithya Kolavi felt a mix of excitement and validation as he watched DeepSeek unleash its disruptive language model on the world earlier this year. The Chinese technology rivaled the best of the West in terms of benchmarks, but it had bee…",
    //       url: "https://www.technologyreview.com/2025/07/04/1119705/inside-indias-scramble-for-ai-independence/",
    //       urlToImage:
    //         "https://wp.technologyreview.com/wp-content/uploads/2025/07/india-ai-sovreignity-c.jpg?resize=1200,600",
    //       publishedAt: "2025-07-04T08:15:07Z",
    //       content:
    //         "Under its compute program, the government is deploying more than 18,000 GPUs, including nearly 13,000 high-end H100 chips, to a select group of Indian startups that currently includes Sarvam, Upperwa… [+2127 chars]",
    //     },
    //     {
    //       source: {
    //         id: "techcrunch",
    //         name: "TechCrunch",
    //       },
    //       author: "Maxwell Zeff",
    //       title:
    //         "Who is Soham Parekh, the serial moonlighter Silicon Valley startups can't stop hiring? | TechCrunch",
    //       description:
    //         "Stories about Soham Parekh, a software engineer that simultaneously works at several startups, have gone viral in the last week. Who is he?",
    //       url: "https://techcrunch.com/2025/07/03/who-is-soham-parekh-the-serial-moonlighter-silicon-valley-startups-cant-stop-hiring/",
    //       urlToImage:
    //         "https://techcrunch.com/wp-content/uploads/2018/06/GettyImages-857205346.jpg?resize=1200,799",
    //       publishedAt: "2025-07-03T22:04:01Z",
    //       content:
    //         "In the last week, social media users have shared dozens of stories about encounters with Soham Parekh, a software engineer who seems to have been simultaneously working at multiple Silicon Valley sta… [+8245 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "GlobeNewswire",
    //       },
    //       author: "SNS Insider pvt ltd",
    //       title:
    //         "Microplastic Detection Market to USD 7.91 Billion by 2032, Owing to Rising Environmental Regulations and Health Risk Awareness | Research by SNS Insider",
    //       description:
    //         "The rapid increase in global microplastic contamination, particularly in food, water, and air, is compelling governments, industries, and research institutions to invest heavily in advanced microplastic detection technologies to protect both environmental and…",
    //       url: "https://www.globenewswire.com/news-release/2025/07/03/3109902/0/en/Microplastic-Detection-Market-to-USD-7-91-Billion-by-2032-Owing-to-Rising-Environmental-Regulations-and-Health-Risk-Awareness-Research-by-SNS-Insider.html",
    //       urlToImage:
    //         "https://ml.globenewswire.com/Resource/Download/d6272c2e-d204-41b8-b545-a6e2e24f85c2",
    //       publishedAt: "2025-07-03T14:00:00Z",
    //       content:
    //         "Austin, July 03, 2025 (GLOBE NEWSWIRE) -- The Microplastic Detection Market\r\n size was valued at USD 4.55 billion in 2023 and is expected to reach USD 7.91 billion by 2032, growing at a CAGR of 6.41%… [+7395 chars]",
    //     },
    //     {
    //       source: {
    //         id: "fortune",
    //         name: "Fortune",
    //       },
    //       author: "Jessica Mathews",
    //       title:
    //         "This founder has spent a decade building a multi-million-dollar spice company that is almost profitable. She still doesn’t want your venture capital dollars—at least not for now",
    //       description:
    //         "Sana Javeri Kadri has built a business around small farmers in India.",
    //       url: "https://fortune.com/2025/07/03/sana-javeri-kadri-diaspora-co-spices-startup-india/",
    //       urlToImage:
    //         "https://fortune.com/img-assets/wp-content/uploads/2025/07/200124_INDIA_GUNTAR_CHILIES_6293_GentilHyers-e1751543684644.jpg?resize=1200,600",
    //       publishedAt: "2025-07-03T11:56:16Z",
    //       content:
    //         "I reached out to founder Sana Javeri Kadri earlier this week, because I needed some answers. Its summertime here in Arkansas, I just bought a new grill, and I have been putting Diaspora Co. spices on… [+6106 chars]",
    //     },
    //     {
    //       source: {
    //         id: "fortune",
    //         name: "Fortune",
    //       },
    //       author: "Jessica Mathews",
    //       title:
    //         "This India-born founder built a multi-million-dollar spice company after seeing turmeric lattes in California coffee shops. This is how she did it",
    //       description:
    //         "Sana Javeri Kadri has built a business around small farmers in India.",
    //       url: "https://fortune.com/2025/07/03/diaspora-co-spices-india-startup-turmeric/",
    //       urlToImage:
    //         "https://fortune.com/img-assets/wp-content/uploads/2025/07/200124_INDIA_GUNTAR_CHILIES_6293_GentilHyers.jpg?resize=1200,600",
    //       publishedAt: "2025-07-03T11:25:00Z",
    //       content:
    //         "Sana Javeri Kadri, founder and CEO of the spice distribution startup Diaspora Company, didnt have any grandiose plans of building a multi-million spice company when she hopped off the BART in 2016 an… [+6127 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "The Times Of India",
    //       title:
    //         "IND vs ENG Live: Shubman Gill, Ravindra Jadeja set to extend India's advantage",
    //       description:
    //         "India vs England Live Score, 2nd Test Match Day 2: India captain Shubman Gill delivered another exceptional performance with an unbeaten 114, anchori",
    //       url: "https://timesofindia.indiatimes.com/sports/cricket/ind-vs-eng-live-score-today-cricket-match-india-vs-england-2nd-test-match-day-2-scorecard-rain-weather-shubman-gill-rishabh-pant-kl-rahul-ben-stokes/liveblog/122221766.cms",
    //       urlToImage:
    //         "https://static.toiimg.com/thumb/msid-122221766,width-1070,height-580,imgsize-160570,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    //       publishedAt: "2025-07-03T07:04:22Z",
    //       content:
    //         "India's decision to rest pace spearhead Jasprit Bumrah for the second Test against England at Edgbaston has stirred debate, with head coach Gautam Gambhir coming under scrutiny from several former pl… [+857 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "AJ Vinayak",
    //       title:
    //         "Ugaoo targets ‘clicks-and-bricks’ approach to grow the urban gardening market",
    //       description:
    //         "Ugaoo, a houseplants and urban gardening company that began its journey as an online marketplace in 2016, is expanding into the brick-and-mortar segment with plans to open over 80 retail outlets by 2029-30.",
    //       url: "https://www.thehindubusinessline.com/economy/agri-business/ugaoo-targets-clicks-and-bricks-approach-to-grow-the-urban-gardening-market/article69767103.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/markets/commodities/ipag0k/article69767098.ece/alternates/LANDSCAPE_1200/Siddhant%20Bhalinge.jpg",
    //       publishedAt: "2025-07-03T06:49:08Z",
    //       content:
    //         "Ugaoo, a houseplants and urban gardening company that began its journey as an online marketplace in 2016, is expanding into the brick-and-mortar segment with plans to open over 80 retail outlets by 2… [+4733 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "PTI",
    //       title: "India eye maiden women's T20I series victory over England",
    //       description:
    //         "India is on the cusp of a historic T20I series victory against England, leading 2-0 after dominant performances in the first two matches. Smriti Mandhana, Harleen Deol, Amanjot Kaur, and Jemimah Rodrigues have starred with the bat, while Sree Charani has impr…",
    //       url: "https://economictimes.indiatimes.com/news/sports/india-eye-maiden-womens-t20i-series-victory-over-england/articleshow/122220463.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/msid-122220476,width-1200,height-630,imgsize-46928,overlay-economictimes/articleshow.jpg",
    //       publishedAt: "2025-07-03T06:06:31Z",
    //       content:
    //         "Riding a wave of momentum, India will look to secure their maiden women's T20I series triumph over England when they lock horns with the hosts in the third game of a five-match series here on Friday.… [+2679 chars]",
    //     },
    //     {
    //       source: {
    //         id: "abc-news-au",
    //         name: "ABC News (AU)",
    //       },
    //       author: "ABC News",
    //       title:
    //         "India on top after day one following surprise decision to rest Bumrah",
    //       description:
    //         "India's Shubman Gill played a masterful captain's knock for his second century of the series against England at Edgbaston.",
    //       url: "https://www.abc.net.au/news/2025-07-03/england-india-second-test-day-one-gill-century-bumrah-rested/105488782",
    //       urlToImage:
    //         "https://live-production.wcms.abc-cdn.net.au/9062aa589edae62533d1d0dd0db23a1b?impolicy=wcms_watermark_news&cropH=1294&cropW=2300&xPos=0&yPos=144&width=862&height=485&imformat=generic",
    //       publishedAt: "2025-07-02T21:48:57Z",
    //       content:
    //         "India's Shubman Gill has played a masterful captain's knock for his second century of the series on the opening day of the second Test against England as the tourists recovered to finish on 5-310 at … [+3836 chars]",
    //     },
    //     {
    //       source: {
    //         id: "al-jazeera-english",
    //         name: "Al Jazeera English",
    //       },
    //       author: "Al Jazeera Staff",
    //       title:
    //         "Gill and India dominate England on the first day of second Test",
    //       description:
    //         "India close on 310-5 on Day One of the second Test against England as captain Shubam Gill hits second century of series.",
    //       url: "https://www.aljazeera.com/sports/2025/7/2/gill-and-india-dominate-england-on-the-first-day-of-second-test",
    //       urlToImage:
    //         "https://www.aljazeera.com/wp-content/uploads/2025/07/GettyImages-2223255247-1751478768.jpg?resize=1920%2C1440",
    //       publishedAt: "2025-07-02T18:36:26Z",
    //       content:
    //         "Indias Shubman Gill played a masterful captains knock to rescue India with his second century of the series on the opening day of the second Test against England as the tourists finished on 310-5 at … [+3419 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Packaging-gateway.com",
    //       },
    //       author: "GlobalData",
    //       title:
    //         "Bambrew secures $10.3m in funding to boost eco-friendly packaging",
    //       description:
    //         "The company aims to use the funding to expand from the B2B into the DTC market.",
    //       url: "https://www.packaging-gateway.com/news/bambrew-secures-funding-boost-packaging/",
    //       urlToImage:
    //         "https://s.yimg.com/ny/api/res/1.2/nu1Kp2dkwM6SqIyzUMyQMw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/packaging_gateway_559/f07b5ccca3c005b23c254bbf1fc57389",
    //       publishedAt: "2025-07-02T15:16:14Z",
    //       content:
    //         "Indian sustainable packaging startup Bambrew has secured Rs90 crore ($10.3m) in a recent funding round.\r\nThe investment was spearheaded by Ashok Goel, previously managing director at Essel Propack. J… [+1811 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "CNA",
    //       },
    //       author: null,
    //       title: "Stokes denies Jaiswal century as India advance to 182-3",
    //       description:
    //         "BIRMINGHAM, England :India reached 182-3 at tea on the opening day of the second test against England at Edgbaston on Wednesday after opening batter Yashasvi Jaiswal fell short of what would have been his second century of the series.Resuming on 98-2 after lu…",
    //       url: "https://www.channelnewsasia.com/sport/stokes-denies-jaiswal-century-india-advance-182-3-5216186",
    //       urlToImage:
    //         "https://dam.mediacorp.sg/image/upload/s--m_npy2Me--/fl_relative,g_south_east,l_mediacorp:cna:watermark:2024-04:reuters_1,w_0.1/f_auto,q_auto/c_fill,g_auto,h_676,w_1200/v1/one-cms/core/2025-07-02t123111z_1_lynxmpel610j9_rtroptp_3_cricket-test-eng-ind.jpg?itok=FPmMm6cA",
    //       publishedAt: "2025-07-02T10:07:31Z",
    //       content:
    //         "BIRMINGHAM, England :India reached 182-3 at tea on the opening day of the second test against England at Edgbaston on Wednesday after opening batter Yashasvi Jaiswal fell short of what would have bee… [+2272 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Deadline",
    //       },
    //       author: "Erik Pedersen",
    //       title:
    //         "2025 Premiere Dates For New & Returning Series On Broadcast, Cable & Streaming",
    //       description:
    //         "Welcome to Deadline’s annual list of premiere dates for new and returning TV series. The roster covers hundreds of broadcast, cable and streaming programs debuting throughout 2025, including many still listed as TBA (to be announced). It includes series premi…",
    //       url: "http://deadline.com/2025/07/2025-tv-premiere-dates-1235811038/",
    //       urlToImage:
    //         "https://deadline.com/wp-content/uploads/2024/11/Premiere-Dates-2025.jpg?w=1024",
    //       publishedAt: "2025-07-02T09:21:00Z",
    //       content:
    //         "Welcome to Deadline’s annual list of premiere dates for new and returning TV series. \r\nThe roster covers hundreds of broadcast, cable and streaming programs debuting throughout 2025, including many s… [+73020 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Plos.org",
    //       },
    //       author:
    //         "Hironori Uehara, Baila Shakaib, Sangeetha Ravi Kumar, Bonnie Archer, Balamurali Ambati",
    //       title:
    //         "Copper supplementation enhances pigmentation and induces dopamine production in ARPE19",
    //       description:
    //         "Non-neuronal dopamine production has not been understood despite dopamine function in non-neuronal tissues. Tyrosinase is a non-neuronal enzyme which converts tyrosine to L-DOPA (l-3,4-dihydroxyphenylalanine) and L-DOPA to l-dopaquinone for further melanin pr…",
    //       url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0327352",
    //       urlToImage:
    //         "https://journals.plos.org/plosone/article/figure/image?id=10.1371/journal.pone.0327352.g006&size=inline",
    //       publishedAt: "2025-07-01T14:00:00Z",
    //       content:
    //         "Abstract\r\nNon-neuronal dopamine production has not been understood despite dopamine function in non-neuronal tissues. Tyrosinase is a non-neuronal enzyme which converts tyrosine to L-DOPA (l-3,4-dihy… [+23904 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Forbes",
    //       },
    //       author:
    //         "Danielle Chemtob, Forbes Staff, \n Danielle Chemtob, Forbes Staff\n https://www.forbes.com/sites/daniellechemtob/",
    //       title:
    //         "Forbes Daily: Elon Musk And Trump Reignite Feud Over Spending Bill",
    //       description:
    //         "Today’s Forbes Daily covers the latest ranking of the world's richest, Mamdani's billionaire blowback continues, Trump sues L.A., F1 tops box office charts and more.",
    //       url: "https://www.forbes.com/sites/daniellechemtob/2025/07/01/forbes-daily-elon-musk-and-trump-reignite-feud-over-spending-bill/",
    //       urlToImage:
    //         "https://imageio.forbes.com/specials-images/imageserve/6863d0595e957a09f1c44b70/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    //       publishedAt: "2025-07-01T12:13:38Z",
    //       content:
    //         "Warren Buffett made his biggest annual donation in nearly 20 years this weekend.\r\nThe billionaire investor gifted $6 billion in Berkshire Hathaway shares to five charities: most went to the Bill &amp… [+6952 chars]",
    //     },
    //     {
    //       source: {
    //         id: "fortune",
    //         name: "Fortune",
    //       },
    //       author: "Allie Garfinkle",
    //       title:
    //         "Exclusive: Ambrook raises $26.1 million Series A to provide farmers and ranchers with better accounting software",
    //       description:
    //         "Founded in 2021, Ambrook has raised a $26.1 million Series A, led by Thrive Capital and Dylan Field, Fortune has exclusively learned.",
    //       url: "https://fortune.com/2025/07/01/exclusive-ambrook-raises-26-1-million-series-a-to-provide-farmers-and-ranchers-with-better-accounting-software/",
    //       urlToImage:
    //         "https://fortune.com/img-assets/wp-content/uploads/2025/06/ambrook-founders14-e1751327318294.jpg?resize=1200,600",
    //       publishedAt: "2025-07-01T11:28:24Z",
    //       content:
    //         "When I meet Chase Crandall, hes putting up a barbed wire fence. Even on Zoom, the Wyoming sky is clearly in the background, with an expanse of ranch land stretching out into the distance. Crandall is… [+10044 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Forbes",
    //       },
    //       author:
    //         "Robert Rapier, Senior Contributor, \n Robert Rapier, Senior Contributor\n https://www.forbes.com/sites/rrapier/",
    //       title:
    //         "2025 Energy Review: Why Global Carbon Emissions Are Still Climbing",
    //       description:
    //         "Despite record investments in renewables, global carbon emissions just hit an all-time high. I break down which countries are driving this growth, and which aren't.",
    //       url: "https://www.forbes.com/sites/rrapier/2025/07/01/2025-energy-review-why-global-carbon-emissions-are-still-climbing/",
    //       urlToImage:
    //         "https://imageio.forbes.com/specials-images/imageserve/64c93603db9320335469db63/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    //       publishedAt: "2025-07-01T10:00:00Z",
    //       content:
    //         "The Bao Steel mill in the morning, in Baotou, Inner Mongolia, China. Baotou is an excellent example ... More of a one-industry town, and that industry is steel. Baotou is also notorious as a big poll… [+7090 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "BL New Delhi Bureau",
    //       title:
    //         "Insect farming start-up Loopworm raises $3.25 m in pre-series A round",
    //       description:
    //         "Loopworm, a Bengaluru-based biomanufacturing company developing insect-derived proteins, has raised $3.25 million Pre-Series A funding round.",
    //       url: "https://www.thehindubusinessline.com/economy/agri-business/insect-farming-start-up-loopworm-raises-325-m-in-pre-series-a-round/article69758782.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/abgubn/article69758778.ece/alternates/LANDSCAPE_1200/Image%20of%20Mr%20Abhi%20Gawri%20Co-Founder%20of%20Loopworm%20and%20Mr%20Ankit%20Alok%20Bagaria%20Co-founder%20and%20CEO%20of%20Loopworm.jpg",
    //       publishedAt: "2025-07-01T07:12:26Z",
    //       content:
    //         "Loopworm, a Bengaluru-based biomanufacturing company developing insect-derived proteins, has raised $3.25 million Pre-Series A funding round. The latest funding was led by WaterBridge Ventures, an ex… [+3278 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Livemint",
    //       },
    //       author: "Rwit Ghosh",
    //       title: "English learning startup SpeakX looks to raise $15 million",
    //       description:
    //         "SpeakX, a voice-first learning platform that uses AI to teach conversational English, will use the funds for expanding its engineering team and product development.",
    //       url: "https://www.livemint.com/companies/start-ups/english-learning-startup-speakx-looks-to-raise-15-million-11751345238766.html",
    //       urlToImage:
    //         "https://www.livemint.com/lm-img/img/2025/07/01/1600x900/2-0-816959055-481904104-0_1679562459759_1751353259758.jpg",
    //       publishedAt: "2025-07-01T07:05:04Z",
    //       content:
    //         "English language learning startup SpeakX is looking to raise a new round of capital of up to $15 million, two people familiar with the matter told Mint.\r\nExisting investor Elevation Capital has alrea… [+2433 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "GlobeNewswire",
    //       },
    //       author: "AstuteAnalytica India Pvt. Ltd.",
    //       title:
    //         "Global Cybersecurity Market to Worth Over US$ 723.8 Billion By 2033 | North America Dominates, Asia-Pacific Accelerates, Europe Consolidates, Emerging Markets Awaken Says Astute Analytica",
    //       description:
    //         "Global cybersecurity market is expanding steadily, driven by relentless digital transformation and escalating threat sophistication. Compliance demands and hybrid working patterns further fuel enterprise investment, shifting procurement toward integrated, ser…",
    //       url: "https://www.globenewswire.com/news-release/2025/06/30/3107676/0/en/Global-Cybersecurity-Market-to-Worth-Over-US-723-8-Billion-By-2033-North-America-Dominates-Asia-Pacific-Accelerates-Europe-Consolidates-Emerging-Markets-Awaken-Says-Astute-Analytic.html",
    //       urlToImage:
    //         "https://ml.globenewswire.com/Resource/Download/a77988df-ad1a-4619-9a4e-367c858dc70e",
    //       publishedAt: "2025-06-30T15:30:00Z",
    //       content:
    //         "Chicago, June 30, 2025 (GLOBE NEWSWIRE) -- The global cybersecurity market was valued at US$ 233.4 billion in 2024 and is expected to reach US$ 723.8 billion by 2033, growing at a CAGR of 13.40% duri… [+17217 chars]",
    //     },
    //     {
    //       source: {
    //         id: "business-insider",
    //         name: "Business Insider",
    //       },
    //       author: "Geoff Weiss",
    //       title:
    //         "AI startup Airial turns travel TikToks into bookable itineraries. Read its pitch deck that helped it land $3 million.",
    //       description:
    //         "AI startup Airial Travel has raised $3 million in seed funding to turn aspirational social media content into tangible vacation plans.",
    //       url: "https://www.businessinsider.com/airial-ai-startup-raises-3-million-tiktoks-travel-plans-2025-6",
    //       urlToImage:
    //         "https://i.insider.com/685ee57af748d8c055f48e84?width=1200&format=jpeg",
    //       publishedAt: "2025-06-30T09:00:01Z",
    //       content:
    //         "Archit Karandikar and Sanjeev Shenoy cofounded Airial Travel, which closed $3 million in seed funding.Airial Travel\r\n\u003Cul\u003E\u003Cli\u003EAirial Travel uses AI to transform aspirational social content into vacati… [+2454 chars]",
    //     },
    //     {
    //       source: {
    //         id: "techcrunch",
    //         name: "TechCrunch",
    //       },
    //       author: "Connie Loizos",
    //       title:
    //         "Why AI will eat McKinsey's lunch -- but not today | TechCrunch",
    //       description:
    //         "Navin Chaddha, managing director of the 55-year-old Silicon Valley venture firm Mayfield, is betting big on AI's ability to transform people-heavy",
    //       url: "https://techcrunch.com/2025/06/29/why-ai-will-eat-mckinseys-lunch-but-not-today/",
    //       urlToImage:
    //         "https://techcrunch.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-9.04.34PM.png?resize=1200,949",
    //       publishedAt: "2025-06-30T04:11:35Z",
    //       content:
    //         "Navin Chaddha, managing director of the 55-year-old Silicon Valley venture firm Mayfield, is betting big on AI’s ability to transform people-heavy industries like consulting, law, and accounting. The… [+9601 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Livemint",
    //       },
    //       author: "Sowmya Ramasubramanian",
    //       title:
    //         "Wipro’s consumer VC arm tweaks investment strategy as startup ecosystem matures",
    //       description:
    //         "Capping investors’ shareholding to 20% will allow founders to have more skin in the game, thereby boosting efficiency and morale, according to Wipro Consumer Care Ventures’ Sumit Keshan.",
    //       url: "https://www.livemint.com/companies/start-ups/wipro-consumer-care-ventures-investment-strategy-d2c-startup-funding-goofy-tails-ustraa-sumit-keshan-11751178934642.html",
    //       urlToImage:
    //         "https://www.livemint.com/lm-img/img/2025/06/29/1600x900/Sumit_Keshan_wipro_1751216997303_1751217005301_1751217090073.jpg",
    //       publishedAt: "2025-06-30T00:20:09Z",
    //       content:
    //         "Bengaluru: Wipro Consumer Care Ventures, the venture capital arm of Wipro Consumer Care and Lighting, is shifting its investment approach to focus on more mature consumer startups, as Indias startup … [+3758 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "PR Newswire UK",
    //       },
    //       author: null,
    //       title:
    //         'TV Anime "Jaadugar: A Witch in Mongolia" First Super Teaser Visual Revealed!',
    //       description:
    //         'Panel Confirmed at Anime Expo 2025, Broadcast set for 2026 TOKYO , June 28, 2025 /PRNewswire/ -- Award-winning historical manga by Tomato Soup, "A Witch\'s Life in Mongol"—which recently made headlines with its anime adaptation announcement—will officially air…',
    //       url: "https://www.prnewswire.co.uk/news-releases/tv-anime-jaadugar-a-witch-in-mongolia-first-super-teaser-visual-revealed-302493862.html",
    //       urlToImage:
    //         "https://mma.prnewswire.com/media/2721099/Jaadugar_A_Witch_in_Mongolia_Logo.jpg?p=facebook",
    //       publishedAt: "2025-06-28T16:17:00Z",
    //       content:
    //         'Panel Confirmed at Anime Expo 2025, Broadcast set for 2026\r\nTOKYO , June 28, 2025 /PRNewswire/ -- Award-winning historical manga by Tomato Soup, "A Witch\'s Life in Mongol"which recently made headline… [+4398 chars]',
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "Nishtha Awasthi",
    //       title:
    //         "F&O Radar| Nifty futures rollover climbs to 79.53%, signals trader confidence ahead: Sudeep Shah",
    //       description:
    //         "The squeeze sets the stage—the breakout steals the show. For 31 trading sessions, the Nifty moved in a narrow consolidation range, building silent pressure with every passing day.",
    //       url: "https://economictimes.indiatimes.com/markets/expert-view/fo-radar-nifty-futures-rollover-climbs-to-79-53-signals-trader-confidence-ahead-sudeep-shah/articleshow/122128227.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/msid-122128251,width-1200,height-630,imgsize-347856,overlay-etmarkets/articleshow.jpg",
    //       publishedAt: "2025-06-28T09:36:46Z",
    //       content:
    //         "Markets finally broke out of their five-week-long consolidation phase, supported by improving global sentiment, easing geopolitical tensions, and renewed buying interest from foreign institutional in… [+9741 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Skift",
    //       },
    //       author: "Justin Dawes",
    //       title:
    //         "Regional Air Travel Startups Raise Over $85 Million: Funding Roundup",
    //       description:
    //         "Six travel startups raised more than $100 million in the last week. The majority was by startups seeking to modernize regional air travel.",
    //       url: "http://skift.com/2025/06/27/regional-air-travel-startups-raise-over-85-million-funding-roundup/",
    //       urlToImage:
    //         "https://skift.com/wp-content/uploads/2025/06/Mokulele-Plane-in-Flight1.jpg.jpeg?resize=1024,680",
    //       publishedAt: "2025-06-27T20:45:00Z",
    //       content:
    //         "One big theme for travel startups this week is regional air travel. \r\nThree companies raised money toward their efforts to modernize various aspects of the industry, from software to aircraft themsel… [+5329 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Hyperallergic",
    //       },
    //       author: "Maya Pontone",
    //       title:
    //         "Rosalind Fox Solomon, Photographer of Lived Experience, Dies at 95",
    //       description:
    //         "Her unflinching gaze, which garnered both criticism and praise, confronted some of the most momentous and often painful chapters in global human history.",
    //       url: "http://hyperallergic.com/1023271/rosalind-fox-solomon-photographer-of-lived-experience-dies-at-95/",
    //       urlToImage:
    //         "https://hyperallergic-newspack.s3.amazonaws.com/uploads/2025/06/rosalind.jpg",
    //       publishedAt: "2025-06-26T21:57:30Z",
    //       content:
    //         "Success! Your account was created and youre signed in.Please visit My Account to verify and manage your account.\r\nAn account was already registered with this email. Please check your inbox for an aut… [+5332 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ETtech",
    //       title:
    //         "India ranks third globally in tech startup funding despite slowdown: study",
    //       description:
    //         "According to a report by market intelligence platform Tracxn, Indian tech startups raised $4.8 billion in H1 2025, down 25% from the $6.4 billion YoY and 19% from $5.9 billion in H2 2024. Cofounder Neha Singh said that despite the fall in funding volumes, the…",
    //       url: "https://economictimes.indiatimes.com/tech/funding/india-ranks-third-globally-in-tech-startup-funding-despite-slowdown-study/articleshow/122094643.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-174268,resizemode-75,msid-122094643/tech/funding/india-ranks-third-globally-in-tech-startup-funding-despite-slowdown-study.jpg",
    //       publishedAt: "2025-06-26T14:30:36Z",
    //       content:
    //         "Despite a slowdown in tech startup funding, India emerged as the third-highest funded country globally in the first half of 2025 (H1 2025), as per a report by Tracxn. India overtook Germany and Israe… [+3013 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ETtech",
    //       title:
    //         "India ranks third globally in tech startup funding despite slowdown: Tracxn",
    //       description:
    //         "According to a report by market intelligence platform Tracxn, Indian tech startups raised $4.8 billion in H1 2025, down 25% from the $6.4 billion YoY and 19% from $5.9 billion in H2 2024. Cofounder Neha Singh said that despite the fall in funding volumes, the…",
    //       url: "https://economictimes.indiatimes.com/tech/startups/india-ranks-third-globally-in-tech-startup-funding-despite-slowdown-study/articleshow/122094569.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-174268,resizemode-75,msid-122094569/tech/startups/india-ranks-third-globally-in-tech-startup-funding-despite-slowdown-study.jpg",
    //       publishedAt: "2025-06-26T14:30:36Z",
    //       content:
    //         "Despite a slowdown in tech startup funding, India emerged as the third-highest funded country globally in the first half of 2025 (H1 2025), as per a report by Tracxn. India overtook Germany and Israe… [+3013 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "Times Of India",
    //       title: "India ranks 3rd globally in tech startup funding",
    //       description:
    //         "Bengaluru: India emerged as the third-highest funded country globally for tech startups in the first half of 2025, raising $4.8 billion despite a slow.",
    //       url: "https://timesofindia.indiatimes.com/city/bengaluru/india-ranks-3rd-globally-in-tech-startup-funding/articleshow/122076624.cms",
    //       urlToImage:
    //         "https://static.toiimg.com/thumb/msid-117518774,width-1070,height-580,imgsize-96572,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    //       publishedAt: "2025-06-25T18:46:50Z",
    //       content: "Daily habits that you can follow for slow ageing",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Yahoo Entertainment",
    //       },
    //       author: "John Paul Hampstead",
    //       title: "Piston raises $7.5M for cardless fuel payments solution",
    //       description:
    //         "Eliminating fuel fraud with unique QR codes and flexible business rules. The post Piston raises $7.5M for cardless fuel payments solution appeared first on...",
    //       url: "https://finance.yahoo.com/news/piston-raises-7-5m-cardless-151700332.html",
    //       urlToImage:
    //         "https://s.yimg.com/ny/api/res/1.2/X42HWVQNOUuYlRHLobZcOA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://media.zenfs.com/en/freightwaves_373/bee25d37a8a895b0bde9d320012cd036",
    //       publishedAt: "2025-06-25T15:17:00Z",
    //       content:
    //         "Piston is making waves with its cardless, intelligent approach to fuel payments. Founded by seasoned fleet operators Vikram Sekhon and Shivam Shah, Piston has secured a total of $7.5 million in fundi… [+5848 chars]",
    //     },
    //     {
    //       source: {
    //         id: "fortune",
    //         name: "Fortune",
    //       },
    //       author: "Nicholas Gordon",
    //       title:
    //         "Singapore VC Granite Asia leads $60 million funding round for AI ‘data foundry’ Centific to fund global expansion",
    //       description:
    //         "“This funding round isn’t about necessity—it’s about ambition,” CEO Venkat Rangapuram said in a statement.",
    //       url: "https://fortune.com/asia/2025/06/25/centific-series-a-funding-venkat-rangapuram-granite-asia-jenny-lee/",
    //       urlToImage:
    //         "https://fortune.com/img-assets/wp-content/uploads/2025/06/Resize-image-project-1.png?resize=1200,600",
    //       publishedAt: "2025-06-25T13:00:00Z",
    //       content:
    //         "The  AI data foundry Centific closed a $60 million Series A funding round led by the Singapore-based venture fund Granite Asia, as the U.S.-based startup explores an ambitious expansion to Asia.AI st… [+3631 chars]",
    //     },
    //     {
    //       source: {
    //         id: "the-times-of-india",
    //         name: "The Times of India",
    //       },
    //       author: "ET Special",
    //       title:
    //         "ET Soonicorns Summit 2025: India’s largest gathering of soonicorns returns with AI at the core",
    //       description:
    //         "India’s largest congregation of soonicorns returns to Bengaluru on August 22. At ET Soonicorns Summit 2025, top founders, investors, and tech leaders will decode the billion-dollar blueprint for scaling Indian startups through AI and more. Register now to joi…",
    //       url: "https://economictimes.indiatimes.com/tech/startups/et-soonicorns-summit-2025-indias-largest-gathering-of-soonicorns-returns-with-ai-at-the-core/articleshow/122070536.cms",
    //       urlToImage:
    //         "https://img.etimg.com/thumb/width-1200,height-900,imgsize-740781,resizemode-75,msid-122070536/tech/startups/et-soonicorns-summit-2025-indias-largest-gathering-of-soonicorns-returns-with-ai-at-the-core.jpg",
    //       publishedAt: "2025-06-25T12:13:00Z",
    //       content:
    //         "The Economic Times Soonicorns Summit 2025, Indias largest gathering of soonicorns, returns to Bengaluru this August with a fresh ambition: to chart a roadmap for how Indian artificial intelligence (A… [+6370 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "BL Bengaluru Bureau",
    //       title:
    //         "Sahi raises $10.5 mn in Series A funding from Accel, Elevation Capital for market expansion, team growth",
    //       description:
    //         "Funding to drive broking platform’s product development including advanced automation features as SEBI unlocks algorithmic trading for retail participants",
    //       url: "https://www.thehindubusinessline.com/markets/sahi-raises-105-mn-in-series-a-funding-from-accel-elevation-capital-for-market-expansion-team-growth/article69732037.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/9390kz/article69734382.ece/alternates/LANDSCAPE_1200/PO16_Fund_raising.jpg",
    //       publishedAt: "2025-06-25T03:41:59Z",
    //       content:
    //         "New-age broking platform Sahi secured a $10.5 million Series A funding in round led by existing investors Accel and Elevation Capital. \r\nThe Series A funding will drive product development including … [+1665 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Luminous-landscape.com",
    //       },
    //       author: "Christopher Sanderson",
    //       title: "John Cornicello’ Photo Conversations Archive",
    //       description:
    //         "John Cornicello’s Photo Conversations Archive As we are about to begin a new series of Photo Chats, I would like to pay homage to the...\nThe post John Cornicello’ Photo Conversations Archive appeared first on Luminous Landscape.",
    //       url: "https://luminous-landscape.com/john-cornicello-photo-conversations-archive-2/",
    //       urlToImage:
    //         "https://luminous-landscape.com/wp-content/uploads/2015/04/lula-knowledge-graph-logo.png",
    //       publishedAt: "2025-06-24T15:04:59Z",
    //       content:
    //         "2020Apr 14 – Light ControlLight control. Light quality. Soft light. Hard Light. Contrast. Direction. Distance. How do these all come together? This is a presentation I have given on the Properties of… [+77511 chars]",
    //     },
    //     {
    //       source: {
    //         id: "techcrunch",
    //         name: "TechCrunch",
    //       },
    //       author: "Tim De Chant",
    //       title: "Novoloop is making tons of upcycled plastic",
    //       description:
    //         "Novoloop recently raised a $21 million Series B to begin building its first commercial scale plastic upcycling plant.",
    //       url: "https://techcrunch.com/2025/06/24/novoloop-is-making-tons-of-upcycled-plastic/",
    //       urlToImage:
    //         "https://techcrunch.com/wp-content/uploads/2022/05/Advanced-Upcycling.jpg?resize=1200,800",
    //       publishedAt: "2025-06-24T12:01:39Z",
    //       content:
    //         "Plastic has a recycling problem. Only about 9% of plastic gets recycled, and a majority of that waste comes from single use items like plastic grocery bags. Its partly a design problem theyre made to… [+3163 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "BL Bengaluru Bureau",
    //       title: "Skippi raises ₹12 crore in extended pre-Series A round",
    //       description:
    //         "The company will use this funding to expand into West Asia, increase brand visibility, accelerate product innovation and hire experienced leadership",
    //       url: "https://www.thehindubusinessline.com/companies/skippi-raises-12-crore-in-extended-pre-series-a-round/article69731523.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/fsij8k/article69731565.ece/alternates/LANDSCAPE_1200/Skippi.jpg",
    //       publishedAt: "2025-06-24T10:53:52Z",
    //       content:
    //         "Ice-pop brand Skippi has raised 12 crore in an extended pre-Series A funding round. The round was led by investment advisory firm Bestvantage Investments. Family offices based out of Dubai invested 1… [+1415 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "BL Bengaluru Bureau",
    //       title:
    //         "Fabheads raises $10 million Series A led by Accel to automate composite fibre manufacturing",
    //       description:
    //         "Chennai-based Fabheads raises $10M to automate composite manufacturing, plans Bengaluru facility for aerospace sector, funded by Accel.",
    //       url: "https://www.thehindubusinessline.com/companies/fabheads-raises-10-million-series-a-led-by-accel-to-automate-composite-fibre-manufacturing/article69728011.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/tod1ne/article69104139.ece/alternates/LANDSCAPE_1200/IMG_venture_capital_fund_2_1_57DQ2F9T.jpg",
    //       publishedAt: "2025-06-24T02:57:14Z",
    //       content:
    //         "Chennai-based composite manufacturing technology startup Fabheads has raised $10 million in Series A funding to automate composite fiber manufacturing. The round was led by Accel, with participation … [+2245 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Livemint",
    //       },
    //       author: "Mansi Verma",
    //       title:
    //         "Ride the bond-wagon: VCs and fintech startups rush to tap the latest retail investor craze",
    //       description:
    //         "Venture capitalists are now looking to cash in on the surge in bond investing, and companies such as Groww, Stable Money, Grip Invest and Wint Wealth are riding the wave.",
    //       url: "https://www.livemint.com/industry/as-bonds-become-hot-asset-wealthtech-startups-and-vcs-pile-in-11750581082670.html",
    //       urlToImage:
    //         "https://www.livemint.com/lm-img/img/2025/06/22/1600x900/bond_1750582422868_1750582422995.jpg",
    //       publishedAt: "2025-06-24T01:30:15Z",
    //       content:
    //         "After mutual funds, individual stocks and popular fixed-income products such as fixed deposits, venture capital (VC) firms and India's wealthtech companies are clamouring to tap a new, relatively nic… [+8124 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Plos.org",
    //       },
    //       author: "Panchalie B. Gunathunga, B. H. King, Edwin R. Burgess I.V.",
    //       title:
    //         "Strain variation in feeding response of house flies, Musca domestica, to denatonium benzoate, a bittering agent used in commercial fly baits",
    //       description:
    //         "Granular fly baits remain one of the most popular and effective forms of chemical control of house flies (Musca domestica). While these baits contain a sucrose phagostimulant, some also contain the bittering agent denatonium benzoate at 20 or 100 ppm, as a fe…",
    //       url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0326572",
    //       urlToImage:
    //         "https://journals.plos.org/plosone/article/figure/image?id=10.1371/journal.pone.0326572.g001&size=inline",
    //       publishedAt: "2025-06-23T14:00:00Z",
    //       content:
    //         "Abstract\r\nGranular fly baits remain one of the most popular and effective forms of chemical control of house flies (Musca domestica). While these baits contain a sucrose phagostimulant, some also con… [+41373 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Forbes",
    //       },
    //       author:
    //         "Sindhya Valloppillil, Contributor, \n Sindhya Valloppillil, Contributor\n https://www.forbes.com/sites/sindhyavalloppillil/",
    //       title:
    //         "AI Is Catching What Mammograms Miss—And A Vaccine Could Stop Breast Cancer Before It Starts",
    //       description:
    //         "AI tools like DeepLook are improving dense breast cancer detection, while a Cleveland Clinic vaccine trial offers hope for stopping recurrence before it starts.",
    //       url: "https://www.forbes.com/sites/sindhyavalloppillil/2025/06/23/ai-is-catching-what-mammograms-miss-and-a-vaccine-could-stop-breast-cancer-before-it-starts/",
    //       urlToImage:
    //         "https://imageio.forbes.com/specials-images/imageserve/685541001bba852d44dab19d/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    //       publishedAt: "2025-06-23T13:00:00Z",
    //       content:
    //         "From underdiagnosed dense breast tissue to the risk of recurrence, breakthroughsfrom DeepLook Medicals imaging AI to the Cleveland Clinics TNBC vaccine trialare transforming the fight against breast … [+8717 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "KV Kurmanath",
    //       title: "How this ‘office-less’ startup turns into a unicorn",
    //       description:
    //         "AI startup Fireflies, valued at $1 billion, offers real-time meeting notes and AI assistant for remote work.",
    //       url: "https://www.thehindubusinessline.com/info-tech/how-this-office-less-startup-turns-into-a-unicorn/article69726993.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/info-tech/u9ilue/article69727005.ece/alternates/LANDSCAPE_1200/krish.fireflies.jpg",
    //       publishedAt: "2025-06-23T08:16:35Z",
    //       content:
    //         "Even as the debate continues about whether IT employees should come to offices, stay home and work remotely, or choose the hybrid model, this AI-based startup, which is office-less, is becoming a uni… [+3139 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Livemint",
    //       },
    //       author: "Rwit Ghosh",
    //       title:
    //         "Nurix AI expects to hit $10 million in projected annual revenue by the first half of next year",
    //       description:
    //         "Backed by $25 million in early-stage funding, Mukesh Bansal’s latest startup is betting on voice-first enterprise agents and deep domain focus to stand out in a crowded AI market.",
    //       url: "https://www.livemint.com/companies/start-ups/nurix-ai-expects-to-hit-10-million-in-projected-annual-revenue-by-the-first-half-of-next-year-11750657680611.html",
    //       urlToImage:
    //         "https://www.livemint.com/lm-img/img/2025/06/23/1600x900/Mukesh_Bansal_0310_copy_1750664732323_1750664748972.jpg",
    //       publishedAt: "2025-06-23T07:53:14Z",
    //       content:
    //         "Bengaluru: Agentic artificial intelligence startup Nurix AI expects to hit $10 million in annual recurring revenue (ARR) by the first half of next year, according to founder and chief executive Mukes… [+3905 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "Team BL",
    //       title: "Nuclear dialogue series",
    //       description:
    //         "IEA and IAEA launch Southeast Asia Nuclear Dialogue Series; CEA aims to reduce imports, PGCIL criticized for tower failures.",
    //       url: "https://www.thehindubusinessline.com/specials/clean-tech/nuclear-dialogue-series/article69724792.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/63d72c/article69724797.ece/alternates/LANDSCAPE_1200/2025-06-16T154509Z_230830455_RC2R3FAH9NV0_RTRMADP_3_IRAN-NUCLEAR.JPG",
    //       publishedAt: "2025-06-22T13:42:52Z",
    //       content:
    //         "Illustrating the ongoing nuclear renaissance, the International Energy Agency (IEA), in collaboration with the International Atomic Energy Agency (IAEA), is launching the Southeast Asia Nuclear Dialo… [+2732 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "Gadgets360.com",
    //       },
    //       author: "Ketan Pratap",
    //       title: "Samsung Galaxy Book 5 Pro Review: Your Work Companion",
    //       description:
    //         "Samsung Galaxy Book 5 Pro targets professionals and is a great everyday laptop at under Rs. 1,50,000. It ticks all the right boxes when it comes to your daily machine and can do so much more. The display is excellent, and touch support is an add-on. The keybo…",
    //       url: "https://www.gadgets360.com/laptops/reviews/samsung-galaxy-book-5-pro-review-8732734",
    //       urlToImage:
    //         "https://i.gadgets360cdn.com/large/samsung-galaxy-book-5-pro-review1_1750598045749.jpg",
    //       publishedAt: "2025-06-22T13:28:55Z",
    //       content:
    //         "Samsung's Galaxy Book range has been considered one of the perfect MacBook alternatives thanks to its portability and versatile character. Last year's Galaxy Book 4 Pro 360 even won our in-house NDTV… [+11799 chars]",
    //     },
    //     {
    //       source: {
    //         id: null,
    //         name: "BusinessLine",
    //       },
    //       author: "Meenakshi Verma Ambwani",
    //       title:
    //         "How new-age apparel brands are stitching the next wave of growth",
    //       description:
    //         "D2C fashion brands in India secure funding, scale up rapidly, and reshape the fashion landscape with quick-commerce strategies.",
    //       url: "https://www.thehindubusinessline.com/specials/corporate-file/how-new-age-apparel-brands-are-stitching-the-next-wave-of-growth/article69718724.ece",
    //       urlToImage:
    //         "https://bl-i.thgim.com/public/incoming/qwwjx4/article69724560.ece/alternates/LANDSCAPE_1200/BL2306_Corp_Third.jpg",
    //       publishedAt: "2025-06-22T12:53:41Z",
    //       content:
    //         "Recently, The Bear House, a mens apparel and accessories brand, raised 50 crore in a Series A funding round led by JM Financial India Growth Fund III. This is the third funding for the company, found… [+6682 chars]",
    //     },
    //   ],
    // };
    const news = response.data.articles;
    // console.log(news);
    setFundedStartups(news);
  };
  useEffect(() => {
    getNEWS();
  }, []);

  const scrollContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const words = ["Connecting", "Linking", "Uniting", "Matching"];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const startScrolling = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        const card = scrollContainer.querySelector(".startup-card");
        if (card) {
          const scrollStep = card.offsetWidth + 32;
          scrollContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }, 2000);
    };

    const handleScroll = () => {
      const { scrollLeft, scrollWidth } = scrollContainer;
      const contentWidth = scrollWidth / 2;

      if (scrollLeft >= contentWidth) {
        scrollContainer.scrollLeft = scrollLeft - contentWidth;
      } else if (scrollLeft <= 0 && contentWidth > 0) {
        scrollContainer.scrollLeft = scrollLeft + contentWidth;
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      scrollContainer.scrollBy({ left: e.deltaY, behavior: "auto" });
    };

    if (!isHovering) {
      startScrolling();
    }

    scrollContainer.addEventListener("scroll", handleScroll);
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isHovering]);

  return (
    <div className="bg-[#0D1117] text-slate-300 font-inter">
      {/* Font links */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0D1117] via-[#111827] to-[#030712]"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-tight mb-6 font-poppins animate-fadeInDown">
            <ReactTyped
              strings={words}
              typeSpeed={100}
              backSpeed={50}
              backDelay={1000}
              loop={true}
              className="typewriter"
            />
            <span className="static-text">
              {" "}
              Startups with the Right Investors
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-inter leading-relaxed animate-fadeInDown">
            AI-driven matchmaking platform that helps innovative startups find
            investors who believe in their vision.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              to={isLoggedIn ? "/startups?action=showStartupForm" : "/register"}
              className="bg-gradient-to-r from-cyan-400 to-purple-600 !text-white px-10 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity transform hover:scale-105 shadow-lg font-poppins tracking-wide animate-fadeInDown"
              onClick={() => setRole("startup")}
            >
              I'm a Startup
            </Link>

            <Link
              to={
                isLoggedIn ? "/investors?action=showInvestorForm" : "/register"
              }
              className="bg-slate-800/50 backdrop-blur-sm text-slate-300 border border-slate-700 px-10 py-4 rounded-full text-lg font-semibold hover:bg-slate-700/70 hover:border-slate-500 transition-all transform hover:scale-105 shadow-md font-poppins tracking-wide animate-fadeInDown"
              onClick={() => setRole("investor")}
            >
              I'm an Investor
            </Link>
          </div>
        </div>
      </section>

      <hr className="h-px my-12 bg-cyan-400/50 border-0" />

      {/* Success Stories Section */}
      <section className="py-24 bg-[#0D1117] overflow-hidden relative">
        <div className="max-w-7xl mx-auto text-center px-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-poppins">
            Success Stories
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            See the innovative ventures that have recently secured funding
            through PitchPort.
          </p>
        </div>

        <div className="relative">
          {/* Fade effects on the edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0D1117] to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0D1117] to-transparent pointer-events-none z-10"></div>

          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="flex overflow-x-auto no-scrollbar pb-4 px-4 space-x-8 pt-8"
          >
            {fundedStartups.map((startup, index) => (
              <div
                key={`${startup.id}-${index}`}
                className="group startup-card flex-none w-[400px] p-6  bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/80 transition-all duration-300 hover:bg-slate-700/50 hover:border-cyan-400/50 hover:-translate-y-2 flex flex-col"
              >
                <div className="flex  items-center gap-5 mb-4">
                  <div className="flex items-center justify-around gap-5 w-[90%]">
                    <div className="flex justify-between items-center relative w-20 h-20 flex-shrink-0 ">
                      <div className=" absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></div>
                      <img
                        src={startup.urlToImage}
                        alt={`${startup.name} Logo`}
                        className="relative w-full h-full rounded-full object-cover border-2 border-slate-700"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white font-poppins overflow-hidden truncate w-[100%] ">
                      {startup.title}
                    </h3>

                    <p className="text-sm text-slate-400">{startup.investor}</p>
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-lg text-slate-300 leading-relaxed mb-4">
                    {startup.description}
                  </p>
                </div>
                <Link
                  to={`${startup.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-cyan-400 font-semibold text-sm flex items-center gap-2 group-hover:text-cyan-300 transition-colors"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}

      {!isLoggedIn && (
        <section className="py-24 px-6 bg-gradient-to-br from-[#0D1117] via-[#111827] to-[#030712] text-white text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 font-poppins leading-tight">
            Ready to ignite the future?
          </h2>
          <p className="mb-10 text-xl text-slate-400 max-w-2xl mx-auto">
            Join the PitchPort network today and make an impact.
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-cyan-400 to-purple-600 !text-white font-bold px-12 py-5 rounded-full hover:opacity-90 transition-opacity transform hover:scale-105 shadow-2xl shadow-purple-500/20 text-xl font-poppins tracking-wide"
          >
            Get Started Now
          </Link>
        </section>
      )}
    </div>
  );
};

export default Explore;
