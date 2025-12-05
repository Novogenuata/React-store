import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container text-center">
        <div className="row">
          {/* Quick Links Section */}
          <div className="col-md-4 mb-4 text-start">
            <h5 className="text-uppercase mb-3" style={{ fontWeight: "bold" }}>
              Quick Links
            </h5>
            <ul className="list-unstyled" style={{ fontSize: "0.9rem" }}>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-white text-decoration-underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="text-white text-decoration-underline"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="text-white text-decoration-underline"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          {/* Follow Us Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3" style={{ fontWeight: "bold" }}>
              Follow Us
            </h5>
            <div className="d-flex justify-content-center gap-3 mb-3">
              {/* Social Media Icons */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                style={{ fontSize: "1.5rem" }}
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>

            {/* Copyright Notice */}
            <p className="mb-0" style={{ fontSize: "0.9rem" }}>
              © 2024 CST Store. All rights reserved.
            </p>
          </div>

          {/* Placeholder Section for Balance */}
          <div className="col-md-4 mb-4"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
