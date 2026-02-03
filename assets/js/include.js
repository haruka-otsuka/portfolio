import { initScrollTop } from './script.js';
import { initMouseStalker } from './script.js';

/**
 * 共通パーツの読み込み設定
 * @param {string} id 
 * @param {string} url 
 */

document.addEventListener('DOMContentLoaded', () => {

  const loadHTML = async (id, url) => {
    try {
      const res = await fetch(url);
      const html = await res.text();

      const container = document.getElementById(id);
      if (!container) return;
      container.innerHTML = html;

      //フッター読み込み時にスクロールトップを実行
      if (id === 'footer') {
        initScrollTop();
      }

      // ページ名の表示
      if (id === 'page-header') {
        const title = container.dataset.title;
        const sub = container.dataset.sub;

        if (title) {
          container.querySelector('.js-page-header__main').textContent = title;
          document.title = `haruka otsuka portfolio | ${title}`;
        }
        if (sub) {
          container.querySelector('.js-page-header__sub').textContent = sub;
        }
      }

      // ページごとのh1表示切替
      if(id === 'header') {
        initMouseStalker();
        if(!document.body.classList.contains('home')) {
          const logoLink = container.querySelector('.js-header__logo-link');
          const h1 = logoLink.querySelector('h1');
          const img = h1.querySelector('img');

          logoLink.innerHTML = '';
          logoLink.appendChild(img);
        }
      }
    }
    catch (err) {
      console.error('共通パーツの読み込みに失敗:', err);
    }
  };

  loadHTML('header', '/components/header.html');
  loadHTML('footer', '/components/footer.html');
  loadHTML('page-header', '/components/page-header.html');
});