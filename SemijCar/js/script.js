console.log("script.js çalıştı!");
document.addEventListener('DOMContentLoaded', ()=>{
  const slides = document.querySelectorAll('.slide');
  if(slides.length===0) return;
  let index=0;
  let interval=setInterval(nextSlide,4000);

  function showSlide(i){slides.forEach(s=>s.style.display='none');index=(i+slides.length)%slides.length;slides[index].style.display='block';}
  function nextSlide(){showSlide(index+1);}
  function prevSlide(){showSlide(index-1);}

  document.getElementById('nextSlide')?.addEventListener('click', ()=>{nextSlide(); clearInterval(interval); interval=setInterval(nextSlide,4000);});
  document.getElementById('prevSlide')?.addEventListener('click', ()=>{prevSlide(); clearInterval(interval); interval=setInterval(nextSlide,4000);});

  showSlide(index);
});


document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("formMessage").textContent = "Mesajınız başarıyla gönderildi!";
});
// İletişim formu
document.getElementById("contactForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("formMessage").textContent = "Mesajınız başarıyla gönderildi!";
});

// Test sürüşü formu
document.getElementById("testDriveForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("driveMessage").textContent = "Randevunuz oluşturuldu. Teşekkürler!";
});
// COMMON: menu toggles for different pages (multiple toggles)
const toggles = [
  {btnId:'menuToggle', menuId:'menuList'},
  {btnId:'menuToggle2', menuId:'menuList2'},
  {btnId:'menuToggle3', menuId:'menuList3'}
];
toggles.forEach(t=>{
  const b = document.getElementById(t.btnId);
  const m = document.getElementById(t.menuId);
  if(b && m) b.addEventListener('click', ()=> m.classList.toggle('show'));
});

// THEME toggle (works across pages, multiple ids)
['themeToggle','themeToggle2','themeToggle3'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('click', ()=> {
    document.body.classList.toggle('light');
  });
});

// SLIDER (index.html)
(function(){
  const slidesWrap = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  if(!slidesWrap || slides.length===0) return;
  let index = 0;
  const total = slides.length;
  function go(i){
    index = (i + total) % total;
    slidesWrap.style.transform = `translateX(-${index * 100}%)`;
  }
  // auto
  let interval = setInterval(()=> go(index+1), 4000);
  // controls
  document.getElementById('prevSlide')?.addEventListener('click', ()=>{
    go(index-1); resetInterval();
  });
  document.getElementById('nextSlide')?.addEventListener('click', ()=>{
    go(index+1); resetInterval();
  });
  function resetInterval(){ clearInterval(interval); interval = setInterval(()=> go(index+1), 4000); }
})();

// FEATURED (index) - load sample cards
(function(){
  const grid = document.getElementById('featuredGrid');
  if(!grid) return;
  const featured = [
    {id:1,name:'Model X',tag:'Elektrikli',price:'2.850.000 TL',img:'img/car1.jpg'},
    {id:2,name:'Model Y',tag:'Performans',price:'3.200.000 TL',img:'img/car2.jpg'},
    {id:3,name:'Model Z',tag:'Hibrit',price:'1.950.000 TL',img:'img/car3.jpg'}
  ];
  featured.forEach(f => {
    const div = document.createElement('div'); div.className='feature-card';
    div.innerHTML = `<img src="${f.img}" alt="${f.name}"><h4>${f.name}</h4><div class="model-meta">${f.tag}</div><div style="margin-top:8px;font-weight:700">${f.price}</div><div style="margin-top:8px"><button class="btn" onclick="location.href='models.html'">İncele</button></div>`;
    grid.appendChild(div);
  });
})();

// MODELS page: populate and filter + compare
(function(){
  const grid = document.getElementById('modelsGrid');
  if(!grid) return;
  const models = [
    {id:1,name:'Model X',type:'elektrikli',hp:300,engine:'Elektrik',price:'2.850.000 TL',img:'img/car1.jpg'},
    {id:2,name:'Model Y',type:'benzinli',hp:420,engine:'3.0L Turbo',price:'3.200.000 TL',img:'img/car2.jpg'},
    {id:3,name:'Model Z',type:'hibrit',hp:210,engine:'1.6L + Elektrik',price:'1.950.000 TL',img:'img/car3.jpg'},
    {id:4,name:'Model S',type:'dizel',hp:190,engine:'2.0L Dizel',price:'1.400.000 TL',img:'img/car4.jpg'}
  ];

  models.forEach(m=>{
    const card = document.createElement('div'); card.className='model-card';
    card.dataset.type = m.type;
    card.innerHTML = `
      <label class="select-compare"><input type="checkbox" class="cmpbox" data-id="${m.id}"> Seç</label>
      <img src="${m.img}" alt="${m.name}">
      <h3>${m.name}</h3>
      <div class="model-meta">${m.engine} • ${m.hp} HP</div>
      <div style="margin-top:10px;font-weight:700">${m.price}</div>
      <div style="margin-top:10px"><button class="btn" onclick="openDetail(${m.id})">Detay</button></div>
    `;
    grid.appendChild(card);
  });

  // filter
  const filter = document.getElementById('modelFilter');
  if(filter) filter.addEventListener('change', ()=> {
    const val = filter.value;
    document.querySelectorAll('.model-card').forEach(c=>{
      if(val === 'all') c.style.display = 'block';
      else c.style.display = (c.dataset.type === val) ? 'block' : 'none';
    });
  });

  // compare
  const compareBtn = document.getElementById('compareBtn');
  if(compareBtn){
    compareBtn.addEventListener('click', ()=> {
      const checked = Array.from(document.querySelectorAll('.cmpbox:checked')).map(i=>i.dataset.id);
      if(checked.length !== 2){ alert('Lütfen tam 2 araç seçin (ikiye eşit).'); return; }
      const selected = models.filter(m => checked.includes(String(m.id)));
      const area = document.getElementById('compareArea'); const cards = document.getElementById('compareCards');
      area.hidden = false; cards.innerHTML = '';
      selected.forEach(s=>{
        const d = document.createElement('div'); d.className='card'; d.style.flex='1';
        d.innerHTML = `<h4>${s.name}</h4><img src="${s.img}" style="width:100%;height:120px;object-fit:cover;border-radius:6px;margin-top:8px"><p class="model-meta">${s.engine} • ${s.hp} HP</p><p style="font-weight:700">${s.price}</p>`;
        cards.appendChild(d);
      });
    });
  }
  const closeCompare = document.getElementById('closeCompare');
  if(closeCompare) closeCompare.addEventListener('click', ()=> document.getElementById('compareArea').hidden = true);

})();

// openDetail (simple modal-like navigation to detail area or alert)
function openDetail(id){
  alert('Model detay modal - demo. ID: ' + id);
}

// GALLERY (lightbox)
(function(){
  const galleryGrid = document.getElementById('galleryGrid');
  if(!galleryGrid) return;
  const images = [
    {src:'img/gallery1.jpg',cap:'Audi R8'},
    {src:'img/gallery2.jpg',cap:'Porsche 911'},
    {src:'img/gallery3.jpg',cap:'Lamborghini Huracan'},
    {src:'img/car1.jpg',cap:'Model X'},
    {src:'img/car2.jpg',cap:'Model Y'}
  ];
  images.forEach((it,idx)=>{
    const img = document.createElement('img'); img.src = it.src; img.alt = it.cap; img.dataset.cap = it.cap;
    img.addEventListener('click', ()=> openLightbox(it.src,it.cap));
    galleryGrid.appendChild(img);
  });

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  function openLightbox(src,cap){
    if(!lb) return;
    lbImg.src = src; lbCap.textContent = cap; lb.hidden = false;
  }
  if(lbClose) lbClose.addEventListener('click', ()=> { if(lb) lb.hidden = true; });
  if(lb) lb.addEventListener('click', (e)=> { if(e.target === lb) lb.hidden = true; });
})();

// CONTACT & TEST DRIVE form handlers
document.addEventListener('DOMContentLoaded', ()=>{
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      document.getElementById('formMessage').textContent = 'Mesajınız başarıyla gönderildi. Teşekkürler!';
      contactForm.reset();
    });
  }

  const testDriveForm = document.getElementById('testDriveForm');
  if(testDriveForm){
    testDriveForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      document.getElementById('driveMessage').textContent = 'Randevunuz alındı. Size geri dönüş yapacağız.';
      testDriveForm.reset();
    });
  }
});
