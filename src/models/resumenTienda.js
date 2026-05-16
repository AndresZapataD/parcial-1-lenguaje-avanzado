export default class ResumenTienda {
  #dulces;

  constructor(dulces) {
    this.#dulces = dulces;
  }

  getTotalStock() {
    return this.#dulces.reduce((total, dulce) => {
      return total + Number(dulce.stock);
    }, 0);
  }

  getMasEconomico() {
    if (this.#dulces.length === 0) return null;

    return this.#dulces.reduce((min, dulce) => {
      return Number(dulce.precio) < Number(min.precio) ? dulce : min;
    });
  }

  getMasCostoso() {
    if (this.#dulces.length === 0) return null;

    return this.#dulces.reduce((max, dulce) => {
      return Number(dulce.precio) > Number(max.precio) ? dulce : max;
    });
  }
}