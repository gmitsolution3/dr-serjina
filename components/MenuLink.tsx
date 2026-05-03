import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IMenuLink {
  to: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const MenuLink = ({
  to,
  className,
  children,
  onClick,
}: IMenuLink) => {
  const pathname = usePathname();

  const active = "text-primary";

  return (
    <Link
      href={`#${to}`}
      className={cn(className, `${pathname === to ? active : ""}`)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default MenuLink;
