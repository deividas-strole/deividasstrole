import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const yeahRef = useRef(null);
  const lakeAppsRef = useRef(null);
  const lawanderRef = useRef(null);
  const vpnHeadRef = useRef(null);
  const socialCommunityRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    const cards = [
      yeahRef.current,
      lakeAppsRef.current,
      lawanderRef.current,
      vpnHeadRef.current,
      socialCommunityRef.current,
    ];

    cards.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-10">
            <div ref={yeahRef} className="first-project-wrapper">
              <div className="image-wrapper overflow-hidden rounded-xl bg-black-200">
                <img
                  src={`${import.meta.env.BASE_URL}images/deividas-strole-yeah-sc-OLD.png`}
                  alt="Y.E.A.H. - AI-Powered Customer Service Agent"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-content">
                <h2>Y.E.A.H. - AI-Powered Customer Service Agent</h2>
                <p className="text-white-50 md:text-xl">
                  Java, Spring Boot, TypeScript, React, MySQL, AWS
                </p>
              </div>
            </div>

            <div ref={lakeAppsRef} className="first-project-wrapper">
              <div className="image-wrapper overflow-hidden rounded-xl bg-black-200">
                <img
                  src={`${import.meta.env.BASE_URL}images/deividas-strole-lake-apps.png`}
                  alt="Lake Apps website displayed on a modern monitor"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-content">
                <h2>Lake Apps - Small Business Website</h2>
                <p className="text-white-50 md:text-xl">
                  JavaScript, HTML, CSS, Web Design, SEO
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="project" ref={lawanderRef}>
              <div className="image-wrapper overflow-hidden rounded-xl bg-black-200">
                <img
                  src={`${import.meta.env.BASE_URL}images/deividas-strole-lawander-sc.png`}
                  alt="LaWander - AI Travel Planner"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2>LaWander - AI Travel Planner</h2>
              <p className="text-white-50 md:text-xl">
                Java, Spring Boot, JavaScript, React, MySQL, AWS
              </p>
            </div>

            <div className="project" ref={vpnHeadRef}>
              <div className="image-wrapper overflow-hidden rounded-xl bg-black-200">
                <img
                  src={`${import.meta.env.BASE_URL}images/deividas-strole-vpnhead-sc.png`}
                  alt="vpnHead - Portal for VPN Services and Information"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2>vpnHead - Portal for VPN Services and Information</h2>
              <p className="text-white-50 md:text-xl">
                Java, Spring Boot, JavaScript, React, MySQL, AWS
              </p>
            </div>

            <div className="project" ref={socialCommunityRef}>
              <div className="image-wrapper overflow-hidden rounded-xl bg-black-200">
                <img
                  src={`${import.meta.env.BASE_URL}images/deividas-strole-social-community-maker-example.png`}
                  alt="Social Community Maker website displayed on a modern monitor"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2>Social Community Maker</h2>
              <p className="text-white-50 md:text-xl">
                Java, Spring Boot, React, MySQL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
