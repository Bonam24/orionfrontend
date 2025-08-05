import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { LoanFormData, Asset } from "../../../types";
import { submitLoanForm } from "../../../api/submitform";
import DocumentUploader from "../../../components/ui/DocumentUploader";
import GuarantorFields from "../../../components/forms/GuarantorFields";
import ProgressSteps from "../../../components/ui/progressBar";

const FormalLoanRequest: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const steps = ["Requirements", "Documents", "Loan Details"];

  // state
  const [assets, setAssets] = useState<Asset[]>([]);
  const [homeFloorPhoto, setHomeFloorPhoto] = useState<File[]>([]);
  const [bankStatements, setBankStatements] = useState<File[]>([]);
  const [salaryPayslips, setSalaryPayslips] = useState<File[]>([]);
  const [proofOfIllness, setProofOfIllness] = useState<File[]>([]);
  const [shopPicture, setShopPicture] = useState<File[]>([]);
  const [mpesaStatements, setMpesaStatements] = useState<File[]>([]);
  const [callLogs, setCallLogs] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payslipPasswords, setPayslipPasswords] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoanFormData>({
    defaultValues: {
      sector: "formal",
      hasBankAccount: true,
      hasRetailBusiness: false,
      payslipPasswords: [], // NEW: per-payslip passwords
      guarantors: [
        { name: "", idNumber: "", contact: "" },
        { name: "", idNumber: "", contact: "" },
      ],
    },
  });

  const hasRetailBusiness = watch("hasRetailBusiness");

  const onSubmit = async (data: LoanFormData) => {
    if (assets.length < 3) {
      alert("Please upload at least 3 asset pictures");
      return;
    }
    if (homeFloorPhoto.length === 0) {
      alert("Please upload a photo of your home floor");
      return;
    }
    if (bankStatements.length === 0) {
      alert("Please upload 6 months of bank statements");
      return;
    }
    if (salaryPayslips.length === 0) {
      alert("Please upload 6 months of salary payslips");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData: LoanFormData = {
        ...data,
        assets,
        homeFloorPhoto: homeFloorPhoto[0],
        bankStatements,
        bankStatementPassword:
          bankStatements.length > 0 ? data.bankStatementPassword : undefined,
        salaryPayslips,
        payslipPasswords, // ✅ now array of strings
        proofOfIllness: proofOfIllness[0],
        shopPicture: hasRetailBusiness ? shopPicture[0] : undefined,
        mpesaStatements,
        mpesaStatementPassword:
          mpesaStatements.length > 0 ? data.mpesaStatementPassword : undefined,
        callLogs,
      };

      const response = await submitLoanForm(formData);
      navigate(`/loan/pending/${response.id || "mock-id"}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting loan application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Asset previews
  const renderAssetPreviews = (
    files: Asset[],
    setFiles: React.Dispatch<React.SetStateAction<Asset[]>>
  ) => (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {files.map((asset, idx) => (
        <div
          key={idx}
          className="relative h-28 w-full rounded-lg overflow-hidden border shadow-sm"
        >
          <img
            src={URL.createObjectURL(asset.file)}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => setFiles(files.filter((_, i) => i !== idx))}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1 hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );

  // Generic file previews
  const renderPreviews = (files: File[]) => (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {files.map((file, idx) => (
        <img
          key={idx}
          src={URL.createObjectURL(file)}
          alt="preview"
          className="h-24 w-full object-cover rounded-lg border shadow-sm"
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Formal Sector Loan Application
          </h1>

          {/* Progress Steps */}
          <ProgressSteps currentStep={step} steps={steps} />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-10">
            {/* ---------------- REQUIREMENTS PAGE ---------------- */}
            {step === 0 && (
              <div className="bg-gray-50 rounded-xl border p-6 shadow-sm space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Before You Begin
                </h2>
                <p className="text-gray-700">
                  To complete your loan application, please make sure you have
                  the following documents ready:
                </p>

                <ol className="list-decimal list-inside text-gray-700 space-y-2 mt-4">
                  <li>
                    At least <b>3 clear photos of your most valuable assets.</b>{" "}
                    This may include Car, Farm, Fridge, TV etc.
                  </li>
                  <li>
                    <b>Photo of your current residence</b>
                  </li>
                  <li>
                    <b>6 months bank statement document</b> (with password if
                    protected)
                  </li>
                  <li>
                    <b>Salary payslips for 3 months</b> (with password if
                    protected)
                  </li>
                  <li>
                    <b>M-Pesa statements</b> (with password if protected,
                    optional)
                  </li>
                  <li>
                    <b>Your call log report</b> (Download this app to get your
                    call log report under 2mins)
                  </li>
                  <li>
                    Details of <b>2 guarantors</b> (name, ID number, and
                    contact)
                  </li>
                  <li>
                    (Optional) <b>Proof of illness</b> and if you own a{" "}
                    <b>retail business</b>: registration number, location, and a
                    shop picture
                  </li>
                </ol>

                <p className="text-gray-600 mt-6">
                  Once you have these documents ready, click{" "}
                  <b>Start Application</b> to continue.
                </p>

                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Start Application
                  </button>
                </div>
              </div>
            )}

            {/* ---------------- DOCUMENT UPLOAD PAGE ---------------- */}
            {step === 1 && (
              <>
                {/* Assets */}
                <div className="bg-gray-50 rounded-xl border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Asset Photos (min 3)
                  </h3>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        const newAssets: Asset[] = Array.from(
                          e.target.files
                        ).map((file) => ({ file, name: file.name }));
                        setAssets([...assets, ...newAssets]);
                      }
                    }}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                               file:rounded-lg file:border-0 file:text-sm file:font-semibold
                               file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                  />
                  {assets.length > 0 && renderAssetPreviews(assets, setAssets)}
                </div>

                {/* Home Floor */}
                <div className="bg-gray-50 rounded-xl border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Home Verification
                  </h3>
                  <DocumentUploader
                    label="Photo of Your Home Floor"
                    files={homeFloorPhoto}
                    onFilesChange={setHomeFloorPhoto}
                    accept="image/*"
                    required
                  />
                  {homeFloorPhoto.length > 0 && renderPreviews(homeFloorPhoto)}
                </div>

                {/* Bank + Payslips */}
                <div className="bg-gray-50 rounded-xl border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Required Documents
                  </h3>

                  {/* Bank Statements */}
                  <DocumentUploader
                    label="Bank Statements (6 months)"
                    files={bankStatements}
                    onFilesChange={setBankStatements}
                    multiple
                    required
                  />
                  {bankStatements.length > 0 && (
                    <>
                      {renderPreviews(bankStatements)}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bank Statement Password
                        </label>
                        <input
                          type="password"
                          {...register("bankStatementPassword")}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                    </>
                  )}
                  {/* Salary Payslips */}
                  <div className="mt-6">
                    <DocumentUploader
                      label="Salary Payslips (6 months)"
                      files={salaryPayslips}
                      onFilesChange={(newFiles) => {
                        setSalaryPayslips(newFiles);
                        // ensure passwords array stays in sync
                        setPayslipPasswords((prev) =>
                          newFiles.map((_, idx) => prev[idx] || "")
                        );
                      }}
                      multiple
                      required
                    />
                    {salaryPayslips.length > 0 && (
                      <>
                        {renderPreviews(salaryPayslips)}
                        {salaryPayslips.map((file, idx) => (
                          <div key={idx} className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Payslip Password {idx + 1}
                            </label>
                            <input
                              type="password"
                              value={payslipPasswords[idx] || ""}
                              onChange={(e) => {
                                const updated = [...payslipPasswords];
                                updated[idx] = e.target.value;
                                setPayslipPasswords(updated);
                              }}
                              className="w-full px-3 py-2 border rounded-md"
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* M-Pesa */}
                <div className="bg-gray-50 rounded-xl border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    M-Pesa Statements
                  </h3>
                  <DocumentUploader
                    label="Upload Statements"
                    files={mpesaStatements}
                    onFilesChange={setMpesaStatements}
                    multiple
                  />
                  {mpesaStatements.length > 0 && (
                    <>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          M-Pesa Statement Password
                        </label>
                        <input
                          type="password"
                          {...register("mpesaStatementPassword")}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      {renderPreviews(mpesaStatements)}
                    </>
                  )}
                </div>

                {/* Call Logs */}
                <div className="bg-gray-50 rounded-xl border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Call Logs
                  </h3>
                  <DocumentUploader
                    label="Upload Call Logs"
                    files={callLogs}
                    onFilesChange={setCallLogs}
                    multiple
                  />
                  {callLogs.length > 0 && renderPreviews(callLogs)}
                </div>

                {/* Navigation for Step 1 */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="px-6 py-3 border rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* ---------------- LOAN DETAILS PAGE ---------------- */}
            {step === 2 && (
              <>
                <div className="bg-gray-50 rounded-xl border p-6 shadow-sm space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount Requested *
                      </label>
                      <input
                        type="number"
                        {...register("amountRequested", {
                          required: "Amount is required",
                          valueAsNumber: true,
                          min: {
                            value: 100,
                            message: "Minimum loan amount is 100",
                          },
                        })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.amountRequested && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.amountRequested.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Repayment Date *
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        {...register("repaymentDate", {
                          required: "Repayment date is required",
                          validate: (val) =>
                            new Date(val) >=
                              new Date(new Date().toDateString()) ||
                            "Repayment date must be today or in the future",
                        })}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      {errors.repaymentDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.repaymentDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <DocumentUploader
                    label="Proof of Illness (Optional)"
                    files={proofOfIllness}
                    onFilesChange={setProofOfIllness}
                  />
                  {proofOfIllness.length > 0 && renderPreviews(proofOfIllness)}

                  {/* Retail Business */}
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("hasRetailBusiness")}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      I own a retail business
                    </span>
                  </label>

                  {hasRetailBusiness && (
                    <div className="space-y-4 pl-6 border-l-2 border-blue-100">
                      <input
                        type="text"
                        placeholder="Business Registration Number"
                        {...register("businessRegistrationNumber")}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Business Location"
                        {...register("businessLocation")}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <DocumentUploader
                        label="Shop Picture"
                        files={shopPicture}
                        onFilesChange={setShopPicture}
                        accept="image/*"
                      />
                      {shopPicture.length > 0 && renderPreviews(shopPicture)}
                    </div>
                  )}

                  <GuarantorFields register={register} errors={errors} />
                </div>

                {/* Navigation for Step 2 */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      assets.length < 3 ||
                      bankStatements.length === 0 ||
                      salaryPayslips.length === 0
                    }
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormalLoanRequest;
