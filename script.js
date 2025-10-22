// ------------------- CONFIG -------------------
const API_BASE = "https://eden-antalya.netlify.app/.netlify/functions";
let currentLang = "tr";
let currentGallery = [];
let currentIndex = 0;

// ------------------- DATA -------------------
const DATA = {
  edenAntalya: {
    site: {
      sketch: "assets/images/site_1.png",
      final: "assets/images/site_2.png",
    },
    hotspots: [
      {
        id: "social",
        x: 43.0, y: 37.1,
        caption: { tr: "Sosyal Merkez", en: "Social Center" },
        body: {
          tr: "Günlük yaşamın doğal akışıyla canlanan sıcak bir merkez — gün ışığı altında sohbet, yemek ve huzurlu bir buluşma noktası.",
          en: "A warm and lively heart where daily life unfolds — dining, conversation, and relaxation beneath sunlit arches.",
        },
        imgs: [
          "assets/images/social/social_1.png",
          "assets/images/social/social_2.png",
          "assets/images/social/social_3.png",
          "assets/images/social/social_4.png",
          "assets/images/social/social_5.png",
          "assets/images/social/social_6.png",
          "assets/images/social/social_7.png",
        ],
      },
      {
        id: "courtyard",
        x: 66.4, y: 53.0,
        caption: { tr: "Avlu Aksı", en: "Courtyard Axis" },
        body: {
          tr: "Zeytin ağaçları, terakota ve Akdeniz ışığı yapılar arasında huzurlu bir hat oluşturur — durmak, buluşmak ve nefes almak için bir alan.",
          en: "Olive trees, terracotta, and Mediterranean light shape a calm path between buildings — a space to pause, meet, and breathe.",
        },
        imgs: [
          "assets/images/courtyard/courtyard_1.png",
          "assets/images/courtyard/courtyard_2.png",
          "assets/images/courtyard/courtyard_3.png",
        ],
      },
      {
        id: "pavilion",
        x: 32.2, y: 43.0,
        caption: { tr: "Bahçe Köşkü", en: "Garden Pavilion" },
        body: {
          tr: "Lavanta ve zeytin ağaçlarının arasında sakin bir durak — esintiye açık, sarmaşıkların gölgesinde, sessizliğin yumuşaklığıyla çevrili.",
          en: "A tranquil retreat among lavender and olive trees — open to the breeze, shaded by vines, and filled with gentle silence.",
        },
        imgs: [
          "assets/images/pavilion/pavilion_1.png",
          "assets/images/pavilion/pavilion_2.png",
          "assets/images/pavilion/pavilion_3.png",
        ],
      },
      {
        id: "wellness",
        x: 15.6, y: 40.0,
        caption: { tr: "Wellness Alanı", en: "Wellness Zone" },
        body: {
          tr: "Dingin bir yenilenme alanı — termal sular, yumuşak ışık ve bedeni zihinle dengeye getiren mekânlar.",
          en: "A serene sanctuary for renewal — thermal waters, quiet light, and spaces that restore balance between body and mind.",
        },
        imgs: [
          "assets/images/wellness/wellness_1.png",
          "assets/images/wellness/wellness_2.png",
          "assets/images/wellness/wellness_3.png",
          "assets/images/wellness/wellness_4.png",
          "assets/images/wellness/wellness_5.png",
          "assets/images/wellness/wellness_6.png",
          "assets/images/wellness/wellness_7.png",
          "assets/images/wellness/wellness_8.png",
        ],
      },
      {
        id: "accommodation-deluxe",
        x: 73.2, y: 35.2,
        caption: { tr: "Deluxe Odalar", en: "Deluxe Rooms" },
        body: {
          tr: "Yumuşak ışık, doğal dokular ve dingin bir konfor — bahçe kokularına ve güneşli avlulara açılan zarif bir alan.",
          en: "Soft light, natural textures, and quiet comfort — an intimate space that opens to the scent of gardens and sunlit courtyards.",
        },
        imgs: [
          "assets/images/accommodation-deluxe/accommodation-deluxe_1.png",
          "assets/images/accommodation-deluxe/accommodation-deluxe_2.png",
          "assets/images/accommodation-deluxe/accommodation-deluxe_3.png",
        ],
      },
      {
        id: "accommodation-private",
        x: 87.9, y: 41.5,
        caption: { tr: "Özel Süitler", en: "Private Suites" },
        body: {
          tr: "Kendine ait avlularıyla gizli bir sığınak — doğa ve dinginliğin uyumla buluştuğu bir alan.",
          en: "Secluded sanctuaries with private courtyards — where nature and stillness meet in perfect harmony.",
        },
        imgs: [
          "assets/images/accommodation-private/accommodation-private_1.png",
          "assets/images/accommodation-private/accommodation-private_2.png",
          "assets/images/accommodation-private/accommodation-private_3.png",
          "assets/images/accommodation-private/accommodation-private_4.png",
          "assets/images/accommodation-private/accommodation-private_5.png",
        ],
      },
      {
        id: "cultural",
        x: 58.6, y: 40.5,
        caption: { tr: "Kültür Merkezi", en: "Cultural Center" },
        body: {
          tr: "Yaratıcılığın ve paylaşımın buluştuğu bir mekân — sanat, öğrenme ve huzurlu birliktelik doğal ışıkta şekillenir.",
          en: "A meeting place for creativity and reflection — where art, learning, and shared experiences come together in soft natural light.",
        },
        imgs: [
          "assets/images/cultural/cultural_1.png",
          "assets/images/cultural/cultural_2.png",
          "assets/images/cultural/cultural_3.png",
          "assets/images/cultural/cultural_4.png",
          "assets/images/cultural/cultural_5.png",
        ],
      },
      {
        id: "welcoming",
        x: 87.9, y: 61.0,
        caption: { tr: "Karşılama Alanı", en: "Welcoming Area" },
        body: {
          tr: "Karşılama alanı, Eden Antalya’nın atmosferini belirler — mimarinin konforla, sessizliğin ışıkla buluştuğu bir yer.",
          en: "The welcoming area sets the tone for Eden Antalya — a place where architecture meets comfort and silence meets light.",
        },
        imgs: [
          "assets/images/welcoming/welcoming_1.png",
          "assets/images/welcoming/welcoming_2.png",
          "assets/images/welcoming/welcoming_3.png",
        ],
      },      
    ],
  },
};

// ------------------- PRELOADER -------------------
async function preloadImagesWithProgress(imageList) {
  const progressEl = document.getElementById("loading-progress");
  const total = imageList.length;
  let loaded = 0;

  const updateProgress = () => {
    loaded++;
    const percent = Math.round((loaded / total) * 100);
    progressEl.style.width = `${percent}%`;
  };

  await Promise.all(
    imageList.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => {
            updateProgress();
            resolve();
          };
          img.src = src;
        })
    )
  );
}

async function initSitePreload() {
  const allImages = [];
  allImages.push(DATA.edenAntalya.site.sketch, DATA.edenAntalya.site.final);
  DATA.edenAntalya.hotspots.forEach((h) => allImages.push(...h.imgs));

  await preloadImagesWithProgress(allImages);

  const loader = document.getElementById("loading-screen");
  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.remove();
    const start = document.getElementById("start-screen");
    start.style.display = "flex";
    requestAnimationFrame(() => start.classList.add("visible"));
  }, 800);
}

document.addEventListener("DOMContentLoaded", initSitePreload);

// ------------------- STARTUP -------------------
document.addEventListener("DOMContentLoaded", () => {
  // Welcome screen
  document.getElementById("btn-tr")?.addEventListener("click", () => enterSite("tr"));
  document.getElementById("btn-en")?.addEventListener("click", () => enterSite("en"));

  // Modal controls
  const modal = document.getElementById("modal");
  document.querySelector("#modal .close")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.getElementById("prev-img")?.addEventListener("click", () => showImage(-1));
  document.getElementById("next-img")?.addEventListener("click", () => showImage(1));

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (getComputedStyle(modal).display !== "flex") return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") showImage(-1);
    if (e.key === "ArrowRight") showImage(1);
  });

  // Language switch
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentLang = btn.dataset.lang;
      applyLanguage(currentLang);
    });
  });

  // ✅ Attach send-comment listener *after* DOM loads
  document.getElementById("send-comment")?.addEventListener("click", async () => {
    const name = document.getElementById("name-input").value.trim();
    const text = document.getElementById("comment-input").value.trim();
    if (!name || !text) return;

    try {
      const res = await fetch(`${API_BASE}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });
      const data = await res.json();
      if (data.success) {
        const div = document.createElement("div");
        div.className = "comment-item";
        div.innerHTML = `<strong>${name}</strong> <small>${new Date().toLocaleString()}</small><br>${text}`;
        const list = document.getElementById("comment-list");
        list.appendChild(div);
        list.scrollTop = list.scrollHeight;
        document.getElementById("name-input").value = "";
        document.getElementById("comment-input").value = "";
      }
    } catch (e) {
      console.error("Failed to send comment", e);
    }
  });
});

// ------------------- ENTER SITE -------------------
function enterSite(lang) {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("ui-wrapper").style.display = "block";
  applyLanguage(lang);
  crossFadeSequence();
  loadComments();
}

// ------------------- CROSSFADE -------------------
function crossFadeSequence() {
  const wrapper = document.getElementById("image-wrapper");
  wrapper.innerHTML = `
    <img id="img1" src="${DATA.edenAntalya.site.sketch}" alt="Sketch Plan">
    <img id="img2" src="${DATA.edenAntalya.site.final}" alt="Final Render">
  `;
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");

  setTimeout(() => img1.classList.add("visible"), 100);
  setTimeout(() => {
    img1.classList.remove("visible");
    img2.classList.add("visible");
  }, 1800);

  setTimeout(() => {
    ["topbar", "footer", "copyright"].forEach((id) =>
      document.getElementById(id)?.classList.add("visible")
    );
    revealHotspots();
  }, 3000);
}

// ------------------- HOTSPOTS -------------------
function revealHotspots() {
  const wrapper = document.getElementById("image-wrapper");
  DATA.edenAntalya.hotspots.forEach((h) => {
    const el = document.createElement("div");
    el.className = "hotspot";
    el.style.left = `${h.x}%`;
    el.style.top = `${h.y}%`;
    el.title = h.caption[currentLang];
    el.addEventListener("click", () =>
      openModal(h.imgs, h.caption[currentLang], h.body[currentLang])
    );
    wrapper.appendChild(el);
    el.classList.add("show");
  });
}

// ------------------- MODAL LOGIC -------------------
function openModal(imgs, title, body) {
  currentGallery = imgs;
  currentIndex = 0;
  document.getElementById("modal").style.display = "flex";
  document.body.style.overflow = "hidden";
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-body").textContent = body;

  const modalImg = document.getElementById("modal-img");
  modalImg.src = imgs[0];
  buildThumbnails(imgs);
  updateNavButtons();
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.body.style.overflow = "auto";
}

function buildThumbnails(imgs) {
  const container = document.getElementById("thumbnail-container");
  container.innerHTML = "";
  imgs.forEach((src, i) => {
    const t = document.createElement("img");
    t.src = src;
    t.className = "thumbnail" + (i === 0 ? " active" : "");
    t.addEventListener("click", () => showImageDirect(i));
    container.appendChild(t);
  });
}

function showImage(change) { showImageDirect(currentIndex + change); }

function showImageDirect(i) {
  if (i < 0 || i >= currentGallery.length) return;

  const modalImg = document.getElementById("modal-img");
  modalImg.classList.add("fade-in");
  modalImg.style.pointerEvents = "none"; // disable events during fade

  setTimeout(() => {
    modalImg.classList.remove("fade-in");
    modalImg.style.pointerEvents = "auto";
  }, 400);

  modalImg.src = currentGallery[i];
  currentIndex = i;

  document.querySelectorAll(".thumbnail").forEach((t, idx) =>
    t.classList.toggle("active", idx === i)
  );
  updateNavButtons();
}

function updateNavButtons() {
  document.getElementById("prev-img").style.display = currentIndex > 0 ? "block" : "none";
  document.getElementById("next-img").style.display = currentIndex < currentGallery.length - 1 ? "block" : "none";
}

// ------------------- COMMENTS -------------------
async function loadComments() {
  const list = document.getElementById("comment-list");
  list.innerHTML = "";

  try {
    let comments = [];

    // Detect where we're running
    const isNetlify = location.hostname.includes("netlify.app");

    if (isNetlify) {
      // ✅ Use Netlify backend
      const res = await fetch(`${API_BASE}/comment?t=${Date.now()}`);
      const data = await res.json();
      if (data.success) comments = data.comments || [];
    } else {
      // ✅ Use GitHub API directly (for GitHub Pages)
      const res = await fetch("https://api.github.com/repos/ozdemir07/eden-antalya/contents/comments.json");
      if (res.ok) {
        const file = await res.json();
        const decoded = atob(file.content);
        comments = JSON.parse(decoded);
      }
    }

    // Render comments
    comments.forEach((c) => {
      const div = document.createElement("div");
      div.className = "comment-item";
      const ts = new Date(c.timestamp).toLocaleString();
      div.innerHTML = `<strong>${c.name}</strong> <small>${ts}</small><br>${c.text}`;
      list.appendChild(div);
    });

    list.scrollTop = list.scrollHeight;
  } catch (e) {
    console.error("Failed to load comments:", e);
  }
}

document.getElementById("send-comment")?.addEventListener("click", async () => {
  const name = document.getElementById("name-input").value.trim();
  const text = document.getElementById("comment-input").value.trim();
  if (!name || !text) return;

  try {
    const isNetlify = location.hostname.includes("netlify.app");

    if (isNetlify) {
      // ✅ Post via Netlify function
      const res = await fetch(`${API_BASE}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
    } else {
      alert("⚠️ Comment submission works only on Netlify-hosted version.");
      return;
    }

    // Add instantly to UI
    const div = document.createElement("div");
    div.className = "comment-item";
    div.innerHTML = `<strong>${name}</strong> <small>${new Date().toLocaleString()}</small><br>${text}`;
    const list = document.getElementById("comment-list");
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
    document.getElementById("name-input").value = "";
    document.getElementById("comment-input").value = "";
  } catch (e) {
    console.error("Failed to send comment", e);
  }
});

// ------------------- LANGUAGE -------------------
function applyLanguage(lang) {
  document.documentElement.lang = lang;
  const label = document.querySelector("#footer p");
  const send = document.getElementById("send-comment");
  const nameI = document.getElementById("name-input");
  const comI = document.getElementById("comment-input");

  if (lang === "tr") {
    label.textContent = "Yorumlar:";
    send.textContent = "Gönder";
    nameI.placeholder = "Adınız";
    comI.placeholder = "Yorumunuzu yazın";
  } else {
    label.textContent = "Comments:";
    send.textContent = "Send";
    nameI.placeholder = "Name";
    comI.placeholder = "Write your comment";
  }
}
