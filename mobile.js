'use strict';
const mobileMenuButton=document.querySelector('.mobile-menu-toggle');
const mobileSidebar=document.querySelector('.sidebar');
function closeMobileMenu(returnFocus=false){mobileSidebar.classList.remove('menu-open');mobileMenuButton.setAttribute('aria-expanded','false');mobileMenuButton.textContent='Menu ☰';if(returnFocus)mobileMenuButton.focus()}
mobileMenuButton.addEventListener('click',()=>{const open=mobileSidebar.classList.toggle('menu-open');mobileMenuButton.setAttribute('aria-expanded',String(open));mobileMenuButton.textContent=open?'Close ×':'Menu ☰'});
document.querySelector('#nav').addEventListener('click',e=>{if(e.target.closest('a'))closeMobileMenu(true)});
window.addEventListener('hashchange',()=>closeMobileMenu());
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileSidebar.classList.contains('menu-open'))closeMobileMenu(true)});
document.addEventListener('click',e=>{if(!mobileSidebar.contains(e.target))closeMobileMenu()});

