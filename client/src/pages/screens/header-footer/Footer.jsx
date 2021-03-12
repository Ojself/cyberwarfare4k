import React from "react";

const shouldRenderTos = () => {
  const { pathname } = window.location;
  return ["tokens", "terms-of-sale", "tos", "terms-of-service"].some((path) => {
    return pathname.includes(path);
  });
};

const Footer = () => {
  const currentYear = new Date(Date.now()).getFullYear();

  const termsOfSaleLinks = (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://chw4k.herokuapp.com/terms-of-sale"
      >
        Salgsbetingelser
      </a>{" "}
      <p>Orgnr: 913423526 </p>
    </div>
  );

  return (
    <footer
      style={{ alignSelf: "flex-end", bottom: "0" }}
      className="w-100 dark-light mt-5"
    >
      <div className="text-center py-3">
        {shouldRenderTos() && termsOfSaleLinks}
        {/* <p className="text-danger" style={{ fontSize: "0.75rem" }}>
          Warning: The server and database will be reset{" "}
          <strong>14. December 19:00 CET </strong>
        </p> */}
        © {currentYear} Copyright{" "}
        <div className="py-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Ojself/cyberwarfare4k"
          >
            CyberhackerWarfare4000
          </a>{" "}
          <a
            className="text-light"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Ojself/cyberwarfare4k/blob/master/changelog.md"
          >
            0.3.2
          </a>{" "}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
