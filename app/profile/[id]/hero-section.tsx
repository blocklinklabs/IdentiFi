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
import {
  IconBriefcase2,
  IconCake,
  IconClock,
  IconSchool,
  IconUser,
  IconZoomCheck,
} from "@tabler/icons-react";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconBriefcase,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
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
      <div className="flex flex-row items-start w-6/12">
        <div className="rounded-[2rem] overflow-hidden w-full  bg-white dark:bg-gray-800">
          <div className="flex flex-col items-center justify-center pt-4 mx-3">
            <div className="text-center flex flex-col items-center justify-center">
              <img
                className="w-28 h-28 shadow-md object-cover object-center p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                src={"/images/avatar.jpeg"}
                alt="Bordered avatar"
              />
              <p className="font-medium text-gray-700 py-2">@identiFiDID</p>
              <p className="text-sm text-gray-700 py-1">
                {"We making digital Identity easier..."}
              </p>
            </div>
            <div className="flex flex-col w-full mt-2 ">
              <div className=" pb-1 space-y-2">
                <p className="text-md font-medium">Socials</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2 pt-1 w-full">
              <div className="flex flex-row items-center justify-center bg-black px-3 py-2 rounded-lg cursor-pointer">
                <IconBrandX width={24} height={24} color="white" />
              </div>

              <div className="flex flex-row items-center justify-center bg-[#5b51d8] px-3 py-2 rounded-lg cursor-pointer">
                <IconBrandInstagram width={24} height={24} color="white" />
              </div>

              <div className="flex flex-row items-center justify-center bg-[#ff0000] px-3 py-2 rounded-lg cursor-pointer">
                <IconBrandYoutube width={24} height={24} color="white" />
              </div>

              <div className="flex flex-row items-center justify-center bg-[#69c9d0] px-3 py-2 rounded-lg cursor-pointer">
                <IconBrandTiktok width={24} height={24} color="white" />
              </div>

              <div className="flex flex-row items-center justify-center bg-[#2867b2] px-3 py-2 rounded-lg cursor-pointer">
                <IconBrandLinkedin width={24} height={24} color="white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 py-2 w-full">
              <div className="flex flex-row items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <IconBriefcase width={17} height={17} />
                <p className="text-sm">{"Company"} </p>
              </div>
              <div className="flex flex-row items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <IconMapPin width={17} height={17} />
                <p className="text-sm">GH </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 py-2 w-full">
              <div className="flex flex-row items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <IconMail width={17} height={17} />
                <p className="text-sm">{"identiFi@gmail.com"}</p>
              </div>
              <div className="flex flex-row items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <IconPhone width={17} height={17} />
                <p className="text-sm">{"+00 123 456 789"}</p>
              </div>
            </div>
            <div className="flex flex-col w-full mt-2 ">
              <div className=" bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex flex-row items-center space-x-2   rounded-lg">
                  <IconUser width={18} height={18} />
                  <p className="text-sm">General Information</p>
                </div>
                <p className="text-sm font-semibold text-gray-700">About me</p>
                <p className="text-sm ">
                  {" "}
                  Tincidunt quam neque in cursus viverra orci, dapibus nec
                  tristique. Nullam ut sit dolor consectetur urna, dui cras nec
                  sed. Cursus risus congue arcu aenean posuere aliquam. Et
                  vivamus lorem pulvinar nascetur non. Pulvinar a sed platea
                  rhoncus ac mauris amet. Urna, sem pretium sit pretium urna,
                  senectus vitae. Scelerisque fermentum, cursus felis dui
                  suspendisse velit pharetra. Augue et duis cursus maecenas eget
                  quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent
                  dictum risus suspendisse.
                </p>
                <div className="grid grid-cols-2 pt-3 gap-2">
                  <div className="py-2">
                    <div className="flex flex-row items-center space-x-1   rounded-lg">
                      <IconSchool width={17} height={17} />
                      <p className="text-sm">Education</p>
                    </div>
                    <p className="text-xs font-semibold ">
                      Thomas Jeff High School, Stanford University
                    </p>
                  </div>
                  <div className="py-2">
                    <div className="flex flex-row items-center space-x-1   rounded-lg">
                      <IconBriefcase2 width={17} height={17} />
                      <p className="text-sm">Work History</p>
                    </div>
                    <p className="text-xs font-semibold ">
                      Twitch, Google, Apple
                    </p>
                  </div>
                  <div className="py-2">
                    <div className="flex flex-row items-center space-x-1   rounded-lg">
                      <IconClock width={17} height={17} />
                      <p className="text-sm">Join Date</p>
                    </div>
                    <p className="text-xs font-semibold ">12-09-2021</p>
                  </div>

                  <div className="py-2">
                    <div className="flex flex-row items-center space-x-1   rounded-lg">
                      <IconCake width={17} height={17} />
                      <p className="text-sm">Birthday</p>
                    </div>
                    <p className="text-xs font-semibold ">15-08-1990</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full mt-2 ">
              <div className=" pb-2 space-y-2">
                <p className="text-md font-medium">Skills</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full ">
              <div className="flex flex-row items-center bg-gray-100 w-max  space-x-2  px-3 py-2 rounded-lg">
                <p className="text-xs">UI/UX</p>
              </div>
              <div className="flex flex-row items-center bg-gray-100 w-max  space-x-2  px-3 py-2 rounded-lg">
                <p className="text-xs">Software Engineer</p>
              </div>
              <div className="flex flex-row items-center bg-gray-100 w-max  space-x-2  px-3 py-2 rounded-lg">
                <p className="text-xs">Machine Learning</p>
              </div>
              {/* {formData.skills.map((skill: any) => (
                   
                  ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
