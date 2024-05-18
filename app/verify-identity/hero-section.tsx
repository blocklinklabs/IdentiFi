"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

import { useMediaQuery } from "react-responsive";

import { useState } from "react";
import {
  PiArrowRight,
  PiBookOpenTextLight,
  PiFileThin,
  PiSparkleLight,
  PiTargetLight,
} from "react-icons/pi";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconZoomCheck } from "@tabler/icons-react";

const tabs = [
  {
    icon: (
      <PiSparkleLight className="text-3xl mr-2 text-purple-600 bg-purple-100 p-1 rounded-md" />
    ),
    name: "AI",
    feature: "Now with Q&A",
    description: "Ask literally anything. identiBot Will answer.",
    more: (
      <div className="text-purple-600 flex items-center">
        Learn more <PiArrowRight className="ml-1 text-sm" />
      </div>
    ),
    image: "/assets/GroovyDoodle.svg",
  },
  {
    icon: (
      <PiBookOpenTextLight className="text-3xl mr-2 text-red-600 bg-red-100 p-1 rounded-md" />
    ),
    name: "Create ID",
    description: "Get your DID on the blockchain.",
    more: (
      <div className="text-red-600 flex items-center">
        Learn more <PiArrowRight className="ml-1 text-sm" />
      </div>
    ),
    image: "/assets/PlantDoodle.svg",
  },

  {
    icon: (
      <PiTargetLight className="text-3xl mr-2 text-blue-600 bg-blue-100 p-1 rounded-md" />
    ),
    name: "Privacy ",
    description: "Control who sees your information",
    more: (
      <div className="text-blue-600 flex items-center">
        Learn more <PiArrowRight className="ml-1 text-sm" />
      </div>
    ),

    image: "/assets/CoffeeDoddle.svg",
  },
  {
    icon: (
      <PiFileThin className="text-3xl mr-2 text-yellow-600 bg-yellow-100 p-1 rounded-md" />
    ),
    name: "Find Jobs",
    description: "Discover developer opportunities.",
    more: (
      <div className="text-yellow-600 flex items-center">
        Learn more <PiArrowRight className="ml-1 text-sm" />
      </div>
    ),

    image: "/assets/RunningDoodle.svg",
  },
];

const HeroSection = () => {
  const ref = useRef(null);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="md:items-center flex flex-col ">
      <div
        className="
        
          font-medium
          2xl:w-1/3
          md:w-2/3
          xl:w-1/2
          lg:px-0
          px-8
          text-4xl
            xl:text-6xl     
            flex
            flex-col
            items-center
            space-x-2
            justify-center
            xl:font-medium
            xl:pt-14
            text-center 
            pt-6
            "
      >
        <span>Verify any Identity</span>
      </div>

      <p
        className="
            text-2xl
            pt-4
            text-center
            w-2/3
            mx-auto
            "
      >
        <FormItem className="items-center justify-center  w-full">
          <FormControl>
            <Input
              className="border-2 border-black p-5"
              placeholder="Enter identiFiDID eg: mendsalbert"
              // onChange={(e) => handleChange("last_name", e.target.value)}
              // value={formData.last_name}
            />
          </FormControl>
        </FormItem>
      </p>

      <div className="flex gap-4 pt-6 items-center justify-center">
        <Link href="/">
          <Button className="py-1 ">
            <div className="flex items-center justify-center">
              <div className="text-lg">Verify</div>
              <div>
                <IconZoomCheck className="ml-2" height={20} width={20} />
              </div>
            </div>
          </Button>
        </Link>
      </div>

      <div className="pt-10 xl:pt-20 items-center justify-center">
        <Image
          src="/assets/ReadingSideDoodle.svg"
          alt="hero image"
          width={1000}
          height={1000}
          className="flex items-center justify-center mx-auto w-60 xl:w-80"
        />
      </div>
    </div>
  );
};

export default HeroSection;
