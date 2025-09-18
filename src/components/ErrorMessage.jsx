function ErrorMessage({ message, type = 'error' }) {
  if (!message) return null;

  const styles = {
    error: 'bg-red-100 text-red-600 border border-red-400',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-400',
    info: 'bg-blue-100 text-blue-600 border border-blue-400',
  };

  return (
    <div
      className={`inline-block p-2 rounded-md text-sm text-center ${styles[type]}`}
      role="alert"
    >
      {message}
    </div>
  );
}

export default ErrorMessage;
