import { PortableText } from "next-sanity";

type QuestionOfTheWeekProps = {
  question?: {
    title: string;
    description?: string;
    answer?: any;
    publishedAt?: string;
  };
};

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    h3: ({ children }: any) => <h3 className="mt-4 mb-2">{children}</h3>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-(--color-accent-wilderness)">
        {children}
      </strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 my-4 text-(--color-neutral-dark)">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-2">{children}</li>,
  },
};

export default function QuestionOfTheWeek({
  question,
}: QuestionOfTheWeekProps) {
  if (!question) {
    return null;
  }

  return (
    <section className="bg-(--color-background-primary) border-2 border-(--color-accent-olive) rounded-2xl p-8 md:p-12">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-4xl">🌿</span>
        <div>
          <p className="text-xs uppercase tracking-widest text-(--color-accent-olive) font-semibold mb-2">
            Question of the Week
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-(--color-accent-wilderness) leading-tight">
            {question.title}
          </h3>
        </div>
      </div>

      {question.description && (
        <p className="text-base text-(--color-neutral-grey) italic mb-6">
          {question.description}
        </p>
      )}

      {question.answer && (
        <div className="mt-6 pt-6 border-t border-(--color-neutral-light)">
          <div className="prose prose-sm max-w-none">
            <PortableText
              value={question.answer}
              components={portableTextComponents}
            />
          </div>
        </div>
      )}

      {question.publishedAt && (
        <p className="text-xs text-(--color-neutral-grey) mt-6">
          Published{" "}
          {new Date(question.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
    </section>
  );
}
