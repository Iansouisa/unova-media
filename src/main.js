import "./style.css";

document.querySelectorAll(".faq-item").forEach((details) => {
  const summary = details.querySelector("summary");
  const answer = details.querySelector(".faq-answer");

  answer.style.height = "0px";

  summary.addEventListener("click", (e) => {
    e.preventDefault();

    if (details.open) {
      answer.style.height = answer.scrollHeight + "px";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          answer.style.height = "0px";
        });
      });
      answer.addEventListener(
        "transitionend",
        () => {
          details.removeAttribute("open");
        },
        { once: true },
      );
    } else {
      details.setAttribute("open", "");
      requestAnimationFrame(() => {
        answer.style.height = answer.scrollHeight + "px";
      });
      answer.addEventListener(
        "transitionend",
        () => {
          answer.style.height = "auto";
        },
        { once: true },
      );
    }
  });
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Sticky CTA — fade in once hero's midpoint scrolls past the top
const hero = document.querySelector("section.relative.pt-30");
const stickyCta = document.getElementById("sticky-cta");
if (hero && stickyCta) {
  const onScroll = () => {
    const { top, height } = hero.getBoundingClientRect();
    stickyCta.classList.toggle("visible", top + height * 0.7 < 0);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  setTimeout(() => stickyCta.classList.add("ready"), 300);
}

// Cal.com inline embed
(function (C, A, L) {
  let p = function (a, ar) {
    a.q.push(ar);
  };
  let d = C.document;
  C.Cal =
    C.Cal ||
    function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
})(window, "https://app.cal.com/embed/embed.js", "init");

Cal("init", "discovery-call", { origin: "https://app.cal.com" });
Cal.ns["discovery-call"]("inline", {
  elementOrSelector: "#my-cal-inline-discovery-call",
  config: {
    layout: "month_view",
    useSlotsViewOnSmallScreen: "true",
    theme: "light",
  },
  calLink: "team/unova-media/discovery-call",
});
Cal.ns["discovery-call"]("ui", {
  theme: "light",
  cssVarsPerTheme: { light: { "cal-brand": "#231F20" } },
  hideEventTypeDetails: false,
  layout: "month_view",
});
