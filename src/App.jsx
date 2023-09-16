import { Random } from "random";
// import { xor128 } from "seedrandom";
import { RandomStar } from "./RandomStar";
import { Arrow } from "./Arrow";

import "./App.css";

const rng = new Random();
// rng.use(xor128("ahlcg1"));

const layers = [2, 3];
const points = [8, 20];
const radiusScale = [0.4, 1.0];

const tokenCount = 16;
const padding = 18;
const columns = 4;
const spacing = 28;

export function App() {
	const radius = 12;

	return (
		<>
			<div>
				<svg style={{ width: "200mm" }} viewBox="0 0 80 80">
					<g transform="translate(30, 30)">
						<Arrow />
					</g>
				</svg>
			</div>

			<div className="printable">
				<svg style={{ width: "200mm" }} viewBox="0 0 200 200">
					<g transform="translate(130, 30)">
						<Arrow />
					</g>

					{Array.from({ length: tokenCount }).map((_, i) => (
						<g
							key={i}
							transform={`translate(${(i % columns) * spacing + padding}, ${
								Math.trunc(i / columns) * spacing + padding
							})`}
						>
							<RandomStar
								radius={radius}
								radiusScale={radiusScale}
								layers={layers}
								points={points}
								rng={rng}
							/>
						</g>
					))}
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
							<circle
								cx="0"
								cy="0"
								r={radius}
								fill="transparent"
								stroke="red"
								strokeWidth={"0.1"}
							/>
							<circle cx="0" cy="0" r={radius * 0.8} fill="black" stroke="none" />
							<circle cx="0" cy="0" r={radius * 0.8 - 2} fill="white" stroke="none" />
						</g>
					))}
				</svg>
			</div>
		</>
	);
}
