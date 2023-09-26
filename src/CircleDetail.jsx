export function CircleDetail({ outerEdgeRadius, strokeWidth, ...params }) {
	return <circle r={outerEdgeRadius - strokeWidth / 2} strokeWidth={strokeWidth} {...params} />;
}
