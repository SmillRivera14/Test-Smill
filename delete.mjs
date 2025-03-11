export function DeleteData(id, element){
  const result = fetch(`https://localhost:7181/api/Productos/${id}`,{method:"DELETE"})
  result.then(res=>{
    if(res.ok){
      console.log(`Se elimino el producto con el ID: ${id}, elemento: ${element}`);
      
    }
  })
}