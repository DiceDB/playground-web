import { Button } from "@mui/material";
import { Twitter } from "@mui/icons-material";
import GitHub from "@mui/icons-material/GitHub";
import People from "@mui/icons-material/People";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Have questions or need support? We&apos;re here to help. Reach out
            to us through any of the following channels.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="https://discord.com/invite/6r8uXWtXh7"
              passHref
              legacyBehavior
            >
              <Button
                variant="contained"
                startIcon={<People />}
                sx={{ backgroundColor: "#e60001" }}
              >
                Community Forum
              </Button>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              href="https://x.com/thedicedb"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com/dicedb/dice"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <GitHub className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            © 2024 DiceDB. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
