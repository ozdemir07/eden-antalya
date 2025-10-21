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
          tr: "Eden’ın sosyal kalbi. Asmalarla gölgelenen teraslara açılan kemerli galerilerde insanlar yemekleri, hikâyeleri ve sessiz öğleden sonraları paylaşır. Işık kemerlerden süzülerek iç mekânın sıcaklığını avluların dinginliğiyle birleştirir. Her köşe, kahveyle, akşam yemeğiyle ya da sessizlikle bir buluşma davetidir.",
          en: "The social heart of Eden. Sunlit arcades open to terraces shaded by vines, where people gather to share meals, stories, and quiet afternoons. Natural light moves through the arches, blending the warmth of the interior with the calm of the courtyards. Every corner invites connection — over coffee, over dinner, or in silence.",
        },
        imgs: [
          "assets/images/social/social_1.png",
          "assets/images/social/social_2.png",
          "assets/images/social/social_3.png",
          "assets/images/social/social_4.png",
          "assets/images/social/social_5.png",
        ],
      },
      {
        id: "courtyard",
        x: 66.4, y: 50.3,
        caption: { tr: "Avlu Aksı", en: "Courtyard Axis" },
        body: {
          tr: "Akdeniz güneşi altında paylaşılan bir sığınak. Zeytin ağaçları ve turunçgiller arasında uzanan pergolalı yollar, bitki kokularıyla ve kemerlerin arasından süzülen hafif bir sohbet uğultusuyla doludur. Burada zaman yavaşlar — kahve eşliğinde sohbetler uzar, ışık yaprakların arasından süzülür, her esinti denizin dinginliğini taşır.",
          en: "A shared sanctuary under the Mediterranean sun. Paths shaded by pergolas lead through olive trees and citrus groves, where the air is fragrant with herbs and laughter drifts softly between the arches. Here, time slows — conversations unfold over coffee, light filters through leaves, and every breeze carries the calm of the sea.",
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
          tr: "Lavanta ve zeytin ağaçları arasında, bahçe pavyonları sessiz bir gölge ve hafif bir esinti sunar. Beyaz kemerler yeşilliği çerçeveler, dokuma dokular ve ince kumaşlar rüzgârla nazikçe hareket eder. Bitki kokuları ve güneşle ısınmış taşların arasında okuma, dinlenme ve yavaş sohbetler için bir mekân.",
          en: "Among lavender and olive trees, the garden pavilions offer quiet shade and soft breeze. White arches frame views of greenery, while woven textures and light fabrics move gently with the wind. A place for reading, resting, and slow conversation beneath the scent of herbs and sun-warmed stone.",
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
          tr: "Işık, su ve sessizlik, yenilenme için tasarlanmış mekânlarda buluşur. Hamamdan saunaya, her oda taşın sıcaklığını ve ışığın dinginliğini taşır. Yansımalar kemerlerde titreşir, zeytin ağaçlarının kokusu havayı doldurur. Buradaki iyilik hâli bir ritüel değil, dengeye dönüş yolculuğudur.",
          en: "Light, water, and silence meet in a sequence of spaces designed for renewal. From hammam to sauna, each room draws warmth from stone and calm from light. Reflections ripple across arches, and the scent of olive trees fills the air. Wellness here is not a ritual — it is a return to balance.",
        },
        imgs: [
          "assets/images/wellness/wellness_1.png",
          "assets/images/wellness/wellness_2.png",
          "assets/images/wellness/wellness_3.png",
          "assets/images/wellness/wellness_4.png",
          "assets/images/wellness/wellness_5.png",
        ],
      },
      {
        id: "accommodation-deluxe",
        x: 73.2, y: 35.2,
        caption: { tr: "Deluxe Odalar", en: "Deluxe Rooms" },
        body: {
          tr: "Terakota zeminler, kireç sıvalı duvarlar ve kemerli açıklıklardan süzülerek içeri giren yumuşak bir ışık. Her mekân manzaraya açılır, iç ile dış arasındaki sınır silinir. Havadaki lavanta ve ahşap kokusu, konfor ve dinginliğin sessiz ritmini taşır. Her detay sade, dokunsal ve sıcaktır; mekânın günle birlikte nefes almasına izin verir.",
          en: "Terracotta floors, soft plaster walls, and sunlight that drifts gently through arched openings. Each space opens toward the landscape, blurring the line between inside and out. The air carries the scent of lavender and wood — a quiet rhythm of comfort and calm. Every detail is simple, tactile, and warm, allowing the room to breathe with the day.",
        },
        imgs: [
          "assets/images/accommodation-deluxe/accommodation-deluxe_1.png",
          "assets/images/accommodation-deluxe/accommodation-deluxe_2.png",
          "assets/images/accommodation-deluxe/accommodation-deluxe_3.png",
          "assets/images/accommodation-deluxe/accommodation-deluxe_4.png",
        ],
      },
      {
        id: "accommodation-private",
        x: 87.9, y: 41.5,
        caption: { tr: "Özel Süitler", en: "Private Suites" },
        body: {
          tr: "Her süit, kendine ait gizli bir avlu etrafında şekillenir — taş, ışık ve havadan oluşan özel bir dünya. Su sesi ve lavanta kokusu, sessiz bir geri çekilişin ritmini yaratır. İçeride yumuşak tonlar ve kıvrımlı yüzeyler dinlenmeye davet eder; dışarıda gün, sarmaşıklarla gölgelenen pergolaların altında uzar. Burada mahremiyet, yalnızlık değil; doğayla bütünleşen bir yakınlıktır — nefes almak, yavaşlamak ve manzaraya ait hissetmek için bir alan.",
          en: "Each suite unfolds around its own secluded courtyard — a private world of stone, light, and air. The sound of water and the scent of lavender create a rhythm of quiet retreat. Inside, soft tones and curved surfaces invite rest; outside, the day lingers under vine-shaded pergolas. Here, privacy is not isolation but intimacy — a space to breathe, to slow down, and to belong to the landscape.",
        },
        imgs: [
          "assets/images/accommodation-private/accommodation-private_1.png",
          "assets/images/accommodation-private/accommodation-private_2.png",
          "assets/images/accommodation-private/accommodation-private_3.png",
          "assets/images/accommodation-private/accommodation-private_4.png",
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
  enableSwipe(modalImg);
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
  setTimeout(() => modalImg.classList.remove("fade-in"), 400);
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

function enableSwipe(target) {
  let startX = 0, startY = 0;
  target.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  target.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? showImage(1) : showImage(-1);
    }
  });
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
