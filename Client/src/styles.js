import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'start',
        alignItems: 'center',
    },
    heading: {
        color: 'rgba(0,153,255, 1)',
    },
    image: {
        marginLeft: '15px',
        marginRight: '20px'
    },
}))