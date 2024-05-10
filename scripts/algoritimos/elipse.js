import { ativaPixel, setarDadosParaSaidaDeDados } from "../utils/utils.js";

export function elipsePontoMedio(xCenter, yCenter, Rx, Ry, ctx) {
    const Rx2 = Rx * Rx;
    const Ry2 = Ry * Ry;
    const twoRx2 = 2 * Rx2;
    const twoRy2 = 2 * Ry2;
    let p;
    let x = 0;
    let y = Ry;
    let px = 0;
    let py = twoRx2 * y;

    setarDadosParaSaidaDeDados("\nElipse Ponto Médio.\n\n" + 
        "X Origem: " + xCenter + "\nY Origem: " + yCenter + "\n" +
        "Raio de X: " + Rx + "\n" + 
        "Raio de Y: " + Ry + "\n\n\n"
    );
  
    ponto_elipse(xCenter, yCenter, x, y, ctx);
  
    // Região 1
    p = Math.round(Ry2 - (Rx2 * Ry) + (0.25 * Rx2));
    while (px < py) {
      x++;
      px += twoRy2;
      if (p < 0) {
        p += Ry2 + px;
      } else {
        y--;
        py -= twoRx2;
        p += Ry2 + px - py;
      }
      ponto_elipse(xCenter, yCenter, x, y, ctx);
    }
  
    // Região 2
    p = Math.round(Ry2 * (x + 0.5) * (x + 0.5) + Rx2 * (y - 1) * (y - 1) - Rx2 * Ry2);
    while (y > 0) {
      y--;
      py -= twoRx2;
      if (p > 0) {
        p += Rx2 - py;
      } else {
        x++;
        px += twoRy2;
        p += Rx2 - py + px;
      }
      ponto_elipse(xCenter, yCenter, x, y, ctx);
    }
  }
  
function ponto_elipse(xCenter, yCenter, x, y, ctx) {
  ativaPixel(ctx, xCenter + x, yCenter + y);
  setarDadosParaSaidaDeDados("X : " + (xCenter + x) + "\tY : " + (yCenter + y)+"\n");
  ativaPixel(ctx, xCenter - x, yCenter + y);
  setarDadosParaSaidaDeDados("X : " + (xCenter - x) + "\tY : " + (yCenter + y)+"\n");
  ativaPixel(ctx, xCenter + x, yCenter - y);
  setarDadosParaSaidaDeDados("X : " + (xCenter + x) + "\tY : " + (yCenter - y)+"\n");
  ativaPixel(ctx, xCenter - x, yCenter - y);
  setarDadosParaSaidaDeDados("X : " + (xCenter - x) + "\tY : " + (yCenter - y)+"\n");
}