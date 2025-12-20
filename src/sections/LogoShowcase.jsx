import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => {
    return (
        <div className="marquee-item w-auto shrink-0 mx-[60px] flex items-center float-none">
            <span className="text-xl md:text-2xl font-semibold whitespace-nowrap">
                {icon.name}
            </span>
        </div>
    );
};

const LogoShowcase = () => (
    <div className="md:my-20 my-10 relative">
        <div className="gradient-edge" />
        <div className="gradient-edge" />

        <div className="marquee h-52">
            <div className="marquee-box gap-0 flex">
                {logoIconsList.map((icon, index) => (
                    <LogoIcon key={index} icon={icon} />
                ))}

                {logoIconsList.map((icon, index) => (
                    <LogoIcon key={`duplicate-${index}`} icon={icon} />
                ))}
            </div>
        </div>
    </div>
);

export default LogoShowcase;