import React from 'react';
import { Trash2, Plus } from 'lucide-react';

interface AddressListProps {
  addresses: string[];
  onAddAddress: () => void;
  onRemoveAddress: (index: number) => void;
  onUpdateAddress: (index: number, value: string) => void;
}

export function AddressList({
  addresses,
  onAddAddress,
  onRemoveAddress,
  onUpdateAddress
}: AddressListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Wallet Addresses
        </label>
        <button
          type="button"
          onClick={onAddAddress}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Address
        </button>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto space-y-2 bg-gray-50 p-4 rounded-lg">
        {addresses.map((address, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={address}
              onChange={(e) => onUpdateAddress(index, e.target.value)}
              placeholder="Enter wallet address"
              className="block flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            {addresses.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveAddress(index)}
                className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}