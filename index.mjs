import { UpdateElement } from './update.mjs';
import { DeleteData } from './delete.mjs';

function getData(filter = null, done) {
  let url = 'https://localhost:7181/api/Productos';
  if (filter) {
    url = `https://localhost:7181/api/Productos/${filter}`;
  }

  const result = fetch(url);
  result
    .then(res => res.json())
    .then(data => {
      if (filter) {
        done([data]);
      } else {
        done(data);
      }
    });
}

function createProductElement(element) {
  const productElement = document.createElement('div');
  productElement.classList.add('galery-view');
  productElement.setAttribute('data-id', element.id);
  productElement.innerHTML = `
    <div class="product-info">
      <p class="product-name">Nombre: ${element.nombre}</p>
      <p class="product-price"> $${element.precio}</p>
      <Button class="btn-delete"> Eliminar </Button>
      <Button class="btn-update"> Actualizar </Button>
    </div>
  `;

  const btnDelete = productElement.querySelector('.btn-delete');
  const btnUpdate = productElement.querySelector('.btn-update');

  btnDelete.addEventListener('click', () => {
    DeleteData(element.id, element.nombre);
  });

  const $$ = ($$) => document.querySelector(`${$$}`);
  const modal = $$('.modal-update');

  btnUpdate.addEventListener('click', () => {
    UpdateElement(element.id);
    modal.style.display = 'flex';
  });

  return productElement;
}

function displayProducts(data) {
  const section = document.querySelector('.galery-grid');
  section.innerHTML = '';  

  data.forEach(element => {
    const productElement = createProductElement(element);
    section.append(productElement);
  });
}

getData(null, displayProducts);

export function getDataByID(id) {
  getData(id, data => {
    console.log(`Este es tu producto filtrado: ${JSON.stringify(data[0])}`);
    displayProducts(data); 
  });
}

document.getElementById('search-btn').addEventListener('click', () => {
  const id = document.getElementById('product-id').value;
  if (id) {
    getDataByID(id);  
  } else {
    alert("Por favor, introduce un ID válido.");
  }
});

export { getData };
