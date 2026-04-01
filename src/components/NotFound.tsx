import { PawPrint } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

interface NotFoundProps {
  message?: string;
  showHomeButton?: boolean;
}

const NotFound = ({
  message = "The page you're looking for doesn't exist.",
  showHomeButton = true,
}: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <PawPrint className="h-20 w-20 text-amber-300 dark:text-amber-500" />
            <PawPrint className="h-10 w-10 text-amber-400 dark:text-amber-400 absolute -top-2 -right-4 rotate-12 opacity-60" />
            <PawPrint className="h-8 w-8 text-amber-200 dark:text-amber-600 absolute -bottom-1 -left-3 -rotate-12 opacity-60" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          404
        </h1>

        <h2 className="text-xl font-medium text-amber-600 dark:text-amber-400 mb-3">
          Page Not Found
        </h2>

        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {message}
        </p>

        {showHomeButton && (
          <Button
            onClick={() => navigate("/cats")}
            className="bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            Back to Home
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotFound;
