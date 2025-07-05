// components/Footer.jsx
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background border-t dark:border-muted p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo or Site Name */}
        <div className="text-xl font-semibold text-foreground">FACTS</div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition">
            Home
          </a>
          <a href="/" className="hover:text-foreground transition">
            Tuitions
          </a>
          <a href="/" className="hover:text-foreground transition">
            Blog
          </a>
          <a href="/" className="hover:text-foreground transition">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-muted-foreground">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground mt-4">
        © {new Date().getFullYear()} EchoEmpact. All rights reserved.
      </div>
    </footer>
  );
}
