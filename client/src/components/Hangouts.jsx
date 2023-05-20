// import React from "react";
// import { UserContext } from "../App";
// import { useContext, useEffect, useState } from "react";
// import SmallMap from "./SmallMap";
// import { Link } from "react-router-dom";
// // import "tailwindcss/tailwind.css";

// function Hangouts() {
//   const [hangouts, setHangouts] = useState([]);
//   const { user } = useContext(UserContext);
//   useEffect(() => {
//     // if user is null, redirect to login page
//     // delete later
//     if (!user) {
//       window.location.href = "/login";
//     }
//   }, [user]);

//   useEffect(() => {
//     const getHangouts = async () => {
//       const response = await fetch("http://localhost:8000/hangout/all", {
//         headers: {
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//       });
//       const data = await response.json();
//       setHangouts(data.hangouts);
//       // console.log(data);
//     };
//     getHangouts();
//   }, []);

//   const updateHangout = (id) => {
//     console.log(id);
//   };

//   const deleteHangout = async (id) => {
//     const response = await fetch(`http://localhost:8000/hangout/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${user.accessToken}`,
//       },
//     });
//     const data = await response.json();
//     console.log(data);
//     window.location.reload();
//   };
//   return (
//     <div className="h-screen ">
//       {hangouts.map((hangout, index) => (
//         <div
//           className={` shadow-md w-8/12 h-52 bg-white rounded-md m-auto mt-20 flex justify-between ${
//             index % 2 === 0 ? "flex-row-reverse" : "flex-row"
//           }`}
//           key={hangout._id}
//         >
//           <div className="hangout  w-3/4 px-6 ">
//             <Link to={`/hangout/${hangout._id}`}>
//               <h2 className="title text-3xl text-stone-700 underline mb-6">
//                 {hangout.title}
//               </h2>
//             </Link>
//             <p className="description text-stone-600 text-sm">
//               {hangout.description}
//             </p>
//             {/* <p>{hangout.userId}</p> */}
//           </div>
//           <div className="img   w-3/12 h-auto ">
//             {/* <img src={hangout.img} alt="hangout" /> */}
//             <SmallMap latLong={hangout.latLong} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Hangouts;

import { useContext, useEffect, useState } from "react";
import SmallMap from "./SmallMap";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import ReactPaginate from "react-paginate";

function Hangouts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hangouts, setHangouts] = useState([]);
  const { user } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2; // Change this value to the desired number of items per page

  useEffect(() => {
    // if user is null, redirect to login page
    // delete later
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  useEffect(() => {
    const getHangouts = async () => {
      const response = await fetch(
        `https://high-paw-production.up.railway.app/hangout/all?page=${
          currentPage + 1
        }&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setHangouts(data.hangouts);
    };
    getHangouts(); // Call the getHangouts function to fetch the hangouts data
  }, [currentPage, itemsPerPage, user.accessToken]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // const updateHangout = (id) => {
  //   console.log(id);
  // };

  // const deleteHangout = async (id) => {
  //   const response = await fetch(`http://localhost:8000/hangout/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${user.accessToken}`,
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   window.location.reload();
  // };
  return (
    <div className="parent-container w-screen">
      <div className="search flex justify-center">
        <input
          type="text"
          placeholder="Search hangouts by user..."
          className=" w-8/12 border rounded-md px-4 py-2 mt-10 focus:outline-green-500 transition text-xs shadow-md cursor-pointer hover:border-green-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {hangouts
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        // needs to be fixed
        // filter by user name to show hangouts created by that user

        .filter((hangout) => {
          if (searchTerm === "") {
            return hangout;
          } else if (
            hangout.userId === searchTerm ||
            user.user._id.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return setSearchTerm(hangout);
          }
        })

        .map((hangout, index) => (
          <div
            className={` shadow-md w-8/12 h-52 bg-white rounded-md m-auto mt-16 flex justify-between  border-l-2 border-t border-green-500 ${
              index % 2 === 0 ? "flex-row-reverse" : "flex-row"
            }`}
            key={hangout._id}
          >
            <div className="hangout  w-3/4 px-6 ">
              <Link to={`/hangout/${hangout._id}`}>
                <h2 className="title text-3xl text-stone-700 underline mb-6">
                  {hangout.title}
                </h2>
              </Link>
              <p className="description text-stone-600 text-sm">
                {hangout.description}
              </p>
              {/* <p>{hangout.userId}</p> */}
            </div>
            <div className="img   w-3/12 h-auto ">
              {/* <img src={hangout.img} alt="hangout" /> */}
              <SmallMap latLong={hangout.latLong} />
            </div>
          </div>
        ))}

      <ReactPaginate
        className="flex justify-center mt-6 gap-4 "
        pageCount={Math.ceil(hangouts.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="text-green-500 font-bold scale-150"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="text-green-500 border border-green-500 rounded-md px-4 py-2 m-2 hover:bg-green-500 hover:text-white transition-all"
        nextClassName="page-item"
        nextLinkClassName="text-green-500 border border-green-500 rounded-md px-4 py-2 m-2 hover:bg-green-500 hover:text-white transition-all"
      />
    </div>
  );
}

export default Hangouts;
