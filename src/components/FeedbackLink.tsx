const feedbackHref =
  "mailto:carepawos@gmail.com?subject=CarePaw%20OS%20beta%20feedback&body=What%20felt%20helpful%3F%20What%20felt%20confusing%3F%20What%20did%20you%20need%20that%20wasn%27t%20here%3F";

export function FeedbackLink() {
  return (
    <a
      className="block text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
      href={feedbackHref}
    >
      Send beta feedback
    </a>
  );
}
