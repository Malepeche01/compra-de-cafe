const container = document.getElementById("content")
container.classList.add("container")

const titulo = document.createElement("h2")
titulo.innerText = ("Café de Especialidad en Casa")
container.appendChild(titulo)

let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let todoslosProductos =  []

const btn = document.createElement("button")
btn.innerText = "Mi Canasta 🧺"
btn.onclick = () => miCanasta()
contenidoCarrito.appendChild(btn)




fetch("./js/variedades.json")   
.then(response => response.json())
.then(data => {
    const arrayCafes = data
    arrayCafes.forEach (el =>{
    
    const card = document.createElement("card")
    card.classList.add("card")

    const nombre = document.createElement("h4")
    nombre.innerText =  el.nombre

    const perfilDeTueste = document.createElement("p")
    perfilDeTueste.innerText = el.perfilDeTueste

    const imagen = document.createElement("img")
    imagen.src = el.imagen

    const precio = document.createElement("p")
    precio.innerText = `$ ${el.precio}`
    
    const BTNagregar = document.createElement("button")
    BTNagregar.innerText = "Agregar"
    
    BTNagregar.onclick = () => agregarAlCarrito(el.id)
    
    card.appendChild(nombre)
    card.appendChild(imagen)
    card.appendChild(perfilDeTueste)
    card.appendChild(precio)
    card.appendChild(BTNagregar) 
    container.appendChild(card) 

    todoslosProductos.push(el)
    
})
.catch((_error) => console.log("No se pudo procesar la info"))
})



  
function agregarAlCarrito(id) {

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

    Toastify({
        text:`${productoAAgregar.id} agregado al carrito`,
        duration: 2000  
    })
    .showToast()
    save()     
}

function miCanasta() {

        const mostrarCarrito = document.getElementById("contenidoCarrito")
        mostrarCarrito.style.display = "block"
        mostrarCarrito.innerHTML = ""
        const tituloCarrito = document.createElement("div")
        tituloCarrito.innerHTML = `
        <h2 class ="titulo-carrito">Canasta</h2>`

        mostrarCarrito.appendChild(tituloCarrito)
    
        const btn2 = document.createElement("button")
        btn2.innerText = "Comprar"
        btn2.onclick = () => comprarCarrito()
        mostrarCarrito.appendChild(btn2)
        
        const btn3 = document.createElement("button")
        btn3.innerText = "Eliminar Canasta"
        btn3.onclick = () => eliminarCanasta()
        mostrarCarrito.appendChild(btn3)  
            
        carrito.forEach((el) => {
            let miCarrito = document.createElement("div")
            miCarrito.innerHTML = `
                <img src="${el.imagen}">
                <h4> ${el.id}</h4>
                <p> $${el.precio}<p/>
                <p> ${el.cantidad} Un.<p/>
                <button class="borrar-item">🗑️</button>
                `
               
            mostrarCarrito.appendChild(miCarrito)

            
            miCarrito.querySelector(".borrar-item").addEventListener("click", () => {
                eliminarItem(el.id)
     
            })
            
        })

        function comprarCarrito () {
            const total = carrito.reduce((acc,el) => acc + el.precio * el.cantidad  , 0)
            const totalCompra = document.createElement("div")
            totalCompra.innerHTML = `<h3>Su compra: $${total}</h3>`
            mostrarCarrito.appendChild(totalCompra)
        }
        save()  
        
        function eliminarCanasta() {
            const canastaVacia =  mostrarCarrito.innerHTML = "" 
            localStorage.clear()
            mostrarCarrito.append(canastaVacia)
        }                
}
    
const eliminarItem = id => {
    carrito = carrito.filter(item => item.id !== id)
    miCanasta()
    save()
}

const save =() => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
   



  
   

    
 
   
  
