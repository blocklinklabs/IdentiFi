"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { Computer, ScreenShare, Share, Smile } from "lucide-react";

import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconBriefcase,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";

import { Textarea } from "@/components/ui/textarea";
import { PiCheckLight } from "react-icons/pi";

const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  job_title: z.string(),
  company_name: z.string(),
  help: z.enum([
    "Evaluate Bird for my company",
    "Learn More",
    "Get a Quote",
    "How to use Bird",
    "Other",
  ]),
  company_size: z.enum([
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ]),
  info: z.string(),
});

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  company_name: string;
  help:
    | "Evaluate Bird for my company"
    | "Learn More"
    | "Get a Quote"
    | "How to use Bird"
    | "Other";
  company_size: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
  info: string;
  terms: boolean;
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      job_title: "",
      company_name: "",
      help: "Learn More",
      company_size: "1-10",
      info: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      className="md:flex  justify-center pt-20 pb-20 px-8"
    >
      <div className="">
        <div className="text-5xl font-medium w-2/3">
          Creating a DID is a breeze with{" "}
          <span className="text-sky-500">identiFi</span>
        </div>
        <div
          className="
              
              py-4
              text-gray-500
                    "
        >
          Let&apos;s talk about how Bird can help your team work better.
        </div>

        {/*  */}

        <div className="relative  border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
          <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center pt-4 mx-3">
              <div className="text-center flex flex-col items-center justify-center">
                <img
                  className="w-20 h-20 object-cover p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src="/images/avatar.jpeg"
                  alt="Bordered avatar"
                />
                <p className="font-medium text-gray-700 py-2">@identiFiDID</p>
                <p className="text-sm text-gray-700 py-1">
                  cursus quam neque in cursus viverra orci, dapibus nec
                  tristique...
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 py-2 w-full">
                <div className="flex flex-row items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <IconBriefcase width={17} height={17} />
                  <p className="text-sm">Company </p>
                </div>
                <div className="flex flex-row items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <IconMapPin width={17} height={17} />
                  <p className="text-sm"> USA </p>
                </div>
              </div>
              <div className=" flex flex-col w-full ">
                <div className="flex flex-row items-center bg-gray-100  space-x-2  px-3 py-2 rounded-lg">
                  <IconMail width={17} height={17} />
                  <p className="text-sm">identiFi@gmail.com</p>
                </div>
                <div className="flex flex-row items-center bg-gray-100 mt-2 space-x-2 px-3 py-2 rounded-lg">
                  <IconPhone width={17} height={17} />
                  <p className="text-sm"> +00 123 456 789</p>
                </div>
              </div>
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                  Skills
                </span>
              </div>{" "}
              <div className="grid grid-cols-2 w-full ">
                <div className="flex flex-row items-center bg-gray-100 w-max  space-x-2  px-3 py-2 rounded-lg">
                  <p className="text-xs">UI/UX</p>
                </div>
                <div className="flex flex-row items-center bg-gray-100 w-max mt-2 space-x-2 px-3 py-2 rounded-lg">
                  <p className="text-xs"> Soft Engineer</p>
                </div>
                <div className="flex flex-row items-center bg-gray-100 w-max mt-2 space-x-2 px-3 py-2 rounded-lg">
                  <p className="text-xs"> Soft Engineer</p>
                </div>
                <div className="flex flex-row items-center bg-gray-100 w-max mt-2 space-x-2 px-3 py-2 rounded-lg">
                  <p className="text-xs"> Soft Engineer</p>
                </div>
              </div>
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                  Socials
                </span>
              </div>{" "}
              <div className="grid grid-cols-4 pt-2 w-full ">
                <div className="flex flex-row w-11 h-11 cursor-pointer items-center bg-black   p-3  rounded-full">
                  <IconBrandX width={24} height={24} color="white" />
                </div>
                <div className="flex flex-row w-11 h-11 cursor-pointer items-center bg-black   p-3  rounded-full">
                  <IconBrandInstagram width={24} height={24} color="white" />
                </div>
                <div className="flex flex-row w-11 h-11 cursor-pointer items-center bg-black   p-3  rounded-full">
                  <IconBrandYoutube width={24} height={24} color="white" />
                </div>
                <div className="flex flex-row w-11 h-11 cursor-pointer items-center bg-black   p-3  rounded-full">
                  <IconBrandTiktok width={24} height={24} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
      </div>

      <Form {...form}>
        {!submitted ? (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
            space-y-4 w-5/6
                        "
          >
            <div className="md:flex items-center gap-6 ">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="items-center justify-center  w-full">
                    <FormLabel className="text-sm ">First name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="items-center justify-center  w-full">
                    <FormLabel className="w-60 text-sm ">Last name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="items-center justify-center  w-full">
                  <FormLabel className=" text-sm   ">Work email *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem className="items-center justify-center  w-full">
                  <FormLabel className="w-60 text-sm">Company name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_size"
              render={({ field }) => (
                <FormItem className="items-center justify-center w-full">
                  <FormLabel className="w-60 text-sm ">Company size*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <div className="flex gap-4">
                        <SelectItem value="1-10">1-10</SelectItem>
                      </div>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="501-1000">501-1000</SelectItem>
                      <SelectItem value="1000+">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="help"
              render={({ field }) => (
                <FormItem className="items-center justify-center  w-full">
                  <FormLabel className="w-60 text-sm   ">
                    How can we help ?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <div className="flex gap-4">
                        <SelectItem value="Evaluate Bird for my company">
                          Evaluate Bird for my company
                        </SelectItem>
                      </div>
                      <SelectItem value="Learn More">Learn More</SelectItem>
                      <SelectItem value="Get a Quote">Get a Quote</SelectItem>
                      <SelectItem value="How to use Bird">
                        How to use Bird
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem className="items-center justify-center w-full">
                  <FormLabel className="w-60 text-sm   ">
                    Anything else ?
                  </FormLabel>
                  <FormControl>
                    <Textarea style={{ height: "100px" }} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center">
              <div>
                <Checkbox className="text-[#6c6684]" />
              </div>
              <div className="text-xs font-light  md:w-3/4 mb-1">
                I agree to Bird&apos; sending marketing communications related
                to bird
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                type="submit"
                className="
                            text-sm
                            font-light
                        
                            "
                disabled={loading}
                onClick={() => form.handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div
              className="
        text-xl 
        md:text-2xl 
        flex 
        items-center
        justify-center
        flex-col
        

 
        px-8

        "
            >
              <div className="w-80">
                <Image
                  src="/assets/MeditatingDoodle.svg"
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="mx-auto"
                />

                <div className="text-gray-500 font-light  text-center justify-center mx-auto py-10">
                  We&apos;ve received your inquiry and will be contacting you
                  via email shortly.
                </div>
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

// git remote add origin git@github.com-blocklinklabs:blocklinklabs/IdentiFi.git

// ssh-add ~/.ssh/blocklinklabs

// ssh -T git@github.com-blocklinklabs
