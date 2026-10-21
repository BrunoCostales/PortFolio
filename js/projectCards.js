import { projects, categories } from "./projectsData.js";

const labels = {
  en: {
    more: "Read more",
    live: "View project",
    github: "GitHub",
    private: "Private repository",
    did: "What I did",
    client: "Client",
    role: "Role",
    learned: "What I learned",
    enabled: "What it enabled",
    close: "Close",
  },
  es: {
    more: "Ver más",
    live: "Ver proyecto",
    github: "GitHub",
    private: "Repositorio privado",
    did: "Qué hice",
    client: "Cliente",
    role: "Rol",
    learned: "Qué aprendí",
    enabled: "Qué me permitió",
    close: "Cerrar",
  },
};

const lang = document.documentElement.lang === "es" ? "es" : "en";
const t = labels[lang];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function linksFor(project) {
  const box = el("div", "miniLinks");
  if (project.links?.live) box.append(link(project.links.live, t.live));
  if (project.links?.github) box.append(link(project.links.github, t.github));
  if (project.private) box.append(el("span", "privateBadge", t.private));
  return box;
}

function link(href, text) {
  const a = el("a", "", text);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

function cover(project) {
  const box = el("div", `miniCover cover-${project.category}`);
  if (project.image) {
    const img = el("img");
    img.src = project.image;
    img.alt = project.title;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 640;
    img.height = 360;
    box.append(img);
  } else {
    box.append(el("span", "coverMark", project.title));
  }
  return box;
}

function card(project) {
  const text = project[lang];
  const article = el("article", "miniWork");

  article.append(cover(project));

  const body = el("div", "miniBody");
  body.append(el("p", "miniMeta", `${categories[project.category][lang]} · ${project.year}`));
  body.append(el("h3", "miniTitle", project.title));
  body.append(el("p", "miniSubtitle", text.subtitle));
  body.append(el("p", "miniSummary", text.summary));

  const tags = el("ul", "miniTags");
  project.tags.slice(0, 4).forEach((tag) => tags.append(el("li", "", tag)));
  body.append(tags);

  const actions = el("div", "miniActions");
  const more = el("button", "miniMore", t.more);
  more.type = "button";
  more.addEventListener("click", () => openDetail(project));
  actions.append(more, linksFor(project));
  body.append(actions);

  article.append(body);
  return article;
}

let dialog;

function openDetail(project) {
  const text = project[lang];
  dialog.querySelector(".detailContent").replaceChildren(detail(project, text));
  dialog.showModal();
}

function detail(project, text) {
  const box = el("div");
  box.append(el("p", "miniMeta", `${categories[project.category][lang]} · ${project.year}`));
  box.append(el("h2", "detailTitle", project.title));
  box.append(el("p", "miniSubtitle", text.subtitle));
  box.append(el("p", "detailText", text.description));

  [
    ["did", text.did],
    ["role", text.role],
    ["client", text.client],
    ["learned", text.learned],
    ["enabled", text.enabled],
  ].forEach(([key, value]) => {
    box.append(el("h4", "detailHeading", t[key]));
    box.append(el("p", "detailText", value));
  });

  const tags = el("ul", "miniTags");
  project.tags.forEach((tag) => tags.append(el("li", "", tag)));
  box.append(tags, linksFor(project));
  return box;
}

function createDialog() {
  dialog = el("dialog", "projectDetail");
  const close = el("button", "detailClose", "×");
  close.type = "button";
  close.setAttribute("aria-label", t.close);
  close.addEventListener("click", () => dialog.close());
  dialog.append(close, el("div", "detailContent"));
  // Cerrar al hacer click en el fondo
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  document.body.append(dialog);
}

export function renderProjects() {
  const list = document.querySelector(".projectList");
  if (!list) return;
  createDialog();
  list.replaceChildren(...projects.map(card));
}
