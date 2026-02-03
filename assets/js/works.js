
document.addEventListener('DOMContentLoaded', () => {
  /**
  * 制作物一覧の表示
  */
  fetch('/assets/data/works.json')
  .then(res => res.json())
  .then(works => {

    const list = document.querySelector('.js-works__list');
    if(!list) return;

    works.forEach(work => {
      const li = document.createElement('li');
      const rolesHtml = work.roles
        .map(role => `<div class="works__role">${role}</div>`)
        .join('');

      li.innerHTML = `
        <a class="" href="work.html?name=${work.name}">
          <div class="works__image-wrapper"><img class="works__image" src="${work.thumbnail}" alt=""></div>
          <div class="works__info">
            <div class="works__role-wrapper">${rolesHtml}</div>
            <p class="works__category">${work.category}</p>
          </div>
          <p class="works__title">${work.title}</p>
        </a>
      `;

      list.appendChild(li);
    });
  });



  
/**
 * データの表示（なければ要素ごと削除）
 * @param {string} selector 
 * @param {string} value 
 */
  function setTextOrRemove(selector, value) {
    const el = document.querySelector(selector);
    if (!el) return;

    if (value) {
      el.textContent = value;
    } else {
      el.remove();
    }
  }

/**
 * 配列データの表示（なければ要素ごと削除）
 * @param {string} selector 
 * @param {string[]} list 
 * @param {string|null} separator 区切り文字（nullなら区切らない）
 */
  function setListOrRemove(selector, list, separator = null) {
    const el = document.querySelector(selector);
    if (!el) return;

    if (!Array.isArray(list) || list.length === 0) {
      el.closest('.js-work__spec-item').remove();
      return;
    } 
    
    el.innerHTML = '';
    
    // 区切り表示する場合
    if (separator) {
      el.textContent = list.join(` ${separator} `);
      return;
    }

    list.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item;
      el.appendChild(div);
    });
  }

  if (!document.body.classList.contains('work-page')) return;

  fetch('assets/data/work-03.json')
  .then(res => res.json())
  .then(data => {
    const work = data[0];
    setWorkData(work);
  })
  .catch(err => {
    console.error('work.jsonの読み込みに失敗', err);
  });

  function setWorkData(work) {

    /* ===== 基本情報 ===== */
    setTextOrRemove('.js-work__category', work.category);
    setTextOrRemove('.js-work__title', work.title);
    setTextOrRemove('.js-work__info-date', work.date);
    setTextOrRemove('.js-work__info-roles', work.roles?.join(' / '));
    setTextOrRemove('.js-work__summary', work.summary);

    /* ===== サイトURL ===== */
    const links = document.querySelectorAll('.js-work__link, .js-work__link-bottom');

    if (work.link) {
      links.forEach(link => {
        link.textContent = work.link.text;
        link.href = work.link.url;
      });
    } else {
      links.forEach(link => link.remove());
    }











    /* ===== overview画像 ===== */
    const overviewWrap = document.querySelector('.js-work__overview');
    if (work.images?.overview && overviewWrap) {
      const img = overviewWrap.querySelector('img');
      img.src = work.images.overview;
      img.alt = "";
    } else {
      overviewWrap?.remove();
    }

    /* ===== 仕様 ===== */
    setListOrRemove('.js-work__period', work.period);
    setListOrRemove('.js-work__tools', work.tools, '/');
    setListOrRemove('.js-work__languages', work.languages, '/');

    /* ===== sections ===== */
    const sectionsWrap = document.querySelector('.js-work__section');
    if (Array.isArray(work.sections) && work.sections.length) {
      work.sections.forEach(section => {
        const div = document.createElement('div');
        div.classList.add('work__section-item','line-box');
        div.innerHTML = `
          <dt class="work__section-title">${section.title}</dt>
          <dd>${section.content}</dd>
        `;
        sectionsWrap.appendChild(div);
      });
    } else {
      sectionsWrap?.remove();
    }

    /* ===== PC画像 ===== */
    // const screenWrapPC = document.querySelector('.js-work__screen-pc');
    // if (work.images?.pc && screenWrapPC) {
    //   screenWrapPC.src = work.images.pc;
    //   screenWrapPC.alt = "";
    // } else {
    //   screenWrapPC?.remove();
    // }

    // /* ===== SP画像 ===== */
    // const screenWrapSP = document.querySelector('.js-work__screen-sp');
    // if (work.images?.sp && screenWrapSP) {
    //   screenWrapSP.src = work.images.sp;
    //   screenWrapSP.alt = "";
    // } else {
    //   screenWrapSP?.remove();
    // }


    /* ===== スクリーン画像 ===== */
    const screenWrap = document.querySelector('.js-work__screen');
    const pcWrap = document.querySelector('.js-work__screen-wrap--pc');
    const spWrap = document.querySelector('.js-work__screen-wrap--sp');
    const screenPC = document.querySelector('.js-work__screen-image--pc');
    const screenSP = document.querySelector('.js-work__screen-image--sp');

    const hasPC = Array.isArray(work.images?.pc) && work.images.pc.length > 0;
    const hasSP = Array.isArray(work.images?.sp) && work.images.sp.length > 0;

    // PC画像
    if (hasPC) {
      screenPC.src = work.images.pc[0];
      screenPC.alt = '';
    } else {
      pcWrap?.remove();
    }

    // SP画像
    if (hasSP) {
      screenSP.src = work.images.sp[0];
      screenSP.alt = '';
    } else {
      spWrap?.remove();
    }

    // PCとSPどちらも無い場合は親ごと削除
    if (!hasPC && !hasSP) {
      screenWrap?.remove();
    }
  }
});