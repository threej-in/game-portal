(function () {
  if (window.top !== window.self) return;
  if (window.__threejLeavePromptInstalled) return;
  window.__threejLeavePromptInstalled = true;

  function cameFromThisSite() {
    if (!document.referrer) return false;

    try {
      return new URL(document.referrer).origin === window.location.origin;
    } catch (error) {
      return false;
    }
  }

  if (cameFromThisSite()) return;

  var allowLeave = false;
  var modal;
  var trapHash = "#threej-leave";
  var trapArmed = false;

  function currentWithoutHash() {
    return window.location.pathname + window.location.search;
  }

  function installTrap() {
    if (trapArmed && window.location.hash === trapHash) return;
    history.replaceState({ threejGamePage: true }, "", currentWithoutHash());
    history.pushState({ threejLeaveTrap: true }, "", currentWithoutHash() + trapHash);
    trapArmed = true;
  }

  function ensureModal() {
    if (modal) return modal;

    var style = document.createElement("style");
    style.textContent =
      ".threej-leave-overlay{position:fixed;inset:0;z-index:2147483647;display:none;align-items:center;justify-content:center;background:rgba(2,6,23,.72);font-family:Arial,sans-serif}" +
      ".threej-leave-box{width:min(420px,calc(100vw - 32px));border:1px solid rgba(148,163,184,.35);border-radius:12px;background:#0f172a;color:#f8fafc;box-shadow:0 24px 80px rgba(0,0,0,.55);padding:22px}" +
      ".threej-leave-title{margin:0;font-size:22px;font-weight:800;line-height:1.2}" +
      ".threej-leave-text{margin:10px 0 18px;color:#cbd5e1;font-size:15px;line-height:1.45}" +
      ".threej-leave-actions{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}" +
      ".threej-leave-button{border:0;border-radius:8px;padding:11px 14px;font-size:14px;font-weight:800;cursor:pointer}" +
      ".threej-leave-home{background:#22d3ee;color:#082f49}" +
      ".threej-leave-stay{background:#1e293b;color:#e2e8f0}";
    document.head.appendChild(style);

    modal = document.createElement("div");
    modal.className = "threej-leave-overlay";
    modal.innerHTML =
      '<div class="threej-leave-box" role="dialog" aria-modal="true" aria-labelledby="threej-leave-title">' +
      '<h2 class="threej-leave-title" id="threej-leave-title">Try other games?</h2>' +
      '<p class="threej-leave-text">You are leaving this game. Visit the homepage to discover more games, or stay here and keep playing.</p>' +
      '<div class="threej-leave-actions">' +
      '<button class="threej-leave-button threej-leave-exit" type="button">Exit</button>' +
      '<button class="threej-leave-button threej-leave-stay" type="button">Keep playing</button>' +
      '<button class="threej-leave-button threej-leave-home" type="button">Go to homepage</button>' +
      "</div></div>";
    document.body.appendChild(modal);

    modal.querySelector(".threej-leave-stay").addEventListener("click", function () {
      modal.style.display = "none";
      installTrap();
    });

    modal.querySelector(".threej-leave-home").addEventListener("click", function () {
      allowLeave = true;
      window.location.href = "/";
    });

    modal.querySelector(".threej-leave-exit").addEventListener("click", function () {
      allowLeave = true;
      trapArmed = false;
      history.go(-2);
    });

    return modal;
  }

  function showModal() {
    ensureModal().style.display = "flex";
  }

  window.addEventListener("popstate", function () {
    if (allowLeave || !trapArmed) return;
    trapArmed = false;
    installTrap();
    showModal();
  });

  window.addEventListener("beforeunload", function (event) {
    if (allowLeave) return;
    event.preventDefault();
    event.returnValue = "";
  });

  installTrap();
})();
