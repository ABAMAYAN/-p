const screens = [...document.querySelectorAll('.screen')];
const navItems = [...document.querySelectorAll('.nav-item')];
function go(id){
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  navItems.forEach(n=>n.classList.toggle('active',n.dataset.go===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.go)));

let cart = {};
const products = [...document.querySelectorAll('.product-card')];
function updateCart(){
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  document.getElementById('cartCount').textContent = `${count} в корзине`;
  document.getElementById('cartSummary').textContent = count ? `Товаров: ${count}` : 'Корзина пуста';
  document.getElementById('cartBar').classList.toggle('show',count>0);
}
products.forEach(card=>{
  card.querySelector('.add-btn').addEventListener('click',()=>{
    const name=card.dataset.name; cart[name]=(cart[name]||0)+1; updateCart();
    showToast(`${name} добавлен в корзину`);
  });
});
document.getElementById('searchInput').addEventListener('input',e=>{
  const q=e.target.value.trim().toLowerCase();
  products.forEach(p=>p.hidden=!p.dataset.name.toLowerCase().includes(q));
});
document.querySelectorAll('.chip').forEach(chip=>chip.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));
  chip.classList.add('selected');
  products.forEach(p=>p.hidden=chip.dataset.filter!=='all'&&p.dataset.category!==chip.dataset.filter);
}));
document.getElementById('orderButton').addEventListener('click',()=>{
  const lines=Object.entries(cart).map(([name,n])=>`${name} × ${n}`).join(', ');
  showToast(`Заказ подготовлен: ${lines}`);
});
document.getElementById('mapButton').addEventListener('click',()=>showToast('Адрес магазина можно добавить в настройках проекта'));
document.getElementById('cityButton').addEventListener('click',()=>showToast('Выбран город: Москва'));
document.querySelectorAll('#ratingStars button').forEach(btn=>btn.addEventListener('click',()=>{
  const rating=Number(btn.dataset.rating);
  document.querySelectorAll('#ratingStars button').forEach(b=>b.classList.toggle('active',Number(b.dataset.rating)<=rating));
  document.getElementById('ratingMessage').textContent=`Спасибо! Вы поставили ${rating} из 5`;
}));
let toastTimer;
function showToast(message){
  const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2300);
}
