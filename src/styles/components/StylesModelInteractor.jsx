const StylesModelInteractor = theme => ({
    container: {
        display: 'flex',
        borderBottom: "1px solid",
        borderBottomColor: theme.border.light,
        cursor: 'pointer',
    },
    content: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: theme.spacing.unit * 2,
    },
});

export default StylesModelInteractor;