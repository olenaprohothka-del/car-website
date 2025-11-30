document.addEventListener('DOMContentLoaded', function(){
  // Lightbox
  const lightbox = document.getElementById('lightboxModal');
  document.querySelectorAll('.gallery-grid img').forEach(img=>{
    img.addEventListener('click', ()=>{
      lightbox.querySelector('img').src = img.dataset.large || img.src;
      lightbox.style.display = 'flex';
    });
  });
  if(lightbox) lightbox.addEventListener('click', ()=> lightbox.style.display='none');

  // Booking form
  const booking = document.getElementById('bookingFull');
  if(booking){
    booking.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('full_name').value.trim();
      const phone = document.getElementById('full_phone').value.trim();
      if(!name || !phone){ document.getElementById('full_msg').textContent='Заповніть ім\'я і телефон.'; return; }
      const obj = {name,phone,service:document.getElementById('full_service').value,date:document.getElementById('full_date').value,notes:document.getElementById('full_notes').value,created:new Date().toISOString()};
      const arr = JSON.parse(localStorage.getItem('lux_bookings')||'[]'); arr.push(obj); localStorage.setItem('lux_bookings', JSON.stringify(arr));
      document.getElementById('full_msg').textContent='Заявка прийнята. Дякуємо!';
      booking.reset();
    });
  }

  // Sticky booking show/hide
  const sticky = document.getElementById('stickyBooking');
  if(sticky){
    window.addEventListener('scroll', ()=>{ sticky.style.display = window.scrollY>200 ? 'flex' : 'none'; });
  }

  // Back to top
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{ if(backBtn) backBtn.style.display = window.scrollY>300 ? 'block' : 'none'; });
  if(backBtn) backBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // Counters (simple)
  document.querySelectorAll('.counter').forEach(el=>{ const t=parseInt(el.dataset.target||0,10); el.textContent = t; });

  // FAQ toggles
  document.querySelectorAll('.faq-q').forEach(q=> q.addEventListener('click', ()=>{ const a=q.nextElementSibling; a.style.display = a.style.display==='block' ? 'none' : 'block'; }));
});