function Spinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-2">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}

export default Spinner;
