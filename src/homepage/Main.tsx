export const Main = () => {
  return (
    <main className="flex flex-col justify-center items-center flex-grow">
      <div className="text-center  bg-white bg-opacity-70 p-8 rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-4xl flex flex-col font-berkshire-swash font-bold m-0 bg-gradient-to-r from-blue-900 via-green-900 via-red-900 to-purple-900 bg-clip-text text-transparent animate-gradient">
          Task-Tide
          <span className="font-normal text-black ">
            Your Kanban Companion for Efficient Task Management.
          </span>
        </h1>
        <p className=" text-3xl text-violet-700 font-alkatra font-bold mt-4">
          TaskTide simplifies task management with Kanban boards, tasks, and
          to-do lists. Stay organized, boost productivity, and accomplish more
          with TaskTide. Start today!
        </p>
      </div>
      <div className="mt-8 flex space-x-4">
        <a
          href="/signup"
          className="btn font-bold tracking-wider border-2 border-white text-white bg-transparent py-4 px-6 text-center no-underline text-base mt-10 transition-all duration-500 ease-in-out rounded-3xl hover:bg-white hover:text-black hover:text-2xl"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="btn font-bold tracking-wider border-2 border-white text-white bg-transparent py-4 px-6 text-center no-underline text-base mt-10 transition-all duration-500 ease-in-out rounded-3xl hover:bg-white hover:text-black hover:text-2xl"
        >
          Login
        </a>
      </div>
    </main>
  );
};
