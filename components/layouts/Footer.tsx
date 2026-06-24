
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import Link from "next/link";

function Footer() {
  const footerSections = [
    {
      title: "QUICK OVERVIEW",
      links: [
        { name: "Contact", href: "/contact" },
        { name: "About Us", href: "/about" },
        { name: "Personal Service", href: "/about" },
      ],
    },
    {
      title: "CUSTOMER SERVICE",
      links: [
        { name: "Help Center", href: "/" },
        { name: "Privacy Policy", href: "/" },
        { name: "Terms & Conditions", href: "/" },
        { name: "Shipping", href: "/" },
      ],
    },
    {
      title: "MY ACCOUNT",
      links: [
        { name: "Login", href: "/" },
        { name: "Register", href: "/" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF size={40} />,
      hover: "hover:text-blue-400",
    },
    {
      icon: <FaInstagram size={40} />,
      hover: "hover:text-pink-400",
    },
    {
      icon: <FaYoutube size={40} />,
      hover: "hover:text-red-400",
    },
    {
      icon: <FaTiktok size={40} />,
      hover: "hover:text-white",
    },
  ];

  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {footerSections.map((section, index) => (
          <div key={index}>
            <h1 className="text-base font-semibold mb-4">
              {section.title}
            </h1>

            <div className="flex flex-col space-y-2 text-gray-300">
              {section.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="hover:text-amber-400 cursor-pointer hover:scale-105 hover:underline hover:underline-offset-2 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h1 className="text-base font-semibold mb-4">
            STAY CONNECTED
          </h1>

          <div className="flex gap-6 text-gray-300">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className={`${social.hover} cursor-pointer hover:scale-110 transition-all duration-200`}
              >
                {social.icon}
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;