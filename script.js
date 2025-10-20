// ------------------- CONFIG -------------------
const API_BASE = "https://interactive-masterplan-mehmetislek0.vercel.app";
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
        x: 36, y: 40,
        caption: { tr: "Sosyal Merkez", en: "Social Center" },
        body: {
          tr: "Sosyal Merkez, Eden Antalya’daki yaşamın ritmini bir araya getirir — gölgeli revakların altında yemek, sohbet ve gündelik ritüeller. Beyaz sıvalı duvarlar, ahşap pergolalar ve açık verandalar, dış manzaraya uzanan kesitler oluşturur. Burada iyilik hâli sıcaklıkla, topluluk duygusu doğallıkla buluşur. Sabahlar uzun öğle yemeklerine, akşamlar dinginliğe dönüşür — aidiyetin mimarisi.",
          en: "The Social Center gathers the rhythm of life in Eden Antalya — dining, conversation, and everyday rituals beneath shaded arcades. White plaster walls, timber pergolas, and open verandas frame glimpses of the landscape beyond. Here, wellness meets warmth, and community feels effortless. It is where mornings stretch into long lunches and evenings drift into calm — the architecture of belonging.",
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
        x: 78, y: 72,
        caption: { tr: "Avlu Aksı", en: "Courtyard Axis" },
        body: {
          tr: "Beyaz sıvalı duvarların çerçevelediği bir hava ve ışık bahçesi. Yansıtıcı havuzlar ve gölgeli geçitler arasında terakota zemin, lavanta ve biberiye birbirine karışır. Avlu Aksı; süitleri, pavyonları ve sosyal alanları koku ve sessizlikle birbirine bağlar. Gün batımında altın tonlara bürünen avlu, paylaşılan sessizliğin sahnesine dönüşür.",
          en: "Garden of air and light framed by white plaster walls. Terracotta paving, lavender, and rosemary weave between reflecting pools and shaded walkways. Courtyard Axis connects the suites, pavilions, and social spaces through scent and silence. At sunset, the courtyard glows in gold and shadow, becoming a quiet stage for shared presence.",
        },
        imgs: [
          "assets/images/courtyard/courtyard_1.png",
          "assets/images/courtyard/courtyard_2.png",
          "assets/images/courtyard/courtyard_3.png",
        ],
      },
      {
        id: "pavilion",
        x: 24, y: 60,
        caption: { tr: "Bahçe Köşkü", en: "Garden Pavilion" },
        body: {
          tr: "Zeytin ağaçları ve lavanta arasında yer alan Bahçe Köşkü, sessiz buluşmaların ve düşüncelerin mekânı. Küçük kapalı bir oda ile gölgeli açık teras, mimariyi koku, esinti ve ışıkla birleştirir. Sabahlar çay ve sohbetle yavaşça başlar; öğleden sonralar yaprak ve cırcır seslerinin ritmine karışır. Sadelik burada bir lüks değil, huzurun kendisidir.",
          en: "Set among olive trees and lavender, the Garden Pavilion offers moments of quiet gathering and reflection. A small enclosed room and a shaded open terrace merge architecture with scent, breeze, and sunlight. Here, mornings begin slowly with tea and conversation; afternoons dissolve into the rhythm of leaves and cicadas. Simplicity becomes luxury — a space that holds nothing but calm.",
        },
        imgs: [
          "assets/images/pavilion/pavilion_1.png",
          "assets/images/pavilion/pavilion_2.png",
          "assets/images/pavilion/pavilion_3.png",
        ],
      },
      {
        id: "wellness",
        x: 56, y: 69,
        caption: { tr: "Wellness Alanı", en: "Wellness Zone" },
        body: {
          tr: "Eden Antalya’nın dingin kalbi olan Wellness Pavilion; taşın, suyun ve ışığın sessiz bir dengesi. Hamam, sauna ve terapi odaları; süzülmüş ışığın ve su sesinin buluştuğu avlular etrafında sıralanır. Her yüzey sıcak, her mekân nefes almayı hatırlatır. Bir varış noktası değil, yenilenmenin hâlidir — bedenin sakinliği yeniden hatırladığı bir yer.",
          en: "The Wellness Pavilion is the heart of stillness in Eden Antalya — a quiet sequence of stone, water, and light. Hammam, sauna, and therapy rooms unfold around calm courtyards, where filtered sunlight meets the sound of flowing water. Every surface is warm to the touch; every space invites slow breathing. It is not a destination but a state of renewal — a place where the body remembers calm.",
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
        x: 94, y: 36,
        caption: { tr: "Deluxe Odalar", en: "Deluxe Rooms" },
        body: {
          tr: "Avlulara ve zeytin ağaçlarına bakan, aydınlık ve ferah mekânlar. Sade konforu ve Akdeniz havasını içeriye taşıyan bu odalar, doğayla zarif bir bağlantı kurmak isteyenler için tasarlandı.",
          en: "Bright, elevated spaces overlooking courtyards and olive trees. Designed for quiet connection and effortless comfort, these rooms blend openness and warmth, allowing guests to feel the Mediterranean air flow through every moment.",
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
        x: 88, y: 28,
        caption: { tr: "Özel Süitler", en: "Private Suites" },
        body: {
          tr: "Bahçelerle çevrili kişisel sığınaklar — sessizliğin, gölgenin ve kokunun günün ritmini belirlediği yerler. Doğaya açılan özel teraslara sahip, tamamen dinginlik ve mahremiyet sunan tek katlı konaklama birimleri.",
          en: "Personal sanctuaries surrounded by gardens — where silence, shade, and scent shape the rhythm of each day. Detached single-storey spaces with private terraces and views that open toward nature, offering an experience of complete seclusion and serenity.",
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

// ------------------- STARTUP -------------------
document.addEventListener("DOMContentLoaded", () => {
  // Buttons on welcome page
  document.getElementById("btn-tr")?.addEventListener("click", () => enterSite("tr"));
  document.getElementById("btn-en")?.addEventListener("click", () => enterSite("en"));

  // Modal controls
  const modal = document.getElementById("modal");
  document.querySelector("#modal .close")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.getElementById("prev-img")?.addEventListener("click", () => showImage(-1));
  document.getElementById("next-img")?.addEventListener("click", () => showImage(1));

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    const open = getComputedStyle(modal).display === "flex";
    if (!open) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") showImage(-1);
    if (e.key === "ArrowRight") showImage(1);
  });

  // Language toggle
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentLang = btn.dataset.lang;
      applyLanguage(currentLang);
    });
  });
});

// ------------------- ENTER SITE -------------------
function enterSite(lang) {
  const start = document.getElementById("start-screen");
  start.style.display = "none";
  document.getElementById("ui-wrapper").style.display = "block";
  applyLanguage(lang);
  crossFadeSequence();
  loadCommentsForStyle("eden-antalya");
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

function showImage(change) {
  showImageDirect(currentIndex + change);
}

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
async function loadCommentsForStyle(style) {
  const list = document.getElementById("comment-list");
  list.innerHTML = "";
  try {
    const res = await fetch(`${API_BASE}/api/comment?t=${Date.now()}`);
    const data = await res.json();
    if (data.success) {
      data.comments
        .filter((c) => c.style === style)
        .forEach((c) => {
          const div = document.createElement("div");
          div.className = "comment-item";
          div.innerHTML = `<strong>${c.name}:</strong> ${c.text}`;
          list.appendChild(div);
        });
      list.scrollTop = list.scrollHeight;
    }
  } catch (e) {
    console.error("Failed to load comments:", e);
  }
}

document.getElementById("send-comment")?.addEventListener("click", async () => {
  const name = document.getElementById("name-input").value.trim();
  const text = document.getElementById("comment-input").value.trim();
  if (!name || !text) return;

  try {
    const res = await fetch(`${API_BASE}/api/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text, style: "eden-antalya" }),
    });
    const data = await res.json();
    if (data.success) {
      const div = document.createElement("div");
      div.className = "comment-item";
      div.innerHTML = `<strong>${name}:</strong> ${text}`;
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
