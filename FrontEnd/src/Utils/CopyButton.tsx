import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi'; // react-icons (npm i react-icons)

interface CopyButtonProps {
  textToCopy: string;
}

export const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2 second baad wapas icon change ho jayega
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 active:scale-95 ${
        copied
          ? 'bg-green-500 text-white border-green-500'
          : 'bg-bg text-gray-700 border-gray-300 hover:border-black hover:text-black'
      }`}
    >
      {copied ? (
        <>
          <FiCheck className="w-3.5 h-3.5 animate-in fade-in" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <FiCopy className="w-3.5 h-3.5" />
          
        </>
      )}
    </button>
  );
};