class Helpers {
  static createEmptyGrid(
    rows: number,
    cols: number,
    color: string = "#FFFFFF"
  ) {
    return Array.from({ length: rows }, () => Array(cols).fill(color));
  }

  static saveToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static loadDataFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export default Helpers;
