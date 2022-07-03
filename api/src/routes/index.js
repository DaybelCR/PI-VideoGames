require('dotenv').config();
const{API_KEY}=process.env;

const axios=require('axios');
const { Router } = require('express');
// const Videogame = require('../models/Videogame');

const {  Videogame,Genre  } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
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
        genres: r.genres.map(g=>g.name)
    }})
     arrayResponse=[...arrayResponse,...result];
    }
        return arrayResponse;
   }
   const getGamesDB=async()=>{
    const dataDb=await Videogame.findAll({include:{model:Genre,
      attributes:['name'],
      through:{
       attributes:[]
      }}});
   const db=dataDb.map(d=>d.dataValues)
   return db.map(d=>{
    d.genres=d.genres.map(e=>e.name)
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
    
    router.post('/videogames',async(req,res)=>{
    const { name, description, released, rating, platforms, image, genres } =
      req.body
    try {
      let videogameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        image
      });
      const genresDb = await Genre.findAll({ where: { name: genres } });
      videogameCreated.addGenre(genresDb);
      return res.json({message:"VideoGame created ,successfully"});
    } catch (e) {
      res.status(500).json({message:e.message});
    }
    })
    
    router.get('/videogames',async(req,res)=>{
        const data= await getAllGames();
        const {name}=req.query;
        try{
          if(name){
            const filterData=data.filter(d=>d.name.toLowerCase().includes(name.toLowerCase()));
            return filterData.length>0? res.json(filterData):res.json({message:'The name is not registered'});
            } else{
            return res.json(data);
            } 
        }catch(e){
           return res.status(500).json({message:e.message});
        }
    
    })

    router.get('/videogame/:id',async(req,res)=>{
      const{id}=req.params;
      if(!id) return res.status(404).json({message:'Falta completar el parámetro'});
      try{
        if(id.includes('-')){
            let videogame=await getGamesDB();
            const videogameFound=videogame.find(e=>e.id===id);
            return res.json( videogameFound);
         }else{
            return res.json(await getGamesApiById(id));
         }
      }catch(e){
       return res.status(500).json({message:e.message})
      }
       
    })

    router.get('/genres',async(req,res)=>{ 
      try {
        const allGenres = await getGenresApi();
        const arrayGenres = await Genre.findAll();
        if (!arrayGenres.length) {
          await Genre.bulkCreate(allGenres);
        }
        return res.json(arrayGenres);
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    })

module.exports = router;
 