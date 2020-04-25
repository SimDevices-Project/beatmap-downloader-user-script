// ==UserScript==
// @name         SimDevices Beatmap Downloader User Script
// @include      http*://osu.ppy.sh/*
// @copyright    2020, Handle
// @version      0.2
// @description  Add extra download buttons on beatmap page for SimDevices Beatmap Downloader.
// @author       Handle
// @namespace    https://github.com/SimDevices-Project
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const URL = document.URL
  const [mainURL, argument] = URL.substr(URL.indexOf('//')+2).split('#')
  const [host, type, id] = mainURL.split('/')
  if(type!=='beatmapsets') {
      return
  }
  const [mode, bid] = argument || []

  const htmlText = `
  <a href="osu://s/${id}" class="btn-osu-big btn-osu-big--beatmapset-header">
     <span class="btn-osu-big__content ">
       <span class="btn-osu-big__left">
          <span class="btn-osu-big__text-top">Downloader</span>
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
  let timer = requestAnimationFrame(function listener(){
      const listenElementDOM = document.querySelector(listenElementQueryWith)
      if(listenElementDOM && listenElementDOM.dataset.reactTurbolinksLoaded === '1'){
          const btnContainer = document.querySelector('.beatmapset-header__buttons')
          btnContainer.insertBefore(htmlDOM, btnContainer.lastElementChild)
      }else{
          requestAnimationFrame(listener)
      }
  })
})();