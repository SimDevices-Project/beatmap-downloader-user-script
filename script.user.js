// ==UserScript==
// @name         SimDevices Osu Beatmap Downloader Plugin
// @include      http*://osu.ppy.sh/*
// @copyright    2020, Handle
// @version      0.3
// @description  Add extra download buttons on beatmap page for SimDevices Beatmap Downloader on osu.ppy.sh
// @author       Handle
// @namespace    https://github.com/SimDevices-Project
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  const URL = document.URL
  const [mainURL, argument] = URL.substr(URL.indexOf('//') + 2).split('#')
  const [host, type, id] = mainURL.split('/')
  if (type !== 'beatmapsets') {
    return
  }
  const [mode, bid] = argument || []

  const htmlText = `
  <a href="osu://s/${id}" class="btn-osu-big btn-osu-big--beatmapset-header">
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
  const listenElementQueryWith = '.js-react--beatmapset-page'
  let timer = 0
  const loader = () => {
    const listenElementDOM = document.querySelector(listenElementQueryWith)
    if (listenElementDOM && listenElementDOM.dataset.reactTurbolinksLoaded === '1') {
      const btnContainer = document.querySelector('.beatmapset-header__buttons')
      btnContainer.insertBefore(htmlDOM, btnContainer.lastElementChild)
    } else {
      timer = requestAnimationFrame(loader)
    }
  }
  timer = requestAnimationFrame(loader)
  // 监听 turbolinks 渲染事件
  // https://greasyfork.org/zh-CN/scripts/3916-osu-my-download
  document.addEventListener('turbolinks:load', loader)
})()
