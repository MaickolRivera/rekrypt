import GithubIcon from "../components/icons/GithubIcon.tsx";

function Aside() {
  return (
    <aside className="flex-col-reverse hidden h-full pr-8 lg:py-14 pl-7 lg:flex">
      <a
        target="_blank"
        href="https://github.com/m4icol/rekrypt"
        rel="noopener noreferrer"
        title="View Rekrypt on GitHub"
        aria-label="View Rekrypt on GitHub"
      >
        <GithubIcon className="text-subtext hover:text-base-white lg:w-8" />
      </a>
    </aside>
  );
}

export default Aside;