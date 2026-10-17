// Built-in motion: reveal, a slow ticker, hover and scroll progress.
// No cursor replacement, magnetic controls, parallax or animated statistics.
(() => {
  const root=document.documentElement;
  root.classList.add('js','pandy-motion');
  const dialog=document.querySelector('.image-dialog');
  document.querySelectorAll('[data-lightbox]').forEach(el=>el.addEventListener('click',()=>{
    dialog?.classList.toggle('long-image',el.dataset.longImage==='true');
    if(dialog) dialog.scrollTop=0;
  }));
  const progress=document.querySelector('.scroll-progress');
  let ticking=false;
  const onScroll=()=>{
    ticking=false;
    const max=root.scrollHeight-innerHeight;
    progress?.style.setProperty('--progress',max>0?(scrollY/max).toFixed(4):0);
    document.body.classList.toggle('scrolled',scrollY>24);
  };
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll);}}, {passive:true});
  onScroll();
  document.querySelectorAll('.home-work-panel').forEach(panel=>{
    panel.querySelectorAll('.compact-work-card,.social-platform').forEach((card,i)=>card.style.setProperty('--i',i));
  });
  const reveal=el=>el.classList.add('is-in');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){reveal(entry.target);observer.unobserve(entry.target);}
    }),{threshold:.08});
    document.querySelectorAll('[data-reveal],.home-work-panel').forEach(el=>observer.observe(el));
  } else {
    document.querySelectorAll('[data-reveal],.home-work-panel').forEach(reveal);
  }
  document.querySelectorAll('.home-work-tabs [data-tab]').forEach(tab=>tab.addEventListener('click',()=>{
    const panel=document.getElementById(tab.getAttribute('aria-controls'));
    if(!panel) return;
    panel.classList.remove('is-in');void panel.offsetWidth;panel.classList.add('is-in');
  }));
})();
