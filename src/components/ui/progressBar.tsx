import React from "react";

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={step} className="flex-1 flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white"
                  : isCompleted
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-3 text-sm font-medium ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
