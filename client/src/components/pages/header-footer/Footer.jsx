import React from "react";

const Footer = () => {
  const currentYear = new Date(Date.now()).getFullYear();
  return (
    <footer className="dark-light pt-5">
      <div className="text-center py-3">
        © {currentYear} Copyright
        <div className="py-2">
          <a href="http://flesjoe.com/">Flesjoe.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
