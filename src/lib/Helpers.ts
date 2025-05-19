import { GRID_SETTINGS_KEY } from "./constants";

type Settings = {
  [key: string]: any;
};

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

  static updateSettingsInLocalStorage(
    storeKey: string,
    settingsKey: string,
    value: any
  ) {
    try {
      const existing = localStorage.getItem(storeKey);
      let settings: Settings = {};

      if (existing) {
        settings = JSON.parse(existing);
      }

      settings[settingsKey] = value;
      this.saveToLocalStorage(storeKey, settings);
    } catch (error) {
      console.error("Failed to update localStorage settings:", error);
    }
  }

  static getSettingFromLocalStorage(settingsKey: string): any | null {
    const storeKey = GRID_SETTINGS_KEY;
    try {
      const existing = localStorage.getItem(storeKey);

      if (!existing) return null;

      const settings = JSON.parse(existing);
      return settings[settingsKey] ?? null;
    } catch (error) {
      console.error("Failed to get value from localStorage:", error);
      return null;
    }
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
