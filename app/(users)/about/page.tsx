import React from "react";
import Image from "next/image";
import { lavishly, domine } from "@/app/fonts";
import Marquee from "react-fast-marquee";

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-screen w-full">
        <Image
          src="/assets/about.png"
          alt="about"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-white flex flex-col items-center justify-center h-full text-center px-6">
          <h1
            className={`text-5xl md:text-7xl tracking-wider font-semibold ${lavishly.className}`}
          >
            About Us
          </h1>
          <p className="text-base md:text-lg m-5 tracking-widest">
            Your shoes show you care
          </p>

          <p className="max-w-2xl text-xs leading-relaxed tracking-wide">
            At The Shoe Care Shop, we care about and for shoes. With a small
            team of shoe enthusiasts, we dedicate ourselves to shoe care and
            shoe shining. We have been specialising in shoe maintenance for over
            12 years and only sell the best products from brands such as Saphir
            Médaille. Not only do we sell these products, but we also use them
            ourselves every day.
          </p>
        </div>
      </section>

      <div className="py-16">
        <Marquee
          className={`${domine.className} text-4xl tracking-wide font-bold text-gray-500 overflow-hidden`}
          pauseOnHover
          gradient
        >
          <span className="px-10">WE ARE SHOECARE</span>
          <span className="px-10 text-black">PREMIUM SHOE CARE</span>
          <span className="px-10">PROTECT • CLEAN • RESTORE</span>
        </Marquee>
      </div>

      <section className="py-6">
        <div className="grid grid-cols-2 items-center h-175">
          <div className="relative w-full h-full rounded-xs overflow-hidden">
            <Image
              src="/assets/about.png"
              alt="About"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex justify-center text-center flex-col">
            <h1 className="text-5xl tracking-tight">Personal service</h1>

            <p className="text-sm m-7 leading-relaxed text-gray-700 line-clamp-9">
              We may be an online shop but we believe that a personal approach
              makes shopping online much more pleasant and the chance of finding
              exactly what you need much higher. That is one of the reasons
              that, in addition to our webshops, we have also opened a physical
              showroom in Amsterdam. Are you in the neighbourhood and want to
              drop by to see a particular product? Send us a message via our
              contact form, and we will make sure that the product is ready for
              you in our showroom. If you want to simply say hi and have a cup
              of coffee, our doors are of course also open.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center h-175">
          <div className="flex justify-center text-center flex-col">
            <h1 className="text-5xl tracking-tight">
              Amsterdam Super Trunk Show
            </h1>

            <p className="text-sm m-7 leading-relaxed text-gray-700 line-clamp-9">
              By now, you’ve probably figured out we’re obsessed with shoes.
              That’s why we also host the Amsterdam Super Trunk Show, a shoe
              event that’s also held in London and Stockholm. It’s a great day
              all about fine footwear from across Europe and beyond, shoe care
              essentials, the Dutch Shoe Shining Championship, and stylish
              products for men.
            </p>
          </div>
          <div className="relative w-full h-full rounded-xs overflow-hidden">
            <Image
              src="/assets/about1.png"
              alt="About"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl">Sustainability</h1>
          <p className="text-gray-700 text-sm m-8 line-clamp-6 w-225">
            Here at The Shoe Care Shop, we try to operate our business while
            keeping our carbon footprint as low as possible. We do this by
            selecting and producing products that have a low impact on the
            environment and are made with natural ingredients and materials. We
            also ship our orders using mostly recycled cardboard boxes and
            prefer to use recycled paper above plastic to wrap individual
            products in. And of course, preserving shoes is also a form of
            sustainability. These are just some examples of how we try to cause
            as little damage to the environment as we can. You can read more
            about sustainability here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
