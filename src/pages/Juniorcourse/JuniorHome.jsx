import React from "react";
import JuniorNavV2 from "./sections/JuniorNavV2";
import LiveSession from "../Juniorcourse/sections/LiveSession";
import ClassTabs from "../Juniorcourse/sections/ClassTabs";
import Benefits from "../Juniorcourse/sections/Benefits";
import Footer from "../Juniorcourse/sections/Footer";
import StickyDemoCTA from "../Juniorcourse/sections/StickyDemoCTA";


export default function Home() {
  return (
    <>
       <JuniorNavV2 />
      <LiveSession />
       <Benefits />
      <ClassTabs />
      <Footer />
      <StickyDemoCTA />
    </>
  );
}
