/* ============ The Protein Affair — interactions ============ */
(function () {
  'use strict';

  /* ---------- data (real brand product photos) ---------- */
  const IMG = 'assets/media/products/';
  const products = [
    {id:'balls',   name:'Protein Balls',  meta:'25 GMS (Pack of 10)',      price:40,  rating:'★★★★★', reviews:245, img:IMG+'balls.jpg',   cta:'Add to Cart'},
    {id:'bar',     name:'Protein Bar',    meta:'60 GMS (Pack of 5)',       price:89,  rating:'★★★★½', reviews:182, img:IMG+'bar.jpg',     cta:'Add to Cart'},
    {id:'bites',   name:'Protein Bites',  meta:'30 GMS (Pack of 10)',      price:45,  rating:'★★★★★', reviews:210, img:IMG+'bites.jpg',   cta:'Add to Cart'},
    {id:'30for30', name:'30 for 30 Days', meta:'Protein Balls Challenge',  price:950, rating:'★★★★★', reviews:375, img:IMG+'30for30.jpg', tag:'BEST SELLER', cta:'View Details'},
    {id:'combo',   name:'Custom Combo',   meta:'Build Your Box',           price:199, priceLabel:'From ₹199', rating:'★★★★½', reviews:96, img:IMG+'combo.jpg', cta:'Choose Now'},
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
  const imgMap = {};
  products.forEach(p => {
    imgMap[p.id] = p.img;
    const el = document.createElement('article');
    el.className = 'product reveal';
    el.innerHTML = `
      <div class="product__media">
        ${p.tag ? `<span class="product__tag">${p.tag}</span>` : ''}
        <button class="product__wish" aria-label="Add ${p.name} to wishlist" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
        </button>
        <img class="product__img" src="${p.img}" alt="${p.name} — ${p.meta}" loading="lazy" width="600" height="600" />
      </div>
      <div class="product__body">
        <h3 class="product__name">${p.name}</h3>
        <p class="product__meta">${p.meta}</p>
        <p class="stars" aria-label="${p.reviews} reviews">${p.rating} <small>(${p.reviews})</small></p>
        <p class="product__price">${p.priceLabel || '₹'+p.price}</p>
        <button class="product__btn" data-add="${p.id}">${p.cta}</button>
      </div>`;
    grid.appendChild(el);
  });
  document.querySelectorAll('.product__wish').forEach(b=>b.addEventListener('click',()=>{
    const on=b.classList.toggle('on'); b.setAttribute('aria-pressed', on?'true':'false');
  }));

  /* ---------- render benefits ---------- */
  const bGrid = document.getElementById('benefitGrid');
  benefits.forEach(b => {
    const el = document.createElement('div');
    el.className = 'benefit reveal';
    el.innerHTML = `<span class="benefit__emoji" aria-hidden="true">${b.e}</span><h3>${b.n}</h3><p>${b.d}</p>`;
    bGrid.appendChild(el);
  });

  /* ---------- render ingredients marquee (doubled for loop) ---------- */
  const ingTrack = document.getElementById('ingTrack');
  const emojiFor = {Cashews:'🥜',Almonds:'🌰',Dates:'🌴',"Pumpkin Seeds":'🎃',"Watermelon Seeds":'🍉',"Chia Seeds":'🌱',"Flax Seeds":'🫘',"Halim Seeds":'🌿',"Black Raisins":'🍇',Cranberry:'🔴',Saffron:'🌸',"Desi Ghee":'🍯',"Sunflower Seeds":'🌻',"Sesame Seeds":'⚪',"Basil Seeds":'⚫'};
  const chips = ingredients.map(i=>`<div class="ing-chip"><span aria-hidden="true">${emojiFor[i]||'•'}</span>${i}</div>`).join('');
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
      cartItems.innerHTML = `<div class="cart-empty"><span aria-hidden="true">🛒</span>Your cart is empty.<br/>Add some wholesome treats!</div>`;
    } else {
      cartItems.innerHTML = ids.map(id=>{
        const p = productById[id]; const q = cart[id];
        count+=q; total+=p.price*q;
        return `<div class="cart-item">
          <div class="cart-item__thumb"><img src="${imgMap[id]}" alt="${p.name}" width="52" height="52" loading="lazy"/></div>
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
