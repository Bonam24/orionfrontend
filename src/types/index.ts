export interface Guarantor {
  name: string;
  idNumber: string;
  contact: string;
}

export interface Asset {
  file: File;
  value?: number;
  requiresLicense?: boolean;
  license?: File;
}

export interface LoanFormData {
  sector: "formal" | "informal";
  amountRequested: number;
  repaymentDate: string;

  hasBankAccount: boolean;
  bankStatements?: File[];
  bankStatementPassword?: string;    // 🔑 shared password

  hasRetailBusiness: boolean;
  businessRegistrationNumber?: string;
  businessLocation?: string;

  guarantors: Guarantor[];
  assets: Asset[];

  homeFloorPhoto?: File;             // optional, single file
  proofOfIllness?: File;             // optional
  shopPicture?: File;

  mpesaStatements: File[];
  mpesaStatementPassword?: string;   // 🔑 shared password

  callLogs: File[];

  salaryPayslips?: File[];
  payslipPasswords?: string[];       // ✅ per-file passwords

  // 🔹 NEW fields to hold analysis results
  callLogsAnalysis?: any;
  mpesaAnalysis?: any;
  imagesAnalysis?: any;
}

export interface Loan {
  id: string;
  principal: number;
  interest: number;
  dueDate: string;
  status: 'active' | 'completed' | 'pending' | 'overdue';
  sector: 'formal' | 'informal';
  createdAt: string;
}


