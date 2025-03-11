export function UpdateElement(id){
  const $$ = ($$)=> document.getElementById(`${$$}`)
  const modal = $$('updateModal')
  const close = document.querySelector('.close')
  
  close.addEventListener('click',()=>{
    modal.style.display= 'none'
  })

  updateForm.addEventListener('submit', e=>{
    e.preventDefault()
    const Nombre = $$("editName").value.trim(); // Elimina espacios extra
    const precio = parseFloat($$("editPrice").value); // Asegura que sea un número
    console.log(precio);
    const updateForm = $$('updateForm')

    const objectToSent = {
      id:id,
      nombre:Nombre,
      precio:precio,
      fechaDeCreacion: "2025-03-11T04:56:28.397Z"
    }
    console.log(objectToSent);
    

    const result = fetch(`https://localhost:7181/api/Productos/${id}`,{
      headers:{
        "content-type":"application/json"
      },
      method:"PUT",
      body: JSON.stringify(objectToSent)
    })
    result.then
    (res=>{
      if(res.ok){
        console.log("Producto actualizado con éxito.");
        modal.style.display= 'none'
        location.reload();
    } else {
      console.error("Error al actualizar el producto.");
    }})
  })

}