import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Pill, FileText, ArrowLeft } from 'lucide-react';

const AssessMedicalNeeds: React.FC = () => {
  const navigate = useNavigate();
  const [medicamentFiles, setMedicamentFiles] = useState<FileList | null>(null);
  const [medicamentPreviews, setMedicamentPreviews] = useState<string[]>([]);
  const [prescriptionFiles, setPrescriptionFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Medicament files:', medicamentFiles);
    console.log('Prescription files:', prescriptionFiles);
    
    // Navigate to medicine results page
    navigate('/medicine-results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assess Medical Needs</h1>
          <p className="text-gray-600 mb-8">Upload your medicaments and prescription documents</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Medicaments Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                <Pill className="w-5 h-5 inline mr-2" />
                Medicaments Pictures
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    setMedicamentFiles(files);
                    
                    if (files) {
                      const previews = Array.from(files).map(file => URL.createObjectURL(file));
                      setMedicamentPreviews(previews);
                    } else {
                      setMedicamentPreviews([]);
                    }
                  }}
                  className="hidden"
                  id="medicaments"
                />
                <label htmlFor="medicaments" className="cursor-pointer">
                  <span className="text-blue-600 font-medium">Click to upload</span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
                </label>
                {medicamentFiles && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600 mb-3">
                      {medicamentFiles.length} file(s) selected
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {medicamentPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Medicine ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Prescription Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                <FileText className="w-5 h-5 inline mr-2" />
                Doctor's Prescription
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => setPrescriptionFiles(e.target.files)}
                  className="hidden"
                  id="prescription"
                />
                <label htmlFor="prescription" className="cursor-pointer">
                  <span className="text-blue-600 font-medium">Click to upload</span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <p className="text-sm text-gray-500 mt-2">PDF, DOC, PNG, JPG up to 10MB each</p>
                </label>
                {prescriptionFiles && (
                  <p className="text-sm text-green-600 mt-2">
                    {prescriptionFiles.length} file(s) selected
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              Submit Assessment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssessMedicalNeeds;