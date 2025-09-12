import {create } from 'zustand';


export const useThemeStore = create((set) => ({
    theme:localStorage.getItem("connectkaro-theme") || "Dark",
    setTheme: (theme) => {
        localStorage.setItem("connectkaro-theme",theme)
        set({ theme })
    },
}))

export default useThemeStore
