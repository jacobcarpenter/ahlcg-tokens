import { d } from "./util";

export function Arrow({
	length = 45,
	headAngle = 16,
	headBackAngle = 44,
	headLength = 6,
	headOverlap = 3,
	outerPadding = 2,
	outerRadius = 0.75,
}) {
	const arrowHeadY = Math.sin((headAngle * Math.PI) / 180) * headLength;
	const arrowHeadX = Math.cos((headAngle * Math.PI) / 180) * headLength;

	// tan(headBackAngle) = arrowHeadY / ?
	// ? = arrowHeadY / tan(headBackAngle)
	const arrowBackOffsetX = arrowHeadY / Math.tan((headBackAngle * Math.PI) / 180);
	const fullHeadLength = arrowHeadX + arrowBackOffsetX;

	// tan (headAngle / 2) = outerRadius / ???
	// ??? = outerRadius / tan(headAngle/2)

	// sin (headAngle / 2) = outerRadius / hyp
	// hyp = outerRadius / sin(headAngle/2)

	return (
		<>
			<path
				d={d`
					M${-outerPadding},0
					L${headOverlap},${-outerPadding}
					 ${length - headOverlap},${-outerPadding}
					 ${length + outerPadding},0
					 ${length - headOverlap},${outerPadding}
					 ${headOverlap},${outerPadding}Z`}
				stroke="red"
				strokeWidth="0.1"
				fill="none"
			/>

			{/* <circle
				cx={-outerPadding - outerRadius + outerRadius / Math.sin((headAngle * Math.PI) / 180)}
				cy={0}
				r={outerRadius}
				stroke="none"
				fill="purple"
			/> */}

			<line x1="0" y1="0" x2={length} y2="0" stroke="#000" strokeWidth="0.1" />

			<path
				d={d`
					M0,0
					Q${arrowHeadX * 0.6},${-arrowHeadY * 0.2}
					 ${arrowHeadX},${-arrowHeadY}
					L${fullHeadLength},0
					 ${arrowHeadX},${arrowHeadY}
					Q${arrowHeadX * 0.6},${arrowHeadY * 0.2}
					 0,0Z`}
				stroke="#000"
				strokeWidth="0.1"
				fill="#fff"
			/>
			<path
				d={d`
					M0,0
					Q${arrowHeadX * 0.6},${-arrowHeadY * 0.2}
					 ${arrowHeadX},${-arrowHeadY}
					L${fullHeadLength},0
					 ${arrowHeadX},${arrowHeadY}
					Q${arrowHeadX * 0.6},${arrowHeadY * 0.2}
					 0,0Z`}
				stroke="#000"
				strokeWidth="0.1"
				fill="#fff"
				transform={`translate(${headOverlap}, 0)`}
			/>
			<path
				d={d`
					M0,0
					Q${arrowHeadX * 0.6},${-arrowHeadY * 0.2}
					 ${arrowHeadX},${-arrowHeadY}
					L${fullHeadLength},0
					 ${arrowHeadX},${arrowHeadY}
					Q${arrowHeadX * 0.6},${arrowHeadY * 0.2}
					 0,0Z`}
				stroke="#000"
				strokeWidth="0.1"
				fill="#fff"
				transform={`translate(${length}, 0) scale(-1 1)`}
			/>
			<path
				d={d`
					M0,0
					Q${arrowHeadX * 0.6},${-arrowHeadY * 0.2}
					 ${arrowHeadX},${-arrowHeadY}
					L${fullHeadLength},0
					 ${arrowHeadX},${arrowHeadY}
					Q${arrowHeadX * 0.6},${arrowHeadY * 0.2}
					 0,0Z`}
				stroke="#000"
				strokeWidth="0.1"
				fill="#fff"
				transform={`translate(${length - headOverlap}, 0) scale(-1 1)`}
			/>
			{/* <polygon
                points={`0,0 ${arrowBackOffsetX / 2},${arrowHeadY / 2}, ${arrowBackOffsetX},0 ${
                    arrowBackOffsetX / 2
                },${-arrowHeadY / 2}`}
                stroke="#000"
                strokeWidth="0.1"
                fill="#fff"
                transform={`translate(${fullHeadLength + headOverlap - arrowBackOffsetX / 2}, 0)`}
            />
            <polygon
                points={`0,0 ${arrowBackOffsetX / 2},${arrowHeadY / 2}, ${arrowBackOffsetX},0 ${
                    arrowBackOffsetX / 2
                },${-arrowHeadY / 2}`}
                stroke="#000"
                strokeWidth="0.1"
                fill="#fff"
                transform={`translate(${
                    length - (fullHeadLength + headOverlap) - arrowBackOffsetX / 2
                }, 0)`}
            /> */}

			{/* <g transform="rotate(-1, 200, 100)">
                <line x1="100" y1="100" x2="300" y2="100" stroke="#000" />
            </g>
            <line x1="263" y1="90" x2="311" y2="100" stroke="#000" />
            <g transform={`rotate(2, ${(311 + 263) / 2}, ${(90 + 100) / 2})`}>
                <line x1="263" y1="90" x2="311" y2="100" stroke="#000" />
            </g>
            <line x1="263" y1="110" x2="311" y2="100" stroke="#000" />
            <g transform={`rotate(-4, ${(311 + 263) / 2}, ${(90 + 100) / 2})`}>
                <line x1="263" y1="110" x2="311" y2="100" stroke="#000" />
            </g> */}
		</>
	);
}
