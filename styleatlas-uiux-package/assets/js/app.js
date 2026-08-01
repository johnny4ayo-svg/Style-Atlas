const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="assets/icons/sprite.svg#icon-${name}"></use></svg>`;

const navItems = [
  ['Designers','directory.html'],['Brands','directory.html'],['Schools','directory.html'],['Professionals','directory.html'],['Marketplace','marketplace.html'],['Jobs','jobs.html'],['Events','events.html'],['Inspiration','article.html']
];

function headerTemplate(){
  const page = document.body.dataset.page || '';
  return `
  <header class="site-header" id="siteHeader">
    <div class="utility-bar"><div class="container utility-inner"><span>Curated Nigerian fashion, mapped with purpose.</span><div class="utility-links"><a href="about.html">About</a><a href="pricing.html">Pricing</a><a href="help.html">Help centre</a></div></div></div>
    <div class="container header-main">
      <a class="header-logo" href="index.html" aria-label="STYLEATLAS home"><img src="assets/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS"></a>
      <nav class="main-nav" aria-label="Primary navigation">
        ${navItems.map(([label,href],index)=>{
          const key = label.toLowerCase();
          const active = page === key || (page==='directory' && index<4) ? 'active' : '';
          if(index<4){return `<div class="nav-item"><a class="nav-link ${active}" href="${href}">${label}${icon('chevron')}</a><div class="mega-menu"><div class="mega-col"><h4>Discover</h4><a href="directory.html">Featured ${label}</a><a href="directory.html">Verified profiles</a><a href="directory.html">Newly listed</a><a href="directory.html">Most reviewed</a></div><div class="mega-col"><h4>Popular searches</h4><a href="directory.html">Bridal specialists</a><a href="directory.html">Luxury ready-to-wear</a><a href="directory.html">Menswear in Lagos</a><a href="directory.html">Fashion schools in Abuja</a></div><a class="mega-promo" href="directory.html" aria-label="Explore Nigerian craft"></a></div></div>`}
          return `<a class="nav-link ${active}" href="${href}">${label}</a>`;
        }).join('')}
      </nav>
      <div class="header-actions">
        <button class="icon-btn" data-open-search aria-label="Search">${icon('search')}</button>
        <a class="icon-btn" href="saved.html" aria-label="Saved profiles">${icon('heart')}<span class="count" data-saved-count>0</span></a>
        <a class="icon-btn" href="login.html" aria-label="Account">${icon('user')}</a>
        <a class="header-cta" href="add-business.html">Add your business ${icon('arrow')}</a>
        <button class="icon-btn mobile-toggle" data-mobile-toggle aria-label="Open menu">${icon('menu')}</button>
      </div>
    </div>
  </header>
  <aside class="mobile-panel" data-mobile-panel aria-hidden="true">
    <div class="mobile-panel-top"><img src="assets/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS"><button class="icon-btn" data-mobile-close aria-label="Close menu">${icon('close')}</button></div>
    <nav class="mobile-nav">${navItems.map(([label,href])=>`<a href="${href}">${label}${icon('arrow')}</a>`).join('')}</nav>
    <div class="mobile-actions"><a class="btn btn-gold" href="add-business.html">Add your business</a><a class="btn btn-outline-light" href="login.html">Log in or sign up</a></div>
  </aside>`;
}

function footerTemplate(){
  return `<footer class="site-footer"><div class="container footer-top">
    <div class="footer-brand"><img src="assets/brand/styleatlas-logo-dark.svg" alt="STYLEATLAS"><p>Nigeria's premium fashion discovery platform for trusted designers, brands, schools and creative professionals.</p><div class="socials"><a class="social" href="feature.html" aria-label="Instagram">IG</a><a class="social" href="feature.html" aria-label="TikTok">TT</a><a class="social" href="feature.html" aria-label="YouTube">YT</a><a class="social" href="feature.html" aria-label="LinkedIn">IN</a></div></div>
    <div class="footer-col"><h4>Directory</h4><a href="directory.html">Designers</a><a href="directory.html">Brands</a><a href="directory.html">Stylists</a><a href="directory.html">Schools</a><a href="directory.html">Photographers</a><a href="directory.html">Fabric stores</a></div>
    <div class="footer-col"><h4>Explore</h4><a href="marketplace.html">Marketplace</a><a href="jobs.html">Fashion jobs</a><a href="events.html">Events</a><a href="article.html">Editorial</a><a href="directory.html">Cities</a><a href="concierge.html">AI concierge</a></div>
    <div class="footer-col"><h4>For business</h4><a href="add-business.html">Add a listing</a><a href="pricing.html">Membership plans</a><a href="dashboard.html">Business dashboard</a><a href="advertise.html">Advertise</a><a href="verification.html">Get verified</a><a href="jobs.html">Post a job</a></div>
    <div class="footer-col"><h4>Stay in style</h4><p style="font-size:10px">Weekly designer stories, openings, jobs and fashion events.</p><form class="newsletter" data-newsletter><input type="email" required placeholder="Email address" aria-label="Email address"><button type="submit">Subscribe</button></form><a href="about.html">About STYLEATLAS</a><a href="contact.html">Contact</a><a href="help.html">Help centre</a></div>
  </div><div class="container footer-bottom"><span>© 2026 STYLEATLAS. Demo UI kit with fictional profiles.</span><div class="footer-bottom-links"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="accessibility.html">Accessibility</a><a href="editorial-policy.html">Editorial policy</a></div></div></footer>`;
}

function injectShell(){
  document.querySelectorAll('[data-header]').forEach(el=>el.innerHTML=headerTemplate());
  document.querySelectorAll('[data-footer]').forEach(el=>el.innerHTML=footerTemplate());
}

const state = {
  saved: JSON.parse(localStorage.getItem('styleatlasSaved') || '[]'),
  compare: JSON.parse(localStorage.getItem('styleatlasCompare') || '[]')
};

function updateSavedCount(){
  document.querySelectorAll('[data-saved-count]').forEach(el=>el.textContent=state.saved.length);
}

function showToast(message){
  let toast=document.querySelector('.toast');
  if(!toast){toast=document.createElement('div');toast.className='toast';document.body.append(toast)}
  toast.textContent=message;toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);
}

function updateCompareDrawer(){
  let drawer=document.querySelector('.compare-drawer');
  if(!state.compare.length){
    drawer?.remove();
    return;
  }
  if(!drawer){
    drawer=document.createElement('div');drawer.className='compare-drawer';drawer.innerHTML=`<div class="compare-items" data-compare-items></div><a class="btn btn-gold btn-sm" href="compare.html">Compare profiles</a>`;document.body.append(drawer);
  }
  const items=drawer.querySelector('[data-compare-items]');
  items.innerHTML=state.compare.map(item=>`<div class="compare-chip"><img src="${item.image}" alt=""><span>${item.name}</span></div>`).join('');
  drawer.classList.add('open');
}

function initActions(){
  document.addEventListener('click',event=>{
    const save=event.target.closest('[data-save]');
    if(save){
      event.preventDefault();const id=save.dataset.save;const exists=state.saved.includes(id);
      state.saved=exists?state.saved.filter(x=>x!==id):[...state.saved,id];localStorage.setItem('styleatlasSaved',JSON.stringify(state.saved));save.classList.toggle('saved',!exists);updateSavedCount();showToast(exists?'Removed from saved profiles':'Profile saved');return;
    }
    const compare=event.target.closest('[data-compare]');
    if(compare){
      event.preventDefault();const id=compare.dataset.compare;const exists=state.compare.some(x=>x.id===id);
      if(!exists && state.compare.length>=4){showToast('You can compare up to four profiles');return}
      state.compare=exists?state.compare.filter(x=>x.id!==id):[...state.compare,{id,name:compare.dataset.name,image:compare.dataset.image}];
      localStorage.setItem('styleatlasCompare',JSON.stringify(state.compare));compare.classList.toggle('active',!exists);updateCompareDrawer();showToast(exists?'Removed from comparison':'Added to comparison');return;
    }
    const mobile=event.target.closest('[data-mobile-toggle]');
    if(mobile){document.querySelector('[data-mobile-panel]').classList.add('open');document.body.classList.add('no-scroll');return}
    const mobileClose=event.target.closest('[data-mobile-close]');
    if(mobileClose){document.querySelector('[data-mobile-panel]').classList.remove('open');document.body.classList.remove('no-scroll');return}
    const filter=event.target.closest('[data-filter-toggle]');
    if(filter){document.querySelector('.filter-panel')?.classList.toggle('open');return}
    const choice=event.target.closest('.choice');
    if(choice){choice.parentElement.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));choice.classList.add('selected');showToast(`${choice.textContent.trim()} selected`);return}
    const modalOpen=event.target.closest('[data-modal-open]');
    if(modalOpen){document.querySelector(`[data-modal="${modalOpen.dataset.modalOpen}"]`)?.classList.add('open');document.body.classList.add('no-scroll');return}
    const modalClose=event.target.closest('[data-modal-close]');
    if(modalClose){modalClose.closest('.modal-backdrop').classList.remove('open');document.body.classList.remove('no-scroll');return}
  });

  document.querySelectorAll('[data-save]').forEach(btn=>btn.classList.toggle('saved',state.saved.includes(btn.dataset.save)));
  document.querySelectorAll('[data-compare]').forEach(btn=>btn.classList.toggle('active',state.compare.some(x=>x.id===btn.dataset.compare)));
  document.querySelectorAll('[data-newsletter]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();form.reset();showToast('You’re on the STYLEATLAS weekly list')}));
  document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();showToast(form.dataset.success || 'Demo form submitted successfully')}));
  document.querySelectorAll('[data-search-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();window.location.href='directory.html'}));
  document.querySelectorAll('.search-tab').forEach(tab=>tab.addEventListener('click',()=>{tab.parentElement.querySelectorAll('.search-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active')}));
  updateSavedCount();updateCompareDrawer();
}

function initCounters(){
  const counters=document.querySelectorAll('[data-count]');
  if(!counters.length)return;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;const el=entry.target;const target=Number(el.dataset.count);const suffix=el.dataset.suffix||'';const duration=900;const start=performance.now();
    const tick=now=>{const p=Math.min((now-start)/duration,1);const value=Math.round(target*(1-Math.pow(1-p,3)));el.textContent=value.toLocaleString()+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);observer.unobserve(el);
  }),{threshold:.4});counters.forEach(el=>observer.observe(el));
}

function initSticky(){
  const header=document.getElementById('siteHeader');if(!header)return;window.addEventListener('scroll',()=>header.classList.toggle('is-sticky',window.scrollY>160),{passive:true});
}

document.addEventListener('DOMContentLoaded',()=>{injectShell();initActions();initCounters();initSticky()});
