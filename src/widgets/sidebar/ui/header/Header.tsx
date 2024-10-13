import { Logo, ThemeToggle } from './ui';

export const Header = () => {
  return (
    <div className="flex justify-between mb-4 gap-4">
      <Logo />
      <ThemeToggle />
    </div>
  );
};
