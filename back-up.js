const container = document.getElementById("content");
container.classList.add("container");


const titulo = document.createElement("h2");
titulo.innerText = ("Café de Especialidad en Casa");
container.appendChild(titulo);
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let todoslosProductos =  []


const btn = document.createElement("button")
btn.innerText = "Mi Compra 🧺"
btn.onclick = () => miCompra()
contenidoCarrito.appendChild(btn)



fetch("./js/variedades.json")
    .then(response => response.json())
    .then(data => {
        const arrayCafes = data
        arrayCafes.forEach (el =>{
       
        const card = document.createElement("card");
        card.classList.add("card");
    
        const nombre = document.createElement("h4");
        nombre.innerText =  el.nombre;

        const perfilDeTueste = document.createElement("p");
        perfilDeTueste.innerText = el.perfilDeTueste;
    
    
        const imagen = document.createElement("img")
        imagen.src = el.imagen;
    
    
        const precio = document.createElement("p")
        precio.innerText = `$ ${el.precio}`
        
        const BTNagregar = document.createElement("button")
        BTNagregar.innerText = "Agregar"
        BTNagregar.className = "btn"
        BTNagregar.onclick = () => agregarAlCarrito(el.id)
       
        card.appendChild(nombre);
        card.appendChild(imagen);
        card.appendChild(perfilDeTueste);
        card.appendChild(precio);
        card.appendChild(BTNagregar);  
        container.appendChild(card);  

        todoslosProductos.push(el)
   
    })
})   
       
function agregarAlCarrito(id){
   
    const productoAAgregar = todoslosProductos.find(el => el.id === id)

    if(!carrito.some(el => el.id === id)){
        carrito.push({
            ...productoAAgregar,
            cantidad: 1  
        })
    } else {
        let indiceDelProducto = carrito.findIndex(el => el.id === id)
      
       carrito[indiceDelProducto].cantidad += 1
    }

    console.log(carrito)
    
    Toastify({
        text:`${productoAAgregar.id} agregado al carrito`,
        duration: 2000  
    })
    .showToast()  
}

function miCompra(){


        const mostrarCarrito = document.getElementById("contenidoCarrito")
            contenidoCarrito.style.display = "block"
            contenidoCarrito.innerHTML = ""
            const tituloCarrito = document.createElement("div")
            tituloCarrito.innerHTML = `
            <h2 class ="titulo-carrito">Carrito</h2>`

            contenidoCarrito.append(tituloCarrito);
            contenidoCarrito.appendChild(btn)
            
        carrito.forEach((el) => {
            let miCarrito = document.createElement("div")
            miCarrito.innerHTML = `
                <img src="${el.imagen}">  
                <h4> ${el.id}</h4>
                <p> $${el.precio}<p/>   
                <p> ${el.cantidad} Un.<p/>  
                <button class="borrar-item">🗑️<button/>`
            mostrarCarrito.appendChild(miCarrito)
      
            
            let eliminar = contenidoCarrito.querySelector(".borrar-item")
            
            eliminar.addEventListener("click", () =>{
                eliminarItem(el.id)
            })
            save()
        })
        const total = carrito.reduce((acc,el) => acc + el.precio * el.cantidad  , 0);
        const totalCompra = document.createElement("div");
        totalCompra.innerHTML = `Su compra: $${total}`;
        contenidoCarrito.append(totalCompra);
 
    }    
    const eliminarItem = (id) => {
    const getItem = carrito.find(el => el.id === id)

    console.log(getItem)

    carrito = carrito.filter((nuevoCarritoID) => {
        return nuevoCarritoID !== getItem
    })

    miCompra()
}
      
const save =() => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

  
   

    
 
   
  
