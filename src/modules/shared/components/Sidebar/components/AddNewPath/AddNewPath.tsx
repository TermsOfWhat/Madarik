import { PlusOutlined } from "@ant-design/icons";
import { PATH } from "@src/modules/chat/routes/paths";
import { useNavigate } from "react-router-dom";

function AddNewPath() {
  const navigate = useNavigate();
  return (
    <div className="add-new-path" onClick={() => navigate(PATH.CHAT)}>
      <PlusOutlined /> New Path
    </div>
  );
}

export default AddNewPath;
