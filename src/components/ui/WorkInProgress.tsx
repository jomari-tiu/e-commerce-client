import { Card, CardContent } from "./@raw-shadcn/card";
import { Text } from "./Text";

type WorkInProgressProps = {
  title?: string;
  description?: string;
  className?: string;
};

export const WorkInProgress = ({
  title = "Work in Progress",
  description = "This module is currently under development. Please check back soon!",
  className,
}: WorkInProgressProps) => {
  return (
    <div
      className={`space-y-6 h-full flex items-center justify-center ${className || ""}`}
    >
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full"></div>
              </div>
            </div>
          </div>
          <Text size="xl" weight="bold" color="primary" className="mb-2">
            {title} is Work in Progress
          </Text>
          <Text size="base" color="muted" className="max-w-md">
            {description}
          </Text>
        </CardContent>
      </Card>
    </div>
  );
};
