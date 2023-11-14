import { Modal } from "antd";
import { AiOutlineUnlock } from "react-icons/ai";
import Link from "next/link";

function UpgradeModal({ visible }) {
  return (
    <Modal title={""} visible={visible} footer={null}>
      <div className="flex justify-between">
        <div className="w-10 h-10 rounded-full bg-gray flex items-center justify-center">
          <AiOutlineUnlock size={20} />
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">
            Upgrade to analyze more creators
          </h1>
          <span className="text-sm opacity-50">
            Get detailed insights on each creator, and share them with your team
            or clients.
          </span>
          <Link
            href={{
              pathname: "/plan&billing",
              query: { tab: "3" },
            }}
            className={`rounded-md py-1 px-3 my-3 w-fit`}
            style={{
              background:
                "linear-gradient(270.75deg, #FF5B84 -51.86%, #4254FF 107.54%)",
              color: "white",
              fontWeight: 400,
            }}
          >
            See plans
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default UpgradeModal;
