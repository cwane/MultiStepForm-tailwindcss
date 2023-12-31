import React, {useState, useEffect, useRef} from 'react';

const Stepper = ({steps, currentStep}) => {
    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps];
        let count =0;

        while (count < newSteps.length) {
            //current step
            if(count === stepNumber){
                newSteps[count] ={
                    ...newSteps[count],
                    hightlighted:true,
                    selected: true,
                    completed:false,
                };
                count++;
            }
            //step completed

            else if(count < stepNumber){
                newSteps[count] ={
                    ...newSteps[count],
                    hightlighted:false,
                    selected: true,
                    completed:true,  
            };
            count++;

            }
            // step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    hightlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }
        }

        return newSteps;

    };


    useEffect(()=> {

        const stepsState =steps.map((step, index) => 
        Object.assign(
            {},
            {
                description: step,
                completed: false,
                hightlighted: index === 0? true : false,
                selected: index === 0? true: false,
            }
        ))

        stepRef.current = stepsState;
        const current = updateStep(currentStep -1, stepRef.current);
        setNewStep(current);

    }, [steps, currentStep]);

    const displaySteps =newStep.map((step,index) =>{
    return(
        <div key={index}
         className={
            index != newStep.length -1 ? 'w-full flex items-center' :
        " flex items-center"
            }>
        <div className='relative flex flex-col items-center text-teal-600'>
        <div className={`rounded-full transition duration-500 ease-in-out border-2 border-blue-300 h-12 w-12 flex items-center justify-center py-3 ${step.completed ? "bg-blue-600 text-white font-bold border border-blue-600" : ""}`}>
  {/* Display blue dot initially */}
  {!step.completed && (
    <span className={`bg-blue-600 h-6 w-6 rounded-full ${step.completed ? 'hidden' : ''}`}></span>
  )}
  {/* Display checkmark when step is completed */}
  {step.completed && (
    <span className="text-white font-bold text-xl">&#10003;</span>
  )}
</div>

    
        <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase
        ${step.hightlighted ? "text-gray-900" : "text-gray-400" }`}>
            {/* Display description */} 
            {step.description}
        </div>
        </div>
    
        <div className={`flex-auto border-t-2 translate duration-500 ease-in-out ${
            step.completed ? "border-blue-600" : "border-gray-300"}`}>
        {/* Display line */}
        </div>
    </div>
    )
    }) ;

    return (
        <div className='mx-4 p-4 flex justify-between items-center'>
        {displaySteps}

        </div>
    );
}

export default Stepper;
