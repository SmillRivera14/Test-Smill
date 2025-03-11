import {getData} from './index.mjs';

const $$ = ($$)=> document.getElementById(`${$$}`)

const modal = $$('productModal');
const openModalBtn = $$('openModalBtn');
const closeModalBtn = $$('closeModalBtn');
const productForm = $$('productForm');


// abrir y cerrar modal

openModalBtn.addEventListener('click', ()=>{
  modal.style.display='flex'
})

closeModalBtn.addEventListener('click', ()=>{
  modal.style.display='none'
})

// enviar dato del objeto POST

productForm.addEventListener('submit', e=>{
  e.preventDefault()

  // datos
  const nombre = $$('productName').value
  const precio = parseFloat($$('productPrice').value);

  console.log(nombre);
  console.log(precio);
  

  // objeto a enviar
  const objectForSent= {
    nombre:nombre,
    precio:precio
  }

  fetch("https://localhost:7181/api/Productos",{
    headers:{
      "content-type":"application/json"
    },
    method:"POST",
    body: JSON.stringify(objectForSent)
  })
  .then(res => res.json)
  .then(data => {
    if(data) console.log(`Estatus: ${data.status}`);
    location.reload()
  })
})