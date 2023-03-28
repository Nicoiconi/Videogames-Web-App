import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getGenres } from "../../../redux/actions/genres";
import { getPlatforms } from "../../../redux/actions/platforms";
import { createVideogame, getAllVideogames } from "../../../redux/actions/videogames";
import "./Create.css"



export default function Create() {
  let history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  // console.log(genres);
  const platforms = useSelector((state) => state.platforms);
  // console.log(platforms);

  const [imgPreview, setImgPreview] = useState();

  const [input, setInput] = useState({
    name: "",
    image: "", // podria agregar opciones para que elegir
    description: "",
    genres: [],
    rating: "",
    platforms: [],
  });

  const handlerImgPreview = async (e) => {
    try {
      const files = e.target.files;
      const base64 = await convertBase64(files[0]);
      setImgPreview(base64);
    } catch (error) {
      console.log(error);
    };
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  async function handleInputChange(e) {
    if (e.target.name === "image") {
      const files = e.target.files;
      const base64 = await convertBase64(files[0]);
      setInput({
        ...input,
        image: base64
      })
    } else {
      setInput({
        ...input,
        [e.target.name]: (e.target.value)
      });
    }
  };
  console.log(input);

  function handleSubmit(e) {
    e.preventDefault(e);
    console.log(input);
    dispatch(createVideogame(input));
    alert("Videogame created!");
    setInput({
      name: "",
      image: "",
      genres: [],
      rating: "",
      platforms: [],
      description: ""
    });
    dispatch(getAllVideogames());
    history.push("/videogames");
  };

  function handleGenresCheck(e) {
    if (!e.target.checked) {
      setInput({
        ...input,
        genres: input.genres.filter(g => g !== e.target.name)
      })
    } else if (e.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.name]
      });
      console.log(input.genres)
    }
  };

  function handlePlatformCheck(e) {
    if (!e.target.checked) {
      setInput({
        ...input,
        platforms: input.platforms.filter(g => g.id !== e.target.name)
      })
    } else if (e.target.checked) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.name]
      })
    }
  };

  function handleDescription(e) {
    console.log(e.target.value);
    setInput({
      ...input,
      description: e.target.value
    });
  };



  return (
    <div className="vista-crear">
      <form
        action="http://localhost:3000/create"
        onSubmit={(e) => handleSubmit(e)}
      >

        <div className="all">


          <div className="left">

            <div className="label-input">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="name" value={input?.name} name="name" onChange={(e) => handleInputChange(e)} />
            </div>

            <div className="acomodo-imagen">
              <div className="label-input" onChange={(e) => handlerImgPreview(e)}>
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" onChange={(e) => handleInputChange(e)} />
              </div>
              <div>
                <img className="img-preview" src={imgPreview ? imgPreview : null} alt="" />
              </div>
            </div>

            <div className="label-input">
              <label htmlFor="rating">Rating:</label>

              <div>
                <input type="radio" id="rating" name="rating" value="1" onChange={(e) => handleInputChange(e)} /> 1
                <input type="radio" id="rating" name="rating" value="2" onChange={(e) => handleInputChange(e)} /> 2
                <input type="radio" id="rating" name="rating" value="3" onChange={(e) => handleInputChange(e)} /> 3
                <input type="radio" id="rating" name="rating" value="4" onChange={(e) => handleInputChange(e)} /> 4
                <input type="radio" id="rating" name="rating" value="5" onChange={(e) => handleInputChange(e)} /> 5
              </div>

            </div>


            <div className="label-input">
              <label htmlFor="desciption">Description</label>
              <input type="text" name="description" onChange={(e) => handleDescription(e)} />
            </div>


            <div className="genres">
              <div>
                <label htmlFor="genres">Genres:</label>

              </div>

              <div className="genresChecks">
                {
                  genres?.map((genre) => {
                    return (
                      <label className="genreLabel"
                        key={genre.id}
                        htmlFor={genre.id}
                      >
                        <input
                          id={genre.id}
                          type="checkbox"
                          value={genre.id}
                          name={genre.name}
                          onChange={(e) => handleGenresCheck(e)}
                        />
                        {`${genre.name} (${genre.id})`}
                      </label>
                    )
                  })
                }

              </div>
            </div>
          </div>

          <div className="right">

            <div>
              Plataforms:
            </div>

            <div className="platformList">

              {
                platforms?.map((p) => {
                  return (
                    <div className="platLabel">
                      <label
                        key={p.id}
                        htmlFor={`checkbox${p}`}
                      >
                        <input
                          type="checkbox"
                          value={p.id}
                          name={p.name}
                          onChange={(e) => handlePlatformCheck(e)}
                        />
                        {`${p.name} (${p.id})`}
                      </label>

                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div className="cargar">

          <button type="submit">
            <p>CREATE</p>
          </button>
        </div>

      </form>
    </div>
  );
};
