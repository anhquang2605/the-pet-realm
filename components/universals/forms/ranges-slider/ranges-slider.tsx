import React, { useState } from "react";
interface RangeSliderProps{
    min?: number;
    max?: number;
    step?: number;
    onChange?: (range: [number, number]) => void;
}

const RangeSlider:React.FC<RangeSliderProps> = ({ min = 0, max = 100, step = 1, onChange })  => {
  const [range, setRange] = useState([min, max]);

  const handleChange = (index: number, value: string) => {
    const newRange = [...range];
    newRange[index] = Number(value);

    // Prevent crossing over
    if (newRange[0] <= newRange[1]) {
        
      setRange(newRange);
      onChange?.(newRange as [number, number]);
    }
  };

  return (
    <div className="w-full px-4">
      <div className="relative h-2">
        {/* Inactive track */}
        <div className="absolute w-full h-2 bg-gray-300 rounded"></div>

        {/* Active range highlight */}
        <div
          className="absolute h-2 bg-blue-500 rounded"
          style={{
            left: `${((range[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((range[1] - min) / (max - min)) * 100}%`
          }}
        ></div>
    

      </div>

      {/* Value display */}
      <div className="flex justify-between mt-3 text-sm text-gray-700">
        <span>{range[0]}</span>
        <span>{range[1]}</span>
      </div>
    </div>
  );
}

export default RangeSlider;