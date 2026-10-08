const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeBtn");

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "☾" : "☼";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const counters = document.querySelectorAll(".counter");
let counted = false;
const counterObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || counted) return;
  counted = true;
  counters.forEach(el => {
    const target = Number(el.dataset.target);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 35));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 35);
  });
}, {threshold: .7});
counterObserver.observe(document.querySelector(".stats"));

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project").forEach(project => {
      const show = filter === "all" || project.dataset.category === filter;
      project.style.display = show ? "" : "none";
    });
  });
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");
  const subject = encodeURIComponent(`New website enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:motiongraphix@gmail.com?subject=${subject}&body=${body}`;
  status.textContent = "Opening your email app…";
});

document.addEventListener("mousemove", e => {
  const glow = document.querySelector(".cursor-glow");
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

function downloadResume(e) {
  e.preventDefault();
  alert("Add your resume file as resume.pdf in this folder, then change this button to link to it.");
}
