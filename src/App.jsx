import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WizardContainer from './components/wizard/WizardContainer';
import ToolkitViewer from './pages/ToolkitViewer';
import FacultyDashboard from './pages/FacultyDashboard';
import AssignmentBuilder from './pages/AssignmentBuilder';
import ComparisonTool from './pages/ComparisonTool';
import { WizardProvider } from './context/WizardContext';

import ProposalPage from './pages/ProposalPage';

function App() {
  return (
    <WizardProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/proposal" element={<ProposalPage />} />
            <Route path="/create" element={<WizardContainer />} />
            <Route path="/dashboard" element={<FacultyDashboard />} />
            <Route path="/assignments" element={<AssignmentBuilder />} />
            <Route path="/comparison" element={<ComparisonTool />} />
            <Route path="/toolkit/:toolkitId" element={<ToolkitViewer />} />
          </Routes>
        </div>
      </Router>
    </WizardProvider>
  );
}

export default App;
