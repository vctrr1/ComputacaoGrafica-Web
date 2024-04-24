import { DDA } from './reta.js';
import { limpaTela, limparSaidaDeDadosTextarea, setarDadosParaSaidaDeDados } from '../utils/utils.js';
import * as desenhar from './desenho.js';

export function cohenSutherland(x1, y1, x2, y2, x_min, y_min, x_max, y_max, ctx , altura, largura, matrizAreaDeRecorte) {
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
        if ((code1 === 0) && (code2 === 0)) { //tods os pontos estao dentro da area de recorte
            accept = true;
            break;
        } else if (code1 & code2 !== 0) { // todos os pontos entao fora da area de recorte, linha rejeitada
            limpaTela(ctx);
            desenhar.CohenSutherland(ctx, altura, largura);
            desenhar.Quadrado(matrizAreaDeRecorte, ctx);
            limparSaidaDeDadosTextarea();
            setarDadosParaSaidaDeDados("\nLinha fora da area de recorte.");
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
        limpaTela(ctx);
        desenhar.CohenSutherland(ctx, altura, largura);
        desenhar.Quadrado(matrizAreaDeRecorte, ctx);
        limparSaidaDeDadosTextarea();
        setarDadosParaSaidaDeDados("\nNOVAS COORDENADAS DA RETA.\n\n");
        DDA(x1, y1, x2, y2, ctx);
    } else {
        console.log("Line rejected");
    }
}