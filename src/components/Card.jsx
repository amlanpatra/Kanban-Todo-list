function Card({ title, body }) {
  const avatarSource =
    "https://img.freepik.com/free-photo/painting-flowers-with-purple-flower-left_1340-23754.jpg?w=740&t=st=1687159532~exp=1687160132~hmac=ba144e085649dc175635b9fff5c3eab188958a20b0daec6a9ccf02445fd6dde0";

  return (
    // <div className="cardLayout w-[250px] ">
    <div className="cardLayout">
      {/* header portion starts */}
      <div className="cardHeader flex justify-between items-center cursor-pointer">
        <div className="priority bg-red-300 p-1 m-1 rounded h-[30%] text-red-500 font-normal text-xs">
          Low
        </div>
        <div className="options m-1 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </div>
      </div>
      {/* header ends */}

      {/* title  */}
      <div className="title text-black font-bold flex-wrap m-1 p-1">
        {title || `Untitled`}
      </div>

      {/* body  */}
      <div className="cardBody text-xs m-1 p-1 mb-2 text-slate-600">
        {body || "Write here..."}
      </div>

      {/* footer portion starts*/}
      <div className="footer flex items-center text-center justify-between">
        <div className="contributors flex -space-x-2 overflow-hidden m-1 p-1">
          <img
            className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
            src={avatarSource}
            alt="users"
          />
          <img
            className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
            src={avatarSource}
            alt="users"
          />

          <img
            className="inline-block h-5 w-5 rounded-full ring-2 ring-white"
            src={avatarSource}
            alt="users"
          />
        </div>

        <div className="commentSection flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.0"
            stroke="currentColor"
            className="w-4 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <span className="comments text-slate-600 text-xs m-1">
            5 comments
          </span>
        </div>

        <div className="files flex text-xs text-slate-600 m-1 items-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-folder"
            viewBox="0 0 16 16"
          >
            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
          </svg>
          <span className="fileDetails m-1">0 files</span>
        </div>
      </div>
    </div>
  );
}
export default Card;
