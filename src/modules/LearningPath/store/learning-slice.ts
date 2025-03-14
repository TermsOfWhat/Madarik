import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Resource {
  id: string
  title: string
  type: "Documentation" | "Article"
  url: string
  completed: boolean
}

interface Section {
  id: string
  title: string
  content: string
  completed: boolean
}

interface LearningState {
  sections: Section[]
  resources: Resource[]
  progress: number
}

const initialState: LearningState = {
  sections: [
    {
      id: "local-vs-global",
      title: "Local vs Global State",
      content:
        "Understanding when to use component state versus global state management solutions. Local state is perfect for component-specific data, while global state is ideal for sharing data across multiple components.",
      completed: false,
    },
    {
      id: "redux-core",
      title: "Redux Core Concepts",
      content: "Learn the fundamental concepts of Redux including actions, reducers, and the store.",
      completed: false,
    },
  ],
  resources: [
    {
      id: "react-state-guide",
      title: "React State Management Guide",
      type: "Documentation",
      url: "https://react.dev/learn/managing-state",
      completed: false,
    },
    {
      id: "global-state-guide",
      title: "When to Use Global State",
      type: "Article",
      url: "https://react.dev/learn/sharing-state-between-components",
      completed: false,
    },
  ],
  progress: 0,
}

const calculateProgress = (sections: Section[], resources: Resource[]): number => {
  const totalItems = sections.length + resources.length
  const completedItems = sections.filter((s) => s.completed).length + resources.filter((r) => r.completed).length

  return Math.round((completedItems / totalItems) * 100)
}

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    toggleSectionComplete(state, action: PayloadAction<string>) {
      const section = state.sections.find((s) => s.id === action.payload)
      if (section) {
        section.completed = !section.completed
        // Recalculate progress based on both sections and resources
        state.progress = calculateProgress(state.sections, state.resources)
      }
    },
    toggleResourceComplete(state, action: PayloadAction<string>) {
      const resource = state.resources.find((r) => r.id === action.payload)
      if (resource) {
        resource.completed = !resource.completed
        // Recalculate progress based on both sections and resources
        state.progress = calculateProgress(state.sections, state.resources)
      }
    },
    resetProgress(state) {
      state.sections.forEach((section) => (section.completed = false))
      state.resources.forEach((resource) => (resource.completed = false))
      state.progress = 0
    },
  },
})

export const { toggleSectionComplete, toggleResourceComplete, resetProgress } = learningSlice.actions
export default learningSlice.reducer

