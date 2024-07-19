import { useUser } from "../../context/UserContext";

const DashboardHeader = () => {
  const { user } = useUser();

  return (
    <div className="top-0 right-0 flex flex-row justify-end w-full pt-3 pb-3 pl-20 pr-10 text-right border-black text-md text-slate-500 bg-slate-200 h-fit border-b-1 shadow-black">
      <h2> {`${user?.username}'s Library`}</h2>
    </div>
  );
};

export default DashboardHeader;
