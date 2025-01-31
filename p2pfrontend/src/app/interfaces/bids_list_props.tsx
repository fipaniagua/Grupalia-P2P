import Bid from "./bid";

interface BidsListProps {
    pageType: string,
    bids: Bid[];
    setBidSelected: React.Dispatch<React.SetStateAction<number>>
}

export default BidsListProps