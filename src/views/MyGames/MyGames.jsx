import React, { useEffect } from 'react'
import style from "./MyGames.module.css"
import * as act from "../../redux/actions"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MyGames = () => {

  const games = useSelector(state => state.library);
  const dataUser = JSON.parse(localStorage.getItem("user"));
  const ids = dataUser.id;
  const name = dataUser.name;
  console.log(games);  

  const dispatch = useDispatch()
  
  useEffect(() => {
      dispatch(act.getMyGames(ids))
  }, [ids])

  const handleSend = (game) => {
    dispatch(act.mandarAReview(game))
  }

  const handleEdit = (game) => {
    const gameEdit = game
    //! mañana agregar el resto de estados
      if (gameEdit) {
        console.log(gameEdit);
        const review = gameEdit.Reviews[0]?.reviews
        console.log(review);
        const rating = gameEdit.Reviews[0]?.rating
        const id = gameEdit.Reviews[0]?.id
        const idGame = gameEdit?.id
        console.log(review, rating, id, idGame);
        dispatch(act.getGameReview({review, rating, id, idGame}))
      }
  }

  const handleDelete = (game) => {
    const gameDelete = game
      console.log(gameDelete);
    if (gameDelete) {
      const idRev = gameDelete.Reviews[0]?.id
      console.log(idRev);
      dispatch(act.getDeleteReview(idRev))
  }
}

    
    //! agregar la ruta al detail
    return (
        <div className={style.container}>
        <div className={style.cardContainer}>
          
          {games && games.map((game) => 
          (
            <div className={style.card} key={game.id}>
              <Link to={`detail/${game.id}`}>
              <img className={style.image} src={game.header_image} alt={game.name} />
              </Link>
              <h4 className={style.titleName}>{game.name}</h4>
              <p className={style.titleName}>{game.release_date}</p>
              <div className={style.buttons}>
                <Link to={"/review"}>
                    <button className={style.button} onClick={() => handleSend(game)}>New Review</button>
                </Link>
                <Link to={`/detail/reviews/${game.id}`}>
                    <button className={style.button} onClick={() => {handleEdit(game)}}>Edit Review</button>
                </Link>
                <button className={style.buttonBorrar} onClick={() => handleDelete(game)}>x</button>
              </div>
            </div>
          ))}
        </div>
        <div className={style}>
        </div>
      </div>
    );
  }

export default MyGames;