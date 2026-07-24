/* ═══════════════════════════════════════════════════════════════
   NEXUS LEARNING LAB — Typewriter Animation
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  class Typewriter {
    constructor(elementId, phrases, options = {}) {
      this.el = document.getElementById(elementId);
      if (!this.el) return;

      this.phrases = phrases;
      this.config = {
        typeSpeed:    options.typeSpeed    || 80,
        deleteSpeed:  options.deleteSpeed  || 45,
        pauseAfter:   options.pauseAfter   || 1800,
        pauseBefore:  options.pauseBefore  || 400,
        loop:         options.loop !== false,
      };

      this.currentPhrase = 0;
      this.currentChar   = 0;
      this.isDeleting    = false;
      this.timer         = null;

      this.tick();
    }

    tick() {
      const phrase  = this.phrases[this.currentPhrase];
      const current = this.el.textContent;

      if (this.isDeleting) {
        // Remove one character
        this.el.textContent = phrase.substring(0, current.length - 1);
      } else {
        // Add one character
        this.el.textContent = phrase.substring(0, current.length + 1);
      }

      let delay = this.isDeleting ? this.config.deleteSpeed : this.config.typeSpeed;

      // Finished typing
      if (!this.isDeleting && this.el.textContent === phrase) {
        delay = this.config.pauseAfter;
        this.isDeleting = true;
      }

      // Finished deleting
      if (this.isDeleting && this.el.textContent === '') {
        this.isDeleting = false;
        this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
        delay = this.config.pauseBefore;
      }

      this.timer = setTimeout(() => this.tick(), delay);
    }

    destroy() {
      if (this.timer) clearTimeout(this.timer);
    }
  }

  window.Typewriter = Typewriter;
})();
