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

  static getAvatarSets() {
    const avatarSets = [
      {
        id: "set1",
      },
      {
        id: "set1",
      },
      {
        id: "set2",
      },
      {
        id: "set2",
      },
      {
        id: "set3",
      },
      {
        id: "set3",
      },
      {
        id: "set4",
      },
      {
        id: "set4",
      },
      {
        id: "set5",
      },
      {
        id: "set5",
      },
    ];

    return avatarSets;
  }

  // const getAvatars = getAvatarSets().map((item) => {
  //   const randomNumbers = HelperUtils.generateRandomNumber(5);
  //   return `https://robohash.org/${randomNumbers}?set=${item.id}&size=200x200`;
  // });
}

export default Helpers;
