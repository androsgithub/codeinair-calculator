const Contas = {
  forca: function (p, a) {
    return p * a;
  },
  pressao: function (f, a) {
    return f * a;
  },
  area: function (d) {
    return (Math.PI * d ** 2) / 4;
  },
  velocidade_cilindro: function (a, tfa) {
    return a / tfa;
  },
  vazao: function (a, v) {
    return a * v;
  },
  teste: function (a, b, c) {
    return (a * b) / c;
  },
};
export default Contas;
