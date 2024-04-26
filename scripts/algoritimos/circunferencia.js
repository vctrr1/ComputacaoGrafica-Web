import { setarDadosParaSaidaDeDados, ativaPixel } from '../utils/utils.js'

// Função para desenhar uma circunferencia com o método Polinomial
export function circunferenciaPolinomial(raio, tipoCanvas) {
    // Inicialização das variáveis
    let x = 0;
    let i = 1;
    let xend = raio;
    setarDadosParaSaidaDeDados("\nCircunferência Polinomial.\n\n" + 
        "Raio : "+ raio +"\n\n"
    );
    // Loop para desenhar o círculo
    while (x <= xend) {
        // Cálculo da coordenada y usando a equação do círculo
        let y = Math.round(Math.sqrt(raio * raio - x * x));
        
        // Plotar os pontos determinados pela simetria
        ponto_Circulo(tipoCanvas, x, y);
        // Incrementar x
        x += i;
    }
}

// Função para desenhar uma circunferencia com o método trigonometrico
export function circunferenciaTrigonometrica(raio, tipoCanvas) {
    
    // Variável para armazenar o ângulo atual
    let theta = 0;
    
    // Variável para determinar se o círculo foi convertido
    let converted = false;
    
    // Passo para incrementar o ângulo
    const passo = 1;
    setarDadosParaSaidaDeDados("\nCircunferência Trigonemétrica.\n\n" + 
        "Raio : "+ raio +"\n\n"
    );
    // Loop enquanto o círculo não for completamente desenhado
    while (!converted) {
        // Converter o ângulo de graus para radianos
        let radianos = (theta * Math.PI) / 180;
        
        // Calcular a coordenada x usando a fórmula do círculo
        let x = Math.round(raio * Math.cos(radianos));
       
        // Calcular a coordenada y usando a fórmula do círculo
        let y = Math.round(raio * Math.sin(radianos));
        // Plotar os pontos determinados pela simetria
        ponto_Circulo(tipoCanvas, x, y);
        // Incrementar o ângulo
        theta += passo;
        // Condição de parada: círculo completo quando o ângulo alcança 360 graus
        if (theta >= 360) {
            converted = true;
        }
    }
}

//Função da circunferencia PM
export function circunferenciaPontoMedio(raio, tipoCanvas){
    var x = 0;
    var y = raio;
    var d = (1-raio);
    setarDadosParaSaidaDeDados("\nCircunferência Ponto Médio.\n\n" + 
        "Raio : " + raio + "\n" + 
        "X = " + x + "\nY = " + y +
        "\nD = " + d + "\n\n"
    );
    ponto_Circulo(tipoCanvas, x, y);
    while( y > x){
        if(d < 0 ){
            d += 2.0*x + 3.0;
        }
        else{
            d += 2.0*(x-y)+5;
            y--;
        }
        x++;
        ponto_Circulo(tipoCanvas, x, y);
    }
}

//Função para realizar espelhamento dos pontos da circunferencia 
export function ponto_Circulo(tipoCanvas, x, y){ 
    ativaPixel(tipoCanvas, x, y);
    setarDadosParaSaidaDeDados("X : " + x + "\tY : " + y+"\n");

    ativaPixel(tipoCanvas, y, x);
    setarDadosParaSaidaDeDados("Y : " + y + "\tX : " + x+"\n");

    ativaPixel(tipoCanvas, y, -x);
    setarDadosParaSaidaDeDados("Y : " + y + "\tX : " + -x+"\n");

    ativaPixel(tipoCanvas, x, -y);
    setarDadosParaSaidaDeDados("X : " + x + "\tY : " + -y+"\n");

    ativaPixel(tipoCanvas, -x, -y);
    setarDadosParaSaidaDeDados("X : " + -x + "\tY : " + -y+"\n");

    ativaPixel(tipoCanvas, -y, -x);
    setarDadosParaSaidaDeDados("Y : " + -y + "\tX : " + -x+"\n");

    ativaPixel(tipoCanvas, -y, x);
    setarDadosParaSaidaDeDados("Y : " + -y + "\tX : " + x+"\n");

    ativaPixel(tipoCanvas, -x, y);
    setarDadosParaSaidaDeDados("X : " + -x + "\tY : " + y+"\n\n\n");
}