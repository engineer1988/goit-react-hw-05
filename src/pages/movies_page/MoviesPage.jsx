import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSearchMovie } from '../../fetch_data';
import Loader from '../../components/loader/Loader';
import toast from 'react-hot-toast';
import { IoMdNotifications } from 'react-icons/io';
import ErrorMessage from '../../components/error_message/ErrorMessage';
import css from './MoviesPage.module.css';

const notify = () =>
  toast('Whoops, something went wrong! Please try reloading this page!', {
    icon: <IoMdNotifications />,
    style: {
      borderRadius: '10px',
      background: 'red',
      color: '#fff',
    },
  });

const MoviesPage = () => {
  const [user, setUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

  // useEffect(() => {
  //   // Тут виконуємо асинхронну операцію,
  //   // наприклад HTTP-запит за інформацією про користувача
  //   if (search === '') return;

  //   async function fetchUser() {
  //     const user = await FakeAPI.getUser(username);
  //     setUser(user);
  //   }

  //   fetchUser();
  // }, [username]);
  useEffect(() => {
    const loadSearchMovie = async () => {
      try {
        setLoading(true);
        const resData = await fetchSearchMovie(search);
        setMovieCast(resData);
      } catch (error) {
        setError(true);
        notify();
      } finally {
        setLoading(false);
      }
    };
    loadSearchMovie();
  }, [search]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ username: form.elements.username.value });
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
    </>
  );
};
export default MoviesPage;
