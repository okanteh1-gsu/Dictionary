import { useState } from 'react';
import './searchBar.css';
import searchIcon from '../assets/images/icon-search.svg';
import play from '../assets/images/icon-play.svg';
import axios from 'axios';

export default function SearchBar() {
  const [searchWord, setSearchWord] = useState('');
  const [words, setWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setPlaying] = useState(false)
  const [error, setError] = useState('')
  // const url =words && words.phonetics && words.phonetics[0].audio
  const url = words?.phonetics?.[0]?.audio;
  function playAudio(){
    if(url){
      const audio = new Audio(url)
      setPlaying(!isPlaying)
      if(isPlaying === true){
        audio.play()
      }
      else{
        audio.pause()
      }
    }
    }

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord.toLowerCase()}`);
      const data = res.data[0]
      setWord(data)
      setError('')

      
      
    } catch (err) {
      setError(err.message)
      setWord(null)
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchWord(e.target.value); 
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await fetchData();  
    }
  };

  return (
    <>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search For word...'
          onChange={handleSearch}
          onKeyDown={handleKeyPress}
          value={searchWord}
        />
        <img className='search-icon' src={searchIcon} alt='Search Icon' />
      </div>
      {error && <div id='error-msg'><p>Sorry, we couldn't find any definitions for the word you were looking for. 😞 Please try another word or check back later.</p></div>}
      {(loading) ? (
        <div className='loader'></div>
      ) : words ? (
        <>
          <div className='text-content'>
            <h2>{words.word}</h2>
            <img onClick={playAudio} src={play} alt='Play Icon' />
          </div>
          <span style={{color: '#a21caf', fontSize: 20}} >{`/mjd9/${words.phonetics?.[0]?.text ?? 'N/A'}`}</span>
          {words.meanings.map((item)=>(
            <div key={item.partOfSpeech}>
              <h3>{item.partOfSpeech}</h3>
              <span style={{color: 'grey'}}>Meaning</span>
              <ul style={{fontSize: 16, lineHeight: 2}} >
                {item.definitions.map((definition, index)=>(
                  <li key={index}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
}







