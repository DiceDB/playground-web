import React from 'react';
import { Twitter } from '@mui/icons-material';
import GitHub from '@mui/icons-material/GitHub';
import People from '@mui/icons-material/People';
import { Button } from '@dicedb/ui/button';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="bg-white border-t border-gray-100 py-12"
      data-testid="footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3
              className="text-gray-500 font-semibold mb-4 text-center"
              data-testid="footer-heading"
            >
              DiceDB
            </h3>
            <Link
              href="https://dicedb.io/get-started/installation/"
              target="_blank"
              data-testid="get-started-link"
            >
              <Button
                className="w-full !bg-red-600 hover:!bg-red-700 !text-white"
                data-testid="get-started-button"
              >
                Get Started →
              </Button>
            </Link>
            <Link
              href="https://github.com/dicedb/dice"
              target="_blank"
              data-testid="github-link"
            >
              <Button
                variant="outline"
                className="!w-full mt-2 !border-1 !border-gray-700 bg-blue-50 hover:text-blue text-black hover:text-blue-600"
                data-testid="github-button"
              >
                <GitHub className="mr-2 h-4 w-4" /> GitHub (4k+)
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <h3 className="text-gray-500 font-semibold mb-4">Developers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://dicedb.io/get-started/installation"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900"
                  data-testid="quickstart-link"
                >
                  Quickstart
                </Link>
              </li>
              <li>
                <Link
                  href="https://dicedb.io/commands/get"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900"
                  data-testid="commands-link"
                >
                  Commands
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/DiceDB/dice/tree/master/examples/leaderboard-go"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900"
                  data-testid="examples-link"
                >
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-gray-500 font-semibold mb-4">Examples</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/DiceDB/dice/tree/master/examples/leaderboard-go"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900"
                  data-testid="leaderboard-link"
                >
                  Real-time Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-gray-500 font-semibold mb-4">Us and Socials</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="mailto:arpit@dicedb.io"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900"
                  data-testid="contact-link"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="space-x-4 mt-4 items-center justify-items-center">
              <Link
                href="https://discord.gg/6r8uXWtXh7"
                target="_blank"
                className="text-gray-400 hover:text-gray-600"
                aria-label="People"
                data-testid="people-icon-link"
              >
                <People className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com/thedicedb"
                target="_blank"
                className="text-gray-400 hover:text-gray-600"
                aria-label="Twitter"
                data-testid="twitter-icon-link"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/dicedb/dice"
                target="_blank"
                className="text-gray-400 hover:text-gray-600"
                aria-label="GitHub"
                data-testid="github-icon-link"
              >
                <GitHub className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
