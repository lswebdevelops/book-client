import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SingleBook() {
  const serverUrl = import.meta.env.VITE_SERVER_URL
  
  const urlSlug = useParams();
  const baseUrl = `${serverUrl}/api/books/${urlSlug.slug}`;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  function StarRating ({ numberOfStars }) {
    const stars = []

    for(let i = 0; i <numberOfStars; i++){
        stars.push(<span key={i}>⭐</span>)
    }
    return <div>Rating: {stars}</div>
  }



  return (
    <div>
      {/* <pre>{JSON.stringify(data,null, 2)}</pre> */}

      <Link to={"/books"}>🔙Books</Link>

      <div className="bookdetails">
        <div className="col-1">
            <img className="img-single-book" src={`${serverUrl}/uploads/${data.thumbnail}`} alt={data.title} />
            <hr />
            <Link to={`/editbook/${data.slug}`}>Edit/Delete</Link>
        </div>
        <div className="col-2">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {/* <p>Stars: {data?.stars}</p>  */}
            <StarRating numberOfStars={data?.stars} />
            <p>Category </p>
            <ul>
                {data?.category?.map((item, index)=> (
                    <li key={index}>{item.toUpperCase()}</li>
                ))}
            </ul>           
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
