import { ALPHABET_MAP, GRID_SETTINGS_KEY } from "./constants";

type Settings = {
  [key: string]: any;
};

class Helpers {
  static createEmptyGrid(rows: number, cols: number) {
    return Array.from({ length: rows }, () => Array(cols).fill("transparent"));
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

  static nameGenerator() {
    const randomPart = (length: number) =>
      Math.random()
        .toString(36)
        .substring(2, 2 + length);

    const part1 = randomPart(3); // e.g., 6yd
    const part2 = randomPart(4); // e.g., 8udw
    const part3 = randomPart(3); // e.g., pll

    return `${part1}-${part2}-${part3}`;
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

  static generatePixelText(
    text: string,
    alphabetMap = ALPHABET_MAP,
    onColor = "#000000",
    spacing = 1,
    offColor = "#FFFFFF"
  ) {
    const chars = text.toUpperCase().split("");
    const sample = alphabetMap["A"];
    const rowCount = sample.length;

    // Step 1: Build grid without padding
    const grid: string[][] = Array.from({ length: rowCount }, () => []);

    chars.forEach((char, i) => {
      if (char === " ") {
        // Add 3-pixel space between words
        grid.forEach((row) => row.push(...Array(3).fill(offColor)));
        return;
      }

      const pattern = alphabetMap[char] ?? alphabetMap[" "];

      pattern.forEach((rowStr, rowIdx) => {
        const row = rowStr
          .split("")
          .map((bit) => (bit === "1" ? onColor : offColor));
        grid[rowIdx].push(...row);
      });

      const nextChar = chars[i + 1];

      // Add spacing between characters (but not before or after space)
      if (nextChar && nextChar !== " ") {
        grid.forEach((row) => row.push(...Array(spacing).fill(offColor)));
      }
    });

    // Step 2: Add 1-pixel white padding around the text
    const paddedGrid: string[][] = [];

    const paddedRowLength = grid[0].length + 2;

    // Top padding
    paddedGrid.push(Array(paddedRowLength).fill(offColor));

    // Middle rows with left/right padding
    grid.forEach((row) => {
      paddedGrid.push([offColor, ...row, offColor]);
    });

    // Bottom padding
    paddedGrid.push(Array(paddedRowLength).fill(offColor));

    return paddedGrid;
  }
}

export default Helpers;
