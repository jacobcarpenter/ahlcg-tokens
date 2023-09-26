import { CircleDetail } from "./CircleDetail";

export function RandomStar({ radius, rng, layers, points, radiusScale, onClick }) {
	const numLayers = rng.int(...layers);
	const numPoints = rng.int(...points);
	const offsets = Array.from({ length: numLayers }, () => [
		rng.int(numPoints % 2 === 0 ? 1 : 0, numPoints - 1),
		rng.float(...radiusScale),
	]);

	return <Star radius={radius} points={numPoints} offsets={offsets} onClick={onClick} />;
}

function Star({ radius, points, offsets, onClick }) {
	const innerRadius = radius * 0.75;
	// TODO: figure out how to know when you get back to where you started
	// TODO: random inner circle radii
	// TODO: random inner star radii (aligned points)

	return (
		<g onClick={onClick}>
			<circle
				cx="0"
				cy="0"
				r={radius}
				fill="none"
				stroke="red"
				strokeWidth="0.0762"
				strokeMiterlimit="2.61313"
			/>
			<CircleDetail
				cx="0"
				cy="0"
				outerEdgeRadius={radius * 0.8}
				fill="none"
				stroke="black"
				strokeWidth={1}
			/>
			{offsets.map(([offset, radiusScale], i) => (
				<StarLayer
					key={`${i};${offset}`}
					points={points}
					offset={offset}
					radius={innerRadius * radiusScale}
				/>
			))}
		</g>
	);
}

function StarLayer({ points, offset, radius }) {
	// lines radiating from the center
	if (offset === 0) {
		return (
			<g>
				{Array.from({ length: points }).map((_, i, arr) => {
					const angle = (i * Math.PI * 2) / arr.length;
					const x1 = radius * Math.cos(angle);
					const y1 = radius * Math.sin(angle);
					return (
						<line
							key={i}
							x1={x1}
							y1={y1}
							x2={0}
							y2={0}
							stroke="#000"
							strokeWidth="0.0762"
							strokeMiterlimit="2.61313"
						/>
					);
				})}
			</g>
		);
	}

	// in the special case of lines passing through the center with an even number of points,
	// we only need to draw half as many lines
	const steps = points % 2 === 0 && offset === points / 2 ? points / 2 : points;

	return (
		<g>
			{Array.from({ length: steps }).map((_, i) => {
				const angle = (i * Math.PI * 2) / points;
				const angle2 = ((i + offset) * Math.PI * 2) / points;

				const x1 = radius * Math.cos(angle);
				const y1 = radius * Math.sin(angle);

				const x2 = radius * Math.cos(angle2);
				const y2 = radius * Math.sin(angle2);

				//console.log({ x1, y1, x2, y2 });

				return (
					<line
						key={i}
						x1={x1}
						y1={y1}
						x2={x2}
						y2={y2}
						stroke="#000"
						strokeWidth="0.0762"
						strokeMiterlimit="2.61313"
					/>
				);
			})}
		</g>
	);
}
