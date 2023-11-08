"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import Image from "next/image";
import { Switch } from "./ui/switch";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useState } from "react";

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  plan: z.enum(["9", "12", "15"], {
    required_error: "You need to select a notification type.",
  }),

  validity: z.boolean().default(false).optional(),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const items = [
  {
    id: "onlineService",
    label: "Online Service",
  },
  {
    id: "largerStorage",
    label: "Larger Storage",
  },
  {
    id: "customizableProfile",
    label: "Customizable Profile",
  },
] as const;

export default function StepperForm() {
  const [step, setStep] = useState(0);
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      items: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className={`${step === 0 ? " block" : " hidden"}`}>
          <h1 className=" mb-5 text-4xl font-bold text-blue-900">
            Personal Info
          </h1>
          <p className="mb-5">Double check Everything before confirming</p>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g Stephen King"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g stephenking@lorem.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g Stephen King"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className={`${step === 1 ? " block" : " hidden"}`}>
          <h1 className=" mb-5 text-4xl font-bold text-blue-900">
            Select Your Plan
          </h1>
          <p className="mb-5">Double check Everything before confirming</p>
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Notify me about...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex  gap-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="9" />
                      </FormControl>
                      <FormLabel
                        className={`${
                          field.value === "9"
                            ? "border-blue-800  bg-gray-100"
                            : ""
                        } flex min-w-[120px] flex-col gap-8 rounded-lg border p-5`}
                      >
                        <Image
                          src="/icon-arcade.svg"
                          alt="arcade"
                          height={30}
                          width={30}
                        />
                        <div>
                          <p className=" text-sm font-medium text-blue-800">
                            Arcade
                          </p>
                          <p className=" text-xs text-gray-500">$9/mon</p>
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="12" />
                      </FormControl>
                      <FormLabel
                        className={`${
                          field.value === "12"
                            ? "border-blue-800  bg-gray-100"
                            : ""
                        } flex min-w-[120px] flex-col gap-8 rounded-lg border p-5`}
                      >
                        <Image
                          src="/icon-arcade.svg"
                          alt="arcade"
                          height={30}
                          width={30}
                        />
                        <div>
                          <p className=" text-sm font-medium text-blue-800">
                            Advanced
                          </p>
                          <p className=" text-xs text-gray-500">$12/mon</p>
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="15" />
                      </FormControl>
                      <FormLabel
                        className={`${
                          field.value === "15"
                            ? "border-blue-800  bg-gray-100"
                            : ""
                        } flex min-w-[120px] flex-col gap-8 rounded-lg border p-5`}
                      >
                        <Image
                          src="/icon-arcade.svg"
                          alt="arcade"
                          height={30}
                          width={30}
                        />
                        <div>
                          <p className=" text-sm font-medium text-blue-800">
                            Pro
                          </p>
                          <p className=" text-xs text-gray-500">$15/mon</p>
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="validity"
              render={({ field }) => (
                <FormItem className="mt-5 flex flex-row items-center justify-between rounded-lg border bg-gray-100 p-4">
                  <span
                    className={`${
                      !field.value ? "font-medium text-blue-800" : "text-black"
                    }`}
                  >
                    Monthly
                  </span>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <span
                    className={`${
                      field.value ? "font-medium text-blue-800" : "text-black"
                    }`}
                  >
                    Yearly
                  </span>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className={`${step === 2 ? " block" : " hidden"}`}>
          <h1 className=" mb-5 text-4xl font-bold text-blue-900">
            Pick Add Ons
          </h1>
          <p className="mb-5">Double check Everything before confirming</p>
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className={`${
                            field.value?.includes(item.id)
                              ? "border-blue-800"
                              : ""
                          } flex flex-row items-start space-x-3 space-y-0 rounded-md border p-5`}
                        >
                          <FormControl>
                            <Checkbox
                              className={`${
                                field.value?.includes(item.id)
                                  ? "bg-blue-800"
                                  : ""
                              } h-4 w-4 border ring-offset-background`}
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className={`${step === 3 ? " block" : " hidden"}`}>
          <h1 className=" mb-5 text-4xl font-bold text-blue-900">
            Finishing Up
          </h1>
          <p>Double check Everything before confirming</p>
          <div className="mt-8 rounded-md bg-blue-100 p-5">
            {GetSubByPlan(form.getValues("plan"))}
            <div className="mt-5 border border-x-0 border-b-0 border-gray-500 pt-5">
              {GetSubByAddon(form.getValues("items"))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Button
            className={`${step === 0 ? "hidden" : "inline"}`}
            onClick={() => {
              setStep((prev) => {
                return prev - 1;
              });
            }}
            type="button"
          >
            Prev
          </Button>
          <Button
            className={`${step === 3 ? "hidden" : "inline"}`}
            onClick={() => {
              setStep((prev) => {
                return prev + 1;
              });
            }}
            type="button"
          >
            Next
          </Button>
          <Button
            className={`${step === 3 ? "inline" : "hidden"}`}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

const GetSubByPlan = (plan: string) => {
  switch (plan) {
    case "9":
      return (
        <div className="flex items-center justify-between">
          <h1>{`Arcade (Monthly)`}</h1>
          <p>{`${plan}/mo`}</p>
        </div>
      );
    case "12":
      return (
        <div className="flex items-center justify-between">
          <h1>{`Arcade (Monthly)`}</h1>
          <p>{`${plan}/mo`}</p>
        </div>
      );

    case "15":
      return (
        <div className="flex items-center justify-between">
          <h1>{`Arcade (Monthly)`}</h1>
          <p>{`${plan}/mo`}</p>
        </div>
      );
      // eslint-disable-next-line no-unreachable
      break;

    default:
      break;
  }
};
const More = ({ item, value }: any) => {
  console.log(item, "hello");

  return (
    <div className="flex justify-between">
      <h1>{item}</h1>
      <p>${value + 1}/mon</p>
    </div>
  );
};
const GetSubByAddon = (plan: string[]) => {
  const items = [...plan];
  console.log(items);

  return (
    <div className="flex flex-col gap-4">
      {items.map((each, idx) => (
        <More
          key={each}
          item={each}
          value={idx}
        />
      ))}
    </div>
  );
};
