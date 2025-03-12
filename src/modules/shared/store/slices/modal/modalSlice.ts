import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Modal {
  id: string
  open: boolean
  data?: any
}

interface ModalsState {
  modals: Modal[]
}

const initialState: ModalsState = {
  modals: [
    // Your initial modals here
    {
      id: 'modal-example',
      open: false,
    },
    {
      id: 'add-new-book',
      open: false,
    },
    {
      id: 'edit-book',
      open: false,
    },
    {
      id: 'export-plan-comptable',
      open: false,
    },
    {
      id: 'import-plan-comptable',
      open: false,
    },
    {
      id: 'alert',
      open: false,
    },
    {
      id: 'create-new-journal',
      open: false,
    },
    {
      id: 'update-new-journal',
      open: false,
    },
    {
      id: 'create-new-type-journal',
      open: false,
    },
    {
      id: 'update-new-type-journal',
      open: false,
    },
    {
      id: 'confirm-account-modal',
      open: false,
    },
    {
      id: 'create-entreprise-modal',
      open: false,
    },
    {
      id: 'delete-alert',
      open: false,
    },
    {
      id: 'edit-entry',
      open: false,
    },
    {
      id: 'grand-livre-filter-modal',
      open: false,
    },
    {
      id: 'account-managment-modal-filter',
      open: false,
    },
    {
      id: 'balance-filter-modal',
      open: false,
    },
    {
      id: 'delete-alert-ecriture',
      open: false,
    },
    {
      id: 'role-permissions-modal',
      open: false,
    },
    {
      id: 'modal-bilan',
      open: false,
    },
    {
      id: 'modal-bilan-description',
      open: false,
    },
    {
      id: 'declaration-employeur-modal',
      open: false,
    },
    {
      id: 'import-balance-modal',
      open: false,
    },
  ],
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ id: string; data?: any }>) => {
      const { id, data } = action.payload
      const index = state.modals.findIndex((modal) => modal.id === id)

      if (index !== -1) {
        state.modals[index].open = true
        state.modals[index].data = data
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.modals.findIndex((modal) => modal.id === id)

      if (index !== -1) {
        state.modals[index].open = false
      }
    },
    closeAllModals: (state) => {
      state.modals.forEach((modal) => {
        modal.open = false
      })
    },
  },
})

export const { openModal, closeModal, closeAllModals } = modalsSlice.actions

export default modalsSlice.reducer
