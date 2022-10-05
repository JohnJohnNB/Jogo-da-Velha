const celulas = document.querySelectorAll('.celula')
var turno = true
var result = false
var check_if_draw = 0
var jogador1 = "X"
var jogador2 = "O"
var jogadas_x = []
var jogadas_o = []
var possibilidades = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

document.addEventListener("click", (event) => {
    if(event.target.matches('.celula') && !event.target.matches('.done') && result == false){
        jogar(event.target.id)
    }
})

function restart() {
    document.location.reload()
}

function jogar(id) {
    let celula = document.getElementById(id)
    let jogador = turno?jogador1:jogador2
    let jogadas = turno?jogadas_x:jogadas_o
    jogadas.push(id)
    check_if_draw++
    celula.textContent = jogador
    celula.classList.add('done')
    turno = !turno
    if(jogadas.length >= 3) {
        vencedor(jogadas, jogador)
    }
}

function vencedor(jogadas, jogador) {
    result = possibilidades.some(test = (a) => {
        var counter = 0
        for(let item in a) {
            console.log(a[item])
            if(jogadas.includes(String(a[item]))) {
                counter++
            }
        }
        if(counter >= 3){
            return true
        } else {
            return false
        }
    })
    if(result == true){
        var resposta = document.getElementById('resposta')
        var botao = document.createElement('input')
        botao.setAttribute('type', 'button')
        botao.setAttribute('value', 'Recomeçar')
        botao.setAttribute('id', 'restart')
        botao.addEventListener('click', restart)
        var text = document.createElement('p')
        text.innerHTML = `O vencedor é ${jogador} !`
        resposta.appendChild(text)
        resposta.appendChild(botao)
    } else if (check_if_draw == 9){
        result = true
        var resposta = document.getElementById('resposta')
        var botao = document.createElement('input')
        botao.setAttribute('type', 'button')
        botao.setAttribute('value', 'Recomeçar')
        botao.setAttribute('id', 'restart')
        botao.addEventListener('click', restart)
        var text = document.createElement('p')
        text.innerHTML = `Não há vencedor, empate!`
        resposta.appendChild(text)
        resposta.appendChild(botao)
    }
}

