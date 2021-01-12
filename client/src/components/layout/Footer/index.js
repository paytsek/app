import { Typography } from '@material-ui/core';

const Footer = () => {
	return (
		<footer>
			<Typography align="center" gutterBottom variant="body1">
				PayTsek {new Date().getFullYear()}
			</Typography>
		</footer>
	);
};

export default Footer;
