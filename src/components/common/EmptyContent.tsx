export function EmptyContent({
  text = "Nothing to show here",
}: {
  text?: string;
}) {
  return (
    <p className="my-24 flex justify-center p-2 text-2xl font-semibold text-Neutral-Mild lg:my-48 lg:text-4xl">
      {text}
    </p>
  );
}
