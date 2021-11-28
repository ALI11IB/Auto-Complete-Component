import { useState, useEffect } from "react";
// import {autoCompleteData} from '../components/autoCompleteData'
const Home = () => {

    //fake data array from static file
//  const [data, setData] = useState(autoCompleteData);

  const [data, setData] = useState([]); 
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

//fetch data from fake api website
  useEffect(() => {
    (async () => {
        let array=[]
       let res= await fetch("http://fakeapi.jsonparseronline.com/categories")
        if(data) res= await res.json()
        res.map((item)=>array.push(item.name))
         setData(array)
    })();
  }, []);

//this function is triggered when writing in the text field
//and search ffor amtch in the data array
// put the matching values in suggestions array
// switch suggestionsActive to true so they appear on the screen
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
      const filterSuggestions = data.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

//choose the clicked value and set as the textfield value
  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
  };
//handle keyboard keys
  const handleKeyDown = (e) => {
// up arrow      
     if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
//down arrow
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
//enter key
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };
//suggestions array map to preview on screen
  const Suggestions = () => {
    return (
       <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
        {value != '' && !suggestions.length && 
        <li>No Options Found</li>}
      </ul>
     );
  };

  return (
    <div className="container">
      <input
       className="auto-complete-text"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );
  
};

export default Home;