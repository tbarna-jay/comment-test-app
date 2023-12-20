import { useRouter } from "next/router";
import { FC } from "react";

type Page = number;

type HeaderProps = {
  page: Page;
  totalComments: number;
  commentsPerPage: number;
};

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  icon: string;
  children?: React.ReactNode;
};

const Button: FC<ButtonProps> = ({ onClick, disabled, children, icon }) => (
  <button
    className="border-2 border-gray-300 rounded-md p-1 flex items-center justify-center"
    type="button"
    disabled={disabled}
    onClick={onClick}
  >
    {icon}
    <span className="sr-only">{children}</span>
  </button>
);

const Header: FC<HeaderProps> = ({ page, totalComments, commentsPerPage }) => {
  const router = useRouter();
  const nextPage = () => router.push(`/${page - 1}`);
  const prevPage = () => router.push(`/${page + 1}`);
  const isLastPage = page === totalComments / commentsPerPage;

  return (
    <header className="fixed top-0 left-0 w-full bg-white flex items-center justify-between px-4 py-2 shadow-md">
      <Button onClick={nextPage} icon="⇦" disabled={page === 1}>
        Previous
      </Button>
      <h1 className="text-2xl font-bold text-center">
        Comments list page {page}
      </h1>
      <Button onClick={prevPage} icon="⇨" disabled={isLastPage}>
        Next
      </Button>
    </header>
  );
};

export default Header;
