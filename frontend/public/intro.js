/* Index 2026
   1. select an entry -> everything unrelated fades, its connections stay lit
   2. the contents bar marks the section you are currently in */

(function () {
  "use strict";

  var rows = Array.prototype.slice.call(document.querySelectorAll(".row"));
  var seealso = document.getElementById("seealso");
  var seealsoLabel = document.getElementById("seealso-label");
  var clearBtn = document.getElementById("clear");

  /* ---- 1. see also ---- */

  // relations are written once in the markup; make them work both ways
  var byId = {};
  var linked = {};
  rows.forEach(function (row) {
    byId[row.dataset.id] = row;
    linked[row.dataset.id] = {};
  });
  rows.forEach(function (row) {
    var id = row.dataset.id;
    (row.dataset.rel || "").split(/\s+/).forEach(function (other) {
      if (!other || !linked[other]) return;
      linked[id][other] = true;
      linked[other][id] = true;
    });
  });

  var activeId = null;

  function focusEntry(id) {
    if (activeId === id) { clearFocus(); return; }
    activeId = id;
    document.body.classList.add("focusing");

    rows.forEach(function (row) {
      var rid = row.dataset.id;
      row.classList.toggle("active", rid === id);
      row.classList.toggle("rel", !!linked[id][rid]);
    });

    // a section with nothing lit inside it steps back too
    document.querySelectorAll(".sec").forEach(function (sec) {
      sec.classList.toggle("quiet", !sec.querySelector(".row.active, .row.rel"));
    });

    seealsoLabel.textContent = "See also — " + byId[id].querySelector(".ttl").firstChild.nodeValue;
    seealso.hidden = false;
  }

  function clearFocus() {
    activeId = null;
    document.body.classList.remove("focusing");
    rows.forEach(function (row) { row.classList.remove("active", "rel"); });
    document.querySelectorAll(".sec").forEach(function (sec) { sec.classList.remove("quiet"); });
    seealso.hidden = true;
  }

  rows.forEach(function (row) {
    if (row.tagName !== "BUTTON") return;   // the Lab entry is a link — let it navigate
    row.addEventListener("click", function () { focusEntry(row.dataset.id); });
  });

  clearBtn.addEventListener("click", clearFocus);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && activeId) clearFocus();
  });

  /* ---- 2. where am I ---- */

  var jumpLinks = {};
  document.querySelectorAll(".jump a").forEach(function (a) {
    jumpLinks[a.dataset.sec] = a;
  });

  function markCurrent(sec) {
    for (var key in jumpLinks) {
      jumpLinks[key].classList.toggle("here", key === sec);
    }
  }

  if ("IntersectionObserver" in window) {
    var seen = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { seen[entry.target.dataset.sec] = entry.isIntersecting; });
      // the topmost section still on screen wins
      var order = Object.keys(jumpLinks);
      for (var i = 0; i < order.length; i++) {
        if (seen[order[i]]) { markCurrent(order[i]); return; }
      }
    }, { rootMargin: "-72px 0px -65% 0px" });

    document.querySelectorAll(".sec").forEach(function (sec) { observer.observe(sec); });
  }
})();
