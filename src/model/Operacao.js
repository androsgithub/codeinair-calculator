export default class Operacao {
  #id;
  #content;
  #numberOfParams;
  #operacao;
  constructor(id, content, params, operacao) {
    this.#id = id;
    this.#content = content;
    this.#numberOfParams = params;
    this.#operacao = operacao;
  }
  get id() {
    return this.#id;
  }
  get content() {
    return this.#content;
  }
  get numberOfParams() {
    return this.#numberOfParams;
  }
  get operacao() {
    return this.#operacao;
  }
}
