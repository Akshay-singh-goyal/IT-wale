import React from "react";
import Button from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#fdf2f8]">

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-20 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Bharat's{" "}
            <span className="text-indigo-600">Trusted & Affordable</span>
            <br /> Educational Platform
          </h1>

          <p className="mt-4 text-gray-600 max-w-lg">
            Unlock your potential by signing up with Physics Wallah – the most
            affordable learning solution.
          </p>

          <Button className="mt-6 text-lg rounded-2xl">
            Get Started
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <div className="relative">
            <img
              src="https://via.placeholder.com/260"
              alt="Teacher"
              className="rounded-full shadow-lg"
            />

            <div className="absolute -right-6 top-10 bg-indigo-600 text-white p-3 rounded-xl text-sm shadow">
              PW is where students learn with love
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10 pb-20">
        {[
          "Daily Live Classes",
          "10M+ Tests & Notes",
          "24x7 Doubt Solving",
          "100+ Centres",
        ].map((item, i) => (
          <Card key={i}>
            <CardContent className="text-center font-semibold">
              {item}
            </CardContent>
          </Card>
        ))}
      </section>

    </div>
  );
}
