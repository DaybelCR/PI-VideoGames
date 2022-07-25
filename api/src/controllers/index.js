require('dotenv').config();
const{API_KEY}=process.env;

const {  Videogame ,Genre,Platform } = require('../db.js');

const axios=require('axios');

const getGamesApi=async()=>{
    let urls=[1,2,3,4,5].map((pag)=> axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${pag}`));
    let  arrayResponse=[];
    const getALL=await Promise.all(urls);
    for(let url of getALL){  
     result=url.data.results.map(r=>{return{
        id:r.id,
        name:r.name,
        released:r.released,
        image:r.background_image,
        rating: r.rating,
        genres: r.genres.map(g=>g.name),
        platforms:r.platforms.map(p=>p.platform.name)
    }})
     arrayResponse=[...arrayResponse,...result];
    }
        return arrayResponse;
   }

   const getGamesDB=async()=>{
    const dataDb=await Videogame.findAll({include:
        [{model:Genre,
          attributes:['name'],
          through:{attributes:[] }
        },{
            model:Platform,
            attributes:['name'],
            through:{attributes:[]}
        }]
        });
   const db=dataDb.map(d=>d.dataValues)
   return db.map(d=>{
    d.genres=d.genres.map(e=>e.name)
    d.platforms=d.platforms.map(e=>e.name)
    return d;
  });
   }

   const getAllGames=async()=>{
    const dataApi=await getGamesApi();
    const dataBd=await getGamesDB();
    return [...dataApi,...dataBd];
    }
   
    const getGenresApi=async()=>{
     const {data}=await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
     return data.results;
}

    const getGamesApiById=async(id)=>{
    const {data}=await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const obj= {
        id: data.id,
        name:data.name,
        released:data.released,
        rating:data.rating,
        description:data.description.replace(/(<([^>]+)>)/gi, ""),
        image:data.background_image,
        platforms: data.platforms.map(p=>p.platform.name),
        genres:data.genres.map(g=>g.name),      
       }
    return obj;
    }

    const getPlatformsApi=async()=>{
        const games=await getGamesApi();
    return games.map(p=>p.platforms).flat()
   }
module.exports={
    getAllGames,
    getGamesDB,
    getGamesApiById,
    getGenresApi,
    getPlatformsApi
}