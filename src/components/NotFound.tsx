import { PawPrint } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

interface NotFoundProps {
  message?: string;
  showHomeButton?: boolean;
}

const NotFound = ({
  message = "La página que buscas no existe.",
  showHomeButton = true,
}: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <PawPrint className="h-20 w-20 text-primary" />
            <PawPrint className="h-10 w-10 text-primary/60 absolute -top-2 -right-4 rotate-12 opacity-60" />
            <PawPrint className="h-8 w-8 text-accent/60 absolute -bottom-1 -left-3 -rotate-12 opacity-60" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-foreground mb-2">
          404
        </h1>

        <h2 className="text-xl font-medium text-primary mb-3">
          Página No Encontrada
        </h2>

        <p className="text-muted-foreground mb-8">
          {message}
        </p>

        {showHomeButton && (
          <Button
            onClick={() => navigate("/cats")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Volver al Inicio
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotFound;
