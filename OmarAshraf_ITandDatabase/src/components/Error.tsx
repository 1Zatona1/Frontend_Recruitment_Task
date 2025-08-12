import { AlertCircle } from "lucide-react";

export const Error = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-lg w-full text-center" role="alert">
        <div className="flex items-center justify-center mb-2">
          <AlertCircle className="w-6 h-6 mr-2" />
          <span className="font-bold text-lg">Oops! Something went wrong.</span>
        </div>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};