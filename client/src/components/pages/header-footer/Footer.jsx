import React from "react";

const Footer = () => {
  const currentYear = new Date(Date.now()).getFullYear();
  return (
    <footer style={{alignSelf:"flex-end", bottom:"0"}} className="w-100 dark-light mt-5">
      <div className="text-center py-3">
        © {currentYear} Copyright
        <div className="py-2">
          <a target="_blank" rel="noopener noreferrer" href="http://flesjoe.com/">Flesjoe.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
