import { Card, CardContent } from './@raw-shadcn/card';

export default function EmptyPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
