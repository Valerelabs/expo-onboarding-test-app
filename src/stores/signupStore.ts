import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import zustandStorage from "../utils/zustandStorage";
import callingCodes from "../utils/callingCodes.json";

interface Country {
  name: string;
  flag: string;
  code: string;
  callingCode: string;
}

interface SignupStore {
  email: string;
  setEmail: (email: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  selectedCountry: Country;
  setSelectedCountry: (selectedCountry: Country) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  clearForm: () => void;
}

const useSignupStore = create<SignupStore>()(
  persist(
    (set) => ({
      firstName: "",
      setFirstName: (firstName) => set({ firstName }),
      lastName: "",
      setLastName: (lastName) => set({ lastName }),
      phoneNumber: "",
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      selectedCountry:
        callingCodes.find((c) => c.code === "US") ||
        (callingCodes[0] as Country),
      setSelectedCountry: (selectedCountry) => set({ selectedCountry }),
      email: "",
      setEmail: (email) => set({ email }),
      password: "",
      setPassword: (password) => set({ password }),
      confirmPassword: "",
      setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
      clearForm: () =>
        set({
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          selectedCountry:
            callingCodes.find((c) => c.code === "US") ||
            (callingCodes[0] as Country),
        }),
    }),
    {
      name: "signup-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useSignupStore;
