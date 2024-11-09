import React from 'react';

interface TimeInputsProps {
  revealBlock: number;
  claimDuration: number;
  onRevealBlockChange: (value: number) => void;
  onClaimDurationChange: (value: number) => void;
}

export function TimeInputs({
  revealBlock,
  claimDuration,
  onRevealBlockChange,
  onClaimDurationChange
}: TimeInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="revealBlock" className="block text-sm font-medium text-gray-700">
          Reveal Block Number
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="revealBlock"
            value={revealBlock || ''}
            onChange={(e) => onRevealBlockChange(parseInt(e.target.value) || 0)}
            className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter number of blocks"
            min="0"
            required
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">Number of blocks before tokens can be claimed</p>
      </div>

      <div>
        <label htmlFor="claimDuration" className="block text-sm font-medium text-gray-700">
          Claim Duration (hours)
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="claimDuration"
            value={claimDuration ? claimDuration / 3600 : ''}
            onChange={(e) => onClaimDurationChange((parseInt(e.target.value) || 0) * 3600)}
            className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter duration in hours"
            min="0"
            required
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">Time window for claiming tokens</p>
      </div>
    </div>
  );
}