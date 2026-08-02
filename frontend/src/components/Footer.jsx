import { assets } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-gray-400 bg-footer flex flex-col items-center gap-5 pt-20 pb-5 px-[8vw]">
      <div className="w-full gap-20 grid grid-cols-[2fr_1fr_1fr_1fr] max-md:flex max-md:flex-col max-md:gap-8">
        {/* footer-content-left */}
        <div className="flex flex-col items-start gap-5">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            voluptatem ducimus quidem tenetur dignissimos. Doloribus, impedit,
            necessitatibus dolore perspiciatis quos temporibus dolores
            perferendis.
          </p>
          <div className="flex *:w-10 *:mr-4 *:cursor-pointer">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        {/* footer-content-center-left */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="font-semibold text-xl text-white">COMPANY</h2>
          <ul className="space-y-2.5 *:cursor-pointer">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* footer-content-center-right */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="font-semibold text-xl text-white">Quick links</h2>
          <ul className="space-y-2.5 *:cursor-pointer">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* footer-content-right */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="font-semibold text-xl text-white">Support</h2>
          <ul className="space-y-2.5 *:cursor-pointer">
            <li>+1-232-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-0.5 my-5 bg-gray-400 border-none" />
      {/* footer-copyright */}
      <p className="max-md:text-center">
        Copyright {currentYear} @ Tomato.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
