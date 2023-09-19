import logo from "../../assets/images/logo.png";

export const Header = () => {
  return (
    <nav className="text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <img alt="logo" src={logo} className="w-20 mr-2" />
        <div className="font-permanent-marker text-4xl font-bold">
          <span className="text-green-400">Task</span>
          <span className="text-blue-500">Tide</span>
        </div>
      </div>
    </nav>
  );
};
