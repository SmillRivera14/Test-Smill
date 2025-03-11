import {UpdateElement} from './update.mjs'

function getData(done){
  const result = fetch('https://localhost:7181/api/Productos')
  result.then(res => res.json())
  .then(data => done(data))
}


//eliminar datos
function DeleteData(id, element){
  const result = fetch(`https://localhost:7181/api/Productos/${id}`,{method:"DELETE"})
  result.then(res=>{
    if(res.ok){
      console.log(`Se elimino el producto con el ID: ${id}, elemento: ${element}`);
      
    }
  })
}

function getDataByID(id){
  const result = fetch(`https://localhost:7181/api/Productos/${id}`)
  result
  .then(res => res.json())
  .then((data) => {
    console.log(`esta es tu data ${JSON.stringify(data)}`);
  })
}

getDataByID(80)

getData(data=>{
  const section = document.querySelector('.galery-grid')
  section.innerHTML=' ';

  data.forEach(element => {
    const productElement = document.createElement('div');
    productElement.classList.add('galery-view');
    productElement.setAttribute('data-id',element.id)
    productElement.innerHTML=
    `
    <div class="product-info">
      <p class="product-name">Nombre: ${element.nombre}</p>
      <p class="product-price"> $${element.precio}</p>
      <Button class="btn-delete"> Eliminar </Button>
      <Button class="btn-update"> Actualizar </Button>
    </div>
    `;

    const btnDelete = productElement.querySelector('.btn-delete');
    const btnUpdate = productElement.querySelector('.btn-update');

    btnDelete.addEventListener('click', ()=>{
      DeleteData(element.id, element.nombre)
    })

    const $$ = ($$)=> document.querySelector(`${$$}`)
    const modal = $$('.modal-update')
  
    btnUpdate.addEventListener('click', ()=>{
      UpdateElement(element.id)
      modal.style.display= 'flex'
    })
    
    section.append(productElement)
  });
})

export {getData}