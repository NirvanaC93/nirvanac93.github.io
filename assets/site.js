(() => {
  const d = window.SITE_CONTENT || {};
  const $ = (id) => document.getElementById(id);
  const safe = (value) => String(value ?? "");
  const escapeHtml = (value) => safe(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  const link = (label, url, cls = "") => {
    const href = safe(url);
    if (!/^https:\/\//i.test(href)) return "";
    return `<a class="${escapeHtml(cls)}" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`;
  };
  const empty = (message) => `<p class="empty-state">${escapeHtml(message)}</p>`;
  const renderEntries = (items, note = "") => {
    if (!items?.length) return empty("More information will be added soon.");
    const intro = note ? `<p class="small muted">${escapeHtml(note)}</p>` : "";
    return intro + items.map(item => {
      const metaDate = escapeHtml(item.date || item.year || item.period);
      const metaEvent = item.venue
        ? escapeHtml(item.venue)
        : item.eventUrl
          ? link(item.event, item.eventUrl)
          : escapeHtml(item.event || item.institution || item.role);
      const metaPlace = escapeHtml(item.place);
      const meta = [metaDate, metaEvent, metaPlace].filter(Boolean).join(" · ");
      const title = item.url ? link(item.title, item.url) : escapeHtml(item.title);
      const detail = escapeHtml(item.authors);
      return `<article class="entry"><div class="entry-meta">${meta}</div><h4>${title}</h4>${detail ? `<p>${detail}</p>` : ""}${item.materials ? link("Course materials", item.materials, "text-link") : ""}</article>`;
    }).join("");
  };
  $("name").textContent = d.name || "Nirvana Coppola";
  document.title = `${d.name || "Nirvana Coppola"} — Mathematics`;
  $("position").textContent = d.position || "";
  $("intro").textContent = d.intro || "";
  $("research-summary").textContent = d.researchSummary || "";
  $("research-topics").innerHTML = (d.topics || []).map(t => `<span class="topic">${escapeHtml(t)}</span>`).join("");
  $("research-projects-list").innerHTML = renderEntries(d.researchProjects);
  $("publications-list").innerHTML = renderEntries(d.publications);
  $("preprints-list").innerHTML = renderEntries(d.preprints);
  $("talks-list").innerHTML = renderEntries(d.talks, d.talksNote);
  $("events-list").innerHTML = renderEntries(d.events);
  $("teaching-summary").textContent = d.teachingSummary || "";
  $("teaching-list").innerHTML = renderEntries(d.teaching);
  $("about-text").textContent = d.about || "";
  $("year").textContent = new Date().getFullYear();
  const labels = { orcid: "ORCID", github: "GitHub", researchgate: "ResearchGate", linkedin: "LinkedIn" };
  const profileLinks = Object.entries(labels).map(([k, label]) => link(label, d.links?.[k]));
  if (d.links?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.links.email)) {
    profileLinks.unshift(`<a href="mailto:${escapeHtml(d.links.email)}">Email ↗</a>`);
  }
  $("profile-links").innerHTML = profileLinks.filter(Boolean).join("");
  const toggle = document.querySelector(".menu-toggle"), nav = $("site-nav");
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("is-open", !open);
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open"); toggle?.setAttribute("aria-expanded", "false");
  }));
})();