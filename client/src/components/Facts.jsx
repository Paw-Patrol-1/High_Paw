import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Default from "../components/assets/Default.jpg";

function Facts() {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds");
        const data = await res.json();
        console.log(data);
        setDogs(data);
      } catch (error) {
        console.error(error);
      }
    };

    setSearched(false);
    fetchDogData();
  }, []);

  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      );
      const data = await res.json();

      setDogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchForDog();
    setSearched(true);
  };

  return (
    <div className="w-screen">
      {!dogs ? (
        <h1 className="flex items-center justify-center text-black text-center px-5 text-3xl h-screen font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <>
          <section className="p-8 w-full">
            <div className=" h-20 flex justify-center  my-auto border border-red-600">
              <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center w-full "
                autoComplete="off"
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search for a dog by breed..."
                  className="w-11/12 md:w-8/12 border rounded-md p-2  h-10 text-sm focus:outline-green-500 transition  shadow-md cursor-pointer hover:border-green-400"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                {/* <input
                  type="text"
                  placeholder="Search hangouts by user..."
                  className="w-11/12 md:w-8/12 border rounded-md px-4 py-2 mt-10 focus:outline-green-500 transition text-xs shadow-md cursor-pointer hover:border-green-400"
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
              </form>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2 my-10 lg:my-20">
              {!searched ? (
                dogs.map((dog) => (
                  <Link
                    to={`/${dog.name}`}
                    key={dog.id}
                    className="p-4 rounded hover:bg-slate-200 transition-all duration-200"
                  >
                    <article>
                      <img
                        src={dog.image.url}
                        alt={dog.name}
                        loading="lazy"
                        className="rounded md:h-72 w-full object-cover"
                        onError={(e) => {
                          e.target.src = Default;
                        }}
                      />
                      <h3 className="text-black text-lg font-bold mt-4">
                        {dog.name}
                      </h3>
                      <p className=" text-slate-800">
                        Bred For: {dog.bred_for}
                      </p>
                    </article>
                  </Link>
                ))
              ) : (
                <>
                  {dogs.map((dog) => (
                    <Link
                      to={`/${dog.name}`}
                      key={dog.id}
                      className="p-4 rounded hover:bg-slate-200 transition-all duration-200"
                    >
                      <article>
                        <img
                          src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                          alt={dog.name}
                          className="rounded md:h-72 w-full object-cover"
                          onError={(e) => {
                            e.target.src = Default;
                          }}
                        />
                        <h3 className="text-black text-lg font-bold mt-4">
                          {dog.name}
                        </h3>
                        <p className="text-slate-800">
                          Bred For: {dog.bred_for}
                        </p>
                      </article>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
export default Facts;
