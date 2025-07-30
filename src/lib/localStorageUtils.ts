export const loadState = () => {
  try {
    if (typeof window === "undefined") return undefined; 
    const serializedState = localStorage.getItem("compareState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};


export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("compareState", serializedState);
  } catch (err) {
    console.error("Failed to save state to localStorage", err);
  }
};
