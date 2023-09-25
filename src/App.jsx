import { useState, useRef } from "react";

import { Random } from "random";
import seedrandom from "seedrandom";
import { RandomStar } from "./RandomStar";
import { Arrow } from "./Arrow";

import "./App.css";

function createRng(seed) {
	const prng = seedrandom(seed); // TODO: replace underlying prng?
	const rng = new Random();
	rng.use(prng);
	return rng;
}

const outerRng = createRng();

const layers = [2, 3];
const points = [8, 20];
const radiusScale = [0.4, 1.0];

const tokenCount = 16;
const padding = 18;
const columns = 4;
const spacing = 28;

export function App() {
	// TODO: use reducer?
	// TODO: pre-fill seed states as object with with value and locked flag
	// ... only regen seeds explicitly in response to a button
	// TODO: visual indication of locked?
	const [seeds, setSeeds] = useState(() =>
		Array.from({ length: tokenCount }, () => ({
			seed: outerRng.next(),
			locked: true,
		}))
	);

	const frontRef = useRef();
	function handleSave() {
		navigator.clipboard.writeText(frontRef.current?.outerHTML);
	}

	function handleRegen() {
		setSeeds((seeds) =>
			seeds.map((x) => (x.locked ? x : { seed: outerRng.next(), locked: false }))
		);
	}

	const radius = 11;

	return (
		<>
			<div className="non-printable flex">
				<button onClick={handleSave}>save SVG</button>
				<button onClick={handleRegen}>regenerate</button>
			</div>
			<div className="printable">
				<svg ref={frontRef} style={{ width: "200mm" }} viewBox="0 0 200 200">
					<g transform={`translate(130, ${padding / 2})`}>
						{Array.from({ length: 6 }).map((_, i) => (
							<g key={i} transform={`translate(0, ${padding * i})`}>
								<Arrow doubleArrow={i < 3} />
							</g>
						))}
					</g>

					{seeds.map(({ seed, locked }, i) => {
						const rng = createRng(seed);

						return (
							<g
								key={seed}
								transform={`translate(${(i % columns) * spacing + padding}, ${
									Math.trunc(i / columns) * spacing + padding
								})`}
							>
								{!locked ? (
									<line className="non-printable" x1={-12} y1={0} x2={12} y2={0} stroke="red" />
								) : null}
								<RandomStar
									radius={radius}
									radiusScale={radiusScale}
									layers={layers}
									points={points}
									rng={rng}
									onClick={() => {
										setSeeds([
											...seeds.slice(0, i),
											{ seed, locked: !locked },
											...seeds.slice(i + 1),
										]);
									}}
								/>
							</g>
						);
					})}
				</svg>
			</div>
			<div className="printable right">
				<svg style={{ width: "200mm", transform: "scalex(-1)" }} viewBox="0 0 200 200">
					{Array.from({ length: tokenCount }).map((_, i) => (
						<g
							key={i}
							transform={`translate(${(i % columns) * spacing + padding}, ${
								Math.trunc(i / columns) * spacing + padding
							})`}
						>
							<circle cx="0" cy="0" r={radius} fill="none" stroke="red" strokeWidth="0.1" />
							<circle cx="0" cy="0" r={radius * 0.8} fill="black" stroke="none" />
							<circle cx="0" cy="0" r={radius * 0.8 - 2} fill="white" stroke="none" />
						</g>
					))}
				</svg>
			</div>
		</>
	);
}
