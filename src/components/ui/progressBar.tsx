import React from "react";

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, steps }) => {
  return (
    <div>
      {/* Mobile: vertical */}
      <div className="flex flex-col space-y-6 sm:hidden">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step} className="flex items-start relative">
              {/* Circle */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold shrink-0
                  ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
              >
                {index + 1}
              </div>

              {/* Step Label */}
              <span
                className={`ml-3 text-sm font-medium ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {step}
              </span>

              {/* Vertical connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-4 w-0.5 h-6 bg-gray-300"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step} className="flex-1 flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold shrink-0
                  ${
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
    </div>
  );
};

export default ProgressSteps;
