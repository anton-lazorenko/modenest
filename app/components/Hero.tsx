"use client";

import Image from "next/image";
import FancyButton from "./FancyButton";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative h-[100vh] w-full flex items-start justify-center pt-[240px] overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="Fashion clothing collection for men and women"
        fill
        priority
        className="object-cover object-top -z-10"
      />

      {/* Контейнер контента */}
      <div className="container mx-auto px-6 md:px-12 text-left flex flex-col gap-8 pt-24">
        <div className="max-w-xld w-max flex flex-col gap-2 p-14 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-600 mb-4">
            Step Into Your Style
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl">
            Discover the latest trends in fashion for men, women, and kids.
            Shop now and elevate your wardrobe!
          </p>
          <FancyButton onClick={() => router.push("/products")} className={"max-w-[300px] relative cursor-pointer overflow-hidden px-24 py-8 border border-indigo-600 rounded-full group"}>
            Shop Now
          </FancyButton>
        </div>
      </div>

    </section>
  );
}