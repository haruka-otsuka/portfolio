/**
 * 慣性スクロール
 */
// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


/**
 * スクロールトップ
 */
export function initScrollTop() {
  const scrollTop = document.querySelector('.js-scroll-top');
  if (!scrollTop) return;

  scrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/**
 * マウスストーカー
 */
export function initMouseStalker() {
  if (window.matchMedia( "(pointer: fine)" ).matches) {
    const mouseStalker = document.querySelector('.mouse-stalker');
    if(!mouseStalker) return;
    mouseStalker.classList.add('active');

    // マウスとストーカの初期化
    const mouse = { x: 0, y: 0 };
    const stalker = { x: 0, y: 0 };

    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    //更新処理
      const update = () => {
        stalker.x = stalker.x + (mouse.x - stalker.x) * 0.15;
        stalker.y = stalker.y + (mouse.y - stalker.y) * 0.15;

        // 小数点第一位まで四捨五入
        const x = Math.round(stalker.x * 10) / 10;
        const y = Math.round(stalker.y * 10) / 10;

        mouseStalker.style.transform = `translate3d(` + x + 'px,' + y + 'px, 0)'

        requestAnimationFrame(update);
      }
    update();
  } 
}


// /**
//  * fvの動き制御
//  */
function initFvMotion() {
  const wrap = document.querySelector('.js-fv');
  const item = document.querySelector('.js-fv__decorative-flower-img');
  if (!wrap || !item) return;

  // 加速度
  const acc = {
    accTranslateX: 0.3,
    accTranslateY: 0.3,
    accRotateX: -0.3,
    accRotateY: -0.3
  };

  let pointerX = 0;
  let pointerY = 0;
  let x = 0;
  let y = 0;

  const minmax = (num) => Math.min(0.5, Math.max(-0.5, num));

  const coordinate = () => {
    const wrapRect = wrap.getBoundingClientRect();
    x = (pointerX - wrapRect.left) / wrapRect.width - 0.5;
    y = (pointerY - wrapRect.top) / wrapRect.height - 0.5;
    x = minmax(x);
    y = minmax(y);
  };

  wrap.addEventListener('mousemove', (e) => {
    pointerX = e.clientX;
    pointerY = e.clientY;
    coordinate();
  });

  const styling = () => {
    const tsX = x * 30 * acc.accTranslateX + '%';
    const tsY = y * 30 * acc.accTranslateY + '%';
    const rtX = y * 30 * acc.accRotateX + 'deg';
    const rtY = x * 30 * acc.accRotateY + 'deg';

    item.style.transform =
      `translateX(${tsX}) translateY(${tsY}) rotateX(${rtX}) rotateY(${rtY})`;
  };

  let rafId;

  wrap.addEventListener('mouseenter', () => {
    const tick = () => {
      styling();
      rafId = requestAnimationFrame(tick);
    };
    tick();
  });

  wrap.addEventListener('mouseleave', () => {
    cancelAnimationFrame(rafId);
  });
}
initFvMotion();


// /**
//  * skillsパララックス表示
//  */
function initSkillsParallax() {
  const bg1 = document.querySelector(".js-skills__content--front-end");
  const bg2 = document.querySelector(".js-skills__content--design");
  if(!bg1 || !bg2) return;

  let current = 0; // 今の値
  let target = 0;  // スクロール位置（目標値）

  window.addEventListener("scroll", () => {
    target = window.scrollY;
  });

  function animate() {
    const ease = 0.03; //追従率
    current = current + (target - current) * ease;

    bg1.style.setProperty("--scroll", current);
    bg2.style.setProperty("--scroll", current);

    requestAnimationFrame(animate);
  }

  animate();
}
initSkillsParallax();