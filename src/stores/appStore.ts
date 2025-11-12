import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import zustandStorage from "../utils/zustandStorage";
import { User } from "../utils/auth";

interface State {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  getUser: (id: string) => User | null;
  getUsers: () => User[];
  updateUser: (user: User) => void;
  clearUsers: () => void;
}

const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      users: [],
      addUser: (user: User) =>
        set((state) => ({ users: [...state.users, user] })),
      removeUser: (id: string) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
      getUser: (id: string) => {
        const state = get();
        return state.users.find((user) => user.id === id) || null;
      },
      getUsers: () => {
        const state = get();
        return state.users;
      },
      updateUser: (user: User) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === user.id ? user : u)),
        })),
      clearUsers: () => set({ users: [] }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({}),
    }
  )
);

export default useAppStore;
