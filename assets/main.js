/* ============================================================
   《金兰同路》共享交互脚本
   - 金色粒子背景
   - NFC 封面仪式感
   - 祝福逐字浮现
   - 音乐播放
   ============================================================ */

(function () {
  'use strict';

  // ---------- 金色粒子背景 ----------
  function initGoldParticles() {
    const canvas = document.getElementById('gold-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    const PARTICLE_COUNT = 50;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class GoldParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = H + Math.random() * 100;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedY = -(Math.random() * 0.4 + 0.15);
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.opacitySpeed = (Math.random() - 0.5) * 0.003;
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.twinkle += this.twinkleSpeed;
        this.opacity += this.opacitySpeed;

        if (this.opacity > 0.8) {
          this.opacity = 0.8;
          this.opacitySpeed = -Math.abs(this.opacitySpeed);
        } else if (this.opacity < 0.1) {
          this.opacity = 0.1;
          this.opacitySpeed = Math.abs(this.opacitySpeed);
        }

        if (this.y < -20) {
          this.reset();
        }
      }
      draw() {
        const twinkleOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.twinkle));
        ctx.save();
        ctx.globalAlpha = twinkleOpacity;
        ctx.shadowBlur = this.size * 6;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.fillStyle = '#F5E6B8';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = new GoldParticle();
      p.y = Math.random() * H;
      particles.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.update();
        p.draw();
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ---------- 封面仪式感 ----------
  function initCover(onOpen) {
    const cover = document.querySelector('.cover');
    if (!cover) {
      if (onOpen) onOpen();
      return;
    }

    function openCover() {
      // 金箔粒子爆开
      burstGoldParticles(cover);

      cover.classList.add('hidden');
      if (onOpen) {
        setTimeout(onOpen, 600);
      }

      // 触发祝福逐字浮现
      if (typeof window.__startBlessingReveal === 'function') {
        window.__startBlessingReveal();
      }

      // 尝试播放音乐（需用户交互后）
      const music = document.getElementById('bgm');
      const musicBtn = document.querySelector('.music-btn');
      if (music) {
        music.volume = 0.5;
        const playPromise = music.play();
        if (playPromise) {
          playPromise
            .then(() => {
              if (musicBtn) musicBtn.classList.add('playing');
            })
            .catch(() => {
              // 被阻止也没关系，用户可以手动点音乐按钮
            });
        }
      }
    }

    // 点击封面任意处开启
    cover.addEventListener('click', openCover);

    // 键盘支持
    document.addEventListener('keydown', function (e) {
      if (e.code === 'Space' || e.code === 'Enter') {
        if (!cover.classList.contains('hidden')) {
          e.preventDefault();
          openCover();
        }
      }
    });
  }

  // ---------- 金箔粒子爆开 ----------
  function burstGoldParticles(container) {
    const burst = document.createElement('canvas');
    burst.className = 'cover__burst';
    burst.width = window.innerWidth;
    burst.height = window.innerHeight;
    container.appendChild(burst);
    const ctx = burst.getContext('2d');
    const sparks = [];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      sparks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        life: 1,
        decay: Math.random() * 0.015 + 0.008,
        hue: 45 + Math.random() * 15
      });
    }

    function tick() {
      ctx.clearRect(0, 0, burst.width, burst.height);
      let alive = false;
      for (const s of sparks) {
        if (s.life <= 0) continue;
        alive = true;
        s.vy += 0.04;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.shadowBlur = s.size * 5;
        ctx.shadowColor = `hsl(${s.hue}, 90%, 60%)`;
        ctx.fillStyle = `hsl(${s.hue}, 95%, 75%)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (alive) {
        requestAnimationFrame(tick);
      } else {
        burst.remove();
      }
    }
    tick();
  }

  // ---------- 祝福逐字浮现 ----------
  function initBlessingReveal() {
    const blessing = document.querySelector('.hero__blessing');
    if (!blessing) return;

    const text = blessing.textContent.trim();
    blessing.innerHTML = '';
    const chars = [];

    for (const ch of text) {
      const span = document.createElement('span');
      span.className = 'char';
      if (/[，。！？、；：]/.test(ch)) {
        span.classList.add('char--punct');
      }
      span.textContent = ch;
      blessing.appendChild(span);
      chars.push(span);
    }

    // 对外暴露触发方法
    window.__startBlessingReveal = function () {
      const startDelay = 800;  // 封面爆开后延迟
      const charInterval = 140; // 每个字的间隔
      chars.forEach((char, i) => {
        setTimeout(() => {
          char.classList.add('revealed');
        }, startDelay + i * charInterval);
      });
    };
  }

  // ---------- 音乐按钮 ----------
  function initMusicButton() {
    const music = document.getElementById('bgm');
    const btn = document.querySelector('.music-btn');
    if (!music || !btn) return;

    btn.classList.add('visible');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (music.paused) {
        music.play();
        btn.classList.add('playing');
      } else {
        music.pause();
        btn.classList.remove('playing');
      }
    });

    music.addEventListener('ended', function () {
      music.currentTime = 0;
      music.play().catch(() => {});
    });
  }

  // ---------- 滚动出现动画 ----------
  function initScrollReveal() {
    const elements = document.querySelectorAll('.memory, .timeline, .ending');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.style.opacity = '1');
      return;
    }

    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  }

  // ---------- 首页链接显示 ----------
  function initHomeLink() {
    const link = document.querySelector('.home-link');
    if (!link) return;
    setTimeout(() => link.classList.add('visible'), 2000);
  }

  // ---------- 向下滚动提示：下滑渐隐，回顶显现 ----------
  function initScrollHint() {
    const hint = document.querySelector('.hero__scroll');
    if (!hint) return;
    let ticking = false;
    window.addEventListener(
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          if (window.scrollY > 60) {
            hint.classList.add('is-hidden');
          } else {
            hint.classList.remove('is-hidden');
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  // ---------- 首页自动播放（无封面的页面） ----------
  function initAutoPlayForHome() {
    if (document.querySelector('.cover')) return; // 个人页由封面触发播放
    const music = document.getElementById('bgm');
    if (!music) return;

    function tryPlay() {
      music.volume = 0.5;
      music.play().then(() => {
        const btn = document.querySelector('.music-btn');
        if (btn) btn.classList.add('playing');
      }).catch(() => {});
    }

    tryPlay();

    // 若被浏览器自动播放策略阻止，首次交互时补播
    const events = ['click', 'touchstart', 'keydown'];
    const onFirst = () => {
      events.forEach(e => document.removeEventListener(e, onFirst));
      tryPlay();
    };
    events.forEach(e => document.addEventListener(e, onFirst));
  }

  // ---------- 初始化 ----------
  document.addEventListener('DOMContentLoaded', function () {
    initGoldParticles();
    initBlessingReveal();
    initMusicButton();
    initScrollReveal();
    initHomeLink();
    initScrollHint();
    initAutoPlayForHome();

    initCover(() => {
      const main = document.querySelector('.main');
      if (main) main.classList.add('visible');
    });
  });
})();
