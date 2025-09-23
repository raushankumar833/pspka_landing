import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  extend: {},
};
export const plugins = [nextui()];
