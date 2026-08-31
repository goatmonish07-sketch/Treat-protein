/* ============ The Protein Affair — interactions ============ */
(function () {
  'use strict';

  /* ---------- SVG product illustrations (brand-styled, crisp at any size) ---------- */
  function ballsSVG(seed) {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f6ecd9"/>
      <ellipse cx="100" cy="150" rx="78" ry="22" fill="#efe0c4"/>
      ${protBall(70,120,34)}${protBall(128,116,32)}${protBall(100,88,30)}
    </svg>`;
  }
  function barSVG() {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f6ecd9"/>
      <ellipse cx="100" cy="150" rx="80" ry="20" fill="#efe0c4"/>
      <g transform="rotate(-8 100 105)">
      <rect x="34" y="78" width="132" height="54" rx="12" fill="#5a3a1e"/>
      <rect x="34" y="78" width="132" height="54" rx="12" fill="url(#tex)"/>
      ${seeds(44,90,120,26)}
      </g>${texDef()}
    </svg>`;
  }
  function bitesSVG() {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f6ecd9"/>
      <ellipse cx="100" cy="150" rx="78" ry="22" fill="#efe0c4"/>
      ${bite(64,104)}${bite(120,100)}${bite(92,128)}
    </svg>`;
  }
  function comboSVG() {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f6ecd9"/>
      <path d="M46 110 a54 40 0 0 0 108 0 z" fill="#e8d6b4"/>
      <ellipse cx="100" cy="110" rx="54" ry="16" fill="#f2e6cd"/>
      ${nut(72,100,'#c98b46')}${nut(100,96,'#8a5a2a')}${nut(126,102,'#d9a05a')}
      ${nut(84,108,'#6f9b4b')}${nut(114,110,'#b5702e')}${protBall(100,112,12)}
    </svg>`;
  }
  function challengeSVG() {
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f6ecd9"/>
      <ellipse cx="100" cy="152" rx="82" ry="22" fill="#efe0c4"/>
      ${protBall(66,118,30)}${protBall(120,120,28)}${protBall(94,94,30)}${protBall(140,96,20)}
    </svg>`;
  }
  function texDef(){return `<defs><pattern id="tex" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.2" fill="#3d2413"/><circle cx="10" cy="9" r="1.8" fill="#7a4a1f"/><circle cx="7" cy="12" r="1.5" fill="#a9701f"/></pattern></defs>`;}
  function protBall(x,y,r){
    let s=`<circle cx="${x}" cy="${y}" r="${r}" fill="#4a2e17"/><circle cx="${x}" cy="${y}" r="${r}" fill="#3d2413" opacity=".2"/>`;
    for(let i=0;i<16;i++){const a=Math.random()*6.28,d=Math.random()*r*0.85;const px=x+Math.cos(a)*d,py=y+Math.sin(a)*d;const c=['#c88a2e','#e0b063','#8a5a2a','#6f9b4b','#d9d2c0'][i%5];s+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(1.4+Math.random()*1.6).toFixed(1)}" fill="${c}"/>`;}
    s+=`<ellipse cx="${x-r*0.3}" cy="${y-r*0.35}" rx="${r*0.35}" ry="${r*0.2}" fill="#fff" opacity=".08"/>`;
    return s;
  }
  function seeds(x,y,w,h){let s='';for(let i=0;i<26;i++){const px=x+Math.random()*w,py=y+Math.random()*h;const c=['#c88a2e','#e0b063','#6f9b4b','#d9d2c0','#8a5a2a'][i%5];s+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(1.3+Math.random()*1.4).toFixed(1)}" fill="${c}"/>`;}return s;}
  function bite(x,y){return `<g transform="rotate(-6 ${x} ${y})"><rect x="${x-24}" y="${y-20}" width="48" height="40" rx="9" fill="#4a2e17"/>${seeds(x-20,y-16,40,32)}</g>`;}
  function nut(x,y,c){return `<ellipse cx="${x}" cy="${y}" rx="7" ry="9" fill="${c}"/><ellipse cx="${x-1.5}" cy="${y-2}" rx="2.5" ry="3.5" fill="#fff" opacity=".18"/>`;}

  /* ---------- data ---------- */
  const products = [
    {id:'balls', name:'Protein Balls', meta:'25 GMS (Pack of 10)', price:40, rating:'★★★★★', reviews:245, svg:ballsSVG, cta:'Add to Cart'},
    {id:'bar', name:'Protein Bar', meta:'60 GMS (Pack of 5)', price:89, rating:'★★★★½', reviews:182, svg:barSVG, cta:'Add to Cart'},
    {id:'bites', name:'Protein Bites', meta:'30 GMS (Pack of 10)', price:45, rating:'★★★★★', reviews:210, svg:bitesSVG, cta:'Add to Cart'},
    {id:'30for30', name:'30 for 30 Days', meta:'Protein Balls Challenge', price:950, rating:'★★★★★', reviews:375, svg:challengeSVG, tag:'BEST SELLER', cta:'View Details'},
    {id:'combo', name:'Custom Combo', meta:'Build Your Box', price:199, priceLabel:'From ₹199', rating:'★★★★½', reviews:96, svg:comboSVG, cta:'Choose Now'},
  ];

  const benefits = [
    {e:'🌰', n:'Almonds', d:'Rich in healthy fats & vitamin E — great for skin & brain health'},
    {e:'🎃', n:'Pumpkin Seeds', d:'High in protein, zinc & magnesium — supports immunity & muscle'},
    {e:'🌱', n:'Chia Seeds', d:'Packed with omega-3, fiber & antioxidants'},
    {e:'🥜', n:'Cashews', d:'Energy, heart health & strong bones'},
    {e:'🍯', n:'Desi Ghee', d:'Traditional wholesome fat for slow, clean energy'},
    {e:'🫘', n:'Flax Seeds', d:'High in fiber & omega-3 — aids digestion & heart health'},
    {e:'🌸', n:'Saffron', d:'Improves mood, boosts immunity & glowing skin'},
    {e:'🍇', n:'Black Raisins', d:'Natural source of iron — boosts energy & haemoglobin'},
  ];

  const ingredients = ['Cashews','Almonds','Dates','Pumpkin Seeds','Watermelon Seeds','Chia Seeds','Flax Seeds','Halim Seeds','Black Raisins','Cranberry','Saffron','Desi Ghee','Sunflower Seeds','Sesame Seeds','Basil Seeds'];

  /* ---------- render products ---------- */
  const grid = document.getElementById('productGrid');
  const svgMap = {};
  products.forEach(p => {
    svgMap[p.id] = p.svg(p.id);
    const el = document.createElement('article');
    el.className = 'product reveal';
    el.innerHTML = `
      <div class="product__media">
        ${p.tag ? `<span class="product__tag">${p.tag}</span>` : ''}
        <button class="product__wish" aria-label="Add to wishlist">♡</button>
        ${svgMap[p.id]}
      </div>
      <div class="product__body">
        <h3 class="product__name">${p.name}</h3>
        <p class="product__meta">${p.meta}</p>
        <p class="stars">${p.rating} <small>(${p.reviews})</small></p>
        <p class="product__price">${p.priceLabel || '₹'+p.price} ${p.priceLabel?'':''}</p>
        <button class="product__btn" data-add="${p.id}">${p.cta}</button>
      </div>`;
    grid.appendChild(el);
  });
  document.querySelectorAll('.product__wish').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('on');b.textContent=b.classList.contains('on')?'♥':'♡';}));

  /* ---------- render benefits ---------- */
  const bGrid = document.getElementById('benefitGrid');
  benefits.forEach(b => {
    const el = document.createElement('div');
    el.className = 'benefit reveal';
    el.innerHTML = `<span class="benefit__emoji">${b.e}</span><h3>${b.n}</h3><p>${b.d}</p>`;
    bGrid.appendChild(el);
  });

  /* ---------- render ingredients marquee (doubled for loop) ---------- */
  const ingTrack = document.getElementById('ingTrack');
  const emojiFor = {Cashews:'🥜',Almonds:'🌰',Dates:'🌴',"Pumpkin Seeds":'🎃',"Watermelon Seeds":'🍉',"Chia Seeds":'🌱',"Flax Seeds":'🫘',"Halim Seeds":'🌿',"Black Raisins":'🍇',Cranberry:'🔴',Saffron:'🌸',"Desi Ghee":'🍯',"Sunflower Seeds":'🌻',"Sesame Seeds":'⚪',"Basil Seeds":'⚫'};
  const chips = ingredients.map(i=>`<div class="ing-chip"><span>${emojiFor[i]||'•'}</span>${i}</div>`).join('');
  ingTrack.innerHTML = chips + chips;

  /* ---------- cart ---------- */
  const cart = {};
  const productById = Object.fromEntries(products.map(p=>[p.id,p]));
  let saved;
  try { saved = JSON.parse(localStorage.getItem('tpa_cart')||'{}'); } catch(e){ saved = {}; }
  Object.assign(cart, saved);

  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  function persist(){ try{ localStorage.setItem('tpa_cart', JSON.stringify(cart)); }catch(e){} }

  function renderCart(){
    const ids = Object.keys(cart);
    let count=0, total=0;
    if(!ids.length){
      cartItems.innerHTML = `<div class="cart-empty"><span>🛒</span>Your cart is empty.<br/>Add some wholesome treats!</div>`;
    } else {
      cartItems.innerHTML = ids.map(id=>{
        const p = productById[id]; const q = cart[id];
        count+=q; total+=p.price*q;
        return `<div class="cart-item">
          <div class="cart-item__thumb">${svgMap[id]}</div>
          <div class="cart-item__info">
            <div class="cart-item__name">${p.name}</div>
            <div class="cart-item__price">₹${p.price}</div>
            <div class="qty">
              <button data-dec="${id}" aria-label="Decrease">−</button>
              <span>${q}</span>
              <button data-inc="${id}" aria-label="Increase">+</button>
            </div>
          </div>
          <button class="cart-item__remove" data-rm="${id}" aria-label="Remove">✕</button>
        </div>`;
      }).join('');
    }
    ids.forEach(id=>{ if(productById[id]===undefined) return; });
    count = ids.reduce((s,id)=>s+cart[id],0);
    total = ids.reduce((s,id)=>s+productById[id].price*cart[id],0);
    cartCount.textContent = count;
    cartCount.classList.toggle('show', count>0);
    cartTotal.textContent = '₹'+total.toLocaleString('en-IN');
    persist();
  }

  function addToCart(id){
    if(!productById[id]) return;
    cart[id] = (cart[id]||0)+1;
    renderCart();
    cartCount.animate([{transform:'scale(1)'},{transform:'scale(1.5)'},{transform:'scale(1)'}],{duration:350});
    showToast(`${productById[id].name} added to cart 🛒`);
  }

  document.addEventListener('click', e=>{
    const add = e.target.closest('[data-add]');
    if(add){ addToCart(add.getAttribute('data-add')); openCart(); return; }
    const inc = e.target.closest('[data-inc]'); if(inc){ cart[inc.dataset.inc]++; renderCart(); return; }
    const dec = e.target.closest('[data-dec]'); if(dec){ const id=dec.dataset.dec; cart[id]--; if(cart[id]<=0) delete cart[id]; renderCart(); return; }
    const rm = e.target.closest('[data-rm]'); if(rm){ delete cart[rm.dataset.rm]; renderCart(); return; }
  });

  /* ---------- cart drawer open/close ---------- */
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('drawerOverlay');
  function openCart(){ drawer.classList.add('open'); overlay.classList.add('open'); }
  function closeCart(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  overlay.addEventListener('click', ()=>{ closeCart(); closeLightbox(); });
  document.getElementById('checkoutBtn').addEventListener('click', ()=>{
    if(!Object.keys(cart).length){ showToast('Your cart is empty 🛒'); return; }
    showToast('Thank you! We\'ll confirm your order on WhatsApp 💬');
  });

  /* ---------- toast ---------- */
  const toast = document.getElementById('toast');
  let toastT;
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(()=>toast.classList.remove('show'), 2600);
  }

  /* ---------- hero video ---------- */
  const heroVideo = document.getElementById('heroVideo');
  const heroPlay = document.getElementById('heroPlay');
  heroPlay.addEventListener('click', ()=>{
    if(heroVideo.paused){ heroVideo.play(); heroPlay.classList.add('hidden'); }
  });
  heroVideo.addEventListener('click', ()=>{
    if(!heroVideo.paused){ heroVideo.pause(); heroPlay.classList.remove('hidden'); }
  });
  // autoplay muted when in view
  if('IntersectionObserver' in window){
    new IntersectionObserver((ents)=>{
      ents.forEach(en=>{
        if(en.isIntersecting){ heroVideo.play().then(()=>heroPlay.classList.add('hidden')).catch(()=>{}); }
        else heroVideo.pause();
      });
    },{threshold:.4}).observe(heroVideo);
  }

  /* ---------- story lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const storyVideo = document.getElementById('storyVideo');
  function openLightbox(){ lightbox.classList.add('open'); storyVideo.currentTime=0; storyVideo.play().catch(()=>{}); }
  function closeLightbox(){ lightbox.classList.remove('open'); storyVideo.pause(); }
  document.getElementById('watchStory').addEventListener('click', openLightbox);
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeLightbox(); closeCart(); } });

  /* ---------- header scroll state ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', ()=> header.classList.toggle('scrolled', window.scrollY>20), {passive:true});

  /* ---------- mobile nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', ()=>{ hamburger.classList.toggle('open'); nav.classList.toggle('open'); });
  nav.addEventListener('click', e=>{ if(e.target.classList.contains('nav__link')){ hamburger.classList.remove('open'); nav.classList.remove('open'); } });

  /* ---------- active nav link on scroll ---------- */
  const sections = ['home','shop','challenge','benefits','ingredients','about','contact'];
  const navLinks = [...document.querySelectorAll('.nav__link')];
  if('IntersectionObserver' in window){
    const so = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{
        if(en.isIntersecting){
          navLinks.forEach(l=>l.classList.toggle('active', l.getAttribute('href')==='#'+en.target.id));
        }
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    sections.forEach(id=>{ const s=document.getElementById(id); if(s) so.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  if('IntersectionObserver' in window){
    const ro = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); ro.unobserve(en.target); } });
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  }

  /* ---------- search (simple) ---------- */
  document.getElementById('searchBtn').addEventListener('click', ()=>{
    const q = prompt('Search The Protein Affair:');
    if(!q) return;
    const hit = products.find(p=>p.name.toLowerCase().includes(q.toLowerCase()));
    if(hit){ document.getElementById('shop').scrollIntoView({behavior:'smooth'}); showToast('Showing results for "'+q+'"'); }
    else showToast('No products found for "'+q+'"');
  });

  /* ---------- year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  renderCart();
})();
