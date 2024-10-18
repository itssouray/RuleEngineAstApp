import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './/components/theme-provider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RuleDialog from './components/RuleDialog';
import UserInputDialog from './components/UserInputDialog';
import { useState,useEffect } from 'react';
import CombineRulesDialog from './components/CombineRulesDialog'; 
import axios from 'axios';

function App() {
  const [isRuleDialogOpen, setRuleDialogOpen] = useState(false);
  const [isUserInputDialogOpen, setUserInputDialogOpen] = useState(false);

  const [isCombineDialogOpen, setCombineDialogOpen] = useState(false);
  const [rules, setRules] = useState([]); 

  const fetchRules = async () => {
    try {
      const response = await axios.get('http://localhost:7000/rules/get-all-rules');
      setRules(response.data.rules);
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Navbar 
            onOpenRuleDialog={() => setRuleDialogOpen(true)} 
            onOpenUserInputDialog={() => setUserInputDialogOpen(true)} 
            onOpenCombineDialog={() => setCombineDialogOpen(true)} 
          />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>

         
          <RuleDialog open={isRuleDialogOpen} onClose={() => setRuleDialogOpen(false)} />
          <UserInputDialog 
            open={isUserInputDialogOpen} 
            onClose={() => setUserInputDialogOpen(false)} 
            onEvaluate={(result) => alert(`Evaluation result: ${result}`)} 
          />
          <CombineRulesDialog
            open={isCombineDialogOpen}
            onClose={() => setCombineDialogOpen(false)}
            rules={rules}
            onCombine={(combinedRule) => {
              setRules((prev) => [...prev, combinedRule]);
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
