import { useRef } from "react";

export function Test() {
	const svgRef = useRef();
	function handleCopy() {
		navigator.clipboard.writeText(svgRef.current?.outerHTML);
	}

	return (
		<div>
			<div>
				<button onClick={handleCopy}>Copy</button>
			</div>
			<svg
				ref={svgRef}
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				width="215.9mm"
				height="279.4mm"
				version="1.1"
				shapeRendering="geometricPrecision"
				textRendering="geometricPrecision"
				imageRendering="optimizeQuality"
				fillRule="evenodd"
				clipRule="evenodd"
				viewBox="0 0 215.9 279.4"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				{...{
					"xmlns:xodm": "http://www.corel.com/coreldraw/odm/2003",
				}}
			>
				<g>
					<rect
						fill="none"
						stroke="#373535"
						strokeWidth="0.0762"
						strokeMiterlimit="2.61313"
						x="27.7004"
						y="22.4309"
						width="37.0196"
						height="29.226"
					/>
					<polygon
						fill="none"
						stroke="#373535"
						strokeWidth="0.0762"
						strokeMiterlimit="2.61313"
						points="120.2493,22.918 80.3071,24.8664 121.2234,44.8375 "
					/>
				</g>
			</svg>
		</div>
	);
}
