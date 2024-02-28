import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import YoutubeVideos from "@/components/Youtube";

export default function Homepage() {
  return (
    <div className="container sm:my-6">
      <Hero />
      <Skills />
      <YoutubeVideos />
    </div>
  );
}
