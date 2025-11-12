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

// Default demo users for testing
const DEFAULT_USERS: User[] = [
  {
    id: "demo-1",
    email: "demo@example.com",
    name: "Demo User",
    firstName: "Demo",
    lastName: "User",
    phoneNumber: "1234567890",
    countryCode: "+1",
    password: "Demo@123",
  },
  {
    id: "demo-2",
    email: "test@example.com",
    name: "Test User",
    firstName: "Test",
    lastName: "User",
    phoneNumber: "9876543210",
    countryCode: "+1",
    password: "Test@123",
  },
];

const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      users: DEFAULT_USERS,
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
      partialize: (state) => ({
        users: state.users,
      }),
    }
  )
);

export default useAppStore;
