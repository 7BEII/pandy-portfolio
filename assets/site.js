(() => {
  const menu = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeMenu = () => { if (!menu) return; menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','打开导航'); mobileNav.hidden = true; };
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'关闭导航':'打开导航'); mobileNav.hidden = !open; });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e => { if(e.key==='Escape') closeMenu(); });
  const toast = document.querySelector('.toast');
  let toastTimer;
  const notify = message => { toast.textContent=message; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('visible'),2600); };
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click',async () => {
    try { await navigator.clipboard.writeText(button.dataset.copy); notify('邮箱已复制'); }
    catch { notify('请直接选择邮箱文字复制'); }
  }));
  const dialog = document.querySelector('.image-dialog');
  const closeDialog = () => { dialog.close(); document.body.classList.remove('dialog-open'); };
  document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click',() => {
    dialog.querySelector('img').src=button.dataset.lightbox;
    dialog.querySelector('img').alt=button.dataset.caption||'';
    dialog.querySelector('p').textContent=button.dataset.caption||'';
    dialog.showModal(); document.body.classList.add('dialog-open');
  }));
  dialog?.querySelector('.dialog-close').addEventListener('click',closeDialog);
  dialog?.addEventListener('click',e => {if(e.target===dialog) closeDialog();});
  dialog?.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  const contactDialog = document.querySelector('.contact-dialog');
  document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {contactDialog.showModal();document.body.classList.add('dialog-open');}));
  contactDialog?.querySelector('.contact-close').addEventListener('click',()=>contactDialog.close());
  contactDialog?.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  contactDialog?.addEventListener('click',e=>{if(e.target===contactDialog) contactDialog.close();});
  const tabs = Array.from(document.querySelectorAll('[data-tab]'));
  function selectTab(tab, updateHash=true) {
    tabs.forEach(item=>{const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!selected;});
    if(updateHash) history.replaceState(null,'','#'+tab.id);
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>selectTab(tab));
    tab.addEventListener('keydown',event=>{
      let next=index;
      if(event.key==='ArrowRight') next=(index+1)%tabs.length;
      else if(event.key==='ArrowLeft') next=(index-1+tabs.length)%tabs.length;
      else if(event.key==='Home') next=0;
      else if(event.key==='End') next=tabs.length-1;
      else return;
      event.preventDefault();selectTab(tabs[next]);tabs[next].focus();
    });
  });
  const requestedTab=tabs.find(tab=>'#'+tab.id===location.hash);
  if(requestedTab) selectTab(requestedTab,false);
  const art=document.querySelector('.chrome-art');
  if(art && !matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(pointer:fine)').matches) {
    let pending=false;
    let x=0,y=0;
    (document.querySelector('.hero')||document.querySelector('.home-identity'))?.addEventListener('pointermove',e => {
      const rect=art.getBoundingClientRect(); x=(e.clientX-rect.left-rect.width/2)/60; y=(e.clientY-rect.top-rect.height/2)/60;
      if(!pending) { pending=true; requestAnimationFrame(()=>{art.style.setProperty('--px',`${Math.max(-10,Math.min(10,x))}px`);art.style.setProperty('--py',`${Math.max(-10,Math.min(10,y))}px`);pending=false;}); }
    });
  }
})();
