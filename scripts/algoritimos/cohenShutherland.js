import { retaPontoMedio } from './reta.js';
import { limpaTela, limparSaidaDeDadosTextarea, setarDadosParaSaidaDeDados } from '../utils/utils.js';
import * as desenhar from './desenho.js';


export function cohenSutherland(x1, y1, x2, y2, xmin, ymin, xmax, ymax, ctx , altura, largura, matrizAreaDeRecorte) {

    function bit(codigo, pos) {
        var bit = codigo << (31 - pos);
        bit = bit >>> 31;
        return bit;
    }

    function obterCodigo(x, y, xmin, ymin, xmax, ymax) {
        var codigo = 0;

        if (x < xmin) {
            codigo += 1;
        }
        if (x > xmax) {
            codigo += 2;
        }

        if (y < ymin) {
            codigo += 4;
        }
        if (y > ymax) {
            codigo += 8;
        }
        return codigo;
    }

    var aceito = false;
    var feito = false;

    var codigoFora;

    var x = 0, y = 0;

    while (!feito) {
        var codigo1 = obterCodigo(x1, y1, xmin, ymin, xmax, ymax);
        var codigo2 = obterCodigo(x2, y2, xmin, ymin, xmax, ymax);

        
        if (codigo1 == 0 && codigo2 == 0) {// Dentro da janela
            aceito = true;
            feito = true;
        } else if ((codigo1 & codigo2) != 0) {// Fora da janela
            limpaTela(ctx);
            desenhar.CohenSutherland(ctx, altura, largura);
            desenhar.Quadrado(matrizAreaDeRecorte, ctx);
            limparSaidaDeDadosTextarea();
            setarDadosParaSaidaDeDados("\nLinha fora da area de recorte");
            feito = true;
        } else {
            // Parcialmente dentro
            codigoFora = codigo1 != 0 ? codigo1 : codigo2;

            
            if (bit(codigoFora, 0) == 1) {// Esquerda
                x = xmin;
                y = y1 + ((y2 - y1) * (xmin - x1)) / (x2 - x1);
            } 
            else if (bit(codigoFora, 1) == 1) {//Direita
                x = xmax;
                y = y1 + ((y2 - y1) * (xmax - x1)) / (x2 - x1);
            } 
            else if (bit(codigoFora, 2) == 1) {// Baixo
                y = ymin;
                x = x1 + ((x2 - x1) * (ymin - y1)) / (y2 - y1);
            } 
            else if (bit(codigoFora, 3) == 1) {// Topo
                y = ymax;
                x = x1 + ((x2 - x1) * (ymax - y1)) / (y2 - y1);
            }

            if (codigoFora == codigo1) {
                x1 = x;
                y1 = y;
            } else {
                x2 = x;
                y2 = y;
            }
        }
    } // fim while

    if (aceito) {
        limpaTela(ctx);
        desenhar.CohenSutherland(ctx, altura, largura);
        desenhar.Quadrado(matrizAreaDeRecorte, ctx);
        limparSaidaDeDadosTextarea();
        setarDadosParaSaidaDeDados("\nNOVAS COORDENADAS DA RETA.\n\n");
        retaPontoMedio(x1, y1, x2, y2, ctx);
    } else {
        console.log("Line rejected");
    }
}

/*
function cohenSutherland(x1, y1, x2, y2, xmin, ymin, xmax, ymax) {
    const INSIDE = 0; // 0000
    const LEFT = 1; // 0001
    const RIGHT = 2; // 0010
    const BOTTOM = 4; // 0100
    const TOP = 8; // 1000

    function computeCode(x, y) {
        // initialized as being inside
        let code = INSIDE;
    
        if (x < x_min) // to the left of rectangle
            code |= LEFT;
        else if (x > x_max) // to the right of rectangle
            code |= RIGHT;
        if (y < y_min) // below the rectangle
            code |= BOTTOM;
        else if (y > y_max) // above the rectangle
            code |= TOP;
    
        return code;
    }

    // Compute region codes for P1, P2
    let code1 = computeCode(x1, y1);
    let code2 = computeCode(x2, y2);

    // Initialize line as outside the rectangular window
    let accept = false;

    while (true) {
        if ((code1 === 0) && (code2 === 0)) {
            // If both endpoints lie within rectangle
            accept = true;
            break;
        } else if (code1 & code2 !== 0) {
            limpaTela();
            desenharEixosCohenSutherland();
            desenharQuadrado(matrizAreaDeRecorte);
            limparSaidaDeDadosTextarea();
            setarDadosParaSaidaDeDados("\nLinha fora da area de recorte");
            break;
        } else {
            // Some segment of line lies within the
            // rectangle
            let code_out;
            let x, y;

            // At least one endpoint is outside the
            // rectangle, pick it.
            if (code1 !== 0){
                code_out = code1;
            } else{
                code_out = code2;
            }

            // Find intersection point;
            // using formulas y = y1 + slope * (x - x1),
            // x = x1 + (1 / slope) * (y - y1)
            if (code_out & TOP) {
                // point is above the clip rectangle
                x = x1 + (x2 - x1) * (y_max - y1) / (y2 - y1);
                y = y_max;
            } else if (code_out & BOTTOM) {
                // point is below the rectangle
                x = x1 + (x2 - x1) * (y_min - y1) / (y2 - y1);
                y = y_min;
            } else if (code_out & RIGHT) {
                // point is to the right of rectangle
                y = y1 + (y2 - y1) * (x_max - x1) / (x2 - x1);
                x = x_max;
            } else if (code_out & LEFT) {
                // point is to the left of rectangle
                y = y1 + (y2 - y1) * (x_min - x1) / (x2 - x1);
                x = x_min;
            }

            if (code_out === code1) {
                x1 = x;
                y1 = y;
                code1 = computeCode(x1, y1);
            } else {
                x2 = x;
                y2 = y;
                code2 = computeCode(x2, y2);
            }
        }
    }
    if (accept) {
        limpaTela();
        desenharEixosCohenSutherland();
        desenharQuadrado(matrizAreaDeRecorte);
        limparSaidaDeDadosTextarea();
        setarDadosParaSaidaDeDados("\nNOVAS COORDENADAS DA RETA.\n\n");
        retaPontoMedio(x1, y1, x2, y2);
    } else
        console.log("Line rejected");
}
*/