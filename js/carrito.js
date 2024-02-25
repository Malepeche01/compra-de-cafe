
function miCompra(){
   







    

   
    const contenidoCarrito = document.getElementById("contenidoCarrito")
    contenidoCarrito.innerHTML = ""
    const tituloCarrito = document.createElement("div")
    tituloCarrito.innerHTML = `
    <h2 class ="titulo-carrito">Carrito</h2>`

    contenidoCarrito.append(tituloCarrito);

    const botonCarrito = document.getElementById("modificarCarrito")
    botonCarrito.innerText = "🗑️"
   
    contenidoCarrito.append(botonCarrito)



    carrito.forEach((el) => {
        let miCarrito = document.createElement("div")
        miCarrito.innerHTML = `
        <img src="${el.imagen}">  
        <h4> ${el.id}</h4>
        <p> $${el.precio}<p/>
        <p> ${el.cantidad} Un.<p/>  
    
        `
        
        contenidoCarrito.append(miCarrito);
      
    })
   
    botonCarrito.addEventListener("click", () =>{
        contenidoCarrito.style.display = "none"
     })
    const total = carrito.reduce((acc,el) =>acc + el.precio, 0);
    const totalCompra = document.createElement("div");
    totalCompra.innerHTML = `Su compra: $${total}`;
    contenidoCarrito.append(totalCompra);




    

}
const guardar = () => {
    localStorage.setItem("miCarrito", JSON.stringify(carrito))
}



guardar()
      /*      
       
  function mail(){
        
        const { value: email } = Swal.fire({
            title: "Nos pondremos en contacto a la brevedad para hacerte el envío",
            input: "email",
            inputLabel: "Ingresá tu dirección de correo electrónico",
            inputPlaceholder: "nombre@mail.com"
          });
          if (email) {
            Swal.fire(`email ingresado: ${email}`);
          }
    }
    setTimeout(mail, 6000);



     <button id="verCompra" class="btn"></button>
        <button id="modificarCarrito" class="btn">🗑️</button>
 */








        


