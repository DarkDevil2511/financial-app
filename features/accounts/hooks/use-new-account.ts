import { create } from 'zustand'
type NewAccountsState = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useNewAccount = create<NewAccountsState>((set) => ({
    isOpen: false,
    onOpen: () =>  set({ isOpen: true }),
    onClose: () =>  set({ isOpen: false }),
}))