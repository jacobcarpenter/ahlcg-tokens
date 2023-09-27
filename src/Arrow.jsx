import { useId } from "react";

import { d } from "./util";

export function Arrow({ length = 42, width = 10, doubleArrow = true }) {
	const id = useId();

	const tokenPointAngle = 28;
	const tokenPointRadius = 1;

	const headInset = 4;
	const headAngle = 24;
	const headBackAngle = 44;
	const headLength = 7;
	const headOverlap = 3;
	const arrowBarWidth = 3;
	const arrowBarCurveFactorY = 0.475;
	const arrowBarCurveFactorX = 0.25;

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

	const arrowBarInset = firstOuterPointX - 0;

	return (
		<g transform={`translate(0,${width / 2})`}>
			<path
				fill="none"
				stroke="red"
				strokeWidth="0.0762"
				strokeMiterlimit="2.61313"
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

			<g>
				<defs>
					<clipPath id={`${id}-clip-right`}>
						<rect
							x={0}
							y={-width / 2}
							width={length - firstOuterPointX}
							height={width}
							fill="black"
						/>
					</clipPath>

					<clipPath id={`${id}-clip-left`}>
						<rect
							x={firstOuterPointX}
							y={-width / 2}
							width={length - firstOuterPointX}
							height={width}
							fill="black"
							clipPath={doubleArrow ? `url(#${id}-clip-right)` : undefined}
						/>
					</clipPath>
				</defs>

				<path
					d={d`
					M${[arrowBarInset, -arrowBarWidth / 2]}
					C${[
						[
							arrowBarInset + (length - 2 * arrowBarInset) * arrowBarCurveFactorX,
							-arrowBarWidth / 2 + arrowBarWidth * arrowBarCurveFactorY,
						],
						[
							length - arrowBarInset - (length - 2 * arrowBarInset) * arrowBarCurveFactorX,
							-arrowBarWidth / 2 + arrowBarWidth * arrowBarCurveFactorY,
						],
						[length - arrowBarInset, -arrowBarWidth / 2],
					]}
					A${tokenPointRadius} ${tokenPointRadius} 0 0 1 ${[length - arrowBarInset, arrowBarWidth / 2]}
					C${[
						[
							length - arrowBarInset - (length - 2 * arrowBarInset) * arrowBarCurveFactorX,
							arrowBarWidth / 2 - arrowBarWidth * arrowBarCurveFactorY,
						],
						[
							arrowBarInset + (length - 2 * arrowBarInset) * arrowBarCurveFactorX,
							arrowBarWidth / 2 - arrowBarWidth * arrowBarCurveFactorY,
						],
						[arrowBarInset, arrowBarWidth / 2],
					]}
					A${tokenPointRadius} ${tokenPointRadius} 0 0 1 ${[arrowBarInset, -arrowBarWidth / 2]}
					Z`}
					stroke="#000"
					strokeWidth="0.0762"
					strokeMiterlimit="2.61313"
					fill="none"
					clipPath={`url(#${id}-clip-left)`}
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
					strokeWidth="0.0762"
					strokeMiterlimit="2.61313"
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
					strokeWidth="0.0762"
					strokeMiterlimit="2.61313"
					fill="#fff"
				/>
			</g>

			{doubleArrow ? (
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
						strokeWidth="0.0762"
						strokeMiterlimit="2.61313"
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
						strokeWidth="0.0762"
						strokeMiterlimit="2.61313"
						fill="#fff"
					/>
				</g>
			) : null}
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
