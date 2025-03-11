/** @type {import('tailwindcss').Config} */
import { animations, keyframes } from 'framer-motion'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: [
					'Roboto',
					...defaultTheme.fontFamily.sans
				],
				afacad: [
					'Afacad Flux',
					...defaultTheme.fontFamily.sans
				]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			animation: {
				float: 'float 6s ease-in-out infinite',
				'float-slow': 'float 8s ease-in-out infinite',
				'float-slower': 'float 10s ease-in-out infinite',
				"fade-in-first": "fade-in-scale 0.4s ease-out forwards",
				"fade-in-second": "fade-in-scale 0.4s ease-out 0.2s forwards",
				"fade-in-third": "fade-in-scale 0.4s ease-out 0.4s forwards",
				"fade-in-icon": "fade-in-scale 0.4s ease-out 0.6s forwards",
			},
			keyframes: {
				float: {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				"fade-in-scale": {
					"0%": { opacity: "0", transform: "scale(0.9)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
			},
			colors: {
				primary: {
					light: '#FAFAF9',
					dark: '#000000',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					light: '#E7E5E4',
					dark: '#292524',
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					amber: '#F59E0B',
					teal: '#0D9488',
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				engineering_orange: {
					'100': '#250202',
					'200': '#4a0503',
					'300': '#6f0705',
					'400': '#940907',
					'500': '#b80c09',
					'600': '#f4110d',
					'700': '#f64d4a',
					'800': '#f98886',
					'900': '#fcc4c3',
					DEFAULT: '#b80c09'
				},
				indigo_dye: {
					'100': '#021015',
					'200': '#041f2b',
					'300': '#062f40',
					'400': '#083e55',
					'500': '#0b4f6c',
					'600': '#1282b2',
					'700': '#29b0ea',
					'800': '#70caf1',
					'900': '#b8e5f8',
					DEFAULT: '#0b4f6c'
				},
				process_cyan: {
					'100': '#002530',
					'200': '#004b5f',
					'300': '#01708f',
					'400': '#0196bf',
					'500': '#01baef',
					'600': '#28d0fe',
					'700': '#5edbfe',
					'800': '#93e7fe',
					'900': '#c9f3ff',
					DEFAULT: '#01baef'
				},
				ghost_white: {
					'100': '#000065',
					'200': '#0000ca',
					'300': '#3030ff',
					'400': '#9595ff',
					'500': '#fbfbff',
					'600': '#fbfbff',
					'700': '#fcfcff',
					'800': '#fdfdff',
					'900': '#fefeff',
					DEFAULT: '#fbfbff'
				},
				rich_black: {
					'100': '#010304',
					'200': '#020609',
					'300': '#02090d',
					'400': '#030c11',
					'500': '#040f16',
					'600': '#134767',
					'700': '#227fb9',
					'800': '#5baee1',
					'900': '#add6f0',
					DEFAULT: '#040f16'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")]
}
