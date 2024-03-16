import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import GithubGraph from "@/components/Github";
import Hero from "@/components/Hero";
import OpenForOpportunities from "@/components/OpenForOpportunities";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Social from "@/components/Social";
import YoutubeVideos from "@/components/Youtube";

export default function Homepage() {
  return (
    <>
      <OpenForOpportunities />
      <div className="container sm:my-6">
        <Hero />
        <Skills />
        <YoutubeVideos />
        <Experience />
        <Projects />
        <Social />
        <GithubGraph />
        <Footer />
      </div>
    </>
  );
}
