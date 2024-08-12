import React from 'react';
import { logoLava } from '../../../assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
export default function Footer() {
  return (
    <footer className="py-7 md:px-16 bg-antiFlashWhite-400 shadow-footer px-4 mt-auto">
      <img src={logoLava} alt="logo" />
      <hr className="my-5" />
      <div className="md:grid-cols-2 grid grid-cols-1">
        <p className="text-neutral-600 flex flex-wrap items-center text-lg">
          <span className="mx-1 text-base">
            Copyright © Sports Advantage, Developed by
            <a
              href="https://webdbtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline mx-1"
            >
              WebDBTech
            </a>
            Powered by
            <a
              href="https://horuswallet.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline ml-1"
            >
              Horus Wallet
            </a>
          </span>{' '}
        </p>
        <ul className="md:justify-end footer-link flex flex-wrap items-center">
          <li>
            <span className="text-neutral-600 text-lg">
              All Rights Reserved
            </span>
          </li>
          <li>
            <span className="text-neutral-600 mx-1 text-lg">|</span>
            <Link to="/terms" className="text-lava-100 text-lg cursor-pointer">
              Terms and Conditions
            </Link>
          </li>
          <li>
            <span className="text-neutral-600 mx-1 text-lg">|</span>
            <Link
              to="/privacy"
              className="text-lava-100 text-lg cursor-pointer"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
      <ul className="b-5 lg:gap-3 flex justify-end gap-4 mt-4 list-none">
        <li>
          <a
            href="https://discord.com/invite/FVHJQXpP"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-lava-100 cursor-pointer pointer-events-none"
          >
            <FontAwesomeIcon
              icon={faDiscord}
              className="lg:text-xl md:text-2xl text-3xl text-gray-500"
            />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/advantageio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-lava-100 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="lg:text-xl md:text-2xl text-3xl"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=61554262196420"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-lava-100 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="lg:text-xl md:text-2xl text-3xl"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/@sportsadvantage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-lava-100 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="lg:text-xl md:text-2xl text-3xl"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/sportsadvantageio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-lava-100 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="lg:text-xl md:text-2xl text-3xl"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}
