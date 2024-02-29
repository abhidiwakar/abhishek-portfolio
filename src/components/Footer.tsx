import dayjs from "dayjs";

export default function Footer() {
  return (
    <footer className="text-center my-6">
      <p className="font-semibold">
        Abhishek&apos;s Portfolio, {dayjs().year()}
      </p>
      <small className="text-slate-500">
        Software Engineer | React.js, Next.js, Node.js, AWS
      </small>
    </footer>
  );
}
