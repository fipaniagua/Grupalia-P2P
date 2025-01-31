type HandleCloseType = () => void;

interface BidsModalProps {
    open: boolean,
    handleClose: HandleCloseType,
    user: string,
}

export default BidsModalProps