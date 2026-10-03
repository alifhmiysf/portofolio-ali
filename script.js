/* =========================================================
   PORTFOLIO JAVASCRIPT
   Ali Fahmi Yusuf
========================================================= */


/* =========================================================
   1. DARK / LIGHT MODE
========================================================= */

// Ambil elemen tombol theme
const themeToggle = document.getElementById("themeToggle");
const themeToggleMobile = document.getElementById(
  "themeToggleMobile"
);

// Ambil elemen <html>
const html = document.documentElement;


// Ambil tema yang tersimpan di browser
// Jika belum ada, gunakan dark mode
const savedTheme =
  localStorage.getItem("theme") || "dark";

// Terapkan tema saat halaman pertama kali dibuka
html.setAttribute("data-theme", savedTheme);


// Fungsi untuk mengganti tema
function toggleTheme() {
  const currentTheme =
    html.getAttribute("data-theme") || "dark";

  const newTheme =
    currentTheme === "dark"
      ? "light"
      : "dark";

  // Terapkan tema
  html.setAttribute("data-theme", newTheme);

  // Simpan pilihan user
  localStorage.setItem("theme", newTheme);
}


// Tombol theme desktop
if (themeToggle) {
  themeToggle.addEventListener(
    "click",
    toggleTheme
  );
}


// Tombol theme mobile
if (themeToggleMobile) {
  themeToggleMobile.addEventListener(
    "click",
    toggleTheme
  );
}


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

// Ambil tombol hamburger
const menuBtn =
  document.getElementById("menuBtn");

// Ambil container menu
const links =
  document.querySelector(".links");


// Fungsi untuk menutup menu mobile
function closeMobileMenu() {
  if (!menuBtn || !links) return;

  menuBtn.classList.remove("active");

  links.classList.remove("active");

  document.body.classList.remove(
    "menu-open"
  );

  // Update status aksesibilitas
  menuBtn.setAttribute(
    "aria-expanded",
    "false"
  );
}


// Fungsi untuk membuka / menutup menu
function toggleMobileMenu() {
  if (!menuBtn || !links) return;

  const isOpen =
    links.classList.contains("active");

  if (isOpen) {
    closeMobileMenu();
    return;
  }

  // Buka menu
  menuBtn.classList.add("active");

  links.classList.add("active");

  document.body.classList.add(
    "menu-open"
  );

  // Update status aksesibilitas
  menuBtn.setAttribute(
    "aria-expanded",
    "true"
  );
}


// Event tombol hamburger
if (menuBtn) {
  menuBtn.addEventListener(
    "click",
    toggleMobileMenu
  );

  // Nilai awal
  menuBtn.setAttribute(
    "aria-expanded",
    "false"
  );
}


/* =========================================================
   3. NAVIGATION LINK
========================================================= */

// Ambil semua link di navbar
const navLinks =
  links
    ? links.querySelectorAll("a")
    : [];


// Tutup menu setelah link diklik
navLinks.forEach((link) => {
  link.addEventListener(
    "click",
    closeMobileMenu
  );
});


/* =========================================================
   4. MOBILE THEME BUTTON
========================================================= */

// Setelah theme mobile diklik,
// tutup dropdown menu
if (themeToggleMobile) {
  themeToggleMobile.addEventListener(
    "click",
    closeMobileMenu
  );
}


/* =========================================================
   5. CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
  "click",
  (event) => {

    if (!menuBtn || !links) {
      return;
    }

    // Cek apakah menu sedang terbuka
    const isOpen =
      links.classList.contains("active");

    if (!isOpen) {
      return;
    }

    // Jika klik di luar navbar menu
    // dan bukan tombol hamburger
    const clickedInsideMenu =
      links.contains(event.target);

    const clickedMenuButton =
      menuBtn.contains(event.target);

    if (
      !clickedInsideMenu &&
      !clickedMenuButton
    ) {
      closeMobileMenu();
    }
  }
);


/* =========================================================
   6. ESCAPE KEY
========================================================= */

// Tekan Escape untuk menutup menu
document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeMobileMenu();
    }
  }
);


/* =========================================================
   7. RESET MENU SAAT RESIZE
========================================================= */

// Jika layar berubah dari mobile
// kembali ke desktop, tutup menu
window.addEventListener(
  "resize",
  () => {

    if (window.innerWidth > 850) {
      closeMobileMenu();
    }
  }
);


/* =========================================================
   8. 3D MODEL SCROLL EFFECT
========================================================= */

// Ambil container 3D model
const modelWrap =
  document.querySelector(".model-wrap");

// Status scroll
let scrollTicking = false;


// Fungsi untuk memperbarui efek model
function updateModelScroll() {

  // Jika model tidak ada,
  // hentikan fungsi
  if (!modelWrap) {
    return;
  }

  const scrollY =
    window.scrollY;


  /* -----------------------------------------
     OPACITY
     
     Model perlahan menghilang
     ketika user melakukan scroll
  ----------------------------------------- */

  const opacity =
    Math.max(
      0,
      1 - scrollY / 600
    );


  /* -----------------------------------------
     BRIGHTNESS
     
     Model sedikit menjadi gelap
     ketika meninggalkan hero
  ----------------------------------------- */

  const brightness =
    Math.max(
      0.35,
      1 - scrollY / 700
    );


  /* -----------------------------------------
     PARALLAX
     
     Model bergerak sedikit ke bawah.
     
     Dibatasi agar tidak bergerak
     terlalu jauh ketika scroll panjang.
  ----------------------------------------- */

  const translateY =
    Math.min(
      scrollY * 0.25,
      150
    );


  // Terapkan opacity
  modelWrap.style.opacity =
    opacity;


  // Terapkan brightness
  modelWrap.style.filter =
    `brightness(${brightness})`;


  // Terapkan posisi parallax
  modelWrap.style.transform =
    `translate3d(0, ${translateY}px, 0)`;

  
  // Izinkan update scroll berikutnya
  scrollTicking = false;
}


// Event scroll
window.addEventListener(
  "scroll",
  () => {

    // Jangan menjalankan terlalu banyak
    // update dalam satu frame
    if (scrollTicking) {
      return;
    }

    scrollTicking = true;

    window.requestAnimationFrame(
      updateModelScroll
    );
  },
  {
    passive: true
  }
);


/* =========================================================
   9. INITIAL STATE
========================================================= */

// Pastikan menu mobile tertutup
// saat halaman pertama kali dibuka
closeMobileMenu();


// Terapkan efek model sesuai
// posisi scroll saat ini
updateModelScroll();