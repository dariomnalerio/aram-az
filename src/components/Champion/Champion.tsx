import Image from "next/image";

type ChampionProps = {
  url: string;
  name: string;
  className?: string;
  onClick?: () => void;
};

export function Champion({ url, name, className, onClick }: ChampionProps) {
  return (
    <Image
      src={url}
      alt={name}
      width={64}
      height={64}
      className={`${className}`}
      onClick={onClick && onClick}
    />
  );
}
