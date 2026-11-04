(() => {
  const d = window.SITE_CONTENT || {};
  const $ = (id) => document.getElementById(id);
  const safe = (value) => String(value ?? "");
  const link = (label, url, cls = "") => {
    if (!url) return "";
    return `<a class="${cls}" href="${safe(url)}" target="_blank" rel="noopener noreferrer">${safe(label)} ↗</a>`;
  };
  const empty = (message) => `<p class="empty-state">${message}</p>`;
  const renderEntries = (items, note = "") => {
    if (!items?.length) return empty("More information will be added soon.");
    const intro = note ? `<p class="small muted">${safe(note)}</p>` : "";
    return intro + items.map(item => {
      const metaDate = safe(item.date || item.year || item.period);
      const metaEvent = item.venue
        ? safe(item.venue)
        : item.eventUrl
          ? link(item.event, item.eventUrl)
          : safe(item.event || item.institution || item.role);
      const metaPlace = safe(item.place);
      const meta = [metaDate, metaEvent, metaPlace].filter(Boolean).join(" · ");
      const title = item.url ? link(item.title, item.url) : safe(item.title);
      const detail = [item.authors].filter(Boolean).join(" · ");
      return `<article class="entry"><div class="entry-meta">${meta}</div><h4>${title}</h4>${detail ? `<p>${safe(detail)}</p>` : ""}${item.materials ? link("Course materials", item.materials, "text-link") : ""}</article>`;
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
  $("talks-list").innerHTML = renderEntries(d.talks, d.talksNote);
  $("events-list").innerHTML = renderEntries(d.events);
  $("teaching-summary").textContent = d.teachingSummary || "";
  $("teaching-list").innerHTML = renderEntries(d.teaching);
  $("about-text").textContent = d.about || "";
  $("year").textContent = new Date().getFullYear();
  const labels = { orcid: "ORCID", github: "GitHub", researchgate: "ResearchGate", linkedin: "LinkedIn" };
  const profileLinks = Object.entries(labels).map(([k, label]) => link(label, d.links?.[k]));
  if (d.links?.email) profileLinks.unshift(`<a href="mailto:${safe(d.links.email)}">Email ↗</a>`);
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