import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(4)
  }
}))

const Footer = () => {
  const { footer } = useStyles()

	return (
		<footer className={footer}>
			<Typography align="center" gutterBottom variant="body1">
				PayTsek {new Date().getFullYear()}
			</Typography>
		</footer>
	);
};

export default Footer;
