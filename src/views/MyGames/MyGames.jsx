import React, { useEffect } from 'react'
import style from "./MyGames.module.css"
import * as act from "../../redux/actions"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyGames = () => {

  const games = useSelector(state => state.library);
  console.log(games);
  const dataUser = JSON.parse(localStorage.getItem("user"));
  //console.log(dataUser);
  const ids = dataUser.id;
  const user = dataUser.name;
  //console.log(user);  

  const dispatch = useDispatch()
  
  useEffect(() => {
      dispatch(act.getMyGames(ids))
  }, [ids])

  const handleSend = (game) => {
    //! 1 review por persona
    dispatch(act.mandarAReview(game))
  }

  const handleEdit = (game) => {
    const gameEdit = game;
      if (gameEdit) {
        for (let i = 0; i < gameEdit.Reviews.length; i++) {
          let userEdit = gameEdit.Reviews[i]?.Users[0].name
          if (userEdit === user) {
            const review = gameEdit.Reviews[i]?.reviews;
            const rating = gameEdit.Reviews[i]?.rating;
            const id = gameEdit.Reviews[i]?.id;
            const idGame = gameEdit?.id;
            dispatch(act.getGameReview({review, rating, id, idGame}))
          }
        }
      }
      Swal.fire({
        position: 'center',
        icon: 'question',
        title: 'sin reviews para editar',
        showConfirmButton: false,
        timer: 2000
      })
      return
  }

  const handleDelete = (game) => {
    const gameDelete = game 
    if (gameDelete) {
      for (let i = 0; i < gameDelete.Reviews.length; i++) {
        let userD = gameDelete.Reviews[i]?.Users[0].name
        if (userD === user) {
          let idD = gameDelete.Reviews[i]?.id
          dispatch(act.getDeleteReview(idD))
        }
      }
      Swal.fire({
        position: 'center',
        icon: 'question',
        title: 'No reviews added',
        showConfirmButton: false,
        timer: 2000
      })
      return
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