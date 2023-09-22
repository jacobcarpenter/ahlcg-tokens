import { d } from "./util";

export function Arrow({ length = 60, width = 10 }) {
	const tokenPointAngle = 28;
	const tokenPointRadius = 1;

	const headInset = 4;
	const headAngle = 24;
	const headBackAngle = 44;
	const headLength = 7;
	const headOverlap = 3;

	const arrowHeadY = Math.sin((headAngle * Math.PI) / 180) * headLength;
	const arrowHeadX = Math.cos((headAngle * Math.PI) / 180) * headLength;
	const arrowBackOffsetX = arrowHeadY / Math.tan((headBackAngle * Math.PI) / 180);
	const fullHeadLength = arrowHeadX + arrowBackOffsetX;

	const firstOuterPointY = width / 2;
	const firstOuterPointX = width / 2 / tan(tokenPointAngle);

	// const circleCenterInsetDistance = outerRadius / sin(headAngle);
	const distanceAlongOutsideToTangent = tokenPointRadius / tan(tokenPointAngle);

	const xOffsetToTangent = distanceAlongOutsideToTangent * cos(tokenPointAngle);
	const yOffsetToTangent = distanceAlongOutsideToTangent * sin(tokenPointAngle);

	return (
		<g transform={`translate(0,${width / 2})`}>
			<path
				fill="none"
				stroke="red"
				strokeWidth="0.1"
				d={d`
					M${[xOffsetToTangent, -yOffsetToTangent]}
					L${[firstOuterPointX, -firstOuterPointY]}
					 ${[length - firstOuterPointX, -firstOuterPointY]}
					 ${[length - xOffsetToTangent, -yOffsetToTangent]}
					A${tokenPointRadius} ${tokenPointRadius} 0 0 1 ${[length - xOffsetToTangent, yOffsetToTangent]}
					L${[length - firstOuterPointX, firstOuterPointY]}
					 ${[firstOuterPointX, firstOuterPointY]}
					 ${[xOffsetToTangent, yOffsetToTangent]}
					A${tokenPointRadius} ${tokenPointRadius} 0 0 1 ${[xOffsetToTangent, -yOffsetToTangent]}
					Z
				`}
			/>

			<line
				x1={headInset + headOverlap + headLength}
				y1={0}
				x2={length - headInset - headOverlap - headLength}
				y2={0}
				stroke="#000"
				strokeWidth="1"
			/>

			<g transform={`translate(${length - headInset}, 0) scale(-1 1)`}>
				<path
					d={d`
						M${[0, 0]}
						Q${[arrowHeadX * 0.6, -arrowHeadY * 0.2]} ${[arrowHeadX, -arrowHeadY]}
						L${[fullHeadLength, 0]}
						 ${[arrowHeadX, arrowHeadY]}
						Q${[arrowHeadX * 0.6, arrowHeadY * 0.2]} ${[0, 0]}
						Z`}
					stroke="#000"
					strokeWidth="0.1"
					fill="#fff"
					transform={`translate(${headOverlap}, 0)`}
				/>
				<path
					d={d`
						M${[0, 0]}
						Q${[arrowHeadX * 0.6, -arrowHeadY * 0.2]} ${[arrowHeadX, -arrowHeadY]}
						L${[fullHeadLength, 0]}
						 ${[arrowHeadX, arrowHeadY]}
						Q${[arrowHeadX * 0.6, arrowHeadY * 0.2]} ${[0, 0]}
						Z`}
					stroke="#000"
					strokeWidth="0.1"
					fill="#fff"
				/>
			</g>

			<g transform={`translate(${headInset}, 0)`}>
				<path
					d={d`
						M${[0, 0]}
						Q${[arrowHeadX * 0.6, -arrowHeadY * 0.2]} ${[arrowHeadX, -arrowHeadY]}
						L${[fullHeadLength, 0]}
						 ${[arrowHeadX, arrowHeadY]}
						Q${[arrowHeadX * 0.6, arrowHeadY * 0.2]} ${[0, 0]}
						Z`}
					stroke="#000"
					strokeWidth="0.1"
					fill="#fff"
					transform={`translate(${headOverlap}, 0)`}
				/>
				<path
					d={d`
						M${[0, 0]}
						Q${[arrowHeadX * 0.6, -arrowHeadY * 0.2]} ${[arrowHeadX, -arrowHeadY]}
						L${[fullHeadLength, 0]}
						 ${[arrowHeadX, arrowHeadY]}
						Q${[arrowHeadX * 0.6, arrowHeadY * 0.2]} ${[0, 0]}
						Z`}
					stroke="#000"
					strokeWidth="0.1"
					fill="#fff"
				/>
			</g>
		</g>
	);
}

function sin(deg) {
	return Math.sin((deg * Math.PI) / 180);
}

function cos(deg) {
	return Math.cos((deg * Math.PI) / 180);
}

function tan(deg) {
	return Math.tan((deg * Math.PI) / 180);
}
