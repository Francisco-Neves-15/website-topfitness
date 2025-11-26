import { toggleOverlay } from "../../util/configOverlays.js"

let btnNavbar_Open;
let btnNavbar_Close;
let btnNavbarList_Open;
let btnNavbarList_Close;

let navbar;
let navbarList;
let overlayHeader;

function resetHeader(layout) {
  // Verifica se os elementos já foram inicializados
  if (!navbar || !navbarList || !overlayHeader) {
    return;
  }

  if (layout === "compact") {
    toggleNavbar("close");
    toggleNavbarList("undefined");
  } else if (layout === "expanded") {
    toggleNavbar("undefined");
    toggleNavbarList("close");
  } else {
    toggleNavbar("close");
    toggleNavbarList("close");
  }
}

function toggleNavbar(type) {
  // Verifica se os elementos existem antes de usar
  if (!navbar || !overlayHeader) {
    return;
  }
  
  if (type === "open") {
    navbar.setAttribute("aria-expanded", "true");
    toggleOverlay("hide", overlayHeader, {docUse: true})
  } else if (type === "undefined") {
    navbar.setAttribute("aria-expanded", "undefined");
    toggleOverlay("hide", overlayHeader, {docUse: true})
  } else {
    navbar.setAttribute("aria-expanded", "false");
    toggleOverlay("hide", overlayHeader, {docUse: true})
  }
}

function toggleNavbarList(type) {
  // Verifica se os elementos existem antes de usar
  if (!navbarList || !overlayHeader) {
    return;
  }

  if (type === "open") {
    navbarList.setAttribute("aria-expanded", "true");
    toggleOverlay("show", overlayHeader, {docUse: true})
  } else if (type === "undefined") {
    navbarList.setAttribute("aria-expanded", "undefined");
    toggleOverlay("hide", overlayHeader, {docUse: true})
  } else {
    navbarList.setAttribute("aria-expanded", "false");
    toggleOverlay("hide", overlayHeader, {docUse: true})
  }
}

export async function initHeader() {
  navbar = document.getElementById("navbar");
  navbarList = document.getElementById("navbar-list");
  
  btnNavbar_Open = document.getElementById("btn-navbar-open");
  btnNavbar_Close = document.getElementById("btn-navbar-close");
  btnNavbarList_Open = document.getElementById("btn-navbarlist-open");
  btnNavbarList_Close = document.getElementById("btn-navbarlist-close");

  overlayHeader = document.getElementById("overlay-navbar");

  // Verifica se os elementos existem antes de adicionar listeners
  if (btnNavbar_Open && btnNavbar_Close && btnNavbarList_Open && btnNavbarList_Close) {
    btnNavbar_Open.addEventListener("click", () => { toggleNavbar("open") });
    btnNavbar_Close.addEventListener("click", () => { toggleNavbar("close") });
    btnNavbarList_Open.addEventListener("click", () => { toggleNavbarList("open") });
    btnNavbarList_Close.addEventListener("click", () => { toggleNavbarList("close") });
  } else {
    console.warn("Make sure loadHeader() completed before initHeader().");
  }

  if (overlayHeader) {
    overlayHeader.addEventListener("click", () => { 
      toggleNavbar("close"); 
      toggleNavbarList("close"); 
    });
  }

  console.log("*INFO*: Header initialized");

  window.addEventListener("breakpointchange", (event) => {
    const { layout } = event.detail;
    resetHeader(layout);
  });
  
  if (window.__CURRENT_LAYOUT__) {
    resetHeader(window.__CURRENT_LAYOUT__);
  }

  resetHeader("initial")

}
