// Anchor the visible portrait to the title and real text widths, not the column bottom.
(() => {
  const root=document.querySelector('.home-page .home-identity');
  const portrait=root?.querySelector('.home-portrait-float');
  if(!root||!portrait) return;
  const heading=root.querySelector('h1');
  const work=document.querySelector('.home-work');
  const imageDialog=document.querySelector('.image-dialog');
  document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{
    imageDialog?.classList.toggle('long-image',button.dataset.longImage==='true');
    if(imageDialog) imageDialog.scrollTop=0;
  }));
  let scheduled=false;
  function textRight(element) {
    if(!element) return 0;
    const range=document.createRange();range.selectNodeContents(element);
    return Math.max(0,...Array.from(range.getClientRects()).filter(r=>r.width>0).map(r=>r.right));
  }
  function place() {
    scheduled=false;
    const area=root.getBoundingClientRect();
    const title=heading.getBoundingClientRect();
    const workArea=work.getBoundingClientRect();
    const edges=[textRight(root.querySelector('h2')),textRight(root.querySelector(':scope > p'))];
    root.querySelectorAll('.home-tags>span,.home-actions>a,.personal-ip-badge').forEach(el=>edges.push(el.getBoundingClientRect().right));
    const left=Math.max(...edges)-area.left+14;
    const limit=innerWidth>700?Math.min(area.width+24,workArea.left-area.left-12):area.width-2;
    const available=Math.max(64,limit-left);
    // Alpha silhouette bounding box: (269,56)-(811,1448), original canvas 1086x1448.
    const ratio=542/1392;
    const height=Math.min(300,available/ratio);
    const width=height*ratio;
    portrait.style.setProperty('--portrait-left',`${Math.min(left,limit-width)}px`);
    portrait.style.setProperty('--portrait-top',`${title.bottom-area.top+6}px`);
    portrait.style.setProperty('--portrait-width',`${width}px`);
    portrait.style.setProperty('--portrait-height',`${height}px`);
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(place);}}
  new ResizeObserver(schedule).observe(root);
  new ResizeObserver(schedule).observe(heading);
  window.addEventListener('resize',schedule);
  document.fonts.ready.then(schedule);
  schedule();
})();
