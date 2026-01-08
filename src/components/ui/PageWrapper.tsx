import { Text } from "./Text";

type PageWrapperProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function PageWrapper({
  title,
  description,
  children,
}: PageWrapperProps) {
  return (
    <section className="w-full h-0 flex-grow flex flex-col p-4">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex flex-col">
          <Text size="2xl" weight="bold" color="primary">
            {title}
          </Text>
          <Text size="base" color="muted">
            {description}
          </Text>
        </div>
      </div>
      {children}
    </section>
  );
}
