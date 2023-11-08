"use client";

import StepperForm from "@/components/StepperForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-400">
      <div className="flex h-full max-h-[600px] w-full max-w-[800px] rounded-md bg-white   p-4 shadow-2xl ">
        <div className=" h-full w-[300px] max-w-[300px] overflow-hidden">
          <img
            src="/bg-sidebar-desktop.svg"
            alt="bg"
            className="h-full "
          />
        </div>
        <div className=" flex-1 px-14">
          <StepperForm />
        </div>
      </div>
    </main>
  );
}
