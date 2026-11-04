(() => {
  const d = window.SITE_CONTENT || {};
  const $ = (id) => document.getElementById(id);
  const safe = (value) => String(value ?? "");
  const link = (label, url, cls = "") => {
    if (!url) return "";
    return `<a class="${cls}" href="${safe(url)}" target="_blank" rel="noopener noreferrer">${safe(label)} ↗</a>`;
  };
  const empty = (message) => `<p class="empty-state">${message}</p>`;
  const renderEntries = (items) => {
    if (!items?.length) return empty("More information will be added soon.");
    return items.map(item => {
      const meta = [item.date || item.year || item.period, item.venue || item.event || item.institution || item.role, item.place].filter(Boolean).join(" · ");
      const title = item.url ? link(item.title, item.url) : safe(item.title);
      const detail = [item.authors].filter(Boolean).join(" · ");
      return `<article class="entry"><div class="entry-meta">${safe(meta)}</div><h4>${title}</h4>${detail ? `<p>${safe(detail)}</p>` : ""}${item.materials ? link("Course materials", item.materials, "text-link") : ""}</article>`;
    }).join("");
  };
  $("name").textContent = d.name || "Nirvana Coppola";
  document.title = `${d.name || "Nirvana Coppola"} — Mathematics`;
  $("position").textContent = d.position || "";
  $("intro").textContent = d.intro || "";
  $("research-summary").textContent = d.researchSummary || "";
  $("research-topics").innerHTML = (d.topics || []).map(t => `<span class="topic">${safe(t)}</span>`).join("");
  $("publications-list").innerHTML = renderEntries(d.publications);
  $("preprints-list").innerHTML = renderEntries(d.preprints);
  $("talks-list").innerHTML = renderEntries(d.talks);
  $("events-list").innerHTML = renderEntries(d.events);
  $("teaching-summary").textContent = d.teachingSummary || "";
  $("teaching-list").innerHTML = renderEntries(d.teaching);
  $("about-text").textContent = d.about || "";
  $("year").textContent = new Date().getFullYear();
  const labels = { orcid: "ORCID", github: "GitHub", researchgate: "ResearchGate", linkedin: "LinkedIn" };
  $("quick-links").innerHTML = ["orcid", "github"].map(k => link(labels[k], d.links?.[k])).filter(Boolean).join("");
  $("profile-links").innerHTML = Object.entries(labels).map(([k, label]) => link(label, d.links?.[k])).filter(Boolean).join("");
  if (d.links?.orcid) {
    $("orcid-link").href = d.links.orcid;
  } else {
    $("orcid-note").hidden = true;
  }
  $("email-line").innerHTML = d.links?.email ? `Contact: <a href="mailto:${safe(d.links.email)}">${safe(d.links.email)}</a>` : "";
  const toggle = document.querySelector(".menu-toggle"), nav = $("site-nav");
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("is-open", !open);
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open"); toggle?.setAttribute("aria-expanded", "false");
  }));
})();