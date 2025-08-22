
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TestConnection from './TestConnection';
import Home from './pages/Home';
import InformalLoanForm from './pages/loan/request/informal';
import FormalLoanForm from './pages/loan/request/formal';
import PastLoans from './pages/PastLoans';
import PayLoan from './pages/PayLoan';
import LoanPending from './pages/LoanPending';
import UploadPDF from './pages/uploadPDF';
import AssessMedicalNeeds from './pages/AssessMedicalNeeds';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loan/request/informal" element={<InformalLoanForm />} />
        <Route path="/loan/request/formal" element={<FormalLoanForm />} />
        <Route path="/loan/pay" element={<PayLoan />} />
        <Route path="/loans" element={<PastLoans />} />
        <Route path="/loan/pending/:id" element={<LoanPending />} />
        <Route path="/assess-medical-needs" element={<AssessMedicalNeeds />} />
        <Route path="/test" element={<TestConnection />} />
        <Route path="/uploadPDF" element={<UploadPDF />} />
      </Routes>
    </Router>
  );
}

export default App;
