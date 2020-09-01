export default () => ({
  layout: {
    display: 'flex'
  },
  paperWrap: {
    maxWidth: 595,
    margin: 'auto',
    transform: 'translateY(20%)',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    padding: [56, 132, 76, 132],
    boxSizing: 'border-box',
  },
});
