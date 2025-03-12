import { createSlice } from '@reduxjs/toolkit'

const getSidebarState = () => {
  return localStorage.getItem('sidebar') === 'open'
}

interface LayoutState {
  isSidebarOpen: boolean
}

const initialState: LayoutState = {
  isSidebarOpen: getSidebarState(),
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
      localStorage.setItem('sidebar', state.isSidebarOpen ? 'open' : 'closed')
    },
  },
})

export default layoutSlice.reducer

export const { toggleSidebar } = layoutSlice.actions
