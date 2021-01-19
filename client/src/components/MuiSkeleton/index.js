import Skeleton from '@material-ui/lab/Skeleton';

const MuiSkeletong = (style, sk1, sk2, sk3, sk4) => {
	return (
		<div style={style}>
			<Skeleton {...sk1} height={120} />
			<Skeleton {...sk2} height={40} />
			<Skeleton {...sk3} />
			<Skeleton {...sk4} />
			<Skeleton />
		</div>
	);
};

export default MuiSkeletong;
