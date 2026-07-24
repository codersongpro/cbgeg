import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SubGroups } from "@/components/sections/SubGroups";
import { ActivitiesTimeline } from "@/components/sections/ActivitiesTimeline";
import { Leaders } from "@/components/sections/Leaders";
import { JoinCta } from "@/components/sections/JoinCta";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SubGroups />
      <ActivitiesTimeline />
      <Leaders />
      <JoinCta />
    </>
  );
}
