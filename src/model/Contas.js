import Operacao from "./Operacao";

const Contas = {
  forcaPneumatica: new Operacao(
    "Força Pneumática",
    "F = P x A",
    [
      ["p", ["pascal", "bar", "psi", "kPa"]],
      ["a", ["m2", "cm2", "mm2"]],
    ],
    function (p, a) {
      let pConvertido;

      // Convertendo a pressão para pascal
      if (p[1] == "bar") {
        pConvertido = p[0] * 1e5;
      } else if (p[1] == "psi") {
        pConvertido = p[0] * 6894.76;
      } else if (p[1] == "kPa") {
        pConvertido = p[0] * 1000;
      } else {
        pConvertido = p[0]; // assume-se que a pressão já está em pascal
      }

      // Convertendo a área para metros quadrados
      let aConvertido;
      if (a[1] == "cm2") {
        aConvertido = a[0] * 1e-4;
      } else if (a[1] == "mm2") {
        aConvertido = a[0] * 1e-6;
      } else {
        aConvertido = a[0]; // assume-se que a área já está em metros quadrados
      }

      const resultNewton = pConvertido * aConvertido;
      const resultDina = resultNewton * 1e5;
      const resultLibraForca = resultNewton * 0.224809;
      const resultKilogramaForca = resultNewton * 0.101972;

      return [
        ["newton", resultNewton],
        ["dina", resultDina],
        ["libra-força", resultLibraForca],
        ["quilograma-força", resultKilogramaForca],
      ];
    }
  ),
  pressaoPneumatica: new Operacao(
    "Pressão Pneumática",
    "P = F x A",
    [
      ["f", ["N/m2", "kN/m2"]],
      ["a", ["m2", "cm2", "mm2"]],
    ],
    function (f, a) {
      let fConvertida;

      // Convertendo força para Newtons
      if (f[1] == "kN/m2") {
        fConvertida = f[0] * 1000;
      } else {
        fConvertida = f[0]; // assume-se que a força já está em Newtons
      }

      // Convertendo a área para metros quadrados
      let aConvertida;
      if (a[1] == "cm2") {
        aConvertida = a[0] * 1e-4;
      } else if (a[1] == "mm2") {
        aConvertida = a[0] * 1e-6;
      } else {
        aConvertida = a[0]; // assume-se que a área já está em metros quadrados
      }

      const resultPascal = fConvertida / aConvertida;
      const resultBar = resultPascal / 1e5;
      const resultPsi = resultPascal / 6894.76;

      return [
        ["pascal", resultPascal],
        ["bar", resultBar],
        ["psi", resultPsi],
      ];
    }
  ),
  areaPneumatica: new Operacao(
    "Área Pneumática",
    "A = (PI x D²) / 4",
    [["d", ["m", "cm", "mm"]]],
    function (d) {
      let dConvertida;

      // Convertendo diâmetro para metros
      if (d[1] == "cm") {
        dConvertida = d[0] * 0.01;
      } else if (d[1] == "mm") {
        dConvertida = d[0] * 0.001;
      } else {
        dConvertida = d[0]; // assume-se que o diâmetro já está em metros
      }

      const resultM2 = (Math.PI * Math.pow(dConvertida, 2)) / 4;
      const resultCm2 = resultM2 * 1e4;
      const resultMm2 = resultM2 * 1e6;

      return [
        ["m2", resultM2],
        ["cm2", resultCm2],
        ["mm2", resultMm2],
      ];
    }
  ),

  vazaoPneumatica: new Operacao(
    "Vazão Pneumática",
    "Q = V x T",
    [
      ["v", ["a", "b"]],
      ["t", ["m3/s", "L/min"]],
    ],
    function (a) {
      let aConvertida;

      // Convertendo vazão para metros cúbicos por segundo
      if (a[1] == "L/min") {
        aConvertida = a[0] * 1.6667e-5;
      } else {
        aConvertida = a[0]; // assume-se que a vazão já está em metros cúbicos por segundo
      }

      return [
        ["m3/s", aConvertida],
        ["L/min", aConvertida * 60000],
      ];
    }
  ),
  tempoPneumatico: new Operacao(
    "Tempo Pneumático",
    "T = D / V",
    [
      ["d", ["m", "cm", "mm"]],
      ["v", ["m/s", "cm/s", "mm/s"]],
    ],
    function (d, v) {
      let dConvertido;

      // Convertendo distância para metros
      if (d[1] == "cm") {
        dConvertido = d[0] * 0.01;
      } else if (d[1] == "mm") {
        dConvertido = d[0] * 0.001;
      } else {
        dConvertido = d[0]; // assume-se que a distância já está em metros
      }

      // Convertendo velocidade para metros por segundo
      let vConvertida;
      if (v[1] == "cm/s") {
        vConvertida = v[0] * 0.01;
      } else if (v[1] == "mm/s") {
        vConvertida = v[0] * 0.001;
      } else {
        vConvertida = v[0]; // assume-se que a velocidade já está em metros por segundo
      }

      const resultTempo = dConvertido / vConvertida;
      return [["segundos", resultTempo]];
    }
  ),

  velocidadePneumatica: new Operacao(
    "Velocidade Pneumática",
    "V = D / T",
    [
      ["d", ["m", "cm", "mm"]],
      ["t", ["s"]],
    ],
    function (d, t) {
      let dConvertida;

      // Convertendo distância para metros
      if (d[1] == "cm") {
        dConvertida = d[0] * 0.01;
      } else if (d[1] == "mm") {
        dConvertida = d[0] * 0.001;
      } else {
        dConvertida = d[0]; // assume-se que a distância já está em metros
      }

      const resultVelocidade = dConvertida / t[0];
      const resultCmS = resultVelocidade * 100;
      const resultMmS = resultVelocidade * 1000;

      return [
        ["m/s", resultVelocidade],
        ["cm/s", resultCmS],
        ["mm/s", resultMmS],
      ];
    }
  ),
};

export default Contas;
