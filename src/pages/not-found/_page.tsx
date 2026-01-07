import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/Text";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6 max-w-md">
        <Text
          as="h1"
          size="6xl"
          weight="bold"
          color="primary"
          className="block"
        >
          404
        </Text>

        <div className="space-y-2">
          <Text
            as="h2"
            size="2xl"
            weight="semibold"
            color="default"
            className="block"
          >
            Page Not Found
          </Text>
          <Text as="p" size="base" color="muted" className="block">
            The page you're looking for doesn't exist or has been moved.
          </Text>
        </div>

        <div className="pt-4">
          <Link to="/sandbox">
            <Button variant="primary" size="lg">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
