import React, { useState, useEffect } from "react";
import axios from "axios";
export default function PokeAPI() {
  const [name, setName] = useState("");
  const [Find, setFind] = useState("bulbasaur");
  const [Img, setImg] = useState("");
  const [Type, setType] = useState("");
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextUrl, setNextUrl] = useState()
  const [alldatas, setData] = useState([])
  const [chargement, setChargement] = useState(false)
  


  // // MODE RECHERCHE
  // useEffect(() => {
  //   async function getData() {
  //     let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Find}`);
  //     console.log(res);
  //     setImg(res.data.sprites.front_default);
  //     setType(res.data.types[0].type.name);
  //   }

  //   getData();
  // }, [Find]);

  // const Typename = (event) => {
  //   setName(event.target.value);
  // };

  // const Search = () => {
  //   if (name !== "") setFind(name);
  //   setName("");
  // };

  // return (
  //   <>
  //     <div className="back">
  //       <div className="card">
  //         <img src={`${Img}`} alt="" />
  //         <div className="name">{Find.toUpperCase()}</div>

  //         <div className="type">{Type}</div>

  //         <input type="text" onChange={Typename} value={name} />

  //         <button onClick={Search}>Search</button>
  //       </div>
  //     </div>
  //   </>
  // );


  //MODE POKEDEX
  async function getAllPokemons() {
    setChargement(true)
    let res = await axios.get(url);
    setNextUrl(res.data.next)
    console.log(res)
    getPokemon(res.data.results)
    setChargement(false)
    console.log(res);
  }

  async function getPokemon (pokemons){
    pokemons.map(async(pokemon)=>{
      const resultat = await axios.get(pokemon.url)
      setData(state=>{
        state=[...state,resultat.data]
        state.sort((a,b)=>a.id>b.id?1:-1)
        return state;
      })
    })

  }

  useEffect(() => {
   getAllPokemons();
  }, [url]);
  
  return (
    <>
    {chargement 
    ? <p> chargement</p> 
    : alldatas.map((data) =>
      <div className="back">
        <div className="card">
          <img src={data.sprites.front_default} alt="" />
          <div className="name">{data.name}</div>

          <div className="type">{data.types[0].type.name}</div>

        </div>
      </div>
)}
  {nextUrl && <button onClick={()=>{setData([])
      setUrl(nextUrl)}}>Change List</button>}
    </>
)
}
