import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { WizardProvider } from './context/WizardContext';
import LoadingSpinner from './components/common/LoadingSpinner';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load route components
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ProposalPage = React.lazy(() => import('./pages/ProposalPage'));
const CourseCatalog = React.lazy(() => import('./pages/CourseCatalog'));
const WizardContainer = React.lazy(() => import('./components/wizard/WizardContainer'));
const FacultyDashboard = React.lazy(() => import('./pages/FacultyDashboard'));
const AssignmentBuilder = React.lazy(() => import('./pages/AssignmentBuilder'));
const ComparisonTool = React.lazy(() => import('./pages/ComparisonTool'));
const ToolkitViewer = React.lazy(() => import('./pages/ToolkitViewer'));

function App() {
  return (
    <WizardProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/proposal" element={<ProposalPage />} />
              <Route path="/courses" element={<CourseCatalog />} />
              <Route path="/create" element={<WizardContainer />} />
              <Route path="/dashboard" element={<FacultyDashboard />} />
              <Route path="/assignments" element={<AssignmentBuilder />} />
              <Route path="/comparison" element={<ComparisonTool />} />
              <Route path="/toolkit/:toolkitId" element={<ToolkitViewer />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </WizardProvider>
  );
}

export default App;
