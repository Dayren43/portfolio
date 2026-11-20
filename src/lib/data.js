export const PROJECTS = [
	{
		id: 'CH-01',
		code: 'rust-cursor',
		title: 'RustCursor',
		badge: 'LIVE',
		featured: true,
		desc: 'A Windows tray tool that remaps the cursor between monitors of different resolutions and physical sizes by translating through a shared millimetre coordinate space. Drag-to-arrange GUI, per-display HWID profiles, two input backends.',
		stats: [
			['LANG', 'Rust 100%'],
			['RELEASES', 'v0.6.0'],
			['COMMITS', '76'],
			['STATUS', 'Maintained']
		],
		href: 'https://github.com/Dayren43/RustCursor',
		langs: [['Rust', 100, 'oklch(0.74 0.16 35)']],
		notes: [
			'Maps pixels → physical millimetres so crossings preserve physical height regardless of pixel density.',
			'Two input backends: WH_MOUSE_LL (anti-cheat-safe) and the Interception kernel driver.',
			'Drag-to-arrange settings GUI with hot-reloading TOML config and per-HWID monitor profiles.',
			'Auto-pauses for fullscreen DX/Vulkan apps via SHQueryUserNotificationState.'
		],
		stack: ['Rust', 'Win32 API', 'egui', 'TOML']
	},
	{
		id: 'CH-02',
		code: 'temp-logging',
		title: 'Temp-logging Dashboard',
		badge: 'DESIGN SOURCE',
		desc: 'ESP32-C3 temperature and humidity sensor running async Rust firmware on Embassy, paired with a self-hosted Svelte dashboard for logging and visualisation.',
		stats: [
			['LANG', 'Svelte 67%'],
			['FIRMWARE', 'Rust · Embassy'],
			['COMMITS', '21'],
			['STATUS', 'Personal']
		],
		href: 'https://github.com/Dayren43/Temp-logging',
		langs: [
			['Svelte', 66.7, 'oklch(0.74 0.16 35)'],
			['Rust', 16.9, 'oklch(0.72 0.11 180)'],
			['JavaScript', 8.9, 'oklch(0.84 0.14 95)'],
			['C++', 2.1, 'oklch(0.65 0.10 280)'],
			['Shell', 2.0, 'oklch(0.62 0.13 320)'],
			['Python', 1.4, 'oklch(0.68 0.12 220)'],
			['Other', 2.0, 'oklch(0.55 0.01 60)']
		],
		notes: [
			'no_std async Rust firmware on Embassy, rewritten from the original C++, with a hand-written DHT22 driver built on embedded-hal traits.',
			'Sampling, Wi-Fi reconnect and the HTTP server run as separate tasks, so requests are answered from a cached reading and the node recovers from access-point outages.',
			'Python polling service fetches readings every 5 minutes and writes to a PostgreSQL database running in Docker.',
			'Svelte dashboard fetches data from a backend API and renders rolling charts.'
		],
		stack: ['Rust', 'Embassy', 'ESP32-C3', 'Svelte', 'Python', 'PostgreSQL']
	},
	{
		id: 'CH-03',
		code: 'bike-trailer',
		title: 'LTU Bike Trailer',
		badge: 'UNIVERSITY · CAPSTONE',
		desc: 'The largest group project of my degree: a multi-disciplinary instrumented bicycle trailer built with the LTU Bike-trailer team. Hardware, firmware, telemetry and the integration work that ties them together.',
		stats: [
			['TEAM', 'Multi-discipline'],
			['ROLE', 'Software / Firmware'],
			['INSTITUTION', 'LTU'],
			['STATUS', 'Delivered']
		],
		href: 'https://github.com/Ltu-Bike-trailer',
		langs: [
			['Embedded Rust', 60, 'oklch(0.74 0.16 35)'],
			['Python', 25, 'oklch(0.68 0.12 220)'],
			['Other', 15, 'oklch(0.55 0.01 60)']
		],
		notes: [
			'Team of 13 across software/firmware, hardware/electrical, and systems/control disciplines.',
			'Owned sensor nodes: hardware interface design, PCB design for a remote sensor, and firmware on nRF52840 in Embedded Rust.',
			'Delivered a working MVP that serves as a first prototype and foundation for the next cohort of students to build on.'
		],
		stack: ['Embedded Rust', 'nRF52840', 'Python', 'CAN bus']
	},
	{
		id: 'CH-04',
		code: 'leo-constellations',
		title: 'Satellite Constellations Simulator',
		badge: 'THESIS · ERICSSON',
		cta: 'THESIS',
		desc: 'A Python simulator for sizing small low-Earth-orbit satellite constellations for 6G, built alongside coverage studies in Ericsson’s internal network simulator. Compares polar, inclined and mixed orbit layouts against Starlink, OneWeb and Kuiper.',
		stats: [
			['LANG', 'Python'],
			['GRID', '64,800 pts'],
			['SWEEP', '300–1k sats'],
			['STATUS', 'Published']
		],
		href: 'https://ltu.diva-portal.org/smash/record.jsf?pid=diva2%3A1967490',
		langs: [['Python', 100, 'oklch(0.68 0.12 220)']],
		notes: [
			'Takes a constellation design (number of satellites, orbital planes, tilt and altitude) and computes every satellite’s orbit with the SGP4 orbit model.',
			'Measures how high the nearest satellite sits in the sky at 64,800 points around the globe, hourly over 13 hours. Higher satellites mean a clearer line of sight and a better signal.',
			'Ran coverage studies on a compute cluster with Ericsson’s internal network simulator, comparing polar, inclined and mixed constellations on coverage, latency, signal quality and data rate. The largest runs took over 1M CPU-seconds.',
			'Found that an even mix of polar and inclined orbits reached full coverage with relatively few satellites, and that a phone’s weak transmitter, not the satellite, limits upload speed on a direct connection.'
		],
		stack: ['Python', 'Skyfield', 'SGP4', 'MATLAB', '3GPP NTN']
	}
];

export const EXPERIENCE = [
	{
		range: 'NOV 2026 – PRESENT',
		duration: 'current',
		company: 'SAAB',
		role: 'Embedded Software Engineer',
		blurb: 'Embedded team within SAAB, writing C++ on a real-time operating system.',
		detail: 'Specifics under NDA, but happy to talk about scope and stack in conversation.',
		tags: ['Embedded', 'RTOS', 'C++'],
		status: 'active'
	},
	{
		range: 'AUG 2025 – NOV 2026',
		duration: '15 months',
		company: 'SAAB',
		role: 'Software Engineer',
		blurb: 'Full-time role on a defence-tech software team operating within a large-scale SAFe agile programme.',
		detail: 'Early adopter of agentic coding on the team; presented reusable skills and ways of working to the wider section. Project specifics under NDA.',
		tags: ['Java', 'C++', 'Agentic coding', 'Secret :)'],
		status: 'shipped'
	},
	{
		range: 'JAN – JUNE 2025',
		duration: '6 months',
		company: 'Ericsson',
		role: "Master's Thesis",
		blurb: 'Built a Python simulator to evaluate LEO satellite constellations for 6G coverage.',
		detail:
			'Compared constellations of 300 to 1,000 satellites, from all-polar to all-inclined orbits and mixes of both. The mixes reached full coverage with relatively few satellites.',
		tags: ['6G', 'NTN', 'Python', 'MATLAB', 'SGP4', 'Simulation'],
		status: 'shipped'
	},
	{
		range: 'JUN – AUG 2024',
		duration: '3 months',
		company: 'Ericsson',
		role: 'R&D Internship',
		blurb: 'Built a Java framework for integrating external standard tests.',
		detail:
			'Designed and shipped a testing framework in Java that plugged third-party standard test suites into the in-house pipeline so they ran alongside internal cases.',
		tags: ['Java', 'Test infra', 'R&D'],
		status: 'shipped'
	},
	{
		range: 'JUN – AUG 2023',
		duration: '3 months',
		company: 'Ericsson',
		role: 'R&D Internship',
		blurb: 'Python tooling for post-processing and visualisation of simulation data.',
		detail: 'Built Python tooling for post-processing and visualisation of simulation data.',
		tags: ['Python', 'Data', 'Tooling'],
		status: 'shipped'
	},
];
