import React from "react";

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, steps }) => {
  const classesFor = (isActive: boolean, isCompleted: boolean) => {
    if (isActive) return "bg-blue-600 text-white";
    if (isCompleted) return "bg-green-500 text-white";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <div>
      {/* 📱 Mobile: divided blocks */}
      <div className="sm:hidden flex w-full border border-gray-300 rounded-lg overflow-hidden">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const cls = classesFor(isActive, isCompleted);

          return (
            <div
              key={step}
              className={`flex-1 h-12 flex items-center justify-center ${cls} text-[10px] font-medium truncate 
                ${index < steps.length - 1 ? "border-r border-gray-300" : ""}`}
            >
              {step}
            </div>
          );
        })}
      </div>

      {/* 💻 Desktop: stepper with circles */}
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
