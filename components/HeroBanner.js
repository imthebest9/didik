import React from "react";
import Image from "next/image";
// import InputField from "./InputField";

const HeroBanner = () => {
  return (
    <section style={{ backgroundColor: '#79E0F0' }} className="md:p-0 p-4 mx-auto box-content">
      <div className="container mx-auto rounded-lg">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
          <div className="flex order-last md:order-first ml-10">
            <div className="flex flex-col justify-center">
              <div className="italic font-medium">Choose Us, Be Ahead</div>
              <div className="font-semibold text-4xl mt-4">Find Tutor</div>
              <div className="font-semibold text-4xl">
                Now In Your Fingertips
              </div>
              <div className="mt-4">
              Anyone who stops learning is old, whether at twenty or eighty
              </div>
              {/* <InputField label="Search Course" style="mt-4" /> */}
            </div>
          </div>
          <div className="flex items-center justify-center order-first md:order-last">
            {" "}
            <Image
              className="order-1"
              src="/images/heroImage.png"
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
