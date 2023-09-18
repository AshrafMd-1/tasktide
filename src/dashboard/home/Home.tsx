import { DashboardContainer } from "../DashboardContainer";

export const Home = () => {
  return (
    <DashboardContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">dvdfd</h1>
        <div className="flex justify-between items-center mb-4"></div>
      </div>
      <div className="bg-white rounded-3xl p-8 mb-5">
        <hr className="my-10" />
        <div className="grid grid-cols-2 gap-x-20"></div>
      </div>
    </DashboardContainer>
  );
};
