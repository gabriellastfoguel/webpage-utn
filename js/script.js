// -----------------------MENU RESPONSIVE------------------------------

const menu_bar = document.querySelector(".menu_bars");
const menu = document.querySelector(".menu");

const ico = document.querySelector(".icomenubars");
let click = false;

menu_bar.addEventListener("click", (e) => {
  menu.classList.toggle("menu_visible");
  if (click == false) {
    click = true;

    ico.classList.replace("fa-bars", "fa-times");
    ico.style.transform = "rotate(180deg)";
    ico.style.transition = "all 1s ease";
  } else {
    click = false;

    /* -----------------------animacion icono menu responsive para cerrar la X----------- */
    setTimeout(() => {
      ico.classList.replace("fa-times", "fa-bars");
    }, 500);
    ico.style.transform = "rotate(-180deg)";
    ico.style.transition = "all 1s ease";
  }
});

menu.addEventListener("click", () => {
  menu.classList.toggle("menu_visible");
  click = false;

  /* -----------------------animacion icono menu responsive para cerrar la X----------- */
  setTimeout(() => {
    ico.classList.replace("fa-times", "fa-bars");
  }, 500);
  ico.style.transform = "rotate(-180deg)";
});

let menu_visible = false;

const input_search = document.querySelector(".input_search");

const cards_comida = document.querySelector(".cards_comida");

const cards_bebida = document.querySelector(".cards_bebida");

const cards_ensalada = document.querySelector(".cards_ensalada");

const cards_promo = document.querySelector(".cards_promo");

const titulo_hamburguesas = document.querySelector(".titulo-hamburguesas");
const titulo_bebidas = document.querySelector(".titulo-bebidas");
const titulo_ensaladas = document.querySelector(".titulo-ensaladas");
const titulo_promos = document.querySelector(".titulo-promos");
const hr_hamburguesas = document.querySelector(".hr_hamburguesas");
const hr_bebidas = document.querySelector(".hr_bebidas");
const hr_ensaladas = document.querySelector(".hr_ensaladas");
const hr_promos = document.querySelector(".hr_promos");

const cargarCards = (info_cards, donde) => {
    // console.log(info_cards);
    
    const fragmento = document.createDocumentFragment();
    for (item of info_cards) {
      const divcard = document.createElement("DIV");
      divcard.classList.add("card");
      divcard.dataset.id=item.id;


      const divCardImg = document.createElement("DIV");
      divCardImg.classList.add("divcardImg");
      const img = document.createElement("IMG");
      img.classList.add("imgcard");
      img.setAttribute("src", `./assets/${item.imgurl}`);
      img.setAttribute("alt", `${item.descripcion}`);
      const cardDescription = document.createElement("DIV");
      cardDescription.classList.add("cardDescription");
      const h2 = document.createElement("H2");
      h2.textContent = item.nombre;
      h2.classList.add("cardTitulo");
      const pdesc = document.createElement("P");
      pdesc.textContent = item.descripcion;
      pdesc.classList.add("cardTexto");

      const footcard = document.createElement("DIV");
      footcard.classList.add("foot-card")

      const btn_card = document.createElement("BUTTON");
      btn_card.textContent="+"
      btn_card.classList.add("btn_card");
      btn_card.dataset.id=item.id;



      const precio = document.createElement("P");
      precio.textContent = item.precio;
      precio.classList.add("precio");
  
      divCardImg.appendChild(img);
      cardDescription.appendChild(h2);
      cardDescription.appendChild(pdesc);
      footcard.appendChild(btn_card);
      footcard.appendChild(precio);
      cardDescription.appendChild(footcard);

  
      divcard.appendChild(divCardImg);
      divcard.appendChild(cardDescription);
      // -------------seteo este atributo para poder hacer el search
      divcard.setAttribute("data-card", item.nombre.toLowerCase());
      fragmento.appendChild(divcard);
    }
    document.querySelector(donde).appendChild(fragmento);
  };

const peticiones = async (url, where) => {
  try {
        let peticion = await fetch(url);
        let res = await peticion.json();
                cargarCards(res,where)
        return res;
  } catch (err) {
        return document.querySelector(where).innerHTML=`<h2 style="color:white">Error al intentar leer el archivo de datos</h2>`

  }
};


const uploadFiles = async ()=>{
   await peticiones("./hamburguesas.json", ".cards_comida");
   await peticiones("./bebidas.json", ".cards_bebida");
   await peticiones("./ensaladas.json", ".cards_ensalada");
   await peticiones("./promos.json", ".cards_promo");

}


uploadFiles();




// -----------------------BUSCADOR------------------------------
input_search.addEventListener("keyup", () => {
  const cards = document.querySelectorAll(".card");
  // console.log(e.target.value).
  console.log(input_search.value);
  cards.forEach((card) => {
    // console.log(card.dataset.card)

    if (card.dataset.card.includes(input_search.value.toLowerCase())) {
      card.dataset.card.toLowerCase();

      card.classList.remove("none");
    } else {
      input_search.value.toLowerCase();
      card.classList.add("none");

      // console.log("no hay coincidencias");
    }
  });

  if (input_search.value != "") {
    titulo_hamburguesas.classList.add("none");
    titulo_bebidas.classList.add("none");
    titulo_ensaladas.classList.add("none");
    titulo_promos.classList.add("none");
    hr_hamburguesas.classList.add("none");
    hr_bebidas.classList.add("none");
    hr_ensaladas.classList.add("none");
    hr_promos.classList.add("none");
  } else {
    titulo_hamburguesas.classList.remove("none");
    titulo_bebidas.classList.remove("none");
    titulo_ensaladas.classList.remove("none");
    titulo_promos.classList.remove("none");
    hr_hamburguesas.classList.remove("none");
    hr_bebidas.classList.remove("none");
    hr_ensaladas.classList.remove("none");
    hr_promos.classList.remove("none");
  }
});

// input_search.addEventListener("blur", () => {
//   input_search.value = "";
//   titulo_hamburguesas.classList.remove("none");
//   titulo_bebidas.classList.remove("none");
//   titulo_ensaladas.classList.remove("none");
//   titulo_promos.classList.remove("none");
//   hr_hamburguesas.classList.remove("none");
//   hr_bebidas.classList.remove("none");
//   hr_ensaladas.classList.remove("none");
//   hr_promos.classList.remove("none");
//   const cards = document.querySelectorAll(".card");
//   cards.forEach((card) => {
//     card.classList.remove("none");
//   });
// });

//---------------- ContactForm -----------------------

const form = document.querySelector(".form_contactos"),
  loader = document.querySelector(".form_contact_loader"),
  response = document.querySelector(".modal");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  loader.classList.remove("none");
  fetch("https://formsubmit.co/ajax/gabriellastfoguel@gmail.com", {
    method: "POST",
    body: new FormData(e.target),
  })
    .then((res) => {
      res.ok ? res.json() : Promise.reject(res);
      return res;
    })
    .then((json) => {
      console.log(json);
      location.hash = "#gracias";
      form.reset();
    })
    .catch((err) => {
      console.log(err);
      response.querySelector("h3").innerHTML =
        "Ocurrio un error al enviar. Intenta nuevamente" + err;
    })
    .finally(() => {
      loader.classList.add("none");

      setTimeout(() => {
        location.hash = "#close";
      }, 3000);
    });
});
// --------------buton scroll top---------------

const $btn=document.querySelector(".btn-top");
$btn.addEventListener("click",()=>{
  window.scroll(0, 0)
});


// let ultimoScroll;
const $header = document.querySelector(".header");
window.addEventListener("scroll",()=>{
  if(window.scrollY>500){
     $btn.classList.remove("desaparecerBtnScroll");
    $btn.classList.add("aparecerBtnScroll");

  }
  else
{
  $btn.classList.remove("aparecerBtnScroll");

  $btn.classList.add("desaparecerBtnScroll");
}
  

  
  // let scrollActual=window.scrollY;
  // if (parseInt(ultimoScroll)>parseInt(scrollActual)){
  //   console.log("mostrar")
  //   console.log(parseInt(ultimoScroll))
  //   $header.style.transform="translate3d(0,0%,0)"
  //   $header.style.transition="all 1s ease"
    
  // }else{
  //   $header.style.transform="translate3d(0,-100%,0)"
  //   $header.style.transition="all 1s ease"


  //   console.log("esconder")
    
  // }
  
  
  // ultimoScroll=scrollActual;
});



// ************************CARRITO DE COPMPRAS*******************
let total=0;
let carrito=[];
let cantidadDeUnidades=0;

const $listCart = document.querySelector(".list-cart");
const $btn_carrito = document.querySelector(".btn_carrito");

const $ulCart = document.querySelector(".ul-cart");
const $vaciar_cart=document.querySelector(".vaciar_cart");
const $num_compras=document.querySelector(".num_compras");
const $btn_card=document.querySelector(".btn-card");
const $divTotal=document.querySelector(".total");
const $cart_btn_pagar=document.querySelector(".cart_btn_pagar")

const addToCart =(id,titulo,cantidad,precio,imagen)=>{
  carrito.push(
    {
      "id": id,
      "titulo": titulo,
      "cantidad": cantidad,
      "precio": precio,
      "imagen": imagen}
  )
}



document.addEventListener("click",(e)=>{



const $btn_sacar = document.querySelector(".btn_sacar");

// *****************boton vaciar carrito**********************
if (e.target.matches(".vaciar_cart")||e.target.matches(".fa-trash-alt")){
  $ulCart.innerHTML="";
  cantidadDeUnidades=0;
  total=0;
  carrito=[];
  cantidadDeUnidades=0;
  agregado =false;
  $divTotal.innerHTML=0;
  $num_compras.innerHTML=0;
  $num_compras.classList.add("none");
  $cart_btn_pagar.style.visibility="hidden"

  
}






// ---------------------------boton de agregar en las cards------------
  if (e.target.matches(".btn_card")){ 
    let agregado =false;
    let dataId=e.target.dataset.id;
    const card_select=document.querySelector(`[data-id="${e.target.dataset.id}"]`);

    s_titulo=card_select.querySelector(".cardTitulo").textContent;
    
    s_img=card_select.querySelector("img");

    s_precio=Number(card_select.querySelector(".precio").textContent)

    if (carrito.length==0){
      addToCart(dataId,s_titulo,1,s_precio,s_img.getAttribute("src"))
      addItem(dataId,s_titulo,1,s_precio,s_img.getAttribute("src"))

      agregado=true;
    }else{
      carrito.forEach(el=>{

        if (el.id==dataId ){
          el.cantidad+=1;
          el.precio=el.precio+s_precio;
          agregado=true;
          // aca ahora
          const cambiar_cant = $ulCart.querySelector(`[data-cartid="${dataId}"]`);
          console.log(cambiar_cant)

          cambiar_cant.querySelector(".cart_cant").innerHTML = el.cantidad;
          cambiar_cant.querySelector(".cart_precio").innerHTML = el.precio;
          
        }
      });

    }
      
    if (agregado==false){
      addToCart(dataId,s_titulo,1,s_precio,s_img.getAttribute("src"));
      addItem(dataId,s_titulo,1,s_precio,s_img.getAttribute("src"))

    }
    cantidadDeUnidades+=1;

    if (carrito.length!=0){
      $num_compras.classList.remove("none");
      $num_compras.innerHTML=cantidadDeUnidades;
    }
    // console.log(carrito)
    $divTotal.innerHTML=Number($divTotal.innerHTML)+ Number(s_precio) ;
    
    animarGloboCant();

    // renderCart(carrito);
    $cart_btn_pagar.style.visibility="visible"

  }




  // ----------------boton de descontar en las cards del carrito----------
  // ACAAHORA
  // const $btn_sacar = document.querySelector(".btn_sacar");

  if (e.target.matches(".btn_sacar")){
  
    let idDescontar= e.target.dataset.cartidbtn;
    console.log(e.target)
    let valor_a_descontar=0;
    carrito.forEach((el,index)=>{
      console.log(index)
      if(el.id==idDescontar){
        valor_a_descontar=el.precio/el.cantidad;
        el.cantidad-=1;
        el.precio=el.precio-valor_a_descontar;
     
        $divTotal.innerHTML=Number($divTotal.innerHTML)-valor_a_descontar;

        // aca ahora
        $num_compras.innerHTML=cantidadDeUnidades-=1;

        const cambiar_cant = $ulCart.querySelector(`[data-cartid="${idDescontar}"]`);
        console.log(cambiar_cant)

        cambiar_cant.querySelector(".cart_cant").innerHTML = el.cantidad;
        cambiar_cant.querySelector(".cart_precio").innerHTML = el.precio;
        
      }
      if (el.cantidad==0){
        carrito.splice(index,1);
        // const cambiar_cant = $ulCart.querySelector(`[data-cartid="${idDescontar}"]`);
        $ulCart.removeChild($ulCart.querySelector(`[data-cartid="${idDescontar}"]`));
        

      }
      if (cantidadDeUnidades==0)
      {
        $num_compras.classList.add("none");
        $cart_btn_pagar.style.visibility="hidden";

      }
    })
    // renderCart(carrito);

    animarGloboCant();
}

});

const animarGloboCant =()=>{
  $num_compras.classList.add("animation_num_compras");
  setTimeout(() => {
    $num_compras.classList.remove("animation_num_compras");
    
  }, 500);
}

$btn_carrito.addEventListener("click",(e)=>{
  e.preventDefault;
  $listCart.classList.toggle("hide_list_cart");
})



// console.log($listCart)


// const renderCart=(carrito)=>{
//   $ulCart.innerHTML="";
//   carrito.forEach(el=>{
    
//     const $card_cart=document.createElement("div");
//     $card_cart.classList.add("card_cart");
//     $card_cart.style.opacity="0";


    
    
//     $card_cart.dataset.cartid=el.id;


//     const $cart_divcardImg=document.createElement("div");
//     $cart_divcardImg.classList.add("cart_divcardImg");
//     const $cart_imgcard=document.createElement("img");
//     $cart_imgcard.classList.add("cart_imgcard");
//     $cart_imgcard.setAttribute("src", el.imagen);
  
//     const $cart_cardDescription=document.createElement("div");
//     $cart_cardDescription.classList.add("cart_cardDescription");
//     const $cart_cardTitulo=document.createElement("h2");
//     $cart_cardTitulo.innerHTML=el.titulo;
//     const $cart_cant=document.createElement("div");
//     $cart_cant.classList.add("cart_cant")
//     $cart_cant.innerHTML=el.cantidad;
//     const $cart_foot=document.createElement("div");
//     $cart_foot.classList.add("cart_foot");
//     const $cart_precio=document.createElement("p");
//     $cart_precio.classList.add("cart_precio");
//     $cart_precio.innerHTML=el.precio;
//     const $btn_sacar=document.createElement("button");
//     $btn_sacar.classList.add("btn_sacar");

//     $btn_sacar.dataset.cartidbtn=el.id;



//     $btn_sacar.innerHTML="-";
//     $cart_foot.appendChild($cart_precio);
//     $cart_foot.appendChild($btn_sacar);
//     $cart_cardDescription.appendChild($cart_cardTitulo);
//     $cart_cardDescription.appendChild($cart_cant);
//     $cart_cardDescription.appendChild($cart_foot);
  
//     $cart_divcardImg.appendChild($cart_imgcard);
  
//     $card_cart.appendChild($cart_divcardImg);
//     $card_cart.appendChild($cart_cardDescription);
  
//     $ulCart.appendChild($card_cart);
    // setTimeout(() => {
    //   $card_cart.style.opacity="1";
    //   $card_cart.style.transition="all 1s ease";
      
    //   // $card_cart.classList.add("card_cart_animation");
    //   console.log($card_cart)
    // }, 10);

//   })


// }

// nueva funcion
const addItem =(id,titulo,cantidad,precio,imagen)=>{

  const $card_cart=document.createElement("div");

  $card_cart.classList.add("card_cart");
  $card_cart.style.opacity="0";
  
  
  $card_cart.dataset.cartid=id;


  const $cart_divcardImg=document.createElement("div");
  $cart_divcardImg.classList.add("cart_divcardImg");
  const $cart_imgcard=document.createElement("img");
  $cart_imgcard.classList.add("cart_imgcard");
  $cart_imgcard.setAttribute("src", imagen);

  const $cart_cardDescription=document.createElement("div");
  $cart_cardDescription.classList.add("cart_cardDescription");
  const $cart_cardTitulo=document.createElement("h2");
  $cart_cardTitulo.innerHTML=titulo;
  const $cart_cant=document.createElement("div");
  $cart_cant.classList.add("cart_cant")
  $cart_cant.innerHTML=cantidad;
  const $cart_foot=document.createElement("div");
  $cart_foot.classList.add("cart_foot");
  const $cart_precio=document.createElement("p");
  $cart_precio.classList.add("cart_precio");
  $cart_precio.innerHTML=precio;
  const $btn_sacar=document.createElement("button");
  $btn_sacar.classList.add("btn_sacar");

  $btn_sacar.dataset.cartidbtn=id;



  $btn_sacar.innerHTML="-";
  $cart_foot.appendChild($cart_precio);
  $cart_foot.appendChild($btn_sacar);
  $cart_cardDescription.appendChild($cart_cardTitulo);
  $cart_cardDescription.appendChild($cart_cant);
  $cart_cardDescription.appendChild($cart_foot);

  $cart_divcardImg.appendChild($cart_imgcard);

  $card_cart.appendChild($cart_divcardImg);
  $card_cart.appendChild($cart_cardDescription);

  $ulCart.appendChild($card_cart);
      setTimeout(() => {
      $card_cart.style.opacity="1";
      $card_cart.style.transition="all 1s ease";
      
      // $card_cart.classList.add("card_cart_animation");
      console.log($card_cart)
    }, 10);
}


// -----------------efecto titulos secciones -------------------
const $tituloHamburguesa=document.querySelector(".titulo-hamburguesas");
const $tituloBebidas=document.querySelector(".titulo-bebidas");
const $tituloEnsaladas=document.querySelector(".titulo-ensaladas");
const $tituloPromos=document.querySelector(".titulo-promos");
const $titulocontactos=document.querySelector(".titulo-contactos");


const cb=(entrys)=>{
  entrys.forEach(el=>{
    if (el.isIntersecting){
      el.target.classList.add("aparecer");
      // console.log(el.target)
      observer.unobserve(el.target)

    }else{
      //la linea de abajo la comentae para que solo haga una vez el efecto
      el.target.classList.remove("aparecer")

    }
  })

}


const observer = new IntersectionObserver (cb,{
  threshold: "0.5"
})

observer.observe($tituloHamburguesa);
observer.observe($tituloBebidas);
observer.observe($tituloEnsaladas);
observer.observe($tituloPromos);
observer.observe($titulocontactos);


const $btn_pedir = document.querySelector(".cart_btn_pagar");

let pedido = "https://wa.me/+5491159202065?text=Me%20interesa%20contactarme%20con%20ustedes"

$btn_pedir.addEventListener("click",()=>{
  window.open("https://mercadopago.com","_blank");

})


