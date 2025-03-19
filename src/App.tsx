import { Provider } from 'react-redux';
import { store } from './modules/shared/store';
import AuthProvider from './modules/auth/context/AuthProvider';
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard";
import LearningPath from "./modules/LearningPath/LearningPath";
import Roadmaps from "./modules/roadmaps/Roadmaps";
import MainLayout from "./modules/shared/layout/MainLayout/MainLayout";
import AuthGuard from "./modules/shared/guards/AuthGuard";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes>
          <Route element={
            <AuthGuard>
              <MainLayout>
                <Outlet />
              </MainLayout>
            </AuthGuard>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning-path/:pathId" element={<LearningPath />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Provider>
  );
}

export default App; 