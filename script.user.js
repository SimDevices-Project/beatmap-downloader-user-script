// ==UserScript==
// @name               SimDevices Osu Beatmap Downloader Plugin
// @name:zh-CN         SimDevices Osu 谱面下载器插件
// @include            http*://osu.ppy.sh/*
// @copyright          2020, Handle
// @version            0.4.2
// @description        Add extra download buttons on beatmap page for SimDevices Beatmap Downloader on osu.ppy.sh
// @description:zh-CN  在 osu! 谱面下载页面上添加额外的按钮，可以唤醒下载器自动下载并导入谱面。
// @author             Handle
// @namespace          https://github.com/SimDevices-Project
// @supportURL         https://github.com/SimDevices-Project/beatmap-downloader-user-script/issues
// @grant              none
// ==/UserScript==

;(function () {
  'use strict'

  const formatURL = () => {
    const URL = document.URL
    const [mainURL, argument] = URL.substr(URL.indexOf('//') + 2).split('#')
    const [host, type, id] = mainURL.split('/')
    if (type !== 'beatmapsets') {
      return { isBeatmappage: false, id: 0, type: '' }
    }
    const [mode, bid] = argument || []
    return {
      id: id,
      type: 'beatmapset',
      isBeatmappage: true,
    }
  }

  const insertHTML = (id = 1011011, type = 's') => {
    const htmlText = `
    <a href="beatmap-downloader://s/${id}" class="btn-osu-big btn-osu-big--beatmapset-header">
      <span class="btn-osu-big__content ">
        <span class="btn-osu-big__left">
          <span class="btn-osu-big__text-top">启动</span>
          <span class="btn-osu-hint btn-osu-big__text-bottom">Beatmap Downloader</span>
        </span>
        <span class="btn-osu-big__icon">
          <span class="fa-fw">
            <i class="fas fa-download"></i>
          </span>
        </span>
      </span>
    </a>`
    const htmlDOM = document.createRange().createContextualFragment(htmlText)
    const btnContainer = document.querySelector('.beatmapset-header__buttons')
    btnContainer.insertBefore(htmlDOM, btnContainer.lastElementChild)
  }

  let timer = 0
  const loader = () => {
    const listenElementQueryWith = '.js-react--beatmapset-page'
    const listenElementDOM = document.querySelector(listenElementQueryWith)
    if (listenElementDOM && listenElementDOM.dataset.reactTurbolinksLoaded === '1') {
      const formated = formatURL()
      if (formated.isBeatmappage) {
        insertHTML(formated.id, formated.type === 'beatmapset' ? 's' : 'b')
      }
    } else {
      timer = requestAnimationFrame(loader)
    }
  }
  timer = requestAnimationFrame(loader)
  // 监听 turbolinks 渲染事件
  // https://greasyfork.org/zh-CN/scripts/3916-osu-my-download
  document.addEventListener('turbolinks:load', loader)
})()
