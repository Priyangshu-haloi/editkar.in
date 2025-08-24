const PORTFOLIO = [
    {
      title: "Streetwear Drop — 7s Hook",
      category: "Short-form",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "assets/poster-1.svg",
      duration: "0:17",
      tags: ["Reels","UGC","Auto-captions"],
      tools: ["Premiere Pro","After Effects"]
    },
    {
      title: "Creator Vlog Ep. 12 — Bali",
      category: "Long-form",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "assets/poster-2.svg",
      duration: "11:32",
      tags: ["YouTube","Motion GFX"],
      tools: ["Premiere Pro","Audition"]
    },
    {
      title: "Clutch Ace — Valorant Montage",
      category: "Gaming",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "assets/poster-3.svg",
      duration: "1:04",
      tags: ["Sync cuts","SFX pack"],
      tools: ["Premiere Pro","After Effects"]
    },
    {
      title: "Matchday Hype — Derby Edit",
      category: "Football",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "assets/poster-4.svg",
      duration: "0:34",
      tags: ["Cine bars","Speed ramp"],
      tools: ["Premiere Pro","After Effects"]
    },
    {
      title: "Skincare — UGC Conversion Ad",
      category: "eCommerce Ads",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "assets/poster-5.svg",
      duration: "0:23",
      tags: ["A/B hooks","DR copy"],
      tools: ["Premiere Pro","CapCut"]
    },
    {
      title: "City Portrait — Docu Microfilm",
      category: "Documentary",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "assets/poster-6.svg",
      duration: "2:48",
      tags: ["VO mix","Foley"],
      tools: ["Premiere Pro","Audition"]
    },
    {
      title: "Before/After — Grading Reel",
      category: "Color Grading",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "assets/poster-7.svg",
      duration: "0:41",
      tags: ["LUT dev","Skin tones"],
      tools: ["DaVinci Resolve"]
    },
    {
      title: "AMV — Spirit Breaker",
      category: "Anime",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "assets/poster-8.svg",
      duration: "0:52",
      tags: ["Beat edits","Masking"],
      tools: ["After Effects"]
    },
    {
      title: "Festive Sale — 9:16 Paid Social",
      category: "Ads",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "assets/poster-9.svg",
      duration: "0:29",
      tags: ["UGC","Split tests"],
      tools: ["Premiere Pro"]
    }
  ];
  
  
  const CATEGORIES = ["All","Short-form","Long-form","Gaming","Football","eCommerce Ads","Documentary","Color Grading","Anime","Ads"];
  
  
  const el = (s, parent=document) => parent.querySelector(s);
  const els = (s, parent=document) => [...parent.querySelectorAll(s)];
  const grid = el("#grid");
  const filtersWrap = el("#filters");
  const searchInput = el("#searchInput");
  const emptyState = el("#emptyState");
  const yearEl = el("#year");
  yearEl.textContent = new Date().getFullYear();
  
  
  function buildFilters(){
    filtersWrap.innerHTML = "";
    CATEGORIES.forEach(cat => {
      const b = document.createElement("button");
      b.className = "filter-btn";
      b.textContent = cat;
      b.dataset.category = cat;
      if(cat === "All") b.classList.add("active");
      b.addEventListener("click", () => {
        els(".filter-btn", filtersWrap).forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        render();
      });
      filtersWrap.appendChild(b);
    });
  }
  
  
  function render(){
    const active = el(".filter-btn.active", filtersWrap)?.dataset.category ?? "All";
    const q = searchInput.value.trim().toLowerCase();
    const results = PORTFOLIO.filter(item => {
      const inCat = (active === "All") || (item.category === active);
      const inSearch = !q || [item.title, item.category, ...(item.tags||[]), ...(item.tools||[])]
        .join(" ")
        .toLowerCase()
        .includes(q);
      return inCat && inSearch;
    });
  
    grid.innerHTML = "";
    results.forEach(item => grid.appendChild(card(item)));
  
    emptyState.classList.toggle("hidden", results.length > 0);
  }
  
  
  function card(item){
    const root = document.createElement("article");
    root.className = "card";
    root.innerHTML = `
      <div class="thumb">
        <span class="badge">${item.category} • ${item.duration}</span>
        <video preload="none" muted playsinline poster="${item.poster}">
          <source src="${item.videoUrl}" type="video/mp4">
        </video>
      </div>
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <div class="chips">${[...(item.tags||[]),(item.tools||[]).join(" • ")].map(t=>`<span class="chip">${t}</span>`).join("")}</div>
      </div>
    `;
  
    const v = root.querySelector("video");
    
    root.addEventListener("mouseenter", () => { try{ v.play() }catch{} });
    root.addEventListener("mouseleave", () => { try{ v.pause(); v.currentTime = 0 }catch{} });
  
    root.addEventListener("click", () => openLightbox(item));
  
    return root;
  }
  
  
  searchInput.addEventListener("input", render);
  
  const lightbox = el("#lightbox");
  const lightboxVideo = el("#lightboxVideo");
  const lightboxTitle = el("#lightboxTitle");
  const lightboxChips = el("#lightboxChips");
  
  function openLightbox(item){
    lightboxVideo.src = item.videoUrl;
    lightboxVideo.poster = item.poster;
    lightboxTitle.textContent = item.title;
    lightboxChips.innerHTML = [`<span class="chip">${item.category}</span>`, ...item.tags.map(t=>`<span class="chip">${t}</span>`), `<span class="chip">${item.tools.join(" • ")}</span>`].join("");
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxVideo.play().catch(()=>{});
  }
  
  function closeLightbox(){
    lightboxVideo.pause();
    lightboxVideo.src = "";
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }
  
  lightbox.addEventListener("click", (e) => {
    if(e.target.matches("[data-close], .lightbox-backdrop")) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
  
  
  function handleContact(e){
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const msg = `Thanks, ${data.name}! We'll get back to you at ${data.email}.`;
    document.getElementById("formStatus").textContent = msg;
    e.target.reset();
    return false;
  }
  window.handleContact = handleContact;
  
  
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if(entry.isIntersecting && v.dataset.src){
        v.src = v.dataset.src;
        v.removeAttribute("data-src");
      }
    });
  }, {rootMargin: "200px"});
  
  function hydrateLazy(){
    document.querySelectorAll(".thumb video").forEach(v => {
      
    });
  }
  
  buildFilters();
  render();
  hydrateLazy();