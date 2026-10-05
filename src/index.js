let aumentar = document.getElementById("aumentar");
let diminuir = document.getElementById("diminuir");
let numero = document.getElementById("numero");
let contador = 0;


function atualizar(){
    numero.textContent = contador
}

aumentar.addEventListener("click", function(){
    contador++
    atualizar()
});
diminuir.addEventListener("click", function(){
    contador--
    atualizar()
});
reset.addEventListener("click", function(){
    resetar()
});

function resetar(){
    contador = 0
    atualizar()
}


