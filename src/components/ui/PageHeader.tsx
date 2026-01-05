import { Text } from './Text';

type PageHeaderProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="flex flex-col gap-2">
        <Text size="2xl" weight="bold" color="primary">
          {title}
        </Text>
        <Text size="base" color="muted">
          {description}
        </Text>
      </div>
      {action && <div className="mt-4 sm:mt-0">{action}</div>}
    </section>
  );
};
