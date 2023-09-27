import { useState, useRef, useReducer } from "react";
import { Random } from "random";
import seedrandom from "seedrandom";
import { RandomStar } from "./RandomStar";
import { CircleDetail } from "./CircleDetail";
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

const tokenCount = 20;
const columns = 4;

const circleTokenSizePlusSpacing = 25;
const arrowTokenVerticalSizePlusSpacing = 13;
const arrowTokenHorizontalSizePlusSpacing = 43;

export function App() {
	const invisibleDownloadLink = useRef();

	const [obverse, toggleObverse] = useReducer((state) => !state, false);
	const [seeds, setSeeds] = useState(() =>
		Array.from({ length: tokenCount }, () => ({
			seed: outerRng.next(),
			locked: true,
		}))
	);

	const frontRef = useRef();
	function handleSave() {
		const link = invisibleDownloadLink.current;
		URL.revokeObjectURL(link.href);
		link.href = URL.createObjectURL(
			new Blob([frontRef.current?.outerHTML], { type: "image/svg+xml" })
		);
		link.click();
	}

	function handleRegen() {
		setSeeds((seeds) =>
			seeds.map((x) => (x.locked ? x : { seed: outerRng.next(), locked: false }))
		);
	}

	const radius = 11;

	return (
		<>
			<div className="non-printable flex space-after">
				<button onClick={handleSave}>save SVG</button>
				<button onClick={handleRegen}>regenerate</button>
				<label>
					<input type="checkbox" onClick={toggleObverse} /> obverse
				</label>
				<a
					ref={invisibleDownloadLink}
					className="invisible-download-link"
					download={!obverse ? "front.svg" : "back.svg"}
				/>
			</div>
			<div className="printable">
				<svg
					ref={frontRef}
					xmlns="http://www.w3.org/2000/svg"
					xmlSpace="preserve"
					width="200mm"
					height="200mm"
					version="1.1"
					shapeRendering="geometricPrecision"
					textRendering="geometricPrecision"
					imageRendering="optimizeQuality"
					fillRule="evenodd"
					clipRule="evenodd"
					viewBox="0 0 200 200"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					{...{
						"xmlns:xodm": "http://www.corel.com/coreldraw/odm/2003",
					}}
				>
					<g transform={`translate(${columns * circleTokenSizePlusSpacing}, 0)`}>
						{Array.from({ length: 10 }).map((_, i) => (
							<g key={i} transform={`translate(0, ${arrowTokenVerticalSizePlusSpacing * i})`}>
								<Arrow doubleArrow={!obverse} cutStrokeColor={!obverse ? "red" : "green"} />
							</g>
						))}

						<g transform={`translate(${arrowTokenHorizontalSizePlusSpacing}, 0)`}>
							{Array.from({ length: 10 }).map((_, i) => (
								<g key={i} transform={`translate(0, ${arrowTokenVerticalSizePlusSpacing * i})`}>
									<Arrow doubleArrow={!obverse} cutStrokeColor={!obverse ? "red" : "green"} />
								</g>
							))}
						</g>
					</g>

					{seeds.map(({ seed, locked }, i) => {
						const rng = createRng(seed);

						return (
							<g
								key={seed}
								transform={`translate(${(i % columns) * circleTokenSizePlusSpacing}, ${
									Math.trunc(i / columns) * circleTokenSizePlusSpacing
								})`}
							>
								{!obverse ? (
									<>
										{!locked ? (
											<line
												className="non-printable"
												x1={0}
												y1={radius}
												x2={radius * 2}
												y2={radius}
												stroke={!obverse ? "red" : "yellow"}
											/>
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
									</>
								) : (
									<>
										<circle
											cx={radius}
											cy={radius}
											r={radius}
											fill="none"
											stroke={!obverse ? "red" : "green"}
											strokeWidth="0.0762"
											strokeMiterlimit="2.61313"
										/>
										<CircleDetail
											cx={radius}
											cy={radius}
											outerEdgeRadius={radius * 0.8}
											fill="none"
											stroke="black"
											strokeWidth={2}
										/>
									</>
								)}
							</g>
						);
					})}
				</svg>
			</div>
		</>
	);
}
