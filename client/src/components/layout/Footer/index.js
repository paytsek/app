import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	footer: {
		padding: theme.spacing(4),
	},
}));

const Footer = () => {
	const { footer } = useStyles();

	return (
		<footer className={footer}>
			<Container>
				<Typography align="right" gutterBottom variant="body1">
					Copyright © PayTsek {new Date().getFullYear()}.
				</Typography>
			</Container>
		</footer>
	);
};

export default Footer;
