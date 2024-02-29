import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Social from "@/components/Social";
import YoutubeVideos from "@/components/Youtube";

export default function Homepage() {
  return (
    <div className="container sm:my-6">
      <Hero />
      <Skills />
      <YoutubeVideos />
      <Social />
    </div>
  );
}
