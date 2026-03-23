import Image from "next/image";
import Link from "next/link";
import CtaButton from "./CtaButton";

interface ProductCardProps {
  title: string;
  price: string;
  imageSrc: string;
  href?: string;
}

export default function ProductCard({
  title,
  price,
  imageSrc,
  href = "#",
}: ProductCardProps) {
  return (
    <div className="bg-white max-h-[420px] rounded-2xl w-64 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">

      {/* Изображение */}
      <Link href={href} className="block relative w-full h-64">
        {imageSrc ? (
          <Image
            src={imageSrc.startsWith('/') ? imageSrc : '/' + imageSrc}
            alt={title}
            fill
            unoptimized={true}
            className="object-cover object-center transition-transform duration-300 group-hover:scale-101"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </Link>

      {/* Контент */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-indigo-600 font-bold text-md">
          {price}
        </p>
        <Link href={href}>
          <CtaButton />
        </Link>
      </div>
    </div>
  );
}