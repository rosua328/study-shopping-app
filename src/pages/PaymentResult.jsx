import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function PaymentResult() {
  const {
    state: { orderItem },
  } = useLocation();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/order/${orderItem.id}`, { state: { orderItem } });
  };

  return (
    <div className=" flex flex-col items-center bg-green mt-32">
      <span className="text-3xl mb-6">주문성공</span>
      <Button onClick={handleClick} text="주문내역 보기">
        주문내역 보기
      </Button>
    </div>
  );
}
