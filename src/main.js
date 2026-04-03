// Cal.com embed
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
Cal("init", "onboarding-call", { origin: "https://app.cal.com" });

Cal.ns["onboarding-call"]("inline", {
  elementOrSelector: "#my-cal-inline-onboarding-call",
  config: {
    layout: "month_view",
    useSlotsViewOnSmallScreen: "true",
  },
  calLink: "team/dominium-ecom/onboarding-call",
});

Cal.ns["onboarding-call"]("ui", {
  hideEventTypeDetails: false,
  layout: "month_view",
});

// Scroll-reveal with Intersection Observer
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => revealObserver.observe(el));

// Cursor-following glow
const heroSection = document.getElementById("hero");
const heroGlow = document.getElementById("heroGlow");
if (heroSection && heroGlow) {
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    heroGlow.style.left = e.clientX - rect.left + "px";
    heroGlow.style.top = e.clientY - rect.top + "px";
    heroGlow.classList.add("active");
  });
  heroSection.addEventListener("mouseleave", () => {
    heroGlow.classList.remove("active");
  });
}

// Dynamic calendar
(function () {
  const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // April 2026 keeps its original specific event days
  const FIXED_EVENTS = {
    "2026-3": [3, 7, 9, 10, 15, 17, 21, 24, 27, 30],
  };

  const today = new Date();
  const END_YEAR = today.getFullYear();
  const END_MONTH = 11; // December
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  // Returns a Set of 10 weekday event days spread evenly across the month
  function getEventDays(year, month) {
    const key = year + "-" + month;
    if (FIXED_EVENTS[key]) return new Set(FIXED_EVENTS[key]);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weekdays = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dow = new Date(year, month, d).getDay();
      if (dow !== 0 && dow !== 6) weekdays.push(d);
    }
    const events = new Set();
    const count = Math.min(10, weekdays.length);
    for (let i = 0; i < count; i++) {
      const idx = Math.round((i * (weekdays.length - 1)) / (count - 1));
      events.add(weekdays[idx]);
    }
    return events;
  }

  function updateButtonStates() {
    const prevBtn = document.getElementById("cal-prev");
    const nextBtn = document.getElementById("cal-next");
    const atStart = viewYear === 2026 && viewMonth === 0;
    const atEnd = viewYear === END_YEAR && viewMonth === END_MONTH;
    prevBtn.style.visibility = atStart ? "hidden" : "visible";
    nextBtn.style.visibility = atEnd ? "hidden" : "visible";
  }

  function renderCalendar(year, month) {
    const label = document.getElementById("cal-month-label");
    const grid = document.getElementById("cal-grid");
    if (!label || !grid) return;

    label.textContent = MONTH_NAMES[month] + " " + year;

    const eventDays = getEventDays(year, month);
    const isCurrentMonth =
      year === today.getFullYear() && month === today.getMonth();
    const todayDate = today.getDate();

    const firstDow = new Date(year, month, 1).getDay();
    const leadingBlanks = (firstDow + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = "";

    for (let i = 0; i < leadingBlanks; i++) {
      html += "<div></div>";
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dow = (leadingBlanks + d - 1) % 7; // 0=Mon..6=Sun
      const isWeekend = dow === 5 || dow === 6;
      const hasEvent = eventDays.has(d) && !isWeekend;
      const isToday = isCurrentMonth && d === todayDate;

      let numClasses = "cal-num";
      if (hasEvent) numClasses += " cal-num-event";
      else if (isWeekend) numClasses += " cal-num-dim";
      if (isToday) numClasses += " cal-num-today";

      html += '<div class="cal-day">';
      html += '<span class="' + numClasses + '">' + d + "</span>";
      if (hasEvent) html += '<span class="cal-dot"></span>';
      html += "</div>";
    }

    // Always 42 cells (6 rows) — grid-auto-rows keeps height fixed
    const totalCells = leadingBlanks + daysInMonth;
    for (let i = 0; i < 42 - totalCells; i++) {
      html += "<div></div>";
    }

    grid.innerHTML = html;
    updateButtonStates();
  }

  function navigateTo(year, month) {
    const grid = document.getElementById("cal-grid");
    grid.style.opacity = "0";
    setTimeout(function () {
      renderCalendar(year, month);
      grid.style.opacity = "1";
    }, 160);
  }

  renderCalendar(viewYear, viewMonth);

  // Live clock
  function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    var el = document.getElementById("cal-time");
    if (el) {
      el.textContent =
        String(h).padStart(2, "0") +
        ":" +
        String(m).padStart(2, "0") +
        ":" +
        String(s).padStart(2, "0") +
        " " +
        ampm;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Auto-advance calendar every 4 seconds; wraps back to current month after December
  setInterval(function () {
    if (viewYear === END_YEAR && viewMonth === END_MONTH) {
      viewYear = today.getFullYear();
      viewMonth = today.getMonth();
    } else {
      viewMonth++;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear++;
      }
    }
    navigateTo(viewYear, viewMonth);
  }, 4000);

  document
    .getElementById("cal-prev")
    .addEventListener("click", function () {
      if (viewYear === 2026 && viewMonth === 0) return;
      viewMonth--;
      if (viewMonth < 0) {
        viewMonth = 11;
        viewYear--;
      }
      navigateTo(viewYear, viewMonth);
    });

  document
    .getElementById("cal-next")
    .addEventListener("click", function () {
      if (viewYear === END_YEAR && viewMonth === END_MONTH) return;
      viewMonth++;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear++;
      }
      navigateTo(viewYear, viewMonth);
    });
})();

// Smooth FAQ accordion
document.querySelectorAll(".faq-item").forEach((details) => {
  const summary = details.querySelector("summary");
  const answer = details.querySelector(".faq-answer");

  summary.addEventListener("click", (e) => {
    e.preventDefault();

    if (details.open) {
      // Animate closed, then remove [open]
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.opacity = "1";
      answer.getBoundingClientRect(); // force reflow
      answer.style.maxHeight = "0px";
      answer.style.opacity = "0";
      answer.addEventListener("transitionend", function handler(ev) {
        if (ev.propertyName !== "max-height") return;
        answer.removeEventListener("transitionend", handler);
        details.removeAttribute("open");
        answer.style.maxHeight = "";
        answer.style.opacity = "";
      });
    } else {
      // Add [open], then animate open
      details.setAttribute("open", "");
      answer.style.maxHeight = "0px";
      answer.style.opacity = "0";
      answer.getBoundingClientRect(); // force reflow
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.opacity = "1";
      answer.addEventListener("transitionend", function handler(ev) {
        if (ev.propertyName !== "max-height") return;
        answer.removeEventListener("transitionend", handler);
        answer.style.maxHeight = "";
        answer.style.opacity = "";
      });
    }
  });
});
