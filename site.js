/* ============================================================
   TimeFlow site — shared behavior
   · bilingual toggle (persisted)  · mobile drawer  · scroll reveal
   ============================================================ */
(function () {
  'use strict';

  /* ---------- language ---------- */
  var STORE = 'tf_lang';
  function getLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORE); } catch (e) {}
    if (saved === 'zh' || saved === 'en') return saved;
    // first visit: infer from browser, default zh
    var nav = (navigator.language || 'zh').toLowerCase();
    return nav.indexOf('zh') === 0 ? 'zh' : (nav.indexOf('en') === 0 ? 'en' : 'zh');
  }
  function applyLang(lang) {
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-lang-btn') === lang);
    });
    // swap document title if a translated one is provided
    var t = document.querySelector('title[data-en]');
    if (t) {
      if (lang === 'en') { if (!t.dataset.zh) t.dataset.zh = t.textContent; t.textContent = t.dataset.en; }
      else if (t.dataset.zh) { t.textContent = t.dataset.zh; }
    }
  }
  window.tfSetLang = function (lang) { applyLang(lang); };

  /* apply ASAP to avoid flash */
  applyLang(getLang());

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());

    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang-btn')); });
    });

    /* ---------- mobile drawer ---------- */
    var burger = document.querySelector('[data-burger]');
    var drawer = document.querySelector('[data-drawer]');
    if (burger && drawer) {
      burger.addEventListener('click', function () {
        drawer.classList.toggle('open');
        document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
      });
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          drawer.classList.remove('open'); document.body.style.overflow = '';
        });
      });
    }

    /* ---------- footer year ---------- */
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* ---------- scroll reveal ---------- */
    var els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && els.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('in'); });
    }
  });
})();
