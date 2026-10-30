// Add verified public profile URLs here as they arrive.
const profileLinks = {
  github: "https://github.com/Praveen9963-77",
  linkedin: "https://www.linkedin.com/in/praveen-a-19866a2b6/",
  leetcode: "https://leetcode.com/u/Praveen779/"
};

const projectDetails = [
  {
    title: "One Stop Personalized Career & Education Advisor",
    description: "A career guidance platform that uses user profiles and assessment results to suggest paths, identify skill gaps, and support learners as they make progress.",
    points: ["Career suggestions based on profile and assessment results", "Classification models for career prediction and similar job recommendations", "Resume skill extraction and skill-gap analysis", "Roadmaps, learning paths, educational resources, and progress tracking"],
    stack: ["MERN Stack", "Python", "Classification Algorithms", "NLP"]
  },
  {
    title: "Multi-Vendor E-Commerce Platform",
    description: "A marketplace with dedicated workflows for customers, sellers, and administrators, covering product discovery through order management.",
    points: ["Role-specific access and account management", "Product browsing, search, filtering, reviews, and pagination", "Inventory tracking and seller workflows", "Order placement and management across customers and sellers"],
    stack: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js"]
  }
];

const cards = [...document.querySelectorAll(".project-card")];
const modal = document.querySelector(".modal");
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };
function showProject(index) {
  const data = projectDetails[index];
  document.querySelector("#modal-title").textContent = data.title;
  document.querySelector(".modal-description").textContent = data.description;
  document.querySelector(".modal-highlights").innerHTML = data.points.map(point => `<div><span>↗</span>${point}</div>`).join("");
  document.querySelector(".modal-stack").innerHTML = data.stack.map(item => `<span>${item}</span>`).join("");
  modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
  document.querySelector(".modal-close").focus();
}
cards.forEach((card, index) => {
  card.addEventListener("click", () => showProject(index));
  card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); showProject(index); } });
});
document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

const nav = document.querySelector(".main-nav");
const menu = document.querySelector(".menu-toggle");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }));

const toast = document.querySelector(".toast");
let toastTimer;
function notify(message) { toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2100); }
document.querySelector(".copy-email").addEventListener("click", async event => {
  const email = event.currentTarget.dataset.email;
  try { await navigator.clipboard.writeText(email); notify("Email copied to clipboard"); }
  catch { window.location.href = `mailto:${email}`; }
});

document.querySelectorAll(".social-link").forEach(link => {
  const key = link.dataset.social;
  if (profileLinks[key]) { link.href = profileLinks[key]; link.target = "_blank"; link.rel = "noopener noreferrer"; link.querySelector(".social-value").innerHTML = "OPEN PROFILE <b>↗</b>"; }
  else link.addEventListener("click", event => { event.preventDefault(); notify(`Add your ${key === "leetcode" ? "LeetCode" : key[0].toUpperCase() + key.slice(1)} URL in script.js`); });
});
