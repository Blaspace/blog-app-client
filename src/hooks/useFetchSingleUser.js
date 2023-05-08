function useFetchSingleUser() {
  const handleFetchUser = (userId, db) => {
    fetch(`http://localhost:3500/singleuser/${userId}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => db(data));
  };
  return handleFetchUser;
}

export default useFetchSingleUser;
