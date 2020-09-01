import { withStyles } from '@material-ui/core';
// import { compose } from 'ramda';
// import { connect } from 'react-redux';

// import { getExpanded } from '@/features/auth/selectors';

import Root from './component';
import styles from './styles';

// const mapStateToProps = state => ({
//   expanded: getExpanded(state),
// });

export default withStyles(styles)(Root);