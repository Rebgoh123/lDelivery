const Styles = theme => ({
    success: {
        color: theme.palette.common.white,
        backgroundColor: theme.status.success[500],
        '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.status.success[600],
        },
    },
});

export default Styles;